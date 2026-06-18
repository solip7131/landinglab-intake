import { FormData } from '@/lib/types';
import FormField from './FormField';

const cls =
  'w-full px-4 py-3.5 rounded-xl border border-[#e5e8eb] text-[#191f28] text-[15px] placeholder:text-[#aeb5bc] focus:outline-none focus:border-[#3182f6] focus:ring-1 focus:ring-[#3182f6] transition-colors bg-white';

interface Props {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
}

export default function Step6({ formData, updateField }: Props) {
  return (
    <div>
      <div className="mb-8">
        <div className="text-xs font-bold text-[#3182f6] tracking-widest mb-2">STEP 6 / 9</div>
        <h2 className="text-[24px] font-bold text-[#191f28] leading-tight">
          가맹 상담 연락처
        </h2>
        <p className="text-[14px] text-[#8b95a1] mt-2">
          랜딩페이지 CTA 버튼에 들어갈 정보예요
        </p>
      </div>

      <FormField label="가맹상담 전화번호" required>
        <input
          type="tel"
          value={formData.consultationPhone}
          onChange={(e) => updateField('consultationPhone', e.target.value)}
          placeholder="예: 02-1234-5678"
          className={cls}
        />
      </FormField>

      <FormField label="카카오채널 또는 오픈채팅 링크">
        <input
          type="text"
          value={formData.kakaoChannel}
          onChange={(e) => updateField('kakaoChannel', e.target.value)}
          placeholder="예: https://open.kakao.com/..."
          className={cls}
        />
      </FormField>

      <FormField label="상담 가능 시간" required>
        <input
          type="text"
          value={formData.consultationHours}
          onChange={(e) => updateField('consultationHours', e.target.value)}
          placeholder="예: 평일 10:00~18:00"
          className={cls}
        />
      </FormField>
    </div>
  );
}
