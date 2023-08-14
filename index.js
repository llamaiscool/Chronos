require('dotenv').config();
const Boss = require("./boss.js")
const bossData = require("./bosses.json");

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
  });

let bosses = {}

function setup() {
    for (const enemy in bossData) {
        const boss = new Boss(enemy.name, enemy.respawnTime, enemy.windowLength);
        const name = boss.name;
        if (bosses[name]) {
            console.error("error: duplicate boss name " + name + ". Ignoring duplicate.");
            continue;
        }
        bosses[name] = boss;
    }
}

function handleNameError(name) {
    const embed = new Discord.MessageEmbed()
      .setTitle("Boss name '" + name + "' not recognized\n")
      .setColor(color.red)
      .setDescription("Please double check the spelling\n");
      client.channels.cache.get(channel_id).send({embeds: [embed]});
}

client.on('messageCreate', msg => {
    if(msg.content === "Soon") {
        //fetch timers
        let message = ""
        for (const boss in bosses) {
            message += boss.getTimeUntilBossIsOpen + "\n"
        }
        const embed = new Discord.MessageEmbed()
        .setTitle("Timers")
        .setColor(color.Green)
        .setDescription();
        client.channels.cache.get(channel_id).send({embeds: [embed]});
    }
    else {
        const boss = bosses[msg.content];
        if (boss === null || boss === undefined) return handleNameError(msg.content);
        
        //rest boss timer
        boss.resetTimer();

        const embed = new Discord.MessageEmbed()
        .setTitle("Reset timer for " + boss.name)
        .setColor(color.green)
        .setDescription("");
        client.channels.cache.get(channel_id).send({embeds: [embed]});
    }
  });
