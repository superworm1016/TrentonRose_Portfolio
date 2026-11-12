import { ArrowUpRight, GitFork, RefreshCw, Star } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { githubExclude, profile } from '../data/resume';
import { relativeTime } from '../lib/dates';
import { GitHubIcon, Reveal, SectionHeading } from './ui';

type Repo = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  pushed_at: string;
  fork: boolean;
};

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Java: '#b07219',
  Python: '#3572A5',
  'C#': '#178600',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Go: '#00ADD8',
};

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; repos: Repo[]; checkedAt: Date };

export function GitHubSection() {
  const [state, setState] = useState<State>({ status: 'loading' });
  const [chartOk, setChartOk] = useState(true);

  const load = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const res = await fetch(
        `https://api.github.com/users/${profile.githubUser}/repos?sort=pushed&per_page=30`,
        { headers: { Accept: 'application/vnd.github+json' } },
      );
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as Repo[];
      const repos = data.filter((r) => !r.fork && !githubExclude.includes(r.name)).slice(0, 6);
      setState({ status: 'ready', repos, checkedAt: new Date() });
    } catch {
      setState({ status: 'error' });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <section id="github" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          label="github"
          title="Recent work in public."
          muted="Pulled live from GitHub."
        />

        <Reveal>
          <div className="card p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl transition-opacity hover:opacity-80"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-elev2">
                  <GitHubIcon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-semibold">@{profile.githubUser}</span>
                  <span className="block text-sm text-t3">github.com/{profile.githubUser}</span>
                </span>
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">
                View profile <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {chartOk && (
              <div className="no-scrollbar mt-6 overflow-x-auto rounded-2xl border border-line bg-white p-4 dark:bg-white/[0.04]">
                <img
                  src={`https://ghchart.rshah.org/0a84ff/${profile.githubUser}`}
                  alt={`GitHub contribution chart for ${profile.githubUser}`}
                  loading="lazy"
                  onError={() => setChartOk(false)}
                  className="min-w-[680px] dark:opacity-90 dark:invert-[0.88] dark:hue-rotate-180"
                />
              </div>
            )}
          </div>
        </Reveal>

        <div className="mt-6">
          {state.status === 'loading' && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card h-36 animate-pulse bg-elev2/50" />
              ))}
            </div>
          )}

          {state.status === 'error' && (
            <div className="card flex flex-wrap items-center justify-between gap-4 p-6 text-t2">
              <p>Couldn't reach the GitHub API just now.</p>
              <div className="flex gap-2">
                <button type="button" onClick={load} className="btn-ghost">
                  <RefreshCw className="h-4 w-4" /> Retry
                </button>
                <a href={profile.github} target="_blank" rel="noreferrer" className="btn-primary">
                  Open GitHub <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}

          {state.status === 'ready' && (
            <>
              {state.repos.length === 0 ? (
                <div className="card p-6 text-t2">No public repositories to show yet.</div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {state.repos.map((r, i) => (
                    <Reveal key={r.id} delay={i * 0.05} className="h-full">
                        <a
                          href={r.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="card group flex h-full flex-col p-5 transition-all hover:-translate-y-0.5 hover:bg-elev2/50"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <p className="break-all font-mono text-[15px] font-semibold text-accent">{r.name}</p>
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-t3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </div>
                          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-t2">
                            {r.description || 'No description provided.'}
                          </p>
                          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-xs text-t3">
                            {r.language && (
                              <span className="inline-flex items-center gap-1.5">
                                <span
                                  className="h-2.5 w-2.5 rounded-full"
                                  style={{ background: LANG_COLORS[r.language] ?? 'rgb(var(--accent))' }}
                                />
                                {r.language}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1">
                              <Star className="h-3.5 w-3.5" /> {r.stargazers_count}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <GitFork className="h-3.5 w-3.5" /> {r.forks_count}
                            </span>
                            <span>Updated {relativeTime(r.pushed_at)}</span>
                          </div>
                        </a>
                    </Reveal>
                  ))}
                </div>
              )}
              <p className="mt-4 font-mono text-xs text-t3">
                Last checked {state.checkedAt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
