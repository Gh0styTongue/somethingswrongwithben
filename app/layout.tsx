import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Something's Wrong With Ben | PRIMATE Movie",
  description: "Something is wrong with Ben. Input your name to help him communicate in this official interactive experience for the film PRIMATE. Only in theatres January 9.",
  keywords: ["Primate Movie", "Somethings Wrong With Ben", "Paramount Pictures", "Interactive Movie Experience", "Ben the Chimp", "January 9 release"],
  openGraph: {
    title: "Something's Wrong With Ben | PRIMATE Movie",
    description: "Something is wrong with Ben. Help him communicate. Only in theatres January 9.",
    url: "https://somethingswrongwithben.vercel.app/",
    siteName: "Something's Wrong With Ben",
    images: [
      {
        url: "/images/video_thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Something's Wrong With Ben",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Something's Wrong With Ben | PRIMATE Movie",
    description: "Something is wrong with Ben. Help him communicate. Only in theatres January 9.",
    images: ["/images/video_thumbnail.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}