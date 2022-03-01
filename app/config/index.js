import dotenv from 'dotenv'
dotenv.config()

const TOKEN = process.env.TOKEN,
apiURl = process.env.apiURl,
DEV_ID= process.env.DEV_ID,
channelID = process.env.channelID

export default {
    TOKEN,
    DEV_ID,
    channelID,
    apiURl
}