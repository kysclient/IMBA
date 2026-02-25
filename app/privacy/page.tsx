import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description:
    "IMBA 국제메디컬뷰티협회 개인정보처리방침 - 개인정보의 수집, 이용, 보관 및 보호에 관한 안내입니다.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#f8f9fa] border-b border-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[15%] w-[350px] h-[350px] rounded-full bg-[#4285f4] opacity-[0.05] blur-[90px] animate-blob-drift" />
          <div className="absolute bottom-[-30%] left-[20%] w-[300px] h-[300px] rounded-full bg-[#0b57d0] opacity-[0.04] blur-[80px] animate-blob-drift-reverse" />
        </div>
        <div className="max-w-[860px] mx-auto px-6 py-16 sm:py-24 relative z-10">
          <Link href="/" className="inline-block mb-8">
            <Image
              src="/main_logo_v2.png"
              alt="IMBA"
              width={120}
              height={32}
              className="h-7 w-auto object-contain"
            />
          </Link>
          <h1 className="text-3xl sm:text-4xl font-normal text-[#202124] tracking-tight mb-3">
            개인정보처리방침
          </h1>
          <p className="text-[#5f6368] text-sm">
            시행일: 2026년 1월 1일 | 최종 수정일: 2026년 2월 25일
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[860px] mx-auto px-6 py-12 sm:py-16">
        <div className="prose prose-slate max-w-none text-[15px] leading-[1.8] text-[#3c4043]">

          <p className="text-[#202124] font-medium text-base mb-8">
            국제메디컬뷰티협회(이하 &quot;IMBA&quot; 또는 &quot;협회&quot;)는 「개인정보 보호법」 제30조에 따라
            이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록
            다음과 같이 개인정보처리방침을 수립·공개합니다.
          </p>

          <hr className="my-10 border-gray-200" />

          {/* 1 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제1조 (개인정보의 수집 항목 및 수집 방법)</h2>
            <h3 className="text-base font-medium text-[#202124] mt-6 mb-3">1. 수집하는 개인정보 항목</h3>
            <p>협회는 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.</p>

            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300 text-left">
                    <th className="py-3 px-4 font-medium text-[#202124] bg-[#f8f9fa]">구분</th>
                    <th className="py-3 px-4 font-medium text-[#202124] bg-[#f8f9fa]">수집 항목</th>
                    <th className="py-3 px-4 font-medium text-[#202124] bg-[#f8f9fa]">수집 목적</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 align-top font-medium">회원가입</td>
                    <td className="py-3 px-4 align-top">이름, 이메일 주소, 휴대폰번호, 비밀번호(암호화 저장)</td>
                    <td className="py-3 px-4 align-top">회원 식별 및 서비스 제공, 본인 확인</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 align-top font-medium">수강신청</td>
                    <td className="py-3 px-4 align-top">이름, 연락처, 이메일, 희망 과정, 지원 동기</td>
                    <td className="py-3 px-4 align-top">수강 상담 및 교육과정 안내</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 align-top font-medium">서비스 이용</td>
                    <td className="py-3 px-4 align-top">접속 IP, 쿠키, 서비스 이용 기록, 접속 일시</td>
                    <td className="py-3 px-4 align-top">서비스 개선, 부정 이용 방지</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-base font-medium text-[#202124] mt-6 mb-3">2. 수집 방법</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>홈페이지 회원가입 및 수강신청 양식을 통한 직접 수집</li>
              <li>서비스 이용 과정에서 자동으로 생성·수집되는 정보</li>
            </ul>
          </section>

          {/* 2 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제2조 (개인정보의 처리 목적)</h2>
            <p>협회는 수집한 개인정보를 다음의 목적으로만 처리합니다.</p>
            <ol className="list-decimal pl-5 space-y-2 mt-3">
              <li><strong>회원 관리:</strong> 회원제 서비스 이용에 따른 본인 확인, 회원 식별, 가입 의사 확인, 불량 회원의 부정 이용 방지</li>
              <li><strong>교육 서비스 제공:</strong> 수강신청 처리, 교육과정 안내, 수료증 발급</li>
              <li><strong>민원 처리:</strong> 이용자 문의 접수 및 처리, 처리 결과 통보</li>
              <li><strong>마케팅 및 광고 활용:</strong> 이벤트·교육 정보 안내 (별도 동의 시)</li>
              <li><strong>서비스 개선:</strong> 접속 빈도 파악, 통계 분석을 통한 서비스 품질 향상</li>
            </ol>
          </section>

          {/* 3 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제3조 (개인정보의 처리 및 보유 기간)</h2>
            <p>
              협회는 법령에 따른 보유 기간 또는 이용자로부터 동의받은 기간 내에서 개인정보를 처리·보유합니다.
              각 개인정보의 보유 기간은 다음과 같습니다.
            </p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300 text-left">
                    <th className="py-3 px-4 font-medium text-[#202124] bg-[#f8f9fa]">보유 항목</th>
                    <th className="py-3 px-4 font-medium text-[#202124] bg-[#f8f9fa]">보유 기간</th>
                    <th className="py-3 px-4 font-medium text-[#202124] bg-[#f8f9fa]">근거 법령</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">회원 정보</td>
                    <td className="py-3 px-4">회원 탈퇴 시까지</td>
                    <td className="py-3 px-4">개인정보 보호법</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">수강신청 기록</td>
                    <td className="py-3 px-4">3년</td>
                    <td className="py-3 px-4">소비자 보호에 관한 법률</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">접속 기록(로그)</td>
                    <td className="py-3 px-4">3개월</td>
                    <td className="py-3 px-4">통신비밀보호법</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">전자상거래 거래 기록</td>
                    <td className="py-3 px-4">5년</td>
                    <td className="py-3 px-4">전자상거래 등에서의 소비자보호에 관한 법률</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제4조 (개인정보의 제3자 제공)</h2>
            <p>
              협회는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
              다만, 아래의 경우에는 예외로 합니다.
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>
          </section>

          {/* 5 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제5조 (개인정보 처리의 위탁)</h2>
            <p>협회는 원활한 서비스 제공을 위해 아래와 같이 개인정보 처리 업무를 위탁하고 있습니다.</p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300 text-left">
                    <th className="py-3 px-4 font-medium text-[#202124] bg-[#f8f9fa]">수탁업체</th>
                    <th className="py-3 px-4 font-medium text-[#202124] bg-[#f8f9fa]">위탁 업무 내용</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">Neon (Neon Inc.)</td>
                    <td className="py-3 px-4">데이터베이스 호스팅 및 관리</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">Resend (Resend Inc.)</td>
                    <td className="py-3 px-4">이메일 발송 서비스 (비밀번호 재설정 등)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">Vercel Inc.</td>
                    <td className="py-3 px-4">웹 호스팅 및 서비스 인프라 운영</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제6조 (이용자의 권리·의무 및 행사 방법)</h2>
            <p>이용자는 언제든지 다음의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
            <ol className="list-decimal pl-5 space-y-2 mt-3">
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리 정지 요구</li>
            </ol>
            <p className="mt-4">
              위 권리 행사는 마이페이지에서 직접 처리하거나, 개인정보 보호 책임자에게
              서면, 이메일로 연락하시면 지체 없이 조치하겠습니다.
            </p>
            <p className="mt-2">
              이용자가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우,
              정정 또는 삭제를 완료할 때까지 해당 개인정보를 이용하거나 제공하지 않습니다.
            </p>
          </section>

          {/* 7 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제7조 (개인정보의 안전성 확보 조치)</h2>
            <p>협회는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li><strong>비밀번호 암호화:</strong> 이용자의 비밀번호는 bcrypt 알고리즘으로 일방향 암호화하여 저장·관리합니다.</li>
              <li><strong>접속 기록 보관:</strong> 개인정보 처리 시스템에 접속한 기록을 최소 3개월 이상 보관·관리합니다.</li>
              <li><strong>SSL/TLS 암호화:</strong> 네트워크를 통해 전송되는 개인정보는 SSL/TLS 암호화 통신을 적용합니다.</li>
              <li><strong>접근 권한 관리:</strong> 개인정보에 대한 접근 권한을 최소한의 인원으로 제한합니다.</li>
              <li><strong>해킹 등에 대비한 기술적 대책:</strong> 보안 프로그램을 설치하고 주기적으로 갱신·점검합니다.</li>
            </ul>
          </section>

          {/* 8 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제8조 (쿠키의 사용)</h2>
            <p>
              협회는 이용자 인증을 위해 쿠키(Cookie)를 사용합니다.
              쿠키는 서버가 이용자의 브라우저에 보내는 소량의 정보로, 이용자의 컴퓨터에 저장됩니다.
            </p>
            <h3 className="text-base font-medium text-[#202124] mt-6 mb-3">사용 목적</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>로그인 상태 유지를 위한 인증 토큰 저장 (HttpOnly 쿠키)</li>
            </ul>
            <h3 className="text-base font-medium text-[#202124] mt-6 mb-3">쿠키의 거부</h3>
            <p>
              이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다.
              웹 브라우저의 설정을 통해 쿠키를 허용하거나 거부할 수 있습니다.
              다만, 쿠키를 거부할 경우 로그인이 필요한 서비스 이용이 제한될 수 있습니다.
            </p>
          </section>

          {/* 9 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제9조 (개인정보 보호 책임자)</h2>
            <p>
              협회는 개인정보 처리에 관한 업무를 총괄해서 책임지고,
              개인정보 처리와 관련한 이용자의 불만 처리 및 피해구제 등을 위하여
              아래와 같이 개인정보 보호 책임자를 지정하고 있습니다.
            </p>
            <div className="bg-[#f8f9fa] rounded-xl p-6 mt-4 text-sm">
              <p className="font-medium text-[#202124] mb-3">개인정보 보호 책임자</p>
              <ul className="space-y-1.5 text-[#3c4043]">
                <li>성명: 김유신</li>
                <li>연락처: 010-7687-1592</li>
                <li>이메일: jyun_beauty@naver.com</li>
              </ul>
            </div>
          </section>

          {/* 10 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제10조 (권익침해 구제 방법)</h2>
            <p>
              이용자는 개인정보 침해로 인한 구제를 받기 위하여 아래의 기관에 분쟁 해결이나 상담 등을 신청할 수 있습니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>개인정보분쟁조정위원회: (국번없이) 1833-6972 (<a href="https://www.kopico.go.kr" target="_blank" rel="noopener noreferrer" className="text-[#0b57d0] hover:underline">www.kopico.go.kr</a>)</li>
              <li>개인정보침해신고센터: (국번없이) 118 (<a href="https://privacy.kisa.or.kr" target="_blank" rel="noopener noreferrer" className="text-[#0b57d0] hover:underline">privacy.kisa.or.kr</a>)</li>
              <li>대검찰청 사이버수사과: (국번없이) 1301 (<a href="https://www.spo.go.kr" target="_blank" rel="noopener noreferrer" className="text-[#0b57d0] hover:underline">www.spo.go.kr</a>)</li>
              <li>경찰청 사이버안전국: (국번없이) 182 (<a href="https://ecrm.police.go.kr" target="_blank" rel="noopener noreferrer" className="text-[#0b57d0] hover:underline">ecrm.police.go.kr</a>)</li>
            </ul>
          </section>

          {/* 11 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제11조 (개인정보처리방침의 변경)</h2>
            <p>
              이 개인정보처리방침은 2026년 1월 1일부터 적용됩니다.
              변경 사항이 있을 경우 시행일 최소 7일 전부터 홈페이지 공지사항을 통해 고지합니다.
            </p>
          </section>

          <hr className="my-10 border-gray-200" />

          <div className="text-sm text-[#5f6368]">
            <p>본 방침에 대한 문의사항이 있으시면 아래로 연락해주세요.</p>
            <p className="mt-2">
              국제메디컬뷰티협회(IMBA) | 서울특별시 강남구 테헤란로 123, 뷰티타워 15층
              <br />
              전화: 02-1234-5678 | 이메일: jyun_beauty@naver.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
