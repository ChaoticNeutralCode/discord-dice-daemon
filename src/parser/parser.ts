import { RollProfile } from '../types';

export class CommandParser {

  static regex = /^(\d+)*d(\d+)([\+|-]\d+)*(x\d+)*(\s[a-zA-Z0-9,-_]+)*$/;

  static nameRegex = /\s[a-zA-Z0-9,-_]+$/;

  commandAliases:string[] = [];
  commandTest:RegExp;

  constructor(...aliases:string[]) {
    this.commandAliases = aliases;

    // Sorting by string length helps the regular expression match sorter values first
    this.commandAliases.sort((a,b) => a.length - b.length);

    this.commandTest = new RegExp(`^/(${this.commandAliases.join('|')})\\s`);
  }

  isCommand(line:string):boolean {
    return  this.commandTest.test(line);
  }

  parseCommand(command:string):RollProfile {
    if(this.isCommand(command)) {
      return this.parse(command.replace(this.commandTest, ''));
    }

    return null;
  }

  parse(request:string):RollProfile {
    const parsed = CommandParser.regex.exec(request);

    if(parsed) {
      const [quantity = '1', sides, modifier = '0', times = 'x1', name] = parsed.slice(1);

      return {
        name: (name ? name.trim() : 'roll'),
        text: request.replace(CommandParser.nameRegex, ''),
        sides: parseInt(sides),
        quantity: parseInt(quantity),
        modifier: parseInt(modifier),
        times: parseInt(times.substr(1))
      }
    }

    return null;
  }
}