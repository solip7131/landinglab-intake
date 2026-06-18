import { FormData } from '@/lib/types';
import FormField from './FormField';

const cls =
  'w-full px-4 py-3.5 rounded-xl border border-[#e5e8eb] text-[#191f28] text-[15px] placeholder:text-[#aeb5bc] focus:outline-none focus:border-[#3182f6] focus:ring-1 focus:ring-[#3182f6] transition-colors bg-white';
const textareaCls = `${cls} resize-none leading-relaxed`;

interface Props {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
}

export default function Step3({ formData, updateField }: Props) {
  const directCount = parseInt(formData.directStoreCount) || 0;
  const franchiseCount = parseInt(formData.franchiseStoreCount) || 0;

  return (
    <div>
      <div className="mb-8">
        <div className="text-xs font-bold text-[#3182f6] tracking-widest mb-2">STEP 3 / 9</div>
        <h2 className="text-[24px] font-bold text-[#191f28] leading-tight">
          핵심 숫자
        </h2>
        <p className="text-[14px] text-[#8b95a1] mt-2">
          예비 창업자가 가장 먼저 보는 숫자들이에요
        </p>
      </div>

      <FormField label="평균 월매출" required>
        <input
          type="text"
          value={formData.avgMonthlySales}
          onChange={(e) => updateField('avgMonthlySales', e.target.value)}
          placeholder="예: 3,500만원"
          className={cls}
        />
      </FormField>

      <FormField label="평균 순이익률 또는 순수익" required>
        <input
          type="text"
          value={formData.avgNetProfit}
          onChange={(e) => updateField('avgNetProfit', e.target.value)}
          placeholder="예: 25% 또는 800만원"
          className={cls}
        />
      </FormField>

      <FormField label="식자재 원가율" required>
        <input
          type="text"
          value={formData.foodCostRatio}
          onChange={(e) => updateField('foodCostRatio', e.target.value)}
          placeholder="예: 28%"
          className={cls}
        />
      </FormField>

      <div className="border-t border-[#f2f4f6] my-6" />

      <FormField label="현재 직영점 수" required>
        <input
          type="number"
          value={formData.directStoreCount}
          onChange={(e) => updateField('directStoreCount', e.target.value)}
          placeholder="예: 3"
          min="0"
          className={cls}
        />
      </FormField>

      {directCount > 0 && (
        <FormField label="직영점 지점명 전체" required>
          <textarea
            value={formData.directStoreNames}
            onChange={(e) => updateField('directStoreNames', e.target.value)}
            placeholder="예: 강남점, 홍대점, 신촌점"
            rows={2}
            className={textareaCls}
          />
        </FormField>
      )}

      <FormField label="현재 가맹점 수" required>
        <input
          type="number"
          value={formData.franchiseStoreCount}
          onChange={(e) => updateField('franchiseStoreCount', e.target.value)}
          placeholder="예: 12"
          min="0"
          className={cls}
        />
      </FormField>

      {franchiseCount > 0 && (
        <FormField label="가맹점 지점명 전체" required>
          <textarea
            value={formData.franchiseStoreNames}
            onChange={(e) => updateField('franchiseStoreNames', e.target.value)}
            placeholder="예: 수원점, 인천점, 부산점..."
            rows={3}
            className={textareaCls}
          />
        </FormField>
      )}
    </div>
  );
}
