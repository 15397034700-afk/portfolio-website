import { GrowthVine } from './GrowthVine.js';
import { WorkCard } from './ProjectCard.js';
import { worksData } from '../data/works.js';

export class Works {
    constructor() {
        this.works = worksData;
        this.vine = new GrowthVine({ works: worksData });
        this.cards = [];
        
        this.initCards();
    }

    initCards() {
        this.works.forEach((work, index) => {
            this.cards.push(new WorkCard({ project: work, index }));
        });
    }

    render() {
        return `
            <section class="section works-section" id="works">
                <div class="works-section-header">
                    <p class="works-section-label">Selected Works</p>
                    <h2 class="works-section-title">SELECTED WORKS</h2>
                    <p class="works-section-subtitle">精选项目<br>展示我在 AI 产品、用户研究、内容策略和数字体验方向的探索。</p>
                </div>
                
                <div class="work-cards-wrapper">
                    <div class="works-vine-container">
                        ${this.vine.render()}
                    </div>
                    ${this.cards.map(card => card.render()).join('')}
                </div>
            </section>
        `;
    }

    init() {
    }
}
