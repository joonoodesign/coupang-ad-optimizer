/**
 * 주누디자인 쿠팡 윙 상품·광고 최적화 센터 - Google Drive 실시간 DB 연동 스크립트 (Google Apps Script)
 * 사용 방법:
 * 1. https://script.google.com 접속 -> 새 프로젝트 생성
 * 2. 이 코드 전체를 붙여넣고 저장
 * 3. 우측 상단 [배포] -> [새 배포] -> 유형: [웹 앱], 액세스 권한: [모든 사용자]로 배포
 * 4. 생성된 웹 앱 URL을 쿠팡 광고 최적화 대시보드의 [클라우드 동기화 설정 -> Google Drive]에 입력
 */

const FILE_NAME = 'coupang_ad_optimizer_sync_db.json';

function getOrCreateDbFile() {
  const files = DriveApp.getFilesByName(FILE_NAME);
  if (files.hasNext()) {
    return files.next();
  }
  const initialData = JSON.stringify({ updatedAt: Date.now(), note: 'Initialized by Coupang Ad Optimizer' });
  return DriveApp.createFile(FILE_NAME, initialData, MimeType.PLAIN_TEXT);
}

function doGet(e) {
  try {
    const file = getOrCreateDbFile();
    const content = file.getBlob().getDataAsString('UTF-8');
    return ContentService.createTextOutput(content).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const body = e.postData ? e.postData.contents : '{}';
    const file = getOrCreateDbFile();
    file.setContent(body);
    return ContentService.createTextOutput(JSON.stringify({ ok: true, updatedAt: Date.now() })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}
