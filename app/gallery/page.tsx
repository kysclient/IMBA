import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "갤러리",
  description:
    "IMBA 국제메디컬뷰티협회 갤러리 - 교육활동, 협회행사, 미용대회 등 열정 넘치는 활동 현장을 만나보세요.",
  openGraph: {
    title: "갤러리 | IMBA 국제메디컬뷰티협회",
    description:
      "IMBA 국제메디컬뷰티협회 갤러리 - 교육활동, 협회행사, 미용대회 등 열정 넘치는 활동 현장을 만나보세요.",
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
