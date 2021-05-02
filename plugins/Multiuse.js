/* Copyright (C) 2021 Vai838.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsAsenaDuplicated
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

Asena.addCommand({ pattern: 'insta ?(.*)', fromMe: false, desc: "Download content from insta link"}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage(Lang.NEED_WORDIGTV))

    await message.sendMessage(infoMessage("Loading"))

    await axios
      .get(`https://api-anoncybfakeplayer.herokuapp.com/igdown?url=${userName}`)
      .then(async (response) => {
        const {
          url,
          type,
        } = response.data.result[0]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `${type}`

	 if (msg === 'image') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg,
        })}
		 	 
	if (msg === 'video') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })}
	
        
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("error.Please check the link")),
      )
  },
)




Asena.addCommand({ pattern: 'fb ?(.*)', fromMe: false, desc: Lang.FBDESC }, async (message, match) => {

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


Asena.addCommand({ pattern: 'twt ?(.*)', fromMe: false, desc: "download from twitter links" }, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("Give proper link!"))

    await message.sendMessage(infoMessage(Lang.LOADINGTV))

    await axios
      .get(`https://api-anoncybfakeplayer.herokuapp.com/twdown?url=${userName}`)
      .then(async (response) => {
        const {
          filesize,
          result,
        } = response.data

        const profileBuffer = await axios.get(result, {responseType: 'arraybuffer'})

        const msg = `*${"Size"}*: ${filesize}`


      if (msg === 'Image/jpg or png') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg,
        })}
		 	 
	if (msg === 'video/mp4') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })}

      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("Error" )),
      )
  },
)





Asena.addCommand({ pattern: 'mp3yt ?(.*)', fromMe: false, desc: "Try this if .song is not giving results.\n Works for youtube links only"}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("Need a yt link"))

    await message.sendMessage(infoMessage("Loading..."))

    await axios
      .get(`https://api-anoncybfakeplayer.herokuapp.com/ytmp3?url=${userName}`)
      .then(async (response) => {
        const {
          url,
          filesize,
	  quality,	
        } = response.data.result[0]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `*${"quality"}*: ${quality}\n*${"file size"}*: ${filesize}\n*${"url"}*: ${url}`
	    
        await message.sendMessage(msg)
        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.document, {
         quoted : message.data
        })
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("Song Not Found!" )),
      )
  },
)

Asena.addCommand({ pattern: 'mp4yt ?(.*)', fromMe: false , desc: "Use this if .videos is not working. Provide the youtube link "}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("Provide the video"))

    await message.sendMessage(infoMessage("Loading..."))

  await axios
      .get(`https://api-anoncybfakeplayer.herokuapp.com/ytmp4?url=${userName}`)
      .then(async (response) => {
        const {
          quality,
          url,	
        } = response.data.result[2]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `*${"Quality"}*: ${quality}`
	    

        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("Not Found" )),
      )
  },
)



Asena.addCommand({ pattern: 'shows ?(.*)', fromMe: false ,  dontAddCommandList: true}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("give me the show name"))

    await message.sendMessage(infoMessage("Loading..."))

  await axios
      .get(`http://api.tvmaze.com/search/shows?q=${userName}`)
      .then(async (response) => {
        const {
          name,
          type,	
          language,
           status,
	  officialSite,
	  summary,
        } = response.data.result[0].show

   
        const msg = `
        *${"Name"}*: ${name}    
        *${"Type"}*: ${type}
        *${"Type"}*: ${status}
        *${"Summary"}*: ${summary}
        *${"Official Site"}*: ${officialSite}`
       
       await message.client.sendMessage(message.jid, msg , MessageType.text);
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("Not Found" )),
      )
  },
)

Asena.addCommand({ pattern: 'pint ?(.*)', fromMe: false, desc: "download from pinterest links" }, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("Give proper link!"))

    await message.sendMessage(infoMessage("Loading"))

    await axios
      .get(`https://scrap.terhambar.com/pin?url=${userName}`)
      .then(async (response) => {
        const {
          url,
        } = response.data.result

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `*${"Url"}*: ${url}`

        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg,
        })
      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("Error" )),
      )
  },
)











Asena.addCommand({ pattern: 'stinsta1 ?(.*)', fromMe: false, desc: "Download insta stories of the given username.\n Use stinsta1,stinsta2,stinsta3...if more than one post is avaiable."}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("Need username"))

    await message.sendMessage(infoMessage("Loading"))

    await axios
      .get(`https://docs-jojo.herokuapp.com/api/igstory?username=${userName}`)
      .then(async (response) => {
        const {
          url,
          type,
        } = response.data.result[0]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `${type}`
	
	 if (msg === 'image') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg,
        })}
		 	 
	if (msg === 'video') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })}

      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("error")),
      )
  },
)



	Asena.addCommand({ pattern: 'stinsta2 ?(.*)', fromMe: false, dontAddCommandList: true}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("Need username"))

    await message.sendMessage(infoMessage("Loading"))

    await axios
      .get(`https://docs-jojo.herokuapp.com/api/igstory?username=${userName}`)
      .then(async (response) => {
        const {
          url,
          type,
        } = response.data.result[1]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `${type}`
	
	 if (msg === 'image') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg,
        })}
		 	 
	if (msg === 'video') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })}

      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("error")),
      )
  },
)


	Asena.addCommand({ pattern: 'stinsta3 ?(.*)', fromMe: false, dontAddCommandList: true}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("Need username"))

    await message.sendMessage(infoMessage("Loading"))

    await axios
      .get(`https://docs-jojo.herokuapp.com/api/igstory?username=${userName}`)
      .then(async (response) => {
        const {
          url,
          type,
        } = response.data.result[2]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `${type}`
	
	 if (msg === 'image') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg,
        })}
		 	 
	if (msg === 'video') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })}

      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("error")),
      )
  },
)



	Asena.addCommand({ pattern: 'stinsta4 ?(.*)', fromMe: false, dontAddCommandList: true}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("Need username"))

    await message.sendMessage(infoMessage("Loading"))

    await axios
      .get(`https://docs-jojo.herokuapp.com/api/igstory?username=${userName}`)
      .then(async (response) => {
        const {
          url,
          type,
        } = response.data.result[3]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `${type}`
	
	 if (msg === 'image') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg,
        })}
		 	 
	if (msg === 'video') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })}

      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("error")),
      )
  },
)



	Asena.addCommand({ pattern: 'stinsta5 ?(.*)', fromMe: false, dontAddCommandList: true}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("Need username"))

    await message.sendMessage(infoMessage("Loading"))

    await axios
      .get(`https://docs-jojo.herokuapp.com/api/igstory?username=${userName}`)
      .then(async (response) => {
        const {
          url,
          type,
        } = response.data.result[4]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `${type}`
	
	 if (msg === 'image') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg,
        })}
		 	 
	if (msg === 'video') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })}

      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("error")),
      )
  },
)


	Asena.addCommand({ pattern: 'stinsta6 ?(.*)', fromMe: false, dontAddCommandList: true}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("Need username"))

    await message.sendMessage(infoMessage("Loading"))

    await axios
      .get(`https://docs-jojo.herokuapp.com/api/igstory?username=${userName}`)
      .then(async (response) => {
        const {
          url,
          type,
        } = response.data.result[5]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `${type}`
	
	 if (msg === 'image') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg,
        })}
		 	 
	if (msg === 'video') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })}

      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("error")),
      )
  },
)

	Asena.addCommand({ pattern: 'stinsta7 ?(.*)', fromMe: false, dontAddCommandList: true}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("Need username"))

    await message.sendMessage(infoMessage("Loading"))

    await axios
      .get(`https://docs-jojo.herokuapp.com/api/igstory?username=${userName}`)
      .then(async (response) => {
        const {
          url,
          type,
        } = response.data.result[6]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `${type}`
	
	 if (msg === 'image') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg,
        })}
		 	 
	if (msg === 'video') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })}

      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("error")),
      )
  },
)

		
			Asena.addCommand({ pattern: 'stinsta8 ?(.*)', fromMe: false, dontAddCommandList: true}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("Need username"))

    await message.sendMessage(infoMessage("Loading"))

    await axios
      .get(`https://docs-jojo.herokuapp.com/api/igstory?username=${userName}`)
      .then(async (response) => {
        const {
          url,
          type,
        } = response.data.result[7]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `${type}`
	
	 if (msg === 'image') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg,
        })}
		 	 
	if (msg === 'video') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })}

      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("error")),
      )
  },
)
				

Asena.addCommand({ pattern: 'stinsta9 ?(.*)', fromMe: false, dontAddCommandList: true}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("Need username"))

    await message.sendMessage(infoMessage("Loading"))

    await axios
      .get(`https://docs-jojo.herokuapp.com/api/igstory?username=${userName}`)
      .then(async (response) => {
        const {
          url,
          type,
        } = response.data.result[8]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `${type}`
	
	 if (msg === 'image') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg,
        })}
		 	 
	if (msg === 'video') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })}

      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("error")),
      )
  },
)
						
						
 Asena.addCommand({ pattern: 'stinsta10 ?(.*)', fromMe: false, dontAddCommandList: true}, async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage("Need username"))

    await message.sendMessage(infoMessage("Loading"))

    await axios
      .get(`https://docs-jojo.herokuapp.com/api/igstory?username=${userName}`)
      .then(async (response) => {
        const {
          url,
          type,
        } = response.data.result[9]

        const profileBuffer = await axios.get(url, {responseType: 'arraybuffer'})

        const msg = `${type}`
	
	 if (msg === 'image') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg,
        })}
		 	 
	if (msg === 'video') { await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
          caption: msg,
        })}

      })
      .catch(
        async (err) => await message.sendMessage(errorMessage("error")),
      )
  },
)
