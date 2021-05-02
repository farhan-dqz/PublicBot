/* Copyright (C) 2021 Vai838.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsAsenaDuplicated*/


const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const got = require('got');
const Config = require('../config');

const Language = require('../language');
const Lang = Language.getString('weather');

Asena.addCommand({pattern: 'happymod ?(.*)', fromMe: false, desc: Lang.HMODD_DESC, dontAddCommandList: true }, async (message, match) => {
	if (match[1] === '') return await message.reply(Lang.NEED_APPNAME);
	const url = `https://tobz-api.herokuapp.com/api/happymod?q=${match[1]}&apikey=${Config.TOBZ_API_KEY}`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);
		if (response.statusCode === 200) return await message.client.sendMessage(message.jid, 
		'*🏷️ ' + Lang.NAMEY +'* ```' + json.result[0].title + '```\n\n' + 
		'*📦 ' + Lang.SIZE +'* ```' + json.result[0].size + '```\n\n\n' + 
		'*⬇️ ' + Lang.DOWNLOAD +':* ```' + json.result[0].link + '```\n', MessageType.text);
	} catch {
		return await message.client.sendMessage(message.jid, Lang.NOT_FOUNDMD, MessageType.text);
	}
});
