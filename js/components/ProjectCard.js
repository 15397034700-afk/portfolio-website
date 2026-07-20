import { ProjectFrame } from './ProjectFrame.js';

export class WorkCard {
    constructor({ project, index }) {
        this.project = project;
        this.index = index;
        this.frame = new ProjectFrame({
            image: project.image,
            video: project.video,
            alt: project.title
        });
    }

    render() {
        const isRight = this.project.side === 'right';
        const tapeColors = ['#F0D5DC', '#D4DEC9', '#E0DCE8', '#F5EBC8'];
        const tapeColor = tapeColors[this.index % tapeColors.length];

        return `
            <div class="work-card-item card-${isRight ? 'right' : 'left'}" data-project-id="${this.project.id}">
                ${isRight ? `
                    <div class="work-card-content">
                        ${this.renderCardContent()}
                    </div>
                    <div class="work-card-image-wrapper">
                        <div class="polaroid-frame">
                            ${this.renderTape(tapeColor)}
                            ${this.frame.render()}
                            ${this.renderCornerDecorations()}
                            ${this.renderStamp()}
                        </div>
                    </div>
                ` : `
                    <div class="work-card-image-wrapper">
                        <div class="polaroid-frame">
                            ${this.renderTape(tapeColor)}
                            ${this.frame.render()}
                            ${this.renderCornerDecorations()}
                            ${this.renderStamp()}
                        </div>
                    </div>
                    <div class="work-card-content">
                        ${this.renderCardContent()}
                    </div>
                `}
            </div>
        `;
    }

    renderTape(color) {
        const rotations = [-1.5, 1, -2, 0.5];
        const rotation = rotations[this.index % rotations.length];
        
        return `
            <div class="polaroid-tape" style="background: ${color}; transform: rotate(${rotation}deg);">
                <div class="polaroid-tape-texture"></div>
            </div>
        `;
    }

    renderCornerDecorations() {
        return `
            <div class="polaroid-corner top-left"></div>
            <div class="polaroid-corner top-right"></div>
            <div class="polaroid-corner bottom-left"></div>
            <div class="polaroid-corner bottom-right"></div>
        `;
    }

    renderStamp() {
        const stamps = ['✦', '✧', '❀', '✻'];
        const stamp = stamps[this.index % stamps.length];
        
        return `
            <div class="polaroid-stamp">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="#E8C5CE" stroke-width="0.8" opacity="0.4"/>
                    <text x="12" y="15" text-anchor="middle" fill="#E8C5CE" font-size="10" opacity="0.5">${stamp}</text>
                </svg>
            </div>
        `;
    }

    renderCardContent() {
        const descriptionLines = this.project.description.split('\n');
        const isRight = this.project.side === 'right';

        return `
            <div class="work-card-text ${isRight ? 'text-right' : 'text-left'}">
                <div class="work-card-tag">
                    ${this.renderTag()}
                </div>
                <p class="work-card-number">${this.project.number}</p>
                <h3 class="work-card-title">${this.project.title}</h3>
                ${this.project.subtitle ? `<p class="work-card-subtitle">${this.project.subtitle}</p>` : ''}
                <p class="work-card-category">${this.project.category}</p>
                <div class="work-card-description">
                    ${descriptionLines.map(line => `<p>${line}</p>`).join('')}
                </div>
                <a href="${this.project.detailUrl || '#'}" class="work-card-view-link">
                    <div class="work-card-view">
                        <span>View Case</span>
                        <span class="work-card-view-arrow">→</span>
                    </div>
                </a>
                ${this.renderPressedLeaf()}
            </div>
        `;
    }

    renderTag() {
        const colors = ['#F0D5DC', '#D4DEC9', '#E0DCE8'];
        const color = colors[this.index % colors.length];
        
        return `
            <div class="card-tag" style="background: ${color}; opacity: 0.4;">
                <span>${this.project.category.toUpperCase()}</span>
            </div>
        `;
    }

    renderPressedLeaf() {
        const leaves = [
            '<svg width="20" height="25" viewBox="0 0 20 25" xmlns="http://www.w3.org/2000/svg"><path d="M 10 2 Q 5 8, 3 15 Q 5 20, 10 23 Q 15 20, 17 15 Q 15 8, 10 2" fill="none" stroke="#D4DEC9" stroke-width="0.6" opacity="0.3"/></svg>',
            '<svg width="18" height="20" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg"><ellipse cx="9" cy="10" rx="5" ry="8" fill="none" stroke="#E8C5CE" stroke-width="0.5" opacity="0.25"/></svg>',
            '<svg width="22" height="18" viewBox="0 0 22 18" xmlns="http://www.w3.org/2000/svg"><path d="M 2 9 Q 10 2, 20 9 Q 10 16, 2 9" fill="none" stroke="#E0DCE8" stroke-width="0.5" opacity="0.25"/></svg>',
        ];
        const leaf = leaves[this.index % leaves.length];
        
        return `
            <div class="pressed-leaf">
                ${leaf}
            </div>
        `;
    }

    init() {
    }
}
