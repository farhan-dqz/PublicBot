/* Codded by @Vai838
*/

const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const request = require('request');
const got = require("got");

const Language = require('../language');
const Lang = Language.getString('webss');

Asena.addCommand({pattern: 'astro ?(.*)', fromMe: false,usage: Lang.USAGEI, desc: Lang.ASTRO_DESC}, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.LAT);
  
  var topText, bottomText;
    if (match[1].includes(';')) {
        var split = match[1].split(';');
        topText = split[1];
        bottomText = split[0];
}

    var webimage = await axios.get(`http://www.7timer.info/bin/astro.php?lon=${topText}&lat=${bottomText}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: 'Made by WhatsAsena'})

}));
