'use client';
import { useState } from 'react';

interface OutroProps {
  onReset: () => void;
}

export default function Outro({ onReset }: OutroProps) {
  const [copied, setCopied] = useState(false);

  const copyKakaoId = async () => {
    await navigator.clipboard.writeText('jymanager');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
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

      <div className="w-full bg-[#fffbea] border border-[#fde68a] rounded-2xl p-5 mb-8">
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
        onClick={onReset}
        className="text-sm text-[#8b95a1] underline underline-offset-4"
      >
        처음으로 돌아가기
      </button>
    </div>
  );
}
