import { Composer, Scenes } from "telegraf";
import { updateImageUrlTokenById } from "../db/db.token/request.js";
import getTokenCreatedText from "../utils/getTokenCreatedText.js";

const sendMessage = new Composer();
sendMessage.action(/changePhoto/, async (ctx) => {
  let msg = await ctx.replyWithHTML(
    `Submit the photo/gif you want to post`
  );
  ctx.wizard.state.messageToDelete = [];
  ctx.wizard.state.messageToDelete.push(msg.message_id);
  await ctx.deleteMessage();
  return ctx.wizard.next();
});

const changePhoto = new Composer();
changePhoto.on("photo", async (ctx) => {
  const res = await updateImageUrlTokenById(
    String(ctx.message.photo[ctx.message.photo.length - 1].file_id) + " photo",
    Number(ctx.wizard.state.id)
  );

  await ctx.replyWithPhoto(res.image_url.split(" ")[0], {
    caption: getTokenCreatedText(res),
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
  });
  await ctx.deleteMessage();
  return ctx.scene.leave();
});

changePhoto.on("animation", async (ctx) => {
  const res = await updateImageUrlTokenById(
    String(ctx.message.animation.file_id) + " gif",
    Number(ctx.wizard.state.id)
  );
  await ctx.replyWithDocument(res.image_url.split(" ")[0], {
    caption: getTokenCreatedText(res),
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
  });
  await ctx.deleteMessage();
  return ctx.scene.leave();
});

changePhoto.on("video", async (ctx) => {
  const res = await updateImageUrlTokenById(
    String(ctx.message.video.file_id) + " video",
    Number(ctx.wizard.state.id)
  );
  await ctx.replyWithVideo(res.image_url.split(" ")[0], {
    caption: getTokenCreatedText(res),
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
  });
  await ctx.deleteMessage();
  return ctx.scene.leave();
});

export const ChangePhoto = new Scenes.WizardScene(
  "ChangePhoto", // first argument is Scene_ID, same as for BaseScene
  sendMessage,
  changePhoto
);
