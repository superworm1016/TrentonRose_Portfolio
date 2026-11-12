import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, ChevronDown, FileCode2, Folder, Loader2, Play } from 'lucide-react';
import { useState } from 'react';
import { highlightLine, type Lang } from '../lib/highlight';
import { PhonePreview } from './PhonePreview';

type File = {
  name: string;
  folder: string;
  lang: Lang;
  dot: string;
  status: string;
  code: string;
};

const FILES: File[] = [
  {
    name: 'AccountsScreen.tsx',
    folder: 'mobile/src/screens',
    lang: 'tsx',
    dot: 'bg-[#5dd8ff]',
    status: 'Metro · iOS bundle ready',
    code: `import { FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export function AccountsScreen() {
  const { data, isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => api.get('/accounts'),
  });

  if (isLoading) return <Skeleton rows={3} />;

  return (
    <FlatList
      data={data}
      keyExtractor={(a) => a.id}
      renderItem={({ item }) => (
        <AccountRow account={item} />
      )}
    />
  );
}`,
  },
  {
    name: 'AccountController.java',
    folder: 'services/accounts-api',
    lang: 'java',
    dot: 'bg-[#fd8f3f]',
    status: 'BUILD SUCCESSFUL · ./gradlew bootRun',
    code: `package com.portfolio.accounts;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

  private final AccountService accounts;

  @GetMapping
  @PreAuthorize("hasRole('MEMBER')")
  public List<AccountDto> list(
      @AuthenticationPrincipal Jwt jwt) {
    return accounts.findFor(jwt.getSubject());
  }
}`,
  },
  {
    name: 'deployment.yaml',
    folder: 'deploy/k8s',
    lang: 'yaml',
    dot: 'bg-[#a167e6]',
    status: 'deployment.apps/accounts-api configured',
    code: `# AKS / EKS — same manifest, both clouds
apiVersion: apps/v1
kind: Deployment
metadata:
  name: accounts-api
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: accounts-api
          image: accounts-api:1.4.2
          ports:
            - containerPort: 8080
          readinessProbe:
            httpGet:
              path: /actuator/health
              port: 8080`,
  },
];

const FOLDERS = Array.from(new Set(FILES.map((f) => f.folder)));

export function IdeMock() {
  const [activeName, setActiveName] = useState(FILES[0].name);
  const [building, setBuilding] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const file = FILES.find((f) => f.name === activeName) ?? FILES[0];

  const run = () => {
    if (building) return;
    setBuilding(true);
    window.setTimeout(() => {
      setBuilding(false);
      setRunKey((k) => k + 1);
    }, 1300);
  };

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-tr from-accent/25 via-purple/15 to-transparent blur-3xl" />
      <div
        className="overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e20] text-[#e6e6e6]"
        style={{ boxShadow: 'var(--shadow)' }}
      >
        {/* Title bar */}
        <div className="flex h-10 items-center gap-3 border-b border-black/40 bg-[#2a2a2c] px-3.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <button
            type="button"
            onClick={run}
            aria-label="Run the sample project"
            className="ml-2 grid h-6 w-7 place-items-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            {building ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5 fill-current" />}
          </button>
          <div className="flex min-w-0 flex-1 items-center justify-center">
            <div className="flex min-w-0 items-center gap-1.5 rounded-md bg-black/25 px-3 py-1 text-[11px] text-white/60">
              <span className="truncate">accounts-platform</span>
              <span className="text-white/30">›</span>
              <span className="truncate">iPhone</span>
            </div>
          </div>
          <span className="hidden w-[58px] sm:block" />
        </div>

        <div className="flex">
          {/* Navigator */}
          <aside className="hidden w-48 shrink-0 border-r border-black/40 bg-[#232325] py-2 text-[12px] 2xl:block">
            <p className="flex items-center gap-1 px-3 pb-1.5 text-[11px] font-semibold text-white/50">
              <ChevronDown className="h-3 w-3" /> accounts-platform
            </p>
            {FOLDERS.map((folder) => (
              <div key={folder} className="mb-1">
                <p className="flex items-center gap-1.5 px-4 py-0.5 text-white/55">
                  <Folder className="h-3 w-3 text-[#5dd8ff]/80" />
                  <span className="truncate">{folder}</span>
                </p>
                {FILES.filter((f) => f.folder === folder).map((f) => (
                  <button
                    key={f.name}
                    type="button"
                    onClick={() => setActiveName(f.name)}
                    className={`flex w-full items-center gap-1.5 py-0.5 pl-8 pr-2 text-left ${
                      f.name === activeName ? 'bg-[#0a84ff]/30 text-white' : 'text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <FileCode2 className="h-3 w-3 shrink-0 text-white/50" />
                    <span className="truncate">{f.name}</span>
                  </button>
                ))}
              </div>
            ))}
          </aside>

          {/* Editor */}
          <div className="min-w-0 flex-1">
            <div className="no-scrollbar flex overflow-x-auto border-b border-black/40 bg-[#252527]" role="tablist">
              {FILES.map((f) => (
                <button
                  key={f.name}
                  type="button"
                  role="tab"
                  aria-selected={f.name === activeName}
                  onClick={() => setActiveName(f.name)}
                  className={`flex shrink-0 items-center gap-1.5 border-r border-black/30 px-3 py-2 text-[11.5px] transition-colors ${
                    f.name === activeName ? 'bg-[#1e1e20] text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${f.dot}`} />
                  {f.name}
                </button>
              ))}
            </div>

            <div className="no-scrollbar h-[372px] overflow-auto py-3 font-mono text-[11.5px] leading-[1.6]">
              <AnimatePresence mode="wait">
                <motion.pre
                  key={file.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="min-w-max"
                >
                  {file.code.split('\n').map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: Math.min(i * 0.025, 0.5), duration: 0.25 }}
                      className="flex pr-4"
                    >
                      <span className="w-10 shrink-0 select-none pr-3 text-right text-white/25">{i + 1}</span>
                      <code>{line ? highlightLine(line, file.lang) : ' '}</code>
                    </motion.div>
                  ))}
                  <div className="flex">
                    <span className="w-10 shrink-0" />
                    <span className="inline-block h-[15px] w-[7px] animate-caret bg-[#0a84ff]" />
                  </div>
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>

          {/* Canvas */}
          <div className="hidden w-[214px] shrink-0 flex-col items-center justify-center gap-2 border-l border-black/40 bg-[#18181a] sm:flex">
            <p className="text-[10px] font-medium uppercase tracking-wider text-white/35">Preview</p>
            <PhonePreview runKey={runKey} />
          </div>
        </div>

        {/* Status bar */}
        <div className="flex h-8 items-center justify-between gap-3 border-t border-black/40 bg-[#2a2a2c] px-3.5 text-[11px]">
          <AnimatePresence mode="wait">
            {building ? (
              <motion.span
                key="building"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-white/60"
              >
                <Loader2 className="h-3 w-3 animate-spin" /> Building accounts-platform…
              </motion.span>
            ) : (
              <motion.span
                key={`ok-${file.name}-${runKey}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-w-0 items-center gap-1.5 text-white/70"
              >
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#30d158]" />
                <span className="font-medium text-white/85">Build Succeeded</span>
                <span className="hidden truncate text-white/40 sm:inline">· {file.status}</span>
              </motion.span>
            )}
          </AnimatePresence>
          <span className="shrink-0 font-mono text-white/35">{file.lang.toUpperCase()} · UTF-8</span>
        </div>
      </div>
    </div>
  );
}
