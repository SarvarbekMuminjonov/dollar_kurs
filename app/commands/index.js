import { session } from "grammy"
import bot from "../bot.js"
import { composer } from "../composer/index.js"
import checker from "../middlewares/member.js"
import router from "../routes/index.js"
import config from '../config/index.js'

function initial() {
  return { route: "main", currenyName: "" }
}
bot.use(session({ initial }))
bot.use(checker)
bot.use(router)
bot.use(composer)

bot.catch((err) => {
  const ctx = err.ctx
  console.error(`Error while handling update ${ctx.update.update_id}:`)
  const e = err.error
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description)
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e)
  } else {
    console.error("Unknown error:", e)
  }
})
bot.start({
  onStart: () => {
    bot.api.sendMessage(config.DEV_ID, "bot started")
    console.log("bot started")
  },
})
