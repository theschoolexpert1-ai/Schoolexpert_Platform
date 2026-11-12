import { Fragment } from 'react';
import { safeAnswerHref, type AnswerNode } from './faq-content';

// Render only the supported content elements. Text always goes through React escaping.
export default function FAQAnswer({ nodes }: { nodes: AnswerNode[] }) {
  return <>{nodes.map((node, index) => {
    const children = <FAQAnswer nodes={node.children ?? []} />;
    switch (node.type) {
      case 'text': return <Fragment key={index}>{node.text}</Fragment>;
      case 'p': return <p key={index}>{children}</p>;
      case 'ul': return <ul key={index}>{children}</ul>;
      case 'li': return <li key={index}>{children}</li>;
      case 'strong': return <strong key={index}>{children}</strong>;
      case 'a': {
        const href = safeAnswerHref(node.href);
        return href ? <a key={index} href={href} target={node.newTab ? '_blank' : undefined} rel={node.newTab ? 'noopener noreferrer' : undefined}>{children}</a> : <Fragment key={index}>{children}</Fragment>;
      }
      default: return null;
    }
  })}</>;
}
