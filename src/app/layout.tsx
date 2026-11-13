import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Blade - Dev Super Toolbox",
  description: "Your one stop developer toolbox",
  icons: {
    icon: [
      { url: "/blade.png", sizes: "32x32", type: "image/png" },
      { url: "/blade.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/blade.png",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/blade.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
