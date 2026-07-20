import { heroData } from '../data/works.js';

export class Hero {
    constructor() {
        this.data = heroData;
    }

    render() {
        return `
            <section class="section hero-section" id="hero">
                <div class="hero-brand">
                    <h1 class="hero-name">${this.data.name}</h1>
                    <p class="hero-role">AI Product Designer</p>
                    <p class="hero-role-sub">Media Studies</p>
                </div>

                <div class="hero-main">
                    <div class="hero-title-block">
                        <h2 class="hero-title">
                            ${this.data.titleLines.map(line => `<span>${line}</span>`).join('')}
                        </h2>
                        <div class="hero-title-bg"></div>
                    </div>

                    <div class="hero-description">
                        ${this.data.descriptionLines.map(line => `<p>${line}</p>`).join('')}
                    </div>
                </div>

                <div class="hero-scroll-hint">
                    <span class="scroll-arrow">↓</span>
                    <span class="scroll-text">Scroll to explore</span>
                </div>
            </section>
        `;
    }

    init() {
    }
}
