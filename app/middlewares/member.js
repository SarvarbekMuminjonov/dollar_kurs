import config from '../config/index.js'
export default async function checker(ctx, next) {
  const role = await (
    await ctx.api.getChatMember(config.channelID, ctx.from.id)
  ).status
  console.log(role)
  if (role == "creator" || role == "administrator" || role == "member") {
    return next()
  }
  ctx.session.route = "start"
  return next()
}
