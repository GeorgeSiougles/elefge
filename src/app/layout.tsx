import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import UserNameProvider from "@/store/UserNameContextProvider";

const routingOptions = [
  {
    href: "/create",
    label: "Create Group",
  },
  {
    href: "/browse",
    label: "Browse Groups",
  },
];

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ELEFGE",
  description: "Lets help you find that group!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-teal-600`}>
        <UserNameProvider>
          <Navbar items={routingOptions} />
          {children}
        </UserNameProvider>
      </body>
    </html>
  );
}
