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

    await message.sendMessage(Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.jpg })

}));


Asena.addCommand({pattern: 'glitch ?(.*)', fromMe: false, desc: Lang.GLITCH_DESC}, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.GLAT);
  
  var topText, bottomText;
    if (match[1].includes(';')) {
        var split = match[1].split(';');
        topText = split[1];
        bottomText = split[0];
}

    var webimage = await axios.get(`https://videfikri.com/api/textmaker/tiktokeffect/?text1=${topText}&text2=${bottomText}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(webimage.data), MessageType.image, {mimetype: Mimetype.jpg })

}));


Asena.addCommand({pattern: 'vinsta ?(.*)', fromMe: false }, async (message, match) => {
    
     anu = await fetchJson(`https://alfians-api.herokuapp.com/api/ig?url=${match[1]}`, {method: 'get'})
     insta = getBuffer(anu.result)
    asena.sendMessage(from, insta, video, {mimtype: 'video/mp4', filename: 'instagram'.mp3, quoted: mek})
    
});
