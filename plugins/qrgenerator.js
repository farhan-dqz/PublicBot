/* Codded by @phaticusthiccy
Telegram: t.me/phaticusthiccy
Instagram: www.instagram.com/kyrie.baran
*/

const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const request = require('request');
const got = require("got");

const Language = require('../language');
const Lang = Language.getString('qrgenerator');

Asena.addCommand({pattern: 'qr ?(.*)', fromMe: false, desc: Lang.QR_DESC}, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.TEXT);

    var webimage = await axios.get(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${match[1].replace(/#/g, '\n')} `, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Made by WhatsAsena'})

}));
