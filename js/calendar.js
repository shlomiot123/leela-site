// ═══════════════════════════════════════════════════════
//  Interactive Calendar + Search
// ═══════════════════════════════════════════════════════

let calYear, calMonth;

function initCalendar(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const now = new Date();
  calYear = now.getFullYear();
  calMonth = now.getMonth();

  renderCalendar(container);
}

function renderCalendar(container) {
  const allInstances = typeof getAllEventInstances === 'function' ? getAllEventInstances() : [];

  // Build a map: date -> events
  const eventMap = {};
  allInstances.forEach(e => {
    if (!eventMap[e.date]) eventMap[e.date] = [];
    eventMap[e.date].push(e);
  });

  const monthNames = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
  const dayNames = ['א\'','ב\'','ג\'','ד\'','ה\'','ו\'','ש\''];

  const firstDay = new Date(calYear, calMonth, 1);
  const lastDay = new Date(calYear, calMonth + 1, 0);
  const today = new Date().toISOString().split('T')[0];

  // Adjust: week starts Sunday (0)
  const startPad = firstDay.getDay();

  let html = `
    <div class="cal-wrap reveal">
      <div class="cal-header">
        <button class="cal-nav-btn" id="cal-prev" aria-label="חודש קודם">‹</button>
        <span class="cal-month-title">${monthNames[calMonth]} ${calYear}</span>
        <button class="cal-nav-btn" id="cal-next" aria-label="חודש הבא">›</button>
      </div>
      <div class="cal-grid">
        <div class="cal-weekdays">
          ${dayNames.map(d => `<div class="cal-weekday">${d}</div>`).join('')}
        </div>
        <div class="cal-days" id="cal-days">
  `;

  // Empty cells before month start
  for (let i = 0; i < startPad; i++) {
    html += `<div class="cal-day empty"></div>`;
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const hasEv = eventMap[dateStr]?.length > 0;
    const isToday = dateStr === today;
    const cls = [
      'cal-day',
      hasEv ? 'has-events' : '',
      isToday ? 'today' : ''
    ].filter(Boolean).join(' ');

    // Name + time labels per event (max 3)
    let labels = '';
    if (hasEv) {
      labels = `<div class="cal-day-labels">` +
        eventMap[dateStr].slice(0, 3).map(e =>
          `<span class="cal-day-label" style="background:${CATEGORY_COLORS?.[e.category] || 'var(--sage)'}">` +
          `${e.time} ${e.title}</span>`
        ).join('') +
        `</div>`;
    }

    html += `<div class="${cls}" data-date="${dateStr}"><span class="cal-day-num">${day}</span>${labels}</div>`;
  }

  html += `
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Nav buttons
  document.getElementById('cal-prev')?.addEventListener('click', () => {
    calMonth--;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    renderCalendar(container);
  });
  document.getElementById('cal-next')?.addEventListener('click', () => {
    calMonth++;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    renderCalendar(container);
  });

  // Day click
  container.querySelectorAll('.cal-day[data-date]').forEach(el => {
    el.addEventListener('click', () => {
      container.querySelectorAll('.cal-day').forEach(d => d.classList.remove('selected'));
      el.classList.add('selected');
      const date = el.dataset.date;
      const events = eventMap[date] || [];
      renderDayPopup(date, events, el);
    });
  });

  // Day hover tooltip
  container.querySelectorAll('.cal-day[data-date]').forEach(el => {
    const date = el.dataset.date;
    const events = eventMap[date] || [];
    if (!events.length) return;

    el.addEventListener('mouseenter', () => {
      let tip = el.querySelector('.cal-day-tooltip');
      if (!tip) {
        tip = document.createElement('div');
        tip.className = 'cal-day-tooltip';
        const items = events.slice(0, 3).map((ev, i) =>
          (i > 0 ? '<hr class="cal-day-tooltip-sep">' : '') +
          `<div class="cal-day-tooltip-title">${ev.title}</div>` +
          `<div class="cal-day-tooltip-meta">${ev.time} | ₪${ev.price}</div>`
        ).join('');
        tip.innerHTML = items;
        el.appendChild(tip);
      }
      requestAnimationFrame(() => tip.classList.add('visible'));
    });

    el.addEventListener('mouseleave', () => {
      const tip = el.querySelector('.cal-day-tooltip');
      if (tip) tip.classList.remove('visible');
    });
  });

  // Re-init reveal for new elements
  if (typeof initReveal === 'function') initReveal();
}

function renderDayPopup(dateStr, events, triggerEl) {
  document.querySelector('.cal-day-popup-backdrop')?.remove();
  document.querySelector('.cal-day-popup')?.remove();

  const [y, m, d] = dateStr.split('-');
  const monthNames = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
  const dateLabel = `${parseInt(d)} ${monthNames[parseInt(m)-1]} ${y}`;

  const backdrop = document.createElement('div');
  backdrop.className = 'cal-day-popup-backdrop';

  const popup = document.createElement('div');
  popup.className = 'cal-day-popup';

  const eventsHTML = events.length === 0
    ? `<p class="cal-popup-empty">אין אירועים ביום זה</p>`
    : events.map(e => `
      <div class="cal-popup-event" onclick="window.location.href='event.html?id=${encodeURIComponent(e.baseId)}'">
        <span class="cal-popup-dot" style="background:${CATEGORY_COLORS?.[e.category]||'var(--sage)'}"></span>
        <div class="cal-popup-info">
          <div class="cal-popup-title">${e.title}</div>
          <div class="cal-popup-meta">${e.time}–${e.endTime} | ${e.location}</div>
        </div>
        <span class="cal-popup-price">₪${e.price}</span>
      </div>
    `).join('');

  popup.innerHTML = `
    <div class="cal-popup-header">
      <span class="cal-popup-date">${dateLabel}</span>
      <button class="cal-popup-close" aria-label="סגור">✕</button>
    </div>
    <div class="cal-popup-list">${eventsHTML}</div>
  `;

  document.body.appendChild(backdrop);
  document.body.appendChild(popup);

  // Position popup near the clicked day
  const rect = triggerEl.getBoundingClientRect();
  const popupW = Math.min(300, window.innerWidth - 32);
  const gap = 8;

  // Try right of trigger, fall back to left
  let left = rect.right + gap;
  if (left + popupW > window.innerWidth - 16) {
    left = rect.left - popupW - gap;
  }
  if (left < 16) left = 16;

  // Vertical: align top of popup with top of trigger
  let top = rect.top + window.scrollY;
  const maxTop = window.scrollY + window.innerHeight - popup.offsetHeight - 16;
  if (top > maxTop) top = maxTop;
  if (top < window.scrollY + 16) top = window.scrollY + 16;

  popup.style.cssText += `position:absolute;left:${left}px;top:${top}px;width:${popupW}px;bottom:auto;transform:scale(0.85);transform-origin:${rect.right + gap < window.innerWidth - 16 ? 'right' : 'left'} top;`;

  requestAnimationFrame(() => {
    backdrop.classList.add('visible');
    popup.classList.add('visible');
  });

  const close = () => {
    backdrop.classList.remove('visible');
    popup.classList.remove('visible');
    setTimeout(() => { backdrop.remove(); popup.remove(); }, 280);
    document.querySelectorAll('.cal-day.selected').forEach(d => d.classList.remove('selected'));
  };

  backdrop.addEventListener('click', close);
  popup.querySelector('.cal-popup-close').addEventListener('click', close);
}

// ─── Search & Filter ────────────────────────────────────
function initEventSearch() {
  const searchInput = document.getElementById('event-search');
  const filterPills = document.querySelectorAll('.filter-pill');
  let activeFilter = 'all';

  function filterEvents() {
    const q = searchInput?.value?.toLowerCase() || '';
    const rows = document.querySelectorAll('[data-event-item]');
    rows.forEach(row => {
      const title = (row.dataset.title || '').toLowerCase();
      const cat = (row.dataset.category || '').toLowerCase();
      const instructor = (row.dataset.instructor || '').toLowerCase();
      const matchQ = !q || title.includes(q) || instructor.includes(q);
      const matchF = activeFilter === 'all' || cat === activeFilter;
      row.style.display = matchQ && matchF ? '' : 'none';
    });
  }

  searchInput?.addEventListener('input', filterEvents);

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.dataset.filter || 'all';
      filterEvents();
    });
  });
}

// ─── Event row expand ──────────────────────────────────
function initEventExpand() {
  document.querySelectorAll('[data-event-row]').forEach(row => {
    row.addEventListener('click', (e) => {
      // If clicking Register button, go to event page
      if (e.target.closest('[data-register]')) return;

      const id = row.dataset.eventRow;
      const panel = document.getElementById(`panel-${id}`);
      if (!panel) return;

      const isOpen = panel.classList.contains('open');
      // Close all panels
      document.querySelectorAll('.event-detail-panel.open').forEach(p => p.classList.remove('open'));
      document.querySelectorAll('[data-event-row].active').forEach(r => r.classList.remove('active'));
      if (!isOpen) {
        panel.classList.add('open');
        row.classList.add('active');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCalendar('calendar-container');
  initEventSearch();
  initEventExpand();
});
