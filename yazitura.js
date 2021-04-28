const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('../config');

const Language = require('../language');

{

    Asena.addCommand({pattern: 'yazitura', fromMe: true}, (async (message, match) => {

    await message.sendMessage('```Yazı tura atılıyor...🪙```');

        var r_text = new Array ();

        r_text[0] = "https://i.hizliresim.com/8u0mng.PNG";
        r_text[1] = "https://i.hizliresim.com/kce8yx.PNG";

        var i = Math.floor(2*Math.random())

        var respoimage = await axios.get(`${r_text[i]}`, { responseType: 'arraybuffer' })

        await message.client.sendMessage(message.jid, Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.png})
    }));
}
