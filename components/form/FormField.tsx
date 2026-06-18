interface FormFieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

export default function FormField({ label, required, hint, children }: FormFieldProps) {
  return (
    <div className="mb-5">
      <label className="block text-[15px] font-semibold text-[#191f28] mb-1.5">
        {label}
        {required && <span className="text-[#3182f6] ml-0.5">*</span>}
        {!required && <span className="text-[#aeb5bc] text-xs font-normal ml-1.5">선택</span>}
      </label>
      {hint && <p className="text-sm text-[#8b95a1] mb-2 leading-relaxed">{hint}</p>}
      {children}
    </div>
  );
}
