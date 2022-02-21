import { Composer } from "grammy"

const composer = new Composer()

composer.callbackQuery("click-payload", async (ctx) => {
  await ctx.answerCallbackQuery({
    text: "A'zo bo'lganingiz uchun rahmat.",
  })
  await ctx.deleteMessage()
  ctx.session.route = "main"
  return 
})
composer.hears(/.-./, (ctx) => {
  let msg = ctx.msg.text
  console.log(msg)
  ctx.session.currencyName = msg.split('-')
  ctx.reply("Summani kiriting")
  ctx.session.route = "convert"
  return 
})

export { composer }
