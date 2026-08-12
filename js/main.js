document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  try {
    setLanguage(currentLang);
    initLangToggle();
    initHeader();
    initSkills();
    renderProjects();
    initCounters();
    initReveal();
    initMagnetic();
    document.getElementById("year").textContent = new Date().getFullYear();
    ensureContentVisible();
  } catch (e) {
    // If one initializer fails, force critical sections visible and usable.
    safeRecover();
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("hidden");
    console.error("Init error:", e);
  }
  // Hard fallback: never keep page blocked by loader
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("hidden");
  }, 3000);
});

function initLoader(){
  const loader = document.getElementById("loader");
  if (!loader) return;
  setTimeout(() => loader.classList.add("hidden"), 1200);
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hidden"), 850);
  });
}

function initLangToggle(){
  const btn = document.getElementById("langToggle");
  if(!btn) return;
  btn.addEventListener("click", () => {
    setLanguage(currentLang === "ka" ? "en" : "ka");
    renderProjects();
    initSkills();
    requestAnimationFrame(() => {
      initReveal();
      ensureContentVisible();
    });
  });
}

function initHeader(){
  const header = document.getElementById("header");
  const links = document.querySelectorAll(".links a");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 18);
  });
  const sections = document.querySelectorAll("section[id]");
  const io = new IntersectionObserver((entries)=>{
    entries.forEach((e)=>{
      if(!e.isIntersecting) return;
      links.forEach((a)=>a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`));
    });
  }, {rootMargin:"-40% 0px -50% 0px"});
  sections.forEach((s)=>io.observe(s));
}

function initSkills(){
  const data = [
    {name:"HTML",v:90},{name:"CSS",v:85},{name:"JavaScript",v:80},{name:"React",v:75},{name:"C++",v:70},{name:"Node.js",v:60}
  ];
  const grid = document.getElementById("skillsGrid");
  if(!grid) return;
  grid.innerHTML = "";
  data.forEach((s)=>{
    const el = document.createElement("div");
    el.className = "skill";
    const label = i18n[currentLang].level;
    el.innerHTML = `<strong>${s.name}</strong><div class="bar"><div class="fill" style="width:${s.v}%"></div></div><small>${label}: ${s.v}%</small>`;
    grid.appendChild(el);
  });
}

function initCounters(){
  document.querySelectorAll("[data-count]").forEach((el)=>{
    const target = Number(el.getAttribute("data-count") || 0);
    let n = 0;
    const t = setInterval(() => {
      n += 1;
      el.textContent = String(Math.min(n, target));
      if(n >= target) clearInterval(t);
    }, 100);
  });
}

function initReveal(){
  const items = document.querySelectorAll(".skill,.project,.card,.reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach((i) => i.classList.add("show"));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach((e)=>{
      if(e.isIntersecting) e.target.classList.add("show");
    });
  }, {threshold:.12});
  items.forEach((i)=>io.observe(i));
}

function initMagnetic(){
  document.querySelectorAll(".magnetic").forEach((el)=>{
    el.addEventListener("mousemove",(e)=>{
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width/2);
      const y = e.clientY - (r.top + r.height/2);
      el.style.transform = `translate(${x*0.12}px,${y*0.12}px)`;
    });
    el.addEventListener("mouseleave",()=>{ el.style.transform = ""; });
  });
}

function ensureContentVisible() {
  setTimeout(() => {
    document.querySelectorAll(".card,.reveal,.skill,.project").forEach((el) => {
      el.classList.add("show");
    });
  }, 1600);
}

function safeRecover() {
  try {
    if (typeof setLanguage === "function") setLanguage(currentLang || "ka");
    if (typeof initSkills === "function") initSkills();
    if (typeof renderProjects === "function") renderProjects();
  } catch (_) {
    // Keep going and at least reveal static sections.
  }
  document.querySelectorAll(".card,.reveal,.skill,.project").forEach((el) => {
    el.classList.add("show");
  });
}
