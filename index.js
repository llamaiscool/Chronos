require('dotenv').config();
const Boss = require("./boss.js")
const bossData = require("./bosses.json");
const channel_id = "1139671716088524810";

const color = {
    green: 0x40f56a,
    yellow: 0xedc945,
    blue: 0x4548ed
}

const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
      Discord.GatewayIntentBits.Guilds,
      Discord.GatewayIntentBits.GuildMessages,
    ]
  })

  

//login!
console.log('logging in')
client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    setup();
  });

let bosses = {}

function setup() {
    console.log("starting setup\n");
    for (const enemy in bossData) {
        console.log("enemy: ", enemy);
        const boss = new Boss(bossData[enemy].name, bossData[enemy].respawnTime, bossData[enemy].windowLength);
        const name = boss.name;
        if (bosses[name]) {
            console.error("error: duplicate boss name " + name + ". Ignoring duplicate.");
            continue;
        }
        bosses[name] = boss;
        console.log("registered boss " + name + "!\n");
    }
    console.log("setup complete!\n");
}

function handleNameError(name) {
    const embed = new Discord.EmbedBuilder()
      .setTitle("Boss name '" + name + "' not recognized\n")
      .setColor(color.yellow)
      .setDescription("Please double check the spelling\n");
    client.channels.cache.get(channel_id).send({embeds: [embed]});
}

client.on('messageCreate', msg => {
    //exit if the author is a bot
    if(message.author.bot){
      return;
    }
    
    if(msg.content === "Soon") {
        //fetch timers
        let message = ""
        for (const boss in bosses) {
            message += boss.getTimeUntilBossIsOpen + "\n"
        }
        const embed = new Discord.EmbedBuilder()
        .setTitle("Timers")
        .setColor(color.green)
        .setDescription();
        client.channels.cache.get(channel_id).send({embeds: [embed]});
    }
    else {
        //const boss = bosses[msg.content];
        //if (boss === null || boss === undefined) return handleNameError(msg.content);
        
        //rest boss timer
        //boss.resetTimer();
        const embed = new Discord.EmbedBuilder()
        //.setTitle("Reset timer for " + boss.name)
        .setColor(color.green)
        .setDescription("Replaying message: " + msg.content);
        client.channels.cache.get(channel_id).send({embeds: [embed]});
    }
  });
