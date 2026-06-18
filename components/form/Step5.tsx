import { FormData } from '@/lib/types';
import FormField from './FormField';

const cls =
  'w-full px-4 py-3.5 rounded-xl border border-[#e5e8eb] text-[#191f28] text-[15px] placeholder:text-[#aeb5bc] focus:outline-none focus:border-[#3182f6] focus:ring-1 focus:ring-[#3182f6] transition-colors bg-white';
const textareaCls = `${cls} resize-none leading-relaxed`;

interface Props {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
}

export default function Step5({ formData, updateField }: Props) {
  return (
    <div>
      <div className="mb-8">
        <div className="text-xs font-bold text-[#3182f6] tracking-widest mb-2">STEP 5 / 9</div>
        <h2 className="text-[24px] font-bold text-[#191f28] leading-tight">
          본사 지원 & 로열티
        </h2>
      </div>

      <FormField label="로열티 여부" required>
        <div className="flex gap-3">
          {(['yes', 'no'] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => updateField('hasRoyalty', opt)}
              className={`flex-1 py-3.5 rounded-xl border-2 font-semibold text-[15px] transition-all active:scale-[0.98] ${
                formData.hasRoyalty === opt
                  ? 'border-[#191f28] bg-[#191f28] text-white'
                  : 'border-[#e5e8eb] bg-white text-[#4e5968]'
              }`}
            >
              {opt === 'yes' ? '있음' : '없음'}
            </button>
          ))}
        </div>
      </FormField>

      {formData.hasRoyalty === 'yes' && (
        <FormField label="로열티 금액 / 방식" required>
          <input
            type="text"
            value={formData.royaltyDetails}
            onChange={(e) => updateField('royaltyDetails', e.target.value)}
            placeholder="예: 월 30만원 / 매출의 2%"
            className={cls}
          />
        </FormField>
      )}

      <FormField label="교육비" required>
        <input
          type="text"
          value={formData.trainingFee}
          onChange={(e) => updateField('trainingFee', e.target.value)}
          placeholder="예: 100만원 / 무료"
          className={cls}
        />
      </FormField>

      <FormField label="마케팅 지원 내용" required>
        <textarea
          value={formData.marketingSupport}
          onChange={(e) => updateField('marketingSupport', e.target.value)}
          placeholder="예: SNS 광고, 개점 현수막 지원, 전단지 1,000매 제공"
          rows={3}
          className={textareaCls}
        />
      </FormField>

      <FormField label="식자재 공급 방식" required>
        <textarea
          value={formData.supplyMethod}
          onChange={(e) => updateField('supplyMethod', e.target.value)}
          placeholder="예: 본사 직배송, 주 2회"
          rows={2}
          className={textareaCls}
        />
      </FormField>

      <FormField label="기타 본사 지원 항목">
        <textarea
          value={formData.otherSupport}
          onChange={(e) => updateField('otherSupport', e.target.value)}
          placeholder="예: 전담 슈퍼바이저 배정, 폐업 시 식자재 환불"
          rows={3}
          className={textareaCls}
        />
      </FormField>

      <FormField label="특별 혜택">
        <textarea
          value={formData.specialBenefits}
          onChange={(e) => updateField('specialBenefits', e.target.value)}
          placeholder="예: 선착순 10호점까지 교육비 50% 할인"
          rows={2}
          className={textareaCls}
        />
      </FormField>
    </div>
  );
}
