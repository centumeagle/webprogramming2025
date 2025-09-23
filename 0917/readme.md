# 웹프 3장

- HTML5 필요성  
  기존 HTML = div, table 위주 → 의미 전달 부족  
  시맨틱 태그 도입 → 구조 명확, SEO·접근성 강화

- 주요 시맨틱 태그  
  header: 머리말  
  nav: 메뉴/링크 모음  
  section: 구획(장/절)  
  article: 독립 콘텐츠  
  aside: 참고·보조 내용  
  footer: 꼬리말(저작권, 작성일 등)  
  → 신문 지면 구조와 유사 (머리말·본문·부록·꼬리말)

- 활용 포인트  
  구조 = 태그 / 표현 = CSS  
  같은 화면이라도 HTML5는 의미가 살아 있음

- 문서 구조 예시  
  header → 제목, 소개  
  nav → 목차, 메뉴  
  section → 본문  
  article → 독립된 글 단위  
  aside → 보조 설명  
  footer → 작성일, 저작권

- 웹 폼 개념  
  사용자 입력 수집 도구  
  form 태그 사용  
  속성: action(처리 경로), method(GET/POST), enctype, target  
  → 로그인, 검색, 예약 등 대부분 form 기반

- 폼 요소  
  text / textarea → 글 입력  
  password → 비밀번호  
  button / submit / reset → 동작 버튼  
  checkbox / radio → 다중 vs 단일 선택  
  select/option → 콤보박스  
  date / time / month / week → 날짜·시간  
  number / range → 숫자, 범위  
  color → 색상 선택  
  email / url / tel / search → 형식 검증 지원  
  file → 파일 업로드  
  → 회원가입, 쇼핑몰, 설문지 등에서 자주 사용

- 작성 예시  
  로그인: id + pw + submit  
  자기소개: textarea  
  datalist: 자동완성 기능  
  label: 입력 요소와 연결 (접근성↑)  
  fieldset/legend: 그룹화 (설문지 묶음 표현)

- 제거된 태그  
  font, center, big, u, frameset 등 → 의미 없는 태그 삭제  
  → 디자인은 CSS, 구조는 HTML

- 색상/스타일  
  색상: #rrggbb, 이름 지정 가능  
  input type="color" → 사용자 직접 선택  
  레이아웃·디자인 = CSS3  
  → HTML = 뼈대, CSS = 옷차림
---

# 결론
HTML5 → 시맨틱 태그로 구조 명확화  
웹 폼 → 다양한 입력 요소로 사용자 상호작용 강화  
핵심 → 구조와 표현 분리, 의미 중심 태그 활용
