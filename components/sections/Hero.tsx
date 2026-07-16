"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { brand } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

// One flat word list with explicit break points, so the headline breaks where
// it's meant to at every width instead of reflowing raggedly:
//
//   lg and up  AI receptionist that answers calls / while you run your business
//   below lg   AI receptionist / that answers calls / while you run your / business
//
// Only the first break is breakpoint-specific, and it holds until lg — the
// one-line form needs the column to out-grow the headline, which given this font
// ramp happens from 1024 (~855px of headline in a 944px column). Below that it
// would strand "calls" alone, so tablets keep the stack. This breakpoint is
// coupled to the .hero-display ramp in globals.css: make the type bigger and the
// break has to move out with it. The last line needs no break at all — it's
// simply too long for a phone, so it wraps itself before "business".
//
// Words stay individually wrapped for the stagger. The accent phrase nests its
// words inside one *inline* span: that span can break between them (an
// inline-block could not, and would jump the whole phrase to its own line),
// while its underline still paints per line box via box-decoration-break.
type HeadlineToken =
  | { word: string; muted?: boolean }
  | { accent: string[] }
  | { br: "always" | "stacked" };

const headlineTokens: HeadlineToken[] = [
  { word: "AI" },
  { word: "receptionist" },
  { br: "stacked" },
  { word: "that" },
  { word: "answers" },
  { word: "calls" },
  { br: "always" },
  { word: "while", muted: true },
  { word: "you", muted: true },
  { accent: ["run", "your", "business"] },
];

const BREAK_CLASS: Record<"always" | "stacked", string> = {
  always: "",
  stacked: "lg:hidden",
};

export function Hero() {
  const [revealed, setRevealed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), reducedMotion ? 0 : 1100);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.08,
        delayChildren: reducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: REVEAL_EASE },
    },
  };

  const headlineWord = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: REVEAL_EASE },
    },
  };

  // min-h-svh, not min-h-screen: 100vh is the *large* viewport on mobile, so the
  // section would overflow behind the URL bar and push the next section back into
  // the fold. pt-28 stays alongside justify-center — the fixed header overlays the
  // top, so the asymmetric padding centres the block optically.
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-surface-muted pt-28 md:pt-24 lg:pt-28 pb-14 md:pb-12"
    >
      {/* Ambient backdrop, soft conic gradient + grid */}
      <BackdropOrnaments />

      <Container className="relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          {/* Hidden for now
          <motion.div variants={itemVariants}>
            <Eyebrow asPill>
              <span className="text-ink-muted">Call our AI receptionist · </span>
              <span className="font-semibold text-ink">{brand.phoneDisplay}</span>
            </Eyebrow>
          </motion.div>
          */}

          <motion.h1
            id="hero-heading"
            className="hero-display max-w-[32ch] font-display text-ink"
          >
            {headlineTokens.map((token, i) => {
              if ("br" in token) {
                return <br key={i} className={BREAK_CLASS[token.br]} />;
              }
              if ("accent" in token) {
                return (
                  <span
                    key={i}
                    className={cn("accent-underline", revealed && "is-revealed")}
                  >
                    {token.accent.map((word, w) => (
                      <motion.span
                        key={word}
                        variants={headlineWord}
                        className={cn(
                          "inline-block",
                          w < token.accent.length - 1 && "mr-[0.25em]",
                        )}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </span>
                );
              }
              // A trailing margin on the last word of a line is not just
              // invisible — it still counts toward line-breaking, so it shrinks
              // the usable column by 0.25em. On "calls" (which an unconditional
              // <br> always follows) that phantom width is what tipped "that
              // answers calls" into wrapping on phones. Only skip it for an
              // "always" break: before a "stacked" one the next word rejoins
              // this line at lg, where the margin is real.
              const next = headlineTokens[i + 1];
              const breaksAfter = !!next && "br" in next && next.br === "always";
              return (
                <motion.span
                  key={i}
                  variants={headlineWord}
                  className={cn(
                    "inline-block",
                    !breaksAfter && "mr-[0.25em]",
                    token.muted && "text-ink-muted",
                  )}
                >
                  {token.word}
                </motion.span>
              );
            })}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-[42rem] text-balance text-[18px] leading-[1.6] text-ink-muted md:mt-9 md:text-[19px]"
          >
            <span className="text-[#B8960A] font-semibold">Robyn AI</span> is the answering service that keeps your phone covered, so
            you never miss a lead or leave a customer waiting.
          </motion.p>

          {/* items-start so the demo button aligns to the top of the primary
              column rather than centring against it + its caption. */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-row items-start justify-center gap-4"
          >
            {/* The caption belongs to the free trial, not to both CTAs, so it
                sits under that button and tracks its width.
                Padding is set via max-sm:/sm: rather than a bare px-*, because
                cn() is clsx — it can't beat size="lg"'s own px-6, it just emits
                both and lets stylesheet order decide. The pair has to fit a
                360px phone side by side. */}
            <div className="flex flex-col items-center">
              {/* TODO: point at a real signup route once one exists — until then
                  both CTAs share the demo booking link. */}
              <Button
                size="lg"
                variant="primary"
                href={brand.bookDemoUrl}
                className="h-16 whitespace-nowrap text-[17px] max-sm:px-6 sm:h-12 sm:px-8 sm:text-[16px]"
              >
                Try for free
              </Button>
              <p className="mt-3.5 text-[13px] text-ink-faint">
                No credit card required
              </p>
            </div>
            <Button
              size="lg"
              variant="outline"
              href={brand.bookDemoUrl}
              className="h-16 whitespace-nowrap text-[17px] max-sm:px-6 sm:h-12 sm:px-8 sm:text-[16px]"
            >
              Book a demo
            </Button>
          </motion.div>
        </motion.div>

      </Container>

    </section>
  );
}

function BackdropOrnaments() {
  return (
    <>
      {/* Very light yellow tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[rgba(255,208,0,0.04)]"
      />
      {/* Subtle warm dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(24,19,10,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)",
        }}
      />
      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-bg to-transparent"
      />
    </>
  );
}
