/* Copyright (C) 2020 Yusuf Usta.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const got = require('got');

const Language = require('../language');
const Lang = Language.getString('weather');

Asena.addCommand({pattern: 'moddroid ?(.*)', fromMe: false, desc: Lang.WEATHER_DESC}, async (message, match) => {
	if (match[1] === '') return await message.reply(Lang.NEED_LOCATION);
	const url = `https://tobz-api.herokuapp.com/api/moddroid?q=${match[1]}&apikey=BotWeA`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);
		if (response.statusCode === 200) return await message.client.sendMessage(message.jid, 
		'*ℹ ' + Lang.NAMEY +':* ```' + json.result[0].title + '°```\n' + 
		'*ℹ ' + Lang.PUBLISHER +':* ```' + json.result[0].publisher+ '```\n' +
		'*ℹ ' + Lang.MODINFO +':* ```%' + json.result[0].mod_info + '```\n' + 
		'*ℹ ' + Lang.SIZE +':* ```' + json.result[0].size + 'm/s```\n' + 
		'*ℹ ' + Lang.DOWNLOAD +':* ```%' + json.result[0].download + '```\n', MessageType.text);
	} catch {
		return await message.client.sendMessage(message.jid, Lang.NOT_FOUND, MessageType.text);
	}
});
