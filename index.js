const Discord = require('discord.js')
const { MessageEmbed } = Discord;

const valorwebhook = new Discord.WebhookClient(
    '344709089399537665',
    '3CxdUzHPZL_GHRFDWN8uBi56ZO5cV9mmhvEIUo5kooG3dvFR9WFZXzeBwZjSTfaNe96J'    
    );    
const testwebhook = new Discord.WebhookClient(
    '344685532267282434',
    'haBRxdznZg5tDDBZbmnAxN45QM2mm0CjOddgXjgx4mK3Q9b9sq_oppc-Yu7KebgWduH2'
    );
// Create an instance of Discord that we will use to control the bot
const bot = new Discord.Client();               

// Token for your bot, located in the Discord application console - https://discordapp.com/developers/applications/me/
const token = 'MzQzNjY2MzE3MzAxMTIxMDI1.DGtykQ.CALeN23qizecSvv_tiWFWBwTUyk';


// Gets called when our bot is successfully logged in and connected
bot.on('ready', () => {
    console.log('Hello World!');
});

// Event to listen to messages sent to the server where the bot is located
bot.on('message', message => {

    const channel = message.channel;
    console.log('channel.id:'+channel.id)
    console.log('author:'+message.author.username);
    
    // So the bot doesn't reply to iteself    
    if (message.author.username === 'valor-bot') return;
    
    if (message.author.username === 'GymHuntrBot') {
        channel.send(message);
        //console.log('message:'); console.log(message);

        if(message.embeds !=null && message.embeds.length >0) {
            var msgEmbed = message.embeds[0];

            console.log('@@@@@@ embeds:');

            if(msgEmbed instanceof MessageEmbed) {
                var thumb_url = msgEmbed['thumbnail']['url'];
                var location_url = msgEmbed['url'] || '';
                var title = msgEmbed['title'];
                var description = msgEmbed['description'];

                if(location_url.indexOf("#") >= 0 ) {
                    location_url = location_url.substring(location_url.indexOf('#') + 1);

                    //create gmaps link
                    location_url = 'http://maps.google.com/?q=' + location_url;
                }

                console.log('thumburl:' + thumb_url);
                console.log('location_url:' + location_url);
                console.log('title:' + title );
                console.log('desc:' + description);

                channel.send({embed:{
                    color:3447003,
                    url: location_url,
                    thumbnail : {
                        url:thumb_url
                    },
                    title: title,
                    description: description
                }});

                valorwebhook.send("",{
                    embeds: [{
                        color:3447003,
                        url: location_url,
                        thumbnail : {
                            url:thumb_url
                        },
                        title: title,
                        description: description
                    }]
                }).catch(console.error);
      
            } else {
                console.log('NOT a MessageEmbed type')
            }
        }       
    }
    // Check if the message starts with the `!` trigger
    if (message.content.indexOf('!') === 0) {
        // Send a slack message
        testwebhook.send("",{
            embeds: [{
                color:3447003,
                url: 'https://maps.google.com?q=33.66509,-117.872076',
                thumbnail : {
                    url:'https://raw.githubusercontent.com/kvangent/PokeAlarm/master/icons/150.png'
                },
                title: 'Level 5 raid has started!',
                description: "**San Paulo Park.**\nZapdos\nCP:1902.\n*Raid Ending: 0 Hours 56 min 8 sec*"
            }]
        }).catch(console.error);
    }
});

bot.login(token);