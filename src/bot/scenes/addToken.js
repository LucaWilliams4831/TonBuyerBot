import { Composer, Scenes, Markup } from "telegraf";
import { message } from "telegraf/filters";
import getTokenCreatedText from "../utils/getTokenCreatedText.js";

import {
  getLastPoolsTrades,
  getToken,
  getTokenPools,
} from "../services/apiService.js";

import { createAndCheckToken } from "../db/db.token/request.js";
import { createAndCheckLastTrade } from "../db/db.lastTrade/request.js";
import { createAndCheckPool } from "../db/db.pool/request.js";
import { TradeDto } from "../utils/tradeDto.js";
import { TradeDtoNew } from "../utils/tradeDtoNew.js";

const sendMessage = new Composer();
sendMessage.action("addToken", async (ctx) => {
  await ctx.deleteMessage();
  await ctx.answerCbQuery();
  let msg = await ctx.replyWithHTML(
    `Submit the address of the token you want to track`
  );
  ctx.wizard.state.messageToDelete = [];
  ctx.wizard.state.messageToDelete.push(msg.message_id);
  return ctx.wizard.next();
});

const addNewToken = new Composer();
addNewToken.on(message("text"), async (ctx) => {
  if (ctx.message.text.length < 1) {
    let msg = ctx.reply("Please enter the correct token");
    ctx.wizard.state.messageToDelete.push(msg.message_id);
    return;
  }
  const res = await getToken(ctx.message.text);

  if (res) {
    const token = {
      token_id: res.id,
      type: res.type,
      address: res.attributes.address,
      name: res.attributes.name,
      symbol: res.attributes.symbol,
      image_url: "",
      websites: res.attributes.websites.join(","),
      description: res.attributes.description,
      discord_url: res.attributes.discord_url,
      telegram_handle: res.attributes.telegram_handle,
      twitter_handle: res.attributes.twitter_handle,
    };

    const resPools = await getTokenPools(token.address);

    const pool = {
      id: resPools[0].id,
      address: resPools[0].attributes.address,
      name: resPools[0].attributes.name,
      token_address: token.address,
    };
    const resLastTrades = await getLastPoolsTrades(pool.address);

    let lastBuyTrade;
    for (let i in resLastTrades) {
      if (resLastTrades[i].attributes.kind === "buy") {
        lastBuyTrade = i;
        break;
      }
    }

    await createAndCheckPool(pool);
    if (lastBuyTrade) {
      const trade = new TradeDtoNew(resLastTrades, lastBuyTrade, token.address);
      await createAndCheckLastTrade(trade);
    }
    const result = await createAndCheckToken(token, ctx.message.chat.id);

    if (result === "exist") {
      await ctx.replyWithHTML(`This token has already been added`);
    } else if (result === "error") {
      await ctx.replyWithHTML(`Error adding token`);
    } else {
      await ctx.replyWithHTML(getTokenCreatedText(token), {
        link_preview_options: { is_disabled: true },
        ...Markup.inlineKeyboard([
          Markup.button.callback(`Change photo`, `changePhoto ${result[0].id}`),
        ]).resize(),
      });
    }
  } else {
    await ctx.replyWithHTML("Invalid token, try again");
  }
  try {
    for (let i in ctx.wizard.state.messageToDelete) {
      await ctx.deleteMessage(ctx.wizard.state.messageToDelete[i]);
    }
  } finally {
    return ctx.scene.leave();
  }
});

export const AddToken = new Scenes.WizardScene(
  "AddToken", // first argument is Scene_ID, same as for BaseScene
  sendMessage,
  addNewToken
);
