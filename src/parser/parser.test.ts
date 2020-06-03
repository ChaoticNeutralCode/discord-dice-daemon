import { CommandParser } from './parser';
import { RollProfile } from '../types';

const basicRoll = 'd20',
      quantityRoll = '2d6',
      modifierRoll = '3d8+40',
      negativeModifierRoll = '3d8-40',
      multiroll = 'd20x4',
      crazyMultiroll = '4d10+45x3',
      rollWithName = ['d20','d20Roll'],
      rollWithCrazyName = ['d20','d20_Crazy-roll,calling2'];

let parser:CommandParser;

beforeEach(() => {
  parser = new CommandParser('dd');
});

test('Should be able to recognize when a string is a command', () => {
  expect(parser.isCommand('/dd ')).toBe(true);
  expect(parser.isCommand('/notdd')).toBe(false);
});

test('Should support multiple command aliases', () => {
  parser = new CommandParser('dd', 'r', 'roll');

  expect(parser.isCommand('/dd ')).toBe(true);
  expect(parser.isCommand('/r ')).toBe(true);
  expect(parser.isCommand('/roll ')).toBe(true);
});

test(`Should parse basic die roll in the form /${basicRoll}/`, () => {
  const roll:RollProfile = parser.parse(basicRoll);

  expect(roll.sides).toBe(20);
  expect(roll.quantity).toBe(1);
  expect(roll.modifier).toBe(0);
  expect(roll.times).toBe(1);
});

test(`Should parse a die roll in the form /${quantityRoll}/`, () => {
  const roll:RollProfile = parser.parse(quantityRoll);

  expect(roll.sides).toBe(6);
  expect(roll.quantity).toBe(2);
});

test(`Should parse a die roll in the form /${modifierRoll}/`, () => {
  const roll:RollProfile = parser.parse(modifierRoll);

  expect(roll.sides).toBe(8);
  expect(roll.quantity).toBe(3);
  expect(roll.modifier).toBe(40);
});

test(`Should parse a die roll in the form /${negativeModifierRoll}/`, () => {
  const roll:RollProfile = parser.parse(negativeModifierRoll);

  expect(roll.sides).toBe(8);
  expect(roll.quantity).toBe(3);
  expect(roll.modifier).toBe(-40);
});

test(`Should parse a die roll in the form /${multiroll}/`, () => {
  const roll:RollProfile = parser.parse(multiroll);

  expect(roll.sides).toBe(20);
  expect(roll.times).toBe(4);
});

test(`Should parse a die roll in the form /${crazyMultiroll}/`, () => {
  const roll:RollProfile = parser.parse(crazyMultiroll);

  expect(roll.sides).toBe(10);
  expect(roll.quantity).toBe(4);
  expect(roll.modifier).toBe(45);
  expect(roll.times).toBe(3);
});

test('Should be able to parse a full command string', () => {
  const roll:RollProfile = parser.parseCommand('/dd d100');

  expect(roll.sides).toBe(100);
});

test('Should return null from an unparsable command', () => {
  const roll:RollProfile = parser.parseCommand('not a command');

  expect(roll).toBeNull();
});

test('Should return the raw request text on the request object', () => {
  const roll:RollProfile = parser.parse(basicRoll);

  expect(roll.text).toBe(basicRoll);
});

test('Should return null on an unparsable request', () => {
  const roll:RollProfile = parser.parse('not a roll request');

  expect(roll).toBeNull();
});

test('Should be able to parse a name', () => {
  const roll:RollProfile = parser.parse(rollWithName.join(' '));

  expect(roll.name).toBe(rollWithName[1]);
  expect(roll.text).toBe(rollWithName[0]);
});

test('Should allow , _ and - in names', () => {
  const roll:RollProfile = parser.parse(rollWithCrazyName.join(' '));

  expect(roll.name).toBe(rollWithCrazyName[1]);
  expect(roll.text).toBe(rollWithCrazyName[0]);
});

test('Should default name to "roll"', () => {
  const roll:RollProfile = parser.parse(basicRoll);

  expect(roll.name).toBe('roll');
});