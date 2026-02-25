import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { BreadcrumbJsonLd } from "../components/JsonLd";

export const metadata: Metadata = {
  title: "협회 소개",
  description:
    "IMBA 국제메디컬뷰티협회 소개 - 메디컬 뷰티 산업의 전문성 강화와 글로벌 네트워크 구축을 선도하는 최고의 전문 기관입니다.",
  openGraph: {
    title: "협회 소개 | IMBA 국제메디컬뷰티협회",
    description:
      "IMBA 국제메디컬뷰티협회 소개 - 메디컬 뷰티 산업의 전문성 강화와 글로벌 네트워크 구축을 선도하는 최고의 전문 기관입니다.",
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "https://imba.kr" },
          { name: "협회 소개", url: "https://imba.kr/about" },
        ]}
      />
      <AboutClient />
    </>
  );
}
