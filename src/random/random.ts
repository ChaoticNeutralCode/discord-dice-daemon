export class RandomGenerator {
  
  /*
   * Generates an inclusive value between min and max
   * Code was provided by the MDN page for Math.random.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
   */
  between(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /*
   * Generates an inclusive value between 1 and max
   */
  fromOneTo(max) {
    return this.between(1, max);
  }
}