const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('../config');
const Sr = "Busca en Google."

Asena.addCommand({pattern: 'search ?(.*)', fromMe: false, desc: Sr}, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid,'```entha search cheyyande..entholokke type cheyy```', MessageType.text);
 
    Sea.google(`${match[1]}`).then(async(result) => {
        
        await message.client.sendMessage(message.jid,result[0], MessageType.text);
      });
  }));
