import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "이용약관",
  description:
    "IMBA 국제메디컬뷰티협회 이용약관 - 서비스 이용 조건과 회원의 권리·의무에 대한 안내입니다.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#f8f9fa] border-b border-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#4285f4] opacity-[0.05] blur-[90px] animate-blob-drift" />
          <div className="absolute bottom-[-30%] right-[15%] w-[300px] h-[300px] rounded-full bg-[#34a853] opacity-[0.04] blur-[80px] animate-blob-drift-reverse" />
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
            이용약관
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
            본 약관은 국제메디컬뷰티협회(이하 &quot;IMBA&quot; 또는 &quot;협회&quot;)가 운영하는
            웹사이트(이하 &quot;사이트&quot;)에서 제공하는 서비스의 이용과 관련하여
            협회와 이용자 간의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.
          </p>

          <hr className="my-10 border-gray-200" />

          {/* 1 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제1조 (목적)</h2>
            <p>
              이 약관은 IMBA가 제공하는 교육과정 안내, 수강신청, 커뮤니티, 온라인 스토어 등
              모든 서비스(이하 &quot;서비스&quot;)의 이용 조건과 절차, 협회와 이용자 간의 권리·의무 및
              책임 사항, 기타 필요한 사항을 규정합니다.
            </p>
          </section>

          {/* 2 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제2조 (정의)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>&quot;사이트&quot;</strong>란 협회가 서비스를 제공하기 위해 운영하는 인터넷 웹사이트를 말합니다.</li>
              <li><strong>&quot;이용자&quot;</strong>란 사이트에 접속하여 이 약관에 따라 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
              <li><strong>&quot;회원&quot;</strong>이란 사이트에 회원가입을 하고 아이디(이메일)를 부여받은 자를 말합니다.</li>
              <li><strong>&quot;비회원&quot;</strong>이란 회원가입 없이 사이트가 제공하는 서비스를 이용하는 자를 말합니다.</li>
              <li><strong>&quot;게시물&quot;</strong>이란 회원이 서비스를 이용하면서 게시한 텍스트, 이미지, 파일 등의 정보를 말합니다.</li>
            </ol>
          </section>

          {/* 3 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제3조 (약관의 효력 및 변경)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>이 약관은 사이트에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.</li>
              <li>협회는 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
              <li>약관이 변경되는 경우 변경 사항을 시행일 7일 전부터 사이트에 공지합니다. 이용자에게 불리한 변경의 경우 30일 전부터 공지합니다.</li>
              <li>변경된 약관에 동의하지 않는 회원은 회원 탈퇴(해지)를 요청할 수 있으며, 변경된 약관의 효력 발생일 이후에도 서비스를 계속 이용할 경우 약관 변경에 동의한 것으로 간주합니다.</li>
            </ol>
          </section>

          {/* 4 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제4조 (회원가입)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>이용자는 협회가 정한 양식에 따라 필요한 정보를 기입한 후 이 약관에 동의한다는 의사 표시를 함으로써 회원가입을 신청합니다.</li>
              <li>
                협회는 다음 각 호에 해당하는 경우 회원가입을 승인하지 않을 수 있습니다.
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>가입 신청자가 이전에 회원 자격을 상실한 적이 있는 경우</li>
                  <li>실명이 아니거나 타인의 정보를 이용한 경우</li>
                  <li>허위 정보를 기재하거나, 필수 사항을 기재하지 않은 경우</li>
                  <li>기타 회원으로 등록하는 것이 부적절하다고 판단되는 경우</li>
                </ul>
              </li>
              <li>회원가입의 성립 시기는 협회의 승인이 이용자에게 도달한 시점으로 합니다.</li>
            </ol>
          </section>

          {/* 5 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제5조 (회원 탈퇴 및 자격 상실)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>회원은 협회에 언제든지 탈퇴를 요청할 수 있으며, 협회는 즉시 회원 탈퇴를 처리합니다.</li>
              <li>
                회원이 다음 각 호에 해당하는 경우 협회는 회원 자격을 제한 또는 정지시킬 수 있습니다.
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>가입 시 허위 내용을 등록한 경우</li>
                  <li>다른 이용자의 서비스 이용을 방해하거나, 그 정보를 도용하는 등 질서를 위협하는 경우</li>
                  <li>서비스를 이용하여 법령 또는 이 약관이 금지하는 행위를 하는 경우</li>
                </ul>
              </li>
            </ol>
          </section>

          {/* 6 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제6조 (서비스의 제공 및 변경)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                협회는 다음과 같은 서비스를 제공합니다.
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>교육과정 정보 제공 및 수강신청</li>
                  <li>커뮤니티 게시판 (공지사항, Q&A, 수강후기)</li>
                  <li>갤러리 (교육활동, 협회행사, 미용대회)</li>
                  <li>온라인 스토어 (뷰티 용품 판매)</li>
                  <li>회원 프로필 관리</li>
                  <li>기타 협회가 정하는 서비스</li>
                </ul>
              </li>
              <li>협회는 서비스의 내용을 변경하거나 추가할 수 있으며, 변경 사항은 사이트에 공지합니다.</li>
            </ol>
          </section>

          {/* 7 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제7조 (서비스의 중단)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>협회는 정보통신 설비의 보수, 점검, 교체, 장애, 통신 두절 등의 사유가 발생한 경우 서비스의 제공을 일시적으로 중단할 수 있습니다.</li>
              <li>제1항에 의한 서비스 중단의 경우 사이트에 사전 공지합니다. 다만, 불가항력적인 사유로 사전 공지가 불가능한 경우 사후에 공지할 수 있습니다.</li>
            </ol>
          </section>

          {/* 8 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제8조 (이용자의 의무)</h2>
            <p>이용자는 다음 행위를 해서는 안 됩니다.</p>
            <ol className="list-decimal pl-5 space-y-2 mt-3">
              <li>가입 신청 또는 정보 변경 시 허위 내용을 등록하는 행위</li>
              <li>타인의 정보를 도용하는 행위</li>
              <li>협회가 게시한 정보를 허가 없이 변경하는 행위</li>
              <li>협회가 정한 정보 이외의 정보(컴퓨터 프로그램 등)를 송신하거나 게시하는 행위</li>
              <li>협회 및 기타 제3자의 저작권 등 지식재산권을 침해하는 행위</li>
              <li>협회 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
              <li>외설 또는 폭력적인 메시지, 이미지 등 미풍양속에 반하는 정보를 게시하는 행위</li>
              <li>영리를 목적으로 서비스를 이용하는 행위 (협회의 사전 승인 없이)</li>
              <li>기타 불법적이거나 부당한 행위</li>
            </ol>
          </section>

          {/* 9 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제9조 (게시물의 관리)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>회원이 작성한 게시물에 대한 책임은 해당 게시물을 작성한 회원에게 있습니다.</li>
              <li>
                협회는 다음 각 호에 해당하는 게시물을 사전 통보 없이 삭제하거나 이동 또는 등록을 거부할 수 있습니다.
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>다른 이용자 또는 제3자를 비방하거나 명예를 훼손하는 내용</li>
                  <li>공공질서 및 미풍양속에 위반되는 내용</li>
                  <li>범죄적 행위에 결부된다고 인정되는 내용</li>
                  <li>협회 또는 제3자의 저작권 등 권리를 침해하는 내용</li>
                  <li>영리 목적의 광고성 게시물</li>
                  <li>기타 관계 법령에 위배된다고 판단되는 내용</li>
                </ul>
              </li>
            </ol>
          </section>

          {/* 10 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제10조 (저작권의 귀속)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>사이트에서 협회가 작성한 저작물에 대한 저작권 및 기타 지식재산권은 협회에 귀속합니다.</li>
              <li>이용자는 서비스를 이용하여 얻은 정보를 협회의 사전 승낙 없이 복제, 전송, 출판, 배포, 방송, 기타 방법으로 이용하거나 제3자에게 이용하게 할 수 없습니다.</li>
              <li>회원이 서비스 내에 게시한 게시물의 저작권은 해당 게시물의 저작자에게 귀속됩니다.</li>
            </ol>
          </section>

          {/* 11 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제11조 (수강신청 및 교육 서비스)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>이용자는 사이트를 통해 교육과정에 대한 수강신청을 할 수 있습니다.</li>
              <li>수강신청은 협회의 확인 및 승인을 거쳐 최종 등록됩니다.</li>
              <li>수강료, 교육 일정, 환불 규정 등 세부 사항은 각 과정의 안내 페이지 또는 별도 공지에 따릅니다.</li>
              <li>
                수강 취소 및 환불은 다음 기준에 따릅니다.
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>교육 시작 전: 수강료 전액 환불</li>
                  <li>총 교육시간의 1/3 경과 전: 수강료의 2/3 환불</li>
                  <li>총 교육시간의 1/2 경과 전: 수강료의 1/2 환불</li>
                  <li>총 교육시간의 1/2 경과 후: 환불 불가</li>
                </ul>
              </li>
            </ol>
          </section>

          {/* 12 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제12조 (면책 조항)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>협회는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력적 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.</li>
              <li>협회는 이용자의 귀책 사유로 인한 서비스 이용 장애에 대해 책임을 지지 않습니다.</li>
              <li>협회는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대해 책임을 지지 않으며, 서비스를 통해 얻은 자료로 인한 손해에 대해서도 책임을 지지 않습니다.</li>
              <li>협회는 이용자가 게시물에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등에 대해 책임을 지지 않습니다.</li>
            </ol>
          </section>

          {/* 13 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">제13조 (분쟁 해결)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>협회는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상 처리하기 위해 피해보상처리기구를 설치·운영합니다.</li>
              <li>협회와 이용자 간에 발생한 분쟁은 대한민국 법을 준거법으로 합니다.</li>
              <li>서비스 이용으로 발생한 분쟁에 대해 소송이 제기되는 경우 협회의 소재지를 관할하는 법원을 전속 관할 법원으로 합니다.</li>
            </ol>
          </section>

          {/* 부칙 */}
          <section className="mb-10">
            <h2 className="text-xl font-medium text-[#202124] mb-4">부칙</h2>
            <p>이 약관은 2026년 1월 1일부터 시행합니다.</p>
          </section>

          <hr className="my-10 border-gray-200" />

          <div className="text-sm text-[#5f6368]">
            <p>본 약관에 대한 문의사항이 있으시면 아래로 연락해주세요.</p>
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
