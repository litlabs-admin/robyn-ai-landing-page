import { ProblemVsSolution } from "@/components/sections/ProblemVsSolution";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Illustration preview — comparison",
  robots: { index: false, follow: false },
};

/**
 * Dev/preview route for watching the two comparison illustrations loop in
 * isolation. Not linked from anywhere and excluded from indexing.
 * Visit: /preview/comparison
 */
export default function ComparisonPreviewPage() {
  return (
    <main className="min-h-screen bg-bg">
      <ProblemVsSolution />
    </main>
  );
}
