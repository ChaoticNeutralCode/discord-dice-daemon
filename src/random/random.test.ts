import { RandomGenerator } from "./random";

const testIterations:number = 100,
      betweenMin:number = 1,
      betweenMax:number = 10;

test('Should be able to produce a value between x and y', () => {

  const gen:RandomGenerator = new RandomGenerator();

  for(let i = 0; i < testIterations; i++) {
    const value = gen.between(betweenMin, betweenMax);

    expect(value).toBeGreaterThanOrEqual(betweenMin);
    expect(value).toBeLessThanOrEqual(betweenMax);
  }
});

test('Should be able to produce a value between 1 and x', () => {
  const gen:RandomGenerator = new RandomGenerator();

  for(let i = 0; i < testIterations; i++) {
    const value = gen.fromOneTo(betweenMax);

    expect(value).toBeGreaterThanOrEqual(1);
    expect(value).toBeLessThanOrEqual(betweenMax);
  }
});


// Add Chi-square tests and other statistical tests to determine accuracy and fairness