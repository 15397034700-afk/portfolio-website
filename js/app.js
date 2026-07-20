import { worksData } from './data/works.js';
import { Hero } from './components/hero.js';
import { About } from './components/about.js';
import { Works } from './components/Works.js';
import { Resume } from './components/Resume.js';
import { Navigation } from './components/navigation.js';
import { Footer } from './components/footer.js';
import { PageDecorations } from './components/PageDecorations.js';
import { Interactions, showToast } from './interactions.js';

export class App {
    constructor() {
        this.components = {};
        this.worksData = worksData;
        this.interactions = new Interactions();
    }

    init() {
        this.renderComponents();
        this.handleAnchorScroll();
        this.initScrollEffects();
        this.initHeroSequence();
        this.initResumeInteractions();
        this.interactions.init();
    }

    handleAnchorScroll() {
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const target = document.querySelector(hash);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }

    renderComponents() {
        this.components.navigation = new Navigation({ works: worksData });
        this.components.hero = new Hero();
        this.components.about = new About();
        this.components.works = new Works();
        this.components.resume = new Resume();
        this.components.footer = new Footer();
        this.components.decorations = new PageDecorations();

        document.getElementById('navigation').innerHTML = this.components.navigation.render();
        document.getElementById('hero').innerHTML = this.components.hero.render();
        document.getElementById('about').innerHTML = this.components.about.render();
        document.getElementById('works').innerHTML = this.components.works.render();
        document.getElementById('resume').innerHTML = this.components.resume.render();
        document.getElementById('footer').innerHTML = this.components.footer.render();
        document.getElementById('decorations').innerHTML = this.renderDecorations();

        this.components.navigation.init();
        this.components.hero.init();
        this.components.works.init();
        this.components.resume.init();
    }

    renderDecorations() {
        const dec = this.components.decorations;
        return `
            ${dec.renderCornerFlower('top-left')}
        `;
    }

    initScrollEffects() {
        const navItems = document.querySelectorAll('.sidebar-nav-item, .mobile-nav-item');
        const cardItems = document.querySelectorAll('.work-card-item');
        const subItems = document.querySelectorAll('.sidebar-nav-subitem, .mobile-nav-subitem');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetId = item.getAttribute('data-section');
                if (!targetId) return;
                
                if (targetId === 'home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const section = document.getElementById(targetId);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                
                const drawer = document.getElementById('mobile-drawer');
                if (drawer) {
                    drawer.classList.remove('open');
                    document.body.style.overflow = '';
                }
            });
        });

        subItems.forEach(subItem => {
            subItem.addEventListener('click', () => {
                const projectId = subItem.getAttribute('data-project');
                if (!projectId) return;
                
                const card = document.querySelector(`.work-card-item[data-project-id="${projectId}"]`);
                if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                const drawer = document.getElementById('mobile-drawer');
                if (drawer) {
                    drawer.classList.remove('open');
                    document.body.style.overflow = '';
                }
            });
        });

        cardItems.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                if (e.target.closest('a')) return;
                const link = card.querySelector('.work-card-view-link');
                if (link) {
                    window.location.href = link.href;
                }
            });
        });

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            navItems.forEach(item => {
                const targetId = item.getAttribute('data-section');
                if (!targetId) return;
                
                if (targetId === 'home') {
                    const heroSection = document.getElementById('hero');
                    if (heroSection && scrollY < heroSection.offsetHeight / 2) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                    return;
                }

                const section = document.getElementById(targetId);
                if (!section) return;

                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollY >= sectionTop && scrollY < sectionBottom) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            cardItems.forEach((card) => {
                const cardTop = card.offsetTop;
                const cardHeight = card.offsetHeight;
                const cardMiddle = cardTop + cardHeight / 2;
                const viewportMiddle = scrollY + windowHeight / 2;

                if (Math.abs(cardMiddle - viewportMiddle) < windowHeight * 0.3) {
                    card.classList.add('in-view');
                    const projectId = card.getAttribute('data-project-id');
                    subItems.forEach(subItem => {
                        if (subItem.getAttribute('data-project') === projectId) {
                            subItem.classList.add('active');
                        }
                    });
                } else {
                    card.classList.remove('in-view');
                    const projectId = card.getAttribute('data-project-id');
                    subItems.forEach(subItem => {
                        if (subItem.getAttribute('data-project') === projectId) {
                            subItem.classList.remove('active');
                        }
                    });
                }
            });
        });
    }

    // Hero → About → Projects → Resume 依次淡入
    initHeroSequence() {
        const sections = [
            '#hero .hero-section',
            '#about .about-section',
            '#works .works-section',
            '#resume .resume-section'
        ];

        sections.forEach((sel, i) => {
            const el = document.querySelector(sel);
            if (!el) return;
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            el.style.transitionDelay = `${0.15 * i + 0.1}s`;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
            });
        });
    }

    // Resume 交互：Download 显示 downloading、Send Email 复制邮箱
    initResumeInteractions() {
        const downloadBtns = document.querySelectorAll('[data-action="download-resume"]');
        downloadBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (btn.classList.contains('downloading')) return;
                btn.classList.add('downloading');

                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = 'resume.pdf';
                    link.download = 'Chen-Ming-Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    setTimeout(() => {
                        btn.classList.remove('downloading');
                    }, 400);
                }, 500);
            });
        });

        // Send Email → 复制邮箱
        const emailLink = document.querySelector('[data-link="email"]');
        if (emailLink) {
            emailLink.addEventListener('click', (e) => {
                e.preventDefault();
                const email = '15397034700@163.com';

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(email).then(() => {
                        showToast('Email copied');
                    }).catch(() => {
                        this.fallbackCopy(email);
                    });
                } else {
                    this.fallbackCopy(email);
                }
            });
        }
    }

    fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showToast('Email copied');
        } catch (err) {
            showToast('Copy failed');
        }
        document.body.removeChild(textarea);
    }
}
