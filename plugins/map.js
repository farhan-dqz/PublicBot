/* Copyright (C) 2021 Vai838.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsAsenaDuplicated

this plugin works rarely only
*/

const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const request = require('request');
const got = require("got");

const Language = require('../language');
const Lang = Language.getString('webss');

Asena.addCommand({pattern: 'map ?(.*)', fromMe: false, desc: Lang.MAP_DESC}, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(Lang.LİNK);
    
    var webimage = await axios.get(`https://mnazria.herokuapp.com/api/maps?search=${match[1]}`, { responseType: 'arraybuffer' })

    await message.client.sendMessage(message.jid,Buffer.from(webimage.gambar.data), MessageType.image, {mimetype: Mimetype.jpg })

}));
