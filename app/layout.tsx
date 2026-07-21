import "./globals.css";
import { LenisProvider } from "@/components/animations/LenisProvider";
import {
  allura,
  bricolage,
  familjen,
  inter,
  manrope,
  outfit,
  jakarta,
  sora,
  spaceGrotesk,
  syne,
  unbounded,
} from "@/lib/fonts";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.robynai.co.uk"),
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
    url: "https://www.robynai.co.uk",
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
    "facebook-domain-verification": "lm62nxclo0mqw9q60rjyqpujs1b3uf",
    "google-site-verification": "X22aUIuJqtyRzvWy3kq_iRtb7h6m8bfu1rRYxxSlJ18",
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
        jakarta.variable,
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
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-40RDTY9GD6"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-40RDTY9GD6');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Robyn AI",
              url: "https://www.robynai.co.uk",
              description:
                "AI voice receptionist for small businesses, answers calls 24/7, qualifies leads, books appointments.",
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2094192784851693');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2094192784851693&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="font-sans antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
