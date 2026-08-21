import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The filename is the module id — no `id:` field in the YAML, nothing to keep in sync.
const slug = /^[a-z0-9][a-z0-9-]*$/;

const modules = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './modules' }),
  schema: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    repository: z.object({
      url: z.string().url(),
      commit: z.string().min(4),
    }),
    stage: z.string().min(1), // free string: stages are benchmark-defined
    // Extend the enum when a third kind of module actually shows up.
    category: z.enum(['generic', 'biofx']).default('generic'),
    benchmarks: z.array(z.string().regex(slug)).optional(),
    tags: z.array(z.string().regex(slug, 'tags must be lowercase-kebab')).nonempty(),
    authors: z
      .array(
        z.object({
          name: z.string().min(1),
          github: z.string().optional(),
          email: z.string().email().optional(),
          orcid: z.string().optional(),
        }),
      )
      .nonempty(),
    license: z.string().min(1),
    homepage: z.string().url().optional(),
    inputs: z.array(z.string()).optional(),
    outputs: z.array(z.string()).optional(),
    environments: z.array(z.string()).optional(),
  }),
});

export const collections = { modules };
