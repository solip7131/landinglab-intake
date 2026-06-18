import { FormData } from '@/lib/types';
import FormField from './FormField';

const cls =
  'w-full px-4 py-3.5 rounded-xl border border-[#e5e8eb] text-[#191f28] text-[15px] placeholder:text-[#aeb5bc] focus:outline-none focus:border-[#3182f6] focus:ring-1 focus:ring-[#3182f6] transition-colors bg-white';
const textareaCls = `${cls} resize-none leading-relaxed`;

interface Props {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
}

export default function Step9({ formData, updateField }: Props) {
  return (
    <div>
      <div className="mb-8">
        <div className="text-xs font-bold text-[#3182f6] tracking-widest mb-2">STEP 9 / 9</div>
        <h2 className="text-[24px] font-bold text-[#191f28] leading-tight">
          추가 요청사항
        </h2>
        <p className="text-[14px] text-[#8b95a1] mt-2">
          모두 선택 항목이에요. 없으면 바로 제출하세요 :)
        </p>
      </div>

      <FormField label="강조하고 싶은 포인트">
        <textarea
          value={formData.emphasisPoints}
          onChange={(e) => updateField('emphasisPoints', e.target.value)}
          placeholder="예: 빠른 회전율, 소자본 창업 가능, 1인 운영 가능"
          rows={3}
          className={textareaCls}
        />
      </FormField>

      <FormField label="참고하고 싶은 브랜드 또는 URL">
        <input
          type="text"
          value={formData.referenceUrls}
          onChange={(e) => updateField('referenceUrls', e.target.value)}
          placeholder="예: www.example.com / 브랜드명"
          className={cls}
        />
      </FormField>

      <FormField label="기타 전달사항">
        <textarea
          value={formData.additionalNotes}
          onChange={(e) => updateField('additionalNotes', e.target.value)}
          placeholder="작업 관련 추가로 전달할 내용을 자유롭게 적어주세요"
          rows={4}
          className={textareaCls}
        />
      </FormField>
    </div>
  );
}
