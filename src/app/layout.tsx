import type { Metadata } from "next";
import { Inter, Lora, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Microbes Beyond Earth | Research Archive",
  description: "Understanding how space changes the biology of life, focusing on Salmonella in space.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} ${caveat.variable}`}>
      <body className="antialiased min-h-screen selection:bg-accent-blue/20 overflow-x-hidden">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 px-4 py-2 backdrop-blur-md bg-paper/90 border-b border-graphite/10 font-sans text-[10px] md:text-xs tracking-widest uppercase flex justify-between items-center text-charcoal shadow-sm transition-all duration-300">
          <div className="flex items-center gap-2">
            <a href="/" className="font-bold text-graphite p-2 -ml-2 block min-w-[44px] hover:text-accent-blue transition-colors duration-300">MBE Archive</a>
          </div>
          <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar items-center pr-2">
            <a href="/#earth-vs-space" className="hover:text-graphite transition-colors whitespace-nowrap py-3 block min-h-[44px] link-underline">Earth vs Space</a>
            <a href="/#salmonella" className="hover:text-graphite transition-colors whitespace-nowrap py-3 block min-h-[44px] link-underline">Salmonella</a>
            <a href="/#research-shelf" className="hover:text-graphite transition-colors whitespace-nowrap py-3 block min-h-[44px] link-underline">Archive</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
