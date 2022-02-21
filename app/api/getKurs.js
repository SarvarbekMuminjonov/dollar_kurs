import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import bot from "../bot.js"
import getAllKurs from "./getAllKurs.js"


const __dirname = path.dirname(fileURLToPath(import.meta.url))
// console.log(__dirname)
async function checker() {
  let data = await getAllKurs()
  await fs.readFile(
    path.resolve(__dirname, "data.json"),
    "utf8",
    (err, value) => {
      // console.log(value,typeof value)
      if (err ||  value=='') {
        writer(data)
        console.log("error on reading file " )
      } else {
        let change = getChanges(JSON.parse(data), JSON.parse(value))
        if (change) {
          writer(data)
          return createPost(JSON.parse(data))
        } else {
          console.log("not changes")
          return undefined
        }
      }
    }
  )
  // console.log('oldData',typeof oldData)
}
async function writer(data) {
  // console.log("path", new URL("./data.json", import.meta.url))
  fs.writeFile(
    path.resolve(__dirname, "data.json"),
    data,
    "utf8",
    (error) => {
      if (error) {
        console.log("error on writing file" + error.message)
      } else {
        console.log("new data writed")
      }
    }
  )
}

function getChanges(newdata, oldData) {
  if (
    newdata.bazarUSD[0] != oldData.bazarUSD[0] ||
    newdata.bazarUSD[1] != oldData.bazarUSD[1] ||
    newdata.bazarRUB[0][0] != oldData.bazarRUB[0][0] ||
    newdata.bazarRUB[0][1] != oldData.bazarRUB[0][1] ||
    newdata.USD != oldData.USD ||
    newdata.RUBL != oldData.RUBL ||
    newdata.EURO != oldData.EURO
  )
    return true
  else return false
}

export default function timer() {
  setInterval(() => {
      console.log('checking')
    checker()
  }, 1000 * 60*10)
}

function createPost(data) {
  let post = `<b>Бозор курси</b>
  🇺🇸 <b>Доллар:</b>
  🔼 Сотиш: <b>${data.bazarUSD[0]}</b> сўм 
  🔽 Олиш: <b>${data.bazarUSD[1]}</b> сўм  
  
  🇷🇺 <b>Рубл:</b>
  🔼 Сотиш: <b>${data.bazarRUB[0][0]}</b> сўм 
  🔽 Олиш: <b>${data.bazarRUB[0][1]}</b> сўм 
    
  <b>Расмий курс:</b> 
  🇺🇸 1 доллар = <b>${data.USD}</b> сўм 
  🇷🇺 1 рубл = <b>${data.RUBL}</b> сўм
  🇪🇺 1 евро = <b>${data.EURO}</b> сўм
  <a href="http://www.cbu.uz/uz/">Марказий Банк</a>
  
  
  <b>Янгиланди:</b> ${getDate()}
    
  <b>Биз билан бўлинг</b>
  👉 @USDkurs_uz`
  return bot.api.sendMessage(-1001766439610, post, {
    parse_mode: "HTML",
    disable_notification: true,
  })
}

function getDate() {
  let date = new Date()
    .toLocaleString("ru", { timeZone: "Asia/Tashkent" })
    .slice(0, 17)
  return date
}
