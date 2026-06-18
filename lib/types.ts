export interface FormData {
  // Step 1 — 브랜드 기본 정보
  brandName: string;
  mainMenu: string;
  foundedYear: string;
  slogan: string;
  storeType: '' | '홀매장' | '배달매장' | '하이브리드매장';

  // Step 2 — 브랜드 특장점
  strengths: string;
  differentiation: string;
  brandLinks: string;

  // Step 3 — 핵심 숫자
  avgMonthlySales: string;
  avgNetProfit: string;
  foodCostRatio: string;
  directStoreCount: string;
  directStoreNames: string;
  franchiseStoreCount: string;
  franchiseStoreNames: string;

  // Step 4 — 창업 비용
  franchiseFee: string;
  interiorCost: string;
  initialLogisticsCost: string;
  totalEstimatedCost: string;

  // Step 5 — 본사 지원 & 로열티
  hasRoyalty: '' | 'yes' | 'no';
  royaltyDetails: string;
  trainingFee: string;
  marketingSupport: string;
  supplyMethod: string;
  otherSupport: string;
  specialBenefits: string;

  // Step 6 — 가맹 상담 연락처
  consultationPhone: string;
  kakaoChannel: string;
  consultationHours: string;

  // Step 8 — 사업자 정보
  companyName: string;
  ceoName: string;
  businessNumber: string;
  address: string;
  mainPhone: string;
  businessEmail: string;

  // Step 9 — 추가 요청사항
  emphasisPoints: string;
  referenceUrls: string;
  additionalNotes: string;
}

export const initialFormData: FormData = {
  brandName: '',
  mainMenu: '',
  foundedYear: '',
  slogan: '',
  storeType: '',
  strengths: '',
  differentiation: '',
  brandLinks: '',
  avgMonthlySales: '',
  avgNetProfit: '',
  foodCostRatio: '',
  directStoreCount: '',
  directStoreNames: '',
  franchiseStoreCount: '',
  franchiseStoreNames: '',
  franchiseFee: '',
  interiorCost: '',
  initialLogisticsCost: '',
  totalEstimatedCost: '',
  hasRoyalty: '',
  royaltyDetails: '',
  trainingFee: '',
  marketingSupport: '',
  supplyMethod: '',
  otherSupport: '',
  specialBenefits: '',
  consultationPhone: '',
  kakaoChannel: '',
  consultationHours: '',
  companyName: '',
  ceoName: '',
  businessNumber: '',
  address: '',
  mainPhone: '',
  businessEmail: '',
  emphasisPoints: '',
  referenceUrls: '',
  additionalNotes: '',
};

export interface AdminSubmission {
  제출일시: string;
  브랜드명: string;
  주메뉴: string;
  창업연도: string;
  슬로건: string;
  브랜드강점: string;
  차별점: string;
  평균월매출: string;
  평균순이익: string;
  식자재원가율: string;
  직영점수: string;
  직영점목록: string;
  가맹점수: string;
  가맹점목록: string;
  가맹비: string;
  보증금: string;
  인테리어비: string;
  초도물류비: string;
  총창업비용: string;
  로열티여부: string;
  로열티상세: string;
  교육비: string;
  마케팅지원: string;
  식자재공급: string;
  기타지원: string;
  특별혜택: string;
  상담전화: string;
  카카오채널: string;
  상담시간: string;
  상호명: string;
  대표자명: string;
  사업자번호: string;
  주소: string;
  대표전화: string;
  이메일: string;
  강조포인트: string;
  참고URL: string;
  기타전달사항: string;
  [key: string]: string;
}
