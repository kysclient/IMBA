"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Award,
  Users,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative w-full bg-white overflow-hidden pt-24 pb-20 lg:pt-36 lg:pb-32 flex flex-col items-center justify-center text-center">
        {/* Animated gradient mesh blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Primary blue blob */}
          <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#4285f4] opacity-[0.08] blur-[100px] animate-blob-drift" />
          {/* Red accent blob */}
          <div className="absolute top-[20%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#ea4335] opacity-[0.06] blur-[120px] animate-blob-drift-reverse" />
          {/* Yellow accent blob */}
          <div className="absolute bottom-[0%] left-[30%] w-[550px] h-[550px] rounded-full bg-[#fbbc04] opacity-[0.07] blur-[100px] animate-blob-drift-slow" />
          {/* Green accent blob */}
          <div className="absolute top-[50%] right-[25%] w-[400px] h-[400px] rounded-full bg-[#34a853] opacity-[0.05] blur-[100px] animate-blob-drift" style={{ animationDelay: "-7s" }} />
          {/* Subtle teal highlight */}
          <div className="absolute top-[10%] left-[50%] w-[300px] h-[300px] rounded-full bg-[#0b57d0] opacity-[0.04] blur-[80px] animate-blob-drift-reverse" style={{ animationDelay: "-12s" }} />

          {/* Dot grid overlay */}
          <div
            className="absolute inset-0 animate-grid-pulse"
            style={{
              backgroundImage: "radial-gradient(circle, #94a3b8 0.8px, transparent 0.8px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="max-w-[1040px] mx-auto px-6 relative z-10 flex flex-col items-center">
         

          <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-normal tracking-[-0.03em] text-[#1f1f1f] leading-[1.05] mb-8 max-w-[900px] font-sans text-center">
            International Medical<br />
            <span className="text-[#0b57d0]">Beauty Association</span>
          </h1>

          <p className="text-lg sm:text-[1.3rem] text-[#444746] mb-12 max-w-[700px] leading-relaxed font-normal text-center">
            국제메디컬뷰티협회(IMBA)와 함께 체계적인 교육과 세계적인 네트워크를
            경험하세요. 당신의 커리어를 한 단계 더 높일 수 있는 완벽한 여정이
            시작됩니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
            <Link
              href="/apply"
              className="bg-[#0b57d0] text-white hover:bg-[#004aba] px-8 py-4 rounded-full font-medium text-[1.1rem] transition-colors flex items-center justify-center gap-2"
            >
              교육 신청하기
            </Link>
            <Link
              href="/about"
              className="bg-white text-[#0b57d0] hover:bg-[#f3f7fe] px-8 py-4 rounded-full font-medium text-[1.1rem] transition-colors flex items-center justify-center border border-transparent shadow-[0_0_0_1px_#e5e7eb] hover:shadow-[0_0_0_1px_#d1d5db]"
            >
              협회 알아보기 <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </div>

        {/* Large Image Below Hero */}
        <div
          ref={imageContainerRef}
          className="max-w-[1280px] w-full mx-auto px-6 mt-20 lg:mt-28 relative z-10"
        >
          <motion.div
            style={{ scale, opacity }}
            className="relative w-full aspect-video lg:aspect-[2.35/1] rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-gray-100 border border-gray-100 origin-bottom"
          >
            <Image
              src="/association.jpg"
              alt="교육 현장"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Bar */}
      <section className="bg-white border-y border-gray-100 py-12">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-[#0b57d0] mb-2">
                10+
              </span>
              <span className="text-sm font-medium text-[#444746] uppercase tracking-wider">
                운영 연차
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-[#0b57d0] mb-2">
                5,000+
              </span>
              <span className="text-sm font-medium text-[#444746] uppercase tracking-wider">
                누적 수강생
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-[#0b57d0] mb-2">
                98%
              </span>
              <span className="text-sm font-medium text-[#444746] uppercase tracking-wider">
                자격 취득률
              </span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-[#0b57d0] mb-2">
                50+
              </span>
              <span className="text-sm font-medium text-[#444746] uppercase tracking-wider">
                제휴 기관
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-medium text-[#1f1f1f] tracking-tight mb-6">
              메디컬 뷰티의 <br className="hidden sm:block" />
              미래를 선도합니다
            </h2>
            <p className="text-lg text-[#444746] mb-8 leading-relaxed">
              IMBA는 검증된 교육 시스템과 최고의 강사진을 통해 단순한 미용을
              넘어선 &apos;메디컬 뷰티&apos; 영역의 전문 인재를 육성합니다.
              국내외 네트워크를 통한 취업 및 창업 지원까지, 당신의 성공적인
              커리어를 끝까지 책임집니다.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-[#1f1f1f]">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                <span className="font-medium">
                  체계적인 온/오프라인 통합 교육 커리큘럼
                </span>
              </li>
              <li className="flex items-center gap-3 text-[#1f1f1f]">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                <span className="font-medium">
                  해외 진출을 위한 글로벌 자격 인증 부여
                </span>
              </li>
              <li className="flex items-center gap-3 text-[#1f1f1f]">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                <span className="font-medium">
                  수료 후 지속적인 사후 관리 및 창업 컨설팅
                </span>
              </li>
            </ul>
            <Link
              href="/about"
              className="text-[#0b57d0] font-medium hover:underline inline-flex items-center gap-1 text-lg"
            >
              더 알아보기 <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden mt-8">
              <Image
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2670&auto=format&fit=crop"
                fill
                alt="About 1"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden -mt-4">
              <Image
                src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2670&auto=format&fit=crop"
                fill
                alt="About 2"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Grid */}
      <section className="py-24 bg-[#f8fafc] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#4285f4] opacity-[0.04] blur-[100px] animate-blob-drift-slow" />
          <div className="absolute bottom-[-10%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#34a853] opacity-[0.03] blur-[80px] animate-blob-drift" />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-medium text-[#1f1f1f] tracking-tight mb-4">
              핵심 서비스
            </h2>
            <p className="text-lg text-[#444746]">
              전문가를 위한 맞춤형 교육부터 자격증 발급까지,{" "}
              <br className="hidden sm:block" />
              여러분의 성장에 필요한 모든 것을 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: "오프라인 실무 교육",
                desc: "현역 전문가의 1:1 밀착 코칭으로 실전 감각을 극대화합니다.",
              },
              {
                icon: Award,
                title: "국경 없는 자격 인증",
                desc: "해외에서도 인정받는 글로벌 뷰티 스탠다드 자격증을 발급합니다.",
              },
              {
                icon: Users,
                title: "세미나 및 컨퍼런스",
                desc: "국내외 미용 트렌드를 가장 먼저 접할 수 있는 교류의 장.",
              },
              {
                icon: ShieldCheck,
                title: "창업/취업 컨설팅",
                desc: "수료 후에도 지속적인 관리와 법률/경영 노하우를 제공합니다.",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-[24px] border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-[#f0f4f9] group-hover:bg-[#e8f0fe] rounded-2xl flex items-center justify-center mb-6 transition-colors">
                  <service.icon className="w-7 h-7 text-[#0b57d0]" />
                </div>
                <h3 className="text-xl font-medium text-[#1f1f1f] mb-3">
                  {service.title}
                </h3>
                <p className="text-[#444746] leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-medium text-[#1f1f1f] tracking-tight mb-4">
            자랑스러운 임원진
          </h2>
          <p className="text-lg text-[#444746] mb-16">
            현장에서 검증된 최고의 전문가들이 교육을 이끕니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                img: "1",
                name: "이자윤",
                role: "협회장",
                desc: "메디컬 스킨케어 15년 경력",
              },
              {
                img: "2",
                name: "이자윤",
                role: "부협회장",
                desc: "글로벌 뷰티 아카데미 수석 강사",
              },
              {
                img: "3",
                name: "이자윤",
                role: "교육위원장",
                desc: "안면 왁싱 및 체형 관리 마스터",
              },
            ].map((member, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-gray-50 shadow-lg">
                  <Image
                    src={`/profile/${member.img}.jpg`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-medium text-[#1f1f1f] mb-1">
                  {member.name}
                </h3>
                <p className="text-[#0b57d0] font-medium mb-3">{member.role}</p>
                <p className="text-[#444746]">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Partners Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-medium text-[#1f1f1f] tracking-tight mb-16">
            함께하는 협력사
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-20 opacity-80">
            {[
              {
                img: "1",
                ext: "jpg",
                name: "국제휴먼(미용+건강)올림픽조직위원회",
              },
              { img: "2", ext: "jpg", name: "국제휴머니티총연맹" },
              { img: "3", ext: "png", name: "원셀메디의원" },
              { img: "4", ext: "jpg", name: "사단법인 국제미용건강총연합회" },
            ].map((partner, idx) => (
              <div
                key={idx}
                className="relative group w-[180px] h-[80px] sm:w-[220px] sm:h-[100px] grayscale hover:grayscale-0 transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                <Image
                  src={`/partners/${partner.img}.${partner.ext}`}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />

                {/* Hover Tooltip */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 w-max">
                  <div className="bg-slate-900 text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg shadow-lg relative">
                    {partner.name}
                    {/* Tooltip Arrow */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Bottom CTA */}
      <section className="py-24 bg-slate-900 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#4285f4] opacity-[0.12] blur-[120px] animate-blob-drift" />
          <div className="absolute bottom-[-10%] right-[5%] w-[450px] h-[450px] rounded-full bg-[#7c4dff] opacity-[0.1] blur-[100px] animate-blob-drift-reverse" />
          <div className="absolute top-[30%] right-[30%] w-[300px] h-[300px] rounded-full bg-[#00bcd4] opacity-[0.08] blur-[80px] animate-blob-drift-slow" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-medium text-white mb-6 leading-tight">
            전문가의 길, <br className="hidden sm:block" />더 이상 망설이지
            마세요.
          </h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            지금 바로 무료 회원가입하고 IMBA만의 특별한 커리큘럼과{" "}
            <br className="hidden sm:block" />
            다양한 교육 혜택을 확인해보세요.
          </p>
          <div className="flex justify-center">
            <Link
              href="/signup"
              className="bg-white text-slate-900 hover:bg-gray-100 border border-transparent px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              무료로 시작하기 <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
