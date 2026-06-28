import "./globals.css";
import { Providers } from "./providers";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
