import dotenv from 'dotenv'
dotenv.config()

const TOKEN = process.env.TOKEN,
apiURl = process.env.apiURl

export default {
    TOKEN,
    apiURl
}