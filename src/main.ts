import 'dotenv/config';
import Discord, { MessageEmbed, EmbedField } from "discord.js";
import { CommandParser } from './parser/parser';
import { Roller } from './roller/roller';

const parser:CommandParser = new CommandParser('dd', 'roll', 'r'),
      roller:Roller = new Roller(),
      client:Discord.Client = new Discord.Client(),
      singleResultReplacement = /x\d+/;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (parser.isCommand(msg.content)) {
    msg.react('🎲');

    const request = parser.parseCommand(msg.content);

    if(!request) {
      msg.react('🤷');
    } else {
      try {
        const roll = roller.roll(request),
              embedFileds = roll.results.map((r, i) => {
                let field:EmbedField = {
                  name: `Roll ${i + 1 }`,
                  value: `**\`${r.total}\`**`,
                  inline: false
                };

                if(r.rolls.length > 1 || request.modifier) {
                  field.value += 
                    ' : ('
                    + (r.rolls.length > 1 ? r.rolls.join(' + ') + ' ' : '')
                    + (request.modifier ? `${r.rolls.length === 1 ? r.rolls[0] : ''} ${request.modifier > 0 ? '+ ' : '- '}${Math.abs(request.modifier)}` : '')
                    + ')';
                }

                return field;
              }),
              capitalizedName = request.name.charAt(0).toUpperCase()
                + request.name.slice(1);
              
        let embed:MessageEmbed = new Discord.MessageEmbed()
          .setTitle(`${capitalizedName} Result for ${msg.author.username} (${request.text})`);

        embed.addFields(embedFileds);

        msg.channel.send(embed);
      } catch(e) {
        console.log(e);
        msg.react('☠️');
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);