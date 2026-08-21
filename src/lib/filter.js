/** Lowercased text a card is searched against. */
export function haystackOf(m) {
  return [m.name, m.description, m.stage, m.category, ...(m.tags ?? []), ...(m.benchmarks ?? [])]
    .join(' ')
    .toLowerCase();
}

/** Filterable "group:value" facets of a module. */
export function facetsOf(m) {
  return [
    `category:${m.category}`,
    `stage:${m.stage}`,
    ...(m.benchmarks ?? []).map((b) => `benchmark:${b}`),
    ...(m.tags ?? []).map((t) => `tag:${t}`),
  ];
}

/** Within a facet group values OR, across groups they AND. Query is a substring. */
export function matches({ haystack, facets }, query, active) {
  const groups = new Map();
  for (const f of active) {
    const group = f.slice(0, f.indexOf(':'));
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(f);
  }
  for (const values of groups.values()) {
    if (!values.some((v) => facets.includes(v))) return false;
  }
  const q = query.trim().toLowerCase();
  return q === '' || haystack.includes(q);
}
