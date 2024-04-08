import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NavigationBar from "@components/navigation-bar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
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
      <body className={`${inter.variable} ${jetBrainsMono.variable} font-inter gap-3 flex min-h-screen bg-gray-200 flex-col`}>
        <h1 className="font-bold p-5">TravelSG</h1>
        <main className="grow flex flex-col">{children}</main>
        <NavigationBar />
      </body>
    </html>
  );
}
