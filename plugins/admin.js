/* Copyright (C) 2020 Yusuf Usta.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsAsena - Yusuf Usta
*/

const {MessageType, GroupSettingChange} = require('@adiwajshing/baileys');
const Asena = require('../events');

const Language = require('../language');
const Lang = Language.getString('admin');


async function checkImAdmin(message, user = message.client.user.jid) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {
        if (member.id.split('@')[0] === user.split('@')[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}




Asena.addCommand({pattern: 'admin', fromMe: false, desc: Lang.ADMINDESC}, (async (message, match) => {    

    await message.sendMessage('💻Usage: *.ban*\nℹ️Desc: Ban someone in the group. Reply to message or tag a person to use command. \n\n💻Usage: *.add*\nℹ️Desc:Adds someone to the group. \n\n💻Usage: *.mute*\nℹ️Desc: Mute the group chat. Only the admins can send a message.\n\n💻Usage: *.unmute*\nℹ️Desc: Unmute the group chat. Anyone can send a message.\n\n💻Usage: *.promote*\nℹ️Desc: Makes any person an admin.\n\n💻Usage: *.demote*\nℹ️Desc: Takes the authority of any admin.\n\n💻Usage: *.plugin*\nℹ️Desc: Install external plugins.\n\n💻Usage: *.remove*\nℹ️Desc: Removes the plugin.\n\n💻Usage: *.invite*\nℹ️Desc: Provides invitation link of the group.\n\n💻Usage: *.locate*\nℹ️Desc: It will send the location of the bots device.\n\n💻Usage: *.afk*\nℹ️Desc: It makes the bot AFK - Away From Keyboard..\n\n💻Usage: *.term*\nℹ️Desc: Allows to run the command on the terminal of the server.\n\n💻Usage: *.restart*\nℹ️Desc: Restart the bot.\n\n💻Usage: *.shutdown*\nℹ️Desc: Shutdown the Bot.\n\n💻Usage: *.setvar*\nℹ️Desc: Set heroku config var.\n\n💻Usage: *.getvar*\nℹ️Desc: Get heroku config var.\n\n💻Usage: *.delvar*\nℹ️Desc: Delete heroku config var.\n\n💻Usage: *.filter*\nℹ️Desc: It adds a filter. If someone writes your filter, it send the answer. If you just write .filter, it will show your filter list.\n\n💻Usage: *.stop*\nℹ️Desc: Stops the filter you added previously.\n\n💻Usage: *.welcome*\nℹ️Desc: It sets the welcome message. If you leave it blank it shows the preset welcome message.\n\n💻Usage: *.goodbye*\nℹ️Desc: Sets the goodbye message. If you leave blank, it will show the preset goodbye message.\n\n💻Usage: *.addlydia*\nℹ️Desc: Activates Lydia (AI) for the tagged user.\n\n💻Usage: *.rmlydia*\nℹ️Desc: Makes Lydia disabled for the tagged user.\n\n💻Usage: *.kickme*\nℹ️Desc: It kicks the bot from the group where the command is given.\n\n💻Usage: *.pp*\nℹ️Desc: Makes the photo you reply the profile photo .\n\n💻Usage: *.block*\nℹ️Desc: Block tagged user..\n\n💻Usage: *.unblock*\nℹ️Desc: Unblock tagged user.\n\n💻Usage: *.jid*\nℹ️Desc: Gives the JID of the user.\n\n💻Usage *.tagall*\nℹ️Desc: Tags everyone in the group..\n\n💻Usage: *.update*\nℹ️Desc: Checks the update.\n\n💻Usage: *.update now*\nℹ️Desc: It updates the bot.\n\n💻Usage: *.deleteNotes*\nℹ️Desc: deletes all of your saved notes.\n\n💻Usage: *.save*\nℹ️Desc: To save a text as a note.\n\n💻Usage: *.spam*\nℹ️Desc: It will spam untill you stop it.\n\n💻Usage: *.killspam*\nℹ️Desc: Stops the spamming.');

}));




Asena.addCommand({pattern: 'ban ?(.*)', fromMe: true, onlyGroup: true, desc: Lang.BAN_DESC, dontAddCommandList: true}, (async (message, match) => {  
    var im = await checkImAdmin(message);
    if (!im) return await message.client.sendMessage(message.jid,Lang.IM_NOT_ADMIN,MessageType.text);

    if (message.reply_message !== false) {
        await message.client.sendMessage(message.jid,'@' + message.reply_message.data.participant.split('@')[0] + '```, ' + Lang.BANNED + '```', MessageType.text, {contextInfo: {mentionedJid: [message.reply_message.data.participant]}});
        await message.client.groupRemove(message.jid, [message.reply_message.data.participant]);
    } else if (message.reply_message === false && message.mention !== false) {
        var etiketler = '';
        message.mention.map(async (user) => {
            etiketler += '@' + user.split('@')[0] + ',';
        });

        await message.client.sendMessage(message.jid,etiketler + '```, ' + Lang.BANNED + '```', MessageType.text, {contextInfo: {mentionedJid: message.mention}});
        await message.client.groupRemove(message.jid, message.mention);
    } else {
        return await message.client.sendMessage(message.jid,Lang.GIVE_ME_USER,MessageType.text);
    }
}));

Asena.addCommand({pattern: 'add(?: |$)(.*)', fromMe: true, onlyGroup: true, desc: Lang.ADD_DESC, dontAddCommandList: true}, (async (message, match) => {  
    var im = await checkImAdmin(message);
    if (!im) return await message.client.sendMessage(message.jid,Lang.IM_NOT_ADMIN,MessageType.text);
    
    if (match[1] !== '') {
        match[1].split(' ').map(async (user) => {
            await message.client.groupAdd(message.jid, [user + "@s.whatsapp.net"]);
            await message.client.sendMessage(message.jid,'```' + user + ' ' + Lang.ADDED +'```');
        });
    } else {
        return await message.client.sendMessage(message.jid,Lang.GIVE_ME_USER,MessageType.text);
    }
}));

Asena.addCommand({pattern: 'promote ?(.*)', fromMe: true, onlyGroup: true, desc: Lang.PROMOTE_DESC, dontAddCommandList: true}, (async (message, match) => {    
    var im = await checkImAdmin(message);
    if (!im) return await message.client.sendMessage(message.jid,Lang.IM_NOT_ADMIN,MessageType.text);

    if (message.reply_message !== false) {
        var checkAlready = await checkImAdmin(message, message.reply_message.data.participant);
        if (checkAlready) {
            return await message.client.sendMessage(message.jid,Lang.ALREADY_PROMOTED, MessageType.text);
        }

        await message.client.sendMessage(message.jid,'@' + message.reply_message.data.participant.split('@')[0] + Lang.PROMOTED, MessageType.text, {contextInfo: {mentionedJid: [message.reply_message.data.participant]}});
        await message.client.groupMakeAdmin(message.jid, [message.reply_message.data.participant]);
    } else if (message.reply_message === false && message.mention !== false) {
        var etiketler = '';
        message.mention.map(async (user) => {
            var checkAlready = await checkImAdmin(message, user);
            if (checkAlready) {
                return await message.client.sendMessage(message.jid,Lang.ALREADY_PROMOTED, MessageType.text);
            }

            etiketler += '@' + user.split('@')[0] + ',';
        });

        await message.client.sendMessage(message.jid,etiketler + Lang.PROMOTED, MessageType.text, {contextInfo: {mentionedJid: message.mention}});
        await message.client.groupMakeAdmin(message.jid, message.mention);
    } else {
        return await message.client.sendMessage(message.jid,Lang.GIVE_ME_USER,MessageType.text);
    }
}));

Asena.addCommand({pattern: 'demote ?(.*)', fromMe: true, onlyGroup: true, desc: Lang.DEMOTE_DESC, dontAddCommandList: true}, (async (message, match) => {    
    var im = await checkImAdmin(message);
    if (!im) return await message.client.sendMessage(message.jid,Lang.IM_NOT_ADMIN);

    if (message.reply_message !== false) {
        var checkAlready = await checkImAdmin(message, message.reply_message.data.participant.split('@')[0]);
        if (!checkAlready) {
            return await message.client.sendMessage(message.jid,Lang.ALREADY_NOT_ADMIN, MessageType.text);
        }

        await message.client.sendMessage(message.jid,'@' + message.reply_message.data.participant.split('@')[0] + Lang.DEMOTED, MessageType.text, {contextInfo: {mentionedJid: [message.reply_message.data.participant]}});
        await message.client.groupDemoteAdmin(message.jid, [message.reply_message.data.participant]);
    } else if (message.reply_message === false && message.mention !== false) {
        var etiketler = '';
        message.mention.map(async (user) => {
            var checkAlready = await checkImAdmin(message, user);
            if (!checkAlready) {
                return await message.client.sendMessage(message.jid,Lang.ALREADY_NOT_ADMIN, MessageType.text);
            }
            
            etiketler += '@' + user.split('@')[0] + ',';
        });

        await message.client.sendMessage(message.jid,etiketler + Lang.DEMOTED, MessageType.text, {contextInfo: {mentionedJid: message.mention}});
        await message.client.groupDemoteAdmin(message.jid, message.mention);
    } else {
        return await message.client.sendMessage(message.jid,Lang.GIVE_ME_USER,MessageType.text);
    }
}));

Asena.addCommand({pattern: 'mute ?(.*)', fromMe: true, onlyGroup: true, desc: Lang.MUTE_DESC, dontAddCommandList: true}, (async (message, match) => {    
    var im = await checkImAdmin(message);
    if (!im) return await message.client.sendMessage(message.jid,Lang.IM_NOT_ADMIN,MessageType.text);
   
    
    if (Config.MUTEMSG == 'default') {
        await message.client.groupSettingChange(message.jid, GroupSettingChange.messageSend, true);
        await message.client.sendMessage(message.jid,Lang.MUTED,MessageType.text);
    }
    else {
        await message.client.groupSettingChange(message.jid, GroupSettingChange.messageSend, true);
        await message.client.sendMessage(message.jid,Config.MUTEMSG,MessageType.text);
    }
}));

Asena.addCommand({pattern: 'unmute ?(.*)', fromMe: true, onlyGroup: true, desc: Lang.UNMUTE_DESC, dontAddCommandList: true}, (async (message, match) => {    
    var im = await checkImAdmin(message);
    if (!im) return await message.client.sendMessage(message.jid,Lang.IM_NOT_ADMIN,MessageType.text);
   
    
    if (Config.UNMUTEMSG == 'default') {
        await message.client.groupSettingChange(message.jid, GroupSettingChange.messageSend, false);
        await message.client.sendMessage(message.jid,Lang.UNMUTED,MessageType.text);
    }
    else {
        await message.client.groupSettingChange(message.jid, GroupSettingChange.messageSend, false);
        await message.client.sendMessage(message.jid,Config.UNMUTEMSG,MessageType.text);
    }
}));

Asena.addCommand({pattern: 'invite ?(.*)', fromMe: true, onlyGroup: true, desc: Lang.INVITE_DESC, dontAddCommandList: true}, (async (message, match) => {    
    var im = await checkImAdmin(message);
    if (!im) return await message.client.sendMessage(message.jid,Lang.IM_NOT_ADMIN, MessageType.text);
    var invite = await message.client.groupInviteCode(message.jid);
    await message.client.sendMessage(message.jid,Lang.INVITE + ' https://chat.whatsapp.com/' + invite, MessageType.text);
}));

module.exports = {
    checkImAdmin: checkImAdmin
};
