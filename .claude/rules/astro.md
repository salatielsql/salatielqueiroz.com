---
paths:
  - "src/**/*.astro"
---

# Astro Component Patterns

This rule defines the standard patterns and conventions for creating Astro components in this project

## Component Structure

All Astro components must follow this structure:

```astro
---
// 1. Imports (types, components, configs)
// 2. Props definition
// 3. Props destructuring
---

<!-- 4. Component markup -->

<style>
  /* 5. Scoped styles */
</style>
```

## Props Definition

### TypeScript Types

Use TypeScript `type` or `interface` for props (see AGENTS.md for when to use each).

```astro
---
// Good: Simple props with type
type Props = {
  href: string
  title?: string
}

// Good: Complex props with interface
interface Props {
  date: Date
  class?: string
}

// Good: Extending HTML attributes
import type {HTMLAttributes} from 'astro/types'
type Props = HTMLAttributes<'a'>
---
```

### Props Destructuring

Always destructure props from `Astro.props` in the frontmatter:

```astro
---
type Props = {
  href: string
  class?: string
}

const { href, class: className } = Astro.props
---
```

**Note**: When using `class` as a prop name, destructure it as `className` to avoid conflicts with the `class` keyword.

## Conditional Rendering

Use conditional rendering with boolean expressions:

```astro
---
const { date, href } = Astro.props
---

{/* Good: Simple conditional */}
{Boolean(date) && (
  <time datetime={date.toISOString()}>
    {date.toLocaleDateString()}
  </time>
)}

{/* Good: Conditional wrapper */}
{href && (
  <a class="card" href={href}>
    <slot />
  </a>
)}
```

## Class Management

Use `class:list` for conditional classes:

```astro
---
const { class: className, isActive } = Astro.props
---

{/* Good: Using class:list */}
<a class:list={['navlink', className, {active: isActive}]}>
  <slot />
</a>

{/* Good: Combining classes */}
<time class:list={['formatted-date', className]} datetime={date.toISOString()}>
  {date.toLocaleDateString()}
</time>
```

## Slots

Use `<slot />` for component children:

```astro
---
type Props = {
  href: string
}

const { href } = Astro.props
---

{/* Good: Using slot for children */}
<a class="button-link" href={href}>
  <slot />
</a>
```

## Imports

Use the `@/` alias for imports instead of relative paths:

```astro
---
// Good: Using @/ alias
import Foo from '@/components/Foo.astro'

// Bad: Relative imports when alias available
import Foo from '../../components/Foo.astro'
---
```

## Styling Patterns

### Scoped Styles

All component styles must be scoped using the `<style>` tag (scoped by default in Astro):

```astro
<style>
  .component-name {
    /* Styles are automatically scoped to this component */
  }
</style>
```

For class naming, CSS nesting, custom properties, and transitions, follow the CSS conventions in AGENTS.md — they apply here too.

## Best Practices

1. **Type Safety**: Always define TypeScript types for props
2. **Scoped Styles**: Never use global styles in components; use scoped `<style>` tags
3. **Conditional Rendering**: Use `{ condition && ... }` for conditional markup
4. **Class Lists**: Use `class:list` for dynamic class management
5. **Component Composition**: Import and use other components when needed
6. **Path Aliases**: Always use the `@/` alias for imports

## Anti-Patterns

```astro
---
// Bad: No type definition
const { href } = Astro.props
---

<style is:global>
  /* Bad: global styles leak outside the component */
  .global-class {
  }
</style>

// Bad: Relative imports when alias available
import Component from '../../components/Component.astro'
```
