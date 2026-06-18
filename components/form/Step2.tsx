import { FormData } from '@/lib/types';
import FormField from './FormField';

const textareaCls =
  'w-full px-4 py-3.5 rounded-xl border border-[#e5e8eb] text-[#191f28] text-[15px] placeholder:text-[#aeb5bc] focus:outline-none focus:border-[#3182f6] focus:ring-1 focus:ring-[#3182f6] transition-colors bg-white resize-none leading-relaxed';

interface Props {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
}

export default function Step2({ formData, updateField }: Props) {
  return (
    <div>
      <div className="mb-8">
        <div className="text-xs font-bold text-[#3182f6] tracking-widest mb-2">STEP 2 / 9</div>
        <h2 className="text-[24px] font-bold text-[#191f28] leading-tight">
          브랜드 특장점
        </h2>
      </div>

      <FormField
        label="우리 브랜드만의 강점"
        required
        hint="숫자와 사실로 말해주세요. 막연한 표현보다 구체적인 수치가 예비 가맹점주의 신뢰를 만듭니다."
      >
        <textarea
          value={formData.strengths}
          onChange={(e) => updateField('strengths', e.target.value)}
          placeholder="예: 조리 시간 단 5분 / 시그니처 메뉴 보유 / 재주문율 68% / 객단가 평균 3만원"
          rows={4}
          className={textareaCls}
        />
      </FormField>

      <FormField
        label="경쟁 브랜드 대비 차별점"
        required
        hint="'왜 우리 브랜드여야 하는가'에 대한 답을 적어주세요. 가격, 맛, 운영 방식, 본사 지원 등 어떤 면에서도 좋아요."
      >
        <textarea
          value={formData.differentiation}
          onChange={(e) => updateField('differentiation', e.target.value)}
          placeholder="예: 본사 직배송으로 식재료 수급 걱정 없음 / 타 브랜드 대비 낮은 초기 창업비용 / 조리 공정 단순화로 아르바이트 의존도 최소화"
          rows={4}
          className={textareaCls}
        />
      </FormField>
    </div>
  );
}
