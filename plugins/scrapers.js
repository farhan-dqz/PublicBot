/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/

const Asena = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const translatte = require('translatte');
const config = require('../config');
//============================== CURRENCY =============================================
const { exchangeRates } = require('exchange-rates-api');
const ExchangeRatesError = require('exchange-rates-api/src/exchange-rates-error.js')
//============================== TTS ==================================================
const fs = require('fs');
const https = require('https');
const googleTTS = require('google-translate-tts');
//=====================================================================================
//============================== YOUTUBE ==============================================
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const yts = require( 'yt-search' )
const got = require("got");
const ID3Writer = require('browser-id3-writer');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: 'acc6302297e040aeb6e4ac1fbdfd62c3',
    clientSecret: '0e8439a1280a43aba9a5bc0a16f3f009'
});
//=====================================================================================
const Language = require('../language');
const Lang = Language.getString('scrapers');

const wiki = require('wikijs').default;
var gis = require('g-i-s');

Asena.addCommand({pattern: 'trt(?: |$)(\\S*) ?(\\S*)', desc: Lang.TRANSLATE_DESC, usage: Lang.TRANSLATE_USAGE, fromMe: false}, (async (message, match) => {
    if (!message.reply_message) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY,MessageType.text);
    }

    ceviri = await translatte(message.reply_message.message, {from: match[1] === '' ? 'auto' : match[1], to: match[2] === '' ? config.LANG : match[2]});
    if ('text' in ceviri) {
        return await message.reply('*▶️ ' + Lang.LANG + ':* ```' + (match[1] === '' ? 'auto' : match[1]) + '```\n'
        + '*◀️ ' + Lang.FROM + '*: ```' + (match[2] === '' ? config.LANG : match[2]) + '```\n'
        + '*🔎 ' + Lang.RESULT + ':* ```' + ceviri.text + '```');
    } else {
        return await message.client.sendMessage(message.jid,Lang.TRANSLATE_ERROR,MessageType.text)
    }
}));

Asena.addCommand({pattern: 'currency(?: ([0-9.]+) ([a-zA-Z]+) ([a-zA-Z]+)|$|(.*))', fromMe: false}, (async (message, match) => {
    if(match[1] === undefined || match[2] == undefined || match[3] == undefined) {
        return await message.client.sendMessage(message.jid,Lang.CURRENCY_ERROR,MessageType.text);
    }
    let opts = {
        amount: parseFloat(match[1]).toFixed(2).replace(/\.0+$/,''),
        from: match[2].toUpperCase(),
        to: match[3].toUpperCase()
    }
    try {
        result = await exchangeRates().latest().symbols([opts.to]).base(opts.from).fetch()
        result = parseFloat(result).toFixed(2).replace(/\.0+$/,'')
        await message.reply(`\`\`\`${opts.amount} ${opts.from} = ${result} ${opts.to}\`\`\``)
    }
    catch(err) {
        if (err instanceof ExchangeRatesError) 
            await message.client.sendMessage(message.jid,Lang.INVALID_CURRENCY,MessageType.text)
        else {
            await message.client.sendMessage(message.jid,Lang.UNKNOWN_ERROR,MessageType.text)
            console.log(err)
        }
    }
}));

Asena.addCommand({pattern: 'tts (.*)', fromMe: false, desc: Lang.TTS_DESC}, (async (message, match) => {
    if(match[1] === undefined || match[1] == "")
        return;
    
    let 
        LANG = config.LANG.toLowerCase(),
        ttsMessage = match[1],
        SPEED = 1.0

    if(langMatch = match[1].match("\\{([a-z]{2})\\}")) {
        LANG = langMatch[1]
        ttsMessage = ttsMessage.replace(langMatch[0], "")
    } 
    if(speedMatch = match[1].match("\\{([0].[0-9]+)\\}")) {
        SPEED = parseFloat(speedMatch[1])
        ttsMessage = ttsMessage.replace(speedMatch[0], "")
    }
    
    var buffer = await googleTTS.synthesize({
        text: ttsMessage,
        voice: LANG
    });
    await message.client.sendMessage(message.jid,buffer, MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: true});
}));

Asena.addCommand({pattern: 'song ?(.*)' , fromMe: false, desc: Lang.SONG_DESC}, (async (message, match) => { 
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_TEXT_SONG,MessageType.text);    
    let arama = await yts(match[1]);
    arama = arama.all;
    if(arama.length < 1) return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text);
    var reply = await message.client.sendMessage(message.jid,Lang.DOWNLOADING_SONG,MessageType.text);

    let title = arama[0].title.replace(' ', '+');
    let stream = ytdl(arama[0].videoId, {
        quality: 'highestaudio',
    });
    
    got.stream(arama[0].image).pipe(fs.createWriteStream(title + '.jpg'));
    ffmpeg(stream)
        .audioBitrate(320)
        .save('./' + title + '.mp3')
        .on('end', async () => {
            const writer = new ID3Writer(fs.readFileSync('./' + title + '.mp3'));
            writer.setFrame('TIT2', arama[0].title)
                .setFrame('TPE1', [arama[0].author.name])
                .setFrame('APIC', {
                    type: 3,
                    data: fs.readFileSync(title + '.jpg'),
                    description: arama[0].description
                });
            writer.addTag();

            reply = await message.client.sendMessage(message.jid,Lang.UPLOADING_SONG,MessageType.text);
            await message.client.sendMessage(message.jid,Buffer.from(writer.arrayBuffer), MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: false});
        });
}));

Asena.addCommand({pattern: 'video ?(.*)', fromMe: false, desc: Lang.VIDEO_DESC}, (async (message, match) => { 
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_VIDEO,MessageType.text);    
    
    try {
        var arama = await yts({videoId: ytdl.getURLVideoID(match[1])});
    } catch {
        return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text);
    }

    var reply = await message.client.sendMessage(message.jid,Lang.DOWNLOADING_VIDEO,MessageType.text);

    var yt = ytdl(arama.videoId, {filter: format => format.container === 'mp4' && ['720p', '480p', '360p', '240p', '144p'].map(() => true)});
    yt.pipe(fs.createWriteStream('./' + arama.videoId + '.mp4'));

    yt.on('end', async () => {
        reply = await message.client.sendMessage(message.jid,Lang.UPLOADING_VIDEO,MessageType.text);
        await message.client.sendMessage(message.jid,fs.readFileSync('./' + arama.videoId + '.mp4'), MessageType.video, {mimetype: Mimetype.mp4,thumbnail: "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"});
    });
}));

Asena.addCommand({pattern: 'yt ?(.*)', fromMe: false, desc: Lang.YT_DESC}, (async (message, match) => { 
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text);    
    var reply = await message.client.sendMessage(message.jid,Lang.GETTING_VIDEOS,MessageType.text);

    try {
        var arama = await yts(match[1]);
    } catch {
        return await message.client.sendMessage(message.jid,Lang.NOT_FOUND,MessageType.text);
    }
    
    var mesaj = '';
    arama.all.map((video) => {
        mesaj += '*' + video.title + '* - ' + video.url + '\n'
    });

    await message.client.sendMessage(message.jid,mesaj,MessageType.text);
    await reply.delete();
}));

Asena.addCommand({pattern: 'wiki ?(.*)', fromMe: false, desc: Lang.WIKI_DESC}, (async (message, match) => { 
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text);    
    var reply = await message.client.sendMessage(message.jid,Lang.SEARCHING,MessageType.text);

    var arama = await wiki({ apiUrl: 'https://' + config.LANG + '.wikipedia.org/w/api.php' })
        .page(match[1]);

    var info = await arama.rawContent();
    await message.client.sendMessage(message.jid, info, MessageType.text);
    await reply.delete();
}));

Asena.addCommand({pattern: 'img ?(.*)', fromMe: false, desc: Lang.IMG_DESC}, (async (message, match) => { 
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text);
    gis(match[1], async (error, result) => {
        for (var i = 0; i < (result.length < 5 ? result.length : 5); i++) {
            var get = got(result[i].url, {https: {rejectUnauthorized: false}});
            var stream = get.buffer();
                
            stream.then(async (image) => {
                await message.client.sendMessage(message.jid,image, MessageType.image);
            });
        }

        message.reply(Lang.IMG.format((result.length < 5 ? result.length : 5), match[1]));
    });
}));





/*from here*/


Asena.addCommand({pattern: 'ptrt(?: |$)(\\S*) ?(\\S*)', fromMe: true, dontAddCommandList: true}, (async (message, match) => {
    if (!message.reply_message) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY,MessageType.text);
    }

    ceviri = await translatte(message.reply_message.message, {from: match[1] === '' ? 'auto' : match[1], to: match[2] === '' ? config.LANG : match[2]});
    if ('text' in ceviri) {
        return await message.reply('*▶️ ' + Lang.LANG + ':* ```' + (match[1] === '' ? 'auto' : match[1]) + '```\n'
        + '*◀️ ' + Lang.FROM + '*: ```' + (match[2] === '' ? config.LANG : match[2]) + '```\n'
        + '*🔎 ' + Lang.RESULT + ':* ```' + ceviri.text + '```');
    } else {
        return await message.client.sendMessage(message.jid,Lang.TRANSLATE_ERROR,MessageType.text)
    }
}));

Asena.addCommand({pattern: 'pcurrency(?: ([0-9.]+) ([a-zA-Z]+) ([a-zA-Z]+)|$|(.*))', fromMe: true, dontAddCommandList: true}, (async (message, match) => {
    if(match[1] === undefined || match[2] == undefined || match[3] == undefined) {
        return await message.client.sendMessage(message.jid,Lang.CURRENCY_ERROR,MessageType.text);
    }
    let opts = {
        amount: parseFloat(match[1]).toFixed(2).replace(/\.0+$/,''),
        from: match[2].toUpperCase(),
        to: match[3].toUpperCase()
    }
    try {
        result = await exchangeRates().latest().symbols([opts.to]).base(opts.from).fetch()
        result = parseFloat(result).toFixed(2).replace(/\.0+$/,'')
        await message.reply(`\`\`\`${opts.amount} ${opts.from} = ${result} ${opts.to}\`\`\``)
    }
    catch(err) {
        if (err instanceof ExchangeRatesError) 
            await message.client.sendMessage(message.jid,Lang.INVALID_CURRENCY,MessageType.text)
        else {
            await message.client.sendMessage(message.jid,Lang.UNKNOWN_ERROR,MessageType.text)
            console.log(err)
        }
    }
}));

Asena.addCommand({pattern: 'ptts (.*)', fromMe: true, dontAddCommandList: true }, (async (message, match) => {
    if(match[1] === undefined || match[1] == "")
        return;
    
    let 
        LANG = config.LANG.toLowerCase(),
        ttsMessage = match[1],
        SPEED = 1.0

    if(langMatch = match[1].match("\\{([a-z]{2})\\}")) {
        LANG = langMatch[1]
        ttsMessage = ttsMessage.replace(langMatch[0], "")
    } 
    if(speedMatch = match[1].match("\\{([0].[0-9]+)\\}")) {
        SPEED = parseFloat(speedMatch[1])
        ttsMessage = ttsMessage.replace(speedMatch[0], "")
    }
    
    var buffer = await googleTTS.synthesize({
        text: ttsMessage,
        voice: LANG
    });
    await message.client.sendMessage(message.jid,buffer, MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: true});
}));

Asena.addCommand({pattern: 'psong ?(.*)' , fromMe: true , dontAddCommandList: true}, (async (message, match) => { 
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_TEXT_SONG,MessageType.text);    
    let arama = await yts(match[1]);
    arama = arama.all;
    if(arama.length < 1) return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text);
    var reply = await message.client.sendMessage(message.jid,Lang.DOWNLOADING_SONG,MessageType.text);

    let title = arama[0].title.replace(' ', '+');
    let stream = ytdl(arama[0].videoId, {
        quality: 'highestaudio',
    });
    
    got.stream(arama[0].image).pipe(fs.createWriteStream(title + '.jpg'));
    ffmpeg(stream)
        .audioBitrate(320)
        .save('./' + title + '.mp3')
        .on('end', async () => {
            const writer = new ID3Writer(fs.readFileSync('./' + title + '.mp3'));
            writer.setFrame('TIT2', arama[0].title)
                .setFrame('TPE1', [arama[0].author.name])
                .setFrame('APIC', {
                    type: 3,
                    data: fs.readFileSync(title + '.jpg'),
                    description: arama[0].description
                });
            writer.addTag();

            reply = await message.client.sendMessage(message.jid,Lang.UPLOADING_SONG,MessageType.text);
            await message.client.sendMessage(message.jid,Buffer.from(writer.arrayBuffer), MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: false});
        });
}));

Asena.addCommand({pattern: 'pvideo ?(.*)', fromMe: true, dontAddCommandList: true}, (async (message, match) => { 
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_VIDEO,MessageType.text);    
    
    try {
        var arama = await yts({videoId: ytdl.getURLVideoID(match[1])});
    } catch {
        return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text);
    }

    var reply = await message.client.sendMessage(message.jid,Lang.DOWNLOADING_VIDEO,MessageType.text);

    var yt = ytdl(arama.videoId, {filter: format => format.container === 'mp4' && ['720p', '480p', '360p', '240p', '144p'].map(() => true)});
    yt.pipe(fs.createWriteStream('./' + arama.videoId + '.mp4'));

    yt.on('end', async () => {
        reply = await message.client.sendMessage(message.jid,Lang.UPLOADING_VIDEO,MessageType.text);
        await message.client.sendMessage(message.jid,fs.readFileSync('./' + arama.videoId + '.mp4'), MessageType.video, {mimetype: Mimetype.mp4});
    });
}));

Asena.addCommand({pattern: 'pyt ?(.*)', fromMe: true, dontAddCommandList: true}, (async (message, match) => { 
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text);    
    var reply = await message.client.sendMessage(message.jid,Lang.GETTING_VIDEOS,MessageType.text);

    try {
        var arama = await yts(match[1]);
    } catch {
        return await message.client.sendMessage(message.jid,Lang.NOT_FOUND,MessageType.text);
    }
    
    var mesaj = '';
    arama.all.map((video) => {
        mesaj += '*' + video.title + '* - ' + video.url + '\n'
    });

    await message.client.sendMessage(message.jid,mesaj,MessageType.text);
    await reply.delete();
}));

Asena.addCommand({pattern: 'pwiki ?(.*)', fromMe: true, dontAddCommandList: true}, (async (message, match) => { 
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text);    
    var reply = await message.client.sendMessage(message.jid,Lang.SEARCHING,MessageType.text);

    var arama = await wiki({ apiUrl: 'https://' + config.LANG + '.wikipedia.org/w/api.php' })
        .page(match[1]);

    var info = await arama.rawContent();
    await message.client.sendMessage(message.jid, info, MessageType.text);
    await reply.delete();
}));

Asena.addCommand({pattern: 'pimg ?(.*)', fromMe: true, dontAddCommandList: true }, (async (message, match) => { 
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text);
    gis(match[1], async (error, result) => {
        for (var i = 0; i < (result.length < 5 ? result.length : 5); i++) {
            var get = got(result[i].url, {https: {rejectUnauthorized: false}});
            var stream = get.buffer();
                
            stream.then(async (image) => {
                await message.client.sendMessage(message.jid,image, MessageType.image);
            });
        }

        message.reply(Lang.IMG.format((result.length < 5 ? result.length : 5), match[1]));
    });
}));

