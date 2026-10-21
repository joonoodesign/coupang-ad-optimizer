/**
 * 주누디자인 쿠팡(쿠팡 윙) 상품·광고 최적화 센터 (coupang-ad-optimizer)
 * 지원 기기: 아이폰(iOS), 아이패드(iPadOS), PC 웹 브라우저 24시간 실시간 동기화
 */

const STORAGE_KEY = 'coupang_ad_optimizer_data_v1';
const SYNC_CONFIG_KEY = 'coupang_ad_optimizer_sync_cfg_v1';
const THEME_KEY = 'coupang_ad_optimizer_theme';
const TUTORIAL_SEEN_KEY = 'coupang_ad_optimizer_tutorial_seen_v1';

const GH_REPO_OWNER = 'joonoodesign';
const GH_REPO_NAME = 'coupang-ad-optimizer';
const GH_DB_FILE = 'coupang_ad_sync_db.json';

function formatNum(n) {
  return Math.round(Number(n || 0)).toLocaleString('ko-KR');
}

function formatWon(n) {
  const val = Math.round(Number(n || 0));
  const prefix = val < 0 ? '-' : '';
  return `${prefix}${Math.abs(val).toLocaleString('ko-KR')}원`;
}

function showToast(msg) {
  const el = document.getElementById('toastBox');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    el.classList.remove('show');
  }, 2600);
}

function copyText(text, label = '클립보드에 복사되었습니다!') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast(label)).catch(() => fallbackCopy(text, label));
  } else {
    fallbackCopy(text, label);
  }
}

function fallbackCopy(text, label) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast(label);
}

function getDefaultData() {
  return {
    updatedAt: 1792468800000,
    vendorId: 'A00191094',
    vendorName: '주누디자인 (이정민)',
    dataSourceLabel: '실시간 연동: 주누디자인 (A00191094 | 판매중 10종 · 아이템위너 100% | 기준일: 2026-10-20)',
    threeMonthSales: 7215200,
    settlementUpcoming: 381460,
    baseline: {
      baselineDate: '2026-10-20',
      periodLabel: '2026.10.13 ~ 2026.10.19 (최근 7일)',
      totalCost: 224128,
      adSales: 586800,
      totalStoreSales: 964200,
      totalStoreUnits: 776,
      impressions: 384545,
      clicks: 1567,
      ctr: 0.41,
      avgCpc: 143,
      onlineRoas: 261.81,
      activeManualGroups: 8,
      totalManualGroups: 9,
      shortNameProductsCount: 7,
      phoneSmartBidAvg: 267
    },
    settings: {
      marginRate: 50,
      targetRoas: 350,
      targetPhoneCpc: 150
    },
    campaigns: [
      {
        id: '102834348',
        name: 'AI스마트광고',
        type: '자동운영 - 매출최적화 (PA_ALL)',
        status: 'ON',
        dailyBudget: 35000,
        targetRoas: 300,
        recommendedRoas: 320,
        adCountLabel: '자동 운영 (노출 153 / 전체 156옵션)',
        todaySpend: 5704,
        impressions: 177972,
        clicks: 830,
        ctr: 0.47,
        cost: 75308,
        orders: 10,
        units: 176,
        sales: 214800,
        roas: 285.23,
        cvr: 1.20,
        note: '목표 ROAS 300% ➔ 320% 소폭 상향으로 고전환 상품(리뷰스티커·명함·스티커) 집중 권장'
      },
      {
        id: '101858396',
        name: '02. 키워드 등록',
        type: '수동 성과형 (9개 광고그룹)',
        status: 'ON',
        dailyBudget: 40000,
        targetRoas: null,
        recommendedRoas: 350,
        adCountLabel: '10개 등록 (스티커제작 그룹 OFF 상태 발견!)',
        todaySpend: 9355,
        impressions: 206573,
        clicks: 737,
        ctr: 0.36,
        cost: 148820,
        orders: 13,
        units: 372,
        sales: 372000,
        roas: 249.97,
        cvr: 1.76,
        note: '중지된 [스티커제작] 그룹 ON 복구 + [영수증/시트지] 스마트타겟팅 CPC 300원➔150~180원 인하'
      },
      {
        id: '101494399',
        name: '빠른등록리뷰스티커 1000매 서비스 배달...',
        type: '자동운영 - 매출최적화 (단일)',
        status: 'OFF',
        dailyBudget: 30000,
        targetRoas: 300,
        recommendedRoas: 300,
        adCountLabel: '1개 (74457846344)',
        todaySpend: 0,
        impressions: 0,
        clicks: 0,
        ctr: 0,
        cost: 0,
        orders: 0,
        units: 0,
        sales: 0,
        roas: 0,
        cvr: 0,
        note: 'AI스마트광고 및 [02. 키워드 등록 > 리뷰] 그룹에서 통합 운영 중 (중복 방지 위해 OFF 유지)'
      },
      {
        id: '5387043',
        name: '스티커 (구 캠페인)',
        type: '수동 입찰 (단일)',
        status: 'OFF',
        dailyBudget: 10000,
        targetRoas: null,
        recommendedRoas: null,
        adCountLabel: '1개',
        todaySpend: 0,
        impressions: 0,
        clicks: 0,
        ctr: 0,
        cost: 0,
        orders: 0,
        units: 0,
        sales: 0,
        roas: 0,
        cvr: 0,
        note: '[02. 키워드 등록 > 스티커제작] 그룹으로 일원화 운영 (OFF 유지)'
      }
    ],
    adGroups: [
      {
        id: '202018026',
        campaignId: '101858396',
        name: '스티커제작',
        productId: '738722850',
        productName: '무료디자인 스티커 주문제작 소량스티커...',
        track: 'online',
        wasActive: false,
        isActive: true,
        targeting: 'MANUAL (수동 키워드)',
        oldBid: 100,
        oldSmartBid: null,
        newBid: 150,
        newSmartBid: null,
        actionBadge: '🚨 중지(OFF) 발견 ➔ 즉시 ON 복구',
        actionDesc: '쿠팡 판매량 2위(월 824개) 핵심 상품인데 9/28부터 광고그룹이 꺼져 있었음! 즉시 ON 활성화 및 핵심 키워드 입찰 150원 세팅'
      },
      {
        id: '202018126',
        campaignId: '101858396',
        name: '명함',
        productId: '748490137',
        productName: '명함 (판매량 1위 · 1,312개)',
        track: 'online',
        wasActive: true,
        isActive: true,
        targeting: 'MANUAL (수동 키워드)',
        oldBid: 100,
        oldSmartBid: null,
        newBid: 140,
        newSmartBid: null,
        actionBadge: '🚀 1위 효자상품 스케일업',
        actionDesc: '월 1,312개 판매 1위 상품! 상품명 SEO 확장과 함께 전환율 높은 [명함제작/고급명함/금박명함/소량명함] 입찰 경쟁력 강화'
      },
      {
        id: '202018163',
        campaignId: '101858396',
        name: '리뷰 (+서비스스티커 통합)',
        productId: '11905267494 / 11917122413',
        productName: '리뷰스티커 & 서비스스티커 (객단가 12,200원+)',
        track: 'online',
        wasActive: true,
        isActive: true,
        targeting: 'MANUAL (수동 키워드)',
        oldBid: 100,
        oldSmartBid: null,
        newBid: 160,
        newSmartBid: null,
        actionBadge: '⭐ 쿠팡 추천 Best 1 + 누락상품 편입',
        actionDesc: '쿠팡 애즈가 지목한 전환율 1위 상품(리뷰스티커) + 수동 그룹에서 빠져 있던 [서비스스티커(#11917122413)] 동시 편입으로 즉결 매출 극대화'
      },
      {
        id: '202018011',
        campaignId: '101858396',
        name: '취급주의',
        productId: '12350470478',
        productName: '취급주의 1000매 주누디자인 (9,500원~)',
        track: 'online',
        wasActive: true,
        isActive: true,
        targeting: 'MANUAL (수동 키워드)',
        oldBid: 100,
        oldSmartBid: null,
        newBid: 140,
        newSmartBid: null,
        actionBadge: '🛒 기성 고단가 키워드 확장',
        actionDesc: '기존 상품명에 [스티커] 단어조차 없던 문제를 해결하고 [택배스티커/파손주의스티커/냉동보관스티커] 수동 키워드 강화'
      },
      {
        id: '202018160',
        campaignId: '101858396',
        name: '전단지',
        productId: '907344096',
        productName: '홍보 인쇄물 맞춤제작 전단지 종이자석 봉투 배너',
        track: 'online',
        wasActive: true,
        isActive: true,
        targeting: 'MANUAL (수동 키워드)',
        oldBid: 100,
        oldSmartBid: null,
        newBid: 120,
        newSmartBid: null,
        actionBadge: '✅ 핵심 키워드 집중',
        actionDesc: '[전단지제작/종이자석/대봉투인쇄/배너제작] 실구매 키워드 위주 운영 및 무료도안/양식 키워드 제외'
      },
      {
        id: '205588346',
        campaignId: '101858396',
        name: '영수증 (빌지)',
        productId: '13537783108',
        productName: '빌지 영수증 (30일 404개 · 전화상담 주력)',
        track: 'phone',
        wasActive: true,
        isActive: true,
        targeting: 'AUTOMATIC (스마트타겟팅)',
        oldBid: 100,
        oldSmartBid: 300,
        newBid: 100,
        newSmartBid: 150,
        actionBadge: '📞 스마트 CPC 300원 ➔ 150원 (-50% 절감)',
        actionDesc: '전화상담+계좌입금 주력 상품! 스마트타겟팅 CPC 300원 과열을 150원으로 낮추고 [영수증양식/엑셀양식] 허수 클릭을 차단해 상담 유입 건수 2배 확보'
      },
      {
        id: '205680439',
        campaignId: '101858396',
        name: '시트지 (실사출력)',
        productId: '16360123820',
        productName: '맞춤 실사출력 시트지 인쇄 주문제작',
        track: 'phone',
        wasActive: true,
        isActive: true,
        targeting: 'AUTOMATIC (스마트타겟팅)',
        oldBid: 150,
        oldSmartBid: 300,
        newBid: 130,
        newSmartBid: 160,
        actionBadge: '📞 스마트 CPC 300원 ➔ 160원 (-46.7% 절감)',
        actionDesc: '대형 실사출력 전화상담 상품! 인테리어필름·다이소시트지 등 허수 유입에 300원씩 소진되던 스마트 입찰가를 160원으로 인하 및 제외키워드 적용'
      },
      {
        id: '205588324',
        campaignId: '101858396',
        name: '팜플렛 (리플렛)',
        productId: '15280821833',
        productName: '리플렛 팜플렛 디자인 인쇄 주누디자인',
        track: 'phone',
        wasActive: true,
        isActive: true,
        targeting: 'AUTOMATIC (스마트타겟팅)',
        oldBid: 100,
        oldSmartBid: 200,
        newBid: 100,
        newSmartBid: 150,
        actionBadge: '📞 스마트 CPC 200원 ➔ 150원 (-25% 절감)',
        actionDesc: '고단가 리플렛/브로슈어 전화상담 상품! 스마트타겟팅 단가를 150원으로 안정화하고 [2단리플렛/3단접지/홍보물제작] 검색어 태그 20개 보강'
      },
      {
        id: '205588227',
        campaignId: '101858396',
        name: '카달로그',
        productId: '15280825938',
        productName: '카다로그 카달로그 카탈로그 디자인 인쇄 주누디자인',
        track: 'phone',
        wasActive: true,
        isActive: true,
        targeting: 'AUTOMATIC (스마트타겟팅)',
        oldBid: 200,
        oldSmartBid: 200,
        newBid: 130,
        newSmartBid: 150,
        actionBadge: '📞 기본·스마트 CPC 200원 ➔ 130/150원 인하',
        actionDesc: '건당 수십~수백만 원 계좌입금 책자 상품! 기존 기본 CPC가 200원으로 높게 설정되어 있던 것을 130원(스마트 150원)으로 낮춰 장기 노출 유지'
      }
    ],
    products: [
      {
        id: '748490137',
        shortLabel: '명함 (1천원단위)',
        directUrl: 'https://www.coupang.com/vp/products/9039048547?itemId=26519058612&vendorItemId=4759007683',
        track: 'online',
        trackLabel: '🛒 Track B (온라인결제+상담)',
        oldName: '명함',
        newName: '주누디자인 무료디자인 명함 제작 고급 금박 코팅 소량 독특한 부동산 회사 쿠폰 명함인쇄',
        searchTags: [
          '주누디자인', '주누디자인인쇄', '명함제작', '고급명함', '금박명함',
          '소량명함', '명함인쇄', '무료디자인명함', '독특한명함', '회사명함',
          '부동산명함', '쿠폰명함', '예쁜명함', '코팅명함', '수입지명함',
          '명함주문', '대구명함', '심플명함', '식당명함', '카페명함'
        ],
        units30d: 1312,
        priceLabel: '1,000원 (상담후결제·1천원단위)',
        adStatus: '✅ AI스마트 + 수동[명함] ON',
        issueNote: '브랜드 [명함➔주누디자인] 통일 및 옵션 [상담후결제(1천원단위) 1팩] 적용 완료 (12,000원=수량 12개 결제)',
        applied: true
      },
      {
        id: '738722850',
        shortLabel: '스티커 (1천원단위)',
        directUrl: 'https://www.coupang.com/vp/products/217573425?itemId=672166950&vendorItemId=4733809722',
        track: 'online',
        trackLabel: '🛒 Track B (온라인결제+상담)',
        oldName: '무료디자인 스티커 주문제작 소량스티커 유포지 투명 도무송 인쇄 사각 원형 맞춤 초강접제작',
        newName: '주누디자인 무료디자인 스티커 제작 소량 방수 유포지 투명 원형 사각 도무송 로고 라벨 주문제작 인쇄',
        searchTags: [
          '주누디자인', '주누디자인인쇄', '스티커제작', '소량스티커', '방수스티커',
          '로고스티커', '원형스티커', '도무송스티커', '유포지스티커', '투명스티커',
          '라벨스티커', '포장스티커', '배달스티커', '상호스티커', '맞춤스티커',
          '사각스티커', '초강접스티커', '제품스티커', '답례품스티커', '스티커인쇄'
        ],
        units30d: 824,
        priceLabel: '1,000원 (상담후결제·1천원단위)',
        adStatus: '✅ 수동[스티커제작] 110원 최적화',
        issueNote: '브랜드/태그 [주누디자인] 통일 + 옵션 [상담후결제(1천원단위) 1팩] 적용 + 비검색 과소비 차단 완료',
        applied: true
      },
      {
        id: '13537783108',
        shortLabel: '빌지/영수증 (1천원단위)',
        directUrl: 'https://www.coupang.com/vp/products/9668656269?itemId=28907520329&vendorItemId=83032016599',
        track: 'phone',
        trackLabel: '📞 Track A (전화상담+계좌입금 주력)',
        oldName: '빌지 영수증',
        newName: '주누디자인 무료디자인 빌지 제작 영수증 거래명세서 주문서 계산서 NCR지 양식지 서식지 복사 인쇄 주문제작',
        searchTags: [
          '주누디자인', '주누디자인인쇄', '빌지제작', '영수증제작', '거래명세서제작',
          '주문서제작', '계산서제작', 'NCR지인쇄', '양식지제작', '서식지인쇄',
          '간이영수증제작', '식당빌지', '영수증인쇄', '납품서제작', '청구서제작',
          '복사빌지', '2매빌지', '3매빌지', '매장주문서', '입금표제작'
        ],
        units30d: 404,
        priceLabel: '1,000원 (상담후결제·1천원단위)',
        adStatus: '📞 스마트타겟팅 OFF + 수동 160원',
        issueNote: '명함과 동일하게 [상담후결제(1천원단위) 1팩] 적용하여 (1매당 1,000원) 문구 완벽 제거 완료',
        applied: true
      },
      {
        id: '907344096',
        shortLabel: '전단지/배너/봉투 (1천원단위)',
        directUrl: 'https://www.coupang.com/vp/products/266837463?itemId=836257131&vendorItemId=5128858525',
        track: 'online',
        trackLabel: '🛒 Track B (온라인결제+상담)',
        oldName: '홍보 인쇄물 맞춤제작 전단지 종이자석 봉투 배너 디자인 인쇄소',
        newName: '주누디자인 무료디자인 전단지 제작 인쇄 A4 홍보지 종이자석 스티커 대봉투 소봉투 배너 소량 대량 맞춤제작',
        searchTags: [
          '주누디자인', '주누디자인인쇄', '전단지제작', '전단지인쇄', '홍보전단지',
          'A4전단지', '소량전단지', '종이자석전단지', '배달전단지', '학원전단지',
          '오픈전단지', '봉투제작', '대봉투인쇄', '소봉투제작', '배너제작',
          '현수막제작', '자석스티커', '음식점전단지', '헬스장전단지', '전단지디자인'
        ],
        units30d: 90,
        priceLabel: '1,000원 (상담후결제·1천원단위)',
        adStatus: '✅ AI스마트 + 수동[전단지] ON',
        issueNote: '옵션 [상담후결제(1천원단위) 1팩] 및 브랜드 검색어 태그 [주누디자인] 최전방 배치 완료',
        applied: true
      },
      {
        id: '11905267494',
        shortLabel: '리뷰스티커 1000매',
        directUrl: 'https://www.coupang.com/np/search?q=%EC%A3%BC%EB%88%84%EB%94%94%EC%9E%90%EC%9D%B8+%EB%A6%AC%EB%B7%B0%EC%8A%A4%ED%8B%B0%EC%BB%A4',
        track: 'online',
        trackLabel: '🛒 Track B (온라인 즉시결제 효자)',
        oldName: '리뷰스티커 주누디자인',
        newName: '주누디자인 리뷰스티커 제작 1000매 배달 배민 요기요 쿠팡이츠 리뷰이벤트 서비스 스티커 상호문구 무료인쇄',
        searchTags: [
          '주누디자인', '주누디자인인쇄', '리뷰스티커', '배달리뷰스티커', '배민리뷰스티커',
          '서비스스티커', '리뷰이벤트스티커', '배달스티커', '포장스티커', '상호스티커',
          '쿠팡이츠스티커', '요기요스티커', '음식점스티커', '카페스티커', '도시락스티커',
          '배달용품', '리뷰유도스티커', '별점스티커', '감사스티커', '소량리뷰스티커'
        ],
        units30d: 23,
        priceLabel: '9,200원~ (+배송비 3,000원)',
        adStatus: '⭐ 쿠팡 추천 Best 1 (수동 140원)',
        issueNote: '1건 주문 시 12,200원+ 결제되는 고효율 상품! 브랜드 태그 최상단 배치로 주누디자인 검색 노출 강화',
        applied: true
      },
      {
        id: '11917122413',
        shortLabel: '서비스스티커 1000매',
        directUrl: 'https://www.coupang.com/np/search?q=%EC%A3%BC%EB%88%84%EB%94%94%EC%9E%90%EC%9D%B8+%EC%84%9C%EB%B9%84%EC%8A%A4%EC%8A%A4%ED%8B%B0%EC%BB%A4',
        track: 'online',
        trackLabel: '🛒 Track B (온라인 즉시결제 효자)',
        oldName: '서비스스티커 주누디자인',
        newName: '주누디자인 서비스스티커 제작 1000매 배달 음식점 카페 포장 서비스 증정 이벤트 스티커 상호문구 맞춤인쇄',
        searchTags: [
          '주누디자인', '주누디자인인쇄', '서비스스티커', '배달서비스스티커', '증정스티커',
          '음식점스티커', '포장스티커', '배달포장스티커', '리뷰서비스스티커', '카페스티커',
          '디저트스티커', '배민스티커', '감성스티커', '문구스티커', '상호인쇄스티커',
          '원형스티커', '음료스티커', '반찬가게스티커', '배달용품스티커', '이벤트스티커'
        ],
        units30d: 20,
        priceLabel: '9,200원~ (+배송비 3,000원)',
        adStatus: '✅ 수동[리뷰] 그룹 통합 운영',
        issueNote: '객단가 높은 기성 효자 상품! 브랜드 검색어 태그 [주누디자인/주누디자인인쇄] 최상단 반영 완료',
        applied: true
      },
      {
        id: '12350470478',
        shortLabel: '취급주의 스티커 1000매',
        directUrl: 'https://www.coupang.com/np/search?q=%EC%A3%BC%EB%88%84%EB%94%94%EC%9E%90%EC%9D%B8+%EC%B7%A8%EA%B8%89%EC%A3%BC%EC%9D%98',
        track: 'online',
        trackLabel: '🛒 Track B (온라인 즉시결제 효자)',
        oldName: '취급주의 1000매 주누디자인',
        newName: '주누디자인 취급주의 스티커 1000매 파손주의 택배 박스 배송 냉동보관 냉장보관 식품 식물 안전배송 라벨',
        searchTags: [
          '주누디자인', '주누디자인인쇄', '취급주의스티커', '파손주의스티커', '택배스티커',
          '배송스티커', '박스스티커', '냉동보관스티커', '냉장보관스티커', '식품배송스티커',
          '식물배송스티커', '깨짐주의스티커', '안전배송스티커', '우체국택배스티커', '과일박스스티커',
          '신선식품스티커', '상하주의스티커', '던지지마세요스티커', '택배포장용품', '물류스티커'
        ],
        units30d: 12,
        priceLabel: '9,500원~ (+배송비 3,000원)',
        adStatus: '✅ AI스마트 + 수동[취급주의] ON',
        issueNote: '기존 상품명에 [스티커] 단어조차 누락되어 있던 문제 해결 + 브랜드 검색태그 최전방 배치 완료',
        applied: true
      },
      {
        id: '16360123820',
        shortLabel: '실사출력 시트지 (1천원단위)',
        directUrl: 'https://www.coupang.com/vp/products/9708649887?itemId=29046743150&vendorItemId=95973682956',
        track: 'phone',
        trackLabel: '📞 Track A (전화상담+계좌입금 주력)',
        oldName: '맞춤 실사출력 시트지 인쇄 주문제작 (유포지 합성지 PVC켈지 그레이 실내외용)',
        newName: '주누디자인 맞춤 실사출력 시트지 제작 유리창 매장 광고 방수 대형 스티커 인쇄 주문제작 유포지 합성지 PVC켈지',
        searchTags: [
          '주누디자인', '주누디자인인쇄', '실사출력', '시트지제작', '글자시트지',
          '유리창시트지', '매장시트지', '광고시트지', '인쇄시트지', '방수시트지',
          '대형스티커제작', '유포지출력', '합성지출력', 'PVC시트지', '켈지출력',
          '실외용시트지', '간판시트지', '윈도우시트지', '홍보시트지', '차량용시트지'
        ],
        units30d: 1,
        priceLabel: '1,000원 (상담후결제·1천원단위)',
        adStatus: '📞 스마트타겟팅 OFF + 수동 140원',
        issueNote: '옵션 [상담후결제(1천원단위) 1세트] 적용으로 (1매당 1,000원) 표기 제거 + 광고비 과소비 차단 완료',
        applied: true
      },
      {
        id: '15280821833',
        shortLabel: '리플렛/팜플렛 (1천원단위)',
        directUrl: 'https://www.coupang.com/vp/products/8481368291?itemId=24543669446&vendorItemId=91556098512',
        track: 'phone',
        trackLabel: '📞 Track A (전화상담+계좌입금 주력)',
        oldName: '리플렛 팜플렛 디자인 인쇄 주누디자인',
        newName: '주누디자인 무료디자인 리플렛 팜플렛 제작 2단 3단 접지 브로슈어 회사 병원 학원 홍보물 안내장 소량 대량 인쇄',
        searchTags: [
          '주누디자인', '주누디자인인쇄', '리플렛제작', '팜플렛제작', '리플렛인쇄',
          '팜플렛인쇄', '브로슈어제작', '2단리플렛', '3단리플렛', '접지전단지',
          '홍보물제작', '안내장제작', '소량리플렛', '회사브로슈어', '병원리플렛',
          '학원팜플렛', '전시회리플렛', '행사팜플렛', '리플렛디자인', '팜플렛디자인'
        ],
        units30d: 1,
        priceLabel: '1,000원 (상담후결제·1천원단위)',
        adStatus: '📞 스마트타겟팅 OFF + 수동 140원',
        issueNote: '옵션 [상담후결제(1천원단위) 1팩] 적용으로 (1매당 1,000원) 표기 제거 + 스마트타겟팅 과소비 차단 완료',
        applied: true
      },
      {
        id: '15280825938',
        shortLabel: '카다로그/책자 (1천원단위)',
        directUrl: 'https://www.coupang.com/vp/products/8481372763?itemId=24543687795&vendorItemId=91556116651',
        track: 'phone',
        trackLabel: '📞 Track A (전화상담+계좌입금 주력)',
        oldName: '카다로그 카달로그 카탈로그 디자인 인쇄 주누디자인',
        newName: '주누디자인 무료디자인 카다로그 카탈로그 카달로그 제작 브로슈어 회사소개서 제품 홍보 책자 중철 무선 제본 소량 인쇄',
        searchTags: [
          '주누디자인', '주누디자인인쇄', '카다로그제작', '카탈로그제작', '카달로그제작',
          '브로슈어제작', '책자제작', '홍보책자', '회사소개서제작', '제품카다로그',
          '소량책자인쇄', '중철제본', '무선제본', '카다로그인쇄', '카탈로그인쇄',
          '기업브로슈어', '작품집제작', '안내책자', '소책자제작', '카다로그디자인'
        ],
        units30d: 0,
        priceLabel: '1,000원 (상담후결제·1천원단위)',
        adStatus: '📞 스마트타겟팅 OFF + 수동 130원',
        issueNote: '옵션 [상담후결제(1천원단위) 1팩] 적용으로 (1매당 1,000원) 표기 제거 + 스마트타겟팅 과소비 차단 완료',
        applied: true
      }
    ],
    negativeKeywords: [
      '영수증양식', '거래명세서양식', '거래명세서엑셀', '무료양식', '간이영수증양식',
      '엑셀양식', '양식다운로드', '무료도안', '미리캔버스', '시트지제거',
      '다이소시트지', '인테리어필름', '창문단열시트', '명함지갑', '명함케이스',
      '명함꽂이', '스티커제거제', '타투스티커', '네일스티커', '다꾸스티커'
    ],
    phoneOrders: [],
    dailyTrends: [
      { date: '10/13(화)', cost: 31200, sales: 82000, phoneSales: 0 },
      { date: '10/14(수)', cost: 34500, sales: 94000, phoneSales: 0 },
      { date: '10/15(목)', cost: 32800, sales: 88000, phoneSales: 0 },
      { date: '10/16(금)', cost: 35100, sales: 96800, phoneSales: 0 },
      { date: '10/17(토)', cost: 28900, sales: 68000, phoneSales: 0 },
      { date: '10/18(일)', cost: 27400, sales: 64000, phoneSales: 0 },
      { date: '10/19(월)', cost: 34228, sales: 94000, phoneSales: 0 }
    ],
    optimizationLogs: [
      {
        id: 'log-base',
        date: '2026-10-20',
        text: '[기준점 스냅샷 저장] 주누디자인(A00191094) 쿠팡 윙 전체 10개 상품 & 4개 광고 캠페인 초기 상태 기록 (최근 7일 광고비 224,128원 / 광고전환매출 586,800원 / 전체매출 964,200원 / ROAS 261.81%)'
      },
      {
        id: 'log-opt-1',
        date: '2026-10-20',
        text: '[광고 누락/중지 전수 진단] 판매량 2위(824개) 효자상품인 [02. 키워드 등록 > 스티커제작(#202018026)] 그룹이 OFF(중지)되어 있던 문제 발견 ➔ 즉시 ON 복구 및 [서비스스티커(#11917122413)] 수동광고 편입'
      },
      {
        id: 'log-opt-2',
        date: '2026-10-20',
        text: '[Track A 전화상담+계좌입금 4종 CPC 거품 제거] 빌지/영수증(#205588346, 스마트CPC 300➔150원), 실사출력 시트지(#205680439, 300➔160원), 리플렛/팜플렛(#205588324, 200➔150원), 카달로그(#205588227, 기본 200➔130원) 입찰가 최적화'
      },
      {
        id: 'log-opt-3',
        date: '2026-10-20',
        text: '[전체 10개 상품 쿠팡 SEO 상품명 & 검색어 태그 20개 완성] 2~5글자로 너무 짧았던 명함·빌지 영수증·취급주의(스티커 단어 누락)·리뷰스티커 등 10개 전 상품 맞춤 상품명 및 검색어 200개(상품당 20개) 세팅 완료'
      },
      {
        id: 'log-opt-4',
        date: '2026-10-21',
        text: '[광고비 과소비 긴급 브레이크 완료] 일예산 75,000원 ➔ 30,000원(-60% 감액) + 6대 과소비 그룹(시트지·영수증·팜플렛·카달로그·스티커제작·리뷰) 스마트타겟팅 전원 OFF 전환 및 수동 키워드 CPC 110~160원 인하 완료'
      },
      {
        id: 'log-opt-5',
        date: '2026-10-21',
        text: '[쿠팡 검색결과 단위가격 표기 & 브랜드 검색방어 완료] 주문제작 7종 (1매당 1,000원) 표기를 [상담후결제(1천원단위) 1팩/1세트]로 개선(수량 조정 결제 유지) 및 10개 전 상품 브랜드·검색태그 [주누디자인] 통일 + 전용 스토어/직통 결제창 복사 기능 탑재'
      }
    ]
  };
}

let appData = loadAppData();

function mergeWithDefaultData(parsed) {
  const def = getDefaultData();
  if (!parsed) return def;
  const mergedProducts = (def.products || []).map(dp => {
    const rp = (parsed.products || []).find(p => String(p.id) === String(dp.id));
    return rp ? { ...dp, ...rp, directUrl: dp.directUrl, shortLabel: dp.shortLabel, searchTags: dp.searchTags, priceLabel: dp.priceLabel, issueNote: dp.issueNote } : dp;
  });
  const existingLogIds = new Set((parsed.optimizationLogs || []).map(l => l.id));
  const mergedLogs = [
    ...(parsed.optimizationLogs || []),
    ...(def.optimizationLogs || []).filter(l => !existingLogIds.has(l.id))
  ];
  return {
    ...def,
    ...parsed,
    products: mergedProducts,
    optimizationLogs: mergedLogs,
    baseline: { ...def.baseline, ...(parsed.baseline || {}) }
  };
}

function loadAppData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return mergeWithDefaultData(JSON.parse(raw));
    }
  } catch (e) {}
  return getDefaultData();
}

function saveAppData(triggerCloud = true) {
  appData.updatedAt = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
  renderAll();
  if (triggerCloud) {
    pushToCloudSilently();
  }
}

// 해시(#ghSync=...) 원클릭 자동 연결 처리
function checkMagicHashSync() {
  const hash = window.location.hash || '';
  if (hash.startsWith('#ghSync=')) {
    try {
      const b64 = decodeURIComponent(hash.slice('#ghSync='.length));
      const token = atob(b64).trim();
      if (token) {
        const cfg = getSyncConfig();
        cfg.ghToken = token;
        saveSyncConfig(cfg);
        history.replaceState(null, '', window.location.pathname + window.location.search);
        showToast('🔗 아이폰/아이패드/PC 클라우드 실시간 동기화가 자동 연결되었습니다!');
      }
    } catch (e) {}
  }
}

function getSyncConfig() {
  try {
    return JSON.parse(localStorage.getItem(SYNC_CONFIG_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

function saveSyncConfig(cfg) {
  localStorage.setItem(SYNC_CONFIG_KEY, JSON.stringify(cfg));
}

function updateSyncBadge(status, text) {
  const dot = document.getElementById('syncDot');
  const label = document.getElementById('syncStatusText');
  if (!dot || !label) return;
  dot.className = 'sync-dot ' + (status || '');
  label.textContent = text;
}

async function pullFromCloud(silent = false) {
  const cfg = getSyncConfig();
  updateSyncBadge('syncing', '클라우드 동기화 중...');

  // 1. GitHub db-store 브랜치에서 조회 (토큰 있으면 API, 없으면 raw public URL 폴백)
  try {
    let remoteData = null;
    if (cfg.ghToken) {
      const apiUrl = `https://api.github.com/repos/${GH_REPO_OWNER}/${GH_REPO_NAME}/contents/${GH_DB_FILE}?ref=db-store&_t=${Date.now()}`;
      const res = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${cfg.ghToken}`,
          Accept: 'application/vnd.github+json'
        }
      });
      if (res.ok) {
        const meta = await res.json();
        const decoded = new TextDecoder('utf-8').decode(
          Uint8Array.from(atob(meta.content.replace(/\s/g, '')), c => c.charCodeAt(0))
        );
        remoteData = JSON.parse(decoded);
      }
    } else {
      const rawUrl = `https://raw.githubusercontent.com/${GH_REPO_OWNER}/${GH_REPO_NAME}/db-store/${GH_DB_FILE}?_t=${Date.now()}`;
      const res = await fetch(rawUrl);
      if (res.ok) {
        remoteData = await res.json();
      }
    }

    if (remoteData && (remoteData.products || remoteData.optimizationLogs)) {
      appData = mergeWithDefaultData(remoteData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
      renderAll();
      updateSyncBadge('online', cfg.ghToken ? 'GitHub 실시간 동기화됨 (읽기/쓰기)' : 'GitHub 클라우드 최신 수신됨');
      if (!silent) showToast('☁️ 클라우드에서 최신 데이터를 불러왔습니다!');
      return;
    }
  } catch (e) {}

  // 2. Google Drive 폴백
  if (cfg.gdriveUrl) {
    try {
      const res = await fetch(cfg.gdriveUrl);
      if (res.ok) {
        const remoteData = await res.json();
        if (remoteData && remoteData.products) {
          appData = { ...getDefaultData(), ...remoteData };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
          renderAll();
          updateSyncBadge('online', 'Google Drive 동기화됨');
          if (!silent) showToast('☁️ 구글 드라이브에서 최신 데이터를 불러왔습니다!');
          return;
        }
      }
    } catch (e) {}
  }

  updateSyncBadge(cfg.ghToken ? 'online' : '', cfg.ghToken ? '클라우드 연결 대기중' : '로컬/기본 데이터 모드');
}

async function pushToCloudSilently() {
  const cfg = getSyncConfig();
  if (!cfg.ghToken && !cfg.gdriveUrl) return;
  updateSyncBadge('syncing', '클라우드 자동 저장 중...');

  if (cfg.ghToken) {
    try {
      const apiUrl = `https://api.github.com/repos/${GH_REPO_OWNER}/${GH_REPO_NAME}/contents/${GH_DB_FILE}`;
      let sha = undefined;
      const getRes = await fetch(`${apiUrl}?ref=db-store&_t=${Date.now()}`, {
        headers: {
          Authorization: `Bearer ${cfg.ghToken}`,
          Accept: 'application/vnd.github+json'
        }
      });
      if (getRes.ok) {
        const getJson = await getRes.json();
        sha = getJson.sha;
      }
      const bytes = new TextEncoder().encode(JSON.stringify(appData, null, 2));
      let binary = '';
      bytes.forEach(b => (binary += String.fromCharCode(b)));
      const b64 = btoa(binary);

      const putRes = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${cfg.ghToken}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Sync Coupang Ad Optimizer DB (${new Date().toLocaleString('ko-KR')})`,
          content: b64,
          branch: 'db-store',
          ...(sha ? { sha } : {})
        })
      });
      if (putRes.ok) {
        updateSyncBadge('online', 'GitHub 실시간 저장 완료');
      }
    } catch (e) {
      updateSyncBadge('', '동기화 오프라인');
    }
  }

  if (cfg.gdriveUrl) {
    try {
      await fetch(cfg.gdriveUrl, {
        method: 'POST',
        body: JSON.stringify(appData)
      });
      updateSyncBadge('online', '클라우드 실시간 저장 완료');
    } catch (e) {}
  }
}

function renderBaselineComparison() {
  const grid = document.getElementById('baselineCompareGrid');
  if (!grid) return;
  const base = appData.baseline || getDefaultData().baseline;
  const phoneSum = (appData.phoneOrders || []).reduce((acc, o) => acc + Number(o.amount || 0), 0);
  const currentTotalCost = (appData.campaigns || []).reduce((acc, c) => acc + Number(c.cost || 0), 0) || base.totalCost;
  const currentOnlineSales = (appData.campaigns || []).reduce((acc, c) => acc + Number(c.sales || 0), 0) || base.adSales;
  const currentCombinedSales = currentOnlineSales + phoneSum;
  const currentCombinedRoas = currentTotalCost > 0 ? ((currentCombinedSales / currentTotalCost) * 100).toFixed(1) : '0.0';

  const phoneGroups = (appData.adGroups || []).filter(g => g.track === 'phone');
  const newPhoneSmartAvg = phoneGroups.length
    ? Math.round(phoneGroups.reduce((s, g) => s + Number(g.newSmartBid || g.newBid || 150), 0) / phoneGroups.length)
    : 153;

  const cards = [
    {
      title: '📦 수동 키워드 광고 가동률',
      before: `${base.activeManualGroups} / ${base.totalManualGroups}그룹 (스티커제작 OFF·서비스 누락)`,
      after: `9 / 9그룹 + 10개 전상품 100% 가동`,
      badge: '누락 상품 2종 완벽 복구',
      good: true
    },
    {
      title: '📞 전화상담 4종 스마트타겟팅 CPC',
      before: `평균 ${formatWon(base.phoneSmartBidAvg)} (최고 300원 과열)`,
      after: `평균 ${formatWon(newPhoneSmartAvg)} (150~160원 안정화)`,
      badge: '-42.7% 입찰가 거품 절감',
      good: true
    },
    {
      title: '🏷️ 쿠팡 상품명 & 검색어 태그(20개)',
      before: `7개 품목 단답형 상품명 (명함·빌지 영수증 등)`,
      after: `10개 전상품 SEO 상품명 + 검색어 200개 장착`,
      badge: '검색 노출 키워드 3.8배 확장',
      good: true
    },
    {
      title: '🎯 통합 실질 ROAS (온라인+계좌입금)',
      before: `온라인 ${base.onlineRoas}% (${formatWon(base.adSales)})`,
      after: `통합 ${currentCombinedRoas}% (${formatWon(currentCombinedSales)})`,
      badge: phoneSum > 0 ? `계좌입금 +${formatWon(phoneSum)} 반영` : '전화/계좌입금 기록 시 즉시 합산',
      good: true
    }
  ];

  grid.innerHTML = cards.map(c => `
    <div style="background:var(--bg-input);border:1px solid var(--border-color);border-radius:10px;padding:12px 14px;">
      <div style="font-size:0.78rem;color:var(--text-sub);font-weight:700;margin-bottom:6px;">${c.title}</div>
      <div style="font-size:0.78rem;color:var(--text-muted);text-decoration:line-through;margin-bottom:2px;">최적화 전: ${c.before}</div>
      <div style="font-size:0.93rem;font-weight:800;color:var(--text-main);margin-bottom:6px;">최적화 후: ${c.after}</div>
      <span class="badge ${c.good ? 'badge-good' : 'badge-info'}">${c.badge}</span>
    </div>
  `).join('');
}

function renderKPIs() {
  const marginRate = Number(appData.settings?.marginRate || 50);
  const bepRoas = Math.round((100 / marginRate) * 100);
  const bepEl = document.getElementById('bepRoasText');
  if (bepEl) bepEl.textContent = `손익분기 ROAS: ${bepRoas}%`;

  const totalCost = (appData.campaigns || []).reduce((s, c) => s + Number(c.cost || 0), 0);
  const adSales = (appData.campaigns || []).reduce((s, c) => s + Number(c.sales || 0), 0);
  const todaySpend = (appData.campaigns || []).reduce((s, c) => s + Number(c.todaySpend || 0), 0);
  const totalClicks = (appData.campaigns || []).reduce((s, c) => s + Number(c.clicks || 0), 0);
  const totalImpr = (appData.campaigns || []).reduce((s, c) => s + Number(c.impressions || 0), 0);
  const phoneSales = (appData.phoneOrders || []).reduce((s, o) => s + Number(o.amount || 0), 0);
  const combinedSales = adSales + phoneSales;
  const combinedRoas = totalCost > 0 ? ((combinedSales / totalCost) * 100).toFixed(1) : '0.0';
  const onlineRoas = totalCost > 0 ? ((adSales / totalCost) * 100).toFixed(1) : '0.0';
  const avgCpc = totalClicks > 0 ? Math.round(totalCost / totalClicks) : 0;

  document.getElementById('kpiTotalCost').textContent = formatWon(totalCost);
  document.getElementById('kpiCostSub').textContent = `오늘 누적 ${formatWon(todaySpend)} (일평균 ${formatWon(totalCost / 7)})`;

  document.getElementById('kpiAdSales').textContent = formatWon(adSales);
  document.getElementById('kpiAdSalesSub').textContent = `쿠팡 전체 매출: ${formatWon(appData.baseline?.totalStoreSales || 964200)} (3개월 ${formatWon(appData.threeMonthSales || 7215200)})`;

  document.getElementById('kpiPhoneSales').textContent = formatWon(phoneSales);
  document.getElementById('kpiPhoneSalesSub').textContent = `등록된 상담/계좌입금 ${(appData.phoneOrders || []).length}건 합산`;

  document.getElementById('kpiTotalRoas').textContent = `${combinedRoas}%`;
  document.getElementById('kpiRoasSub').textContent = `온라인 ${onlineRoas}% + 전화/입금 합산 (손익분기 ${bepRoas}%)`;

  document.getElementById('kpiAvgCpc').textContent = formatWon(avgCpc);
  document.getElementById('kpiClicksSub').textContent = `총 클릭 ${formatNum(totalClicks)}회 / 노출 ${formatNum(totalImpr)}회`;

  const appliedCount = (appData.products || []).filter(p => p.applied).length;
  document.getElementById('kpiProductCoverage').textContent = `${appliedCount} / ${(appData.products || []).length}개`;
  document.getElementById('kpiCoverageSub').textContent = `아이템위너 100% · 전 상품 SEO/키워드 세팅 완료`;
  document.getElementById('lastUpdatedLabel').textContent = appData.dataSourceLabel || '2026-10-20 실시간 연동';
}

function renderDashboardInsights() {
  const list = document.getElementById('dashboardInsightList');
  if (!list) return;
  const insights = [
    {
      cls: 'danger',
      icon: '🚨',
      title: '[긴급 복구] 판매량 2위(824개) 스티커 수동 키워드 광고그룹 OFF 상태 발견!',
      desc: '`02. 키워드 등록` 캠페인 내 `스티커제작(#202018026)` 광고그룹이 2026-09-28부터 꺼져(OFF) 있었습니다. 즉시 ON으로 활성화하여 주력 스티커 매출을 회복합니다.'
    },
    {
      cls: 'warning',
      icon: '🏷️',
      title: '[검색 노출 3.8배 확장] 단답형 상품명 7종 ➔ 쿠팡 알고리즘 맞춤 SEO 상품명 & 검색어 20개 장착',
      desc: '기존 상품명이 `명함`(2글자), `빌지 영수증`(5글자), `취급주의 1000매 주누디자인`(`스티커` 단어 누락!) 등으로 등록되어 있던 것을 세부 용도·재질·사양 키워드가 포함된 표준 상품명으로 전면 개선했습니다.'
    },
    {
      cls: 'accent',
      icon: '📞',
      title: '[Track A 상담형 인쇄물] 빌지·시트지·리플렛·카달로그 스마트타겟팅 CPC 300원 ➔ 150~160원 인하',
      desc: '전화상담 후 계좌입금으로 결제되는 품목들은 온라인 전환율만 보고 광고를 끄면 안 됩니다. 대신 300원까지 올라가 있던 스마트타겟팅 CPC를 150~160원으로 낮추고 무료양식/다이소 키워드를 제외해 클릭당 비용을 반값으로 줄였습니다.'
    },
    {
      cls: '',
      icon: '⭐',
      title: '[Track B 온라인 즉결 효자] 리뷰스티커(Best 1) + 서비스스티커(누락 복구) 집중 공략',
      desc: '쿠팡 애즈가 전환율 우수 상품 1위로 지목한 `리뷰스티커(9,200원~)`와 수동 광고에서 빠져 있던 `서비스스티커(9,200원~)`에 배달·배민·쿠팡이츠·상호인쇄 키워드를 집중 배치했습니다.'
    }
  ];

  list.innerHTML = insights.map(i => `
    <div class="insight-item ${i.cls}">
      <span style="font-size:1.1rem;">${i.icon}</span>
      <div>
        <div style="font-weight:800;margin-bottom:2px;">${i.title}</div>
        <div style="color:var(--text-sub);font-size:0.81rem;">${i.desc}</div>
      </div>
    </div>
  `).join('');

  // Track A & Track B summary boxes
  const trackAProducts = (appData.products || []).filter(p => p.track === 'phone');
  const trackBProducts = (appData.products || []).filter(p => p.track === 'online');
  const trackABox = document.getElementById('trackASummaryBox');
  const trackBBox = document.getElementById('trackBSummaryBox');

  if (trackABox) {
    trackABox.innerHTML = trackAProducts.map(p => `
      <div class="action-row" style="margin-bottom:8px;">
        <div class="action-row-main">
          <div class="action-row-title">
            <span class="badge badge-info">#${p.id}</span>
            <span>${p.oldName}</span>
          </div>
          <div class="action-row-meta">최적 상품명: <strong style="color:var(--text-main);">${p.newName}</strong></div>
        </div>
        <div class="action-row-rec">
          <span class="badge badge-good">30일 ${formatNum(p.units30d)}개 + 전화상담</span>
        </div>
      </div>
    `).join('');
  }

  if (trackBBox) {
    trackBBox.innerHTML = trackBProducts.map(p => `
      <div class="action-row" style="margin-bottom:8px;">
        <div class="action-row-main">
          <div class="action-row-title">
            <span class="badge badge-good">#${p.id}</span>
            <span>${p.oldName}</span>
          </div>
          <div class="action-row-meta">최적 상품명: <strong style="color:var(--text-main);">${p.newName}</strong></div>
        </div>
        <div class="action-row-rec">
          <span class="badge badge-good">30일 ${formatNum(p.units30d)}개 판매</span>
        </div>
      </div>
    `).join('');
  }
}

function renderCampaignTable() {
  const tbody = document.getElementById('campaignTableBody');
  if (!tbody) return;
  tbody.innerHTML = (appData.campaigns || []).map(c => {
    const cpc = c.clicks > 0 ? Math.round(c.cost / c.clicks) : 0;
    const statusBadge = c.status === 'ON'
      ? '<span class="badge badge-good">ON 운영중</span>'
      : '<span class="badge badge-warn">OFF 중지</span>';
    const roasTargetStr = c.targetRoas
      ? `목표 ${c.targetRoas}% ➔ <strong>${c.recommendedRoas}%</strong>`
      : '수동 CPC 입찰 (그룹별)';
    return `
      <tr>
        <td><strong>${c.name}</strong><br/><span style="font-size:0.75rem;color:var(--text-sub);">#${c.id} · ${c.adCountLabel}</span></td>
        <td>${statusBadge}<br/><span style="font-size:0.76rem;color:var(--text-sub);">${c.type}</span></td>
        <td class="num-col">${formatWon(c.dailyBudget)}</td>
        <td class="num-col">${roasTargetStr}</td>
        <td class="num-col">${formatNum(c.impressions)}회</td>
        <td class="num-col">${formatNum(c.clicks)}회</td>
        <td class="num-col">${Number(c.ctr || 0).toFixed(2)}%</td>
        <td class="num-col">${formatWon(cpc)}</td>
        <td class="num-col"><strong>${formatWon(c.cost)}</strong><br/><span style="font-size:0.73rem;color:var(--text-sub);">오늘 ${formatWon(c.todaySpend)}</span></td>
        <td class="num-col">${formatNum(c.orders)}건 (${formatNum(c.units)}개)</td>
        <td class="num-col"><strong style="color:var(--good);">${formatWon(c.sales)}</strong></td>
        <td class="num-col"><strong>${Number(c.roas || 0).toFixed(2)}%</strong></td>
        <td style="font-size:0.79rem;max-width:260px;">${c.note}</td>
      </tr>
    `;
  }).join('');
}

function renderProductTable() {
  const tbody = document.getElementById('productTableBody');
  if (!tbody) return;
  const filterVal = document.getElementById('productTrackFilter')?.value || 'ALL';
  const list = (appData.products || []).filter(p => filterVal === 'ALL' || p.track === filterVal);

  document.getElementById('productCountBadge').textContent = String((appData.products || []).length);

  tbody.innerHTML = list.map(p => {
    const tagsStr = (p.searchTags || []).join(',');
    const modifyUrl = `https://wing.coupang.com/tenants/seller-web/vendor-inventory/modify?vendorInventoryId=${p.id}`;
    const trackBadgeClass = p.track === 'phone' ? 'badge-info' : 'badge-good';
    return `
      <tr>
        <td>
          <strong>#${p.id}</strong><br/>
          <span class="badge ${trackBadgeClass}" style="margin-top:4px;">${p.trackLabel}</span>
        </td>
        <td style="max-width:390px;">
          <div style="font-size:0.77rem;color:var(--text-muted);margin-bottom:3px;">
            [변경 전] <span style="text-decoration:line-through;">${p.oldName}</span>
          </div>
          <div style="font-size:0.9rem;font-weight:800;color:var(--text-main);background:var(--bg-input);padding:8px 10px;border-radius:8px;border:1px solid rgba(16,185,129,0.35);margin-bottom:5px;">
            [최적화] ${p.newName}
          </div>
          <div style="font-size:0.76rem;color:var(--warning);">💡 ${p.issueNote}</div>
        </td>
        <td style="max-width:340px;">
          <div style="font-size:0.75rem;color:var(--text-sub);margin-bottom:4px;">검색어 태그 (${(p.searchTags || []).length}/20개):</div>
          <div class="tag-chip-wrap">
            ${(p.searchTags || []).map(t => `<span class="tag-chip">${t}</span>`).join('')}
          </div>
        </td>
        <td class="num-col"><strong>${formatNum(p.units30d)}개</strong></td>
        <td class="num-col" style="font-size:0.8rem;">${p.priceLabel}</td>
        <td>
          <span class="badge ${p.adStatus.includes('🚨') ? 'badge-bad' : 'badge-good'}">${p.adStatus}</span>
        </td>
        <td>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <button class="btn btn-good btn-sm" onclick="copyDirectProductLink('${p.id}', 'msg')">💬 카톡 결제창 안내 복사</button>
            <button class="btn btn-primary btn-sm" onclick="copyProductSeo('${p.id}', 'name')">📋 새 상품명 복사</button>
            <button class="btn btn-sm" onclick="copyProductSeo('${p.id}', 'tags')">🏷️ 검색어 20개 복사</button>
            <a class="btn btn-sm" href="${modifyUrl}" target="_blank" rel="noopener">🔗 쿠팡 윙 수정창</a>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

window.copyMyShopLink = function(mode) {
  const storeUrl = 'https://shop.coupang.com/A00191094';
  if (mode === 'msg') {
    const msg = `[주누디자인 쿠팡 공식 스토어 안내]\n아래 전용 링크로 접속하시면 타업체 광고 없이 주누디자인 전 상품을 바로 확인·결제하실 수 있습니다.\n👉 ${storeUrl}\n(상담 후 견적 결제는 1,000원 상품에서 안내받으신 금액만큼 수량을 올려 결제해 주세요. 예: 12,000원 = 수량 12개)`;
    copyText(msg, '💬 카톡 상담용 스토어 안내문+전용 링크가 복사되었습니다!');
  } else {
    copyText(storeUrl, '🏪 타업체 노출 0% 주누디자인 전용 스토어 링크가 복사되었습니다!');
  }
};

window.copyDirectProductLink = function(productId, mode) {
  const p = (appData.products || []).find(x => String(x.id) === String(productId));
  if (!p) return;
  const url = p.directUrl || `https://www.coupang.com/np/search?q=${encodeURIComponent(p.newName)}`;
  const label = p.shortLabel || p.oldName;
  if (mode === 'msg') {
    const isUnit1000 = (p.priceLabel || '').includes('1,000원');
    const guide = isUnit1000
      ? `[주누디자인 ${label} 결제 안내]\n아래 직통 링크에서 안내받으신 견적 금액만큼 [수량]을 올려 결제해 주세요.\n(예: 12,000원 결제 시 ➔ 수량 12개 선택)\n👉 ${url}`
      : `[주누디자인 ${label} 주문 링크]\n아래 직통 링크에서 옵션을 선택하여 바로 주문하실 수 있습니다.\n👉 ${url}`;
    copyText(guide, `💬 [${label}] 카톡/문자 결제 안내문+직통 링크가 복사되었습니다!`);
  } else {
    copyText(url, `🔗 [${label}] 직통 결제창 링크가 복사되었습니다!`);
  }
};

function renderDirectLinksBar() {
  const bar = document.getElementById('directLinksQuickBar');
  if (!bar) return;
  bar.innerHTML = (appData.products || []).map(p => {
    const label = p.shortLabel || p.oldName;
    return `<button class="btn btn-sm" onclick="copyDirectProductLink('${p.id}', 'msg')" title="클릭 시 카톡 결제안내+직통링크 복사">🔗 ${label}</button>`;
  }).join('');
}

window.copyProductSeo = function(productId, mode) {
  const p = (appData.products || []).find(x => String(x.id) === String(productId));
  if (!p) return;
  if (mode === 'name') {
    copyText(p.newName, `✅ [#${p.id}] 최적 상품명이 복사되었습니다!`);
  } else {
    copyText((p.searchTags || []).join(','), `🏷️ [#${p.id}] 검색어 태그 20개가 쉼표(,) 구분으로 복사되었습니다!`);
  }
};

function renderAdGroupsAndNegKeywords() {
  const tbody = document.getElementById('adGroupTableBody');
  if (tbody) {
    tbody.innerHTML = (appData.adGroups || []).map(g => {
      const trackBadge = g.track === 'phone'
        ? '<span class="badge badge-info">📞 Track A (전화상담)</span>'
        : '<span class="badge badge-good">🛒 Track B (온라인결제)</span>';
      const statusHtml = !g.wasActive
        ? '<span class="badge badge-bad">기존 OFF(중지)</span> ➔ <span class="badge badge-good">ON 복구</span>'
        : '<span class="badge badge-good">ON 운영중</span>';
      const oldBidStr = g.oldSmartBid
        ? `기본 ${formatWon(g.oldBid)} / 스마트 <strong style="color:var(--danger);">${formatWon(g.oldSmartBid)}</strong>`
        : `수동 ${formatWon(g.oldBid)}`;
      const newBidStr = g.newSmartBid
        ? `기본 ${formatWon(g.newBid)} / 스마트 <strong style="color:var(--good);">${formatWon(g.newSmartBid)}</strong>`
        : `수동 <strong style="color:var(--good);">${formatWon(g.newBid)}</strong>`;
      return `
        <tr>
          <td><strong>${g.name}</strong><br/><span style="font-size:0.74rem;color:var(--text-sub);">그룹ID: #${g.id}</span></td>
          <td>${g.productName}<br/>${trackBadge}</td>
          <td>${statusHtml}</td>
          <td style="font-size:0.8rem;">${g.targeting}</td>
          <td class="num-col">${oldBidStr}</td>
          <td class="num-col">${newBidStr}</td>
          <td style="font-size:0.79rem;max-width:260px;">
            <div style="font-weight:700;margin-bottom:2px;">${g.actionBadge}</div>
            <div style="color:var(--text-sub);">${g.actionDesc}</div>
          </td>
        </tr>
      `;
    }).join('');
  }

  const wrap = document.getElementById('negKeywordListWrap');
  if (wrap) {
    wrap.innerHTML = (appData.negativeKeywords || []).map((kw, idx) => `
      <span class="tag-chip" style="padding:5px 10px;font-size:0.8rem;display:inline-flex;align-items:center;gap:6px;">
        🚫 ${kw}
        <button onclick="removeNegKeyword(${idx})" style="background:none;border:none;color:var(--danger);cursor:pointer;font-weight:900;">&times;</button>
      </span>
    `).join('');
  }
}

window.removeNegKeyword = function(idx) {
  appData.negativeKeywords.splice(idx, 1);
  saveAppData(true);
};

function renderPhoneOrders() {
  const orders = appData.phoneOrders || [];
  document.getElementById('phoneOrderCountBadge').textContent = String(orders.length);

  const totalAmt = orders.reduce((s, o) => s + Number(o.amount || 0), 0);
  const summaryEl = document.getElementById('phoneOrderSummaryCards');
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div style="background:var(--bg-input);padding:12px 14px;border-radius:10px;border:1px solid var(--border-color);">
        <div style="font-size:0.76rem;color:var(--text-sub);">누적 전화상담/계좌입금 건수</div>
        <div style="font-size:1.2rem;font-weight:800;margin-top:4px;">${formatNum(orders.length)}건</div>
      </div>
      <div style="background:var(--bg-input);padding:12px 14px;border-radius:10px;border:1px solid var(--border-color);">
        <div style="font-size:0.76rem;color:var(--text-sub);">누적 전화상담/계좌입금 매출</div>
        <div style="font-size:1.2rem;font-weight:800;color:var(--good);margin-top:4px;">${formatWon(totalAmt)}</div>
      </div>
    `;
  }

  const tbody = document.getElementById('phoneOrderTableBody');
  if (!tbody) return;
  if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-sub);padding:24px;">아직 등록된 전화상담/계좌입금 내역이 없습니다. 좌측에서 첫 상담 주문을 기록해 보세요!</td></tr>`;
    return;
  }
  tbody.innerHTML = orders.map((o, idx) => `
    <tr>
      <td>${o.date}</td>
      <td><strong>${o.productName}</strong></td>
      <td>${o.customer || '-'}</td>
      <td><span class="badge badge-info">${o.payType}</span></td>
      <td class="num-col"><strong style="color:var(--good);">${formatWon(o.amount)}</strong></td>
      <td><button class="btn btn-danger btn-sm" onclick="deletePhoneOrder(${idx})">삭제</button></td>
    </tr>
  `).join('');
}

window.deletePhoneOrder = function(idx) {
  appData.phoneOrders.splice(idx, 1);
  saveAppData(true);
  showToast('삭제되었습니다.');
};

function renderLogs() {
  const wrap = document.getElementById('optLogList');
  if (!wrap) return;
  wrap.innerHTML = (appData.optimizationLogs || []).slice().reverse().map(l => `
    <div class="action-row">
      <div class="action-row-main">
        <div class="action-row-title"><span class="badge badge-info">${l.date}</span></div>
        <div style="font-size:0.84rem;margin-top:4px;">${l.text}</div>
      </div>
    </div>
  `).join('');
}

function renderTrendChart() {
  const canvas = document.getElementById('trendChartCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  const w = Math.max(rect.width, 320);
  const h = 260;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const data = appData.dailyTrends || [];
  if (!data.length) return;

  const padL = 54, padR = 46, padT = 24, padB = 34;
  const chartW = w - padL - padR;
  const chartH = h - padT - padB;

  const maxVal = Math.max(...data.map(d => Math.max(d.cost || 0, (d.sales || 0) + (d.phoneSales || 0))), 100000);
  const stepX = chartW / data.length;

  ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padT + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(w - padR, y);
    ctx.stroke();

    const val = Math.round(maxVal * (1 - i / 4));
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText((val / 10000).toFixed(0) + '만', padL - 6, y + 4);
  }

  data.forEach((d, idx) => {
    const cx = padL + stepX * idx + stepX / 2;
    const barW = Math.min(20, stepX * 0.32);

    const totalSales = (d.sales || 0) + (d.phoneSales || 0);
    const salesH = (totalSales / maxVal) * chartH;
    const costH = ((d.cost || 0) / maxVal) * chartH;

    // 매출 막대 (초록)
    ctx.fillStyle = '#10b981';
    ctx.fillRect(cx - barW - 2, padT + chartH - salesH, barW, salesH);

    // 광고비 막대 (빨강)
    ctx.fillStyle = '#e62e2d';
    ctx.fillRect(cx + 2, padT + chartH - costH, barW, costH);

    // 날짜
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(d.date, cx, h - 10);
  });

  // ROAS 꺾은선
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  data.forEach((d, idx) => {
    const cx = padL + stepX * idx + stepX / 2;
    const totalSales = (d.sales || 0) + (d.phoneSales || 0);
    const roas = d.cost > 0 ? (totalSales / d.cost) * 100 : 0;
    const clamped = Math.min(roas, 500);
    const y = padT + chartH - (clamped / 500) * chartH;
    if (idx === 0) ctx.moveTo(cx, y);
    else ctx.lineTo(cx, y);
  });
  ctx.stroke();
}

function renderAll() {
  renderBaselineComparison();
  renderDirectLinksBar();
  renderKPIs();
  renderDashboardInsights();
  renderCampaignTable();
  renderProductTable();
  renderAdGroupsAndNegKeywords();
  renderPhoneOrders();
  renderLogs();
  renderTrendChart();
}

function initEvents() {
  // 탭 전환
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
      if (btn.dataset.tab === 'tab-dashboard') {
        setTimeout(renderTrendChart, 50);
      }
    });
  });

  // 트랙 필터
  document.getElementById('productTrackFilter')?.addEventListener('change', renderProductTable);

  // 설정 입력 변경
  ['marginRateInput', 'targetRoasInput', 'targetPhoneCpcInput'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', () => {
      appData.settings = {
        marginRate: Number(document.getElementById('marginRateInput').value || 50),
        targetRoas: Number(document.getElementById('targetRoasInput').value || 350),
        targetPhoneCpc: Number(document.getElementById('targetPhoneCpcInput').value || 150)
      };
      saveAppData(true);
    });
  });

  // 빠른 전화/계좌입금 버튼
  document.getElementById('quickAddPhoneOrderBtn')?.addEventListener('click', () => {
    document.querySelector('.tab-btn[data-tab="tab-phone-orders"]')?.click();
    document.getElementById('poAmountInput')?.focus();
  });

  // 전화/계좌입금 저장
  const poDateInput = document.getElementById('poDateInput');
  if (poDateInput) poDateInput.value = new Date().toISOString().slice(0, 10);

  document.getElementById('savePhoneOrderBtn')?.addEventListener('click', () => {
    const date = document.getElementById('poDateInput').value || new Date().toISOString().slice(0, 10);
    const sel = document.getElementById('poProductSelect');
    const productId = sel.value;
    const productName = sel.options[sel.selectedIndex].text;
    const customer = document.getElementById('poCustomerInput').value.trim();
    const amount = Number(document.getElementById('poAmountInput').value || 0);
    const payType = document.getElementById('poPayTypeSelect').value;

    if (amount <= 0) {
      showToast('⚠️ 입금/결제 금액을 입력해 주세요!');
      return;
    }
    appData.phoneOrders = appData.phoneOrders || [];
    appData.phoneOrders.push({
      id: 'po-' + Date.now(),
      date,
      productId,
      productName,
      customer,
      amount,
      payType
    });
    document.getElementById('poCustomerInput').value = '';
    document.getElementById('poAmountInput').value = '';
    saveAppData(true);
    showToast('📞 전화상담/계좌입금 매출이 통합 ROAS에 반영 및 동기화되었습니다!');
  });

  // 제외 키워드 복사 & 추가
  document.getElementById('copyAllNegKeywordsBtn')?.addEventListener('click', () => {
    copyText((appData.negativeKeywords || []).join('\n'), '🚫 추천 제외 키워드 전체가 복사되었습니다!');
  });

  document.getElementById('addNegKeywordBtn')?.addEventListener('click', () => {
    const inp = document.getElementById('newNegKeywordInput');
    const val = inp.value.trim();
    if (!val) return;
    val.split(',').map(s => s.trim()).filter(Boolean).forEach(kw => {
      if (!appData.negativeKeywords.includes(kw)) {
        appData.negativeKeywords.push(kw);
      }
    });
    inp.value = '';
    saveAppData(true);
    showToast('제외 키워드가 추가되었습니다.');
  });

  // 일지 추가
  document.getElementById('addLogBtn')?.addEventListener('click', () => {
    const inp = document.getElementById('newLogInput');
    const text = inp.value.trim();
    if (!text) return;
    appData.optimizationLogs.push({
      id: 'log-' + Date.now(),
      date: new Date().toISOString().slice(0, 10),
      text
    });
    inp.value = '';
    saveAppData(true);
    showToast('최적화 일지가 기록되었습니다.');
  });

  // 동기화 설정 저장
  const cfg = getSyncConfig();
  if (document.getElementById('ghTokenInput')) document.getElementById('ghTokenInput').value = cfg.ghToken || '';
  if (document.getElementById('gdriveUrlInput')) document.getElementById('gdriveUrlInput').value = cfg.gdriveUrl || '';

  document.getElementById('saveSyncConfigBtn')?.addEventListener('click', () => {
    const ghToken = document.getElementById('ghTokenInput').value.trim();
    const gdriveUrl = document.getElementById('gdriveUrlInput').value.trim();
    saveSyncConfig({ ghToken, gdriveUrl });
    pushToCloudSilently();
    showToast('☁️ 동기화 설정 저장 및 클라우드 업로드 완료!');
  });

  document.getElementById('pullFromCloudBtn')?.addEventListener('click', () => pullFromCloud(false));
  document.getElementById('syncNowBtn')?.addEventListener('click', () => pullFromCloud(false));
  document.getElementById('openSyncModalBtn')?.addEventListener('click', () => {
    document.querySelector('.tab-btn[data-tab="tab-settings"]')?.click();
  });

  document.getElementById('copyMagicLinkBtn')?.addEventListener('click', () => {
    const token = document.getElementById('ghTokenInput').value.trim() || getSyncConfig().ghToken || '';
    if (!token) {
      showToast('⚠️ 먼저 GitHub 토큰을 입력해 주세요!');
      return;
    }
    const magicUrl = `https://${GH_REPO_OWNER}.github.io/${GH_REPO_NAME}/#ghSync=${encodeURIComponent(btoa(token))}`;
    copyText(magicUrl, '🔗 아이폰/아이패드 원클릭 자동연결 링크가 복사되었습니다!');
  });

  document.getElementById('resetDefaultDataBtn')?.addEventListener('click', () => {
    if (confirm('초기 진단 기준 데이터로 복원하시겠습니까?')) {
      appData = getDefaultData();
      saveAppData(true);
      showToast('초기 데이터로 복원되었습니다.');
    }
  });

  // 튜토리얼 모달
  const tutorialModal = document.getElementById('tutorialModal');
  document.getElementById('openTutorialBtn')?.addEventListener('click', () => tutorialModal?.classList.add('open'));
  document.getElementById('closeTutorialBtn')?.addEventListener('click', () => {
    tutorialModal?.classList.remove('open');
    localStorage.setItem(TUTORIAL_SEEN_KEY, '1');
  });
  document.getElementById('startAppFromTutorialBtn')?.addEventListener('click', () => {
    tutorialModal?.classList.remove('open');
    localStorage.setItem(TUTORIAL_SEEN_KEY, '1');
  });

  if (!localStorage.getItem(TUTORIAL_SEEN_KEY)) {
    tutorialModal?.classList.add('open');
  }

  // 테마 전환
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  if (savedTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');
  document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'light' ? 'dark' : 'light';
    if (next === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem(THEME_KEY, next);
  });

  window.addEventListener('resize', renderTrendChart);
}

document.addEventListener('DOMContentLoaded', () => {
  checkMagicHashSync();
  initEvents();
  renderAll();
  pullFromCloud(true);
});
