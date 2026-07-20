export class GrowthVine {
    constructor({ works = [] }) {
        this.works = works;
        this.svgWidth = 300;
        this.svgHeight = 3200;
        this.vineBaseX = 40;
        this.vineBaseY = 3150;
    }

    render() {
        return `
            <div class="growth-vine-container">
                <svg class="growth-vine-svg" viewBox="0 0 ${this.svgWidth} ${this.svgHeight}" preserveAspectRatio="none">
                    ${this.renderMainVine()}
                    ${this.renderSmallLeaves()}
                    ${this.renderGrowthNodes()}
                    ${this.renderBuds()}
                    ${this.renderSeedAtBottom()}
                </svg>
            </div>
        `;
    }

    renderMainVine() {
        const vinePath = `
            M ${this.vineBaseX} ${this.vineBaseY}
            Q ${this.vineBaseX + 30} ${this.vineBaseY - 250}, ${this.vineBaseX + 15} ${this.vineBaseY - 500}
            Q ${this.vineBaseX - 15} ${this.vineBaseY - 750}, ${this.vineBaseX + 25} ${this.vineBaseY - 1000}
            Q ${this.vineBaseX + 50} ${this.vineBaseY - 1250}, ${this.vineBaseX + 20} ${this.vineBaseY - 1500}
            Q ${this.vineBaseX - 10} ${this.vineBaseY - 1750}, ${this.vineBaseX + 35} ${this.vineBaseY - 2000}
            Q ${this.vineBaseX + 60} ${this.vineBaseY - 2250}, ${this.vineBaseX + 30} ${this.vineBaseY - 2500}
            Q ${this.vineBaseX + 5} ${this.vineBaseY - 2750}, ${this.vineBaseX + 40} ${this.vineBaseY - 2950}
            Q ${this.vineBaseX + 65} ${this.vineBaseY - 3080}, ${this.vineBaseX + 55} ${this.vineBaseY - 3150}
        `;

        return `
            <g>
                <path d="${vinePath}" 
                      fill="none" 
                      stroke="#C9BDB0" 
                      stroke-width="2.5" 
                      stroke-linecap="round"
                      opacity="0.6"/>
                <path d="${vinePath}" 
                      fill="none" 
                      stroke="#D9CDC0" 
                      stroke-width="1" 
                      stroke-linecap="round"
                      opacity="0.4"/>
            </g>
        `;
    }

    getNodePositions() {
        const positions = [];
        const workCount = this.works.length;
        const startY = 2900;
        const endY = 400;
        const spacing = (startY - endY) / (workCount - 1);

        this.works.forEach((work, i) => {
            const y = startY - i * spacing;
            const swayOffset = Math.sin(i * 0.9 + 0.5) * 35;
            const x = this.vineBaseX + 20 + swayOffset + (work.side === 'right' ? 20 : -10);
            positions.push({ x, y, work, index: i });
        });

        return positions;
    }

    renderGrowthNodes() {
        const nodes = this.getNodePositions();
        
        return nodes.map(node => {
            const stage = this.getGrowthStage(node.index);
            return this.renderGrowthNode(node.x, node.y, stage, node.work.side);
        }).join('');
    }

    getGrowthStage(index) {
        const stages = ['seed', 'sprout', 'leaf', 'bud', 'flower', 'bloom'];
        return stages[Math.min(index, stages.length - 1)];
    }

    renderGrowthNode(x, y, stage, side) {
        const direction = side === 'right' ? 1 : -1;
        
        const stemPath = `
            M ${x} ${y}
            Q ${x + direction * 8} ${y - 5}, ${x + direction * 15} ${y - 12}
        `;

        return `
            <g>
                <path d="${stemPath}" 
                      fill="none" 
                      stroke="#C9BDB0" 
                      stroke-width="1.2" 
                      stroke-linecap="round"
                      opacity="0.5"/>
                ${this.renderNodeElement(x + direction * 15, y - 12, stage)}
            </g>
        `;
    }

    renderNodeElement(x, y, stage) {
        switch (stage) {
            case 'seed':
                return this.renderSeed(x, y, 4);
            case 'sprout':
                return this.renderSprout(x, y);
            case 'leaf':
                return this.renderSingleLeaf(x, y, 6, 25);
            case 'bud':
                return this.renderFlowerBud(x, y, 5);
            case 'flower':
                return this.renderSmallFlower(x, y, 4.5);
            case 'bloom':
                return this.renderFullFlower(x, y, 6);
            default:
                return this.renderSeed(x, y, 4);
        }
    }

    renderSeed(x, y, size) {
        return `
            <g transform="translate(${x}, ${y})">
                <ellipse cx="0" cy="0" rx="${size * 0.7}" ry="${size}" fill="#B5A89B" opacity="0.7"/>
                <ellipse cx="${-size * 0.2}" cy="${-size * 0.2}" rx="${size * 0.3}" ry="${size * 0.5}" fill="#D9CDC0" opacity="0.5"/>
            </g>
        `;
    }

    renderSprout(x, y) {
        return `
            <g transform="translate(${x}, ${y})">
                <path d="M 0 0 Q -3 -8, 0 -14 Q 3 -8, 0 0" fill="#C8D4B8" opacity="0.7"/>
                <path d="M 0 -2 Q 4 -6, 6 -10" stroke="#C8D4B8" stroke-width="1" fill="none" opacity="0.6"/>
            </g>
        `;
    }

    renderSingleLeaf(x, y, size, rotation) {
        return `
            <g transform="translate(${x}, ${y}) rotate(${rotation})">
                <ellipse cx="0" cy="${-size * 0.8}" rx="${size * 0.4}" ry="${size}" fill="#D4DEC9" opacity="0.65"/>
                <path d="M 0 ${-size * 1.2} Q 0 ${-size * 0.5}, 0 ${size * 0.2}" 
                      stroke="#B8C8A8" stroke-width="0.5" fill="none" opacity="0.5"/>
            </g>
        `;
    }

    renderFlowerBud(x, y, size) {
        return `
            <g transform="translate(${x}, ${y})">
                <ellipse cx="0" cy="0" rx="${size * 0.6}" ry="${size * 0.9}" fill="#E8C5CE" opacity="0.7"/>
                <path d="M ${-size * 0.5} ${-size * 0.2} Q 0 ${-size * 0.8}, ${size * 0.5} ${-size * 0.2}" 
                      stroke="#DDB8C2" stroke-width="0.6" fill="none" opacity="0.6"/>
                <path d="M 0 ${size * 0.9} Q ${-size * 0.3} ${size * 0.5}, ${-size * 0.6} ${size * 0.3}" 
                      stroke="#C9BDB0" stroke-width="0.5" fill="none" opacity="0.5"/>
            </g>
        `;
    }

    renderSmallFlower(x, y, size) {
        return `
            <g transform="translate(${x}, ${y})">
                <g opacity="0.65">
                    <ellipse cx="0" cy="${-size}" rx="${size * 0.35}" ry="${size * 0.6}" fill="#F5D5DC" transform="rotate(0)"/>
                    <ellipse cx="0" cy="${-size}" rx="${size * 0.35}" ry="${size * 0.6}" fill="#F5D5DC" transform="rotate(72)"/>
                    <ellipse cx="0" cy="${-size}" rx="${size * 0.35}" ry="${size * 0.6}" fill="#F5D5DC" transform="rotate(144)"/>
                    <ellipse cx="0" cy="${-size}" rx="${size * 0.35}" ry="${size * 0.6}" fill="#F5D5DC" transform="rotate(216)"/>
                    <ellipse cx="0" cy="${-size}" rx="${size * 0.35}" ry="${size * 0.6}" fill="#F5D5DC" transform="rotate(288)"/>
                </g>
                <circle cx="0" cy="0" r="${size * 0.35}" fill="#F9E6EA" opacity="0.85"/>
            </g>
        `;
    }

    renderFullFlower(x, y, size) {
        return `
            <g transform="translate(${x}, ${y})">
                <g opacity="0.7">
                    <ellipse cx="0" cy="${-size * 1.1}" rx="${size * 0.4}" ry="${size * 0.7}" fill="#F5D5DC" transform="rotate(0)"/>
                    <ellipse cx="0" cy="${-size * 1.1}" rx="${size * 0.4}" ry="${size * 0.7}" fill="#F0D0D8" transform="rotate(51.4)"/>
                    <ellipse cx="0" cy="${-size * 1.1}" rx="${size * 0.4}" ry="${size * 0.7}" fill="#F5D5DC" transform="rotate(102.8)"/>
                    <ellipse cx="0" cy="${-size * 1.1}" rx="${size * 0.4}" ry="${size * 0.7}" fill="#F0D0D8" transform="rotate(154.2)"/>
                    <ellipse cx="0" cy="${-size * 1.1}" rx="${size * 0.4}" ry="${size * 0.7}" fill="#F5D5DC" transform="rotate(205.6)"/>
                    <ellipse cx="0" cy="${-size * 1.1}" rx="${size * 0.4}" ry="${size * 0.7}" fill="#F0D0D8" transform="rotate(257)"/>
                    <ellipse cx="0" cy="${-size * 1.1}" rx="${size * 0.4}" ry="${size * 0.7}" fill="#F5D5DC" transform="rotate(308.4)"/>
                </g>
                <circle cx="0" cy="0" r="${size * 0.45}" fill="#F9E6EA" opacity="0.9"/>
                <circle cx="0" cy="0" r="${size * 0.2}" fill="#E8C5CE" opacity="0.5"/>
            </g>
        `;
    }

    renderSmallLeaves() {
        const leaves = [
            { x: 25, y: 2950, size: 5, rotation: 40 },
            { x: 55, y: 2700, size: 4, rotation: -30 },
            { x: 15, y: 2450, size: 6, rotation: 35 },
            { x: 45, y: 2200, size: 4.5, rotation: -45 },
            { x: 30, y: 1950, size: 5, rotation: 25 },
            { x: 60, y: 1700, size: 4, rotation: -35 },
            { x: 20, y: 1450, size: 5.5, rotation: 45 },
            { x: 50, y: 1150, size: 4.5, rotation: -25 },
            { x: 35, y: 850, size: 5, rotation: 30 },
            { x: 55, y: 550, size: 4, rotation: -40 }
        ];

        return `
            <g>
                ${leaves.map(l => this.renderSingleLeaf(l.x, l.y, l.size, l.rotation)).join('')}
            </g>
        `;
    }

    renderBuds() {
        const buds = [
            { x: 50, y: 2550, size: 2.5 },
            { x: 25, y: 2100, size: 2 },
            { x: 55, y: 1600, size: 2.5 },
            { x: 30, y: 1050, size: 2 },
            { x: 50, y: 600, size: 2.5 }
        ];

        return `
            <g>
                ${buds.map(b => `
                    <circle cx="${b.x}" cy="${b.y}" r="${b.size}" fill="#DDB8C2" opacity="0.45"/>
                    <circle cx="${b.x}" cy="${b.y}" r="${b.size * 0.5}" fill="#F5D5DC" opacity="0.6"/>
                `).join('')}
            </g>
        `;
    }

    renderSeedAtBottom() {
        return `
            <g transform="translate(${this.vineBaseX}, ${this.vineBaseY + 30})">
                <ellipse cx="0" cy="0" rx="6" ry="8" fill="#B5A89B" opacity="0.6"/>
                <ellipse cx="-1.5" cy="-2" rx="2.5" ry="4" fill="#D9CDC0" opacity="0.4"/>
                <text x="0" y="25" text-anchor="middle" 
                      font-family="'Cormorant Garamond', serif" 
                      font-size="10" 
                      fill="#B5A89B" 
                      opacity="0.5"
                      font-style="italic">Seed</text>
            </g>
        `;
    }
}
