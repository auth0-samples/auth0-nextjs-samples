import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auth0 Next.js Sample",
  description: "Learn how to integrate Auth0 with Next.js",
  icons: {
    icon: "/favicon.ico",
  }
};

// Headers have been moved to app/headers.ts file

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.auth0.com/js/auth0-samples-theme/1.0/css/auth0-theme.min.css" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <main className="container">
          {children}
        </main>
        <footer className="app-footer">
          <div className="container">
            <p>
              <span>© {new Date().getFullYear()} Auth0 Inc. All Rights Reserved.</span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
