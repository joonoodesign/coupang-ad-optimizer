"""
주누디자인 쿠팡 윙(Wing) 상품 옵션·브랜드 및 쿠팡 광고센터(Tetris API) 무클릭(Zero-Click) 순수 REST API 복원 스크립트
- 브라우저 탭 클릭이나 화면 이동 없이, CDP 쿠키 스토어(Storage.getCookies)와 내부 REST API(fetch / urllib)만으로
  1) 쿠팡 윙 7개 주문제작 상품의 원본 옵션값(수량 / 1개 등) 및 원본 브랜드(status: APPROVED) 병렬 즉시 복원
  2) 쿠팡 광고센터(02. 키워드 등록 #101858396) 일예산(30,000원) 및 9개 광고그룹 키워드 입찰가·스마트타겟팅 즉시 복원
"""
import copy
import http.cookiejar
import json
import os
import re
import sys
import urllib.error
import urllib.request
import websocket

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BACKUP_PATH = os.path.join(BASE_DIR, 'snapshots', 'wing_options_backup_2026-10-21.json')


def get_cdp_ws():
    port_file = r'C:\Users\User\AppData\Local\Google\Chrome\User Data\DevToolsActivePort'
    with open(port_file, encoding='utf-8') as f:
        lines = [l.strip() for l in f.readlines() if l.strip()]
    port, ws_path = int(lines[0]), lines[1]
    return websocket.create_connection(f'ws://127.0.0.1:{port}{ws_path}', timeout=45, suppress_origin=True)


def build_coupang_opener():
    """브라우저 탭 조작 없이 Chrome 쿠키 저장소에서 직접 쿠키를 읽어 SSO 자동 갱신 Opener 생성"""
    ws = get_cdp_ws()
    ws.send(json.dumps({'id': 1, 'method': 'Storage.getCookies', 'params': {}}))
    res = json.loads(ws.recv())
    ws.close()

    cookies = res.get('result', {}).get('cookies', [])
    cj = http.cookiejar.CookieJar()
    for c in cookies:
        domain = c.get('domain', '')
        if 'coupang.com' in domain:
            ck = http.cookiejar.Cookie(
                version=0,
                name=c['name'],
                value=c['value'],
                port=None,
                port_specified=False,
                domain=domain,
                domain_specified=bool(domain),
                domain_initial_dot=domain.startswith('.'),
                path=c.get('path', '/'),
                path_specified=True,
                secure=c.get('secure', False),
                expires=None,
                discard=True,
                comment=None,
                comment_url=None,
                rest={},
                rfc2109=False
            )
            cj.set_cookie(ck)

    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
    opener.addheaders = [
        ('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'),
    ]

    # Ensure advertising.coupang.com SSO session is fresh
    req1 = urllib.request.Request(
        'https://advertising.coupang.com/marketing/tetris-api/v2/campaign/101858396',
        headers={'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'}
    )
    try:
        opener.open(req1, timeout=15)
    except urllib.error.HTTPError as e:
        cj.extract_cookies(e, req1)
        body = e.read().decode('utf-8', errors='replace')
        m = re.search(r'url=([^"]+)"', body)
        if m:
            sso_url = m.group(1).replace('&amp;', '&').replace('%2520', '%20')
            opener.open(sso_url, timeout=20)

    return opener


def restore_ads_center_pure_api():
    """브라우저 클릭 없이 순수 파이썬 HTTP API로 쿠팡 광고센터 예산 및 9개 광고그룹 복원"""
    opener = build_coupang_opener()
    json_headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Origin': 'https://advertising.coupang.com',
        'Referer': 'https://advertising.coupang.com/marketing/dashboard/sales'
    }

    # 1. 캠페인 일예산 30,000원 복원
    req_b = urllib.request.Request(
        'https://advertising.coupang.com/marketing/tetris-api/campaign/budget',
        data=json.dumps({'campaign': {'id': '101858396', 'budget': 30000}}).encode('utf-8'),
        headers=json_headers,
        method='POST'
    )
    with opener.open(req_b, timeout=20) as resp:
        print("Budget restored:", resp.status)

    # 2. 광고그룹별 설정 및 수동 키워드 입찰가 복원
    restore_configs = [
        ('202018126', '명함', 'manual', None, 100, 210, {'명함제작': 280}),
        ('202018026', '스티커제작', 'manual', None, 100, 210, {'스티커제작': 280}),
        ('202018163', '리뷰', 'manual', None, 100, 310, {}),
        ('205588346', '영수증', 'automatic', 180, 150, 250, {}),
        ('205680439', '시트지', 'automatic', 150, 120, 220, {}),
        ('205588324', '팜플렛', 'automatic', 150, 120, 220, {}),
        ('205588227', '카달로그', 'automatic', 150, 120, 220, {}),
    ]

    results = []
    for gid, name, kw_type, smart_p, nonsearch_p, min_kw, special in restore_configs:
        url = f'https://advertising.coupang.com/marketing/tetris-api/campaign/101858396/ad-group/{gid}'
        with opener.open(urllib.request.Request(url, headers={'Accept': 'application/json'}), timeout=20) as r:
            gdata = json.loads(r.read().decode('utf-8'))

        camp = copy.deepcopy(gdata['campaign'])
        camp.pop('campaignRules', None)
        ag = copy.deepcopy(gdata['adGroup'])
        ag['ads'] = ag.get('ads') or []
        ag['excludeProductList'] = [
            {'vendorItemId': x.get('vendorItemId'), 'itemName': x.get('itemName'), 'isDeleted': x.get('isDeleted'), 'id': x.get('id')}
            for x in (ag.get('excludeProductList') or [])
        ]
        ag['targetKeywordType'] = kw_type
        ag['smartTargetingPrice'] = smart_p
        ag['price'] = nonsearch_p

        updated_count = 0
        for kw in ag.get('keywords', []):
            if kw.get('isDeleted'):
                continue
            kword = kw.get('keyword', '')
            cur_p = kw.get('pricing') or kw.get('price') or 0
            if kword in special and cur_p != special[kword]:
                kw['pricing'] = special[kword]
                kw['price'] = special[kword]
                updated_count += 1
            elif cur_p < min_kw:
                kw['pricing'] = min_kw
                kw['price'] = min_kw
                updated_count += 1

        payload = {'campaign': camp, 'adGroup': ag, 'isRecommended': False}
        req_save = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=json_headers, method='POST')
        with opener.open(req_save, timeout=25) as resp:
            results.append({'gid': gid, 'name': name, 'status': resp.status, 'updatedKeywords': updated_count})

    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    restore_ads_center_pure_api()
