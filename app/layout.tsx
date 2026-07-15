import "./globals.css";
import { LenisProvider } from "@/components/animations/LenisProvider";
import { PageLoader } from "@/components/layout/PageLoader";
import {
  allura,
  bricolage,
  familjen,
  inter,
  manrope,
  outfit,
  satoshi,
  sora,
  spaceGrotesk,
  syne,
  unbounded,
} from "@/lib/fonts";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://robyn.ai"),
  icons: {
    icon: [
      { url: "/assets/favicon.ico", sizes: "any" },
      { url: "/assets/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/assets/favicon.ico",
    apple: "/apple-icon.png",
  },
  title: {
    default: "Robyn AI, AI receptionist that answers calls 24/7",
    template: "%s · Robyn AI",
  },
  description:
    "Robyn AI is the answering service that keeps your phone covered, qualifying leads, booking appointments, and handling customer calls 24/7 with a natural, human-like voice.",
  keywords: [
    "AI receptionist",
    "AI answering service",
    "Voice AI",
    "Robyn AI",
    "SMB phone service",
    "Missed call recovery",
  ],
  openGraph: {
    title: "Robyn AI, AI receptionist that answers calls 24/7",
    description:
      "Never miss another customer call. Robyn AI answers instantly, qualifies leads, and books appointments, all with a natural, human-like voice.",
    url: "https://robyn.ai",
    siteName: "Robyn AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robyn AI, AI receptionist for small businesses",
    description:
      "Never miss another customer call. Robyn AI answers instantly and books appointments 24/7.",
  },
  robots: { index: true, follow: true },
  other: {
    "facebook-domain-verification": "cli6iedfrgu6zyjc8yiea7lqcwt1v4",
    "google-site-verification": "f8VXoNgjndeoeLB5aSW4614GYoR6I22IKlO6UnUBpJ4",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFBF8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[
        inter.variable,
        satoshi.variable,
        allura.variable,
        spaceGrotesk.variable,
        sora.variable,
        manrope.variable,
        outfit.variable,
        syne.variable,
        bricolage.variable,
        unbounded.variable,
        familjen.variable,
      ].join(" ")}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Robyn AI",
              url: "https://robyn.ai",
              description:
                "AI voice receptionist for small businesses, answers calls 24/7, qualifies leads, books appointments.",
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <PageLoader />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
