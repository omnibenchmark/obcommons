import { test } from 'node:test';
import assert from 'node:assert/strict';
import { facetsOf, haystackOf, matches } from './filter.js';

const mod = {
  name: 'Fast Clustering',
  description: 'Leiden on a kNN graph',
  stage: 'methods',
  category: 'biofx',
  tags: ['clustering', 'single-cell'],
  benchmarks: ['omni-clustering'],
};
const card = { haystack: haystackOf(mod), facets: facetsOf(mod) };

test('empty query and no facets matches everything', () => {
  assert.ok(matches(card, '', []));
  assert.ok(matches(card, '   ', []));
});

test('query is a case-insensitive substring over name, description, stage, tags', () => {
  assert.ok(matches(card, 'CLUSTER', []));
  assert.ok(matches(card, 'knn', []));
  assert.ok(matches(card, 'methods', []));
  assert.ok(!matches(card, 'alignment', []));
});

test('facets in the same group OR', () => {
  assert.ok(matches(card, '', ['category:generic', 'category:biofx']));
  assert.ok(!matches(card, '', ['category:generic']));
});

test('facets in different groups AND', () => {
  assert.ok(matches(card, '', ['category:biofx', 'stage:methods']));
  assert.ok(!matches(card, '', ['category:biofx', 'stage:data']));
  assert.ok(!matches(card, '', ['tag:clustering', 'benchmark:omni-spatial']));
});

test('facets and query both have to hold', () => {
  assert.ok(matches(card, 'leiden', ['tag:clustering']));
  assert.ok(!matches(card, 'leiden', ['tag:spatial']));
});
