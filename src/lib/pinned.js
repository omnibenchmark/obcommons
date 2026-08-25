// Curated by maintainers: these sort to the top of the index and get a "pinned" badge.
// Deliberately not a field in the entry schema — a contributor cannot pin their own
// module in a pull request. Ids are filenames in modules/, without the .yaml.
export const pinned = [];

/** Sort comparator: pinned first, in listed order, then everything else by name. */
export function byPin(list = pinned) {
  const rank = (id) => (list.indexOf(id) + 1 || list.length + 1);
  return (a, b) => rank(a.id) - rank(b.id) || a.data.name.localeCompare(b.data.name);
}
