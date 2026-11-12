export type AnswerNode = {
  type: 'text' | 'p' | 'ul' | 'li' | 'strong' | 'a';
  text?: string;
  children?: AnswerNode[];
  href?: string;
  newTab?: boolean;
};
export type FAQItemData = { id: number; question: string; answer: AnswerNode[] };
export type FAQGroupData = { title: string; description: string; items: FAQItemData[] };

export function answerText(nodes: AnswerNode[]): string {
  return nodes.map(node => node.type === 'text' ? node.text ?? '' : answerText(node.children ?? [])).join(' ');
}

export function safeAnswerHref(href: string | undefined): string | undefined {
  if (!href || /[\u0000-\u0020\u007f]/.test(href)) return undefined;
  try {
    const url = new URL(href);
    if (['https:', 'http:', 'mailto:'].includes(url.protocol) && !url.username && !url.password) return url.href;
  } catch { /* Invalid authored links render as plain text. */ }
  return undefined;
}

export function filterFAQGroups(groups: FAQGroupData[], query: string): FAQGroupData[] {
  const term = query.trim().toLowerCase();
  if (!term) return groups;
  return groups.map(group => ({
    ...group,
    items: group.items.filter(item => `${item.question} ${answerText(item.answer)}`.toLowerCase().includes(term)),
  })).filter(group => group.items.length > 0);
}
