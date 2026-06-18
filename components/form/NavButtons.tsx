interface NavButtonsProps {
  showPrev: boolean;
  onPrev: () => void;
  onNext: () => void;
  isValid: boolean;
  nextLabel: string;
  isSubmitting?: boolean;
}

export default function NavButtons({
  showPrev,
  onPrev,
  onNext,
  isValid,
  nextLabel,
  isSubmitting,
}: NavButtonsProps) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-[#f0f2f4] px-5 py-4 flex gap-3 z-50">
      {showPrev && (
        <button
          type="button"
          onClick={onPrev}
          disabled={isSubmitting}
          className="w-[96px] py-4 rounded-2xl bg-[#f2f4f6] text-[#4e5968] font-semibold text-[15px] flex-shrink-0 active:scale-[0.98] transition-transform"
        >
          ← 이전
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={!isValid || isSubmitting}
        className={`flex-1 py-4 rounded-2xl font-semibold text-[15px] transition-all active:scale-[0.98] ${
          isValid && !isSubmitting
            ? 'bg-[#191f28] text-white'
            : 'bg-[#e5e8eb] text-[#aeb5bc] cursor-not-allowed'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            제출 중...
          </span>
        ) : (
          nextLabel
        )}
      </button>
    </div>
  );
}
