// script.js — Campus Hub interactions

const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
const q = document.getElementById('q');
const list = document.getElementById('eventList');
const stats = document.getElementById('stats');

// 1. Mobile navigation toggle
function toggleNav() {
  const isOpen = navList.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
}
navToggle.addEventListener('click', toggleNav);
navToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleNav();
  }
});

// 2. Load events from events.json
async function loadEvents() {
  const res = await fetch('events.json');
  const items = await res.json();
  window.__EVENTS__ = items;
  render(items);
  updateStats(items.length);
}

function cardTemplate(ev) {
  return `<li class="card">
      <h3>${ev.title}</h3>
      <p>${ev.date} • <span class="badge">${ev.club}</span></p>
      <p>${ev.desc}</p>
    </li>`;
}

function render(items) {
  list.innerHTML = items.map(cardTemplate).join('');
}

// 3. Search filter
q.addEventListener('input', () => {
  const term = q.value.trim().toLowerCase();
  const items = (window.__EVENTS__ || []).filter(ev =>
    ev.title.toLowerCase().includes(term) ||
    ev.club.toLowerCase().includes(term)
  );
  render(items);
  updateStats(items.length);
});

function updateStats(n) {
  const total = (window.__EVENTS__ || []).length;
  stats.textContent = `${n} shown / ${total} total`;
}

// 4. FAQ expand/collapse
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    const target = document.getElementById(btn.getAttribute('aria-controls'));
    if (expanded) {
      target.hidden = true;
    } else {
      target.hidden = false;
    }
  });
});

loadEvents();
