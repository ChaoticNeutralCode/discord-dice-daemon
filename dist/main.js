"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = __importDefault(require("discord.js"));
const parser_1 = require("./parser/parser");
const roller_1 = require("./roller/roller");
const parser = new parser_1.CommandParser('dd', 'roll', 'r'), roller = new roller_1.Roller(), client = new discord_js_1.default.Client(), singleResultReplacement = /x\d+/;
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on('message', msg => {
    if (parser.isCommand(msg.content)) {
        msg.react('🎲');
        const request = parser.parseCommand(msg.content);
        if (!request) {
            msg.react('🤷');
        }
        else {
            try {
                const roll = roller.roll(request), embedFileds = roll.results.map((r, i) => {
                    let field = {
                        name: `Roll ${i + 1}`,
                        value: `**\`${r.total}\`**`,
                        inline: false
                    };
                    if (r.rolls.length > 1 || request.modifier) {
                        field.value +=
                            ' : ('
                                + (r.rolls.length > 1 ? r.rolls.join(' + ') + ' ' : '')
                                + (request.modifier ? `${r.rolls.length === 1 ? r.rolls[0] : ''} ${request.modifier > 0 ? '+ ' : '- '}${Math.abs(request.modifier)}` : '')
                                + ')';
                    }
                    return field;
                }), capitalizedName = request.name.charAt(0).toUpperCase()
                    + request.name.slice(1);
                let embed = new discord_js_1.default.MessageEmbed()
                    .setTitle(`${capitalizedName} Result for ${msg.author.username} (${request.text})`);
                embed.addFields(embedFileds);
                msg.channel.send(embed);
            }
            catch (e) {
                console.log(e);
                msg.react('☠️');
            }
        }
    }
});
client.login(process.env.DISCORD_TOKEN);
//# sourceMappingURL=main.js.map