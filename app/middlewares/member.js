import bot from "../bot.js"

export default async function checker(ctx, next) {
  const role = await (
    await bot.api.getChatMember(-1001766439610, ctx.chat.id)
  ).status
  console.log(role)
  if (role == "creator" || role == "administrator" || role == "member") {
    return next()
  }
  ctx.session.route = "start"
  return next()
}
