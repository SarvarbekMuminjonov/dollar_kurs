import { Router } from "@grammyjs/router"
import { InlineKeyboard } from "grammy"
import convert from "../functions/convert.js"
import main from "../keyboards/mainKeyboard.js"
// import bot from './../bot.js';

const router = new Router((ctx) => ctx.session.route)
router.route("start", async (ctx) => {
  ctx.reply(
    "Assalomu alaykum iltimos botdan foydalanish uchun @forgrammybotstest kanaliga a'zo bo'ling.",
    {
      reply_markup: new InlineKeyboard().text("A'zo bo'ldim", "click-payload"),
    }
  )
  ctx.session.route = ""
})

router.route("main", async (ctx) => {
  ctx.reply("Valyutani tanlang", {
    reply_markup: main,
  })
  ctx.session.route = ""
})

router.route("convert", async (ctx) => {
  let sum = parseInt(ctx.msg.text, 10)
  if(isNaN(sum)) return ctx.session.route = ''
  let currencyName = ctx.session.currencyName
  if(currencyName[1]=='SUM'){
    let result = await convert(sum,currencyName[0],true)
    console.log(result)
    ctx.reply(`${result} ${currencyName[0]}`)
  }
  else {
    let result = await convert(sum,currencyName[1],false)
    console.log(result)
    ctx.reply(`${result} ${currencyName[1]}`)
  }
  
  ctx.session.route = ""
})
export default router
