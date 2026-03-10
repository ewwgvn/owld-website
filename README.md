# owl'd — 공식 웹사이트

By your side in the dark, for the dawn…

---

## 🚀 배포 가이드 (처음부터 단계별)

### 준비물
- 컴퓨터 (Mac 또는 Windows)
- 인터넷 연결

---

### 1단계: Node.js 설치

1. https://nodejs.org 접속
2. **LTS 버전** (왼쪽 초록색 버튼) 다운로드
3. 설치 파일 실행 → 모두 "다음" 클릭
4. 설치 확인: 터미널(Mac) 또는 명령 프롬프트(Windows) 열고:
   ```
   node --version
   ```
   `v20.x.x` 같은 숫자가 나오면 성공

---

### 2단계: GitHub 계정 만들기

1. https://github.com 접속
2. "Sign up" 클릭 → 이메일, 비밀번호 설정
3. 무료 계정으로 가입

---

### 3단계: 프로젝트를 GitHub에 올리기

**방법 A: GitHub 웹사이트에서 직접 (가장 쉬움)**

1. GitHub에서 "New repository" 클릭
2. Repository name: `owld-website`
3. "Create repository" 클릭
4. "uploading an existing file" 링크 클릭
5. 이 폴더의 모든 파일을 드래그 앤 드롭
6. "Commit changes" 클릭

**방법 B: 터미널 사용**

```bash
cd owld-website
git init
git add .
git commit -m "owl'd website initial commit"
git branch -M main
git remote add origin https://github.com/너의유저네임/owld-website.git
git push -u origin main
```

---

### 4단계: Vercel에서 배포하기

1. https://vercel.com 접속
2. "Sign up" → **"Continue with GitHub"** 클릭
3. GitHub 계정으로 로그인
4. "Add New Project" 클릭
5. `owld-website` 저장소 선택
6. Framework: **Next.js** 자동 감지됨
7. **"Deploy"** 클릭
8. 1~2분 기다리면 완료!
9. `owld-website.vercel.app` 같은 주소가 생김 → 이게 너의 웹사이트!

---

### 5단계: 커스텀 도메인 연결 (선택사항)

1. 도메인 구매:
   - **owld.mn** (몽골 도메인) → https://nic.mn
   - **owld.com** → https://namecheap.com 또는 https://domains.google
   - 가격: 연간 ₩10,000~30,000 정도

2. Vercel에서 도메인 연결:
   - Vercel 프로젝트 → Settings → Domains
   - 구매한 도메인 입력
   - Vercel이 알려주는 DNS 설정을 도메인 관리 페이지에서 입력
   - 완료!

---

### 웹사이트 수정하기

1. `app/OwldWebsite.js` 파일에서 텍스트/내용 수정
2. GitHub에 다시 업로드 (push)
3. Vercel이 자동으로 새 버전을 배포함!

---

### 이미지 추가하기

1. 룩북 사진을 `public/` 폴더에 넣기
   - 예: `public/spirit-of-nomad-look1.jpg`
2. `OwldWebsite.js`에서 플레이스홀더를 이미지로 교체:
   ```jsx
   // 변경 전:
   <div style={{ aspectRatio: "3/4", background: "linear-gradient..." }}>
     <span>LOOK 1</span>
   </div>

   // 변경 후:
   <img src="/spirit-of-nomad-look1.jpg" alt="Look 1"
     style={{ width: "100%", height: "100%", objectFit: "cover" }} />
   ```

---

### 비용 정리

| 항목 | 비용 |
|------|------|
| Vercel 호스팅 | **무료** (개인 프로젝트) |
| GitHub | **무료** |
| 도메인 (선택) | 연간 ₩10,000~30,000 |
| **총** | **₩0 ~ ₩30,000/년** |

---

## 프로젝트 구조

```
owld-website/
├── app/
│   ├── layout.js          ← 사이트 기본 설정 (제목, 메타태그)
│   ├── page.js            ← 메인 페이지
│   ├── OwldWebsite.js     ← 웹사이트 본체 (여기서 내용 수정)
│   └── globals.css        ← 전체 스타일
├── public/                ← 이미지 넣는 폴더
├── package.json           ← 프로젝트 설정
├── next.config.js         ← Next.js 설정
├── .gitignore             ← Git 제외 파일
└── README.md              ← 이 파일
```

---

*owl'd — Where Tradition Takes Flight*
*© 2026 Galt Bilguun*
