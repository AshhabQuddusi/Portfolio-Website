const $ = id => document.getElementById(id);

function buildLetters(el, word, baseDelay, step){
  el.innerHTML = [...word].map((ch, i) =>
    `<span class="letter" style="animation-delay:${baseDelay + i * step}s">${ch}</span>`).join('');
}

document.body.style.overflow = 'hidden';
buildLetters($('introFirst'), 'ASHHAB', .6, .06);
buildLetters($('introLast'), 'QUDDUSI', .95, .06);
setTimeout(() => {
  $('introWipe').classList.add('active');
  setTimeout(() => {
    $('introWipeOut').classList.add('active');
    setTimeout(() => {
      $('intro-overlay').classList.add('hide');
      document.body.style.overflow = '';
    }, 400);
  }, 300);
}, 2500);

buildLetters($('heroFirst'), 'ASHHAB', .15, .07);
buildLetters($('heroLast'), 'QUDDUSI', .6, .07);

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
  {i:'🤖',t:'JobNest — AI Recruitment',d:'End-to-end AI-driven recruitment platform matching candidates using NLP & ML. Flask backend, MySQL, React frontend.',tags:['Python','Flask','MySQL','React','NLP'],gh:'https://github.com/AshhabQuddusi/JobNest'},
  {i:'📈',t:'Binance Trading Bot',d:'Automated crypto trading bot for Binance Futures with configurable strategy execution and REST API integration.',tags:['Python','REST APIs','Testing','Automation'],gh:'https://github.com/AshhabQuddusi/Binance-futures-trading-bot'},
  {i:'📚',t:'Citadel-library-management',d:'Full-stack library management web app using Python, HTML, CSS, and JavaScript with rental workflows, automated notifications, and responsive UI. project designed to manage books, users, and issue/return records efficiently with search and tracking features.',tags:['Python','JavaScript','HTML','CSS'],gh:'https://github.com/AshhabQuddusi/Citadel-library-management'},
  {i:'🎓',t:'Learn Tech Platform',d:'Gamified technical learning platform built with Python, HTML, CSS, JavaScript.',tags:['Python','JavaScript','HTML','CSS'],gh:'https://github.com/AshhabQuddusi/LearnTech-platform'},
  {i:'🌐',t:'Personal Portfolio Website',d:'A responsive and modern personal portfolio website built using HTML, CSS, and JavaScript to showcase my skills, projects, education, and contact information. The website features a clean user interface, smooth navigation, and a fully responsive design optimized for all devices.',tags:['HTML','CSS','JavaScript'],gh:'https://github.com/AshhabQuddusi/Portfolio-Website',live:'https://ashhabquddusi.vercel.app/'},
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

const render = (id, items, tpl) => { $(id).innerHTML = items.map(tpl).join(''); };
const tagList = (tags, cls) => tags.map(t => `<span class="${cls}">${t}</span>`).join('');
const expItem = e => `<div class="exp-item"><div class="exp-icon">${e.i}</div><div><div class="exp-title">${e.t}</div><div class="exp-company">${e.co}</div><div class="exp-date">${e.d}</div><div class="exp-desc">${e.desc}</div><div class="exp-tags">${tagList(e.tags, 'exp-tag')}</div></div></div>`;

$('marquee').innerHTML = Array(4).fill(MARQUEE_ITEMS).flat()
  .map(item => `<span class="marquee-item">${item}<span class="marquee-dot"> • </span></span>`).join('');

render('skillsGrid', SKILLS, s => `<div class="skill-card" data-cat="${s.c}"><div class="skill-emoji">${s.e}</div><div class="skill-name">${s.n}</div><div class="skill-cat">${s.c}</div></div>`);
render('projectsGrid', PROJECTS, (p, i) => `<div class="project-card"><div class="project-num">${String(i + 1).padStart(2, '0')}</div><div class="project-icon">${p.i}</div><div class="project-title">${p.t}</div><div class="project-desc">${p.d}</div><div class="project-tags">${tagList(p.tags, 'project-tag')}</div><div class="project-links"><a href="${p.gh}" class="project-link" target="_blank">GitHub →</a>${p.live ? `<a href="${p.live}" class="project-link" target="_blank">Live →</a>` : ''}</div></div>`);
render('certsGrid', CERTS, c => `<div class="cert-card"><div class="cert-icon">${c.i}</div><div class="cert-title">${c.t}</div><div class="cert-issuer">${c.org}</div><div class="cert-date">${c.d}</div><a href="${c.url}" class="cert-link" target="_blank">View Credential →</a></div>`);
render('expList', EXPS, expItem);
render('leadershipList', LEADERSHIP, expItem);

$('skillFilter').addEventListener('click', e => {
  const btn = e.target;
  if (!btn.matches('.filter-btn')) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b === btn));
  document.querySelectorAll('.skill-card').forEach(c => {
    c.hidden = btn.dataset.cat !== 'all' && c.dataset.cat !== btn.dataset.cat;
  });
});

const nav = $('nav');
const heroName = $('heroName');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
  if (window.scrollY < window.innerHeight) {
    heroName.style.transform = `translateY(${-(window.scrollY / window.innerHeight) * 60}px)`;
  }
}, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
    }
    $('navLinks').classList.remove('open');
  });
});

$('navToggle').addEventListener('click', e => {
  $('navLinks').classList.toggle('open');
  e.currentTarget.classList.toggle('open');
});

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(r => revealObs.observe(r));

for (let i = 0; i < 28; i++) {
  const p = document.createElement('div');
  const size = Math.random() < 0.3 ? 3 : 2;
  p.className = 'particle';
  p.style.cssText = `left:${20 + Math.random() * 60}%;bottom:${10 + Math.random() * 50}%;width:${size}px;height:${size}px;animation-duration:${4 + Math.random() * 5}s;animation-delay:${Math.random() * 6}s`;
  $('heroParticles').appendChild(p);
}

const hero = $('hero');
hero.addEventListener('mousemove', e => {
  const dx = (e.clientX - innerWidth / 2) / (innerWidth / 2);
  const dy = (e.clientY - innerHeight / 2) / (innerHeight / 2);
  heroName.style.transform = `translate(${dx * -8}px, ${dy * -5}px)`;
});
hero.addEventListener('mouseleave', () => {
  heroName.style.transition = 'transform .6s ease';
  heroName.style.transform = '';
  setTimeout(() => { heroName.style.transition = ''; }, 600);
});

new IntersectionObserver(([entry], obs) => {
  if (!entry.isIntersecting) return;
  obs.disconnect();
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = +el.dataset.target;
    const step = Math.ceil(target / 40);
    let n = 0;
    const timer = setInterval(() => {
      n = Math.min(n + step, target);
      el.textContent = n + '+';
      if (n >= target) clearInterval(timer);
    }, 35);
  });
}, { rootMargin: '0px 0px -20% 0px' }).observe($('impact'));

if (localStorage.getItem('theme') === 'light') document.body.classList.add('light');
$('themeToggle').addEventListener('click', () => {
  localStorage.setItem('theme', document.body.classList.toggle('light') ? 'light' : 'dark');
});
