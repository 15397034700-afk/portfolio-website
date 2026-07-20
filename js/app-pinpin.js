import { PinpinNav } from './components/PinpinNav.js';
import { Footer } from './components/footer.js';
import { PageDecorations } from './components/PageDecorations.js';
import { PinpinHero } from './components/PinpinHero.js';
import { PinpinThinking } from './components/PinpinThinking.js';
import { PinpinPreview } from './components/PinpinPreview.js';
import { DetailInteractions } from './detail-interactions.js';

export class PinpinDetailApp {
    constructor() {
        this.components = {};
        this.detailInteractions = new DetailInteractions({
            sections: [
                { id: 'pinpin-hero', label: 'Overview' },
                { id: 'pinpin-thinking', label: 'Thinking' },
                { id: 'pinpin-preview', label: 'Preview' }
            ],
            nextProject: {
                title: 'Content Growth',
                subtitle: 'Content Strategy',
                url: 'content-growth.html'
            }
        });
    }

    init() {
        this.renderComponents();
        this.detailInteractions.init();
    }

    renderComponents() {
        this.components.navigation = new PinpinNav();
        this.components.hero = new PinpinHero();
        this.components.thinking = new PinpinThinking();
        this.components.preview = new PinpinPreview();
        this.components.footer = new Footer();
        this.components.decorations = new PageDecorations();

        document.getElementById('navigation').innerHTML = this.components.navigation.render();
        document.getElementById('pinpin-hero').innerHTML = this.components.hero.render();
        document.getElementById('pinpin-thinking').innerHTML = this.components.thinking.render();
        document.getElementById('pinpin-preview').innerHTML = this.components.preview.render();
        document.getElementById('footer').innerHTML = this.components.footer.render();
        document.getElementById('decorations').innerHTML = this.renderDecorations();

        this.components.hero.init();
        this.components.thinking.init();
        this.components.preview.init();
    }

    renderDecorations() {
        const dec = this.components.decorations;
        return `
            ${dec.renderCornerFlower('top-left')}
        `;
    }
}
