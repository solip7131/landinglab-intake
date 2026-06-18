'use client';
import { useState, useCallback } from 'react';

interface Submission {
  id: number;
  created_at: string;
  brand_name: string;
  main_menu: string;
  founded_year: string;
  slogan: string;
  store_type: string;
  strengths: string;
  differentiation: string;
  brand_links: string;
  avg_monthly_sales: string;
  avg_net_profit: string;
  food_cost_ratio: string;
  direct_store_count: string;
  direct_store_names: string;
  franchise_store_count: string;
  franchise_store_names: string;
  franchise_fee: string;
  interior_cost: string;
  initial_logistics_cost: string;
  total_estimated_cost: string;
  has_royalty: string;
  royalty_details: string;
  training_fee: string;
  marketing_support: string;
  supply_method: string;
  other_support: string;
  special_benefits: string;
  consultation_phone: string;
  kakao_channel: string;
  consultation_hours: string;
  company_name: string;
  ceo_name: string;
  business_number: string;
  address: string;
  main_phone: string;
  business_email: string;
  emphasis_points: string;
  reference_urls: string;
  additional_notes: string;
  [key: string]: string | number;
}

const FIELD_LABELS: [keyof Submission, string][] = [
  ['created_at',             '제출일시'],
  ['brand_name',             '브랜드명'],
  ['main_menu',              '주메뉴'],
  ['founded_year',           '창업연도'],
  ['slogan',                 '슬로건'],
  ['store_type',             '장사 유형'],
  ['strengths',              '브랜드 강점'],
  ['differentiation',        '차별점'],
  ['brand_links',            '브랜드 관련 링크'],
  ['avg_monthly_sales',      '평균 월매출'],
  ['avg_net_profit',         '평균 순이익'],
  ['food_cost_ratio',        '식자재 원가율'],
  ['direct_store_count',     '직영점 수'],
  ['direct_store_names',     '직영점 목록'],
  ['franchise_store_count',  '가맹점 수'],
  ['franchise_store_names',  '가맹점 목록'],
  ['franchise_fee',          '가맹비'],
  ['interior_cost',          '인테리어비'],
  ['initial_logistics_cost', '초도물류비'],
  ['total_estimated_cost',   '총 창업비용'],
  ['has_royalty',            '로열티 여부'],
  ['royalty_details',        '로열티 상세'],
  ['training_fee',           '교육비'],
  ['marketing_support',      '마케팅 지원'],
  ['supply_method',          '식자재 공급'],
  ['other_support',          '기타 지원'],
  ['special_benefits',       '특별 혜택'],
  ['consultation_phone',     '상담 전화'],
  ['kakao_channel',          '카카오 채널'],
  ['consultation_hours',     '상담 시간'],
  ['company_name',           '상호명'],
  ['ceo_name',               '대표자명'],
  ['business_number',        '사업자번호'],
  ['address',                '주소'],
  ['main_phone',             '대표전화'],
  ['business_email',         '이메일'],
  ['emphasis_points',        '강조 포인트'],
  ['reference_urls',         '참고 URL'],
  ['additional_notes',       '기타 전달사항'],
];

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [authPassword, setAuthPassword] = useState('');

  const fetchData = useCallback(async (pw: string) => {
    const res = await fetch('/api/admin', {
      headers: { 'x-admin-password': pw },
    });
    if (res.status === 401) throw new Error('UNAUTHORIZED');
    if (!res.ok) throw new Error('FETCH_ERROR');
    const data = await res.json();
    return data.rows as Submission[];
  }, []);

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      try {
        const rows = await fetchData(password);
        setSubmissions(rows);
        setAuthPassword(password);
        setIsLoggedIn(true);
      } catch (err: unknown) {
        if (err instanceof Error && err.message === 'UNAUTHORIZED') {
          setError('비밀번호가 올바르지 않습니다.');
        } else {
          setError('데이터를 불러오는 중 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    },
    [password, fetchData],
  );

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const rows = await fetchData(authPassword);
      setSubmissions(rows);
    } catch {
      setError('새로고침 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [authPassword, fetchData]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center px-5">
        <div className="w-full max-w-[400px] bg-white rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="text-2xl font-bold text-[#191f28] mb-1">관리자 로그인</div>
            <p className="text-sm text-[#8b95a1]">LANDING LAB 어드민</p>
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
              className="w-full py-4 rounded-2xl bg-[#191f28] text-white font-semibold text-[15px] disabled:bg-[#e5e8eb] disabled:text-[#aeb5bc] transition-colors"
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

        {error && (
          <div className="mb-4 p-3 bg-red-50 rounded-xl text-sm text-red-600">{error}</div>
        )}

        {submissions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-[#8b95a1] text-sm">
            아직 제출된 의뢰가 없습니다.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {submissions.map((sub) => {
              const isOpen = expandedId === sub.id;
              const date = sub.created_at
                ? new Date(sub.created_at).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
                : '-';
              return (
                <div
                  key={sub.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#f2f4f6]"
                >
                  <button
                    className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-[#fafafa] transition-colors"
                    onClick={() => setExpandedId(isOpen ? null : sub.id)}
                  >
                    <div>
                      <p className="text-[15px] font-bold text-[#191f28]">
                        {sub.brand_name || '(브랜드명 없음)'}
                      </p>
                      <p className="text-[13px] text-[#8b95a1] mt-0.5">
                        {sub.main_menu} · {date}
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
                                {String(val)}
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
