// ===== Navigation =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

function closeMenu() {
    if (!navMenu) return;
    navMenu.classList.remove('active');
    const icon = navToggle && navToggle.querySelector('i');
    if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-times'); }
}

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Dropdown (click on mobile, hover handled by CSS on desktop)
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', e => {
        e.preventDefault();
        toggle.parentElement.classList.toggle('open');
    });
});
document.addEventListener('click', e => {
    if (!e.target.closest('.has-dropdown')) {
        document.querySelectorAll('.has-dropdown.open').forEach(d => d.classList.remove('open'));
    }
});

document.querySelectorAll('.nav-menu a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Smooth scroll for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Electronic services (placeholders until real links are provided) =====
document.querySelectorAll('[data-service]').forEach(el => {
    el.addEventListener('click', e => {
        const href = el.getAttribute('href');
        if (href && href !== '#') return; // real link set -> follow it
        e.preventDefault();
        const name = el.dataset.service === 'exams' ? 'الامتحانات' : 'بوابة الطالب';
        alert(`خدمة: ${name}\n\nسيتم تفعيل الرابط قريبًا.`);
    });
});

// ===== News rendering =====
function newsCard(item) {
    return `
    <article class="news-card" data-id="${item.id}" tabindex="0">
        <div class="news-image">
            <img src="${item.images[0]}" alt="${item.title}" loading="lazy">
            <span class="news-badge">${NEWS_CATEGORIES[item.category]}</span>
            ${item.images.length > 1 ? `<span class="news-count"><i class="fas fa-images"></i> ${item.images.length}</span>` : ''}
        </div>
        <div class="news-content">
            <span class="news-date"><i class="far fa-calendar-alt"></i> ${item.date}</span>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <span class="read-more">اقرأ المزيد <i class="fas fa-arrow-left"></i></span>
        </div>
    </article>`;
}

function bindCards(container) {
    container.querySelectorAll('.news-card').forEach(card => {
        const open = () => openNews(card.dataset.id);
        card.addEventListener('click', open);
        card.addEventListener('keydown', e => { if (e.key === 'Enter') open(); });
    });
}

// Home: latest featured news
const homeNews = document.getElementById('home-news');
if (homeNews && typeof NEWS !== 'undefined') {
    homeNews.innerHTML = NEWS.filter(n => n.featured).slice(0, 6).map(newsCard).join('');
    bindCards(homeNews);
}

// Home: intro text from the booklet
const introEl = document.getElementById('intro-text');
if (introEl && typeof INTRO !== 'undefined') {
    introEl.innerHTML = INTRO.paragraphs.map(p => `<p>${p}</p>`).join('');
}

// News page: all news with filters
const newsGrid = document.getElementById('news-grid');
const filters = document.getElementById('news-filters');
if (newsGrid && typeof NEWS !== 'undefined') {
    const render = (cat) => {
        const list = cat === 'all' ? NEWS : NEWS.filter(n => n.category === cat);
        newsGrid.innerHTML = list.map(newsCard).join('');
        bindCards(newsGrid);
    };
    if (filters) {
        filters.innerHTML = `<button class="filter-btn active" data-cat="all">الكل</button>` +
            Object.entries(NEWS_CATEGORIES).map(([k, v]) => `<button class="filter-btn" data-cat="${k}">${v}</button>`).join('');
        filters.addEventListener('click', e => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;
            filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            render(btn.dataset.cat);
        });
    }
    render('all');
    // open a specific item via news.html#id
    const hash = location.hash.slice(1);
    if (hash && NEWS.some(n => n.id === hash)) openNews(hash);
}

// ===== News modal with gallery =====
function openNews(id) {
    const item = NEWS.find(n => n.id === id);
    if (!item) return;
    let idx = 0;
    const modal = document.createElement('div');
    modal.className = 'news-modal';
    modal.innerHTML = `
    <div class="news-modal-box" role="dialog" aria-modal="true">
        <button class="modal-close" aria-label="إغلاق"><i class="fas fa-times"></i></button>
        <div class="modal-gallery">
            <img src="${item.images[0]}" alt="${item.title}" class="modal-main">
            ${item.images.length > 1 ? `
            <button class="gal-btn gal-prev" aria-label="السابق"><i class="fas fa-chevron-right"></i></button>
            <button class="gal-btn gal-next" aria-label="التالي"><i class="fas fa-chevron-left"></i></button>
            <div class="modal-thumbs">${item.images.map((s, i) => `<img src="${s}" data-i="${i}" class="${i === 0 ? 'active' : ''}" alt="">`).join('')}</div>` : ''}
        </div>
        <div class="modal-body">
            <span class="news-badge static">${NEWS_CATEGORIES[item.category]}</span>
            <span class="news-date"><i class="far fa-calendar-alt"></i> ${item.date}</span>
            <h2>${item.title}</h2>
            ${item.body.map(p => `<p>${p}</p>`).join('')}
        </div>
    </div>`;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => modal.classList.add('show'));

    const main = modal.querySelector('.modal-main');
    const thumbs = modal.querySelectorAll('.modal-thumbs img');
    const show = (i) => {
        idx = (i + item.images.length) % item.images.length;
        main.src = item.images[idx];
        thumbs.forEach(t => t.classList.toggle('active', +t.dataset.i === idx));
    };
    thumbs.forEach(t => t.addEventListener('click', () => show(+t.dataset.i)));
    const prev = modal.querySelector('.gal-prev');
    const next = modal.querySelector('.gal-next');
    if (prev) prev.addEventListener('click', () => show(idx - 1));
    if (next) next.addEventListener('click', () => show(idx + 1));

    const close = () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onKey);
        setTimeout(() => modal.remove(), 250);
    };
    const onKey = (e) => {
        if (e.key === 'Escape') close();
        if (item.images.length > 1 && e.key === 'ArrowLeft') show(idx + 1);
        if (item.images.length > 1 && e.key === 'ArrowRight') show(idx - 1);
    };
    document.addEventListener('keydown', onKey);
    modal.querySelector('.modal-close').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
}

// ===== Contact form =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('شكرًا لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');
        this.reset();
    });
}

// ===== Counters =====
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.count;
        let cur = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const t = setInterval(() => {
            cur = Math.min(target, cur + step);
            el.textContent = cur.toLocaleString('ar-EG') + (el.dataset.suffix || '');
            if (cur >= target) clearInterval(t);
        }, 25);
        counterObserver.unobserve(el);
    });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ===== Reveal on scroll =====
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal, .service-item, .department-card, .about-card, .achievement').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Header shadow on scroll
const headerEl = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (headerEl) headerEl.classList.toggle('scrolled', window.scrollY > 30);
});

// Scroll to top button (like in reference screenshot)
const scrollTopBtn = document.getElementById('shaScrollTop');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
