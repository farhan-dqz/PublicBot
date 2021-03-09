/* Copyright (C) 2020 Yusuf Usta.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const got = require('got');
const fs = require('fs');
const axios = require('axios');

const Language = require('../language');
const Lang = Language.getString('weather');

Asena.addCommand({pattern: 'joox ?(.*)', fromMe: false, desc: Lang.JOOX_DESC}, async (message, match) => {
	if (match[1] === '') return await message.reply(Lang.NEED_SONG);
	const url = `https://tobz-api.herokuapp.com/api/joox?q=${match[1]}&apikey=BotWeA`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);
		if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '*🎼 ' + Lang.SONG +':* ```' + match[1] + '```\n\n' +
		'*🎧 ' + Lang.ALBUM +':* ```' + json.result.album + '```\n' + 
		'*🔊 ' + Lang.TITLE +':* ```' + json.result.judul + '```\n' +
		'*🎚️ ' + Lang.PUBLICATION +':* ```' + json.result.dipublikasi + '```\n' + 
		'*🎙️ ' + Lang.SONGL +':* ```' + json.result.mp3 + '```\n' , MessageType.text);
		
		return await message.sendMessage(Buffer.from(json.result.mp3), MessageType.audio, {mimetype: Mimetype.mp4audio, ptt: true});
    
	} catch {
		return await message.client.sendMessage(message.jid, Lang.NOT_FOUNDS, MessageType.text);
	}
});
