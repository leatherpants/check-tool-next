import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Check Tool",
  description: "An assistant tool for filling duty refund blanks of Russian Federation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" >
      <body>
        {children}
      </body>
    </html>
  );
}
