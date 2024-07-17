import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Raleway } from "next/font/google";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import CartSheet from "@/components/common/cartSheet";
import NavigationSheet from "@/components/common/navigationSheet";
import TopSearchSheet from "@/components/common/TopSearchSheet";
import AuthSheet from "@/components/common/authSheet";
import { AuthProvider } from "@/components/common/AuthWrapper";
import FilterSheet from "@/components/common/FilterSheet";
import SizeSheet from "@/components/common/sizeSheet";
import ManufacturingInfoSheet from "@/components/common/ManufacturingSheet";
import CancelSheet from "@/components/common/cancelSheet";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to Woodland. One stop for Lifestyle and Sports Wear.",
  metadataBase: new URL("https://www.woodlandworldwide.com"),
  alternates: {
    canonical: "./",
  },
  description:
    "Shop latest in Fashion, Shoes, Jackets, T-shirts, Boots and outdoor equipment",
  verification: {
    google: "hWjQv90faf7DA297xn5fgiNEkJBjjwHikQJiy9_R-60",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-K57DM7D9" />
      <ReactQueryProvider>
        <AuthProvider>
          <body className={raleway.className}>
            {children}
            <Toaster duration={1500} richColors position={"top-right"} />
            <AuthSheet />
            <TopSearchSheet />
            <NavigationSheet />
            <CartSheet />
            <FilterSheet />
            <SizeSheet />
            <CancelSheet />
            <ManufacturingInfoSheet />
          </body>
        </AuthProvider>
      </ReactQueryProvider>
    </html>
  );
}
