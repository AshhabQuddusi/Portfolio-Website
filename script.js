/* ══════════════════════════════════════════
   CINEMATIC INTRO SEQUENCE
══════════════════════════════════════════ */
(function(){
  // Build letters helper (used for both intro & hero)
  function buildLettersInto(el, word, baseDelay, step, extraClass){
    el.innerHTML = '';
    word.split('').forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'letter' + (extraClass ? ' ' + extraClass : '');
      s.textContent = ch === ' ' ? ' ' : ch;
      s.style.animationDelay = (baseDelay + i * step) + 's';
      el.appendChild(s);
    });
  }

  // Build intro name letters
  buildLettersInto(document.getElementById('introFirst'), 'ASHHAB',  .6,  .06);
  buildLettersInto(document.getElementById('introLast'),  'QUDDUSI', .95, .06);

  // Glitch bursts at random intervals during intro
  
  
  

  // Dismiss overlay with wipe after 2.5s
  setTimeout(() => {
    document.getElementById('introWipe').classList.add('active');
    setTimeout(() => {
      document.getElementById('introWipeOut').classList.add('active');
      setTimeout(() => {
        const overlay = document.getElementById('intro-overlay');
        overlay.classList.add('hide');
        document.body.style.overflow = '';
      }, 400);
    }, 300);
  }, 2500);

  // Prevent scroll while intro plays
  document.body.style.overflow = 'hidden';
})();

/* ── DATA ── */
const SKILLS = [
  {e:'🐍',n:'Python',c:'language'},{e:'🌐',n:'JavaScript',c:'language'},{e:'⚙️',n:'C++',c:'language'},
  {e:'☕',n:'Java',c:'language'},{e:'🧮',n:'SQL',c:'language'},{e:'🎯',n:'Dart',c:'language'},
  {e:'🏗️',n:'HTML5',c:'web'},{e:'🎨',n:'CSS3',c:'web'},{e:'⚛️',n:'React',c:'web'},
  {e:'🚀',n:'Flask',c:'web'},{e:'🔗',n:'REST APIs',c:'web'},{e:'🖥️',n:'Front-End Dev',c:'web'},
  {e:'🎛️',n:'UI Design',c:'web'},
  {e:'🗄️',n:'MySQL',c:'data'},{e:'🐼',n:'Pandas',c:'data'},{e:'📊',n:'Data Analysis',c:'data'},
  {e:'🗃️',n:'Data Structures & Algorithms',c:'data'},{e:'🤖',n:'Machine Learning',c:'ai'},{e:'✨',n:'Generative AI',c:'ai'},
  {e:'💎',n:'Google Gemini',c:'ai'},{e:'🖼️',n:'Vertex AI',c:'ai'},{e:'💬',n:'Prompt Engineering',c:'ai'},
  {e:'🧠',n:'NLP',c:'ai'},{e:'🔌',n:'Gemini APIs',c:'ai'},{e:'🖌️',n:'Imagen',c:'ai'},
  {e:'🐙',n:'Git / GitHub',c:'tools'},{e:'🔷',n:'OOP / UML',c:'tools'},{e:'🦋',n:'Flutter',c:'tools'},
  {e:'🧪',n:'Python Testing',c:'tools'},{e:'🤖',n:'Test Automation',c:'tools'},{e:'🐚',n:'Shell Scripting',c:'tools'},
  {e:'💡',n:'Problem Solving',c:'tools'},{e:'🔍',n:'Code Review',c:'tools'},{e:'✅',n:'Code Quality',c:'tools'},
  {e:'🐞',n:'Debugging',c:'tools'},{e:'🚧',n:'Error Handling',c:'tools'},{e:'📦',n:'Virtual Environments',c:'tools'},
  {e:'📈',n:'Dashboard Tools',c:'tools'},
];
const PROJECTS = [
  {i:'🤖',n:'01',t:'JobNest — AI Recruitment',d:'End-to-end AI-driven recruitment platform matching candidates using NLP & ML. Flask backend, MySQL, React frontend.',tags:['Python','Flask','MySQL','React','NLP'],gh:'https://github.com/AshhabQuddusi/JobNest'},
  {i:'📈',n:'02',t:'Binance Trading Bot',d:'Automated crypto trading bot for Binance Futures with configurable strategy execution and REST API integration.',tags:['Python','REST APIs','Testing','Automation'],gh:'https://github.com/AshhabQuddusi/Binance-futures-trading-bot'},
  {i:'📚',n:'03',t:'Citadel-library-management',d:'Full-stack library management web app using Python, HTML, CSS, and JavaScript with rental workflows, automated notifications, and responsive UI. project designed to manage books, users, and issue/return records efficiently with search and tracking features.',tags:['Python','JavaScript','HTML','CSS'],gh:'https://github.com/AshhabQuddusi/Citadel-library-management'},
  {i:'🎓',n:'04',t:'Learn Tech Platform',d:'Gamified technical learning platform built with Python, HTML, CSS, JavaScript.',tags:['Python','JavaScript','HTML','CSS'],gh:'https://github.com/AshhabQuddusi/LearnTech-platform'},
  {i:'🌐',n:'05',t:'Personal Portfolio Website',d:'A responsive and modern personal portfolio website built using HTML, CSS, and JavaScript to showcase my skills, projects, education, and contact information. The website features a clean user interface, smooth navigation, and a fully responsive design optimized for all devices.',tags:['HTML','CSS','JavaScript'],gh:'https://github.com/AshhabQuddusi/Portfolio-Website',live:'https://ashhabquddusi.vercel.app/'},
];
const CERTS = [
  {i:'🐍',t:'Python Developer Certification',org:'freeCodeCamp',d:'Feb 2026',url:'https://freecodecamp.org/certification/ashhabquddusi/python-v9'},
  {i:'📉',t:'Software Engineering Job Simulation',org:'Quantium · Forage',d:'Feb 2026',url:'https://www.theforage.com/completion-certificates/32A6DqtsbF7LbKdcq/jhiG2W9K8KLZK8nXP_32A6DqtsbF7LbKdcq_696a1b178d5b9c666d16f9d7_1770820562251_completion_certificate.pdf'},
  {i:'🎮',t:'Software Engineering Job Simulation',org:'Electronic Arts · Forage',d:'Feb 2026',url:'https://www.theforage.com/completion-certificates/j43dGscQHtJJ57N54/a77WE3de8qrxWferQ_j43dGscQHtJJ57N54_696a1b178d5b9c666d16f9d7_1770811447317_completion_certificate.pdf'},
  {i:'🏛️',t:'Data Structures and Algorithms',org:'Amazon · Coursera',d:'Jan 2026',url:'https://www.coursera.org/account/accomplishments/records/JYW60RHB3X1J'},
  {i:'💻',t:'Software Engineer Intern Certificate',org:'HackerRank',d:'May 2025',url:'https://www.hackerrank.com/certificates/442593788050'},
  {i:'🤖',t:'Build Real World AI Apps with Gemini & Imagen',org:'Google',d:'Aug 2025',url:'https://www.credly.com/badges/6b73b164-674b-4ec5-b5aa-b4f0f2066311/linked_in_profile'},
  {i:'✨',t:'Explore Generative AI with Vertex AI',org:'Google',d:'Aug 2025',url:'https://www.credly.com/badges/e995c790-e54e-444d-b57f-bc312b852504/linked_in_profile'},
  {i:'📄',t:'Inspect Rich Docs with Gemini Multimodality & RAG',org:'Google',d:'Aug 2025',url:'https://www.credly.com/badges/09ac7a00-669a-4801-bfc7-80f26cc19a11/linked_in_profile'},
  {i:'💬',t:'Prompt Design in Vertex AI',org:'Google',d:'Apr 2025',url:'https://www.credly.com/badges/947de5ed-48fa-418c-a839-a9f257ac2d66/linked_in_profile'},
  {i:'🟨',t:'JavaScript Algorithms and Data Structures',org:'freeCodeCamp',d:'Aug 2024',url:'https://freecodecamp.org/certification/AshhabQuddusi/javascript-algorithms-and-data-structures'},
  {i:'🔬',t:'Intro to Generative AI Learning Path',org:'Google Cloud',d:'2025',url:'https://www.credly.com/'},
];
const EXPS = [
  {i:'🏥',t:'Software Engineering Intern',co:'Corporeal Health Solutions Pvt Ltd · Remote, New Delhi, India',d:'June 2026 - Present',desc:'Developing responsive cross-platform applications using Flutter and Dart, and building modern web interfaces with JavaScript, HTML, and CSS. Collaborating with the development team to implement new features, resolve bugs, and integrate APIs, with a focus on application performance and user experience. Using Git for version control while following industry-standard development practices.',tags:['Flutter','Dart','JavaScript','APIs','Git']},
];
const LEADERSHIP = [
  {i:'🔬',t:'Active Member & Technical Contributor',co:'IEEE Jamia Hamdard Student Branch',d:'October 2025 - Present',desc:'Participated in Technozova technical competitions and industry workshops. Collaborated on cross-functional engineering projects, enhancing leadership and communication skills.',tags:['Teamwork','Leadership','Problem Solving','Communication']},
];
const MARQUEE_ITEMS = ['ENGINEER BY CRAFT','BUILD WITH INTENT','SHIP WHAT MATTERS','CODE IS ARCHITECTURE','SYSTEMS OVER HACKS','THINK DEEPLY','ACT FAST','FULL-STACK & AI','OPEN TO OPPORTUNITIES'];

/* ── MARQUEE ── */
const marqueeEl = document.getElementById('marquee');
let mhtml = '';
for(let i=0;i<4;i++){
  MARQUEE_ITEMS.forEach(item=>{
    mhtml += '<span class="marquee-item">'+item+'<span class="marquee-dot"> • </span></span>';
  });
}
marqueeEl.innerHTML = mhtml;

/* ── SKILLS ── */
const sg = document.getElementById('skillsGrid');
SKILLS.forEach(s=>{
  const div = document.createElement('div');
  div.className = 'skill-card';
  div.dataset.cat = s.c;
  div.innerHTML = '<div class="skill-emoji">'+s.e+'</div><div class="skill-name">'+s.n+'</div><div class="skill-cat">'+s.c+'</div>';
  sg.appendChild(div);
});
document.getElementById('skillFilter').addEventListener('click',e=>{
  if(!e.target.matches('.filter-btn')) return;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  e.target.classList.add('active');
  const cat = e.target.dataset.cat;
  document.querySelectorAll('.skill-card').forEach(c=>{
    c.style.display = (cat==='all'||c.dataset.cat===cat)?'block':'none';
  });
});

/* ── PROJECTS ── */
const pg = document.getElementById('projectsGrid');
PROJECTS.forEach(p=>{
  const tags = p.tags.map(t=>'<span class="project-tag">'+t+'</span>').join('');
  const links = (p.gh?'<a href="'+p.gh+'" class="project-link" target="_blank">GitHub →</a>':'')+(p.live?'<a href="'+p.live+'" class="project-link" target="_blank">Live →</a>':'');
  const div = document.createElement('div');
  div.className = 'project-card';
  div.innerHTML = '<div class="project-num">'+p.n+'</div><div class="project-icon">'+p.i+'</div><div class="project-title">'+p.t+'</div><div class="project-desc">'+p.d+'</div><div class="project-tags">'+tags+'</div><div class="project-links">'+links+'</div>';
  pg.appendChild(div);
});

/* ── CERTS ── */
const cg = document.getElementById('certsGrid');
CERTS.forEach(c=>{
  const div = document.createElement('div');
  div.className = 'cert-card';
  div.innerHTML = '<div class="cert-icon">'+c.i+'</div><div class="cert-title">'+c.t+'</div><div class="cert-issuer">'+c.org+'</div><div class="cert-date">'+c.d+'</div><a href="'+c.url+'" class="cert-link" target="_blank">View Credential →</a>';
  cg.appendChild(div);
});

/* ── EXPERIENCE ── */
const el2 = document.getElementById('expList');
EXPS.forEach(e=>{
  const tags = e.tags.map(t=>'<span class="exp-tag">'+t+'</span>').join('');
  const div = document.createElement('div');
  div.className = 'exp-item';
  div.innerHTML = '<div class="exp-icon">'+e.i+'</div><div><div class="exp-title">'+e.t+'</div><div class="exp-company">'+e.co+'</div><div class="exp-date">'+e.d+'</div><div class="exp-desc">'+e.desc+'</div><div class="exp-tags">'+tags+'</div></div>';
  el2.appendChild(div);
});

/* ── LEADERSHIP & INVOLVEMENT ── */
const el3 = document.getElementById('leadershipList');
LEADERSHIP.forEach(e=>{
  const tags = e.tags.map(t=>'<span class="exp-tag">'+t+'</span>').join('');
  const div = document.createElement('div');
  div.className = 'exp-item';
  div.innerHTML = '<div class="exp-icon">'+e.i+'</div><div><div class="exp-title">'+e.t+'</div><div class="exp-company">'+e.co+'</div><div class="exp-date">'+e.d+'</div><div class="exp-desc">'+e.desc+'</div><div class="exp-tags">'+tags+'</div></div>';
  el3.appendChild(div);
});

/* ── NAV SCROLL BEHAVIOUR ── */
const navEl = document.getElementById('nav');
window.addEventListener('scroll',()=>{
  navEl.classList.toggle('scrolled', window.scrollY > 50);
  // Parallax
  const scrollY = window.scrollY;
  const nameEl = document.getElementById('heroName');
  const photoEl = document.getElementById('heroPhoto');
  if(scrollY < window.innerHeight){
    const pct = scrollY / window.innerHeight;
    if(nameEl) nameEl.style.transform = 'translateY('+(-pct*60)+'px)';
    if(photoEl) photoEl.style.transform = 'translate(-50%,-50%) translateY('+(-pct*30)+'px)';
  }
  // Count up stats when in view
  countUpTrigger();
});

/* ── SMOOTH ANCHOR SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(target){
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({top:offset,behavior:'smooth'});
    }
    document.getElementById('navLinks').classList.remove('open');
  });
});

/* ── MOBILE NAV TOGGLE ── */
const toggle = document.getElementById('navToggle');
toggle.addEventListener('click',()=>{
  document.getElementById('navLinks').classList.toggle('open');
  toggle.classList.toggle('open');
});

/* ── REVEAL ON SCROLL ── */
const allReveals = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const revealObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
},{threshold:0.07});
allReveals.forEach(r=>revealObs.observe(r));

/* ── LETTER-BY-LETTER NAME ANIMATION ── */
function buildLetters(el, word, baseDelay, step){
  el.innerHTML = '';
  word.split('').forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.textContent = ch === ' ' ? ' ' : ch;
    span.style.animationDelay = (baseDelay + i * step) + 's';
    el.appendChild(span);
  });
}
buildLetters(document.getElementById('heroFirst'), 'ASHHAB',  0.15, 0.07);
buildLetters(document.getElementById('heroLast'),  'QUDDUSI', 0.6,  0.07);
// Already called below but we need hover on them — add ripple via JS
function addLetterRipple(rowEl){
  rowEl.addEventListener('mouseover', e => {
    if(!e.target.classList.contains('letter')) return;
    const letters = [...rowEl.querySelectorAll('.letter')];
    const idx = letters.indexOf(e.target);
    letters.forEach((l, i) => {
      const dist = Math.abs(i - idx);
      if(dist === 0) return; // CSS handles :hover
      if(dist <= 2){
        const scale = 1 + (0.03 * (3 - dist));
        const ty = -(4 - dist) * 2;
        l.style.transform = `translateY(${ty}px) scale(${scale})`;
        l.style.transition = 'transform .2s ease';
        setTimeout(() => { l.style.transform = ''; }, 300 + dist * 80);
      }
    });
  });
}
// attach after letters are created
setTimeout(() => {
  addLetterRipple(document.getElementById('heroFirst'));
  addLetterRipple(document.getElementById('heroLast'));
}, 2000);


/* ── PARTICLES ── */
const particleContainer = document.getElementById('heroParticles');
const PARTICLE_COUNT = 28;
for(let i = 0; i < PARTICLE_COUNT; i++){
  const p = document.createElement('div');
  p.className = 'particle';
  const xPct = 20 + Math.random() * 60;   // cluster near center
  const delay = Math.random() * 6;
  const dur   = 4 + Math.random() * 5;
  const size  = Math.random() < 0.3 ? 3 : 2;
  p.style.cssText = `left:${xPct}%;bottom:${10 + Math.random()*50}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${delay}s`;
  particleContainer.appendChild(p);
}

/* ── MOUSE PARALLAX ON HERO ── */
const heroSection = document.getElementById('hero');
heroSection.addEventListener('mousemove', e => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  const nameEl  = document.getElementById('heroName');
  const photoEl = document.getElementById('heroPhoto');
  const glowEl  = heroSection.querySelector('.hero-glow');
  if(nameEl)  nameEl.style.transform  = `translate(${dx * -8}px, ${dy * -5}px)`;
  if(photoEl) photoEl.style.transform = `translate(calc(-50% + ${dx * 12}px), calc(-50% + ${dy * 8}px))`;
  if(glowEl)  glowEl.style.transform  = `translate(calc(-50% + ${dx * 6}px), calc(-50% + ${dy * 6}px))`;
});
heroSection.addEventListener('mouseleave', () => {
  const nameEl  = document.getElementById('heroName');
  const photoEl = document.getElementById('heroPhoto');
  const glowEl  = heroSection.querySelector('.hero-glow');
  if(nameEl)  nameEl.style.transition  = 'transform .6s ease';
  if(photoEl) photoEl.style.transition = 'transform .6s ease';
  if(glowEl)  glowEl.style.transition  = 'transform .6s ease';
  if(nameEl)  nameEl.style.transform   = '';
  if(photoEl) photoEl.style.transform  = 'translate(-50%,-50%)';
  if(glowEl)  glowEl.style.transform   = 'translate(-50%,-50%)';
  setTimeout(()=>{
    if(nameEl)  nameEl.style.transition  = '';
    if(photoEl) photoEl.style.transition = '';
    if(glowEl)  glowEl.style.transition  = '';
  }, 600);
});

/* ── COUNT UP NUMBERS ── */
let counted = false;
function countUpTrigger(){
  if(counted) return;
  const statsSection = document.getElementById('impact');
  const rect = statsSection.getBoundingClientRect();
  if(rect.top < window.innerHeight * 0.8){
    counted = true;
    document.querySelectorAll('.stat-num[data-target]').forEach(el=>{
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(()=>{
        current = Math.min(current + step, target);
        el.textContent = current + '+';
        if(current >= target) clearInterval(timer);
      }, 35);
    });
  }
}

/* ── DARK / LIGHT MODE TOGGLE ── */
const themeToggle = document.getElementById('themeToggle');
const savedTheme  = localStorage.getItem('theme') || 'dark';
if(savedTheme === 'light') document.body.classList.add('light');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});
