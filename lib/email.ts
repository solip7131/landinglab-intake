import nodemailer from 'nodemailer';
import { FormData } from './types';

export async function sendSubmissionEmail(data: FormData) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!adminEmail || !smtpUser || !smtpPass) return;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: smtpUser, pass: smtpPass },
  });

  const subject = `[랜딩랩] 새 의뢰 접수: ${data.brandName || '미입력'}`;

  const text = [
    '새로운 가맹모집 랜딩페이지 제작 의뢰가 접수되었습니다.',
    '',
    '■ 브랜드 기본 정보',
    `브랜드명: ${data.brandName || '-'}`,
    `주메뉴: ${data.mainMenu || '-'}`,
    `창업연도: ${data.foundedYear || '-'}`,
    '',
    '■ 핵심 숫자',
    `평균 월매출: ${data.avgMonthlySales || '-'}`,
    `평균 순이익: ${data.avgNetProfit || '-'}`,
    `직영점: ${data.directStoreCount || '0'}개`,
    `가맹점: ${data.franchiseStoreCount || '0'}개`,
    '',
    '■ 상담 연락처',
    `전화: ${data.consultationPhone || '-'}`,
    `상담 시간: ${data.consultationHours || '-'}`,
    '',
    'Supabase 대시보드에서 전체 내용을 확인하세요.',
  ].join('\n');

  await transporter.sendMail({ from: smtpUser, to: adminEmail, subject, text });
}
