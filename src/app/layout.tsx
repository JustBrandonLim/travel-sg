import type { Metadata } from "next";
import { Inter, Josefin_Sans } from "next/font/google";
import "./globals.css";

import Header from "@components/common/header";
import SideBar from "@components/common/side-bar";
import Footer from "@components/common/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
});

export const metadata: Metadata = {
  title: "TravelSG",
  description: "TravelSG is your best companion for travelling around Singapore!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          `${inter.variable} ${josefinSans.variable} text-xs overscroll-none font-inter max-h-svh h-svh min-h-svh flex flex-col gap-3 p-3` /* dark:bg-neutral-900 */
        }>
        <Header />
        <div className="grow overflow-hidden flex gap-3">
          <SideBar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
