-- Supabase SQL 편집기에서 실행하세요
-- Dashboard → SQL Editor → New query → 아래 내용 붙여넣기 → Run

CREATE TABLE IF NOT EXISTS submissions (
  id                     BIGSERIAL PRIMARY KEY,
  created_at             TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  brand_name             TEXT,
  main_menu              TEXT,
  founded_year           TEXT,
  slogan                 TEXT,
  strengths              TEXT,
  differentiation        TEXT,
  avg_monthly_sales      TEXT,
  avg_net_profit         TEXT,
  food_cost_ratio        TEXT,
  direct_store_count     TEXT,
  direct_store_names     TEXT,
  franchise_store_count  TEXT,
  franchise_store_names  TEXT,
  franchise_fee          TEXT,
  interior_cost          TEXT,
  initial_logistics_cost TEXT,
  total_estimated_cost   TEXT,
  has_royalty            TEXT,
  royalty_details        TEXT,
  training_fee           TEXT,
  marketing_support      TEXT,
  supply_method          TEXT,
  other_support          TEXT,
  special_benefits       TEXT,
  consultation_phone     TEXT,
  kakao_channel          TEXT,
  consultation_hours     TEXT,
  company_name           TEXT,
  ceo_name               TEXT,
  business_number        TEXT,
  address                TEXT,
  main_phone             TEXT,
  business_email         TEXT,
  emphasis_points        TEXT,
  reference_urls         TEXT,
  additional_notes       TEXT
);

-- service_role 키를 사용하므로 RLS 비활성화 (서버 사이드 전용)
ALTER TABLE submissions DISABLE ROW LEVEL SECURITY;
