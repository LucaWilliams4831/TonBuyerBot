export default async function (ctx, next) {
  const chatMember = await ctx.telegram.getChatMember(
    ctx.update.callback_query.message.chat.id,
    ctx.update.callback_query.from.id
  );

  if (chatMember.status === "member") {
    await ctx.answerCbQuery();
    return;
  }
  return next();
}
