import { motion } from 'framer-motion';
import { ArrowLeftRight, CreditCard, Home, PieChart, User } from 'lucide-react';

// Illustrative sample data for the mock app screen.
const ACCOUNTS = [
  { name: 'Checking', mask: '•• 4821', amount: '$4,210.18', color: 'bg-accent' },
  { name: 'Savings', mask: '•• 7730', amount: '$8,270.14', color: 'bg-green' },
  { name: 'Card', mask: '•• 1902', amount: '−$642.55', color: 'bg-purple' },
];

/** A small iPhone-style frame rendering the AccountsScreen from the IDE mock. */
export function PhonePreview({ runKey }: { runKey: number }) {
  return (
    <div className="relative mx-auto w-[178px] rounded-[30px] border-[5px] border-[#2c2c2e] bg-black p-1 shadow-2xl">
      <div className="relative h-[330px] overflow-hidden rounded-[24px] bg-[#0b0b0f] text-white">
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-1.5 z-10 h-[16px] w-[54px] -translate-x-1/2 rounded-full bg-black" />
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 pt-1.5 text-[8px] font-semibold">
          <span>9:41</span>
          <span className="flex items-center gap-0.5">
            <span className="h-1.5 w-2.5 rounded-[2px] border border-white/80" />
          </span>
        </div>

        <motion.div
          key={runKey}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-3 pt-4"
        >
          <p className="text-[9px] text-white/50">Good morning</p>
          <p className="text-[15px] font-bold leading-tight">Accounts</p>

          <div className="mt-2.5 rounded-xl bg-gradient-to-br from-[#0a84ff] to-[#5e5ce6] p-2.5">
            <p className="text-[8px] uppercase tracking-wide text-white/70">Available balance</p>
            <p className="text-[16px] font-bold tabular-nums">$11,837.77</p>
            <div className="mt-1.5 flex gap-1">
              <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[7px] font-semibold">Transfer</span>
              <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[7px] font-semibold">Pay</span>
            </div>
          </div>

          <ul className="mt-2.5 space-y-1.5">
            {ACCOUNTS.map((a, i) => (
              <motion.li
                key={a.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="flex items-center gap-2 rounded-lg bg-white/[0.06] px-2 py-1.5"
              >
                <span className={`h-4 w-4 shrink-0 rounded-md ${a.color} opacity-90`} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[9px] font-semibold leading-tight">{a.name}</span>
                  <span className="block text-[7px] text-white/45">{a.mask}</span>
                </span>
                <span className="shrink-0 text-[8.5px] font-semibold tabular-nums">{a.amount}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Tab bar */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-white/10 bg-[#0b0b0f]/90 px-2 pb-3 pt-1.5 text-white/40">
          <Home className="h-3 w-3 text-[#0a84ff]" />
          <ArrowLeftRight className="h-3 w-3" />
          <CreditCard className="h-3 w-3" />
          <PieChart className="h-3 w-3" />
          <User className="h-3 w-3" />
        </div>
        <div className="absolute bottom-1 left-1/2 h-[3px] w-12 -translate-x-1/2 rounded-full bg-white/60" />
      </div>
    </div>
  );
}
