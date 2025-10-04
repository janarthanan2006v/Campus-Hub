// script.js — Option A (Campus Hub)
// Implements two interactions: Mobile Navigation Toggle and Search Filter.

const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
const q = document.getElementById('q');
const list = document.getElementById('eventList');
const stats = document.getElementById('stats');

// --- INLINE EVENT DATA (6 events) ---
const INLINE_EVENTS = [
    {
        "id": 1,
        "title": "AI Study Jam",
        "club": "Coding Club",
        "date": "2025-10-10",
        "desc": "Intro to ML notebooks and datasets."
    },
    {
        "id": 2,
        "title": "Web Accessibility Walkthrough",
        "club": "Web Club",
        "date": "2025-10-12",
        "desc": "ARIA basics and keyboard testing."
    },
    {
        "id": 3,
        "title": "Robotics Lab Visit",
        "club": "Robotics",
        "date": "2025-10-14",
        "desc": "See the bots and demos in action."
    },
    {
        "id": 4,
        "title": "Design for Developers",
        "club": "UI/UX",
        "date": "2025-10-16",
        "desc": "Layout, spacing, and contrast."
    },
    {
        "id": 5,
        "title": "Cybersecurity Workshop",
        "club": "Security Team",
        "date": "2025-10-18",
        "desc": "Hands-on session on ethical hacking basics."
    },
    {
        "id": 6,
        "title": "Game Dev Night",
        "club": "Gaming Club",
        "date": "2025-10-20",
        "desc": "Quick prototyping challenge using Unity."
    }
];

// --- INTERACTION 1: Navigation Toggle ---

function toggleNav() {
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  // Toggle the 'open' class on the nav list
  navList.classList.toggle('open');
  // Update aria-expanded on the button
  navToggle.setAttribute('aria-expanded', String(!isExpanded));
}

// Handle click event
navToggle.addEventListener('click', toggleNav);

// Handle keyboard events (Enter/Space)
navToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleNav();
  }
});

// --- DATA RENDERING AND INITIAL LOAD ---

function loadEvents() {
  // Use the inline data and store it globally for search filtering
  window.__EVENTS__ = INLINE_EVENTS;
  render(INLINE_EVENTS);
  updateStats(INLINE_EVENTS.length);
}

function cardTemplate(ev) {
  return `<li class="card">
      <h3>${ev.title}</h3>
      <p>${ev.date} • <span class="badge">${ev.club}</span></p>
      <p>${ev.desc}</p>
    </li>`;
}

function render(items) {
  if (items.length === 0) {
    list.innerHTML = `<li style="text-align: center; color: var(--muted); padding: 20px 0;">No events found matching your search.</li>`;
  } else {
    list.innerHTML = items.map(cardTemplate).join('');
  }
}

// --- INTERACTION 2: Search Filter for title/club ---

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

// Start the application
loadEvents();
