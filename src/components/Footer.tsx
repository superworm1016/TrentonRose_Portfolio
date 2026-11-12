import { ArrowUp, Mail } from 'lucide-react';
import { profile } from '../data/resume';
import { GitHubIcon, LinkedInIcon } from './ui';

const LINKS = [
  { id: 'featured', label: 'Featured' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const iconBtn =
  'grid h-10 w-10 place-items-center rounded-full border border-line text-t2 transition-colors hover:bg-elev2 hover:text-t1';

export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-6">
      <div className="divider" />
      <div className="container-page py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#home" className="inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-accent to-purple text-sm font-bold text-white">
                {profile.initials}
              </span>
              <span>
                <span className="block font-semibold tracking-tight">{profile.name}</span>
                <span className="block text-sm text-t3">{profile.title}</span>
              </span>
            </a>
            <p className="mt-5 text-sm leading-relaxed text-t2">
              Java Spring Boot services, React web interfaces and React Native apps for iOS, built for financial
              services and healthcare.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2.5 text-sm sm:grid-cols-3">
            {LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="text-t2 transition-colors hover:text-t1">
                {l.label}
              </a>
            ))}
            <a href={profile.cv} download className="text-t2 transition-colors hover:text-t1">
              Download CV
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a href={`mailto:${profile.email}`} aria-label="Email" className={iconBtn}>
              <Mail className="h-[18px] w-[18px]" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconBtn}>
              <LinkedInIcon className="h-[17px] w-[17px]" />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconBtn}>
              <GitHubIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-line pt-6 text-xs text-t3 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript, Tailwind CSS and Framer Motion.
          </p>
          <a href="#top" className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 font-medium text-t2 transition-colors hover:text-t1">
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.22em] select-none whitespace-nowrap bg-gradient-to-b from-ink/[0.09] to-transparent bg-clip-text text-center text-[17vw] font-bold leading-none tracking-[-0.06em] text-transparent"
      >
        {profile.name}
      </p>
    </footer>
  );
}
