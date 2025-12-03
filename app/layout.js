// app/layout.js
"use client";

import { usePathname } from "next/navigation";
import Header from '@/components/Header/Headers';
import AppContext from '../utils/context';
import Footer from '@/components/Footer/Footer';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin"); // admin route check

  return (
    <html lang="en">
      <body> 
        <AppContext>
          {!isAdmin && <Header />}
          {children}
          {!isAdmin && <Footer />}
        </AppContext>
      </body>
    </html>
  );
}
