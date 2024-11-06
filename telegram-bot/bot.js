const TelegramBot = require('node-telegram-bot-api');

// Замените 'YOUR_BOT_TOKEN' на токен, полученный от @BotFather
const bot = new TelegramBot('7767846999:AAE8JFX8n6Dp6zu2RAqq45mdS-mExTaMnX0', {polling: true});

// Обработчик для команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    // Создаем клавиатуру с кнопкой для открытия веб-приложения
    const keyboard = {
        keyboard: [
            [{
                text: "Открыть приложение",
                web_app: {url: 'https://dimadvoia.github.io/app/index.html'}
            }]
        ],
        resize_keyboard: true
    };
    
    bot.sendMessage(chatId, 'Привет! Нажмите кнопку ниже, чтобы открыть приложение:', {
        reply_markup: keyboard
    });
});

// Обработчик для данных из веб-приложения
bot.on('web_app_data', (msg) => {
    const chatId = msg.chat.id;
    const buttonId = msg.web_app_data.data;
    
    let response;
    switch(buttonId) {
        case 'button1':
            response = 'Вы нажали первую кнопку!';
            break;
        case 'button2':
            response = 'Вы нажали вторую кнопку!';
            break;
        case 'button3':
            response = 'Вы нажали третью кнопку!';
            break;
        default:
            response = 'Что-то пошло не так';
    }
    
    bot.sendMessage(chatId, response);
}); 