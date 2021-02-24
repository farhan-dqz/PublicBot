/* Copyright (C) 2021 Vai838.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsAsenaDuplicated
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const got = require('got');

const Language = require('../language');
const Lang = Language.getString('instagram');
const { errorMessage, infoMessage } = require('../helpers');

Asena.addCommand({pattern: 'insta ?(.*)', fromMe: false, usage: Lang.USAGE, desc: Lang.DESC}, async (message, match) => {
	if (match[1] === '') return await message.sendMessage(errorMessage(Lang.NEED_WORD));
        /*await message.sendMessage(infoMessage(Lang.LOADING))*/
	const url = `https://www.instagram.com/${match[1]}/?__a=1`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);
		if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '*🏷' + Lang.USERNAME +':* ```' + match[1] + '```\n\n' +
		'*🔖 ' + Lang.NAME +':* ```' + json.graphql.user.full_name + '°```\n' + 
		'*📄 ' + Lang.BIO +':* ```' + json.graphql.user.biography + '```\n' +
		'*👣 ' + Lang.FOLLOWERS +':* ```%' + json.graphql.user.edge_followed_by.count + '```\n' + 
		'*👥 ' + Lang.FOLLOWS +':* ```' + json.graphql.user.edge_follow.count + 'm/s```\n' + 
		'*🖼 ' + Lang.ACCOUNT +':* ```%' + json.graphql.user.is_private + '```\n', MessageType.text);
	} catch {
		return await message.client.sendMessage(message.jid, Lang.NOT_FOUND, MessageType.text);
	}
});
