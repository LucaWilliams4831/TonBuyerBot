import { Stage } from "telegraf/scenes";
import isAdmin from "../helpers/isAdmin.js";
import isAdminAction from "../helpers/isAdminAction.js";

export default function handler(bot) {
  // bot.action("deleteMsg", async (ctx) => {
  //   await ctx.deleteMessage(ctx.callbackQuery.message.message_id);
  // });

  bot.action("addToken", isAdminAction, Stage.enter("AddToken"));
  bot.action(/changePhoto/, isAdminAction, async (ctx) => {
    const id = ctx.callbackQuery.data.replace("changePhoto ", "");

    await ctx.scene.enter("ChangePhoto", {
      id: id,
    });

    await ctx.answerCbQuery();
  });
}
