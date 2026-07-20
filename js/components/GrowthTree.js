export class GrowthTree {
    constructor() {
        this.svgWidth = 800;
        this.svgHeight = 2800;
        this.treeBaseX = 80;
        this.treeBaseY = 2750;
    }

    render() {
        return `
            <div class="growth-tree-container">
                <svg class="growth-tree-svg" viewBox="0 0 ${this.svgWidth} ${this.svgHeight}" preserveAspectRatio="xMidYMax slice">
                    ${this.renderTrunk()}
                    ${this.renderBranches()}
                    ${this.renderLeaves()}
                    ${this.renderBuds()}
                    ${this.renderFlowers()}
                </svg>
            </div>
        `;
    }

    renderTrunk() {
        const trunkPaths = [
            {
                d: `M ${this.treeBaseX} ${this.treeBaseY} 
                    Q ${this.treeBaseX - 8} ${this.treeBaseY - 150}, ${this.treeBaseX + 12} ${this.treeBaseY - 300}
                    Q ${this.treeBaseX + 25} ${this.treeBaseY - 450}, ${this.treeBaseX + 8} ${this.treeBaseY - 600}
                    Q ${this.treeBaseX - 8} ${this.treeBaseY - 750}, ${this.treeBaseX + 15} ${this.treeBaseY - 900}
                    Q ${this.treeBaseX + 30} ${this.treeBaseY - 1050}, ${this.treeBaseX + 5} ${this.treeBaseY - 1200}
                    Q ${this.treeBaseX - 15} ${this.treeBaseY - 1350}, ${this.treeBaseX + 20} ${this.treeBaseY - 1500}
                    Q ${this.treeBaseX + 40} ${this.treeBaseY - 1650}, ${this.treeBaseX + 10} ${this.treeBaseY - 1800}
                    Q ${this.treeBaseX - 10} ${this.treeBaseY - 1950}, ${this.treeBaseX + 25} ${this.treeBaseY - 2100}
                    Q ${this.treeBaseX + 45} ${this.treeBaseY - 2250}, ${this.treeBaseX + 15} ${this.treeBaseY - 2400}
                    Q ${this.treeBaseX} ${this.treeBaseY - 2550}, ${this.treeBaseX + 20} ${this.treeBaseY - 2700}`,
                width: 18,
                color: '#9A8B7C'
            },
            {
                d: `M ${this.treeBaseX + 5} ${this.treeBaseY} 
                    Q ${this.treeBaseX - 3} ${this.treeBaseY - 150}, ${this.treeBaseX + 17} ${this.treeBaseY - 300}
                    Q ${this.treeBaseX + 30} ${this.treeBaseY - 450}, ${this.treeBaseX + 13} ${this.treeBaseY - 600}
                    Q ${this.treeBaseX - 3} ${this.treeBaseY - 750}, ${this.treeBaseX + 20} ${this.treeBaseY - 900}
                    Q ${this.treeBaseX + 35} ${this.treeBaseY - 1050}, ${this.treeBaseX + 10} ${this.treeBaseY - 1200}
                    Q ${this.treeBaseX - 10} ${this.treeBaseY - 1350}, ${this.treeBaseX + 25} ${this.treeBaseY - 1500}
                    Q ${this.treeBaseX + 45} ${this.treeBaseY - 1650}, ${this.treeBaseX + 15} ${this.treeBaseY - 1800}
                    Q ${this.treeBaseX - 5} ${this.treeBaseY - 1950}, ${this.treeBaseX + 30} ${this.treeBaseY - 2100}
                    Q ${this.treeBaseX + 50} ${this.treeBaseY - 2250}, ${this.treeBaseX + 20} ${this.treeBaseY - 2400}
                    Q ${this.treeBaseX + 5} ${this.treeBaseY - 2550}, ${this.treeBaseX + 25} ${this.treeBaseY - 2700}`,
                width: 10,
                color: '#B5A89B'
            }
        ];

        return `
            <g>
                ${trunkPaths.map(path => `
                    <path d="${path.d}" 
                          fill="none" 
                          stroke="${path.color}" 
                          stroke-width="${path.width}" 
                          stroke-linecap="round"
                          opacity="0.9"/>
                `).join('')}
                ${this.renderBarkTexture()}
            </g>
        `;
    }

    renderBarkTexture() {
        const textures = [];
        for (let i = 0; i < 25; i++) {
            const y = this.treeBaseY - i * 110;
            const xOffset = Math.sin(i * 1.2) * 12;
            const xBase = this.treeBaseX + 5 + xOffset;
            
            textures.push(`
                <path d="M ${xBase - 6} ${y} Q ${xBase + 1} ${y - 12}, ${xBase + 8} ${y}" 
                      fill="none" 
                      stroke="#8A7B6C" 
                      stroke-width="0.5" 
                      opacity="0.25"/>
            `);
            
            if (i % 2 === 0) {
                textures.push(`
                    <path d="M ${xBase - 4} ${y + 30} Q ${xBase + 3} ${y + 18}, ${xBase + 6} ${y + 30}" 
                          fill="none" 
                          stroke="#7A6B5C" 
                          stroke-width="0.4" 
                          opacity="0.2"/>
                `);
            }
        }
        return textures.join('');
    }

    renderBranches() {
        const branches = [
            {
                d: `M ${this.treeBaseX + 12} ${this.treeBaseY - 500} 
                    Q ${this.treeBaseX + 60} ${this.treeBaseY - 480}, ${this.treeBaseX + 120} ${this.treeBaseY - 520}
                    Q ${this.treeBaseX + 180} ${this.treeBaseY - 560}, ${this.treeBaseX + 220} ${this.treeBaseY - 600}
                    Q ${this.treeBaseX + 250} ${this.treeBaseY - 630}, ${this.treeBaseX + 280} ${this.treeBaseY - 680}`,
                width: 5,
                color: '#9A8B7C'
            },
            {
                d: `M ${this.treeBaseX + 8} ${this.treeBaseY - 850} 
                    Q ${this.treeBaseX - 30} ${this.treeBaseY - 820}, ${this.treeBaseX - 70} ${this.treeBaseY - 780}
                    Q ${this.treeBaseX - 100} ${this.treeBaseY - 740}, ${this.treeBaseX - 120} ${this.treeBaseY - 700}`,
                width: 4,
                color: '#A5988B'
            },
            {
                d: `M ${this.treeBaseX + 15} ${this.treeBaseY - 1150} 
                    Q ${this.treeBaseX + 80} ${this.treeBaseY - 1100}, ${this.treeBaseX + 160} ${this.treeBaseY - 1120}
                    Q ${this.treeBaseX + 240} ${this.treeBaseY - 1140}, ${this.treeBaseX + 320} ${this.treeBaseY - 1180}
                    Q ${this.treeBaseX + 380} ${this.treeBaseY - 1220}, ${this.treeBaseX + 430} ${this.treeBaseY - 1280}`,
                width: 6,
                color: '#9A8B7C'
            },
            {
                d: `M ${this.treeBaseX + 10} ${this.treeBaseY - 1450} 
                    Q ${this.treeBaseX - 40} ${this.treeBaseY - 1400}, ${this.treeBaseX - 80} ${this.treeBaseY - 1350}
                    Q ${this.treeBaseX - 110} ${this.treeBaseY - 1300}, ${this.treeBaseX - 130} ${this.treeBaseY - 1250}`,
                width: 3.5,
                color: '#A5988B'
            },
            {
                d: `M ${this.treeBaseX + 20} ${this.treeBaseY - 1750} 
                    Q ${this.treeBaseX + 90} ${this.treeBaseY - 1680}, ${this.treeBaseX + 180} ${this.treeBaseY - 1700}
                    Q ${this.treeBaseX + 270} ${this.treeBaseY - 1720}, ${this.treeBaseX + 360} ${this.treeBaseY - 1760}
                    Q ${this.treeBaseX + 430} ${this.treeBaseY - 1800}, ${this.treeBaseX + 490} ${this.treeBaseY - 1860}`,
                width: 5,
                color: '#9A8B7C'
            },
            {
                d: `M ${this.treeBaseX + 15} ${this.treeBaseY - 2050} 
                    Q ${this.treeBaseX - 50} ${this.treeBaseY - 1980}, ${this.treeBaseX - 100} ${this.treeBaseY - 1910}
                    Q ${this.treeBaseX - 140} ${this.treeBaseY - 1840}, ${this.treeBaseX - 170} ${this.treeBaseY - 1770}`,
                width: 3,
                color: '#B5A89B'
            },
            {
                d: `M ${this.treeBaseX + 25} ${this.treeBaseY - 2300} 
                    Q ${this.treeBaseX + 100} ${this.treeBaseY - 2220}, ${this.treeBaseX + 200} ${this.treeBaseY - 2240}
                    Q ${this.treeBaseX + 300} ${this.treeBaseY - 2260}, ${this.treeBaseX + 380} ${this.treeBaseY - 2300}
                    Q ${this.treeBaseX + 450} ${this.treeBaseY - 2340}, ${this.treeBaseX + 510} ${this.treeBaseY - 2400}`,
                width: 4,
                color: '#A5988B'
            },
            {
                d: `M ${this.treeBaseX + 20} ${this.treeBaseY - 2550} 
                    Q ${this.treeBaseX + 60} ${this.treeBaseY - 2480}, ${this.treeBaseX + 120} ${this.treeBaseY - 2500}
                    Q ${this.treeBaseX + 180} ${this.treeBaseY - 2520}, ${this.treeBaseX + 240} ${this.treeBaseY - 2560}`,
                width: 2.5,
                color: '#B5A89B'
            }
        ];

        const twigs = [
            'M 200 2200 Q 220 2150, 190 2100',
            'M 260 2220 Q 290 2180, 270 2140',
            'M 340 2260 Q 370 2220, 350 2180',
            'M 420 2310 Q 450 2270, 430 2230',
            'M 490 2370 Q 510 2330, 490 2290',
            
            'M 180 1680 Q 160 1630, 190 1590',
            'M 270 1710 Q 250 1660, 280 1620',
            'M 360 1750 Q 340 1700, 370 1660',
            'M 450 1800 Q 430 1750, 460 1710',
            'M 520 1860 Q 500 1810, 530 1770',
            
            'M 160 1300 Q 180 1250, 150 1200',
            'M 240 1320 Q 260 1270, 230 1220',
            'M 330 1360 Q 350 1310, 320 1260',
            'M 420 1400 Q 440 1350, 410 1300',
            'M 490 1450 Q 510 1400, 480 1350',
            
            'M 200 2200 Q 180 2250, 210 2290',
            'M 280 2240 Q 260 2290, 290 2330',
            'M 360 2280 Q 340 2330, 370 2370'
        ];

        return `
            <g>
                ${branches.map(b => `
                    <path d="${b.d}" 
                          fill="none" 
                          stroke="${b.color}" 
                          stroke-width="${b.width}" 
                          stroke-linecap="round"
                          opacity="0.85"/>
                `).join('')}
                <g stroke="#C9BDB0" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.6">
                    ${twigs.map(t => `<path d="${t}" />`).join('')}
                </g>
            </g>
        `;
    }

    renderLeaves() {
        const leaves = [
            { x: 280, y: 2070, size: 8, rotation: 30, color: '#D4DEC9' },
            { x: 350, y: 2100, size: 7, rotation: -20, color: '#C8D4B8' },
            { x: 430, y: 2150, size: 9, rotation: 45, color: '#D4DEC9' },
            { x: 490, y: 2220, size: 6, rotation: -35, color: '#C8D4B8' },
            { x: 510, y: 2280, size: 7, rotation: 25, color: '#D4DEC9' },
            
            { x: 190, y: 1590, size: 6, rotation: -40, color: '#C8D4B8' },
            { x: 280, y: 1620, size: 8, rotation: 15, color: '#D4DEC9' },
            { x: 370, y: 1660, size: 7, rotation: -25, color: '#C8D4B8' },
            { x: 460, y: 1710, size: 9, rotation: 35, color: '#D4DEC9' },
            { x: 530, y: 1770, size: 6, rotation: -45, color: '#C8D4B8' },
            
            { x: 150, y: 1200, size: 7, rotation: 20, color: '#D4DEC9' },
            { x: 230, y: 1220, size: 6, rotation: -30, color: '#C8D4B8' },
            { x: 320, y: 1260, size: 8, rotation: 40, color: '#D4DEC9' },
            { x: 410, y: 1300, size: 7, rotation: -15, color: '#C8D4B8' },
            { x: 480, y: 1350, size: 6, rotation: 30, color: '#D4DEC9' },
            
            { x: 210, y: 2290, size: 5, rotation: -25, color: '#E8EDE0' },
            { x: 290, y: 2330, size: 6, rotation: 20, color: '#D4DEC9' },
            { x: 370, y: 2370, size: 5, rotation: -35, color: '#E8EDE0' },
            
            { x: -130, y: 1770, size: 6, rotation: 50, color: '#D4DEC9' },
            { x: -170, y: 1700, size: 5, rotation: -30, color: '#E8EDE0' },
            
            { x: -80, y: 1350, size: 7, rotation: 40, color: '#D4DEC9' },
            { x: -110, y: 1280, size: 6, rotation: -20, color: '#E8EDE0' }
        ];

        return `
            <g>
                ${leaves.map(l => this.renderLeaf(l.x, l.y, l.size, l.rotation, l.color)).join('')}
            </g>
        `;
    }

    renderLeaf(x, y, size, rotation, color) {
        return `
            <g transform="translate(${x}, ${y}) rotate(${rotation})">
                <ellipse cx="0" cy="${-size * 0.8}" rx="${size * 0.4}" ry="${size}" fill="${color}" opacity="0.7"/>
                <path d="M 0 ${-size * 1.2} Q 0 ${-size * 0.6}, 0 ${size * 0.3}" 
                      stroke="${color}" stroke-width="0.5" fill="none" opacity="0.5"/>
            </g>
        `;
    }

    renderBuds() {
        const buds = [
            { x: 260, y: 2080, size: 3 },
            { x: 340, y: 2120, size: 2.5 },
            { x: 420, y: 2170, size: 3 },
            { x: 500, y: 2240, size: 2.5 },
            
            { x: 170, y: 1600, size: 2.5 },
            { x: 260, y: 1640, size: 3 },
            { x: 350, y: 1680, size: 2.5 },
            { x: 440, y: 1730, size: 3 },
            { x: 510, y: 1790, size: 2.5 },
            
            { x: 140, y: 1220, size: 2.5 },
            { x: 220, y: 1240, size: 3 },
            { x: 310, y: 1280, size: 2.5 },
            { x: 400, y: 1320, size: 3 },
            { x: 470, y: 1370, size: 2.5 },
            
            { x: 200, y: 2310, size: 2 },
            { x: 280, y: 2350, size: 2.5 },
            { x: 360, y: 2390, size: 2 }
        ];

        return `
            <g>
                ${buds.map(b => `
                    <circle cx="${b.x}" cy="${b.y}" r="${b.size}" fill="#DDB8C2" opacity="0.6"/>
                    <circle cx="${b.x}" cy="${b.y}" r="${b.size * 0.5}" fill="#F5D5DC" opacity="0.8"/>
                `).join('')}
            </g>
        `;
    }

    renderFlowers() {
        const flowers = [
            { x: 490, y: 2280, size: 5, rotation: 0 },
            { x: 370, y: 1700, size: 4, rotation: 20 },
            { x: 480, y: 1380, size: 4.5, rotation: -15 },
            { x: 340, y: 2140, size: 3.5, rotation: 30 }
        ];

        return `
            <g>
                ${flowers.map(f => this.renderFlower(f.x, f.y, f.size, f.rotation)).join('')}
            </g>
        `;
    }

    renderFlower(x, y, size, rotation) {
        return `
            <g transform="translate(${x}, ${y}) rotate(${rotation})">
                <g opacity="0.7">
                    <ellipse cx="0" cy="${-size}" rx="${size * 0.4}" ry="${size * 0.7}" fill="#F5D5DC" transform="rotate(0)"/>
                    <ellipse cx="0" cy="${-size}" rx="${size * 0.4}" ry="${size * 0.7}" fill="#F5D5DC" transform="rotate(72)"/>
                    <ellipse cx="0" cy="${-size}" rx="${size * 0.4}" ry="${size * 0.7}" fill="#F5D5DC" transform="rotate(144)"/>
                    <ellipse cx="0" cy="${-size}" rx="${size * 0.4}" ry="${size * 0.7}" fill="#F5D5DC" transform="rotate(216)"/>
                    <ellipse cx="0" cy="${-size}" rx="${size * 0.4}" ry="${size * 0.7}" fill="#F5D5DC" transform="rotate(288)"/>
                </g>
                <circle cx="0" cy="0" r="${size * 0.3}" fill="#F9E6EA" opacity="0.9"/>
            </g>
        `;
    }
}