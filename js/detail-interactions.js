/**
 * Detail Page Interactions
 * 详情页专用交互：Project Progress 导航、Next Project、图片依次淡入
 */

import { Interactions, showToast } from './interactions.js';

export class DetailInteractions {
    constructor(config = {}) {
        this.config = {
            // 项目模块定义：用于 Project Progress 导航
            sections: [],
            // 下一个项目信息
            nextProject: null,
            ...config
        };
        this.interactions = new Interactions();
        this.progressObserver = null;
    }

    init() {
        this.interactions.init();
        this.initProjectProgress();
        this.initNextProject();
        this.initSequentialImages();
    }

    // ============ Project Progress ============
    // 右侧固定的阅读进度导航，显示当前所在模块
    initProjectProgress() {
        if (!this.config.sections || this.config.sections.length === 0) return;
        if (window.innerWidth <= 1024) return; // 移动端不显示

        const nav = document.createElement('div');
        nav.className = 'project-progress-nav';
        nav.innerHTML = this.config.sections.map(s => `
            <div class="project-progress-dot" data-target="${s.id}">
                <span class="project-progress-dot-mark"></span>
                <span class="project-progress-dot-label">${s.label}</span>
            </div>
        `).join('');
        document.body.appendChild(nav);

        // 点击跳转
        nav.querySelectorAll('.project-progress-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                const target = dot.getAttribute('data-target');
                const el = document.getElementById(target);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // 滚动高亮
        if ('IntersectionObserver' in window) {
            this.progressObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        nav.querySelectorAll('.project-progress-dot').forEach(dot => {
                            dot.classList.toggle('active', dot.getAttribute('data-target') === id);
                        });
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '-20% 0px -60% 0px'
            });

            this.config.sections.forEach(s => {
                const el = document.getElementById(s.id);
                if (el) this.progressObserver.observe(el);
            });
        }
    }

    // ============ Next Project ============
    // 项目末尾增加下一个项目入口
    initNextProject() {
        if (!this.config.nextProject) return;

        const existing = document.querySelector('.next-project-section');
        if (existing) return;

        const section = document.createElement('section');
        section.className = 'next-project-section reveal';
        const np = this.config.nextProject;
        section.innerHTML = `
            <a href="${np.url}" class="next-project-link">
                <p class="next-project-label">NEXT PROJECT</p>
                <div class="next-project-divider"></div>
                <h3 class="next-project-title">${np.title}</h3>
                <p class="next-project-subtitle">${np.subtitle}</p>
                <span class="next-project-arrow">
                    View Case
                    <span>→</span>
                </span>
            </a>
        `;

        const main = document.querySelector('main') || document.body;
        main.appendChild(section);

        // 加入 reveal 观察
        if (this.interactions.revealObserver) {
            this.interactions.revealObserver.observe(section);
        }
    }

    // ============ Sequential Image Reveal ============
    // 详情页图片滚动进入后依次淡入
    initSequentialImages() {
        const images = document.querySelectorAll(
            '.preview-gallery img, .feature-item img, .thinking-module img, ' +
            '.pinpin-video-wrapper img, .gallery-item img, .case-image img'
        );

        if (!('IntersectionObserver' in window)) {
            images.forEach(img => img.classList.add('reveal-visible'));
            return;
        }

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    // 同一组内的图片依次淡入
                    const delay = Array.from(images).indexOf(entry.target) % 4;
                    entry.target.style.transitionDelay = `${delay * 0.08}s`;
                    entry.target.classList.add('reveal-visible');
                    imageObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -5% 0px'
        });

        images.forEach(img => {
            img.classList.add('image-sequence');
            imageObserver.observe(img);
        });
    }
}

export { showToast };
