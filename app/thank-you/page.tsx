import { ThankYouContent } from "@/components/thank-you/ThankYouContent";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Thanks for booking your call",
  description: "Your call with Robyn AI is booked. We can't wait to meet you.",
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouContent />
    </Suspense>
  );
}
