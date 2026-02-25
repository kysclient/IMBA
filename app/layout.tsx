import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainLayout from "./components/MainLayout";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://imba.kr"),
  title: {
    template: "%s | IMBA 국제메디컬뷰티협회",
    default: "IMBA 국제메디컬뷰티협회 | 메디컬 뷰티 교육의 글로벌 스탠다드",
  },
  description:
    "IMBA 국제메디컬뷰티협회 - 메디컬뷰티, 피부관리, 왁싱, 네일아트, 스킨케어 전문 교육과 글로벌 자격 인증. 체계적인 커리큘럼과 취업·창업 지원.",
  keywords: [
    "메디컬뷰티",
    "피부관리",
    "왁싱교육",
    "네일아트",
    "스킨케어",
    "뷰티자격증",
    "뷰티교육",
    "메디컬에스테틱",
    "국제자격증",
    "IMBA",
    "국제메디컬뷰티협회",
    "뷰티아카데미",
  ],
  authors: [{ name: "IMBA 국제메디컬뷰티협회" }],
  creator: "IMBA 국제메디컬뷰티협회",
  publisher: "IMBA 국제메디컬뷰티협회",
  openGraph: {
    siteName: "IMBA 국제메디컬뷰티협회",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/main_logo_v2.png",
        width: 1200,
        height: 630,
        alt: "IMBA 국제메디컬뷰티협회",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    other: {
      "naver-site-verification": ["YOUR_NAVER_VERIFICATION_CODE"],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-[100dvh] flex flex-col bg-white">
        <Providers>
          <Navbar />
          <MainLayout>{children}</MainLayout>
          <Footer />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "IMBA 국제메디컬뷰티협회",
              url: "https://imba.kr",
              logo: "https://imba.kr/main_logo_v2.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+82-2-1234-5678",
                contactType: "customer service",
                availableLanguage: ["Korean"],
              },
              sameAs: [],
            }),
          }}
        />
      </body>
    </html>
  );
}
