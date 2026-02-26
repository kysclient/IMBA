import type { Metadata } from "next";
import { getDb } from "@/lib/db";
import CoursesClient from "./CoursesClient";
import { CourseJsonLd, BreadcrumbJsonLd } from "../components/JsonLd";

export const metadata: Metadata = {
  title: "교육 과정",
  description:
    "IMBA 국제메디컬뷰티협회 교육 과정 - 피부관리, 왁싱, 네일아트, 스킨케어 등 전문 메디컬뷰티 교육 커리큘럼을 확인하세요.",
  openGraph: {
    title: "교육 과정 | IMBA 국제메디컬뷰티협회",
    description:
      "IMBA 국제메디컬뷰티협회 교육 과정 - 피부관리, 왁싱, 네일아트, 스킨케어 등 전문 메디컬뷰티 교육 커리큘럼을 확인하세요.",
  },
};

export const dynamic = "force-dynamic";

async function getCourses() {
  try {
    const sql = getDb();
    const items = await sql`
      SELECT id, category, title, level, duration, price, image_url, features
      FROM courses
      WHERE is_active = true
      ORDER BY display_order ASC, created_at DESC
    `;
    return items.map((c) => ({
      id: c.id,
      category: c.category,
      title: c.title,
      level: c.level,
      duration: c.duration,
      price: c.price,
      imageUrl: c.image_url,
      features: c.features,
    }));
  } catch {
    return [];
  }
}

export default async function CoursesPage() {
  const courses = await getCourses();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "홈", url: "https://www.imba.kr" },
          { name: "교육 과정", url: "https://www.imba.kr/courses" },
        ]}
      />
      {courses.map((course) => (
        <CourseJsonLd
          key={course.id}
          name={course.title}
          description={`${course.category} - ${course.level} | ${course.duration}`}
        />
      ))}
      <CoursesClient courses={courses} />
    </>
  );
}
