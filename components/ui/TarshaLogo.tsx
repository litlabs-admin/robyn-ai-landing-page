"use client";

import { cn } from "@/lib/cn";
import { RobynWordmark } from "@/components/ui/RobynWordmark";

// ─── Types ────────────────────────────────────────────────────────────────────

export type WordmarkStyle =
  | "weight-contrast"   // extrabold "tarsha" + featherweight ".ai" , versatile default
  | "uppercase-badge"   // TARSHA + yellow pill badge ".ai"          , authority/trust
  | "mono-split"        // Inter-only semibold/normal tonal split    , clean SaaS
  | "accent-letter"     // golden "t" opener                        , warm/approachable
  | "superscript-ai"    // extrabold "tarsha" + superscript ".ai"   , editorial precision
  // ── Premium serif / script styles ──────────────────────────────────────────
  | "playfair-italic"   // Playfair Display bold italic              , masthead luxury
  | "cormorant"         // Cormorant Garamond italic                 , whisper elegance
  | "serif-split"       // Playfair roman + Inter bold               , old-world meets tech
  | "cedarville"        // Cedarville Cursive + Inter bold           , handwritten warmth
  | "smith-style"       // Space Grotesk, clean geometric grotesque, inspired by Smith.ai
  | "allura"            // Allura refined signature script
  // ── "Robyn AI" wordmark candidates (compare at /logo-preview) ────────────────
  | "robyn-brodine"     // Brodine outlined SVG logotype (active logo)
  | "robyn"             // Space Grotesk    , distinctive grotesque
  | "robyn-sora"        // Sora             , clean futuristic geometric
  | "robyn-manrope"     // Manrope          , warm premium SaaS
  | "robyn-outfit"      // Outfit           , ultra-clean geometric
  | "robyn-syne"        // Syne             , artsy futuristic display
  | "robyn-bricolage"   // Bricolage Grotesque, characterful editorial
  | "robyn-unbounded"   // Unbounded        , bold statement display
  | "robyn-familjen";   // Familjen Grotesk , quirky compact grotesque

type Variant = "full" | "icon" | "wordmark";
type Size    = "sm" | "md" | "lg";
type Theme   = "light" | "dark";

interface TarshaLogoProps {
  variant?:       Variant;
  size?:          Size;
  theme?:         Theme;
  wordmarkStyle?: WordmarkStyle;
  byline?:        string;
  bylineClassName?: string;
  className?:     string;
}

interface SubProps {
  textClass: string;
  theme:     Theme;
}

// ─── Size maps ────────────────────────────────────────────────────────────────

const ICON_PX:      Record<Size, number> = { sm: 28,          md: 36,          lg: 48          };
const TEXT_CLASS:   Record<Size, string> = { sm: "text-[15px]", md: "text-[20px]", lg: "text-[27px]" };
const BYLINE_CLASS: Record<Size, string> = { sm: "text-[6px]", md: "text-[7px]", lg: "text-[8px]" };

// ─── Root component ───────────────────────────────────────────────────────────

export function TarshaLogo({
  variant       = "full",
  size          = "md",
  theme         = "light",
  wordmarkStyle = "weight-contrast",
  byline,
  bylineClassName,
  className,
}: TarshaLogoProps) {
  const mark = (
    <div className="flex items-center gap-2.5">
      {variant !== "wordmark" && <TarshaIcon size={ICON_PX[size]} />}
      {variant !== "icon" && (
        <TarshaWordmark
          textClass={TEXT_CLASS[size]}
          theme={theme}
          wordmarkStyle={wordmarkStyle}
          size={size}
        />
      )}
    </div>
  );

  if (!byline) {
    return <div className={cn("flex items-center", className)}>{mark}</div>;
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {mark}
      {/* Inline byline: thin divider + spaced uppercase caps */}
      <span className={cn("flex items-center gap-2.5", bylineClassName)}>
        <span
          aria-hidden
          className={cn(
            "h-3.5 w-px shrink-0",
            theme === "dark" ? "bg-white/20" : "bg-ink/15",
          )}
        />
        <span
          className={cn(
            "select-none font-sans font-semibold uppercase",
            BYLINE_CLASS[size],
            theme === "dark" ? "text-white/55" : "text-ink-faint",
          )}
          style={{ letterSpacing: "0.18em" }}
        >
          {byline}
        </span>
      </span>
    </div>
  );
}

// ─── Icon mark (kept for backward-compat / future use) ───────────────────────

export function TarshaIcon({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{ flexShrink: 0 }}
    >
      <rect width="40" height="40" rx="9" fill="#FFD000" />
      <rect x="7"    y="10" width="10"  height="6"  rx="1.5" fill="#18130A" />
      <rect x="17"   y="10" width="6"   height="22" rx="1.5" fill="#18130A" />
      <rect x="25.5" y="13" width="2.5" height="3"  rx="1"   fill="#18130A" />
      <rect x="29.5" y="10" width="2.5" height="6"  rx="1"   fill="#18130A" />
      <rect x="33.5" y="12" width="2.5" height="4"  rx="1"   fill="#18130A" />
    </svg>
  );
}

// ─── Wordmark dispatcher ──────────────────────────────────────────────────────

function TarshaWordmark({
  textClass,
  theme,
  wordmarkStyle,
  size,
}: SubProps & { wordmarkStyle: WordmarkStyle; size: Size }) {
  const props: SubProps = { textClass, theme };
  switch (wordmarkStyle) {
    case "robyn-brodine":    return <RobynWordmark size={size} theme={theme} />;
    case "uppercase-badge":  return <WordmarkUppercaseBadge  {...props} />;
    case "mono-split":       return <WordmarkMonoSplit        {...props} />;
    case "accent-letter":    return <WordmarkAccentLetter     {...props} />;
    case "superscript-ai":   return <WordmarkSuperscriptAi   {...props} />;
    case "playfair-italic":  return <WordmarkPlayfairItalic   {...props} />;
    case "cormorant":        return <WordmarkCormorant        {...props} />;
    case "serif-split":      return <WordmarkSerifSplit       {...props} />;
    case "cedarville":       return <WordmarkCedarville       {...props} />;
    case "smith-style":      return <WordmarkSmithStyle       {...props} />;
    case "allura":           return <WordmarkAllura           {...props} />;
    default:
      if (wordmarkStyle.startsWith("robyn")) {
        return <RobynMark {...props} tune={ROBYN_FONTS[wordmarkStyle]} />;
      }
      return <WordmarkWeightContrast {...props} />;
  }
}

// ─── Style A: weight-contrast ─────────────────────────────────────────────────
// Extrabold "tarsha" + featherweight ".ai", the weight gap creates hierarchy
// without any colour trick. Works everywhere.

function WordmarkWeightContrast({ textClass, theme }: SubProps) {
  return (
    <span className={cn("font-display leading-none select-none", textClass)}>
      <span
        className={theme === "dark" ? "text-white" : "text-ink"}
        style={{ fontWeight: 800, letterSpacing: "-0.04em" }}
      >
        tarsha
      </span>
      <span
        className={theme === "dark" ? "text-white/50" : "text-ink-faint"}
        style={{ fontWeight: 400 }}
      >
        .ai
      </span>
    </span>
  );
}

// ─── Style B: uppercase-badge ─────────────────────────────────────────────────
// "TARSHA" tracked wide + ".ai" in a compact yellow pill.
// Authority and modernity in one mark, premium trust signal for SMBs.

function WordmarkUppercaseBadge({ textClass, theme }: SubProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 leading-none select-none font-display", textClass)}
    >
      <span
        className={cn("font-bold uppercase", theme === "dark" ? "text-white" : "text-ink")}
        style={{ letterSpacing: "0.10em" }}
      >
        TARSHA
      </span>
      <span
        className="font-sans font-semibold bg-accent text-accent-ink rounded px-1"
        style={{ fontSize: "0.52em", letterSpacing: "0.06em", lineHeight: 1.5 }}
      >
        .ai
      </span>
    </span>
  );
}

// ─── Style C: mono-split ──────────────────────────────────────────────────────
// Inter (body font) only, no display typeface. Semibold "tarsha" bleeds
// into a quieter ".ai". Clinical precision, SaaS / fintech energy.

function WordmarkMonoSplit({ textClass, theme }: SubProps) {
  return (
    <span className={cn("font-sans leading-none select-none", textClass)}>
      <span
        className={theme === "dark" ? "text-white" : "text-ink"}
        style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
      >
        tarsha
      </span>
      <span
        className={theme === "dark" ? "text-white/55" : "text-ink-muted"}
        style={{ fontWeight: 400, fontSize: "0.85em", letterSpacing: "-0.01em" }}
      >
        .ai
      </span>
    </span>
  );
}

// ─── Style D: accent-letter ───────────────────────────────────────────────────
// The opening "t" glows in brand gold. Personality-first, warm and approachable
// for SMBs in hospitality, real estate, professional services.
// On light bg: darkened gold (#C09800) clears 3:1 contrast against cream.
// On dark bg: full accent yellow (#FFD000) pops perfectly.

function WordmarkAccentLetter({ textClass, theme }: SubProps) {
  const tColor  = theme === "dark" ? "#FFD000" : "#C09800";
  const aiColor = theme === "dark" ? "rgba(255,255,255,0.55)" : "var(--ink-muted)";

  return (
    <span
      className={cn("font-display font-bold leading-none select-none", textClass)}
      style={{ letterSpacing: "-0.03em" }}
    >
      <span style={{ color: tColor }}>t</span>
      <span className={theme === "dark" ? "text-white" : "text-ink"}>arsha</span>
      <span style={{ color: aiColor }}>.ai</span>
    </span>
  );
}

// ─── Style E: superscript-ai ──────────────────────────────────────────────────
// ".ai" floats as a superscript qualifier, editorial luxury borrowed from
// academic and heritage typesetting. Resonates with law, finance, insurance.

function WordmarkSuperscriptAi({ textClass, theme }: SubProps) {
  return (
    <span className={cn("font-display leading-none select-none", textClass)}>
      <span
        className={theme === "dark" ? "text-white" : "text-ink"}
        style={{ fontWeight: 800, letterSpacing: "-0.04em" }}
      >
        tarsha
      </span>
      <span
        className={theme === "dark" ? "text-white/50" : "text-ink-faint"}
        style={{
          fontWeight:    500,
          fontSize:      "0.45em",
          verticalAlign: "super",
          letterSpacing: "0.02em",
        }}
      >
        .ai
      </span>
    </span>
  );
}

// ─── Style F: playfair-italic ─────────────────────────────────────────────────
// "tarsha" in Playfair Display bold italic, sweeping ink-stroke curves give the
// wordmark a magazine-masthead authority. ".ai" steps back in light Inter roman
// so the contrast is extreme: lush italic vs. neutral sans. Smooth and premium.

function WordmarkPlayfairItalic({ textClass, theme }: SubProps) {
  return (
    <span className={cn("leading-none select-none", textClass)}>
      <span
        className={cn("font-playfair", theme === "dark" ? "text-white" : "text-ink")}
        style={{ fontWeight: 700, fontStyle: "italic", letterSpacing: "-0.02em" }}
      >
        tarsha
      </span>
      <span
        className={cn("font-sans", theme === "dark" ? "text-white/45" : "text-ink-faint")}
        style={{ fontWeight: 300, fontSize: "0.78em", letterSpacing: "0.04em" }}
      >
        .ai
      </span>
    </span>
  );
}

// ─── Style G: cormorant ───────────────────────────────────────────────────────
// Cormorant Garamond italic throughout, gossamer strokes and generous kerns
// give "tarsha" a calligraphic grace without being an actual script. ".ai" in
// light roman creates a soft counterpoint. Luxury without effort.

function WordmarkCormorant({ textClass, theme }: SubProps) {
  return (
    <span className={cn("leading-none select-none font-cormorant", textClass)}>
      <span
        className={theme === "dark" ? "text-white" : "text-ink"}
        style={{ fontWeight: 500, fontStyle: "italic", letterSpacing: "-0.01em" }}
      >
        tarsha
      </span>
      <span
        className={theme === "dark" ? "text-white/50" : "text-ink-faint"}
        style={{ fontWeight: 300, fontStyle: "normal", fontSize: "0.82em", letterSpacing: "0.08em" }}
      >
        .ai
      </span>
    </span>
  );
}

// ─── Style H: serif-split ─────────────────────────────────────────────────────
// "tarsha" in Playfair Display upright roman, classical stroke contrast grounds
// the name. Then ".ai" jumps hard into Inter bold with a golden dot as the
// separator. Old-world craft meets precision tech. Subtle yet unmistakable.

function WordmarkSerifSplit({ textClass, theme }: SubProps) {
  const dotColor = theme === "dark" ? "#FFD000" : "#B89800";
  const aiColor  = theme === "dark" ? "rgba(255,255,255,1)" : "var(--ink)";
  return (
    <span className={cn("leading-none select-none", textClass)}>
      <span
        className={cn("font-playfair", theme === "dark" ? "text-white" : "text-ink")}
        style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
      >
        tarsha
      </span>
      <span style={{ color: dotColor, fontWeight: 700 }}>.</span>
      <span
        className="font-sans"
        style={{ fontWeight: 700, letterSpacing: "-0.03em", fontSize: "0.9em", color: aiColor }}
      >
        ai
      </span>
    </span>
  );
}

// ─── Style I: cedarville ──────────────────────────────────────────────────────
// Cedarville Cursive (weight 400, the only available weight) for "tarsha" ,
// a genuine flowing handwritten script with ink-pen warmth. Because the cursive
// naturally renders slightly smaller optically, we nudge the font-size up 15%.
// The yellow dot + Inter bold "ai" snaps the warmth of the handwriting back to
// the brand's tech identity. On the yellow/cream theme this pairing is
// particularly strong: the organic script on the warm cream background feels
// natural and premium, while the dot echoes the #FFD000 accent throughout.

function WordmarkCedarville({ textClass, theme }: SubProps) {
  // Cedarville Cursive has no bold, use letter-spacing and the tight ".ai"
  // pairing to create visual weight balance rather than font-weight.
  const dotColor = theme === "dark" ? "#FFD000" : "#B89800";
  const aiColor  = theme === "dark" ? "rgba(255,255,255,0.95)" : "var(--ink)";

  return (
    <span
      className={cn("leading-none select-none inline-flex items-baseline gap-[2px]", textClass)}
    >
      {/* Flowing cursive name, nudged up so it optically matches other styles */}
      <span
        className={cn("font-cedarville", theme === "dark" ? "text-white" : "text-ink")}
        style={{ fontSize: "1.15em", letterSpacing: "0.01em" }}
      >
        tarsha
      </span>

      {/* Branded yellow dot, the bridge between handwritten and digital */}
      <svg
        aria-hidden="true"
        style={{
          width:         "0.28em",
          height:        "0.28em",
          marginBottom:  "0.12em",
          flexShrink:    0,
        }}
        viewBox="0 0 10 10"
      >
        <circle cx="5" cy="5" r="5" fill={dotColor} />
      </svg>

      {/* Inter bold "ai", snaps back to precision / tech identity */}
      <span
        className="font-sans"
        style={{ fontWeight: 700, fontSize: "0.82em", letterSpacing: "-0.025em", color: aiColor }}
      >
        ai
      </span>
    </span>
  );
}

// ─── Style J: smith-style ─────────────────────────────────────────────────────
// Inspired by Smith.ai's clean, premium wordmark aesthetic.
// Space Grotesk at weight 500 has slightly unusual letterforms, a two-story
// "a", a rounded "r" terminal, notched joins, that make it feel distinctive
// without being decorative. Unlike Inter or Plus Jakarta Sans, it reads as a
// considered, premium type choice rather than a default.
//
// Key decisions:
//  • "tarsha" weight 500 (medium), authoritative but not aggressive
//  • letter-spacing -0.022em, tighter than the default, feels crafted
//  • yellow SVG dot as period, consistent brand micro-detail
//  • "ai" weight 400, slightly smaller (0.88em), recedes gracefully
//  • No extra colour split, one ink, one dot. The restraint IS the premium.
//
// On the yellow/cream theme: the pure dark ink on warm cream with the single
// golden dot is the cleanest, most Smith.ai-level combination in the set.

function WordmarkSmithStyle({ textClass, theme }: SubProps) {
  const dotColor  = theme === "dark" ? "#FFD000" : "#B89800";
  const nameColor = theme === "dark" ? "rgba(255,255,255,1)"    : "var(--ink)";
  const aiColor   = theme === "dark" ? "rgba(255,255,255,0.75)" : "var(--ink-muted)";

  return (
    <span
      className={cn("leading-none select-none inline-flex items-baseline", textClass)}
    >
      {/* "tarsha", Space Grotesk medium, distinctive yet refined */}
      <span
        className="font-space-grotesk"
        style={{ fontWeight: 500, letterSpacing: "-0.022em", color: nameColor }}
      >
        tarsha
      </span>

      {/* Brand-yellow dot, the only colour accent, keeps it clean */}
      <svg
        aria-hidden="true"
        style={{ width: "0.28em", height: "0.28em", marginBottom: "0.1em", flexShrink: 0, marginLeft: "1px" }}
        viewBox="0 0 10 10"
      >
        <circle cx="5" cy="5" r="5" fill={dotColor} />
      </svg>

      {/* "ai", same face, lighter weight, slightly smaller */}
      <span
        className="font-space-grotesk"
        style={{ fontWeight: 400, fontSize: "0.88em", letterSpacing: "-0.015em", color: aiColor }}
      >
        ai
      </span>
    </span>
  );
}

// ─── Style K: allura ─────────────────────────────────────────────────────────
// Refined signature script wordmark. Allura (single weight) is elegant and
// graceful; rendered larger so it stays clearly visible despite its delicate
// strokes. Colour: brand dark ink (#18130A) on light, white on dark.

function WordmarkAllura({ textClass, theme }: SubProps) {
  const scriptColor = theme === "dark" ? "#FFFFFF" : "#18130A";

  return (
    <span
      className={cn("leading-none select-none font-allura", textClass)}
      style={{
        fontWeight:       700,     // synthetic bold, Allura ships a single thin weight
        fontSize:         "1.5em", // optical-size correction, Allura reads small
        letterSpacing:    "0.01em",
        color:            scriptColor,
        WebkitTextStroke: `0.3px ${scriptColor}`, // thicken strokes -> bolder + darker
        paintOrder:       "stroke fill",
      }}
    >
      Tarsha.ai
    </span>
  );
}

// ─── "Robyn AI" wordmark ──────────────────────────────────────────────────────
// A single treatment applied across a set of premium display faces so the
// comparison at /logo-preview is purely about the typeface.
//
// Restraint keeps it premium: "Robyn" in a bold ink/white core, "AI" set as a
// lighter, smaller tracked qualifier that recedes gracefully. One ink, no colour
// trick — the letterforms do the work, strong enough to stand alone with no icon.

interface RobynTune {
  fontClass:    string;  // Tailwind font-family utility for this face
  nameWeight:   number;  // weight of "Robyn"
  aiWeight:     number;  // weight of "AI"
  nameTracking: string;  // letter-spacing on "Robyn"
  aiSize:       string;  // font-size of "AI" relative to the name (em)
  aiTracking:   string;  // letter-spacing on "AI"
  aiGap:        string;  // space before "AI" (em)
  uniform?:     boolean; // render "AI" identically to "Robyn" (one solid wordmark)
}

// Per-face tuning — heavier/wider faces (Unbounded, Syne) get lighter weights
// and smaller "AI" so every candidate reads with the same optical balance.
const ROBYN_FONTS: Record<string, RobynTune> = {
  "robyn":           { fontClass: "font-space-grotesk", nameWeight: 700, aiWeight: 700, nameTracking: "-0.03em", aiSize: "1em",    aiTracking: "-0.03em", aiGap: "0.28em", uniform: true },
  "robyn-sora":      { fontClass: "font-sora",          nameWeight: 700, aiWeight: 500, nameTracking: "-0.02em", aiSize: "0.60em", aiTracking: "0.08em",  aiGap: "0.44em" },
  "robyn-manrope":   { fontClass: "font-manrope",       nameWeight: 800, aiWeight: 600, nameTracking: "-0.03em", aiSize: "0.60em", aiTracking: "0.10em",  aiGap: "0.44em" },
  "robyn-outfit":    { fontClass: "font-outfit",        nameWeight: 700, aiWeight: 500, nameTracking: "-0.02em", aiSize: "0.60em", aiTracking: "0.10em",  aiGap: "0.44em" },
  "robyn-syne":      { fontClass: "font-syne",          nameWeight: 700, aiWeight: 600, nameTracking: "-0.01em", aiSize: "0.55em", aiTracking: "0.06em",  aiGap: "0.40em" },
  "robyn-bricolage": { fontClass: "font-bricolage",     nameWeight: 700, aiWeight: 500, nameTracking: "-0.02em", aiSize: "0.60em", aiTracking: "0.08em",  aiGap: "0.42em" },
  "robyn-unbounded": { fontClass: "font-unbounded",     nameWeight: 600, aiWeight: 400, nameTracking: "-0.02em", aiSize: "0.50em", aiTracking: "0.04em",  aiGap: "0.46em" },
  "robyn-familjen":  { fontClass: "font-familjen",      nameWeight: 700, aiWeight: 500, nameTracking: "-0.02em", aiSize: "0.60em", aiTracking: "0.09em",  aiGap: "0.42em" },
};

function RobynMark({ textClass, theme, tune }: SubProps & { tune: RobynTune }) {
  const t         = tune ?? ROBYN_FONTS["robyn"];
  const nameColor = theme === "dark" ? "rgba(255,255,255,1)"   : "var(--ink)";
  const aiColor   = theme === "dark" ? "rgba(255,255,255,0.6)" : "var(--ink-muted)";

  // Uniform: "Robyn AI" as one solid wordmark, "AI" set exactly like "Robyn".
  if (t.uniform) {
    return (
      <span
        className={cn(t.fontClass, "leading-none select-none", textClass)}
        style={{ fontWeight: t.nameWeight, letterSpacing: t.nameTracking, color: nameColor }}
      >
        Robyn&nbsp;AI
      </span>
    );
  }

  return (
    <span
      className={cn(t.fontClass, "leading-none select-none inline-flex items-baseline", textClass)}
    >
      {/* "Robyn" — bold, the distinctive core of the wordmark */}
      <span style={{ fontWeight: t.nameWeight, letterSpacing: t.nameTracking, color: nameColor }}>
        Robyn
      </span>

      {/* "AI" — lighter, smaller, tracked qualifier that recedes gracefully */}
      <span
        style={{
          fontWeight:    t.aiWeight,
          fontSize:      t.aiSize,
          letterSpacing: t.aiTracking,
          color:         aiColor,
          marginLeft:    t.aiGap,
        }}
      >
        AI
      </span>
    </span>
  );
}
