"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomGenerator = void 0;
class RandomGenerator {
    between(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    fromOneTo(max) {
        return this.between(1, max);
    }
}
exports.RandomGenerator = RandomGenerator;
//# sourceMappingURL=random.js.map