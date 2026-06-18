interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full px-5 pt-5 pb-3">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-[#8b95a1]">
          {current} / {total}
        </span>
        <span className="text-xs font-semibold text-[#3182f6]">{pct}%</span>
      </div>
      <div className="w-full h-1.5 bg-[#e5e8eb] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#191f28] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
