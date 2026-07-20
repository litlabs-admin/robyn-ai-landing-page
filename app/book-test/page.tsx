"use client";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Cal, { getCalApi } from "@calcom/embed-react";
import { CalendarClock, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const CAL_LINK = "vandan-mandloi/30min";
const CAL_NAMESPACE = "robyn-book-test";

// Mirrors the palette in globals.css so the embedded booker reads as part of
// the site rather than a third-party iframe. Cal.com's own light theme uses
// these as its --cal-brand-* CSS vars; keep in step with the brand tokens by
// hand since those are hardcoded hex, not a shared source of truth.
const CAL_UI_CONFIG = {
  theme: "light" as const,
  hideEventTypeDetails: false,
  layout: "month_view" as const,
  cssVarsPerTheme: {
    light: {
      "cal-brand": "#001A78",
      "cal-brand-emphasis": "#000f47",
      "cal-brand-text": "#FFFFFF",
    },
    dark: {
      "cal-brand": "#1EC3FF",
      "cal-brand-emphasis": "#0aa8e6",
      "cal-brand-text": "#001A78",
    },
  },
};

export default function BookTestPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const hasRedirected = useRef(false);

  useEffect(() => {
    let cancelled = false;

    (async function initCalEmbed() {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (cancelled) return;

      cal("ui", CAL_UI_CONFIG);

      cal("on", {
        action: "linkReady",
        callback: () => {
          if (!cancelled) setIsReady(true);
        },
      });

      // The officially recommended success event (bookingSuccessful is
      // deprecated) — it hands back a small, documented payload instead of an
      // untyped `booking` blob, so no guesswork is needed to read the slot.
      cal("on", {
        action: "bookingSuccessfulV2",
        callback: (event) => {
          if (hasRedirected.current) return;
          hasRedirected.current = true;

          const { startTime, videoCallUrl } = event.detail.data;
          const params = new URLSearchParams();
          if (startTime) params.set("startTime", startTime);
          if (videoCallUrl) params.set("location", videoCallUrl);

          const query = params.toString();
          router.push(`/thank-you${query ? `?${query}` : ""}`);
        },
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg pt-[84px]">
        <section className="relative overflow-hidden py-16 md:py-20">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-accent/16 blur-[100px]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl px-6 text-center">
            <ScrollReveal y={14} amount={0.4} once>
              <Eyebrow asPill icon={<CalendarClock className="h-3 w-3" />}>
                Live booking preview
              </Eyebrow>
              <h1 className="mt-5 font-display text-[2rem] font-extrabold leading-tight text-ink md:text-[2.75rem]">
                Test the full scheduling flow
              </h1>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-muted">
                Pick a time on the calendar below to try the complete booking
                experience. Once confirmed, you&apos;ll be taken straight to your
                confirmation page.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-ink-muted">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-ink-faint" strokeWidth={2} />
                  No commitment required
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-ink-faint" strokeWidth={2} />
                  Instant confirmation
                </span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="px-6 pb-24 md:pb-32">
          <ScrollReveal y={20} amount={0.15} once>
            <div className="mx-auto max-w-3xl">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(17,17,17,0.04),0_24px_60px_-28px_rgba(0,26,120,0.22)]">
                {!isReady && (
                  <div
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-surface"
                    role="status"
                    aria-live="polite"
                  >
                    <span className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-brand-blue" />
                    <p className="text-[13px] text-ink-muted">Loading calendar…</p>
                  </div>
                )}
                <div className="h-[760px] w-full md:h-[680px]">
                  <Cal
                    namespace={CAL_NAMESPACE}
                    calLink={CAL_LINK}
                    style={{ width: "100%", height: "100%", overflow: "scroll" }}
                    config={{ layout: "month_view", theme: "light" }}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
