import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import HeadMeta from "./components/layout/HeadMeta";
import Footer from "./components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Home - Panacea",
  description:
    "DISEASE PREVENTION STARTS WITH YOU. Discover your disease risks. Make preventative healthcare a reality.",
  openGraph: {
    type: "website",
    url: "https://seekpanacea.com/",
    title: "Home - Panacea",
    description: "DISEASE PREVENTION STARTS WITH YOU...",
    images: [
      "https://seekpanacea.com/wp-content/uploads/2023/03/panacea-main.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} ${montserrat.variable}`}>
      <head>
        <HeadMeta />
      </head>
      <body className="min-h-screen bg-black text-gray-900">
        <Header />
        <main id="content" className="neve-main pt-32">
          {children}
        </main>
      </body>
    </html>
  );
}
