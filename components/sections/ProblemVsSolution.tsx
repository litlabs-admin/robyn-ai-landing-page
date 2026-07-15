"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  CalendarCheck,
  Phone,
  PhoneMissed,
  PhoneOff,
  Sparkles,
  WifiOff,
  Zap,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const LEFT_BARS = [0, 1, 2, 3, 4, 5, 6];
const RIGHT_LIVE_BARS = [0, 1, 2, 3, 4];
const FIELDS = ["Name", "Service", "Timeframe"];

export function ProblemVsSolution() {
  return (
    <section
      id="problem-solution"
      aria-labelledby="comparison-heading"
      className="relative isolate overflow-hidden bg-bg py-16 md:py-20"
    >
      <style dangerouslySetInnerHTML={{ __html: ILLUSTRATION_CSS }} />
      <Backdrop />

      <Container>
        {/* Editorial heading */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <ScrollReveal y={12} duration={0.7} amount={0.4}>
            <Eyebrow asPill className="mb-6">
              <span className="text-ink-muted">The cost of a missed call</span>
            </Eyebrow>
          </ScrollReveal>
          <ScrollReveal y={22} duration={0.95} delay={0.07} amount={0.3}>
            <h2
              id="comparison-heading"
              className="section-heading font-display text-ink"
            >
              Missed calls cost you.
              <br />
              <span className="text-accent">Robyn AI</span>{" "}
              <span className="text-ink-muted">pays you back.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal y={16} duration={0.8} delay={0.15} amount={0.3}>
            <p className="mt-5 max-w-xl text-balance text-[16px] leading-[1.65] text-ink-muted md:text-[17px]">
              Every unanswered ring is a customer choosing the next business
              that picks up. Here&apos;s the difference one AI receptionist
              makes.
            </p>
          </ScrollReveal>
        </div>

        {/* Side-by-side comparison */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
          <ComparisonCard
            variant="old"
            label="The old way"
            title="Voicemail. Dead air. Lost lead."
            description="Phone rings, nobody picks up. Caller hangs up, dials the next listing, and you never know they were there."
            stats={[
              { icon: PhoneOff, text: "62% of missed calls never call back" },
              { icon: WifiOff, text: "Voicemail conversion: under 3%" },
            ]}
          />
          <ComparisonCard
            variant="new"
            label="The Robyn AI way"
            title="Answered, qualified, and booked."
            description={<><span className="text-accent font-semibold">Robyn AI</span> picks up on the first ring, captures the details that matter, and books the next step before the caller is off the phone.</>}
            stats={[
              { icon: Zap, text: "Answers in under 0.4 seconds" },
              { icon: BadgeCheck, text: "Up to 38% lift in booked calls" },
            ]}
          />
        </div>

      </Container>
    </section>
  );
}

interface ComparisonCardProps {
  variant: "old" | "new";
  label: string;
  title: string;
  description: ReactNode;
  stats: { icon: typeof Zap; text: string }[];
}

function ComparisonCard({
  variant,
  label,
  title,
  description,
  stats,
}: ComparisonCardProps) {
  const isNew = variant === "new";

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.85,
        ease: EASE,
        delay: isNew ? 0.15 : 0.05,
      }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border p-2",
        "transition-all duration-500 ease-out",
        isNew
          ? "border-border bg-surface shadow-card hover:shadow-lift"
          : "border-border/60 bg-surface/60 shadow-soft",
      )}
    >
      {/* Yellow aura on the "new" card */}
      {isNew && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(255,208,0,0.18) 0%, rgba(255,208,0,0) 70%)",
          }}
        />
      )}

      {/* Header strip */}
      <div className="flex items-center justify-between px-3 pb-2.5 pt-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              isNew
                ? "bg-accent ring-2 ring-accent/30"
                : "bg-ink-muted/40 ring-2 ring-ink-muted/15",
            )}
          />
          <span
            className={cn(
              "text-[12px] font-medium tracking-[0.04em]",
              isNew ? "text-ink" : "text-ink-muted",
            )}
          >
            {label}
          </span>
        </div>
        {isNew && (
          <span className="flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-ink">
            <Sparkles className="h-3 w-3" strokeWidth={2.4} />
            Recommended
          </span>
        )}
      </div>

      {/* Illustration frame */}
      <div
        className={cn(
          "relative aspect-[16/10] w-full overflow-hidden rounded-2xl",
          isNew ? "bg-surface-muted" : "bg-surface",
        )}
      >
        {isNew ? <NewWayIllo /> : <OldWayIllo />}

        {/* Live indicator (only "new" card) */}
        {isNew && (
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-border/60 bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-ink shadow-soft backdrop-blur-md">
            <span className="pvs-live-dot" />
            LIVE
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-4 pb-5 pt-5 md:px-5 md:pb-6 md:pt-6">
        <h3
          className={cn(
            "font-display text-[22px] font-semibold tracking-[-0.015em] md:text-[26px]",
            isNew ? "text-ink" : "text-ink-muted",
          )}
        >
          {title}
        </h3>
        <p className="mt-2.5 text-[14.5px] leading-[1.6] text-ink-muted md:text-[15px]">
          {description}
        </p>

        <div className="mt-5 border-t border-border/70 pt-4">
          <p className={cn(
            "mb-2.5 text-[10.5px] font-semibold uppercase tracking-[0.1em]",
            isNew ? "text-accent" : "text-red-500/80",
          )}>
            {isNew ? "What changes" : "The problem"}
          </p>
          <ul className="flex flex-col gap-2.5">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <li
                  key={i}
                  className="flex items-center gap-2.5 text-[13.5px] text-ink"
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                      isNew
                        ? "bg-accent/80 text-accent-ink"
                        : "bg-red-500/10 text-red-500",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  <span>{s.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * LEFT — "Voicemail. Dead air. Lost lead."
 * A single call card decays across one 6s loop: signal rings pulse (incoming) →
 * the status cross-fades to a waveform that jitters then flatlines (dead air) →
 * a red voicemail cue appears → the whole card desaturates and drifts away,
 * ending on an empty, still frame. Animation lives in ILLUSTRATION_CSS; the base
 * (non-animated) styles are the static aftermath frame shown under
 * prefers-reduced-motion.
 */
function OldWayIllo() {
  return (
    <div className="pvs-old" aria-hidden>
      {/* faint concentric signal field — depth behind the card */}
      <div className="pvs-field">
        <span />
        <span />
        <span />
      </div>

      <div className="pvs-caller">
        <div className="pvs-caller-top">
          <div className="pvs-avatar">
            <div className="pvs-rings">
              <span className="pvs-ring" />
              <span className="pvs-ring" />
              <span className="pvs-ring" />
            </div>
            <div className="pvs-avatar-core">
              <Phone className="h-[15px] w-[15px]" strokeWidth={2} />
            </div>
          </div>
          <div className="pvs-ident">
            <span className="pvs-ident-name" />
            <span className="pvs-ident-sub" />
          </div>
        </div>

        <div className="pvs-status">
          <span className="pvs-status-label">Incoming call…</span>
          <div className="pvs-wave">
            {LEFT_BARS.map((i) => (
              <span
                key={i}
                className="pvs-wave-bar"
                style={{ "--i": i } as CSSProperties}
              />
            ))}
          </div>
          <span className="pvs-deadline" />
        </div>

        <div className="pvs-cue">
          <PhoneMissed className="h-3 w-3" strokeWidth={2.2} />
          <span>Sent to voicemail</span>
        </div>
      </div>
    </div>
  );
}

/**
 * RIGHT — "Answered, qualified, and booked."
 * A call card builds momentum across one 6s loop: answered instantly (ring burst
 * + live amber waveform) → Name / Service / Timeframe fill in one by one, each
 * landing a checkmark that draws itself → a "Booked" chip pops in with a success
 * burst. Palette warms across the sequence, ending resolved. Base (non-animated)
 * styles are the resolved static frame shown under prefers-reduced-motion.
 */
function NewWayIllo() {
  return (
    <div className="pvs-new" aria-hidden>
      <div className="pvs-grid" />
      <div className="pvs-warm" />

      <div className="pvs-card">
        <div className="pvs-answer">
          <div className="pvs-answer-avatar">
            <span className="pvs-answer-ring" />
            <div className="pvs-answer-core">
              <Phone className="h-3.5 w-3.5" strokeWidth={2} />
            </div>
          </div>
          <span className="pvs-answer-label">Answered</span>
          <div className="pvs-live">
            {RIGHT_LIVE_BARS.map((i) => (
              <span
                key={i}
                className="pvs-livebar"
                style={{ "--i": i } as CSSProperties}
              />
            ))}
          </div>
        </div>

        <div className="pvs-rows">
          {FIELDS.map((label, idx) => (
            <div key={label} className={`pvs-row pvs-row-${idx + 1}`}>
              <span className="pvs-row-label">{label}</span>
              <span className="pvs-fill">
                <span className={`pvs-fill-bar pvs-fill-${idx + 1}`} />
              </span>
              <span className={`pvs-check-badge pvs-cb-${idx + 1}`}>
                <svg
                  className={`pvs-check pvs-check-${idx + 1}`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12.5l4 4 10-10"
                    pathLength={1}
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          ))}
        </div>

        <div className="pvs-booked-wrap">
          <span className="pvs-burst" />
          <div className="pvs-booked">
            <CalendarCheck className="h-3.5 w-3.5" strokeWidth={2.2} />
            <span>Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Backdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-surface-muted/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-bg to-transparent"
      />
    </>
  );
}

/* Colors below mirror the design tokens in app/globals.css exactly:
   ink 24,19,10 · ink-muted 54,43,10 · border 234,216,112 · accent 255,208,0 ·
   accent-ink #18130A · red-500 239,68,68. rgba() is used only where alpha is
   needed; solid fills use the var(--token). */
const ILLUSTRATION_CSS = `
.pvs-old, .pvs-new {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}

/* shared floating call card */
.pvs-caller, .pvs-card {
  position: relative; z-index: 2;
  width: min(86%, 250px);
  display: flex; flex-direction: column; gap: 10px;
  padding: 14px;
  border-radius: 16px;
  background: var(--surface);
  border: 1px solid rgba(234,216,112,0.6);
  box-shadow: 0 1px 2px rgba(24,19,10,0.04), 0 10px 26px rgba(24,19,10,0.08);
  will-change: transform, opacity;
}

/* ============================ LEFT: decay ============================ */
.pvs-field {
  position: absolute; inset: 0; z-index: 1;
  display: flex; align-items: center; justify-content: center;
}
.pvs-field span {
  position: absolute; aspect-ratio: 1; border-radius: 9999px;
  border: 1px solid rgba(54,43,10,0.10);
}
.pvs-field span:nth-child(1) { width: 34%; }
.pvs-field span:nth-child(2) { width: 60%; }
.pvs-field span:nth-child(3) { width: 88%; }

.pvs-caller-top { display: flex; align-items: center; gap: 10px; }
.pvs-avatar {
  position: relative; width: 34px; height: 34px; flex: none;
  display: flex; align-items: center; justify-content: center;
}
.pvs-rings {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
}
.pvs-ring {
  position: absolute; width: 100%; height: 100%; border-radius: 9999px;
  border: 1.5px solid rgba(54,43,10,0.35);
}
.pvs-avatar-core {
  position: relative; z-index: 2; width: 34px; height: 34px; border-radius: 9999px;
  background: rgba(54,43,10,0.08); color: rgba(54,43,10,0.75);
  display: flex; align-items: center; justify-content: center;
}
.pvs-ident { display: flex; flex-direction: column; gap: 5px; }
.pvs-ident-name { display: block; width: 74px; height: 7px; border-radius: 9999px; background: rgba(54,43,10,0.28); }
.pvs-ident-sub  { display: block; width: 50px; height: 6px; border-radius: 9999px; background: rgba(54,43,10,0.15); }

.pvs-status { position: relative; height: 24px; }
.pvs-status-label {
  position: absolute; inset: 0; display: flex; align-items: center;
  font-size: 11px; font-weight: 500; color: rgba(54,43,10,0.6);
  opacity: 0;
}
.pvs-wave { position: absolute; inset: 0; display: flex; align-items: center; gap: 3px; opacity: 0; }
.pvs-wave-bar {
  width: 3px; height: 18px; border-radius: 9999px; background: rgba(54,43,10,0.30);
  transform: scaleY(0.35); transform-origin: center;
}
.pvs-deadline {
  position: absolute; left: 0; right: 0; top: 50%; height: 2px; border-radius: 9999px;
  background: rgba(54,43,10,0.28); transform: scaleX(1); transform-origin: left;
}
.pvs-cue {
  display: flex; align-items: center; gap: 6px; align-self: flex-start;
  padding: 3px 8px; border-radius: 9999px;
  background: rgba(239,68,68,0.10); color: rgb(239,68,68);
  font-size: 11px; font-weight: 600;
}

/* LEFT static / reduced-motion aftermath */
.pvs-caller { filter: saturate(0.3); }
.pvs-rings { opacity: 0; }

/* ============================ RIGHT: momentum ============================ */
.pvs-grid, .pvs-warm { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.pvs-grid {
  background-image: radial-gradient(rgba(234,216,112,0.4) 1px, transparent 1px);
  background-size: 15px 15px; opacity: 0.4;
  -webkit-mask-image: radial-gradient(68% 60% at 50% 42%, #000, transparent 76%);
          mask-image: radial-gradient(68% 60% at 50% 42%, #000, transparent 76%);
}
.pvs-warm {
  background: radial-gradient(60% 55% at 50% 28%, rgba(255,208,0,0.22), rgba(255,208,0,0) 70%);
}

.pvs-answer { display: flex; align-items: center; gap: 8px; }
.pvs-answer-avatar {
  position: relative; width: 26px; height: 26px; flex: none;
  display: flex; align-items: center; justify-content: center;
}
.pvs-answer-ring {
  position: absolute; width: 100%; height: 100%; border-radius: 9999px;
  border: 2px solid rgba(255,208,0,0.6); opacity: 0;
}
.pvs-answer-core {
  position: relative; z-index: 2; width: 26px; height: 26px; border-radius: 9999px;
  background: var(--accent); color: var(--accent-ink);
  display: flex; align-items: center; justify-content: center;
}
.pvs-answer-label { font-size: 12px; font-weight: 600; color: var(--ink); }
.pvs-live { margin-left: auto; display: flex; align-items: flex-end; gap: 2px; height: 16px; }
.pvs-livebar {
  width: 3px; height: 14px; border-radius: 9999px; background: var(--accent);
  transform: scaleY(0.55); transform-origin: bottom;
}

.pvs-rows { display: flex; flex-direction: column; gap: 7px; }
.pvs-row {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 8px; border-radius: 9px;
  background: var(--surface); border: 1px solid rgba(234,216,112,0.55);
}
.pvs-row-label { flex: none; width: 56px; font-size: 11px; color: rgba(54,43,10,0.75); }
.pvs-fill {
  position: relative; flex: 1; height: 6px; border-radius: 9999px;
  background: rgba(54,43,10,0.10); overflow: hidden;
}
.pvs-fill-bar {
  position: absolute; inset: 0; transform-origin: left; transform: scaleX(1);
  background: rgba(255,208,0,0.7); border-radius: 9999px;
}
.pvs-check-badge {
  flex: none; width: 16px; height: 16px; border-radius: 9999px;
  background: var(--accent); color: var(--accent-ink);
  display: flex; align-items: center; justify-content: center;
}
.pvs-check { width: 11px; height: 11px; }
.pvs-check path { stroke-dasharray: 1; stroke-dashoffset: 0; }

.pvs-booked-wrap {
  position: relative; align-self: center; margin-top: 2px;
  display: flex; align-items: center; justify-content: center;
}
.pvs-burst {
  position: absolute; width: 62%; height: 100%; border-radius: 9999px;
  border: 2px solid rgba(255,208,0,0.6); opacity: 0;
}
.pvs-booked {
  position: relative; z-index: 2; display: flex; align-items: center; gap: 6px;
  padding: 5px 12px; border-radius: 9999px;
  background: var(--accent); color: var(--accent-ink);
  font-size: 12px; font-weight: 600;
  box-shadow: 0 2px 8px rgba(255,208,0,0.35);
}

.pvs-live-dot { display: block; width: 6px; height: 6px; border-radius: 9999px; background: rgb(239,68,68); }

/* ===================== MOTION (disabled when reduced) ===================== */
@media (prefers-reduced-motion: no-preference) {
  /* LEFT */
  .pvs-field span { animation: pvsBreathe 6s ease-in-out infinite; }
  .pvs-caller { animation: pvsCaller 6s cubic-bezier(0.4,0,0.2,1) infinite; }
  .pvs-rings { animation: pvsRingEnv 6s linear infinite; }
  .pvs-ring { animation: pvsRing 1.8s cubic-bezier(0.22,1,0.36,1) infinite; }
  .pvs-ring:nth-child(2) { animation-delay: 0.55s; }
  .pvs-ring:nth-child(3) { animation-delay: 1.1s; }
  .pvs-status-label { animation: pvsLabel 6s ease infinite; }
  .pvs-wave { animation: pvsWave 6s ease infinite; }
  .pvs-wave-bar { animation: pvsBar 0.7s ease-in-out infinite; animation-delay: calc(var(--i) * -0.09s); }
  .pvs-deadline { animation: pvsDeadline 6s cubic-bezier(0.22,1,0.36,1) infinite; }
  .pvs-cue { animation: pvsCue 6s cubic-bezier(0.22,1,0.36,1) infinite; }

  /* RIGHT */
  .pvs-card { animation: pvsCard 6s cubic-bezier(0.22,1,0.36,1) infinite; }
  .pvs-warm { animation: pvsWarm 6s ease infinite; }
  .pvs-answer-ring { animation: pvsAnswerRing 6s cubic-bezier(0.22,1,0.36,1) infinite; }
  .pvs-livebar { animation: pvsLive 0.8s ease-in-out infinite; animation-delay: calc(var(--i) * -0.12s); }
  .pvs-row-1 { animation: pvsRow1 6s cubic-bezier(0.22,1,0.36,1) infinite; }
  .pvs-row-2 { animation: pvsRow2 6s cubic-bezier(0.22,1,0.36,1) infinite; }
  .pvs-row-3 { animation: pvsRow3 6s cubic-bezier(0.22,1,0.36,1) infinite; }
  .pvs-fill-1 { animation: pvsFill1 6s cubic-bezier(0.22,1,0.36,1) infinite; }
  .pvs-fill-2 { animation: pvsFill2 6s cubic-bezier(0.22,1,0.36,1) infinite; }
  .pvs-fill-3 { animation: pvsFill3 6s cubic-bezier(0.22,1,0.36,1) infinite; }
  .pvs-cb-1 { animation: pvsCb1 6s cubic-bezier(0.34,1.56,0.64,1) infinite; }
  .pvs-cb-2 { animation: pvsCb2 6s cubic-bezier(0.34,1.56,0.64,1) infinite; }
  .pvs-cb-3 { animation: pvsCb3 6s cubic-bezier(0.34,1.56,0.64,1) infinite; }
  .pvs-check-1 path { animation: pvsDraw1 6s ease infinite; }
  .pvs-check-2 path { animation: pvsDraw2 6s ease infinite; }
  .pvs-check-3 path { animation: pvsDraw3 6s ease infinite; }
  .pvs-booked { animation: pvsBooked 6s cubic-bezier(0.34,1.56,0.64,1) infinite; }
  .pvs-burst { animation: pvsBurst 6s cubic-bezier(0.22,1,0.36,1) infinite; }
  .pvs-live-dot { animation: pvsBlink 1.6s ease-in-out infinite; }
}

/* ---- LEFT keyframes ---- */
@keyframes pvsBreathe {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.04); opacity: 0.65; }
}
@keyframes pvsCaller {
  0% { opacity: 0; transform: translateY(-10px) scale(0.96); filter: saturate(0.9); }
  6% { opacity: 1; transform: translateY(0) scale(1); filter: saturate(0.9); }
  62% { opacity: 1; transform: translateY(0) scale(1); filter: saturate(0.9); }
  85% { opacity: 0; transform: translateY(18px) scale(0.97); filter: saturate(0.15); }
  100% { opacity: 0; transform: translateY(-10px) scale(0.96); filter: saturate(0.9); }
}
@keyframes pvsRingEnv {
  0% { opacity: 0; }
  5% { opacity: 1; }
  26% { opacity: 1; }
  32% { opacity: 0; }
  100% { opacity: 0; }
}
@keyframes pvsRing {
  0% { transform: scale(0.55); opacity: 0.55; }
  100% { transform: scale(1.8); opacity: 0; }
}
@keyframes pvsLabel {
  0% { opacity: 0; }
  6% { opacity: 1; }
  26% { opacity: 1; }
  31% { opacity: 0; }
  100% { opacity: 0; }
}
@keyframes pvsWave {
  0%, 29% { opacity: 0; }
  34% { opacity: 1; }
  50% { opacity: 1; }
  57% { opacity: 0; }
  100% { opacity: 0; }
}
@keyframes pvsBar {
  0%, 100% { transform: scaleY(0.3); }
  50% { transform: scaleY(1); }
}
@keyframes pvsDeadline {
  0%, 50% { transform: scaleX(0); opacity: 0; }
  53% { opacity: 1; }
  60% { transform: scaleX(1); opacity: 1; }
  82% { transform: scaleX(1); opacity: 1; }
  88% { opacity: 0; }
  100% { transform: scaleX(0); opacity: 0; }
}
@keyframes pvsCue {
  0%, 48% { opacity: 0; transform: translateY(2px) scale(0.85); }
  54% { opacity: 1; transform: translateY(0) scale(1.05); }
  58% { transform: scale(1); }
  82% { opacity: 1; }
  88% { opacity: 0; }
  100% { opacity: 0; transform: translateY(2px) scale(0.85); }
}

/* ---- RIGHT keyframes ---- */
@keyframes pvsCard {
  0% { opacity: 0; transform: translateY(10px) scale(0.97); }
  6% { opacity: 1; transform: translateY(0) scale(1); }
  88% { opacity: 1; transform: translateY(0) scale(1); }
  95% { opacity: 0; transform: translateY(-6px) scale(1); }
  100% { opacity: 0; transform: translateY(10px) scale(0.97); }
}
@keyframes pvsWarm {
  0%, 10% { opacity: 0; }
  60% { opacity: 1; }
  88% { opacity: 1; }
  96% { opacity: 0; }
  100% { opacity: 0; }
}
@keyframes pvsAnswerRing {
  0%, 2% { transform: scale(0.5); opacity: 0; }
  6% { opacity: 0.6; }
  22% { transform: scale(1.8); opacity: 0; }
  100% { transform: scale(0.5); opacity: 0; }
}
@keyframes pvsLive {
  0%, 100% { transform: scaleY(0.35); }
  50% { transform: scaleY(1); }
}
@keyframes pvsRow1 {
  0%, 12% { opacity: 0; transform: translateX(-6px); }
  18% { opacity: 1; transform: translateX(0); }
  92% { opacity: 1; transform: translateX(0); }
  96% { opacity: 0; transform: translateX(0); }
  100% { opacity: 0; transform: translateX(-6px); }
}
@keyframes pvsRow2 {
  0%, 24% { opacity: 0; transform: translateX(-6px); }
  30% { opacity: 1; transform: translateX(0); }
  92% { opacity: 1; transform: translateX(0); }
  96% { opacity: 0; transform: translateX(0); }
  100% { opacity: 0; transform: translateX(-6px); }
}
@keyframes pvsRow3 {
  0%, 36% { opacity: 0; transform: translateX(-6px); }
  42% { opacity: 1; transform: translateX(0); }
  92% { opacity: 1; transform: translateX(0); }
  96% { opacity: 0; transform: translateX(0); }
  100% { opacity: 0; transform: translateX(-6px); }
}
@keyframes pvsFill1 {
  0%, 18% { transform: scaleX(0); }
  27% { transform: scaleX(1); }
  100% { transform: scaleX(1); }
}
@keyframes pvsFill2 {
  0%, 30% { transform: scaleX(0); }
  39% { transform: scaleX(1); }
  100% { transform: scaleX(1); }
}
@keyframes pvsFill3 {
  0%, 42% { transform: scaleX(0); }
  51% { transform: scaleX(1); }
  100% { transform: scaleX(1); }
}
@keyframes pvsCb1 {
  0%, 27% { opacity: 0; transform: scale(0.4); }
  33% { opacity: 1; transform: scale(1); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes pvsCb2 {
  0%, 39% { opacity: 0; transform: scale(0.4); }
  45% { opacity: 1; transform: scale(1); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes pvsCb3 {
  0%, 51% { opacity: 0; transform: scale(0.4); }
  57% { opacity: 1; transform: scale(1); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes pvsDraw1 {
  0%, 27% { stroke-dashoffset: 1; }
  33% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 0; }
}
@keyframes pvsDraw2 {
  0%, 39% { stroke-dashoffset: 1; }
  45% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 0; }
}
@keyframes pvsDraw3 {
  0%, 51% { stroke-dashoffset: 1; }
  57% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 0; }
}
@keyframes pvsBooked {
  0%, 57% { opacity: 0; transform: scale(0.6); }
  64% { opacity: 1; transform: scale(1.12); }
  69% { transform: scale(1); }
  92% { opacity: 1; transform: scale(1); }
  96% { opacity: 0; }
  100% { opacity: 0; transform: scale(0.6); }
}
@keyframes pvsBurst {
  0%, 59% { transform: scale(0.5); opacity: 0; }
  64% { opacity: 0.6; }
  80% { transform: scale(1.9); opacity: 0; }
  100% { transform: scale(0.5); opacity: 0; }
}
@keyframes pvsBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}
`;
