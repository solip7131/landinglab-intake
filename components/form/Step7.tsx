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
        <p className="text-[13px] font-semibold text-[#4e5968] mb-3">필수 첨부 자료</p>
        <ul className="space-y-2">
          {[
            { text: '메뉴 사진 (고화질 JPG/PNG)', required: true },
            { text: '매장 내외부 사진', required: true },
            { text: '브랜드 로고 파일 (AI/PNG)', required: true },
            { text: '배달앱 / 네이버플레이스 고객 리뷰 캡처본', required: true },
            { text: '언론 기사 또는 방송 캡처', required: false },
            { text: '기존 홍보물, 카탈로그 등', required: false },
          ].map((item) => (
            <li key={item.text} className="flex items-center gap-2 text-[14px]">
              <span className={item.required ? 'text-[#3182f6]' : 'text-[#aeb5bc]'}>·</span>
              <span className={item.required ? 'text-[#4e5968]' : 'text-[#aeb5bc]'}>
                {item.text}
                {!item.required && (
                  <span className="text-[12px] ml-1">(선택)</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
