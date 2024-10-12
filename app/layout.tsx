import type { Metadata } from "next";
import "./globals.css";
import NavItem from "./ui/layout/NavItem";

export const metadata: Metadata = {
  title: "Check Tool",
  description: "An assistant tool for filling duty refund blanks of Russian Federation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const navArr = ['checks', 'companies'];

  return (
    <html lang="en" >
      <body>
        <div className="lg:flex">
          <header className="bg-primary-500 lg:h-dvh">
            <h1 className="text-2xl text-nowrap py-5 text-center text-primary-50 border-b-primary-50 border-b-2
            lg:px-5
            ">Check Tool</h1>
            <nav className="fixed w-full flex justify-evenly items-center bottom-0 py-3 bg-primary-100 
            lg:static lg:flex-col lg:space-y-5 lg:bg-primary-500 lg:items-stretch
            ">
              {navArr.map(category => <NavItem key={category} category={category} />)}
            </nav>
          </header>
          <main className="mx-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
