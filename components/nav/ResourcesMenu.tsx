"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronRight,
  FileText,
  HelpCircle,
  Mic,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

interface Resource {
  icon: LucideIcon;
  label: string;
  desc: string;
  href: string;
}

const resources: Resource[] = [
  { icon: FileText, label: "Blog", desc: "Tips for small business owners", href: "/resources/blog" },
  { icon: BookOpen, label: "Setup guides", desc: "Step-by-step call forwarding help", href: "/resources/setup-guides" },
  { icon: Mic, label: "Voice library", desc: "Browse realistic AI voices", href: "/resources/voice-library" },
  { icon: HelpCircle, label: "Help center", desc: "Answers to common questions", href: "/resources/help-center" },
];

export function ResourcesMenu({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-0 top-full mt-2 w-[320px] overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_8px_48px_rgba(17,17,17,0.13)]"
        >
          <div className="p-4">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
              Resources
            </p>
            <ul className="space-y-0.5">
              {resources.map(({ icon: Icon, label, desc, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-surface-muted"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface shadow-sm">
                      <Icon className="h-4 w-4 text-ink/60" strokeWidth={1.5} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-medium text-ink">{label}</span>
                      <span className="block text-[12px] leading-snug text-ink-muted">{desc}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-ink/25 transition-colors group-hover:text-ink/50" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
