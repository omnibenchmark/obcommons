# Adding a module

Copy an existing file in `modules/`, edit it, open a pull request. The filename is
the module id, so `modules/my-module.yaml` becomes `/modules/my-module/`.

```yaml
name: My module                    # required
description: >                     # required, one paragraph, indexed for search
  What it does and what it is for.
repository:                        # required
  url: https://github.com/me/my-module.git
  commit: 8f2f835                  # a commit or a tag — CI checks it resolves
stage: methods                     # required: data | process | methods | metrics | …
category: biofx                    # generic (reusable anywhere) or biofx (task-specific)
tags: [clustering, single-cell]    # required, lowercase-kebab
authors:                           # required
  - name: Jane Doe
    github: janedoe
license: MIT                       # required

# optional
benchmarks: [clustering-example]   # benchmarks this module serves
homepage: https://example.org
inputs: [data.counts, data.meta]
outputs: [methods.mapping]
environments: [conda, apptainer]
```

`category` is `generic` for modules that are useful in any benchmark (downloaders,
converters) and `biofx` for ones that only make sense for a domain task. Add a new
value to the enum in `src/content.config.ts` when a third kind actually shows up.

"Last updated" is taken from git — the last commit that touched your YAML file. You
don't set it.

CI runs the same checks you can run locally:

```sh
npm run build                      # schema
bash scripts/check-repos.sh modules/*.yaml
```
