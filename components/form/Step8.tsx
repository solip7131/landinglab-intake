import { FormData } from '@/lib/types';
import FormField from './FormField';

const cls =
  'w-full px-4 py-3.5 rounded-xl border border-[#e5e8eb] text-[#191f28] text-[15px] placeholder:text-[#aeb5bc] focus:outline-none focus:border-[#3182f6] focus:ring-1 focus:ring-[#3182f6] transition-colors bg-white';

interface Props {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
}

export default function Step8({ formData, updateField }: Props) {
  return (
    <div>
      <div className="mb-8">
        <div className="text-xs font-bold text-[#3182f6] tracking-widest mb-2">STEP 8 / 9</div>
        <h2 className="text-[24px] font-bold text-[#191f28] leading-tight">
          사업자 정보
        </h2>
        <p className="text-[14px] text-[#8b95a1] mt-2">
          랜딩페이지 하단 푸터에 들어갈 정보예요
        </p>
      </div>

      <FormField label="상호명" required>
        <input
          type="text"
          value={formData.companyName}
          onChange={(e) => updateField('companyName', e.target.value)}
          placeholder="예: (주)홍길동에프앤비"
          className={cls}
        />
      </FormField>

      <FormField label="대표자명" required>
        <input
          type="text"
          value={formData.ceoName}
          onChange={(e) => updateField('ceoName', e.target.value)}
          placeholder="예: 홍길동"
          className={cls}
        />
      </FormField>

      <FormField label="사업자등록번호" required>
        <input
          type="text"
          value={formData.businessNumber}
          onChange={(e) => updateField('businessNumber', e.target.value)}
          placeholder="예: 123-45-67890"
          className={cls}
        />
      </FormField>

      <FormField label="주소" required>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => updateField('address', e.target.value)}
          placeholder="예: 서울특별시 강남구 테헤란로 123"
          className={cls}
        />
      </FormField>

      <FormField label="대표 전화번호" required>
        <input
          type="tel"
          value={formData.mainPhone}
          onChange={(e) => updateField('mainPhone', e.target.value)}
          placeholder="예: 02-1234-5678"
          className={cls}
        />
      </FormField>

      <FormField label="이메일" required>
        <input
          type="email"
          value={formData.businessEmail}
          onChange={(e) => updateField('businessEmail', e.target.value)}
          placeholder="예: contact@brand.co.kr"
          className={cls}
        />
      </FormField>
    </div>
  );
}
