/* script.js
   Extracted from index.html */

// ═══════════════════════════════════════════════════
// ── IDEAS DATA ── Edit this to add/change your ideas!
// ═══════════════════════════════════════════════════
const ideas = [
  {
    title: "AI won't replace jobs — it'll replace tasks",
    category: "technology",
    tag: "Technology",
    desc: "The conversation around AI and employment is misframed. It's not about entire roles disappearing overnight, but specific tasks within roles being automated — changing what work looks like.",
    full: "We keep asking 'will AI take my job?' but that's the wrong question. History shows technology eliminates tasks, not jobs wholesale. The printing press didn't kill writers — it created the publishing industry. The real shift happening is that the cognitive tasks we once thought were exclusively human — pattern recognition, drafting, analysis — are now automatable. This means the value of distinctly human skills like judgment, ethics, creativity, and interpersonal trust will skyrocket. The future isn't human vs. machine. It's humans who know how to work with machines vs. those who don't.",
    status: "Actively thinking about this"
  },
  {
    title: "Cities are operating systems for human life",
    category: "society",
    tag: "Society",
    desc: "A city is essentially an OS — with infrastructure as hardware, laws as the kernel, and culture as the user interface. Can we design better ones?",
    full: "Think about it: a city has input/output systems (roads, water, power), processes running in the background (bureaucracy, economy), and a user interface that citizens interact with daily (public spaces, services, culture). Like software, cities can be forked — new cities built on different governance models. Like legacy code, old cities accumulate technical debt in the form of outdated infrastructure and laws. The most interesting urban experiments happening right now — charter cities, smart cities, 15-minute city planning — are essentially attempts to refactor the OS. What would a city built from scratch in 2025 look like?",
    status: "Half-formed idea"
  },
  {
    title: "The universe might be running out of interesting things to do",
    category: "science",
    tag: "Science",
    desc: "Entropy isn't just a physics concept — it's the universe's long-term fate. But what does 'heat death' actually mean for complexity and life?",
    full: "The second law of thermodynamics says entropy — disorder — always increases. Stars will burn out. Black holes will evaporate. Eventually, the universe reaches maximum entropy: heat death. A state of perfect, featureless equilibrium where nothing interesting can ever happen again. What's strange is that right now, we're in an extraordinarily rare pocket of low entropy — a temporary fluctuation that allows stars, planets, chemistry, biology, and consciousness to exist. We are the universe briefly organizing itself before the inevitable slide into disorder. That makes every moment of complexity — every thought, every conversation — cosmically improbable and precious.",
    status: "Mind still blown"
  },
  {
    title: "Is privacy a modern invention?",
    category: "philosophy",
    tag: "Philosophy",
    desc: "Humans lived in small tribes for 200,000 years with no concept of personal privacy. Was it social media that killed privacy, or did we just briefly invent it?",
    full: "For almost all of human evolutionary history, we lived in bands of 50–150 people. Everyone knew everything about everyone. There was no private space, no locked doors, no secret life. Privacy as we know it — a sphere of personal life shielded from others — is arguably a product of urbanization, the printing press, and Enlightenment philosophy. It peaked in the 20th century: your own room, unlisted phone numbers, sealed envelopes. Now the internet is pulling us back toward the tribal condition: everything visible, reputation public and permanent. Maybe the question isn't 'how do we protect privacy?' but 'did we ever really have it?'",
    status: "Open question"
  },
  {
    title: "Abundance is creating new forms of scarcity",
    category: "society",
    tag: "Society",
    desc: "As material goods become cheaper, we're discovering that attention, trust, meaning, and quiet have become the scarce resources of modern life.",
    full: "Capitalism is extraordinarily good at solving scarcity problems. Food, clothing, shelter, information — all dramatically cheaper and more accessible than a century ago. But abundance in one area creates scarcity in another. When everyone can publish, attention becomes scarce. When everyone is reachable, solitude is scarce. When information is infinite, wisdom and curation is scarce. When transactions are frictionless, trust becomes scarce. The most valuable things in modern life — deep focus, genuine human connection, trusted expertise, meaningful silence — are precisely the things our abundance economy has made rare. The luxuries of the future might be things we used to have for free.",
    status: "Ongoing observation"
  },
  {
    title: "Sleep is the last frontier of biological optimization",
    category: "science",
    tag: "Science",
    desc: "We've optimized almost every waking hour. But we spend a third of our lives unconscious, and science is only beginning to understand why.",
    full: "We've engineered nutrition, exercise, productivity, and social connection. But sleep remains stubbornly biological and un-hackable. We can't sleep in half the time. We can't bank it or loan it. Miss it and the consequences cascade through cognition, immune function, emotional regulation, and cellular repair. What's fascinating is how much happens during sleep: memories consolidate, the glymphatic system flushes neurotoxins, synaptic connections are pruned, creative connections are made. Some researchers believe dreaming is a kind of threat simulation or emotional processing. We're nowhere near understanding it fully — and yet it's the single behavior with the highest ROI for human performance. The most productive thing you might do today is go to bed on time.",
    status: "Personal experiment ongoing"
  }
];

// ═══════════════════════════════════════════════════
// ── ESSAYS DATA ── Add your essays here!
//
// HOW TO ADD AN ESSAY:
// Copy one of the objects below, paste it after the last one
// (before the closing ]; ), and fill in your content.
//
// - title: the title of your essay
// - date: e.g. "May 2025"
// - preview: 2-3 sentence teaser shown on the card
// - image: path to an image file, or "" to skip it
// - body: your full essay as HTML — use <p> for paragraphs,
//         <h3> for subheadings, <blockquote> for quotes,
//         <img src="..." alt="..."> for images inside the essay
// ═══════════════════════════════════════════════════
const essays = [
  {
    title: "Why I started cataloguing ideas",
    date: "April 2025",
    preview: "I've always had too many thoughts and nowhere to put them. This is my attempt at building a second brain — or at least a tidy drawer for the messy ones.",
    image: "",
    body: `
      <p>For as long as I can remember, ideas have arrived uninvited — in the shower, mid-conversation, at 2am when I should be sleeping. Most of them evaporated just as quickly. This website is my attempt to catch them before they do.</p>
      <p>The act of writing an idea down forces you to actually think it through. You can't hide behind vague intuitions when you have to put them into sentences. Some of my best-sounding ideas have collapsed the moment I tried to write them out. That's a feature, not a bug.</p>
      <blockquote>A thought unexpressed is a thought unexamined.</blockquote>
      <p>I don't know where this project goes. Maybe it becomes a real blog. Maybe it stays a personal vault. Either way, it feels good to finally have a place to put these things.</p>
    `
  },
  {
    title: "On living in Kathmandu and thinking globally",
    date: "March 2025",
    preview: "There's something clarifying about being in a place the world often overlooks. Distance from the centre gives you a different kind of perspective.",
    image: "",
    body: `
      <p>Kathmandu is one of those cities that doesn't make it into the global conversation very often — except when there's an earthquake, or a trekking disaster, or a political crisis. And yet it's one of the most intellectually alive places I've experienced.</p>
      <p>Living somewhere that exists at the margins of global discourse has made me think harder about what "global" even means. Whose ideas circulate? Whose don't? What gets lost when knowledge flows only in one direction?</p>
      <p>I don't have answers yet. But I think the question matters — especially now, when the internet was supposed to flatten everything and somehow hasn't.</p>
    `
  }
];

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
const essayPageNotFound = document.getElementById('essayPageNotFound');
const relatedEssaysGrid = document.getElementById('relatedEssays');

function createIdeaCards() {
  if (!ideasGrid) return;
  ideaCount.textContent = ideas.length;

  ideas.forEach((idea) => {
    const card = document.createElement('div');
    card.className = 'idea-card reveal';
    card.dataset.category = idea.category;
    card.innerHTML = `
      <div class="card-tag">${idea.tag}</div>
      <div class="card-title">${idea.title}</div>
      <div class="card-desc">${idea.desc}</div>
      <div class="card-arrow">→</div>
    `;
    card.addEventListener('click', () => openModal(idea));
    ideasGrid.appendChild(card);
  });
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

function renderEssayCards() {
  if (!essaysGrid) return;

  essays.forEach((essay, i) => {
    const card = document.createElement('div');
    card.className = 'essay-card reveal';
    const imgHtml = essay.image
      ? `<img src="${essay.image}" alt="${essay.title}" class="essay-card-img">`
      : `<div class="essay-card-img-placeholder">✦</div>`;
    card.innerHTML = `
      ${imgHtml}
      <div class="essay-card-body">
        <div class="essay-card-date">${essay.date}</div>
        <div class="essay-card-title">${essay.title}</div>
        <div class="essay-card-preview">${essay.preview}</div>
        <a href="essay.html?index=${i}" class="read-more-btn">Read more →</a>
      </div>
    `;
    essaysGrid.appendChild(card);
  });
}

function getEssayIndexFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get('index'));
}

function renderEssayPage() {
  if (!essayPageTitle || !essayPageDate || !essayPageBody) return;
  const idx = getEssayIndexFromUrl();
  if (Number.isNaN(idx) || idx < 0 || idx >= essays.length) {
    if (essayPageNotFound) {
      essayPageNotFound.style.display = 'block';
    }
    return;
  }

  const essay = essays[idx];
  essayPageTitle.textContent = essay.title;
  essayPageDate.textContent = essay.date;
  essayPageBody.innerHTML = essay.body;

  if (essayPageImage) {
    if (essay.image) {
      essayPageImage.src = essay.image;
      essayPageImage.alt = essay.title;
      essayPageImage.style.display = 'block';
    } else {
      essayPageImage.style.display = 'none';
    }
  }

  renderRelatedEssays(idx);
}

function renderRelatedEssays(currentIndex) {
  if (!relatedEssaysGrid) return;
  relatedEssaysGrid.innerHTML = '';

  const maxItems = 3;
  let count = 0;
  let idx = (currentIndex + 1) % essays.length;

  while (count < maxItems && essays.length > 1) {
    if (idx !== currentIndex) {
      const essay = essays[idx];
      const card = document.createElement('a');
      card.className = 'essay-card reveal';
      card.href = `essay.html?index=${idx}`;
      const imgHtml = essay.image
        ? `<img src="${essay.image}" alt="${essay.title}" class="essay-card-img">`
        : `<div class="essay-card-img-placeholder">✦</div>`;
      card.innerHTML = `
        ${imgHtml}
        <div class="essay-card-body">
          <div class="essay-card-date">${essay.date}</div>
          <div class="essay-card-title">${essay.title}</div>
          <div class="essay-card-preview">${essay.preview}</div>
        </div>
      `;
      relatedEssaysGrid.appendChild(card);
      count++;
    }

    idx = (idx + 1) % essays.length;
    if (idx === currentIndex) break;
  }
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

if (ideasGrid) {
  createIdeaCards();
  setupFilters();
  if (document.getElementById('randomBtn')) {
    document.getElementById('randomBtn').addEventListener('click', openRandomIdea);
  }
}

if (essaysGrid) {
  renderEssayCards();
}

if (essayPageTitle) {
  renderEssayPage();
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
