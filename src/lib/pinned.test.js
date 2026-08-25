import { test } from 'node:test';
import assert from 'node:assert/strict';
import { byPin } from './pinned.js';

const entry = (id, name) => ({ id, data: { name } });
const list = [entry('c', 'Charlie'), entry('a', 'Alpha'), entry('b', 'Bravo')];
const order = (pins) => [...list].sort(byPin(pins)).map((e) => e.id);

test('nothing pinned sorts by name', () => {
  assert.deepEqual(order([]), ['a', 'b', 'c']);
});

test('pinned entries come first, in the order listed', () => {
  assert.deepEqual(order(['c', 'b']), ['c', 'b', 'a']);
  assert.deepEqual(order(['b']), ['b', 'a', 'c']);
});

test('an unknown pinned id changes nothing', () => {
  assert.deepEqual(order(['nope']), ['a', 'b', 'c']);
});
