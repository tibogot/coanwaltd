import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import ScrollToTop from "./components/ScrollToTop";

const ppNeueMontreal = localFont({
  src: "./fonts/PP Neue Montreal-Variable.ttf",
  display: "swap",
  variable: "--font-pp-neue-montreal",
  adjustFontFallback: "Arial",
});

const ppNeueMontrealMono = localFont({
  src: "./fonts/PPNeueMontrealMono-Book.otf",
  display: "swap",
  variable: "--font-pp-neue-montreal-mono",
});

export const metadata: Metadata = {
  title: "COAN West Africa Limited | Construction & Engineering",
  description:
    "COAN West Africa Limited - A leading construction company offering integrated solutions in Civil, Electrical, and Mechanical Engineering with 34+ years of excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body
        className={`${ppNeueMontreal.variable} ${ppNeueMontrealMono.variable} antialiased`}
        >
          <SmoothScroll>
            <ScrollToTop />
            <Navbar />
            {children}
            <Footer />
          </SmoothScroll>
        </body>
      </html>
  );
}
