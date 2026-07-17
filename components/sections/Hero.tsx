"use client";

import { BrandBloom } from "@/components/ui/BrandBloom";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { brand } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

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
// words inside one *inline* span so it can break between them; an inline-block
// could not, and would jump the whole phrase to its own line.
type HeadlineToken =
  | { word: string }
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
  { word: "while" },
  { word: "you" },
  { accent: ["run", "your", "business"] },
];

const BREAK_CLASS: Record<"always" | "stacked", string> = {
  always: "",
  stacked: "lg:hidden",
};

export function Hero() {
  const reducedMotion = useReducedMotion();

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
  //
  // The blue ends in a hard edge against Features' cream, with no fade — the
  // section below starts a different theme and the seam is meant to read.
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-brand-blue pt-28 md:pt-24 lg:pt-28 pb-14 md:pb-12"
    >
      <BrandBloom />

      <Container className="relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          <motion.h1
            id="hero-heading"
            className="hero-display max-w-[32ch] font-display text-white"
          >
            {headlineTokens.map((token, i) => {
              if ("br" in token) {
                return <br key={i} className={BREAK_CLASS[token.br]} />;
              }
              if ("accent" in token) {
                return (
                  <span key={i} className="text-brand-yellow">
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
                  className={cn("inline-block", !breaksAfter && "mr-[0.25em]")}
                >
                  {token.word}
                </motion.span>
              );
            })}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-[44rem] text-balance text-[18px] leading-[1.6] text-white md:mt-9 md:text-[19px]"
          >
            Robyn AI is the answering service that keeps your phone covered, so
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
                variant="brand"
                href={brand.bookDemoUrl}
                className="h-14 whitespace-nowrap rounded-[10px] text-[16px] max-sm:px-6 sm:h-[52px] sm:px-9"
              >
                Try For Free
              </Button>
              <p className="mt-3 text-[10px] text-white">
                *No credit card required
              </p>
            </div>
            <Button
              size="lg"
              variant="outline-light"
              href={brand.bookDemoUrl}
              className="h-14 whitespace-nowrap rounded-[10px] text-[16px] max-sm:px-6 sm:h-[52px] sm:px-9"
            >
              Book a Demo
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
