import { RollProfile, RollResult, ResultSet } from '../types';
import { RandomGenerator } from '../random/random';

export class Roller {

  private random:RandomGenerator;

  constructor() {
    this.random = new RandomGenerator();
  }

  roll(request:RollProfile): ResultSet {
    
    const set:ResultSet = {
      request: request,
      results: []
    };

    for(let r = 0; r < request.times; r++) {
      let result:RollResult = {
        rolls: [],
        total: 0
      };

      for(let d = 0; d < request.quantity; d++) {
        result.rolls.push(this.random.fromOneTo(request.sides));
      }

      result.total = result.rolls.reduce((a,b) => a + b, 0) + request.modifier;
      set.results.push(result);
    }

    return set;
  }
}