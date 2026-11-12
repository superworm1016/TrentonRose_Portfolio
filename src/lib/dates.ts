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

export function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const day = 86_400_000;
  if (diff < day) return 'today';
  const days = Math.round(diff / day);
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.round(months / 12);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}
