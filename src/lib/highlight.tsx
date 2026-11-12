import type { ReactNode } from 'react';

export type Lang = 'tsx' | 'java' | 'yaml';

// Ordered [className, pattern] rules. Patterns must only use non-capturing groups.
const RULES: Record<Lang, [string, string][]> = {
  java: [
    ['tok-com', String.raw`\/\/.*$`],
    ['tok-str', String.raw`"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'`],
    ['tok-ann', String.raw`@\w+`],
    ['tok-kw', String.raw`\b(?:package|import|public|private|protected|final|class|return|new|static|void)\b`],
    ['tok-type', String.raw`\b[A-Z][A-Za-z0-9_]*\b`],
    ['tok-num', String.raw`\b\d+\b`],
  ],
  tsx: [
    ['tok-com', String.raw`\/\/.*$`],
    ['tok-str', String.raw`"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'`],
    ['tok-kw', String.raw`\b(?:import|from|export|function|const|let|return|if|else|async|await|default)\b`],
    ['tok-tag', String.raw`<\/?[A-Z][\w.]*|\/?>`],
    ['tok-type', String.raw`\b[A-Z][A-Za-z0-9_]*\b`],
    ['tok-num', String.raw`\b\d+\b`],
  ],
  yaml: [
    ['tok-com', String.raw`#.*$`],
    ['tok-key', String.raw`^\s*-?\s*[\w.-]+(?=:)`],
    ['tok-str', String.raw`"(?:[^"\\]|\\.)*"`],
    ['tok-num', String.raw`\b\d+(?:\.\d+)*\b`],
  ],
};

const COMPILED: Record<Lang, RegExp> = {
  java: compile(RULES.java),
  tsx: compile(RULES.tsx),
  yaml: compile(RULES.yaml),
};

function compile(rules: [string, string][]) {
  return new RegExp(rules.map(([, src]) => `(${src})`).join('|'), 'g');
}

export function highlightLine(line: string, lang: Lang): ReactNode[] {
  const re = COMPILED[lang];
  const rules = RULES[lang];
  re.lastIndex = 0;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    if (m[0].length === 0) {
      re.lastIndex++;
      continue;
    }
    if (m.index > last) out.push(line.slice(last, m.index));
    const group = m.slice(1).findIndex((g) => g !== undefined);
    out.push(
      <span key={m.index} className={rules[group]?.[0]}>
        {m[0]}
      </span>,
    );
    last = m.index + m[0].length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}
