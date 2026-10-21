"""
주누디자인 쿠팡 윙(Wing) 10개 전 상품 브랜드·제조사·검색태그 원상복구 스크립트
백업 파일: d:\antigravity\coupang-ad-optimizer\snapshots\wing_brand_backup_2026-10-21.json
사용법:
  python restore_wing_brand.py
"""
import json, time, websocket

BACKUP_PATH = r'd:\antigravity\coupang-ad-optimizer\snapshots\wing_brand_backup_2026-10-21.json'

def main():
    with open(BACKUP_PATH, 'r', encoding='utf-8') as f:
        backup = json.load(f)

    with open(r'C:\Users\User\AppData\Local\Google\Chrome\User Data\DevToolsActivePort') as f:
        lines = [l.strip() for l in f.readlines() if l.strip()]
    port, ws_path = int(lines[0]), lines[1]
    ws = websocket.create_connection(f'ws://127.0.0.1:{port}{ws_path}', timeout=45, suppress_origin=True)

    msg_id = 0
    def cdp(method, params=None, session_id=None):
        nonlocal msg_id
        msg_id += 1
        cur_id = msg_id
        payload = {'id': cur_id, 'method': method, 'params': params or {}}
        if session_id:
            payload['sessionId'] = session_id
        ws.send(json.dumps(payload))
        while True:
            raw = ws.recv()
            data = json.loads(raw)
            if data.get('method') == 'Page.javascriptDialogOpening':
                msg_id += 1
                ws.send(json.dumps({
                    'id': msg_id,
                    'sessionId': session_id,
                    'method': 'Page.handleJavaScriptDialog',
                    'params': {'accept': True}
                }))
                continue
            if data.get('id') == cur_id:
                return data.get('result', {})

    tid = cdp('Target.createTarget', {'url': 'about:blank'}).get('targetId')
    sid = cdp('Target.attachToTarget', {'targetId': tid, 'flatten': True}).get('sessionId')
    cdp('Page.enable', {}, sid)

    for pid, pinfo in backup.get('products', {}).items():
        orig_brand = pinfo.get('origBrand') or '주누디자인'
        orig_mfg = pinfo.get('origMfg') or '주누디자인'
        orig_tags = pinfo.get('origTags') or []
        cdp('Runtime.evaluate', {'expression': f'window.onbeforeunload = null; location.href = "https://wing.coupang.com/tenants/seller-web/vendor-inventory/modify?vendorInventoryId={pid}"'}, sid)
        time.sleep(4.3)
        res = cdp('Runtime.evaluate', {
            'expression': f'''(async () => {{
                const sleep = ms => new Promise(r => setTimeout(r, ms));
                const origBrand = {json.dumps(orig_brand, ensure_ascii=False)};
                const origMfg = {json.dumps(orig_mfg, ensure_ascii=False)};
                const origTags = {json.dumps(orig_tags, ensure_ascii=False)};
                for (const el of document.querySelectorAll('*')) {{
                    if (!el.__vue__) continue;
                    const vm = el.__vue__;
                    const name = vm.$options?.name || '';
                    if (vm.$store?.state?.oSellerProduct) {{
                        vm.$store.state.oSellerProduct.brand = origBrand;
                        vm.$store.state.oSellerProduct.manufacturer = origMfg;
                    }}
                    if (name === 'ProductName' && typeof vm.inputBrand === 'function') {{
                        try {{ vm.inputBrand(origBrand); }} catch(e) {{}}
                    }}
                    if (name === 'SectionSearchTag' && typeof vm.updateSearchTags === 'function') {{
                        vm.updateSearchTags(origTags);
                    }}
                }}
                await sleep(300);
                const reqBtn = Array.from(document.querySelectorAll('button')).find(b => (b.innerText || '').includes('수정 및 검수 요청'));
                if (reqBtn) reqBtn.click();
                await sleep(800);
                const confirmBtns = Array.from(document.querySelectorAll('button')).filter(b => {{
                    const t = (b.innerText || '').trim();
                    return t === '확인' || t === '예';
                }});
                for (const b of confirmBtns) {{
                    b.click();
                    await sleep(350);
                }}
                await sleep(2200);
                return document.body.innerText.includes('수정요청이 완료되었습니다');
            }})()''',
            'returnByValue': True,
            'awaitPromise': True
        }, sid).get('result', {}).get('value')
        print(f'Restored {pid} ({pinfo.get("label")}): {res}')

    cdp('Target.closeTarget', {'targetId': tid})
    ws.close()

if __name__ == '__main__':
    main()
