import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export const metadata: Metadata = {
  title: "Nike",
  description: "An e-commerce platform for nike shoes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Navbar/>
        {children}
        <Footer/>

      </body>
      
    </html>
  );
}