import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// The registry as data: everything the site knows, in one file.
export const GET: APIRoute = async () => {
  const modules = await getCollection('modules');
  return Response.json(modules.map((m) => ({ id: m.id, ...m.data })));
};
