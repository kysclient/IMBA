"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Globe, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-32 w-full overflow-hidden flex flex-col items-center justify-center bg-[#f8fafc] text-center border-b border-gray-100">
        <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#e8f0fe] via-transparent to-transparent opacity-60"></div>
        <div className="relative z-10 max-w-[1040px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#0b57d0]/20 text-sm font-medium text-[#0b57d0] mb-8 shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>International Medical Beauty Association</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[4.5rem] font-medium tracking-tight text-slate-900 leading-[1.2] lg:leading-[1.1] mb-6 font-sans">
              메디컬 뷰티의 <br className="hidden sm:block" />
              <span className="text-[#0b57d0]">새로운 지평을 열다</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed px-2">
              체계적인 교육과 혁신적인 네트워크를 통해 글로벌 메디컬 뷰티 산업의
              표준을 만들어갑니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Introduction text */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-2xl lg:text-4xl font-normal leading-relaxed text-slate-800 mb-8 sm:mb-10 tracking-tight"
          >
            국제메디컬뷰티협회는 메디컬 뷰티 산업의 전문성 강화와 올바른 시장
            발전을 위해 설립된{" "}
            <strong className="font-semibold text-[#0b57d0]">
              최고의 글로벌 전문 기관
            </strong>
            입니다.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-base sm:text-lg text-slate-500 leading-relaxed mb-6"
          >
            국내외 최신 기술과 혁신적인 교육 시스템을 기반으로 전문가 양성, 학술
            교류, 산업 발전을 위한 다양한 활동을 활발하게 전개하고 있습니다.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-500 leading-relaxed"
          >
            체계적인 교육 프로그램과 공신력 있는 인증 시스템을 통해 메디컬 뷰티
            분야의 새로운 표준을 제시하며, 고객이 안전하고 신뢰할 수 있는 올바른
            시술 문화 정착을 위해 끊임없이 노력하고 있습니다.
          </motion.p>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="py-16 sm:py-24 bg-[#f8fafc] border-y border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-[#0b57d0] font-semibold tracking-wider text-xs sm:text-sm uppercase mb-3">
              Core Values
            </h3>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900">
              우리가 추구하는 가치
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            {[
              {
                icon: Target,
                title: "Professionalism",
                subtitle: "최고 수준의 전문성",
                desc: "타협하지 않는 엄격한 교육 기준으로 글로벌 스탠다드에 부합하는 상위 1%의 메디컬 뷰티 전문가를 양성합니다.",
              },
              {
                icon: ShieldCheck,
                title: "Reliability",
                subtitle: "안전과 신뢰",
                desc: "투명하고 체계적인 심사 과정을 통해 검증된 기술력과 도덕성을 갖춘 올바른 시술 문화를 정착시킵니다.",
              },
              {
                icon: Globe,
                title: "Global Network",
                subtitle: "세계적인 교류",
                desc: "해외 우수 기관들과의 지속적인 학술 교류 및 네트워크 구축을 통해 메디컬 뷰티 산업의 발전을 선도합니다.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#f0f4f9] flex items-center justify-center mb-6 sm:mb-8">
                  <item.icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#0b57d0]" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                  {item.title}
                </h4>
                <p className="text-sm font-medium text-[#0b57d0] mb-4 sm:mb-5">
                  {item.subtitle}
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Team Members */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div className="max-w-2xl">
              <h3 className="text-[#0b57d0] font-semibold tracking-wider text-xs sm:text-sm uppercase mb-3">
                Our Leaders
              </h3>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 mb-3 sm:mb-4">
                IMBA를 이끄는 사람들
              </h2>
              <p className="text-base sm:text-lg text-slate-500">
                각 분야에서 10년 이상의 실무 경험과 학술적 지식을 겸비한
                대한민국 최고의 뷰티 에스테틱 전문가들이 모였습니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-[1200px] mx-auto">
            {[
              {
                img: "1",
                name: "이자윤",
                role: "협회장 / CEO",
                tags: [
                  "前 메디컬 스킨케어 원장",
                  "국제 뷰티학회 정회원",
                  "보건학 석사",
                ],
              },
              {
                img: "2",
                name: "이자윤",
                role: "부협회장 / 교육총괄",
                tags: [
                  "글로벌 아카데미 수석 강사",
                  "국가공인 미용장",
                  "K-Beauty 대상",
                ],
              },
              {
                img: "3",
                name: "이자윤",
                role: "상임이사 / 기술위원장",
                tags: [
                  "한국 체형관리 명인",
                  "메디컬 왁싱 기술 특허",
                  "해외 심사위원",
                ],
              },
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group"
              >
                <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-slate-100">
                  <Image
                    src={`/profile/${member.img}.jpg`}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm sm:text-base text-[#0b57d0] font-medium mb-3 sm:mb-4">
                  {member.role}
                </p>

                <ul className="space-y-2">
                  {member.tags.map((tag, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></div>
                      {tag}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Timeline History */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden relative border-t border-gray-100">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e8f0fe] rounded-full blur-[100px]"></div>

        <div className="max-w-[1040px] mx-auto px-6 relative z-10">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-slate-900 mb-3 sm:mb-4">
              걸어온 길
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              IMBA가 써 내려가는 혁신의 역사
            </p>
          </div>

          <div className="space-y-12 sm:space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {[
              {
                year: "2025",
                title: "글로벌 진출 및 인증 확대",
                desc: "일본, 베트남 등 아시아 5개국 지부 설립 및 국제 표준 인증서 파트너십 체결",
              },
              {
                year: "2024",
                title: "온·오프라인 통합 허브 구축",
                desc: "IMBA 공식 플랫폼 및 모바일 앱 런칭, 스마트 에듀케이션 시스템 도입",
              },
              {
                year: "2023",
                title: "제 1회 국제 자격증 발급",
                desc: "협회 공식 출범 및 1기 마스터 클래스 수료생 500명 배출 달성",
              },
              {
                year: "2022",
                title: "협회 설립 및 인가",
                desc: "비영리 사단법인 국제메디컬뷰티협회(IMBA) 설립 인가 완료 및 위원회 출범",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#0b57d0] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md sm:w-12 sm:h-12 z-20">
                  <Award className="w-5 h-5 text-white" />
                </div>

                <motion.div
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-[#0b57d0] font-bold text-lg sm:text-xl mb-1 block">
                    {item.year}
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    {item.desc}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
