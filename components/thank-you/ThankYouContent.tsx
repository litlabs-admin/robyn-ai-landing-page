"use client";

import { Button } from "@/components/ui/Button";
import { Calendar, Check, Clock } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

function formatBooking(startTimeParam: string | null) {
  if (!startTimeParam) return null;
  const date = new Date(startTimeParam);
  if (Number.isNaN(date.getTime())) return null;

  return {
    dateStr: new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date),
    // timeZoneName renders in the visitor's own local timezone, so the
    // abbreviation shown always matches whoever is looking at the page.
    timeStr: new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(date),
  };
}

export function ThankYouContent() {
  const reducedMotion = useReducedMotion();
  const searchParams = useSearchParams();

  // Formatting startTime uses the visitor's local timezone, which the server
  // can't know in advance — computing it only after mount keeps the SSR pass
  // and first client render identical, so React never hits a hydration
  // mismatch on this text.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const booking = mounted ? formatBooking(searchParams.get("startTime")) : null;
  const rawLocation = searchParams.get("location");
  const meetingLink = rawLocation && /^https?:\/\//i.test(rawLocation) ? rawLocation : null;

  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.1,
        delayChildren: reducedMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: REVEAL_EASE },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: REVEAL_EASE },
    },
  };

  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-blue px-6 py-20 md:py-28">
      <HeroBackdrop />

      {/* Conversion tracking pixel — drop a next/script snippet here once IDs
          are available, e.g.:
          <Script id="conversion-pixel" strategy="afterInteractive">
            {`gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXX/XXXXXXXXXXXXXXXXXXXX' })`}
          </Script> */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative flex w-full max-w-lg flex-col items-center text-center"
      >
        <motion.div
          variants={badgeVariants}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-yellow"
          aria-hidden
        >
          <Check className="h-7 w-7 text-brand-black" strokeWidth={2.5} />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mt-8 font-display text-[1.75rem] font-extrabold leading-tight text-white md:text-[2.25rem]"
        >
          Thank you for booking your call. We can&apos;t wait to meet you!
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-balance text-[16px] leading-[1.6] text-white/85"
        >
          We&apos;ll walk you through how Robyn keeps your phone covered around the
          clock, answering every call, qualifying leads, and booking appointments so
          you never miss another customer.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10 flex flex-col items-center gap-4">
          {booking ? (
            <>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2.5">
                  <Calendar className="h-[18px] w-[18px] shrink-0 text-brand-yellow" strokeWidth={2} />
                  <span className="text-[15px] text-white">{booking.dateStr}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="h-[18px] w-[18px] shrink-0 text-brand-yellow" strokeWidth={2} />
                  <span className="text-[15px] text-white">{booking.timeStr}</span>
                </div>
              </div>

              {meetingLink ? (
                <Button variant="brand" size="lg" icon="arrow" href={meetingLink} className="mt-2">
                  Join the call
                </Button>
              ) : (
                <p className="text-[13px] text-white/70">
                  We&apos;ve emailed you the meeting link.
                </p>
              )}
            </>
          ) : (
            <p className="text-[15px] text-white/70">
              We&apos;ve emailed you the exact date, time, and meeting link for your call.
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10">
          <Button variant="outline-light" size="md" href="/">
            Back to homepage
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
}

// Same navy-to-bloom treatment as the homepage Hero, so the confirmation page
// reads as a continuation of it rather than a different surface.
function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage: [
          "radial-gradient(ellipse 75% 45% at 50% 104%, rgba(30,195,255,0.85) 0%, rgba(30,150,255,0.45) 45%, rgba(30,150,255,0) 75%)",
          "linear-gradient(to top, rgba(23,120,240,0.95) 0%, rgba(18,80,205,0.55) 22%, rgba(10,50,165,0.22) 42%, rgba(0,26,120,0) 62%)",
        ].join(", "),
      }}
    />
  );
}
