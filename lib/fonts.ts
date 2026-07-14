import {
  Allura,
  Bricolage_Grotesque,
  Familjen_Grotesk,
  Inter,
  Manrope,
  Outfit,
  Plus_Jakarta_Sans,
  Sora,
  Space_Grotesk,
  Syne,
  Unbounded,
} from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Plus Jakarta Sans stands in for Satoshi — geometric, slightly humanist,
// matches the editorial feel and is Google-hosted (no font file needed).
// Swap to a self-hosted Satoshi later by replacing this import.
export const satoshi = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-satoshi",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Allura — refined signature script for the wordmark logo (single weight).
export const allura = Allura({
  subsets: ["latin"],
  variable: "--font-allura",
  display: "swap",
  weight: ["400"],
});

// ─── Wordmark candidate fonts ─────────────────────────────────────────────────
// Premium Google-hosted display faces trialled for the "Robyn AI" logo.
// Compare them live at /logo-preview, then keep the winner.

// Space Grotesk — distinctive geometric grotesque. Two-story "a", notched joins
// and a crisp straight-tailed "y" read as considered tech/AI, not a default sans.
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Sora — geometric sans designed "for a brighter digital future". Neutral,
// futuristic, unmistakably AI. The safe, clean choice.
export const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Manrope — semi-rounded modern sans. Premium SaaS feel with a touch of warmth,
// plays to Robyn's human side while staying professional.
export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Outfit — ultra-clean geometric sans with near-perfect even colour. Maximum
// legibility, minimal quirk.
export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Syne — artsy, futuristic display with unusual widths. Extremely memorable as
// a standalone mark. Higher personality, higher risk.
export const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Bricolage Grotesque — characterful editorial grotesque. Matches the warm,
// cream-and-gold aesthetic while feeling fresh and on-trend.
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Unbounded — bold geometric display. Maximum distinctiveness; heavy, best at
// large sizes. A statement wordmark.
export const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Familjen Grotesk — compact, quirky-but-clean grotesque. Premium and slightly
// unexpected without shouting.
export const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--font-familjen",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
