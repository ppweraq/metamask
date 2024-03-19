import { Roboto } from "next/font/google";
import "./globals.css";

export const roboto = Roboto({ 
  weight: ['400'],
  subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
