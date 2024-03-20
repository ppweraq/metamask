import { Space_Mono } from "next/font/google";
import "./globals.css";

export const spaceMono = Space_Mono({ 
  weight: ['400'],
  subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceMono.className}>{children}</body>
    </html>
  );
}
