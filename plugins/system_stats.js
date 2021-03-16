/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
Developer & Co-Founder - Phaticusthiccy
*/

const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const {spawnSync} = require('child_process');
const Config = require('../config');
const chalk = require('chalk');

const Language = require('../language');
const Lang = Language.getString('system_stats');

Asena.addCommand({pattern: 'alive', fromMe: false, desc: Lang.ALIVE_DESC}, (async (message, match) => {
    if (Config.ALIVEMSG == 'default') {
        await message.client.sendMessage(message.jid,'```Bot is alive!```\n\n*Version:* ```'+Config.VERSION+'```\n*Branch:* ```'+Config.BRANCH+'```\n Type .help for command list \n' , MessageType.text);
    }
    else {
        await message.client.sendMessage(message.jid,Config.ALIVEMSG, MessageType.text);
    }
}));

Asena.addCommand({pattern: 'sysd', fromMe: false, desc: Lang.SYSD_DESC}, (async (message, match) => {
    const child = spawnSync('neofetch', ['--stdout']).stdout.toString('utf-8')
    await message.sendMessage(
        '```' + child + '```', MessageType.text
    );
}));


Asena.addCommand({pattern: 'palive', fromMe: true, dontAddCommandList: true }, (async (message, match) => {
    if (Config.ALIVEMSG == 'default') {
        await message.client.sendMessage(message.jid,'```Tanrı Türk\'ü Korusun. 🐺 Asena Hizmetinde!```\n\n*Version:* ```'+Config.VERSION+'```\n*Branch:* ```'+Config.BRANCH+'```\n*Telegram Group:* https://t.me/AsenaSupport\n*Telegram Channel:* https://t.me/whatsasenaremaster' , MessageType.text);
    }
    else {
        await message.client.sendMessage(message.jid,Config.ALIVEMSG, MessageType.text);
    }
}));

Asena.addCommand({pattern: 'psysd', fromMe: true , dontAddCommandList: true}, (async (message, match) => {
    const child = spawnSync('neofetch', ['--stdout']).stdout.toString('utf-8')
    await message.sendMessage(
        '```' + child + '```', MessageType.text
    );
}));
