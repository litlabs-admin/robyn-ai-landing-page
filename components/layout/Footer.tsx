"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { BrandBloom } from "@/components/ui/BrandBloom";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RobynWordmark } from "@/components/ui/RobynWordmark";
import { brand } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { ArrowUpRight, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Live demo", href: "#live-demo" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Law firms", href: "#live-demo" },
      { label: "Restaurants", href: "#live-demo" },
      { label: "Real estate", href: "#live-demo" },
      { label: "Insurance", href: "#live-demo" },
      { label: "Home services", href: "#live-demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "mailto:hello@robyn.ai" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

const socials = [
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer
      id="footer"
      className="relative isolate overflow-hidden bg-brand-blue text-white"
    >
      <BrandBloom />

      <FinalCTA />

      <Container className="relative">
        <div className="grid grid-cols-2 gap-10 border-t border-white/10 pt-16 pb-14 md:grid-cols-12 md:gap-12 md:pt-20 md:pb-16">
          {/* Brand block */}
          <div className="col-span-2 md:col-span-4">
            <ScrollReveal y={16} duration={0.7}>
              <Link
                href="#top"
                className="inline-block focus-ring rounded-md"
                aria-label={`${brand.name} home`}
              >
                <span className="flex items-center gap-2.5">
                  <Image
                    src="/assets/logo-mark.png"
                    alt=""
                    aria-hidden
                    width={96}
                    height={96}
                    className="h-12 w-auto"
                  />
                  <RobynWordmark theme="dark" size="lg" />
                </span>
              </Link>

              <p className="mt-5 max-w-[34ch] text-[14px] leading-[1.6] text-white/60">
                The AI voice receptionist that keeps your phone covered, so
                you never miss a lead or leave a customer waiting.
              </p>

              <div className="mt-7 flex items-center gap-2">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70",
                      "transition-all duration-200 hover:border-brand-yellow hover:text-brand-yellow",
                    )}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Link columns */}
          <div className="col-span-2 grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-4 md:gap-6">
            {columns.map((col, ci) => (
              <ScrollReveal key={col.title} y={14} duration={0.6} delay={0.05 * ci}>
                <div>
                  <h4 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-yellow">
                    {col.title}
                  </h4>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className={cn(
                            "group/link inline-flex items-center gap-1 text-[14px] text-white/65",
                            "transition-colors duration-200 hover:text-white",
                          )}
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight
                            className="h-3 w-3 opacity-0 -translate-x-1 transition-all duration-200 ease-out group-hover/link:opacity-60 group-hover/link:translate-x-0"
                            strokeWidth={2.2}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom legal bar */}
      <Container>
        {/* /70 rather than the /45 this carried on the old flat surface: the
            bloom is at full strength by this row, and /45 dissolves into it. */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-[12.5px] text-white/70 md:flex-row">
          <p>© {new Date().getFullYear()} <span className="text-brand-yellow font-semibold whitespace-nowrap">Robyn AI</span> · Voice AI for SMBs · All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.18)]" />
              All systems normal
            </span>
            <span className="hidden md:inline text-white/40">·</span>
            <span>Made with calls covered</span>
          </div>
        </div>
      </Container>

      {/* Oversized brand wordmark, cropped by the page edge */}
      <BrandWordmark />
    </footer>
  );
}

function FinalCTA() {
  return (
    <Container>
      <div className="relative py-12 md:py-16">
        <ScrollReveal y={20} duration={0.9}>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-[12px] tracking-[0.04em] text-white/70 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow shadow-[0_0_0_4px_rgba(255,208,0,0.28)]" />
              Ready when you are
            </span>
            <h2 className="font-display font-extrabold tracking-[-0.025em] text-white text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.05]">
              Never miss another <br className="hidden sm:block" />
              <span className="text-brand-yellow">customer call.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-[1.7] text-white/65 md:text-[18px]">
              Spin up <span className="text-brand-yellow font-semibold">Robyn AI</span> in under a day. Live phone coverage, 24/7, with a
              voice your customers will actually thank you for.
            </p>
            <div className="mt-9 flex flex-row flex-wrap items-center justify-center gap-3">
              <Button size="lg" variant="brand" icon="arrow" href={brand.bookDemoUrl}>
                Book a demo
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </Container>
  );
}

function BrandWordmark() {
  // The wordmark is sized off viewport width so it always spans edge to edge; the
  // wrapper is deliberately shorter than the glyphs so the page edge crops the
  // bottom ~45% of the letterforms.
  return (
    <div
      aria-hidden
      className="relative select-none overflow-hidden h-[calc(clamp(5rem,23vw,20rem)*0.55)]"
    >
      <span
        className={cn(
          "absolute inset-x-0 top-0 block whitespace-nowrap text-center",
          "font-display font-bold lowercase text-white/[0.22]",
          "leading-[0.8] tracking-[-0.05em]",
          "text-[clamp(5rem,23vw,20rem)]",
        )}
      >
        robyn ai
      </span>
    </div>
  );
}
