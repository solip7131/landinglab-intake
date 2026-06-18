'use client';
import { useState } from 'react';

interface OutroProps {
  onReset: () => void;
}

const STEPS = [
  {
    num: '01',
    title: '의뢰 접수',
    desc: '폼 작성 완료 후 영업일 1~2일 내 카카오톡으로 연락드려요.',
  },
  {
    num: '02',
    title: '스타일 제안',
    desc: '브랜드에 맞는 디자인 방향을 먼저 제안드립니다.',
  },
  {
    num: '03',
    title: '1차 시안 확인',
    desc: '제안된 방향으로 랜딩페이지 1차 시안을 제작해드립니다.',
  },
  {
    num: '04',
    title: '수정 및 최종 납품',
    desc: '피드백 반영 후 최종 완성본을 전달드립니다.',
  },
];

const SECTIONS = [
  '01. 히어로',
  '02. 브랜드 강점',
  '03. 메뉴 소개',
  '04. 리뷰',
  '05. 창업 비용',
  '06. 본사 지원 + 플로팅 CTA',
];

export default function Outro({ onReset }: OutroProps) {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const copyKakaoId = async () => {
    await navigator.clipboard.writeText('jymanager');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="flex flex-col items-center text-center pt-16 pb-8">
        <div className="text-5xl mb-6">🎉</div>
        <h2 className="text-[26px] font-bold text-[#191f28] mb-4 leading-tight">
          작성해주셔서
          <br />
          감사합니다
        </h2>
        <p className="text-[15px] text-[#6b7684] leading-relaxed mb-8">
          꼼꼼히 작성해주신 내용을 바탕으로
          <br />
          대표님 브랜드에 꼭 맞는 디자인을 제안드리겠습니다.
          <br />
          영업일 1~2일 내 카카오톡으로 연락드릴게요.
        </p>

        <div className="w-full bg-[#fffbea] border border-[#fde68a] rounded-2xl p-5 mb-6">
          <p className="text-[14px] font-semibold text-[#92400e] mb-1">메뉴 사진 & 자료 전달</p>
          <p className="text-[13px] text-[#78350f] leading-relaxed mb-4">
            메뉴 사진, 영상, 언론 노출 자료 등은
            <br />
            카카오톡으로 편하게 보내주세요 :)
          </p>
          <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-[#fde68a]">
            <span className="text-[14px] font-bold text-[#191f28]">jymanager</span>
            <button
              onClick={copyKakaoId}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                copied
                  ? 'bg-[#dcfce7] text-[#16a34a]'
                  : 'bg-[#191f28] text-white active:scale-95'
              }`}
            >
              {copied ? '✓ 복사됨' : '아이디 복사'}
            </button>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full py-4 rounded-2xl bg-[#191f28] text-white font-semibold text-[15px] mb-4 active:scale-[0.98] transition-transform"
        >
          랜딩랩 제작 프로세스 보기
        </button>

        <button
          onClick={onReset}
          className="text-sm text-[#aeb5bc] underline underline-offset-4"
        >
          처음으로 돌아가기
        </button>
      </div>

      {/* 모달 */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] flex items-end justify-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-[480px] bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 핸들 */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-[#e5e8eb] rounded-full" />
            </div>

            <div className="px-5 pt-4 pb-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[20px] font-bold text-[#191f28]">랜딩랩 제작 프로세스</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#f2f4f6] text-[#4e5968] text-lg"
                >
                  ×
                </button>
              </div>

              {/* 스텝 목록 */}
              <div className="flex flex-col gap-4 mb-8">
                {STEPS.map((step, i) => (
                  <div key={step.num} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-[#191f28] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {step.num}
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className="w-px flex-1 bg-[#e5e8eb] mt-2" />
                      )}
                    </div>
                    <div className="pt-1.5 pb-5">
                      <p className="text-[15px] font-bold text-[#191f28] mb-1">{step.title}</p>
                      <p className="text-[14px] text-[#6b7684] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 기본 섹션 구성 */}
              <div className="bg-[#f9fafb] rounded-2xl p-5">
                <p className="text-[13px] font-bold text-[#4e5968] mb-3">기본 제공 섹션 구성</p>
                <div className="flex flex-wrap gap-2">
                  {SECTIONS.map((sec) => (
                    <span
                      key={sec}
                      className="text-[13px] text-[#4e5968] bg-white border border-[#e5e8eb] rounded-lg px-3 py-1.5 font-medium"
                    >
                      {sec}
                    </span>
                  ))}
                </div>
                <p className="text-[12px] text-[#aeb5bc] leading-relaxed mt-3">
                  기본 6개 섹션 외 추가 구성 시 별도 비용이 발생할 수 있습니다.
                  <br />
                  예: 추가 섹션 / 플로팅 배너 또는 팝업 / FAQ
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
