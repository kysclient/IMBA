import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainLayout from "./components/MainLayout";

export const metadata: Metadata = {
  title: "IMBA - 국제메디컬뷰티협회",
  description:
    "글로벌 뷰티 전문가의 새로운 여정. 국제메디컬뷰티협회와 함께 체계적인 교육과 글로벌 네트워크를 경험하십시오.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-[100dvh] flex flex-col bg-white">
        <Navbar />
        <MainLayout>{children}</MainLayout>
        <Footer />
      </body>
    </html>
  );
}
