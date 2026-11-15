
const LIVE_DEMO_URLS = {
    1: 'website one/BrightLife-Medical-website.html',
    2: 'Website-two/RightPath.html',
    3: 'https://claude.ai/artifact/Yai39KaaTjgpchELVZwFWe'
};

const PORTFOLIO_DATA = [
    {
        id: 1,
        title: "BrightLife Medical Center & Wellness Hub",
        category: "Multi-Specialty Hospital",
        platform: "WordPress + Elementor Ready",
        tags: [
            { label: "Live Demo", style: "emerald" },
        ],
        description: "Full-service medical center homepage with a professional animated split-layout hero, floating glass telemetry cards, counter stats banner, interactive accordion, doctor profiles grid, patient testimonials, appointment booking form, and health blog section.",
        visual: "hospital",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=85",
        demoUrl: true,
        specs: {
            mobileSpeed: 99,
            desktopSpeed: 100,
            seoScore: 97,
            accessibility: 95,
            features: [
                "Split-layout hero with floating glass telemetry cards & live pulse dot",
                "Counter-animated stats banner with forest gradient & dot-pattern texture",
                "Staggered image collage about section with founder spotlight",
                "6-card service grid with hover-rotate icon badges",
                "Interactive accordion Why Choose Us with activity chart widget",
                "4-doctor profile grid with LinkedIn reveal on hover",
                "3-card testimonial carousel with quote marks & star ratings",
                "Full appointment form with department select & time slots",
                "Blog/news section with tag badges & hover zoom",
                "Scroll-reveal IntersectionObserver animation system"
            ],
            stack: ["WordPress 6.4+", "Elementor Pro", "Custom ACF Fields", "IntersectionObserver API", "CSS Keyframe Animations"]
        }
    },
    {
        id: 2,
        title: "Right path hospital behavioral health complete 8 page widescreen website",
        category: "Specialized Clinic",
        platform: "WordPress + Elementor Ready",
        tags: [
          
        ],
        description: "High-converting, visual-first clinic landing page optimized for aesthetic procedures and local search visibility. Built with streamlined booking flows and click-to-call conversion tracking.",
        visual: "clinic",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1000&q=85",
        demoUrl: true,
        specs: {
            mobileSpeed: 98,
            desktopSpeed: 100,
            seoScore: 97,
            accessibility: 95,
            features: [
                "Interactive procedure cost calculator with lead capture",
                "Geo-location detection for nearest clinic branch routing",
                "Before/after gallery with lazy-loaded high-res images",
                "Click-to-call conversion tracking via Google Tag Manager",
                "Procedure-specific landing pages for Google Ads Quality Score",
                "Patient financing integration (CareCredit, Alphaeon)",
                "Review carousel pulling live Google Business Profile reviews",
                "Multi-step booking form with procedure pre-selection"
            ],
            stack: ["WordPress 6.4+", "Custom Theme", "ACF Pro", "GSAP Animations", "GTM Integration"]
        }
    },
    // {
    //     id: 3,
    //     title: "Right Path Recovery & Behavioral Health Hospital",
    //     category: "Multi-Specialty Hospital",
    //     platform: "WordPress + Elementor Ready",
    //     tags: [
    //         { label: "Flagship Live Demo", style: "emerald" },
    //         { label: "Mega Menu & Insurance Funnel", style: "cyan" },
    //         { label: "5-Level Care Continuum", style: "teal" },
    //         { label: "Dual-Diagnosis Specialist", style: "cyan" },
    //         { label: "60-Day Guarantee CTA", style: "navy" }
    //     ],
    //     description: "Enterprise-grade behavioral health hospital homepage for San Diego's Right Path Recovery. Features mega-menu navigation, interactive 4-step insurance verification funnel, 5-level continuum of care tabs, dual-campus showcase, leadership profiles, and full clinical copywriting.",
    //     visual: "hospital",
    //     image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=85",
    //     demoUrl: true,
    //     specs: {
    //         mobileSpeed: 99,
    //         desktopSpeed: 100,
    //         seoScore: 98,
    //         accessibility: 96,
    //         features: [
    //             "Interactive mega-menu with 3-column dropdowns & care-level cards",
    //             "4-step HIPAA-compliant insurance verification lead funnel",
    //             "5-tab interactive continuum of care (Detox → Aftercare)",
    //             "Founder video modal with play animation",
    //             "Recovery Quotient™ data dashboard with progress bars",
    //             "Dual San Diego campus cards (University City + Mission Valley)",
    //             "Dual-diagnosis conditions bento grid with therapy modality ticker",
    //             "60-Day Treatment Guarantee conversion banner",
    //             "Smooth FAQ accordion with 5 key pre-admission questions",
    //             "Crisis 988 lifeline footer with full compliance data"
    //         ],
    //         stack: ["WordPress 6.4+", "Elementor Pro", "Custom ACF Fields", "WP REST API", "Cloudflare CDN"]
    //     }
    // }
];

/* ========================================
   APP MODULE
   ======================================== */
const App = (() => {
    let activeCategory = 'all';
    let activePlatform = 'all';
    let searchQuery = '';

    /* --- Render a single card --- */
    /* WP: Each call = one iteration of the WP loop. Replace JS fields with:
           the_title(), the_content(), get_post_meta(), the_post_thumbnail(), etc. */
    function renderCard(item) {
        const tagChips = item.tags.map(t =>
            `<span class="tag-chip tag-chip--${t.style}">${t.label}</span>`
        ).join('');

        const hospitalSVG = `<svg class="portfolio-card__illustration" viewBox="0 0 100 100" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5">
      <rect x="25" y="30" width="50" height="50" rx="3"/>
      <rect x="35" y="15" width="30" height="65" rx="2"/>
      <path d="M50 30v20M40 40h20"/>
      <rect x="32" y="55" width="8" height="10" rx="1"/><rect x="45" y="55" width="10" height="25" rx="1"/><rect x="60" y="55" width="8" height="10" rx="1"/>
      <rect x="32" y="38" width="8" height="8" rx="1"/><rect x="60" y="38" width="8" height="8" rx="1"/>
    </svg>`;

        const clinicSVG = `<svg class="portfolio-card__illustration" viewBox="0 0 100 100" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.5">
      <circle cx="50" cy="40" r="22"/>
      <path d="M50 25v30M40 40h20"/>
      <path d="M30 70c0-11 9-20 20-20s20 9 20 20" stroke-width="1.2"/>
      <path d="M38 80c0-6.6 5.4-12 12-12s12 5.4 12 12"/>
      <circle cx="50" cy="40" r="8" stroke-dasharray="3 3"/>
    </svg>`;

        const patternClass = item.visual === 'hospital' ? 'portfolio-card__pattern--grid' : 'portfolio-card__pattern--wave';
        const illustration = item.visual === 'hospital' ? hospitalSVG : clinicSVG;
        const title = LIVE_DEMO_URLS[item.id]
            ? `<a href="${LIVE_DEMO_URLS[item.id]}" target="_blank" rel="noopener">${item.title}</a>`
            : item.title;

        return `
    <article class="portfolio-card reveal" data-id="${item.id}" data-category="${item.category}" data-platform="${item.platform}">
      <div class="portfolio-card__visual">
        <div class="portfolio-card__gradient portfolio-card__gradient--${item.visual}">
          <img src="${item.image}" alt="${item.title}" class="portfolio-card__image" />
        </div>
        <div class="portfolio-card__pattern ${patternClass}"></div>
        ${illustration}
        <span class="portfolio-card__platform">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 1l1.5 3H11l-2.5 2 1 3L6 7.5 2.5 9l1-3L1 4h3.5z"/></svg>
          ${item.platform}
        </span>
        <span class="portfolio-card__deploy-tag">
          <span class="portfolio-card__deploy-dot"></span>
          Ready to Deploy
        </span>
      </div>
      <div class="portfolio-card__body">
        <!-- WP: <h3><?php the_title(); ?></h3> -->
        <h3 class="portfolio-card__title">${title}</h3>
        <!-- WP: <p><?php the_excerpt(); ?></p> -->
        <p class="portfolio-card__desc">${item.description}</p>
        <div class="portfolio-card__tags">${tagChips}</div>
        <div class="portfolio-card__actions">
          <button class="btn btn--card btn--card-primary" onclick="App.openDemo(${item.id})">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h12v10H2z"/><path d="M5 8l3 2 3-2"/></svg>
            Live Preview
          </button>
          <button class="btn btn--card btn--card-outline" onclick="App.openSpecs(${item.id})">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 2h8v12H4z"/><path d="M6 5h4M6 7.5h4M6 10h2"/></svg>
            Tech Specs
          </button>
        </div>
      </div>
    </article>`;
    }

    /* --- Filter logic --- */
    function getFilteredItems() {
        return PORTFOLIO_DATA.filter(item => {
            const matchCategory = activeCategory === 'all' || item.category === activeCategory;
            const matchPlatform = activePlatform === 'all' || item.platform === activePlatform;
            if (!matchCategory || !matchPlatform) return false;
            if (!searchQuery) return true;
            const q = searchQuery.toLowerCase();
            const searchable = [
                item.title,
                item.category,
                item.description,
                item.platform,
                ...item.tags.map(t => t.label)
            ].join(' ').toLowerCase();
            return searchable.includes(q);
        });
    }

    function renderGrid() {
        const grid = document.getElementById('showcaseGrid');
        const filtered = getFilteredItems();

        if (filtered.length === 0) {
            grid.innerHTML = `
        <div class="showcase__empty">
          <svg class="showcase__empty-icon" viewBox="0 0 56 56" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="24" cy="24" r="16"/><path d="M36 36l12 12"/>
            <path d="M18 24h12" stroke-dasharray="3 3"/>
          </svg>
          <p class="showcase__empty-text">No matching systems found</p>
          <p style="margin:0;font-size:0.88rem">Try adjusting your search or filters.</p>
        </div>`;
            return;
        }

        grid.innerHTML = filtered.map(renderCard).join('');
        initScrollReveal();
    }

    /* --- Modal --- */
    function openSpecs(id) {
        const item = PORTFOLIO_DATA.find(i => i.id === id);
        if (!item) return;

        const s = item.specs;
        document.getElementById('modalTitle').textContent = item.title + ' — Tech Specs';
        document.getElementById('modalBody').innerHTML = `
      <div class="spec-grid">
        <div class="spec-card">
          <p class="spec-card__label">Mobile PageSpeed</p>
          <p class="spec-card__value spec-card__value--accent">${s.mobileSpeed}/100</p>
        </div>
        <div class="spec-card">
          <p class="spec-card__label">Desktop PageSpeed</p>
          <p class="spec-card__value spec-card__value--accent">${s.desktopSpeed}/90+</p>
        </div>
        <div class="spec-card">
          <p class="spec-card__label">SEO Audit Score</p>
          <p class="spec-card__value spec-card__value--cyan">${s.seoScore}/100</p>
        </div>
        <div class="spec-card">
          <p class="spec-card__label">Accessibility</p>
          <p class="spec-card__value spec-card__value--cyan">${s.accessibility}/90+</p>
        </div>
      </div>
      <p class="spec-section-label">Google Ads &amp; Conversion Features</p>
      <ul class="spec-features">
        ${s.features.map(f => `
          <li class="spec-features__item">
            <svg class="spec-features__check" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 10l4 4 8-8"/></svg>
            <span>${f}</span>
          </li>
        `).join('')}
      </ul>
      <p class="spec-section-label">Tech Stack</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        ${s.stack.map(t => `<span class="tag-chip tag-chip--cyan">${t}</span>`).join('')}
      </div>
    `;

        const backdrop = document.getElementById('modalBackdrop');
        backdrop.classList.add('modal-backdrop--open');
        document.body.style.overflow = 'hidden';
        document.getElementById('modalClose').focus();
    }

    function closeModal() {
        const backdrop = document.getElementById('modalBackdrop');
        backdrop.classList.remove('modal-backdrop--open');
        document.body.style.overflow = '';
    }

    function openDemo(id) {
        const item = PORTFOLIO_DATA.find(i => i.id === id);
        if (!item) return;
        if (item.demoUrl && LIVE_DEMO_URLS[item.id]) {
            window.open(LIVE_DEMO_URLS[item.id], '_blank');
        } else {
            openSpecs(id);
        }
    }

    /* --- Init --- */
    function init() {
        renderGrid();
        initFilters();
        initSearch();
        initPlatformSelect();
        initModal();
        initScrollReveal();
        initFilterBarScroll();
        initSmoothScroll();
    }

    function initFilters() {
        document.querySelectorAll('[data-category]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('[data-category]').forEach(b => {
                    b.classList.remove('filter-pill--active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('filter-pill--active');
                btn.setAttribute('aria-selected', 'true');
                activeCategory = btn.dataset.category;
                renderGrid();
            });
        });
    }

    function initSearch() {
        const input = document.getElementById('searchInput');
        let debounce;
        input.addEventListener('input', () => {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                searchQuery = input.value.trim();
                renderGrid();
            }, 200);
        });
    }

    function initPlatformSelect() {
        const select = document.getElementById('platformSelect');
        const btn = select.querySelector('.filter-select__btn');
        const label = document.getElementById('platformLabel');

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = select.classList.toggle('filter-select--open');
            btn.setAttribute('aria-expanded', isOpen);
        });

        select.querySelectorAll('[data-platform]').forEach(opt => {
            opt.addEventListener('click', () => {
                select.querySelectorAll('[data-platform]').forEach(o => o.classList.remove('filter-select__option--active'));
                opt.classList.add('filter-select__option--active');
                label.textContent = opt.textContent;
                activePlatform = opt.dataset.platform;
                select.classList.remove('filter-select--open');
                btn.setAttribute('aria-expanded', 'false');
                renderGrid();
            });
        });

        document.addEventListener('click', (e) => {
            if (!select.contains(e.target)) {
                select.classList.remove('filter-select--open');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    function initModal() {
        const backdrop = document.getElementById('modalBackdrop');
        const modal = document.getElementById('modal');
        document.getElementById('modalClose').addEventListener('click', closeModal);
        backdrop.addEventListener('click', (e) => {
            if (!modal.contains(e.target)) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
            if (!el.classList.contains('revealed')) observer.observe(el);
        });
    }

    function initFilterBarScroll() {
        const bar = document.getElementById('filterBar');
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    bar.classList.toggle('scrolled', window.scrollY > 100);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    return { init, openSpecs, openDemo, closeModal };
})();

document.addEventListener('DOMContentLoaded', App.init);
