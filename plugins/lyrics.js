/* Copyright (C) 2021 Vai838.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsAsena 
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const got = require('got');

const Language = require('../language');
const Lang = Language.getString('weather');          

Asena.addCommand({pattern: 'lyrics ?(.*)', fromMe: true, desc: Lang.LYRICS_DESC}, async (message, match) => {
	if (match[1] === '') return await message.reply(Lang.NEED_SONG);
	const url = `https://videfikri.com/api/liriklagu/?query=${match[1]}`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);
		if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '*🎙️  ' + Lang.SONG +':* ```' + match[1] + '```\n\n' +
		/*'*🎧 ' + Lang.ALBUM +':* ```' + json.result.album + '```\n' +*/
		'*🔊 ' + Lang.TITLE +':* ```' + json.result.title + '```\n' +
		'*🎚️ ' + Lang.PUBLICATION +':* ```' + json.result.artist + '```\n' + 
		'*🎼 ' + Lang.SONGLI +':* ```' + json.result.lirik + '```\n' , MessageType.text);
		
	} catch {
		return await message.client.sendMessage(message.jid, Lang.NOT_FOUNDS, MessageType.text);
	}
});


/*https://tobz-api.herokuapp.com/api/lirik?q=${match[1]}&apikey=BotWeA*/
