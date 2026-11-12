import { ArrowUp } from 'lucide-react';
import { profile } from '../data/resume';
import { GitHubIcon, LinkedInIcon } from './ui';

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-page flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div>
          <p className="text-sm font-medium">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="mt-1 text-xs text-t3">Built with React, TypeScript, Tailwind CSS and Framer Motion.</p>
        </div>
        <div className="flex items-center gap-2">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-full text-t2 hover:bg-elev2 hover:text-t1">
            <GitHubIcon className="h-[18px] w-[18px]" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full text-t2 hover:bg-elev2 hover:text-t1">
            <LinkedInIcon className="h-[17px] w-[17px]" />
          </a>
          <a href="#top" className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-t2 hover:text-t1">
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
