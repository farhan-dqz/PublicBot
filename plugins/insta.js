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

Asena.addCommand({pattern: 'insta ?(.*)', fromMe: false, usage: Lang.USAGE, desc: Lang.Lang.DESC}, async (message, match) => {
	if (match[1] === '') return await message.sendMessage(errorMessage(Lang.NEED_WORD));
  
 await message.sendMessage(infoMessage(Lang.LOADING))
 
	const url = `https://www.instagram.com/${match[1]}/?__a=1`;
	try {
		const response = await got(url);
		const json = JSON.parse(response.body);
		if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '*ℹ ' + Lang.USERNAME +':* ```' + match[1] + '```\n\n' +
		'*ℹ ' + Lang.NAME +':* ```' + json.graphql.user.edge_follow.full_name + '°```\n' + 
		'*ℹ ' + Lang.BIO +':* ```' + json.graphql.user.biography + '```\n' +
		'*ℹ ' + Lang.FOLLOWERS +':* ```%' + json.graphql.user.edge_followed_by.count + '```\n' + 
		'*ℹ ' + Lang.FOLLOWS +':* ```' + json.graphql.user.edge_follow.count + 'm/s```\n' + 
		'*ℹ ' + Lang.PROPIC +':* ```%' + json.graphql.user.profile_pic_url_hd + '```\n', MessageType.text);
	} catch {
		return await message.client.sendMessage(message.jid, Lang.NOT_FOUND, MessageType.text);
	}
});
