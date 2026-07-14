"use client";

import { TarshaLogo, type WordmarkStyle } from "@/components/ui/TarshaLogo";
import Link from "next/link";

const STYLES: {
  id:          WordmarkStyle;
  label:       string;
  description: string;
}[] = [
  {
    id:          "robyn-brodine",
    label:       "0, Brodine  ★ current",
    description: "The approved logotype — Brodine, a commercial geometric sans with distinctive knife-cut terminals. Shipped as an outlined SVG path (artwork, not a webfont), so it scales crisply and recolours for light/dark. This is the mark now live in the header, footer and loader.",
  },
  {
    id:          "robyn",
    label:       "1, Space Grotesk",
    description: "Distinctive geometric grotesque. Two-story 'a', notched joins and a crisp straight-tailed 'y' read as considered tech/AI, not a default sans. Highly legible at every size.",
  },
  {
    id:          "robyn-sora",
    label:       "2, Sora",
    description: "Geometric sans built 'for a brighter digital future'. Neutral, futuristic, unmistakably AI. The clean, safe choice — a little less character than Space Grotesk.",
  },
  {
    id:          "robyn-manrope",
    label:       "3, Manrope",
    description: "Semi-rounded modern sans. Premium SaaS feel with a touch of warmth — plays to Robyn's human side while staying professional.",
  },
  {
    id:          "robyn-outfit",
    label:       "4, Outfit",
    description: "Ultra-clean geometric sans with near-perfect even colour. Maximum legibility and polish; the most minimal, least quirky option.",
  },
  {
    id:          "robyn-syne",
    label:       "5, Syne",
    description: "Artsy, futuristic display with unusual proportions. Extremely memorable as a standalone mark — the boldest personality here, higher risk, higher reward.",
  },
  {
    id:          "robyn-bricolage",
    label:       "6, Bricolage Grotesque",
    description: "Characterful editorial grotesque, fresh and on-trend. Complements the warm cream-and-gold aesthetic while feeling distinctly modern.",
  },
  {
    id:          "robyn-unbounded",
    label:       "7, Unbounded",
    description: "Bold geometric display. Maximum distinctiveness and presence — a statement wordmark that's strongest at larger sizes.",
  },
  {
    id:          "robyn-familjen",
    label:       "8, Familjen Grotesk",
    description: "Compact, quirky-but-clean grotesque. Premium and slightly unexpected without shouting — a refined middle ground.",
  },
];

const SIZES = ["sm", "md", "lg"] as const;

export default function LogoPreviewPage() {
  return (
    <div className="min-h-screen bg-[#F4F2EC] font-sans">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#DDD8C8] bg-[#F4F2EC]/95 backdrop-blur-sm px-6 py-4">
        <div>
          <h1 className="font-display text-[18px] font-bold tracking-tight text-[#18130A]">
            Wordmark Preview, Robyn AI
          </h1>
          <p className="text-[12px] text-[#7A6420] mt-0.5">
            8 premium fonts · light + dark · 3 sizes each, pick one to ship
          </p>
        </div>
        <Link
          href="/"
          className="rounded-lg border border-[#EAD870] bg-white px-3 py-1.5 text-[13px] font-medium text-[#18130A] hover:bg-[#FFFEF5] transition-colors"
        >
          ← Back to site
        </Link>
      </div>

      {/* Style cards */}
      <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col gap-14">
        {STYLES.map(({ id, label, description }) => (
          <section key={id}>
            {/* Section header */}
            <div className="mb-5">
              <h2 className="font-display text-[15px] font-bold tracking-tight text-[#18130A]">
                {label}
              </h2>
              <p className="mt-1 text-[13px] leading-relaxed text-[#4A3C10] max-w-[56ch]">
                {description}
              </p>
            </div>

            {/* Light + Dark panels */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Light panel */}
              <div className="rounded-2xl border border-[#EAD870]/60 bg-[#FFFEF5] p-8">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-[#7A6420]">
                  Light · on cream
                </p>
                <div className="flex flex-col gap-5">
                  {SIZES.map((size) => (
                    <div key={size} className="flex items-center gap-4">
                      <span className="w-5 shrink-0 text-[11px] font-medium text-[#7A6420]">
                        {size}
                      </span>
                      <TarshaLogo
                        variant="wordmark"
                        wordmarkStyle={id}
                        size={size}
                        theme="light"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Dark panel */}
              <div className="rounded-2xl bg-[#18130A] p-8">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-[#7A6420]">
                  Dark · on ink
                </p>
                <div className="flex flex-col gap-5">
                  {SIZES.map((size) => (
                    <div key={size} className="flex items-center gap-4">
                      <span className="w-5 shrink-0 text-[11px] font-medium text-[#4A3C10]">
                        {size}
                      </span>
                      <TarshaLogo
                        variant="wordmark"
                        wordmarkStyle={id}
                        size={size}
                        theme="dark"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* "Use this one" prompt */}
            <p className="mt-3 text-[12px] text-[#7A6420]">
              To use this style → set{" "}
              <code className="rounded bg-[#EAD870]/40 px-1 py-0.5 font-mono text-[11px] text-[#18130A]">
                wordmarkStyle="{id}"
              </code>{" "}
              in Header.tsx, Footer.tsx and PageLoader.tsx
            </p>
          </section>
        ))}
      </div>

      {/* Footer note */}
      <div className="border-t border-[#DDD8C8] px-6 py-6 text-center text-[12px] text-[#7A6420]">
        All candidate fonts are Google-hosted and already loaded via next/font in{" "}
        <code className="font-mono text-[11px]">lib/fonts.ts</code>. The live logo
        currently ships <code className="font-mono text-[11px]">robyn</code> (Space Grotesk).
      </div>
    </div>
  );
}
