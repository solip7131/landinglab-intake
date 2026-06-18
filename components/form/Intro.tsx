export default function Intro() {
  return (
    <div className="flex flex-col h-full pt-10 pb-4">
      <div className="mb-10">
        <div className="text-sm font-bold text-[#3182f6] tracking-widest mb-6">LANDING LAB</div>
        <h1 className="text-[28px] font-bold text-[#191f28] leading-tight mb-5">
          가맹모집 랜딩페이지,
          <br />
          지금 바로 시작해보세요
        </h1>
        <p className="text-[16px] text-[#6b7684] leading-relaxed">
          브랜드 정보를 꼼꼼히 작성할수록
          <br />
          예비 창업자의 관심도가 높아집니다.
          <br />약 5~10분 정도 소요됩니다.
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        {[
          { icon: '📋', text: '9가지 항목 입력' },
          { icon: '⚡', text: '5~10분 소요' },
          { icon: '📱', text: '영업일 1~2일 내 연락' },
        ].map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-3 bg-[#f9fafb] rounded-xl px-4 py-3"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-[14px] font-medium text-[#4e5968]">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
