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
  description: "A sample application showing Auth0 integration with Next.js",
};

// Headers have been moved to app/headers.ts file

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <main>
          {children}
        </main>
        <footer className="app-footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Auth0 Next.js Sample</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
