## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Code Conventions

These apply project-wide, not just to `.astro` files.

### TypeScript

Prefer `type` for simple structures and `interface` for more complex ones.

### Imports

Use the `@/` alias (configured in `tsconfig.json`, mapped to `./src/*`) instead of relative imports across directories, e.g. `import Foo from '@/components/Foo.astro'`.

### CSS

- Name classes with BEM (`block__element--modifier`) instead of bare descendant selectors.
- Use native CSS nesting (`&`) for child selectors and pseudo-classes.
- Use CSS custom properties for design tokens (colors, fonts, spacing) instead of hardcoded values, once a shared stylesheet defines them.
- Use 200-250ms ease transitions for interactive elements.

### HTML

Use semantic elements (`<header>`, `<nav>`, `<time>`, etc.) instead of generic `<div>`/`<span>` where one fits.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
