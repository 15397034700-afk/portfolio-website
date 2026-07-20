/**
 * Portfolio Interactions
 * 统一管理全局交互：Section Reveal、Scroll Indicator、Lightbox、Page Transition、Back to Top、Toast
 * 风格：Apple / Linear / Notion / Editorial - 克制、流畅
 */

export class Interactions {
    constructor() {
        this.revealObserver = null;
        this.imageObserver = null;
        this.lightboxState = { images: [], index: 0, open: false };
    }

    init() {
        this.initSectionReveal();
        this.initScrollIndicator();
        this.initLightbox();
        this.initPageTransition();
        this.initBackToTop();
        this.initImageHover();
    }

    // ============ Section Reveal ============
    // 进入视口时 Fade Up，只播放一次
    initSectionReveal() {
        const targets = document.querySelectorAll(
            '.section, .pinpin-hero-section, .pinpin-thinking-section, .pinpin-preview-section, ' +
            '.research-hero-section, .research-insights-section, .voice-archive-section, .research-dataset-section, ' +
            '.concert-hero-section, .content-growth-hero, .design-collection-hero, ' +
            '.work-card-item, .thinking-module, .feature-item, .preview-gallery-item, ' +
            '.reflection-section, .next-project-section'
        );

        if (!('IntersectionObserver' in window)) {
            targets.forEach(el => el.classList.add('reveal-visible'));
            return;
        }

        this.revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    this.revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -8% 0px'
        });

        targets.forEach(el => {
            el.classList.add('reveal');
            this.revealObserver.observe(el);
        });
    }

    // ============ Scroll Indicator ============
    // 右侧 2px 极细进度条
    initScrollIndicator() {
        if (document.querySelector('.scroll-indicator')) return;

        const bar = document.createElement('div');
        bar.className = 'scroll-indicator';
        bar.innerHTML = '<div class="scroll-indicator-fill"></div>';
        document.body.appendChild(bar);

        const fill = bar.querySelector('.scroll-indicator-fill');
        let ticking = false;

        const update = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) : 0;
            fill.style.transform = `scaleY(${progress})`;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        }, { passive: true });

        update();
    }

    // ============ Lightbox ============
    // 点击图片放大查看，支持左右切换、Esc 关闭
    initLightbox() {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <button class="lightbox-close" aria-label="Close">✕</button>
            <button class="lightbox-prev" aria-label="Previous">‹</button>
            <button class="lightbox-next" aria-label="Next">›</button>
            <div class="lightbox-image-wrapper">
                <img class="lightbox-image" alt="Preview" />
            </div>
            <div class="lightbox-counter"></div>
        `;
        document.body.appendChild(overlay);

        // 只对带 data-lightbox 或可点击的图片启用
        const collectImages = () => {
            return Array.from(document.querySelectorAll(
                '.preview-gallery img, .feature-item img, .thinking-module img, ' +
                '.pinpin-video-wrapper img, .work-card-image-wrapper img, ' +
                '[data-lightbox] img, img[data-lightbox]'
            ));
        };

        document.addEventListener('click', (e) => {
            const img = e.target.closest('img');
            if (!img) return;
            // 跳过带链接的图片和 nav logo
            if (img.closest('a[href]') && !img.closest('[data-lightbox]')) return;
            if (img.closest('nav')) return;
            // 跳过小图标
            if (img.width < 120 || img.height < 120) return;

            const images = collectImages();
            const idx = images.indexOf(img);
            if (idx === -1) return;

            e.preventDefault();
            this.openLightbox(images, idx);
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target.classList.contains('lightbox-image-wrapper')) {
                this.closeLightbox();
            }
        });

        overlay.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
        overlay.querySelector('.lightbox-prev').addEventListener('click', (e) => {
            e.stopPropagation();
            this.navigateLightbox(-1);
        });
        overlay.querySelector('.lightbox-next').addEventListener('click', (e) => {
            e.stopPropagation();
            this.navigateLightbox(1);
        });

        document.addEventListener('keydown', (e) => {
            if (!this.lightboxState.open) return;
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') this.navigateLightbox(-1);
            if (e.key === 'ArrowRight') this.navigateLightbox(1);
        });
    }

    openLightbox(images, index) {
        const overlay = document.querySelector('.lightbox-overlay');
        const imgEl = overlay.querySelector('.lightbox-image');
        const counter = overlay.querySelector('.lightbox-counter');

        this.lightboxState = { images, index, open: true };
        imgEl.src = images[index].src;
        counter.textContent = `${index + 1} / ${images.length}`;
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    navigateLightbox(dir) {
        if (!this.lightboxState.open) return;
        const { images } = this.lightboxState;
        this.lightboxState.index = (this.lightboxState.index + dir + images.length) % images.length;
        const overlay = document.querySelector('.lightbox-overlay');
        const imgEl = overlay.querySelector('.lightbox-image');
        const counter = overlay.querySelector('.lightbox-counter');
        imgEl.src = images[this.lightboxState.index].src;
        counter.textContent = `${this.lightboxState.index + 1} / ${images.length}`;
    }

    closeLightbox() {
        const overlay = document.querySelector('.lightbox-overlay');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        this.lightboxState.open = false;
    }

    // ============ Page Transition ============
    // 点击 View Case 等内部链接时 fade out 再跳转
    initPageTransition() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            const href = link.getAttribute('href');
            if (!href) return;
            // 只处理本站 .html 跳转
            if (!href.endsWith('.html') && !href.includes('.html#')) return;
            if (link.target === '_blank') return;
            if (e.metaKey || e.ctrlKey || e.shiftKey) return;

            e.preventDefault();
            document.body.classList.add('page-leaving');
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });

        // 进入页面时 fade in
        window.addEventListener('pageshow', () => {
            document.body.classList.add('page-entering');
            setTimeout(() => {
                document.body.classList.remove('page-entering');
            }, 500);
        });
    }

    // ============ Back to Top ============
    // 详情页滚动较深后右下角出现
    initBackToTop() {
        if (document.querySelector('.back-to-top-btn')) return;

        const btn = document.createElement('button');
        btn.className = 'back-to-top-btn';
        btn.setAttribute('aria-label', 'Back to top');
        btn.innerHTML = '<span class="back-to-top-arrow">↑</span><span class="back-to-top-text">Top</span>';
        document.body.appendChild(btn);

        let visible = false;
        window.addEventListener('scroll', () => {
            const shouldShow = window.scrollY > window.innerHeight * 0.8;
            if (shouldShow !== visible) {
                visible = shouldShow;
                btn.classList.toggle('visible', visible);
            }
        }, { passive: true });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============ Image Hover ============
    // 给所有内容图片加上可 hover 放大效果
    initImageHover() {
        const images = document.querySelectorAll(
            '.preview-gallery img, .feature-item img, .thinking-module img, ' +
            '.work-card-image-wrapper img'
        );
        images.forEach(img => img.classList.add('hoverable-image'));
    }
}

// ============ Toast 工具 ============
export function showToast(message, duration = 1500) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<span class="toast-check">✓</span><span class="toast-text">${message}</span>`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('visible'));

    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 400);
    }, duration);
}
