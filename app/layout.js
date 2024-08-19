"use client";
import React from "react";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { useRouter, usePathname } from "next/navigation";
import SessionValidator from "./sessionValidator";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/signup") {
    return (
      <html lang="en">
        <body className={outfit.className}>
          <SessionValidator>
            <div className="md:px-20">{children}</div>
          </SessionValidator>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={outfit.className}>
        <SessionValidator>
          <div className="md:px-20">
            <Header />
            {children}
          </div>
          <Footer />
        </SessionValidator>
      </body>
    </html>
  );
}
