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
        hint="독자 개발 소스, 특허 조리법, 수상 이력 등 구체적으로 적어주세요"
      >
        <textarea
          value={formData.strengths}
          onChange={(e) => updateField('strengths', e.target.value)}
          placeholder="예: 20년 노하우의 독자 개발 소스 보유, 2023 대한민국 프랜차이즈 대상 수상"
          rows={4}
          className={textareaCls}
        />
      </FormField>

      <FormField
        label="경쟁 브랜드 대비 차별점"
        required
        hint="비슷한 업종의 다른 브랜드와 어떻게 다른지 적어주세요"
      >
        <textarea
          value={formData.differentiation}
          onChange={(e) => updateField('differentiation', e.target.value)}
          placeholder="예: 경쟁사 대비 낮은 로열티, 365일 본사 A/S 지원, 메뉴 정기 업데이트"
          rows={4}
          className={textareaCls}
        />
      </FormField>
    </div>
  );
}
