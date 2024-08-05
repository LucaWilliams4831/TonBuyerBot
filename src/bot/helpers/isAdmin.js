export default async function (ctx, next) {
  const chatMember = await ctx.telegram.getChatMember(
    ctx.message.chat.id,
    ctx.message.from.id
  );

  if (chatMember.status === "member") {
    return;
  }
  return next();
}
