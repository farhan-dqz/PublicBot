/* Copyright (C) 2021 Vai838.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
WhatsAsenaDuplicated
*/

const Asena = require('../events');
const { MessageType } = require('@adiwajshing/baileys');
const axios = require('axios');
const TinyURL = require('tinyurl');
const Language = require('../language');
const { errorMessage, infoMessage } = require('../helpers');
const Lang = Language.getString('instagram') ;





 /*

Asena.addCommand({ pattern: 'pic ?(.*)', fromMe: false,  dontAddCommandList: true}, async (message, match) => {
 const userName = match[1]
        
   var nos , userName;
    if (match[1].includes(';')) {
        var split = match[1].split(';');
         nos = split[1];
        userName = split[0];
    }
  else nos = "5"

    if (!userName) return await message.sendMessage("pic of what?")

    await message.sendMessage(infoMessage("Loading"))
          
     
    await axios
      .get(`https://gratisancok.herokuapp.com/api/googleimage?kata=${userName}&apikey=ZailaniGans`)
      .then(async (response) => {
        const {
          [0],
        } = response.data.result.result

        const profileBuffer = await axios.get([0], {responseType: 'arraybuffer'})

        const msg = ``

        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg
        })
      })
      .catch(
        async (err) => await message.sendMessage("Error"),
      )
  },

 )

*/

Asena.addCommand({ pattern: 'pint ?(.*)', fromMe: false,  desc: "Gives you a pic from pinterest"}, async (message, match) => {
    
        const userName = match[1]
        
    if (!userName) return await message.sendMessage("pic of what?")

    await message.sendMessage(" ")
          
    await axios
      .get(`https://gratisancok.herokuapp.com/api/pinterest?kata=${userName}&apikey=ZailaniGans`)
      .then(async (response) => {
        const {
          result,
        } = response.data

        const profileBuffer = await axios.get(result, {responseType: 'arraybuffer'})

        const msg = `${result}`

        await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.image, {
          caption: msg
        })
            await message.sendMessage(message.jid, msg,MessageType.text,{quoted:message.data})
      })
      .catch(
        async (err) => await message.sendMessage(""),
      )
  },

 )

/*The below function works only if your server ip is indian. Try termux instead of heroku server if u need*/

Asena.addCommand({ pattern: 'cowin ?(.*)', fromMe: false,   dontAddCommandList: true}, async (message, match) => {
    
        const userName = match[1]
        
        var pin, date;
    if (match[1].includes(';')) {
        var split = match[1].split(';');
        date = split[1];
        pin = split[0];
}
    /* if (!match[1] return await message.sendMessage("give me the pincode and date seperated by ; .")   
    if (!pin) return await message.sendMessage("give me the pincode")
    if (!date) return await message.sendMessage("where is the date")*/
    await message.sendMessage(" You will get results only if the ip address is indian.\n So open the given link in ur browser.")
  
 
 TinyURL.shorten(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`, async(res, err) => {
      if (err)
        await message.client.sendMessage(message.jid, '*#### Error! ####*\n\n' + '```' + err + '```', MessageType.text);

        await message.client.sendMessage(message.jid,`*Link:* ` + res, MessageType.text)
    });
 
 
 
 
 
 
    await axios
      .get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`)
      .then(async (response) => {
        const {
          name,
          address,
         state_name,
         district_name,
        block_name,
       pincode,
        from,
        to,
        fee_type,
        } = response.data.centers[0]


        const msg = `*${"Centre name"}*: ${name}\n*${"Address"}*: ${address}\n*${"State"}*: ${state_name}\n*${"District"}*: ${district_name}\n*${"Block"}*: ${block_name}\n*${"Pincode"}*: ${pincode}\n*${"From"}*: ${from}\n*${"To"}*: ${to}\n*${"Fee"}*: ${fee_type}\n`

       
        await message.sendMessage(message.jid, msg,MessageType.text,{quoted:message.data})
      })

   
 await axios
      .get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`)
      .then(async (response) => {
        const {
          date,
          available_capacity,
         min_age_limit,
         vaccine,
        } = response.data.centers[0].sessions[0]


        const msg = `*${"Min Age Limit"}*: ${min_age_limit}\n*${"Date"}*: ${date}\n*${"Available capacity"}*: ${available_capacity}\n*${"Vaccine"}*: ${vaccine}\n\n`

       
        await message.sendMessage(message.jid, msg,MessageType.text,{quoted:message.data})
      })


 await axios
      .get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`)
      .then(async (response) => {
        const {
          name,
          address,
         state_name,
         district_name,
        block_name,
       pincode,
        from,
        to,
        fee_type,
        } = response.data.centers[1]


        const msg = `*${"Centre name"}*: ${name}\n*${"Address"}*: ${address}\n*${"State"}*: ${state_name}\n*${"District"}*: ${district_name}\n*${"Block"}*: ${block_name}\n*${"Pincode"}*: ${pincode}\n*${"From"}*: ${from}\n*${"To"}*: ${to}\n*${"Fee"}*: ${fee_type}\n`

       
        await message.sendMessage(message.jid, msg,MessageType.text,{quoted:message.data})
      })

      


 await axios
      .get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`)
      .then(async (response) => {
        const {
          date,
          available_capacity,
         min_age_limit,
         vaccine,
        } = response.data.centers[0].sessions[0]


        const msg = `*${"Min Age Limit"}*: ${min_age_limit}\n*${"Date"}*: ${date}\n*${"Available capacity"}*: ${available_capacity}\n*${"Vaccine"}*: ${vaccine}\n\n`

       
        await message.sendMessage(message.jid, msg,MessageType.text,{quoted:message.data})
      })


  await axios
      .get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`)
      .then(async (response) => {
        const {
          date,
          available_capacity,
         min_age_limit,
         vaccine,
        } = response.data.centers[0].sessions[1]


        const msg = `*${"Min Age Limit"}*: ${min_age_limit}\n*${"Date"}*: ${date}\n*${"Available capacity"}*: ${available_capacity}\n*${"Vaccine"}*: ${vaccine}\n\n`

       
        await message.sendMessage(message.jid, msg,MessageType.text,{quoted:message.data})
      })


  await axios
      .get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`)
      .then(async (response) => {
        const {
          name,
          address,
         state_name,
         district_name,
        block_name,
       pincode,
        from,
        to,
        fee_type,
        } = response.data.centers[2]


        const msg = `*${"Centre name"}*: ${name}\n*${"Address"}*: ${address}\n*${"State"}*: ${state_name}\n*${"District"}*: ${district_name}\n*${"Block"}*: ${block_name}\n*${"Pincode"}*: ${pincode}\n*${"From"}*: ${from}\n*${"To"}*: ${to}\n*${"Fee"}*: ${fee_type}\n`

       
        await message.sendMessage(message.jid, msg,MessageType.text,{quoted:message.data})
      })

   
 await axios
      .get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`)
      .then(async (response) => {
        const {
          date,
          available_capacity,
         min_age_limit,
         vaccine,
        } = response.data.centers[2].sessions[0]


        const msg = `*${"Min Age Limit"}*: ${min_age_limit}\n*${"Date"}*: ${date}\n*${"Available capacity"}*: ${available_capacity}\n*${"Vaccine"}*: ${vaccine}\n\n`

       
        await message.sendMessage(message.jid, msg,MessageType.text,{quoted:message.data})
      })
 
 
  await axios
      .get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`)
      .then(async (response) => {
        const {
          name,
          address,
         state_name,
         district_name,
        block_name,
       pincode,
        from,
        to,
        fee_type,
        } = response.data.centers[3]


        const msg = `*${"Centre name"}*: ${name}\n*${"Address"}*: ${address}\n*${"State"}*: ${state_name}\n*${"District"}*: ${district_name}\n*${"Block"}*: ${block_name}\n*${"Pincode"}*: ${pincode}\n*${"From"}*: ${from}\n*${"To"}*: ${to}\n*${"Fee"}*: ${fee_type}\n`

       
        await message.sendMessage(message.jid, msg,MessageType.text,{quoted:message.data})
      })

   
 await axios
      .get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`)
      .then(async (response) => {
        const {
          date,
          available_capacity,
         min_age_limit,
         vaccine,
        } = response.data.centers[3].sessions[0]


        const msg = `*${"Min Age Limit"}*: ${min_age_limit}\n*${"Date"}*: ${date}\n*${"Available capacity"}*: ${available_capacity}\n*${"Vaccine"}*: ${vaccine}\n\n`

       
        await message.sendMessage(message.jid, msg,MessageType.text,{quoted:message.data})
      })
 
 
 
  await axios
      .get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`)
      .then(async (response) => {
        const {
          name,
          address,
         state_name,
         district_name,
        block_name,
       pincode,
        from,
        to,
        fee_type,
        } = response.data.centers[4]


        const msg = `*${"Centre name"}*: ${name}\n*${"Address"}*: ${address}\n*${"State"}*: ${state_name}\n*${"District"}*: ${district_name}\n*${"Block"}*: ${block_name}\n*${"Pincode"}*: ${pincode}\n*${"From"}*: ${from}\n*${"To"}*: ${to}\n*${"Fee"}*: ${fee_type}\n`

       
        await message.sendMessage(message.jid, msg,MessageType.text,{quoted:message.data})
      })

   
 await axios
      .get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`)
      .then(async (response) => {
        const {
          date,
          available_capacity,
         min_age_limit,
         vaccine,
        } = response.data.centers[4].sessions[0]


        const msg = `*${"Min Age Limit"}*: ${min_age_limit}\n*${"Date"}*: ${date}\n*${"Available capacity"}*: ${available_capacity}\n*${"Vaccine"}*: ${vaccine}\n\n`

       
        await message.sendMessage(message.jid, msg,MessageType.text,{quoted:message.data})
      })
 
  await axios
      .get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`)
      .then(async (response) => {
        const {
          name,
          address,
         state_name,
         district_name,
        block_name,
       pincode,
        from,
        to,
        fee_type,
        } = response.data.centers[5]


        const msg = `*${"Centre name"}*: ${name}\n*${"Address"}*: ${address}\n*${"State"}*: ${state_name}\n*${"District"}*: ${district_name}\n*${"Block"}*: ${block_name}\n*${"Pincode"}*: ${pincode}\n*${"From"}*: ${from}\n*${"To"}*: ${to}\n*${"Fee"}*: ${fee_type}\n`

       
        await message.sendMessage(message.jid, msg,MessageType.text,{quoted:message.data})
      })

   
 await axios
      .get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`)
      .then(async (response) => {
        const {
          date,
          available_capacity,
         min_age_limit,
         vaccine,
        } = response.data.centers[5].sessions[0]


        const msg = `*${"Min Age Limit"}*: ${min_age_limit}\n*${"Date"}*: ${date}\n*${"Available capacity"}*: ${available_capacity}\n*${"Vaccine"}*: ${vaccine}\n\n`

       
        await message.sendMessage(message.jid, msg,MessageType.text,{quoted:message.data})
      })
 
  
       
 .catch(
        async (err) => await message.client.sendMessage(message.jid,"Error", MessageType.text, {quoted: message.data}),
      )
  },

 )


