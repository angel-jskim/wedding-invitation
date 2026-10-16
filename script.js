(function () {
  const W = window.WEDDING;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const wedding = new Date(W.date);

  // ---------- 날짜 텍스트 ----------
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const kst = new Date(wedding.getTime() + 9 * 3600e3); // 표시용 KST
  const Y = kst.getUTCFullYear(), M = kst.getUTCMonth(), D = kst.getUTCDate();
  const h = kst.getUTCHours(), mi = kst.getUTCMinutes();
  const ampm = h < 12 ? "오전" : (h === 12 ? "낮" : "오후");
  const hh = h > 12 ? h - 12 : h;
  W.dateText = `${Y}년 ${M + 1}월 ${D}일 ${days[kst.getUTCDay()]}요일 ${ampm} ${hh}시${mi ? " " + mi + "분" : ""}`;
  W.venueText = `${W.venue.name} · ${W.venue.hall}`;

  // ---------- 바인딩 ----------
  const get = (path) => path.split(".").reduce((o, k) => (o ? o[k] : ""), W);
  $$("[data-bind]").forEach((el) => (el.textContent = get(el.dataset.bind)));

  // ---------- 토스트 ----------
  let tt;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(tt);
    tt = setTimeout(() => t.classList.remove("show"), 2200);
  }

  async function copy(text, msg) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch {}
      ta.remove();
    }
    toast(msg);
  }

  // ---------- 꽃잎 ----------
  const petals = $(".petals");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) {
    for (let i = 0; i < 14; i++) {
      const p = document.createElement("span");
      p.textContent = ["🌸", "💮", "🤍"][i % 3];
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = 9 + Math.random() * 8 + "s";
      p.style.animationDelay = -Math.random() * 15 + "s";
      p.style.fontSize = 12 + Math.random() * 10 + "px";
      petals.appendChild(p);
    }
  }

  // ---------- 달력 ----------
  (function calendar() {
    const first = new Date(Date.UTC(Y, M, 1)).getUTCDay();
    const last = new Date(Date.UTC(Y, M + 1, 0)).getUTCDate();
    let html = `<p class="cal-month">${M + 1}월</p><div class="cal-grid">`;
    days.forEach((d, i) => (html += `<span class="cal-h ${i === 0 ? "sun" : i === 6 ? "sat" : ""}">${d}</span>`));
    for (let i = 0; i < first; i++) html += "<span></span>";
    for (let d = 1; d <= last; d++) {
      const dow = (first + d - 1) % 7;
      const cls = [d === D ? "the-day" : "", dow === 0 ? "sun" : dow === 6 ? "sat" : ""].join(" ");
      html += `<span class="${cls}">${d}</span>`;
    }
    $("#calendar").innerHTML = html + "</div>";
  })();

  // ---------- 카운트다운 ----------
  function tick() {
    let diff = wedding - Date.now();
    const msg = $("#ddayMsg");
    if (diff <= 0) {
      $$("[data-cd]").forEach((b) => (b.textContent = "0"));
      msg.innerHTML = "🎉 결혼식이 시작됐어요! 신부는 아직 미정입니다";
      return;
    }
    const s = Math.floor(diff / 1000);
    const v = { d: Math.floor(s / 86400), h: Math.floor(s / 3600) % 24, m: Math.floor(s / 60) % 60, s: s % 60 };
    Object.entries(v).forEach(([k, n]) => ($(`[data-cd="${k}"]`).textContent = String(n).padStart(2, "0")));
    const dd = Math.ceil(diff / 86400e3);
    msg.innerHTML = `진수의 결혼식이 <b>${dd}일</b> 남았습니다<br><small>그 안에 신부를 찾을 수 있을까요?</small>`;
  }
  tick(); setInterval(tick, 1000);

  // ---------- 갤러리 + 라이트박스 ----------
  const g = $("#gallery");
  W.gallery.forEach((it, i) => {
    const b = document.createElement("button");
    b.className = "g-item";
    b.innerHTML = `<img src="${it.src}" alt="${it.caption}" loading="lazy">`;
    b.onclick = () => openLb(i);
    g.appendChild(b);
  });
  const lb = $("#lightbox");
  let cur = 0;
  function show(i) {
    cur = (i + W.gallery.length) % W.gallery.length;
    $("img", lb).src = W.gallery[cur].src;
    $("figcaption", lb).textContent = `${W.gallery[cur].caption}  (${cur + 1}/${W.gallery.length})`;
  }
  function openLb(i) { show(i); lb.hidden = false; document.body.style.overflow = "hidden"; }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ""; }
  $(".lb-close", lb).onclick = closeLb;
  $(".lb-prev", lb).onclick = () => show(cur - 1);
  $(".lb-next", lb).onclick = () => show(cur + 1);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
  let sx = 0;
  lb.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
  });

  // ---------- 계좌 ----------
  const acc = $("#accounts");
  W.accounts.forEach((grp) => {
    const d = document.createElement("details");
    d.innerHTML = `<summary>${grp.side}</summary>` + grp.list.map((a) => `
      <div class="acc-row">
        <div><p class="acc-who">${a.who}</p><p class="acc-num">${a.bank} ${a.number}</p></div>
        <button class="btn small" data-copy="${a.bank} ${a.number}">복사</button>
      </div>`).join("");
    acc.appendChild(d);
  });
  acc.addEventListener("click", (e) => {
    const b = e.target.closest("[data-copy]");
    if (b) copy(b.dataset.copy, "복사됐어요! (진짜 계좌 아님 주의)");
  });

  // ---------- RSVP ----------
  const no = $("#noBtn");
  let dodge = 0;
  const lines = ["못 가요", "진짜요?", "다시 생각해봐요", "밥 맛있는데", "잡을 수 없을걸요", "😢"];
  function run() {
    dodge++;
    const box = $("#rsvpBox").getBoundingClientRect();
    const x = (Math.random() - 0.5) * Math.min(220, box.width - 120);
    const y = (Math.random() - 0.5) * 70;
    no.style.transform = `translate(${x}px, ${y}px)`;
    no.textContent = lines[Math.min(dodge, lines.length - 1)];
  }
  no.addEventListener("mouseenter", run);
  no.addEventListener("click", (e) => {
    if (dodge < 5) { e.preventDefault(); run(); return; }
    $("#rsvpResult").innerHTML = "알겠어요… 진수네 엄마한테는 비밀로 할게요 🥲";
  });

  // ---------- 방명록 (localStorage) ----------
  const KEY = "jinsu-wedding-guestbook";
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
  const write = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} };
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const seed = [
    { name: "진수네 엄마", msg: "드디어… 근데 며느리는 언제 보여주니", t: 0 },
    { name: "진수 친구", msg: "축가 내가 함. 신부 생기면 연락 ㄱ", t: 0 },
  ];
  function render() {
    const list = read().concat(seed);
    $("#gbList").innerHTML = list.map((it) => `
      <li><p class="gb-name">${esc(it.name)}</p><p class="gb-msg">${esc(it.msg)}</p></li>`).join("");
  }
  $("#gbForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const list = read();
    list.unshift({ name: f.name.value.trim(), msg: f.msg.value.trim(), t: Date.now() });
    write(list.slice(0, 50));
    f.reset(); render(); toast("방명록 남겼어요 💌");
  });
  render();

  // ---------- 기타 버튼 ----------
  document.addEventListener("click", async (e) => {
    const a = e.target.closest("[data-action]");
    if (!a) return;
    const act = a.dataset.action;
    if (act === "copy-address") copy(W.venue.address, "주소 복사 완료! (근데 주소가 없어요)");
    if (act === "rsvp-yes") {
      $("#rsvpResult").innerHTML = "🙌 감사합니다! 진수네 엄마가 밥 한 그릇 더 하실게요";
      a.disabled = true;
    }
    if (act === "contact") {
      const p = W.groom.phone;
      if (p) location.href = `tel:${p}`;
      else toast("진수네 엄마는 지금 장 보러 가셨어요 🛒");
    }
    if (act === "share") {
      const data = { title: document.title, text: "진수 결혼합니다 (신부 미정)", url: location.href };
      if (navigator.share) { try { await navigator.share(data); } catch {} }
      else copy(location.href, "링크 복사 완료! 단톡방에 뿌려주세요");
    }
  });
})();
