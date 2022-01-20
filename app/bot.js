import {Bot} from 'grammy'
import config from './config/index.js'
const bot = new Bot(config.TOKEN)
 bot.command('start',(ctx)=>ctx.reply('Assalomu alaykum'))
bot.start({onStart:()=>console.log('bot started')})