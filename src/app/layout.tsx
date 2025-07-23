import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { getCurrentUser } from "@/lib/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Glbiashara Solution - Connect, Trade, Grow",
  description: "A mobile-first platform connecting telecommunication subscribers, sports fans, students, professionals, and entrepreneurs in Tanzania and beyond.",
  keywords: ["Tanzania", "business", "marketplace", "sports", "education", "telecommunications"],
  authors: [{ name: "Glbiashara Solution Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jwtUser = await getCurrentUser();

  // Transform JWT payload to match component expectations
  const user = jwtUser ? {
    id: jwtUser.userId,
    firstName: undefined,
    lastName: undefined,
    avatar: undefined
  } : null;

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-neutral-50 font-sans antialiased dark:bg-neutral-900">
        <div className="flex min-h-screen flex-col">
          <Header user={user} />
          <main className="flex-1 pb-16 md:pb-0">
            {children}
          </main>
          <BottomNav user={user} />
        </div>
      </body>
    </html>
  );
}
