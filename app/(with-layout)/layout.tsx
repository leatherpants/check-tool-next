import NavItem from "@/app/ui/layout/NavItem";

export default function Layout({ children }: { children: React.ReactNode }) {
  const navArr = ['checks', 'companies', 'print'];

  return (
    <div className="lg:flex items-stretch min-h-screen">
      <header className="bg-primary-500">
        <h1 className="text-2xl text-nowrap py-5 text-center text-primary-50 border-b-primary-50 border-b-2
            lg:px-5
            ">Check Tool</h1>
        <nav className="fixed w-full flex justify-evenly items-center bottom-0 py-3 bg-primary-100 
            lg:static lg:flex-col lg:space-y-5 lg:bg-primary-500 lg:items-stretch
            ">
          {navArr.map(category => <NavItem key={category} category={category} />)}
        </nav>
      </header>
      <main className="mx-auto mb-24 lg:mb-5">
        {children}
      </main>
    </div>
  );
}