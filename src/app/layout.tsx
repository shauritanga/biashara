import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

  // Get full user profile data if user is authenticated
  let user = null;
  if (jwtUser) {
    try {
      const userProfile = await prisma.user.findUnique({
        where: { id: jwtUser.userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          avatar: true
        }
      });

      // Transform the user data to match the expected interface
      user = userProfile ? {
        id: userProfile.id,
        email: userProfile.email,
        firstName: userProfile.firstName || undefined,
        lastName: userProfile.lastName || undefined,
        avatar: userProfile.avatar || undefined
      } : null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Fallback to basic JWT data
      user = {
        id: jwtUser.userId,
        email: jwtUser.email,
        firstName: undefined,
        lastName: undefined,
        avatar: undefined
      };
    }
  }

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
