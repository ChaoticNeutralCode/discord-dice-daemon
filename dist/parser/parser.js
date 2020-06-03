"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandParser = void 0;
let CommandParser = (() => {
    class CommandParser {
        constructor(...aliases) {
            this.commandAliases = [];
            this.commandAliases = aliases;
            this.commandAliases.sort((a, b) => a.length - b.length);
            this.commandTest = new RegExp(`^/(${this.commandAliases.join('|')})\\s`);
        }
        isCommand(line) {
            return this.commandTest.test(line);
        }
        parseCommand(command) {
            if (this.isCommand(command)) {
                return this.parse(command.replace(this.commandTest, ''));
            }
            return null;
        }
        parse(request) {
            const parsed = CommandParser.regex.exec(request);
            if (parsed) {
                const [quantity = '1', sides, modifier = '0', times = 'x1', name] = parsed.slice(1);
                return {
                    name: (name ? name.trim() : 'roll'),
                    text: request.replace(CommandParser.nameRegex, ''),
                    sides: parseInt(sides),
                    quantity: parseInt(quantity),
                    modifier: parseInt(modifier),
                    times: parseInt(times.substr(1))
                };
            }
            return null;
        }
    }
    CommandParser.regex = /^(\d+)*d(\d+)([\+|-]\d+)*(x\d+)*(\s[a-zA-Z0-9,-_]+)*$/;
    CommandParser.nameRegex = /\s[a-zA-Z0-9,-_]+$/;
    return CommandParser;
})();
exports.CommandParser = CommandParser;
//# sourceMappingURL=parser.js.map