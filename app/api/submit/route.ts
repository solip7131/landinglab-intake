import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { sendSubmissionEmail } from '@/lib/email';
import { FormData } from '@/lib/types';

export async function POST(request: NextRequest) {
  let body: FormData;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { error } = await getSupabase().from('submissions').insert([{
    brand_name:             body.brandName,
    main_menu:              body.mainMenu,
    founded_year:           body.foundedYear,
    slogan:                 body.slogan,
    strengths:              body.strengths,
    differentiation:        body.differentiation,
    avg_monthly_sales:      body.avgMonthlySales,
    avg_net_profit:         body.avgNetProfit,
    food_cost_ratio:        body.foodCostRatio,
    direct_store_count:     body.directStoreCount,
    direct_store_names:     body.directStoreNames,
    franchise_store_count:  body.franchiseStoreCount,
    franchise_store_names:  body.franchiseStoreNames,
    franchise_fee:          body.franchiseFee,
    interior_cost:          body.interiorCost,
    initial_logistics_cost: body.initialLogisticsCost,
    total_estimated_cost:   body.totalEstimatedCost,
    has_royalty:            body.hasRoyalty,
    royalty_details:        body.royaltyDetails,
    training_fee:           body.trainingFee,
    marketing_support:      body.marketingSupport,
    supply_method:          body.supplyMethod,
    other_support:          body.otherSupport,
    special_benefits:       body.specialBenefits,
    consultation_phone:     body.consultationPhone,
    kakao_channel:          body.kakaoChannel,
    consultation_hours:     body.consultationHours,
    company_name:           body.companyName,
    ceo_name:               body.ceoName,
    business_number:        body.businessNumber,
    address:                body.address,
    main_phone:             body.mainPhone,
    business_email:         body.businessEmail,
    emphasis_points:        body.emphasisPoints,
    reference_urls:         body.referenceUrls,
    additional_notes:       body.additionalNotes,
  }]);

  if (error) {
    console.error('Supabase insert error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 이메일 전송 실패해도 제출은 성공 처리
  try {
    await sendSubmissionEmail(body);
  } catch (err) {
    console.error('Email error:', err);
  }

  return NextResponse.json({ success: true });
}
