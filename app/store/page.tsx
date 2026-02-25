import type { Metadata } from "next";
import StoreClient from "./StoreClient";

export const metadata: Metadata = {
  title: "스토어",
  description:
    "IMBA 국제메디컬뷰티협회 스토어 - 전문가용 스킨케어, 왁싱 재료, 네일아트 기기 등 엄선된 뷰티 제품을 만나보세요.",
  openGraph: {
    title: "스토어 | IMBA 국제메디컬뷰티협회",
    description:
      "IMBA 국제메디컬뷰티협회 스토어 - 전문가용 스킨케어, 왁싱 재료, 네일아트 기기 등 엄선된 뷰티 제품을 만나보세요.",
  },
};

export default function StorePage() {
  return <StoreClient />;
}
