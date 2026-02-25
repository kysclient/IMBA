import type { Metadata } from "next";
import CommunityClient from "./CommunityClient";

export const metadata: Metadata = {
  title: "커뮤니티",
  description:
    "IMBA 국제메디컬뷰티협회 커뮤니티 - 공지사항, Q&A, 수강후기 등 메디컬뷰티 전문가들의 소통 공간입니다.",
  openGraph: {
    title: "커뮤니티 | IMBA 국제메디컬뷰티협회",
    description:
      "IMBA 국제메디컬뷰티협회 커뮤니티 - 공지사항, Q&A, 수강후기 등 메디컬뷰티 전문가들의 소통 공간입니다.",
  },
};

export default function CommunityPage() {
  return <CommunityClient />;
}
