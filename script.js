/* script.js
   Extracted from index.html */

// ═══════════════════════════════════════════════════
// ── IDEAS DATA ── Loaded from Supabase rather than hardcoded
// ═══════════════════════════════════════════════════

// ═══════════════════════════════════════════════════
// ── ESSAYS DATA ── Loaded from Supabase rather than hardcoded
// ═══════════════════════════════════════════════════════════════════
let essays = [];

function getRatingKey(type, index) {
  return `rating_${type}_${index}`;
}

function loadRating(type, index) {
  const value = localStorage.getItem(getRatingKey(type, index));
  return value === null ? 5 : Number(value);
}

function saveRating(type, index, value) {
  localStorage.setItem(getRatingKey(type, index), String(value));
}

function getRatingLabel(value) {
  const n = Number(value);
  if (n <= 1) return 'Strongly disagree';
  if (n <= 3) return 'Disagree';
  if (n <= 4) return 'Slightly disagree';
  if (n === 5) return 'Neutral';
  if (n <= 6) return 'Slightly agree';
  if (n <= 8) return 'Agree';
  return 'Strongly agree';
}

const themeToggle = document.getElementById('themeToggle');
const navbar = document.getElementById('navbar');
const ideaCount = document.getElementById('ideaCount');
const ideasGrid = document.getElementById('ideasGrid');
const essaysGrid = document.getElementById('essaysGrid');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const essayOverlay = document.getElementById('essayOverlay');
const essayClose = document.getElementById('essayClose');
const contactForm = document.getElementById('contactForm');
const essayPageTitle = document.getElementById('essayPageTitle');
const essayPageDate = document.getElementById('essayPageDate');
const essayPageImage = document.getElementById('essayPageImage');
const essayPageBody = document.getElementById('essayPageBody');
const essayPageRating = document.getElementById('essayPageRating');
const essayPageRatingLabel = document.getElementById('essayPageRatingLabel');
const essayPageRatingSubmit = document.getElementById('essayPageRatingSubmit');
const essayPageEmail = document.getElementById('essayPageEmail');
const essayPageSubmitMessage = document.getElementById('essayPageSubmitMessage');
const essayPageNotFound = document.getElementById('essayPageNotFound');
const relatedEssaysGrid = document.getElementById('relatedEssays');
const scrollProgressFill = document.getElementById('scrollProgressFill');

async function createIdeaCards() {
  const ideasGrid = document.querySelector(".ideas-grid");
  if (!ideasGrid) return;

  console.log('createIdeaCards called');

  ideasGrid.innerHTML = `
    <div class="idea-card skeleton">
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
    </div>
    <div class="idea-card skeleton">
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
    </div>
    <div class="idea-card skeleton">
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
    </div>
  `;

  const url = 'https://bhtlygnyjkavfymuyypx.supabase.co/rest/v1/ideas?select=*&is_published=eq.true&order=sort_order.asc';
  const headers = {
    apikey: 'sb_publishable_5rJ67suG6H7LmFrRDeUM7w_MAkGgzLD',
    Authorization: 'Bearer sb_publishable_5rJ67suG6H7LmFrRDeUM7w_MAkGgzLD'
  };

  console.log('IDEAS QUERY URL:', url);

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }
    const ideas = await response.json();

    console.log('IDEAS DATA:', ideas);
    if (!Array.isArray(ideas)) {
      console.error('IDEAS ERROR: expected an array from Supabase, got:', ideas);
      throw new Error('Unexpected ideas response shape');
    }
    if (ideas.length > 0) {
      console.log('IDEAS FIRST ITEM KEYS:', Object.keys(ideas[0]));
      console.log('IDEAS FIRST ITEM SAMPLE:', { title: ideas[0].title, desc: ideas[0].desc, full: ideas[0].full, tag: ideas[0].tag });
    }

    ideasGrid.innerHTML = '';
    ideaCount.textContent = String(ideas.length);

    ideas.forEach((idea) => {
      const card = document.createElement('div');
      card.className = 'idea-card reveal visible';
      card.dataset.category = idea.category;

      const tagDiv = document.createElement('div');
      tagDiv.className = 'card-tag';
      tagDiv.textContent = idea.tag;
      card.appendChild(tagDiv);

      const titleDiv = document.createElement('div');
      titleDiv.className = 'card-title';
      titleDiv.textContent = idea.title;
      card.appendChild(titleDiv);

      const descDiv = document.createElement('div');
      descDiv.className = 'card-desc';
      descDiv.textContent = idea.desc;
      card.appendChild(descDiv);

      const arrowDiv = document.createElement('div');
      arrowDiv.className = 'card-arrow';
      arrowDiv.textContent = '→';
      card.appendChild(arrowDiv);

      card.addEventListener('click', () => openModal(idea));
      ideasGrid.appendChild(card);
    });

    setupFilters();
  } catch (error) {
    console.log('IDEAS ERROR:', error);
    ideasGrid.innerHTML = `<div class="grid-error" style="color: var(--muted); font-size: 0.9rem; padding: 2rem;">Couldn't load ideas — try refreshing.</div>`;
  }
}

async function fetchEssays() {
  if (essays.length) return essays;
  const url = 'https://bhtlygnyjkavfymuyypx.supabase.co/rest/v1/essays?select=*&is_published=eq.true&order=created_at.desc';
  const headers = {
    apikey: 'sb_publishable_5rJ67suG6H7LmFrRDeUM7w_MAkGgzLD',
    Authorization: 'Bearer sb_publishable_5rJ67suG6H7LmFrRDeUM7w_MAkGgzLD'
  };

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Fetch failed with status ${response.status}`);
  }
  essays = await response.json();
  return essays;
}

function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (!filterButtons.length) return;
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.id === 'randomBtn') return;
      filterButtons.forEach(b => { if (b.id !== 'randomBtn') b.classList.remove('active'); });
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.idea-card').forEach(card => {
        card.classList.toggle('hidden', f !== 'all' && card.dataset.category !== f);
      });
    });
  });
}

function openRandomIdea() {
  const visibleCards = Array.from(document.querySelectorAll('.idea-card:not(.hidden)'));
  if (visibleCards.length === 0) return;
  const randomCard = visibleCards[Math.floor(Math.random() * visibleCards.length)];
  randomCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => randomCard.click(), 400);
}

function openModal(idea) {
  if (!modalOverlay) return;
  document.getElementById('modalTag').textContent = idea.tag;
  document.getElementById('modalTitle').textContent = idea.title;
  document.getElementById('modalBody').textContent = idea.full;
  document.getElementById('modalStatus').textContent = idea.status;
  document.getElementById('shareCopied').classList.remove('visible');
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function shareIdea() {
  const url = window.location.href.split('#')[0] + '#ideas';
  navigator.clipboard.writeText(url).then(() => {
    const msg = document.getElementById('shareCopied');
    msg.classList.add('visible');
    setTimeout(() => msg.classList.remove('visible'), 2500);
  });
}

async function renderEssayCards() {
  if (!essaysGrid) return;

  essaysGrid.innerHTML = `
    <div class="essay-card skeleton">
      <div class="essay-card-img-placeholder"></div>
      <div class="essay-card-body">
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
      </div>
    </div>
    <div class="essay-card skeleton">
      <div class="essay-card-img-placeholder"></div>
      <div class="essay-card-body">
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
      </div>
    </div>
  `;

  try {
    const loadedEssays = await fetchEssays();
    essaysGrid.innerHTML = '';

    loadedEssays.forEach((essay) => {
      const card = document.createElement('div');
      card.className = 'essay-card reveal';
      const imgHtml = essay.cover_image
        ? `<img src="${essay.cover_image}" alt="${essay.title}" class="essay-card-img">`
        : `<div class="essay-card-img-placeholder">✦</div>`;
      card.innerHTML = `
        ${imgHtml}
        <div class="essay-card-body">
          <div class="essay-card-date">${essay.date_label}</div>
          <div class="essay-card-title">${essay.title}</div>
          <div class="essay-card-preview">${essay.preview}</div>
          <a href="essay.html?id=${essay.id}" class="read-more-btn">Read more →</a>
        </div>
      `;
      essaysGrid.appendChild(card);
    });
  } catch (error) {
    essaysGrid.innerHTML = `<div class="grid-error" style="color: var(--muted); font-size: 0.9rem; padding: 2rem;">Couldn't load essays — try refreshing.</div>`;
  }
}

function getEssayIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function renderEssayPage() {
  if (!essayPageTitle || !essayPageDate || !essayPageBody) return;
  const essayId = getEssayIdFromUrl();
  if (!essayId) {
    if (essayPageNotFound) {
      essayPageNotFound.style.display = 'block';
    }
    return;
  }

  const url = `https://bhtlygnyjkavfymuyypx.supabase.co/rest/v1/essays?select=*&id=eq.${encodeURIComponent(essayId)}&limit=1`;
  const headers = {
    apikey: 'sb_publishable_5rJ67suG6H7LmFrRDeUM7w_MAkGgzLD',
    Authorization: 'Bearer sb_publishable_5rJ67suG6H7LmFrRDeUM7w_MAkGgzLD'
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }
    const loaded = await response.json();
    if (!loaded || loaded.length === 0) {
      if (essayPageNotFound) {
        essayPageNotFound.style.display = 'block';
      }
      return;
    }

    const essay = loaded[0];
    essayPageTitle.textContent = essay.title;
    essayPageDate.textContent = essay.date_label;
    essayPageBody.innerHTML = essay.body;

    if (essayPageImage) {
      if (essay.cover_image) {
        essayPageImage.src = essay.cover_image;
        essayPageImage.alt = essay.title;
        essayPageImage.style.display = 'block';
      } else {
        essayPageImage.style.display = 'none';
      }
    }

    await renderRelatedEssays(essay.id);

    try {
      await fetchEssays();
    } catch {
      // ignore; related essays already loaded if possible
    }

    const idx = essays.findIndex(e => String(e.id) === String(essay.id));
    initEssayPageRating(idx >= 0 ? idx : 0);
  } catch (error) {
    if (essayPageNotFound) {
      essayPageNotFound.style.display = 'block';
    }
  }
}

function initEssayPageRating(idx) {
  if (!essayPageRating || !essayPageRatingLabel) return;
  const rating = loadRating('essay', idx);
  essayPageRating.value = rating;
  essayPageRatingLabel.textContent = getRatingLabel(rating);
  if (essayPageEmail) essayPageEmail.value = '';
  if (essayPageSubmitMessage) essayPageSubmitMessage.textContent = '';
  essayPageRating.oninput = e => {
    const value = e.target.value;
    essayPageRatingLabel.textContent = getRatingLabel(value);
    saveRating('essay', idx, value);
  };
}

async function submitEssayRating() {
  if (!essayPageRating || !essayPageRatingSubmit) return;
  const rating = essayPageRating.value;
  const messageEl = essayPageSubmitMessage;
  const email = essayPageEmail?.value.trim() || '';
  if (rating === '' || rating === null || rating === undefined) {
    if (messageEl) messageEl.textContent = 'Please choose a rating before submitting.';
    return;
  }
  const label = getRatingLabel(rating);
  const essayId = getEssayIdFromUrl();
  const idx = essays.findIndex(e => String(e.id) === essayId);
  const essay = essays[idx] || {};
  essayPageRatingSubmit.textContent = 'Sending...';
  essayPageRatingSubmit.disabled = true;
  if (messageEl) messageEl.textContent = '';

  const formData = {
    email: email || 'no-reply@ideavault.com',
    _replyto: email || 'no-reply@ideavault.com',
    name: essay.title || 'Essay rating',
    topic: `Essay rating: ${essay.title || 'Unknown'}`,
    message: `Rating: ${rating} (${label})\nEssay: ${essay.title || 'Unknown'}\nDate: ${essay.date_label || 'Unknown'}\nEmail: ${email || 'Not provided'}`,
    private: 'Essay rating submission'
  };

  try {
    await fetch('https://formspree.io/f/mojrearv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (messageEl) messageEl.textContent = 'Rating sent — thank you!';
  } catch {
    if (messageEl) messageEl.textContent = 'Unable to send rating. Please try again.';
  }

  essayPageRatingSubmit.textContent = 'Submit rating';
  essayPageRatingSubmit.disabled = false;
}

async function renderRelatedEssays(currentId) {
  if (!relatedEssaysGrid) return;
  relatedEssaysGrid.innerHTML = '';

  try {
    await fetchEssays();
  } catch {
    // ignore fetch errors for related essays
  }

  const related = essays.filter(e => String(e.id) !== String(currentId)).slice(0, 3);
  related.forEach((essay) => {
    const card = document.createElement('a');
    card.className = 'essay-card reveal';
    card.href = `essay.html?id=${essay.id}`;
    const imgHtml = essay.cover_image
      ? `<img src="${essay.cover_image}" alt="${essay.title}" class="essay-card-img">`
      : `<div class="essay-card-img-placeholder">✦</div>`;
    card.innerHTML = `
      ${imgHtml}
      <div class="essay-card-body">
        <div class="essay-card-date">${essay.date_label}</div>
        <div class="essay-card-title">${essay.title}</div>
        <div class="essay-card-preview">${essay.preview}</div>
      </div>
    `;
    relatedEssaysGrid.appendChild(card);
  });
}

function initContactForm() {
  if (!contactForm) return;
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    if (!name || !email) { alert('Please fill in your name and email.'); return; }

    const btn = this.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const formData = {
      name,
      email,
      topic: document.getElementById('ftopic').value,
      message: document.getElementById('fmessage').value,
      private: document.getElementById('fprivate').checked ? 'Yes — keep private' : 'No — can be shared'
    };

    try {
      await fetch('https://formspree.io/f/mojrearv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      document.getElementById('formSuccess').style.display = 'block';
      this.reset();
      setTimeout(() => document.getElementById('formSuccess').style.display = 'none', 5000);
    } catch {
      alert('Something went wrong. Please try again.');
    }

    btn.textContent = 'Send Message →';
    btn.disabled = false;
  });
}

function initTheme() {
  if (!themeToggle) return;
  function applyTheme(isDark) {
    document.body.classList.toggle('light', !isDark);
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  }

  themeToggle.addEventListener('click', () => {
    const isCurrentlyDark = !document.body.classList.contains('light');
    applyTheme(!isCurrentlyDark);
    localStorage.setItem('theme', isCurrentlyDark ? 'light' : 'dark');
  });

  const savedTheme = localStorage.getItem('theme');
  applyTheme(savedTheme !== 'light');
}

function initNavbarScroll() {
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    if (scrollProgressFill) {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgressFill.style.width = scrollPercent + '%';
    }
  });
}

function initRevealObserver() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  if (essaysGrid) {
    const essayCardObserver = new MutationObserver(() => {
      document.querySelectorAll('.essay-card.reveal:not(.observed)').forEach(el => {
        el.classList.add('observed');
        revealObserver.observe(el);
      });
    });
    essayCardObserver.observe(essaysGrid, { childList: true });
  }
}

function initEscClose() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
      if (essayOverlay) closeEssay();
    }
  });
}

function closeEssay() {
  if (!essayOverlay) return;
  essayOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded fired');
  if (ideasGrid) {
    createIdeaCards();
    const randomBtn = document.getElementById('randomBtn');
    if (randomBtn) {
      randomBtn.addEventListener('click', openRandomIdea);
    }
  }

  if (essaysGrid) {
    renderEssayCards();
  }

  if (essayPageTitle) {
    renderEssayPage();
  }

  if (essayPageRatingSubmit) {
    essayPageRatingSubmit.addEventListener('click', submitEssayRating);
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
  }

  if (essayClose) {
    essayClose.addEventListener('click', closeEssay);
  }

  initTheme();
  initNavbarScroll();
  initRevealObserver();
  initEscClose();
  initContactForm();
});
