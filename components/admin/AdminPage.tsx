'use client';
import { useState, useCallback } from 'react';
import { AdminSubmission } from '@/lib/types';

const FIELD_LABELS: [keyof AdminSubmission, string][] = [
  ['제출일시', '제출일시'],
  ['브랜드명', '브랜드명'],
  ['주메뉴', '주메뉴'],
  ['창업연도', '창업연도'],
  ['슬로건', '슬로건'],
  ['브랜드강점', '브랜드 강점'],
  ['차별점', '차별점'],
  ['평균월매출', '평균 월매출'],
  ['평균순이익', '평균 순이익'],
  ['식자재원가율', '식자재 원가율'],
  ['직영점수', '직영점 수'],
  ['직영점목록', '직영점 목록'],
  ['가맹점수', '가맹점 수'],
  ['가맹점목록', '가맹점 목록'],
  ['가맹비', '가맹비'],
  ['인테리어비', '인테리어비'],
  ['초도물류비', '초도물류비'],
  ['총창업비용', '총 창업비용'],
  ['로열티여부', '로열티 여부'],
  ['로열티상세', '로열티 상세'],
  ['교육비', '교육비'],
  ['마케팅지원', '마케팅 지원'],
  ['식자재공급', '식자재 공급'],
  ['기타지원', '기타 지원'],
  ['특별혜택', '특별 혜택'],
  ['상담전화', '상담 전화'],
  ['카카오채널', '카카오 채널'],
  ['상담시간', '상담 시간'],
  ['상호명', '상호명'],
  ['대표자명', '대표자명'],
  ['사업자번호', '사업자번호'],
  ['주소', '주소'],
  ['대표전화', '대표전화'],
  ['이메일', '이메일'],
  ['강조포인트', '강조 포인트'],
  ['참고URL', '참고 URL'],
  ['기타전달사항', '기타 전달사항'],
];

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [submissions, setSubmissions] = useState<AdminSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [authPassword, setAuthPassword] = useState('');

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/admin', {
          headers: { 'x-admin-password': password },
        });
        if (res.status === 401) {
          setError('비밀번호가 올바르지 않습니다.');
          return;
        }
        if (!res.ok) throw new Error('fetch failed');
        const data = await res.json();
        setSubmissions(data.rows ?? []);
        setAuthPassword(password);
        setIsLoggedIn(true);
      } catch {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    },
    [password],
  );

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin', {
        headers: { 'x-admin-password': authPassword },
      });
      const data = await res.json();
      setSubmissions(data.rows ?? []);
    } catch {
      setError('새로고침 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [authPassword]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center px-5">
        <div className="w-full max-w-[400px] bg-white rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="text-2xl font-bold text-[#191f28] mb-1">관리자 로그인</div>
            <p className="text-sm text-[#8b95a1]">리즈랩 어드민 페이지</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="w-full px-4 py-3.5 rounded-xl border border-[#e5e8eb] text-[#191f28] text-[15px] placeholder:text-[#aeb5bc] focus:outline-none focus:border-[#3182f6] focus:ring-1 focus:ring-[#3182f6]"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-4 rounded-2xl bg-[#191f28] text-white font-semibold text-[15px] disabled:bg-[#e5e8eb] disabled:text-[#aeb5bc]"
            >
              {loading ? '확인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[22px] font-bold text-[#191f28]">제출 목록</h1>
            <p className="text-sm text-[#8b95a1] mt-0.5">총 {submissions.length}건</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={refresh}
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-white border border-[#e5e8eb] text-[14px] font-medium text-[#4e5968] hover:bg-[#f9fafb] transition-colors"
            >
              {loading ? '로딩...' : '새로고침'}
            </button>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 rounded-xl bg-white border border-[#e5e8eb] text-[14px] font-medium text-[#4e5968] hover:bg-[#f9fafb] transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-[#8b95a1] text-sm">
            아직 제출된 의뢰가 없습니다.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {[...submissions].reverse().map((sub, idx) => {
              const isOpen = expandedIndex === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#f2f4f6]">
                  <button
                    className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-[#fafafa] transition-colors"
                    onClick={() => setExpandedIndex(isOpen ? null : idx)}
                  >
                    <div>
                      <p className="text-[15px] font-bold text-[#191f28]">
                        {sub['브랜드명'] || '(브랜드명 없음)'}
                      </p>
                      <p className="text-[13px] text-[#8b95a1] mt-0.5">
                        {sub['주메뉴']} · {sub['제출일시']}
                      </p>
                    </div>
                    <span className="text-[#aeb5bc] text-lg">{isOpen ? '▲' : '▽'}</span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 border-t border-[#f2f4f6]">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        {FIELD_LABELS.map(([key, label]) => {
                          const val = sub[key];
                          if (!val) return null;
                          return (
                            <div key={key} className="bg-[#f9fafb] rounded-xl p-3">
                              <p className="text-[11px] font-semibold text-[#8b95a1] mb-1 uppercase tracking-wide">
                                {label}
                              </p>
                              <p className="text-[14px] text-[#191f28] whitespace-pre-wrap break-words">
                                {val}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
