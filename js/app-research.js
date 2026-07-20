import { ResearchNav } from './components/ResearchNav.js';
import { ResearchHero } from './components/ResearchHero.js';
import { ResearchDataset } from './components/ResearchDataset.js';
import { VoiceArchive } from './components/VoiceArchive.js';
import { ResearchInsights } from './components/ResearchInsights.js';
import { Footer } from './components/footer.js';
import { PageDecorations } from './components/PageDecorations.js';

export class ResearchDetailApp {
    constructor() {
        this.components = {};
    }

    init() {
        this.renderComponents();
        this.initScrollEffects();
        this.initVoiceArchive();
    }

    renderComponents() {
        this.components.navigation = new ResearchNav();
        this.components.hero = new ResearchHero();
        this.components.dataset = new ResearchDataset();
        this.components.voiceArchive = new VoiceArchive();
        this.components.insights = new ResearchInsights();
        this.components.footer = new Footer();
        this.components.decorations = new PageDecorations();

        document.getElementById('navigation').innerHTML = this.components.navigation.render();
        document.getElementById('research-hero').innerHTML = this.components.hero.render();
        document.getElementById('research-dataset').innerHTML = this.components.dataset.render();
        document.getElementById('voice-archive').innerHTML = this.components.voiceArchive.render();
        document.getElementById('research-insights').innerHTML = this.components.insights.render();
        document.getElementById('footer').innerHTML = this.components.footer.render();
        document.getElementById('decorations').innerHTML = this.renderDecorations();

        this.components.hero.init && this.components.hero.init();
        this.components.dataset.init && this.components.dataset.init();
        this.components.insights.init && this.components.insights.init();
    }

    initVoiceArchive() {
        // 延迟初始化，等待 DOM 完全渲染
        setTimeout(() => {
            this.components.voiceArchive.init();
        }, 100);
    }

    renderDecorations() {
        const dec = this.components.decorations;
        return `
            ${dec.renderCornerFlower('top-left')}
        `;
    }

    initScrollEffects() {
        const sections = document.querySelectorAll('.section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });

        sections.forEach(section => {
            observer.observe(section);
        });

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                section.classList.add('in-view');
            }
        });
    }
}
