import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Photo Gallery - Abstract Art Collection",
  description: "A beautiful collection of 100 unique abstract artworks with pagination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
