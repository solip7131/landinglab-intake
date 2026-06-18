import { FormData } from '@/lib/types';
import FormField from './FormField';

const cls =
  'w-full px-4 py-3.5 rounded-xl border border-[#e5e8eb] text-[#191f28] text-[15px] placeholder:text-[#aeb5bc] focus:outline-none focus:border-[#3182f6] focus:ring-1 focus:ring-[#3182f6] transition-colors bg-white';

interface Props {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
}

export default function Step1({ formData, updateField }: Props) {
  return (
    <div>
      <div className="mb-8">
        <div className="text-xs font-bold text-[#3182f6] tracking-widest mb-2">STEP 1 / 9</div>
        <h2 className="text-[24px] font-bold text-[#191f28] leading-tight">
          브랜드 기본 정보
        </h2>
      </div>

      <FormField label="브랜드명" required>
        <input
          type="text"
          value={formData.brandName}
          onChange={(e) => updateField('brandName', e.target.value)}
          placeholder="예: 홍길동 떡볶이"
          className={cls}
        />
      </FormField>

      <FormField label="주메뉴" required hint="대표 메뉴를 간략히 적어주세요">
        <input
          type="text"
          value={formData.mainMenu}
          onChange={(e) => updateField('mainMenu', e.target.value)}
          placeholder="예: 떡볶이 / 치킨 / 한식"
          className={cls}
        />
      </FormField>

      <FormField label="창업연도" required>
        <input
          type="number"
          value={formData.foundedYear}
          onChange={(e) => updateField('foundedYear', e.target.value)}
          placeholder="예: 2019"
          min="1900"
          max="2030"
          className={cls}
        />
      </FormField>

      <FormField label="브랜드 슬로건">
        <input
          type="text"
          value={formData.slogan}
          onChange={(e) => updateField('slogan', e.target.value)}
          placeholder="예: 매운맛의 정석"
          className={cls}
        />
      </FormField>
    </div>
  );
}
