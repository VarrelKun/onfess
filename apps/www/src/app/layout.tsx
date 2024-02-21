import { ThemeProvider } from "@/components/theme";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Tulis dan temukan menfess anonim untuk orang di sekitar-mu",
    template: "%s | OnFess",
  },
  description:
    "Jangan biarkan pesanmu terbaca oleh orang yang tidak seharusnya 🤫",
  openGraph: {
    title: "Tulis dan temukan menfess anonim untuk orang di sekitar-mu",
    description:
      "Jangan biarkan pesanmu terbaca oleh orang yang tidak seharusnya 🤫",
    type: "website",
    images: ["/assets/images/og.png"],
  },
  twitter: {
    title: "Tulis dan temukan menfess anonim untuk orang di sekitar-mu",
    description:
      "Jangan biarkan pesanmu terbaca oleh orang yang tidak seharusnya 🤫",
  },
  metadataBase: new URL("https://onfess.online"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(font.className, "bg-slate-100")}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <NextTopLoader showSpinner={false} color="#1e9cf1" />
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
