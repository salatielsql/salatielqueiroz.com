import type { Element, ElementContent, Root, RootContent, Text } from 'hast'

const HEADING_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

function text(value: string): Text {
  return { type: 'text', value }
}

function isElement(node: RootContent | ElementContent, tagName?: string): node is Element {
  return node.type === 'element' && (tagName === undefined || node.tagName === tagName)
}

function gutterMark(children: ElementContent[], modifier?: string): Element {
  const className = modifier ? ['gutter-mark', modifier] : ['gutter-mark']
  return {
    type: 'element',
    tagName: 'span',
    properties: { className },
    children,
  }
}

function gutterContent(child: ElementContent): Element {
  return {
    type: 'element',
    tagName: 'div',
    properties: { className: ['gutter-content'] },
    children: [child],
  }
}

function gutterRow(mark: Element, content: Element, modifier?: string): Element {
  const className = modifier ? ['gutter-row', modifier] : ['gutter-row']
  return {
    type: 'element',
    tagName: 'div',
    properties: { className },
    children: [mark, content],
  }
}

function isCheckbox(node: ElementContent): node is Element {
  return isElement(node, 'input') && node.properties.type === 'checkbox'
}

function findCheckbox(li: Element): Element | undefined {
  const direct = li.children.find(isCheckbox)
  if (direct) return direct
  const firstChild = li.children[0]
  if (isElement(firstChild, 'p')) {
    return firstChild.children.find(isCheckbox)
  }
  return undefined
}

function listItemMark(li: Element, ordered: boolean, position: number): string {
  const checkbox = findCheckbox(li)
  if (checkbox) {
    return checkbox.properties.checked ? '- [x]' : '- [ ]'
  }
  return ordered ? `${position}.` : '-'
}

function listMarkChildren(list: Element): ElementContent[] {
  const items = list.children.filter((child): child is Element => isElement(child, 'li'))
  const ordered = list.tagName === 'ol'
  const parts: ElementContent[] = []
  items.forEach((li, index) => {
    if (index > 0) {
      parts.push({ type: 'element', tagName: 'br', properties: {}, children: [] })
    }
    parts.push(text(listItemMark(li, ordered, index + 1)))
  })
  return parts
}

function singleImageInParagraph(p: Element): Element | undefined {
  const meaningful = p.children.filter((child) => !(child.type === 'text' && child.value.trim() === ''))
  if (meaningful.length === 1 && isElement(meaningful[0], 'img')) {
    return meaningful[0]
  }
  return undefined
}

/**
 * Shallow rehype pass: annotates each top-level markdown block (tree.children only)
 * with a `.gutter-mark` span carrying the literal markdown syntax, wrapping the
 * original element in a `.gutter-content` div. Nodes it doesn't recognize (loose
 * text, embedded MDX components such as `<RecentPosts />`) pass through untouched.
 */
export function rehypeGutterMarks() {
  return (tree: Root) => {
    const result: RootContent[] = []

    for (const node of tree.children) {
      if (isElement(node) && HEADING_TAGS.has(node.tagName)) {
        const depth = Number(node.tagName[1])
        result.push(
          gutterRow(gutterMark([text('#'.repeat(depth))], 'gutter-mark--heading'), gutterContent(node), 'gutter-row--heading'),
        )
        continue
      }

      if (isElement(node, 'p')) {
        const img = singleImageInParagraph(node)
        if (img) {
          const figure: Element = {
            type: 'element',
            tagName: 'figure',
            properties: {},
            children: [img],
          }
          result.push(gutterRow(gutterMark([text('![]')]), gutterContent(figure)))
        } else {
          result.push(gutterRow(gutterMark([text('')]), gutterContent(node)))
        }
        continue
      }

      if (isElement(node, 'ul') || isElement(node, 'ol')) {
        result.push(gutterRow(gutterMark(listMarkChildren(node)), gutterContent(node)))
        continue
      }

      if (isElement(node, 'blockquote')) {
        result.push(gutterRow(gutterMark([text('>')]), gutterContent(node)))
        continue
      }

      if (isElement(node, 'pre')) {
        result.push(gutterRow(gutterMark([text('```')]), gutterContent(node)))
        continue
      }

      if (isElement(node, 'table')) {
        result.push(gutterRow(gutterMark([text('|')]), gutterContent(node)))
        continue
      }

      if (isElement(node, 'hr')) {
        result.push(gutterRow(gutterMark([text('---')]), gutterContent(node)))
        continue
      }

      result.push(node)
    }

    tree.children = result
  }
}
