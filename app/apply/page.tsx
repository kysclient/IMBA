import type { Metadata } from "next";
import ApplyClient from "./ApplyClient";

export const metadata: Metadata = {
  title: "수강 신청",
  description:
    "IMBA 국제메디컬뷰티협회 수강 신청 - 메디컬뷰티, 피부관리, 왁싱, 네일아트 등 전문 교육 과정에 지금 바로 신청하세요.",
  openGraph: {
    title: "수강 신청 | IMBA 국제메디컬뷰티협회",
    description:
      "IMBA 국제메디컬뷰티협회 수강 신청 - 메디컬뷰티, 피부관리, 왁싱, 네일아트 등 전문 교육 과정에 지금 바로 신청하세요.",
  },
};

export default function ApplyPage() {
  return <ApplyClient />;
}
