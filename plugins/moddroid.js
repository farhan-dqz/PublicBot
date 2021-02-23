/*
# Copyright (C) 2020 MuhammedKpln.
#
# WhatsAsena is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# WhatsAsena is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
#
*/

const Asena = require('../events');
const { MessageType, } = require('@adiwajshing/baileys');
const axios = require('axios');

const Language = require('../language');
const { errorMessage, infoMessage } = require('../helpers');
const Lang = Language.getString('instagram');

Asena.addCommand({ pattern: 'modd ?(.*)', fromMe: false, usage: Lang.USAGE, desc: Lang.DESC }, (async (message, match) => {

    const userName = match[1]

    if (!userName) return await message.sendMessage(errorMessage(Lang.NEED_WORD));

    await message.sendMessage(infoMessage(Lang.LOADING))

    const { data: { graphql: { user } } } = await axios.get(`https://tobz-api.herokuapp.com/api/moddroid?q=${userName}&apikey=BotWeA`)

    const { image, title, size, publisher, genre, latest_version, link } = user

    const profileBuffer = await axios.get(image, { responseType: 'arraybuffer' })

    const msg = `
    *${Lang.NAME}*: ${title}
    *${Lang.USERNAME}*: ${size}
    *${Lang.BIO}*: ${publisher}
    *${Lang.FOLLOWERS}*: ${genre}
    *${Lang.FOLLOWS}*: $latest_version}
    *${Lang.ACCOUNT}*: ${link}`

    await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, { caption: msg })

    


}));
