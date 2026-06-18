import { FormData } from '@/lib/types';
import FormField from './FormField';

const cls =
  'w-full px-4 py-3.5 rounded-xl border border-[#e5e8eb] text-[#191f28] text-[15px] placeholder:text-[#aeb5bc] focus:outline-none focus:border-[#3182f6] focus:ring-1 focus:ring-[#3182f6] transition-colors bg-white';

interface Props {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
}

export default function Step4({ formData, updateField }: Props) {
  return (
    <div>
      <div className="mb-8">
        <div className="text-xs font-bold text-[#3182f6] tracking-widest mb-2">STEP 4 / 9</div>
        <h2 className="text-[24px] font-bold text-[#191f28] leading-tight">
          창업 비용
        </h2>
        <p className="text-[14px] text-[#8b95a1] mt-2">
          랜딩페이지에 표시될 창업 비용 항목이에요
        </p>
      </div>

      <FormField label="가맹비" required>
        <input
          type="text"
          value={formData.franchiseFee}
          onChange={(e) => updateField('franchiseFee', e.target.value)}
          placeholder="예: 500만원"
          className={cls}
        />
      </FormField>

      <FormField label="인테리어비" required>
        <input
          type="text"
          value={formData.interiorCost}
          onChange={(e) => updateField('interiorCost', e.target.value)}
          placeholder="예: 평당 150만원"
          className={cls}
        />
      </FormField>

      <FormField label="초도물류비" required>
        <input
          type="text"
          value={formData.initialLogisticsCost}
          onChange={(e) => updateField('initialLogisticsCost', e.target.value)}
          placeholder="예: 200만원"
          className={cls}
        />
      </FormField>

      <FormField label="총 예상 창업비용" required hint="위 항목들의 합산 기준으로 작성해주세요">
        <input
          type="text"
          value={formData.totalEstimatedCost}
          onChange={(e) => updateField('totalEstimatedCost', e.target.value)}
          placeholder="예: 8,000만원"
          className={cls}
        />
      </FormField>
    </div>
  );
}
