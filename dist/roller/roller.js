"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roller = void 0;
const random_1 = require("../random/random");
class Roller {
    constructor() {
        this.random = new random_1.RandomGenerator();
    }
    roll(request) {
        const set = {
            request: request,
            results: []
        };
        for (let r = 0; r < request.times; r++) {
            let result = {
                rolls: [],
                total: 0
            };
            for (let d = 0; d < request.quantity; d++) {
                result.rolls.push(this.random.fromOneTo(request.sides));
            }
            result.total = result.rolls.reduce((a, b) => a + b, 0) + request.modifier;
            set.results.push(result);
        }
        return set;
    }
}
exports.Roller = Roller;
//# sourceMappingURL=roller.js.map