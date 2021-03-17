/* Copyright (C) 2020 Yusuf Usta.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
/*const got = require('got');
const fs = require('fs');*/
const axios = require('axios');

const Language = require('../language');
const Lang = Language.getString('weather');
const { errorMessage, infoMessage } = require('../helpers');

/*Asena.addCommand({pattern: 'song ?(.*)', fromMe: false}, async (message, match) => {
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
		
		return await message.sendMessage(from,await getBuffer(`json.result.mp3`, {method: 'get'})  , MessageType.audio, {quoted: mek, mimetype: Mimetype.mp4audio, ptt: true});
    
	} catch {
		return await message.client.sendMessage(message.jid, Lang.NOT_FOUNDS, MessageType.text);
	}
});


Asena.addCommand({pattern: 'psong ?(.*)', fromMe: true }, async (message, match) => {
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
		
		return await message.sendMessage(json.result.mp3 , MessageType.audio, {mimetype: Mimetype.mp4audio, ptt: true});
    
	} catch {
		return await message.client.sendMessage(message.jid, Lang.NOT_FOUNDS, MessageType.text);
	}
});*/

Asena.addCommand({ pattern: 'igtv ?(.*)', fromMe: false, desc: Lang.IGTVDESC }, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage(Lang.NEED_WORDIGTV))

    await message.sendMessage(infoMessage(Lang.LOADINGTV))

    await axios
      .get(`https://docs-jojo.herokuapp.com/api/igtv?url=${userName}`)
      .then(async (response) => {
        const {
          url,
          preview_url,
        } = response.data.resource[0]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `
        *${Lang.VID}*: ${preview_url}`

        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUNDIG)),
      )
  },
)


Asena.addCommand({ pattern: 'vinsta ?(.*)', fromMe: false, desc: Lang.IGDESC }, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage(Lang.NEED_WORDIG))

    await message.sendMessage(infoMessage(Lang.LOADINGTV))

    await axios
      .get(`https://docs-jojo.herokuapp.com/api/insta?url=${userName}`)
      .then(async (response) => {
        const {
          url,
	preview_url,	
        } = response.data.resource[0]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `*${Lang.VID}*: ${preview_url}`

        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUNDIG )),
      )
  },
)

Asena.addCommand({ pattern: 'vfb ?(.*)', fromMe: false, desc: Lang.FBDESC }, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage(Lang.NEED_WORDFB))

    await message.sendMessage(infoMessage(Lang.LOADINGTV))

    await axios
      .get(`https://videfikri.com/api/fbdl/?urlfb=${userName}`)
      .then(async (response) => {
        const {
          url,
          judul,
        } = response.data.result

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `*${Lang.CAPTION}*: ${judul}`

        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage(Lang.NOT_FOUNDFB )),
      )
  },
)
