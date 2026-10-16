// =============================================
//  청첩장 내용은 여기만 고치면 됩니다 ✏️
// =============================================
window.WEDDING = {
  groom: {
    name: "김진수",
    short: "진수",
    father: "진수네 아빠",
    mother: "진수네 엄마",
    phone: "",            // 예: "010-0000-0000"
  },
  bride: {
    name: "???",
    short: "???",
    father: "???네 아빠",
    mother: "???네 엄마",
    phone: "",
  },

  // 예식 일시 (한국 시간)
  date: "2026-10-17T12:30:00+09:00",

  venue: {
    name: "진수네 집",
    hall: "1층 거실홀 (소파 앞)",
    address: "진수네 집 (주소는 진수네 엄마한테 물어보세요)",
  },

  gallery: [
    { src: "images/g1.jpg", caption: "Scene #1 — 웨딩 화보 (보정 들어감)" },
    { src: "images/g2.jpg", caption: "Scene #2 — 흑백으로 분위기 냄" },
    { src: "images/g3.jpg", caption: "Scene #3 — 70년대 결혼사진 감성" },
    { src: "images/g4.jpg", caption: "Scene #4 — 얼굴 클로즈업 (신랑 측 요청)" },
    { src: "images/g5.jpg", caption: "Scene #5 — 좌우 반전. 다른 사진 맞음" },
    { src: "images/g6.jpg", caption: "Scene #6 — 신랑의 진짜 사랑, 아아" },
  ],

  accounts: [
    {
      side: "신랑측에게",
      list: [
        { who: "신랑 김진수", bank: "돼지저금통은행", number: "0000-00-000000" },
        { who: "진수네 아빠", bank: "장롱밑은행", number: "1111-11-111111" },
        { who: "진수네 엄마", bank: "비상금은행", number: "2222-22-222222" },
      ],
    },
    {
      side: "신부측에게",
      list: [
        { who: "신부 ???", bank: "미정은행", number: "????-??-??????" },
      ],
    },
  ],
};
