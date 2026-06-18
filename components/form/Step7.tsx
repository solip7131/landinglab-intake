'use client';
import { useState } from 'react';

export default function Step7() {
  const [copied, setCopied] = useState(false);

  const copyKakaoId = async () => {
    await navigator.clipboard.writeText('jymanager');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="mb-8">
        <div className="text-xs font-bold text-[#3182f6] tracking-widest mb-2">STEP 7 / 9</div>
        <h2 className="text-[24px] font-bold text-[#191f28] leading-tight">
          메뉴 사진 & 자료
          <br />
          전달 안내
        </h2>
      </div>

      <div className="bg-[#fffbea] border border-[#fde68a] rounded-2xl p-5 mb-6">
        <p className="text-[15px] text-[#78350f] leading-relaxed mb-5">
          메뉴 사진, 영상, 언론 노출 자료 등은
          <br />
          카카오톡으로 편하게 보내주세요 :)
        </p>

        <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-[#fde68a]">
          <div>
            <p className="text-xs text-[#92400e] mb-0.5">카카오톡 아이디</p>
            <p className="text-[16px] font-bold text-[#191f28]">jymanager</p>
          </div>
          <button
            onClick={copyKakaoId}
            className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all active:scale-95 ${
              copied
                ? 'bg-[#dcfce7] text-[#16a34a]'
                : 'bg-[#191f28] text-white'
            }`}
          >
            {copied ? '✓ 복사됨' : '아이디 복사'}
          </button>
        </div>
      </div>

      <div className="bg-[#f9fafb] rounded-2xl p-5">
        <p className="text-[13px] font-semibold text-[#4e5968] mb-3">⭐ 필수 첨부 자료</p>
        <ul className="space-y-2">
          {[
            '고객 리뷰 캡처본 (네이버, 배민, 쿠팡이츠 등)',
            '메뉴 사진',
            '매장 내외부 사진',
            '브랜드 로고 파일 (AI/PNG)',
            '언론 기사 또는 방송 이미지나 영상 (있는 경우)',
            '관련 영상 - 브랜드 홍보영상, 대표자 또는 점주 인터뷰 (있는 경우)',
            '기존 홍보물, 카탈로그 등 (있는 경우)',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-[14px] text-[#6b7684]">
              <span className="text-[#3182f6] mt-0.5">·</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
