import { space_Mono } from "./Fonts";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={space_Mono.className}>{children}</body>
    </html>
  );
}
