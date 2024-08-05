import { Markup } from "telegraf";
import { createAndCheckNewUser } from "../db/db.tgUser/request.js";
import isAdmin from "../helpers/isAdmin.js";

export default function handlers(bot) {
  // Первый заход в бота
  bot.command("start", async (ctx) => {
    await ctx.replyWithHTML(
      `⁉️How to set up TON buy bot: ⁉️\n1. Add @TonBuyTrending_bot to your group.\n2. Give the bot administrator rights.\n3. Enter "/startbb\n4. Click “Add new token”.\n5. Insert the token address.\n6. Set your own image/gif (optional).\n7. Set your emoticon (optional).\n8. Done\n❗️NOTE: You cannot set up this bot from an anonymous account.\nGood luck!`
    );
  });
  bot.command("help", async (ctx) => {
    await ctx.replyWithHTML(
      `⁉️How to set up TON buy bot: ⁉️\n1. Add @TonBuyTrending_bot to your group.\n2. Give the bot administrator rights.\n3. Enter "/startbb\n4. Click “Add new token”.\n5. Insert the token address.\n6. Set your own image/gif (optional).\n7. Set your emoticon (optional).\n8. Done\ n❗️NOTE: You cannot set up this bot from an anonymous account.\nGood luck!`
    );
  });
  bot.command(
    "startbb",
    isAdmin,
    async (ctx) => {
      if (ctx.chat.type === "private") {
        await ctx.replyWithHTML("This command is only available in groups");
        return;
      }
      try {
        const newUser = {
          username: ctx.message.from.username,
          user_id: ctx.message.from.id,
          language_code: ctx.message.from.language_code,
          first_name: ctx.message.from.first_name,
        };

        createAndCheckNewUser(newUser).then(async (res) => {
          if (res === "error") {
            return await ctx.replyWithHTML(`Error! Try restarting the bot!`);
          } else {
            return await ctx.replyWithHTML(
              `Click the button below to register your token with KET Ton Trending`,

              Markup.inlineKeyboard([
                Markup.button.callback(`Add a new token ❇️`, `addToken`),
              ]).resize()
            );
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    async (ctx) => {
      console.log(ctx.message.chat.id);
    }
  );
}
