import { RollRequest, ResultSet } from '../types';
import { Roller } from './roller';
import { CommandParser } from '../parser/parser';

const parser = new CommandParser('dd'),
      request:RollRequest = parser.parse('4d6+5x3');

let roller:Roller, set:ResultSet;
beforeEach(() => {
  roller = new Roller();
  set = roller.roll(request);
});

test('Should provide the correct number of results', () => {
  const set2 = roller.roll(parser.parse('d6x3')),
        set3 = roller.roll(parser.parse('d6+4x7'));

  expect(set.results).toHaveLength(request.times);
  expect(set2.results).toHaveLength(3); 
  expect(set3.results).toHaveLength(7);
});

test('Should provide results with the correct total', () => {
  
  
  for (let r of set.results) {
    expect(r.total).toBeGreaterThanOrEqual(request.quantity + request.modifier);
    expect(r.total).toBeLessThanOrEqual((request.sides * request.quantity) + request.modifier);
  }
});

test('Should provide the original request in the results', () => {
  expect(set.request).toBe(request);
});

test('Should provide a breakdown of each individual roll', () => {
  for (let r of set.results) {
    for(let roll of r.rolls) {
      expect(roll).toBeGreaterThanOrEqual(1);
      expect(roll).toBeLessThanOrEqual(request.sides);
    }
  }
});