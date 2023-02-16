import TelegramBot from 'node-telegram-bot-api';

const tokenBot = '5978715655:AAEORPkYx--KNWUISbre2w_PbVUg4OafLzc';


const bot = new TelegramBot(tokenBot, { polling: true })
const chats = {}
const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[
      { text: '1', callback_data: '1' },
      { text: '2', callback_data: '2' },
      { text: '3', callback_data: '3' },
    ], [
      { text: '4', callback_data: '4' },
      { text: '5', callback_data: '5' },
      { text: '6', callback_data: '6' },
    ], [
      { text: '7', callback_data: '7' },
      { text: '8', callback_data: '8' },
      { text: '9', callback_data: '9' },
    ], [
      { text: '0', callback_data: '0' },
    ]]
  })
}
const againOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[
      { text: 'restart game', callback_data: '/again' }
    ],]
  })
}

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, `Зараз я загадаю число від 1 до 9, а ти повинен відгадати`)
  const randomNum = Math.floor(Math.random() * 10)
  chats[chatId] = randomNum
  await bot.sendMessage(chatId, `Відгадай`, gameOptions)
}

const start = () => {
  bot.setMyCommands([
    { command: '/start', description: 'Вітання з юзером' },
    { command: '/info', description: 'Інформація про юзера' },
    { command: '/game', description: 'Start game' },
    { command: '/again', description: 'Restart game' },
  ])

  bot.on('message', async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id
    const name = msg.from.username

    if (text === '/start') {
      await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/053/c88/053c8895-10cf-3599-8164-226dbdd9bb93/192/10.webp')
      return bot.sendMessage(chatId, `Hello you registration on bot`)
    }

    if (text === '/info') {
      return bot.sendMessage(chatId, `Hello ${name} you registration on bot`)
    }

    if (text === '/game') {
      startGame(chatId)
    }


    return bot.sendMessage(chatId, `I dont understand you`)
  })

  bot.on('callback_query', (msg) => {
    const chatId = msg.message.chat.id
    const data = msg.data
    if (data === '/again') {
      return startGame(chatId)
    }
    if (data == chats[chatId]) {
      return bot.sendMessage(chatId, `Вітаю ти відгадав число ${chats[chatId]}`, againOptions)
    } else {
      return bot.sendMessage(chatId, `На жаль ти не вгадав число ${chats[chatId]}`, againOptions)
    }
  })
}

start()