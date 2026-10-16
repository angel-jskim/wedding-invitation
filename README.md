# 💍 진수 결혼합니다 (신부 미정)

김진수의 개그 모바일 청첩장 템플릿. 빌드 없이 GitHub Pages에서 바로 열리는 정적 사이트예요.

## 내용 고치기

거의 모든 텍스트는 **`config.js`** 하나에서 바꿀 수 있어요.

| 항목 | 위치 |
|---|---|
| 신랑·신부 이름, 혼주 이름, 연락처 | `config.js` → `groom`, `bride` |
| 예식 일시 (달력·D-day 자동 반영) | `config.js` → `date` |
| 예식장 이름·홀·주소 | `config.js` → `venue` |
| 갤러리 사진·캡션 | `config.js` → `gallery` (사진은 `images/`) |
| 계좌 | `config.js` → `accounts` |
| 인사말, 신랑신부 소개 문구, 교통편 | `index.html` |

신부가 정해지면 `images/bride.svg`를 사진으로 바꾸고 `index.html`의 `bride.svg` 참조 2곳을 바꿔주세요.

## GitHub Pages 배포

1. 이 파일들을 레포 루트에 올리고 `main`에 push
2. GitHub 레포 → **Settings → Pages**
3. Source: **Deploy from a branch**, Branch: **main / (root)** → Save
4. 1~2분 뒤 `https://angel-jskim.github.io/wedding-invitation/` 에서 확인

## 참고

- 방명록은 서버 없이 브라우저(localStorage)에만 저장돼서 각자 기기에서만 보여요.
- 카카오톡 공유 미리보기 이미지(`og:image`)는 `https://angel-jskim.github.io/wedding-invitation/` 주소 기준으로 설정돼 있어요. 레포 이름이나 계정이 바뀌면 같이 바꿔주세요.
- 로컬 미리보기: `python3 -m http.server` 후 `http://localhost:8000`
