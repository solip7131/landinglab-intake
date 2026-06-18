// ============================================================
//  리즈랩 가맹모집 의뢰 폼 — Google Apps Script
//  배포: 확장 프로그램 → Apps Script → 배포 → 새 배포 → 웹 앱
//  실행 계정: 본인 계정 / 액세스 권한: 모든 사용자
// ============================================================

const SHEET_NAME = 'Submissions';

// 스크립트 속성에서 이메일 읽기
// 설정 방법: 프로젝트 설정 → 스크립트 속성 → ADMIN_EMAIL 추가
function getAdminEmail() {
  return PropertiesService.getScriptProperties().getProperty('ADMIN_EMAIL');
}

// ── POST: 폼 제출 처리 ──────────────────────────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    if (sheet.getLastRow() === 0) {
      addHeaders(sheet);
    }

    sheet.appendRow(buildRow(data));
    sendEmailNotification(data);

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

// ── GET: 어드민 목록 조회 ────────────────────────────────────
function doGet(e) {
  const action = e.parameter.action;

  if (action === 'list') {
    try {
      const sheet = getOrCreateSheet();
      const allData = sheet.getDataRange().getValues();

      if (allData.length <= 1) {
        return jsonResponse({ rows: [] });
      }

      const headers = allData[0];
      const rows = allData.slice(1).map(function (row) {
        const obj = {};
        headers.forEach(function (header, i) {
          obj[header] = row[i] instanceof Date
            ? Utilities.formatDate(row[i], Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm')
            : String(row[i] ?? '');
        });
        return obj;
      });

      return jsonResponse({ rows: rows });
    } catch (err) {
      return jsonResponse({ error: err.toString() });
    }
  }

  return jsonResponse({ error: 'Unknown action' });
}

// ── 헬퍼 함수 ────────────────────────────────────────────────
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function addHeaders(sheet) {
  const headers = [
    '제출일시', '브랜드명', '주메뉴', '창업연도', '슬로건',
    '브랜드강점', '차별점',
    '평균월매출', '평균순이익', '식자재원가율',
    '직영점수', '직영점목록', '가맹점수', '가맹점목록',
    '가맹비', '인테리어비', '초도물류비', '총창업비용',
    '로열티여부', '로열티상세', '교육비', '마케팅지원', '식자재공급', '기타지원', '특별혜택',
    '상담전화', '카카오채널', '상담시간',
    '상호명', '대표자명', '사업자번호', '주소', '대표전화', '이메일',
    '강조포인트', '참고URL', '기타전달사항'
  ];
  sheet.appendRow(headers);

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#1a1f2e');
  headerRange.setFontColor('#ffffff');
  sheet.setFrozenRows(1);
}

function buildRow(d) {
  return [
    new Date(),
    d.brandName        || '',
    d.mainMenu         || '',
    d.foundedYear      || '',
    d.slogan           || '',
    d.strengths        || '',
    d.differentiation  || '',
    d.avgMonthlySales  || '',
    d.avgNetProfit     || '',
    d.foodCostRatio    || '',
    d.directStoreCount   || '',
    d.directStoreNames   || '',
    d.franchiseStoreCount || '',
    d.franchiseStoreNames || '',
    d.franchiseFee          || '',
    d.interiorCost          || '',
    d.initialLogisticsCost  || '',
    d.totalEstimatedCost    || '',
    d.hasRoyalty === 'yes' ? '있음' : '없음',
    d.royaltyDetails   || '',
    d.trainingFee      || '',
    d.marketingSupport || '',
    d.supplyMethod     || '',
    d.otherSupport     || '',
    d.specialBenefits  || '',
    d.consultationPhone || '',
    d.kakaoChannel      || '',
    d.consultationHours || '',
    d.companyName      || '',
    d.ceoName          || '',
    d.businessNumber   || '',
    d.address          || '',
    d.mainPhone        || '',
    d.businessEmail    || '',
    d.emphasisPoints   || '',
    d.referenceUrls    || '',
    d.additionalNotes  || '',
  ];
}

function sendEmailNotification(d) {
  const adminEmail = getAdminEmail();
  if (!adminEmail) return;

  const subject = '[리즈랩] 새 의뢰 접수: ' + (d.brandName || '미입력');

  const body = [
    '새로운 가맹모집 랜딩페이지 제작 의뢰가 접수되었습니다.',
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━',
    '■ 브랜드 기본 정보',
    '━━━━━━━━━━━━━━━━━━━━━━━━',
    '브랜드명: '  + (d.brandName   || '-'),
    '주메뉴: '   + (d.mainMenu    || '-'),
    '창업연도: '  + (d.foundedYear || '-'),
    '',
    '■ 핵심 숫자',
    '평균 월매출: ' + (d.avgMonthlySales  || '-'),
    '평균 순이익: ' + (d.avgNetProfit     || '-'),
    '직영점: '    + (d.directStoreCount  || '0') + '개',
    '가맹점: '    + (d.franchiseStoreCount || '0') + '개',
    '',
    '■ 상담 연락처',
    '전화: '    + (d.consultationPhone || '-'),
    '상담 시간: ' + (d.consultationHours || '-'),
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━',
    'Google Sheets에서 전체 내용을 확인하세요.',
  ].join('\n');

  MailApp.sendEmail({ to: adminEmail, subject: subject, body: body });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
