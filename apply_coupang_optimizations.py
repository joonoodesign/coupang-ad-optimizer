import os
import sys
import json
import time
import websocket

sys.stdout.reconfigure(encoding='utf-8')

PRODUCTS_SEO = [
    {
        "id": "748490137",
        "oldName": "명함",
        "newName": "주누디자인 무료디자인 명함 제작 고급 금박 코팅 소량 독특한 부동산 회사 쿠폰 명함인쇄",
        "tags": "명함제작,고급명함,금박명함,소량명함,명함인쇄,무료디자인명함,독특한명함,회사명함,부동산명함,쿠폰명함,예쁜명함,코팅명함,수입지명함,명함주문,대구명함,심플명함,식당명함,카페명함,명함디자인,영업명함"
    },
    {
        "id": "738722850",
        "oldName": "무료디자인 스티커 주문제작 소량스티커 유포지 투명 도무송 인쇄 사각 원형 맞춤 초강접제작",
        "newName": "주누디자인 무료디자인 스티커 제작 소량 방수 유포지 투명 원형 사각 도무송 로고 라벨 주문제작 인쇄",
        "tags": "스티커제작,소량스티커,방수스티커,로고스티커,원형스티커,도무송스티커,유포지스티커,투명스티커,라벨스티커,포장스티커,배달스티커,상호스티커,맞춤스티커,사각스티커,초강접스티커,제품스티커,답례품스티커,스티커인쇄,스티커소량제작,코팅스티커"
    },
    {
        "id": "13537783108",
        "oldName": "빌지 영수증",
        "newName": "주누디자인 무료디자인 빌지 제작 영수증 거래명세서 주문서 계산서 NCR지 양식지 서식지 복사 인쇄 주문제작",
        "tags": "빌지제작,영수증제작,거래명세서제작,주문서제작,계산서제작,NCR지인쇄,양식지제작,서식지인쇄,간이영수증제작,식당빌지,영수증인쇄,납품서제작,청구서제작,복사빌지,2매빌지,3매빌지,매장주문서,입금표제작,인수증제작,빌지인쇄"
    },
    {
        "id": "907344096",
        "oldName": "홍보 인쇄물 맞춤제작 전단지 종이자석 봉투 배너 디자인 인쇄소",
        "newName": "주누디자인 무료디자인 전단지 제작 인쇄 A4 홍보지 종이자석 스티커 대봉투 소봉투 배너 소량 대량 맞춤제작",
        "tags": "전단지제작,전단지인쇄,홍보전단지,A4전단지,소량전단지,종이자석전단지,배달전단지,학원전단지,오픈전단지,봉투제작,대봉투인쇄,소봉투제작,배너제작,현수막제작,자석스티커,음식점전단지,헬스장전단지,전단지디자인,인쇄물제작,판촉물인쇄"
    },
    {
        "id": "11905267494",
        "oldName": "리뷰스티커 주누디자인",
        "newName": "주누디자인 리뷰스티커 제작 1000매 배달 배민 요기요 쿠팡이츠 리뷰이벤트 서비스 스티커 상호문구 무료인쇄",
        "tags": "리뷰스티커,배달리뷰스티커,배민리뷰스티커,서비스스티커,리뷰이벤트스티커,배달스티커,포장스티커,상호스티커,쿠팡이츠스티커,요기요스티커,음식점스티커,카페스티커,도시락스티커,배달용품,리뷰유도스티커,별점스티커,감사스티커,소량리뷰스티커,원형리뷰스티커,주누디자인"
    },
    {
        "id": "11917122413",
        "oldName": "서비스스티커 주누디자인",
        "newName": "주누디자인 서비스스티커 제작 1000매 배달 음식점 카페 포장 서비스 증정 이벤트 스티커 상호문구 맞춤인쇄",
        "tags": "서비스스티커,배달서비스스티커,증정스티커,음식점스티커,포장스티커,배달포장스티커,리뷰서비스스티커,카페스티커,디저트스티커,배민스티커,감성스티커,문구스티커,상호인쇄스티커,원형스티커,음료스티커,반찬가게스티커,배달용품스티커,이벤트스티커,고객감사스티커,주누디자인"
    },
    {
        "id": "12350470478",
        "oldName": "취급주의 1000매 주누디자인",
        "newName": "주누디자인 취급주의 스티커 1000매 파손주의 택배 박스 배송 냉동보관 냉장보관 식품 식물 안전배송 라벨",
        "tags": "취급주의스티커,파손주의스티커,택배스티커,배송스티커,박스스티커,냉동보관스티커,냉장보관스티커,식품배송스티커,식물배송스티커,깨짐주의스티커,안전배송스티커,우체국택배스티커,과일박스스티커,신선식품스티커,상하주의스티커,던지지마세요스티커,택배포장용품,물류스티커,경고스티커,주누디자인"
    },
    {
        "id": "16360123820",
        "oldName": "맞춤 실사출력 시트지 인쇄 주문제작 (유포지 합성지 PVC켈지 그레이 실내외용)",
        "newName": "주누디자인 맞춤 실사출력 시트지 제작 유리창 매장 광고 방수 대형 스티커 인쇄 주문제작 유포지 합성지 PVC켈지",
        "tags": "실사출력,시트지제작,글자시트지,유리창시트지,매장시트지,광고시트지,인쇄시트지,방수시트지,대형스티커제작,유포지출력,합성지출력,PVC시트지,켈지출력,실외용시트지,간판시트지,윈도우시트지,홍보시트지,차량용시트지,실사시트지,시트지인쇄"
    },
    {
        "id": "15280821833",
        "oldName": "리플렛 팜플렛 디자인 인쇄 주누디자인",
        "newName": "주누디자인 무료디자인 리플렛 팜플렛 제작 2단 3단 접지 브로슈어 회사 병원 학원 홍보물 안내장 소량 대량 인쇄",
        "tags": "리플렛제작,팜플렛제작,리플렛인쇄,팜플렛인쇄,브로슈어제작,2단리플렛,3단리플렛,접지전단지,홍보물제작,안내장제작,소량리플렛,회사브로슈어,병원리플렛,학원팜플렛,전시회리플렛,행사팜플렛,리플렛디자인,팜플렛디자인,접지인쇄물,주누디자인"
    },
    {
        "id": "15280825938",
        "oldName": "카다로그 카달로그 카탈로그 디자인 인쇄 주누디자인",
        "newName": "주누디자인 무료디자인 카다로그 카탈로그 카달로그 제작 브로슈어 회사소개서 제품 홍보 책자 중철 무선 제본 소량 인쇄",
        "tags": "카다로그제작,카탈로그제작,카달로그제작,브로슈어제작,책자제작,홍보책자,회사소개서제작,제품카다로그,소량책자인쇄,중철제본,무선제본,카다로그인쇄,카탈로그인쇄,기업브로슈어,작품집제작,안내책자,소책자제작,카다로그디자인,책자소량제작,주누디자인"
    }
]

AD_GROUP_UPDATES = [
    {"id": "202018026", "name": "스티커제작", "isActive": True, "pricing": 150, "smartTargetingPricing": None},
    {"id": "205588346", "name": "영수증", "isActive": True, "pricing": 100, "smartTargetingPricing": 150},
    {"id": "205680439", "name": "시트지", "isActive": True, "pricing": 130, "smartTargetingPricing": 160},
    {"id": "205588324", "name": "팜플렛", "isActive": True, "pricing": 100, "smartTargetingPricing": 150},
    {"id": "205588227", "name": "카달로그", "isActive": True, "pricing": 130, "smartTargetingPricing": 150}
]


class CDPClient:
    def __init__(self):
        port_file = r"C:\Users\User\AppData\Local\Google\Chrome\User Data\DevToolsActivePort"
        with open(port_file, 'r', encoding='utf-8') as f:
            lines = [l.strip() for l in f.readlines() if l.strip()]
        self.ws_url = f"ws://127.0.0.1:{lines[0]}{lines[1]}"
        self.ws = websocket.create_connection(self.ws_url, timeout=25, suppress_origin=True)
        self.msg_id = 0

    def call(self, method, params=None, session_id=None):
        self.msg_id += 1
        mid = self.msg_id
        payload = {"id": mid, "method": method}
        if params:
            payload["params"] = params
        if session_id:
            payload["sessionId"] = session_id
        self.ws.send(json.dumps(payload))
        while True:
            msg = json.loads(self.ws.recv())
            if msg.get("id") == mid:
                return msg

    def close(self):
        try:
            self.ws.close()
        except Exception:
            pass


def main():
    print("🚀 크롬 브라우저(Coupang Wing & Coupang Ads Center)에 연결을 시도합니다...")
    print("💡 크롬 상단에 '원격 디버깅 허용(Allow)' 창이 뜨면 [허용/Allow]을 눌러주세요!")
    try:
        client = CDPClient()
        res = client.call("Target.getTargets")
        targets = res.get("result", {}).get("targetInfos", [])
        wing_tid = None
        ads_tid = None
        for t in targets:
            if t.get("type") == "page":
                u = t.get("url", "")
                if "wing.coupang.com" in u:
                    wing_tid = t.get("targetId")
                elif "advertising.coupang.com" in u:
                    ads_tid = t.get("targetId")
        print(f"✅ 연결 성공! Wing 탭: {wing_tid} / Ads 탭: {ads_tid}")
        client.close()
    except Exception as e:
        print(f"ℹ️ 현재 크롬 원격 디버깅 승인 대기 상태입니다 ({e}).")
        print("✅ 대시보드(https://joonoodesign.github.io/coupang-ad-optimizer/)에서 원클릭 복사 및 즉시 적용이 가능합니다.")


if __name__ == "__main__":
    main()
