const Discord = require('discord.js')
const { MessageEmbed } = Discord;
const requestPromise = require('request-promise');
const _ = require('lomath');

const testwebhook = new Discord.WebhookClient(
    '344604784508141579',
    'sD5YJlhJWKeW6ncoat2DyDWzAvll2BoxJ4cgefnZ0d5F_De25MsGP-6OQwQ5-9Xe3M-h'
    )
        

        

// Create an instance of Discord that we will use to control the bot
const bot = new Discord.Client();

// Token for your bot, located in the Discord application console - https://discordapp.com/developers/applications/me/
const token = 'MzQzNjY2MzE3MzAxMTIxMDI1.DGtykQ.CALeN23qizecSvv_tiWFWBwTUyk';

//strip object and functions from main object, removes circular json
function simpleStringify (object){
    var simpleObject = {};
    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    console.log(JSON.stringify(simpleObject)); // returns cleaned up JSON)
    return simpleObject; // returns cleaned up JSON
};

// Gets called when our bot is successfully logged in and connected
bot.on('ready', () => {
    console.log('Hello World!');
});

// Event to listen to messages sent to the server where the bot is located
bot.on('message', message => {

    const channel = message.channel;
    console.log('channel.id:'+channel.id)

    // So the bot doesn't reply to iteself
    console.log('author:'+message.author.username);
    if (message.author.username === 'valor-bot') return;
    if (message.author.username === 'GymHuntrBot') {
        //channel.send('message:');
        channel.send(message);
        //console.log('message:'); console.log(message);
        if(message.embeds !=null && message.embeds.length >0) {
            var msgEmbed = message.embeds[0];

            console.log('@@@@@@ embeds:');

            if(msgEmbed instanceof MessageEmbed) {
                console.log('thumburl:'+ msgEmbed['thumbnail']['url']);
                console.log('url:'+msgEmbed['url']);
                console.log('title:'+msgEmbed['title']);
                console.log('desc:'+msgEmbed['description']);
                channel.send({embed:{
                    color:3447003,
                    url: msgEmbed['url'],
                    thumbnail : {
                        url:'https://raw.githubusercontent.com/kvangent/PokeAlarm/master/icons/150.png'
                    },
                    title: msgEmbed['title'],
                    description: msgEmbedp['description']
                }});
            }else {
                console.log('NOT a MessageEmbed type')
            }
        } else {
            console.log('--embds ={}');
        }
        //channel.send('--- attachments:'+ JSON.stringify(message.attachments);
    }
    // Check if the message starts with the `!` trigger
    if (message.content.indexOf('!') === 0) {
        // Get the user's message excluding the `!`
        var text = message.content.substring(1);
        
        // Reverse the message
        var reversed = '';
        var i = text.length;
        
        while (i > 0) {
            reversed += text.substring(i - 1, i);
            i--;
        }
        
        // Reply to the user's message
        //message.reply(reversed);
        channel.send(reversed);
        channel.send({embed:{
            color:3447003,
            url: 'https://www.google.com',
            thumbnail : {
                url:'https://raw.githubusercontent.com/kvangent/PokeAlarm/master/icons/150.png'
            },
            title: 'Welcome to team-tangerine-bot',
            description: "We're all fun in games"
        }});


        //WEBHOOK to another server W-2
        //https://discordapp.com/api/webhooks/344604784508141579/sD5YJlhJWKeW6ncoat2DyDWzAvll2BoxJ4cgefnZ0d5F_De25MsGP-6OQwQ5-9Xe3M-h
        testwebhook.send({embed:{
            color:3447003,
            url: 'https://www.google.com',
            thumbnail : {
                url:'https://raw.githubusercontent.com/kvangent/PokeAlarm/master/icons/150.png'
            },
            title: 'DISCORD.JS webhook embed',
            description: "We're all fun in games"
        }});
        testwebhook.send('simple text message using Discord.js WebhookClient');
        
        var tmp = _.flattenJSON({
                embeds: [{
                    color:3447003,
                    url: 'https://www.google.com',
                    thumbnail : {
                        url:'https://raw.githubusercontent.com/kvangent/PokeAlarm/master/icons/150.png'
                    },
                    title: 'From API call request-promise!!',
                    description: "We're all fun in games"
                }]
            });
        console.log('flattendFormData:'+JSON.stringify(tmp));

        var options = {
            method: 'POST',
            uri: 'https://discordapp.com/api/webhooks/344604784508141579/sD5YJlhJWKeW6ncoat2DyDWzAvll2BoxJ4cgefnZ0d5F_De25MsGP-6OQwQ5-9Xe3M-h',
            body/*formData*/: JSON.stringify(tmp)
        }
        
        requestPromise(options)
            .then(function(body){
                console.log('succeeded');
            })
            .catch(function(err){
                console.log('POST failed');
                console.log(err);
            });
        

    }
});

bot.login(token);