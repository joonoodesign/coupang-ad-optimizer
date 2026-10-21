import os
import sys
import json
import time
import websocket

sys.stdout.reconfigure(encoding='utf-8')

BACKUP_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'snapshots', 'wing_options_backup_2026-10-21.json')


def main():
    if not os.path.exists(BACKUP_FILE):
        print(f"백업 파일이 존재하지 않습니다: {BACKUP_FILE}")
        return

    with open(BACKUP_FILE, 'r', encoding='utf-8') as f:
        backup = json.load(f)

    port_file = r'C:\Users\User\AppData\Local\Google\Chrome\User Data\DevToolsActivePort'
    with open(port_file, 'r', encoding='utf-8') as f:
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

    tid = cdp('Target.createTarget', {'url': 'about:blank', 'background': True}).get('targetId')
    sid = cdp('Target.attachToTarget', {'targetId': tid, 'flatten': True}).get('sessionId')
    cdp('Page.enable', {}, sid)

    for pid, pinfo in backup.get('products', {}).items():
        label = pinfo.get('label', pid)
        orig_items = pinfo.get('data', {}).get('singleOpt', {}).get('items', [])
        if not orig_items:
            continue
        orig_attrs = orig_items[0].get('_attributes', [])
        orig_item_name = orig_items[0].get('itemName', '')

        cdp('Runtime.evaluate', {
            'expression': f'window.onbeforeunload = null; location.href = "https://wing.coupang.com/tenants/seller-web/vendor-inventory/modify?vendorInventoryId={pid}"'
        }, sid)
        time.sleep(5.0)

        attrs_json = json.dumps(orig_attrs, ensure_ascii=False)
        item_name_json = json.dumps(orig_item_name, ensure_ascii=False)

        res = cdp('Runtime.evaluate', {
            'expression': f'''(async () => {{
                const sleep = ms => new Promise(r => setTimeout(r, ms));
                const origAttrs = {attrs_json};
                const origItemName = {item_name_json};

                for (const el of document.querySelectorAll('*')) {{
                    if (el.__vue__ && el.__vue__.$options && el.__vue__.$options.name === 'SingleOptionPane') {{
                        const vm = el.__vue__;
                        if (vm.items && vm.items[0]) {{
                            const it = vm.items[0];
                            it.itemName = origItemName;
                            it._attributes = JSON.parse(JSON.stringify(origAttrs));
                            if (it.attributes) it.attributes = JSON.parse(JSON.stringify(origAttrs));
                            if (it._attributeMap) {{
                                for (const a of origAttrs) {{
                                    it._attributeMap[a.attributeTypeName] = JSON.parse(JSON.stringify(a));
                                }}
                            }}
                        }}
                    }}
                }}
                const reqBtn = Array.from(document.querySelectorAll('button')).find(b => (b.innerText || '').includes('수정 및 검수 요청'));
                if (reqBtn) reqBtn.click();
                await sleep(1000);
                const confirmBtn = Array.from(document.querySelectorAll('button')).find(b => (b.innerText || '').trim() === '확인');
                if (confirmBtn) confirmBtn.click();
                await sleep(2500);
                return {{ restored: true, bodyHasComplete: document.body.innerText.includes('수정요청이 완료되었습니다') }};
            }})()''',
            'returnByValue': True,
            'awaitPromise': True
        }, sid).get('result', {}).get('value')
        print(f"[복구 완료] {pid} ({label}): {res}")

    cdp('Target.closeTarget', {'targetId': tid})
    ws.close()


if __name__ == '__main__':
    main()
