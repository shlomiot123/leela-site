// ═══════════════════════════════════════════════════════
//  LEELA — Animations: Sun Salutation + Yoga Drawings + Reveal
// ═══════════════════════════════════════════════════════

// ─── SUN SALUTATION ANIMATION ────────────────────────────
// Abstract, delicate line-art woman cycling through Surya Namaskar
function buildSunSalutation(container) {
  if (!container) return;
  container.innerHTML = '';

  const STROKE = 'rgba(247,243,238,0.78)';
  const SW     = '1.8';
  const TOTAL  = 22;  // seconds for full cycle
  const FADE   = 0.5; // fade duration in seconds

  // 5 poses in ViewBox 0 0 200 280
  const POSES = [
    // 1. Samasthiti — standing neutral
    { head: [100,25], r: 14, parts: [
      'M100,39 L100,115',              // spine
      'M78,62 L122,62',                // shoulders
      'M78,62 L64,90 L58,122',         // L arm
      'M122,62 L136,90 L142,122',      // R arm
      'M86,115 L114,115',              // hips
      'M86,115 L78,165 L72,252',       // L leg
      'M114,115 L122,165 L128,252',    // R leg
    ]},
    // 2. Urdhva Hastasana — arms raised overhead
    { head: [100,25], r: 14, parts: [
      'M100,39 L100,115',
      'M78,62 L122,62',
      'M78,62 L60,26 L48,4',           // L arm raised
      'M122,62 L140,26 L152,4',        // R arm raised
      'M86,115 L114,115',
      'M86,115 L78,165 L72,252',
      'M114,115 L122,165 L128,252',
    ]},
    // 3. Uttanasana — forward fold
    { head: [82,215], r: 13, parts: [
      'M100,39 L100,115',              // upper spine (vertical)
      'M100,115 Q90,162 82,202',       // hinge + lower torso
      'M78,62 L88,100 L80,148 L78,208',// L arm hanging
      'M122,62 L112,98 L104,142 L88,206',
      'M86,115 L114,115',
      'M86,115 L80,165 L76,252',
      'M114,115 L120,165 L124,252',
    ]},
    // 4. Adho Mukha Svanasana — downward dog (inverted V)
    { head: [46,168], r: 13, parts: [
      'M100,68 L58,132 L32,228',       // L arm path (hip → shoulder → hand)
      'M100,68 L62,136 L36,232',       // arm width
      'M100,68 L142,138 L166,228',     // R leg (hip → knee → foot)
      'M100,68 L146,142 L170,232',     // leg width
      'M58,132 L48,156',               // neck toward head
    ]},
    // 5. Bhujangasana — cobra (spine rising from floor)
    { head: [162,122], r: 13, parts: [
      'M95,218 Q126,195 158,138',      // spine rising
      'M95,218 L62,228 L30,238',       // L leg flat
      'M95,218 L60,232 L28,244',       // R leg flat
      'M145,168 L150,215',             // L arm pushing
      'M156,152 L168,205',             // R arm pushing
    ]},
  ];

  const N = POSES.length;
  const POSE_DUR = TOTAL / N;
  const visP = (1 / N) * 100;
  const fiP  = (FADE / TOTAL) * 100;
  const foP  = visP - fiP;

  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 200 280');
  svg.style.cssText = 'width:100%;height:100%;overflow:visible';

  const styleEl = document.createElementNS(NS, 'style');
  styleEl.textContent = `
    @keyframes yogaPoseFade {
      0%,100% { opacity:0 }
      ${fiP.toFixed(2)}% { opacity:1 }
      ${foP.toFixed(2)}% { opacity:1 }
      ${visP.toFixed(2)}% { opacity:0 }
    }
  `;
  svg.appendChild(styleEl);

  POSES.forEach((pose, i) => {
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('fill', 'none');
    g.setAttribute('stroke', STROKE);
    g.setAttribute('stroke-width', SW);
    g.setAttribute('stroke-linecap', 'round');
    g.setAttribute('stroke-linejoin', 'round');

    const circ = document.createElementNS(NS, 'circle');
    circ.setAttribute('cx', pose.head[0]);
    circ.setAttribute('cy', pose.head[1]);
    circ.setAttribute('r', pose.r || 14);
    g.appendChild(circ);

    pose.parts.forEach(d => {
      const path = document.createElementNS(NS, 'path');
      path.setAttribute('d', d);
      g.appendChild(path);
    });

    const delay = i === 0 ? 0 : -(TOTAL - i * POSE_DUR);
    g.style.cssText = `opacity:0;animation:yogaPoseFade ${TOTAL}s ease-in-out ${delay}s infinite`;
    svg.appendChild(g);
  });

  container.appendChild(svg);
}


// ─── YOGA POSE DRAWINGS ────────────────────────────────
// Realistic SVG path-drawing animations (stroke reveals progressively)

const YOGA_DRAWINGS = {

  warrior2: {
    w: 160, h: 220,
    paths: [
      `M 80,60 L 80,105`,
      `M 80,50 m -12,0 a 12,16 0 1 1 24,0 a 12,16 0 1 1 -24,0`,
      `M 80,72 L 22,72`,
      `M 80,72 L 138,72`,
      `M 80,105 L 35,160`,
      `M 80,105 L 125,160`,
      `M 35,160 L 14,160`,
      `M 125,160 L 146,162`,
      `M 22,72 L 16,78`,
      `M 138,72 L 144,68`,
    ]
  },

  tree: {
    w: 90, h: 240,
    paths: [
      `M 45,240 L 45,140`,
      `M 45,140 L 45,75`,
      `M 45,62 m -11,0 a 11,15 0 1 1 22,0 a 11,15 0 1 1 -22,0`,
      `M 45,140 Q 55,120 60,105`,
      `M 60,105 Q 55,120 45,130`,
      `M 60,105 L 50,115`,
      `M 45,90 L 28,60`,
      `M 45,90 L 62,60`,
      `M 28,60 Q 36,42 45,36`,
      `M 62,60 Q 54,42 45,36`,
    ]
  },

  downdog: {
    w: 240, h: 180,
    paths: [
      `M 18,155 L 18,135`,
      `M 58,155 L 58,135`,
      `M 18,135 L 40,90`,
      `M 58,135 L 40,90`,
      `M 40,90 L 120,55 L 200,90`,
      `M 40,90 Q 35,95 30,100 m -5,0 a 8,10 0 1 1 16,0`,
      `M 120,55 L 150,110`,
      `M 120,55 L 160,115`,
      `M 150,110 L 180,155`,
      `M 160,115 L 200,155`,
      `M 180,155 L 178,160 M 200,155 L 202,160`,
    ]
  },

  seated_lotus: {
    w: 140, h: 170,
    paths: [
      `M 30,120 Q 20,100 30,80 Q 40,62 70,58 Q 100,62 110,80 Q 120,100 110,120 Z`,
      `M 70,58 L 70,100`,
      `M 70,44 m -12,0 a 12,15 0 1 1 24,0 a 12,15 0 1 1 -24,0`,
      `M 30,120 L 20,130 L 45,135`,
      `M 110,120 L 120,130 L 95,135`,
      `M 70,75 L 28,95 L 22,115`,
      `M 70,75 L 112,95 L 118,115`,
      `M 22,115 Q 24,120 28,118`,
      `M 118,115 Q 116,120 112,118`,
    ]
  },

  triangle: {
    w: 200, h: 220,
    paths: [
      `M 22,185 L 178,185`,
      `M 100,100 L 60,165`,
      `M 100,100 L 140,55`,
      `M 60,165 L 22,185`,
      `M 140,44 m -11,0 a 11,14 0 1 1 22,0 a 11,14 0 1 1 -22,0`,
      `M 100,100 L 140,55 L 140,44`,
      `M 60,165 L 22,215`,
      `M 60,165 L 178,185`,
      `M 22,215 L 10,215 M 178,185 L 192,183`,
    ]
  },

  forward_fold: {
    w: 130, h: 200,
    paths: [
      `M 42,195 L 88,195`,
      `M 42,195 L 42,120 M 88,195 L 88,120`,
      `M 42,120 L 88,120`,
      `M 65,120 Q 65,100 55,85 Q 48,72 42,62`,
      `M 55,60 m -9,0 a 9,12 0 1 1 18,0 a 9,12 0 1 1 -18,0`,
      `M 55,85 L 42,120`,
      `M 55,85 L 88,120`,
    ]
  },

  cobra: {
    w: 210, h: 140,
    paths: [
      `M 20,110 L 130,105`,
      `M 130,105 L 150,110`,
      `M 150,110 L 190,108`,
      `M 155,110 L 192,112`,
      `M 190,108 L 198,106 M 192,112 L 200,115`,
      `M 130,105 Q 115,90 100,75`,
      `M 100,75 L 90,55`,
      `M 88,44 m -10,0 a 10,13 0 1 1 20,0 a 10,13 0 1 1 -20,0`,
      `M 90,80 L 65,105 L 40,110`,
      `M 90,80 L 115,105 L 135,108`,
    ]
  },

  headstand: {
    w: 100, h: 220,
    paths: [
      `M 38,210 a 12,12 0 1 1 24,0`,
      `M 50,198 L 50,165`,
      `M 38,210 L 22,190 L 28,165`,
      `M 62,210 L 78,190 L 72,165`,
      `M 50,165 L 50,110`,
      `M 50,110 Q 40,108 35,105`,
      `M 50,110 L 38,60 L 32,15`,
      `M 50,110 L 62,60 L 68,15`,
      `M 32,15 L 26,10 M 68,15 L 74,10`,
    ]
  }
};

function buildYogaSilhouette(container, poseName) {
  const pose = YOGA_DRAWINGS[poseName];
  if (!pose) return;

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${pose.w} ${pose.h}`);
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.style.overflow = 'visible';

  const color = container.dataset.color || '#3D3530';
  const strokeW = container.dataset.strokeWidth || '2.5';

  pose.paths.forEach((d, i) => {
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', strokeW);
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');

    svg.appendChild(path);
    requestAnimationFrame(() => {
      const len = path.getTotalLength ? path.getTotalLength() : 100;
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;
      path.style.animation = `drawPath 1.2s ${0.15 + i * 0.1}s cubic-bezier(0.4,0,0.2,1) forwards`;
    });
  });

  container.innerHTML = '';
  container.appendChild(svg);
}

// ─── Scatter yoga drawings across sections ─────────────
function scatterSilhouettes() {
  const sections = document.querySelectorAll('section:not(#hero), .page-hero');
  const poses = Object.keys(YOGA_DRAWINGS);
  sections.forEach((sec, i) => {
    if (sec.querySelector('.yoga-silhouette')) return;
    const pose = poses[i % poses.length];
    const poseData = YOGA_DRAWINGS[pose];
    const size = 70 + Math.random() * 50;
    const ratio = poseData ? poseData.h / poseData.w : 2;
    const isLeft = i % 2 === 0;

    const sil = document.createElement('div');
    sil.className = 'yoga-silhouette';
    sil.dataset.yogaPose = pose;
    sil.dataset.color = 'rgba(61,53,48,0.25)';
    sil.dataset.strokeWidth = '2';
    sil.style.cssText = `
      width:${size}px; height:${size * ratio}px;
      ${isLeft ? 'left:1.5%' : 'right:1.5%'};
      top:${15 + Math.random() * 55}%;
      transform:${isLeft ? '' : 'scaleX(-1)'};
      animation: yogaFloat ${5 + Math.random() * 3}s ease-in-out infinite;
      animation-delay:${Math.random() * 2}s;
    `;

    sec.style.position = 'relative';
    sec.style.overflow = 'hidden';
    sec.appendChild(sil);

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          buildYogaSilhouette(sil, pose);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(sil);
  });
}

// ─── Scroll Reveal ──────────────────────────────────────
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach(el => observer.observe(el));
}

// ─── Nav ──────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const ham = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (ham && menu) {
    ham.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  }
}

// ─── Hero parallax ────────────────────────────────────
function initParallax() {
  const hero = document.querySelector('.hero-bg-img');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) hero.style.transform = `scaleX(-1) translateY(${y * 0.12}px)`;
  }, { passive: true });
}

// ─── Lightbox ─────────────────────────────────────────
function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const img = lb.querySelector('img');
  document.querySelectorAll('.gallery-masonry img').forEach(i => {
    i.addEventListener('click', () => { img.src = i.src; lb.classList.add('open'); });
  });
  lb.addEventListener('click', e => {
    if (e.target === lb || e.target.classList.contains('lightbox-close')) lb.classList.remove('open');
  });
}

// Inject keyframes
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes yogaFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes drawPath {
    from { stroke-dashoffset: var(--dash-len, 200); opacity: 0.5; }
    to   { stroke-dashoffset: 0; opacity: 1; }
  }
`;
document.head.appendChild(styleEl);

// ─── Init ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initNav();
  initParallax();
  initLightbox();
  scatterSilhouettes();

  const heroYoga = document.getElementById('hero-yoga');
  if (heroYoga) buildSunSalutation(heroYoga);

  document.querySelectorAll('[data-yoga-pose]').forEach(el => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { buildYogaSilhouette(el, el.dataset.yogaPose); obs.disconnect(); } });
    }, { threshold: 0.1 });
    obs.observe(el);
  });
});
