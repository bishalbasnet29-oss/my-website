/* script.js
   Extracted from index.html */

// ═══════════════════════════════════════════════════
// ── IDEAS DATA ── Loaded from Supabase rather than hardcoded
// ═══════════════════════════════════════════════════

// ═══════════════════════════════════════════════════
// ── ESSAYS DATA ── Loaded from Supabase rather than hardcoded
// ═══════════════════════════════════════════════════════════════════
let essays = [];

// ═══════════════════════════════════════════════════
// ── SUPABASE CONFIG ──
// ═══════════════════════════════════════════════════
const SUPABASE_URL = 'https://bhtlygnyjkavfymuyypx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_5rJ67suG6H7LmFrRDeUM7w_MAkGgzLD';
const SUPABASE_HEADERS = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=minimal'
};

// ── Save rating to Supabase ratings table (future-proof: works for any idea/essay by ID)
// Table needed: ratings (id, type TEXT, item_id TEXT, rating INT, email TEXT, created_at TIMESTAMPTZ)
async function saveRatingToSupabase(type, itemId, rating, email) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/ratings`, {
      method: 'POST',
      headers: SUPABASE_HEADERS,
      body: JSON.stringify({
        type,           // 'idea' or 'essay'
        item_id: String(itemId),
        rating: Number(rating),
        email: email || null,
        created_at: new Date().toISOString()
      })
    });
    return res.ok || res.status === 201;
  } catch {
    return false;
  }
}

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

// ── HAMBURGER MENU ──
function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  if (menu) menu.classList.remove('open');
  if (hamburger) hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!hamburger || !menu) return;
  hamburger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
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
const relatedEssaysSection = document.getElementById('relatedEssaysSection');
const scrollProgressFill = document.getElementById('scrollProgressFill');
const ideaModalRating = document.getElementById('ideaModalRating');
const ideaModalRatingLabel = document.getElementById('ideaModalRatingLabel');
const ideaRatingSubmit = document.getElementById('ideaRatingSubmit');
const ideaModalEmail = document.getElementById('ideaModalEmail');
const ideaRatingSubmitMessage = document.getElementById('ideaRatingSubmitMessage');
const ratingBlock = document.getElementById('ratingBlock');

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

    ideas.forEach((idea, index) => {
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

      card.addEventListener('click', () => openModal(idea, index));
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

let currentIdeaIndex = null;

function openModal(idea, index) {
  if (!modalOverlay) return;
  currentIdeaIndex = index;
  document.getElementById('modalTag').textContent = idea.tag;
  document.getElementById('modalTitle').textContent = idea.title;
  document.getElementById('modalBody').textContent = idea.full;
  document.getElementById('modalStatus').textContent = idea.status;
  document.getElementById('shareCopied').classList.remove('visible');
  initIdeaModalRating(index);
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function shareIdea() {
  const baseUrl = window.location.href.split('#')[0];
  const ideaParam = currentIdeaIndex !== null ? `?idea=${currentIdeaIndex}` : '';
  const url = `${baseUrl}#ideas${ideaParam}`;
  navigator.clipboard.writeText(url).then(() => {
    const msg = document.getElementById('shareCopied');
    if (msg) {
      msg.classList.add('visible');
      setTimeout(() => msg.classList.remove('visible'), 2500);
    }
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

    await fetchEssays();
    await renderRelatedEssays(essay.id);

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
  const essayId = getEssayIdFromUrl();
  essayPageRatingSubmit.textContent = 'Sending...';
  essayPageRatingSubmit.disabled = true;
  if (messageEl) messageEl.textContent = '';

  // Save to Supabase — item_id is the essay's actual DB id (fully future-proof)
  const ok = await saveRatingToSupabase('essay', essayId, rating, email);
  if (ok) {
    if (messageEl) messageEl.textContent = '✓ Rating recorded — thank you!';
    const idx = essays.findIndex(e => String(e.id) === String(essayId));
    if (idx >= 0) saveRating('essay', idx, rating);
  } else {
    if (messageEl) messageEl.textContent = 'Unable to save rating. Please try again.';
  }

  essayPageRatingSubmit.textContent = 'Submit rating';
  essayPageRatingSubmit.disabled = false;
}

function initIdeaModalRating(idx) {
  if (!ideaModalRating || !ideaModalRatingLabel || !ratingBlock) return;
  ratingBlock.classList.remove('rating-hidden');
  const rating = loadRating('idea', idx);
  ideaModalRating.value = rating;
  ideaModalRatingLabel.textContent = getRatingLabel(rating);
  if (ideaModalEmail) ideaModalEmail.value = '';
  if (ideaRatingSubmitMessage) ideaRatingSubmitMessage.textContent = '';
  ideaModalRating.oninput = e => {
    const value = e.target.value;
    ideaModalRatingLabel.textContent = getRatingLabel(value);
    saveRating('idea', idx, value);
  };
}

async function submitIdeaRating() {
  if (!ideaModalRating || !ideaRatingSubmit || currentIdeaIndex === null) return;
  const rating = ideaModalRating.value;
  const messageEl = ideaRatingSubmitMessage;
  const email = ideaModalEmail?.value.trim() || '';
  if (rating === '' || rating === null || rating === undefined) {
    if (messageEl) messageEl.textContent = 'Please select a rating.';
    return;
  }
  ideaRatingSubmit.textContent = 'Sending...';
  ideaRatingSubmit.disabled = true;
  if (messageEl) messageEl.textContent = '';

  // Save to Supabase — item_id is the idea's index (works for any new idea you add)
  const ok = await saveRatingToSupabase('idea', currentIdeaIndex, rating, email);
  if (ok) {
    if (messageEl) messageEl.textContent = '✓ Rating recorded — thank you!';
    saveRating('idea', currentIdeaIndex, rating); // also cache locally
  } else {
    if (messageEl) messageEl.textContent = 'Unable to save rating. Please try again.';
  }

  ideaRatingSubmit.textContent = 'Submit rating';
  ideaRatingSubmit.disabled = false;
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

  if (related.length === 0) {
    if (relatedEssaysSection) relatedEssaysSection.style.display = 'none';
    return;
  }

  if (relatedEssaysSection) relatedEssaysSection.style.display = '';

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
  document.querySelectorAll('.related-essays-grid .essay-card')
    .forEach(el => el.classList.add('visible'));
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

// ── QUOTES WIDGET ──
let quotesData = [];
let currentQuoteIndex = 0;
let quoteInterval = null;

async function fetchQuotes() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/quotes?select=*&is_active=eq.true&order=sort_order.asc`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    if (!res.ok) return;
    quotesData = await res.json();
    if (quotesData.length > 0) renderQuotesWidget();
  } catch { /* silent fail — widget just won't show */ }
}

function renderQuotesWidget() {
  const widget = document.getElementById('quotesWidget');
  if (!widget || !quotesData.length) return;

  buildQuoteDots();
  showQuote(0);
  quoteInterval = setInterval(() => {
    const next = (currentQuoteIndex + 1) % quotesData.length;
    transitionToQuote(next);
  }, 6000);
}

function buildQuoteDots() {
  const dots = document.getElementById('quotesDots');
  if (!dots) return;
  dots.innerHTML = '';
  quotesData.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'quotes-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Quote ${i + 1}`);
    dot.addEventListener('click', () => {
      clearInterval(quoteInterval);
      transitionToQuote(i);
      quoteInterval = setInterval(() => {
        const next = (currentQuoteIndex + 1) % quotesData.length;
        transitionToQuote(next);
      }, 6000);
    });
    dots.appendChild(dot);
  });
}

function showQuote(index) {
  const q = quotesData[index];
  if (!q) return;
  currentQuoteIndex = index;

  const textEl = document.getElementById('quotesText');
  const authorEl = document.getElementById('quotesAuthor');
  const sourceEl = document.getElementById('quotesSource');
  const portraitEl = document.getElementById('quotesPortrait');
  const placeholderEl = document.getElementById('quotesPortraitPlaceholder');

  if (textEl) textEl.textContent = q.quote;
  if (authorEl) authorEl.textContent = q.author;
  if (sourceEl) sourceEl.textContent = q.source ? `— ${q.source}` : '';

  if (portraitEl && placeholderEl) {
    if (q.portrait_url) {
      portraitEl.src = q.portrait_url;
      portraitEl.alt = q.author;
      portraitEl.style.opacity = '1';
      placeholderEl.style.display = 'none';
    } else {
      portraitEl.src = '';
      portraitEl.style.opacity = '0';
      placeholderEl.style.display = 'flex';
    }
  }

  document.querySelectorAll('.quotes-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function transitionToQuote(index) {
  const textEl = document.getElementById('quotesText');
  const metaEl = document.querySelector('.quotes-meta');
  const portraitEl = document.getElementById('quotesPortrait');

  [textEl, metaEl, portraitEl].forEach(el => el?.classList.add('fading'));

  setTimeout(() => {
    showQuote(index);
    [textEl, metaEl, portraitEl].forEach(el => el?.classList.remove('fading'));
  }, 500);
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

  if (ideaRatingSubmit) {
    ideaRatingSubmit.addEventListener('click', submitIdeaRating);
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
  initHamburger();
  if (document.getElementById('quotesWidget')) fetchQuotes();
});