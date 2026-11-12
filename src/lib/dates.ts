const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const parse = (ym: string) => {
  const [y, m] = ym.split('-').map(Number);
  return { y, m };
};

/** "2018-02" -> "Feb 2018" */
export function formatMonth(ym: string): string {
  const { y, m } = parse(ym);
  return `${MONTHS[m - 1]} ${y}`;
}

/** Inclusive duration, LinkedIn style: "8 yrs 10 mos" */
export function duration(start: string, end: string): string {
  const a = parse(start);
  const b = parse(end);
  const total = (b.y - a.y) * 12 + (b.m - a.m) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  return parts.join(' ');
}
