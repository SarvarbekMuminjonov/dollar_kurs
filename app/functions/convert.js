import fs from "fs"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export default function convert(summa, currency, sumOrnot) {
  //sumOrnot -> true if .-sum
  //false if sum-.
  try {
    return new Promise((resolve,reject)=>{
        fs.readFile(
            path.resolve(__dirname, "../api/data.json"),
            "utf-8",
            (err, val) => {
              if(err)reject(err)
              let data = JSON.parse(val)[currency]
              let result= sumOrnot ? summa * data : summa / data
              // console.log(result)
              
              resolve(result.toFixed(3)) 
          }
          )
    })
   

  } catch (error) {
    console.log(error)
  }
}
