export class LaceFrame {
    constructor({
        width = 800,
        height = 600,
        outerBandHeight = 60,
        laceWidth = 80,
        innerLaceWidth = 24,
        colors = {
            greenBand: '#B8C9A8',
            greenBandLight: '#D4E0C5',
            pinkLace: '#F5D5DC',
            pinkLaceDark: '#E8C5CE',
            pinkDot: '#F9E6EA',
            yellowDot: '#F0E6C8',
            butterfly: '#F0B8C8',
            butterflyDark: '#E8A0B0'
        }
    } = {}) {
        this.width = width;
        this.height = height;
        this.outerBandHeight = outerBandHeight;
        this.laceWidth = laceWidth;
        this.innerLaceWidth = innerLaceWidth;
        this.colors = colors;
    }

    render() {
        const { width, height, outerBandHeight, laceWidth, innerLaceWidth } = this;
        const innerX = laceWidth;
        const innerY = laceWidth + outerBandHeight;
        const innerWidth = width - laceWidth * 2;
        const innerHeight = height - (laceWidth + outerBandHeight) * 2;

        return `
            <svg class="lace-frame-svg" 
                 viewBox="0 0 ${width} ${height}" 
                 xmlns="http://www.w3.org/2000/svg"
                 preserveAspectRatio="none">
                <defs>
                    ${this.renderPatterns()}
                </defs>
                
                ${this.renderOuterGreenBand('top')}
                ${this.renderOuterGreenBand('bottom')}
                
                ${this.renderMainLaceBorder('top')}
                ${this.renderMainLaceBorder('bottom')}
                ${this.renderMainLaceBorder('left')}
                ${this.renderMainLaceBorder('right')}
                
                ${this.renderCornerDecorations()}
                
                ${this.renderButterflies()}
                
                ${this.renderInnerLace('top')}
                ${this.renderInnerLace('bottom')}
                ${this.renderInnerLace('left')}
                ${this.renderInnerLace('right')}
                
                <rect x="${innerX}" y="${innerY}" 
                      width="${innerWidth}" height="${innerHeight}" 
                      fill="none" stroke="${this.colors.pinkLaceDark}" stroke-width="1" opacity="0.5"/>
            </svg>
        `;
    }

    renderPatterns() {
        return `
            <pattern id="greenDiamondPattern" x="0" y="0" width="40" height="30" patternUnits="userSpaceOnUse">
                <g opacity="0.6">
                    <path d="M 20 0 L 40 15 L 20 30 L 0 15 Z" 
                          fill="none" stroke="${this.colors.greenBand}" stroke-width="1"/>
                    <path d="M 20 5 L 35 15 L 20 25 L 5 15 Z" 
                          fill="none" stroke="${this.colors.greenBandLight}" stroke-width="0.5" opacity="0.7"/>
                    <circle cx="20" cy="15" r="2" fill="${this.colors.greenBandLight}" opacity="0.5"/>
                    <path d="M 20 12 L 20 18 M 17 15 L 23 15" 
                          stroke="${this.colors.greenBand}" stroke-width="0.8" opacity="0.4"/>
                </g>
            </pattern>
            
            <pattern id="pinkLacePattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <g opacity="0.5">
                    <ellipse cx="15" cy="15" rx="6" ry="10" fill="${this.colors.pinkLace}" opacity="0.3"/>
                    <ellipse cx="15" cy="15" rx="3" ry="6" fill="${this.colors.pinkDot}" opacity="0.5"/>
                    <circle cx="15" cy="5" r="1.5" fill="${this.colors.yellowDot}" opacity="0.6"/>
                    <circle cx="15" cy="25" r="1.5" fill="${this.colors.yellowDot}" opacity="0.6"/>
                </g>
            </pattern>
        `;
    }

    renderOuterGreenBand(position) {
        const { width, outerBandHeight } = this;
        const isTop = position === 'top';
        const y = isTop ? 0 : this.height - outerBandHeight;

        const scallopPath = isTop
            ? `M 0 ${outerBandHeight}
               ${this.generateScallops(width, outerBandHeight, 20, true)}
               L ${width} 0 L 0 0 Z`
            : `M 0 ${y}
               L ${width} ${y}
               L ${width} ${y + outerBandHeight}
               ${this.generateScallops(width, y + outerBandHeight, 20, false)}
               L 0 ${y + outerBandHeight} Z`;

        return `
            <g class="outer-green-band band-${position}">
                <path d="${scallopPath}" fill="${this.colors.greenBand}" opacity="0.45"/>
                
                <rect x="0" y="${isTop ? 8 : y + 8}" 
                      width="${width}" height="${outerBandHeight - 16}" 
                      fill="url(#greenDiamondPattern)"/>
                
                <path d="${this.generateScallopOutline(width, isTop ? outerBandHeight : y, 20, isTop)}" 
                      fill="none" stroke="${this.colors.greenBand}" stroke-width="1.5" opacity="0.6"/>
            </g>
        `;
    }

    generateScallops(totalWidth, baseY, size, isTop) {
        const count = Math.ceil(totalWidth / (size * 2));
        const actualSize = totalWidth / count / 2;
        let path = '';
        
        for (let i = 0; i < count; i++) {
            const x = i * actualSize * 2;
            const midX = x + actualSize;
            const endX = x + actualSize * 2;
            const curveY = isTop ? baseY - size * 0.4 : baseY + size * 0.4;
            
            if (i === 0) {
                path += `M ${x} ${baseY}`;
            }
            path += ` Q ${midX} ${curveY}, ${endX} ${baseY}`;
        }
        
        return path;
    }

    generateScallopOutline(totalWidth, baseY, size, isTop) {
        const count = Math.ceil(totalWidth / (size * 2));
        const actualSize = totalWidth / count / 2;
        let path = '';
        
        for (let i = 0; i < count; i++) {
            const x = i * actualSize * 2;
            const midX = x + actualSize;
            const endX = x + actualSize * 2;
            const curveY = isTop ? baseY - size * 0.4 : baseY + size * 0.4;
            
            if (i === 0) {
                path += `M ${x} ${baseY}`;
            }
            path += ` Q ${midX} ${curveY}, ${endX} ${baseY}`;
        }
        
        return path;
    }

    renderMainLaceBorder(position) {
        const { width, height, laceWidth, outerBandHeight } = this;
        const isTop = position === 'top';
        const isBottom = position === 'bottom';
        const isLeft = position === 'left';
        const isRight = position === 'right';

        if (isTop || isBottom) {
            const y = isTop ? outerBandHeight : height - outerBandHeight - laceWidth;
            const scallopSize = 15;
            
            const topScallop = this.generateScallops(width, y, scallopSize, true);
            const bottomScallop = this.generateScallops(width, y + laceWidth, scallopSize, false);

            return `
                <g class="main-lace-border border-${position}">
                    <path d="M 0 ${y} ${topScallop} L ${width} ${y + laceWidth} 
                             ${bottomScallop} L 0 ${y} Z" 
                          fill="${this.colors.pinkLace}" opacity="0.4"/>
                    
                    <rect x="0" y="${y + 8}" width="${width}" height="${laceWidth - 16}" 
                          fill="url(#pinkLacePattern)"/>
                    
                    <path d="${topScallop}" 
                          fill="none" stroke="${this.colors.pinkLaceDark}" stroke-width="1" opacity="0.5"/>
                    <path d="${bottomScallop}" 
                          fill="none" stroke="${this.colors.pinkLaceDark}" stroke-width="1" opacity="0.5"/>
                    
                    ${this.renderLaceEyesRow(width, y + laceWidth / 2, laceWidth * 0.35)}
                    
                    ${this.renderDotRow(width, y + 12, 30)}
                    ${this.renderDotRow(width, y + laceWidth - 12, 30)}
                </g>
            `;
        } else {
            const x = isLeft ? 0 : width - laceWidth;
            const topY = outerBandHeight + laceWidth;
            const bottomY = height - outerBandHeight - laceWidth;
            const sideHeight = bottomY - topY;
            const scallopSize = 15;
            
            const leftScallop = this.generateVerticalScallops(sideHeight, x, scallopSize, true);
            const rightScallop = this.generateVerticalScallops(sideHeight, x + laceWidth, scallopSize, false);

            return `
                <g class="main-lace-border border-${position}">
                    <path d="M ${x} ${topY} 
                             ${leftScallop}
                             L ${x + laceWidth} ${bottomY}
                             ${rightScallop}
                             L ${x} ${topY} Z" 
                          fill="${this.colors.pinkLace}" opacity="0.4"/>
                    
                    <rect x="${x + 8}" y="${topY}" width="${laceWidth - 16}" height="${sideHeight}" 
                          fill="url(#pinkLacePattern)"/>
                    
                    <path d="${leftScallop}" 
                          fill="none" stroke="${this.colors.pinkLaceDark}" stroke-width="1" opacity="0.5"/>
                    <path d="${rightScallop}" 
                          fill="none" stroke="${this.colors.pinkLaceDark}" stroke-width="1" opacity="0.5"/>
                    
                    ${this.renderVerticalLaceEyesRow(sideHeight, x + laceWidth / 2, topY, laceWidth * 0.35)}
                    
                    ${this.renderVerticalDotRow(sideHeight, x + 12, topY, 30)}
                    ${this.renderVerticalDotRow(sideHeight, x + laceWidth - 12, topY, 30)}
                </g>
            `;
        }
    }

    generateVerticalScallops(totalHeight, baseX, size, isLeft) {
        const count = Math.ceil(totalHeight / (size * 2));
        const actualSize = totalHeight / count / 2;
        let path = '';
        
        for (let i = 0; i < count; i++) {
            const y = i * actualSize * 2;
            const midY = y + actualSize;
            const endY = y + actualSize * 2;
            const curveX = isLeft ? baseX - size * 0.4 : baseX + size * 0.4;
            
            if (i === 0) {
                path += `M ${baseX} ${y}`;
            }
            path += ` Q ${curveX} ${midY}, ${baseX} ${endY}`;
        }
        
        return path;
    }

    renderLaceEyesRow(totalWidth, centerY, size) {
        const count = Math.floor(totalWidth / (size * 1.8));
        const spacing = totalWidth / count;
        let elements = '';
        
        for (let i = 0; i < count; i++) {
            const x = i * spacing + spacing / 2;
            elements += `
                <ellipse cx="${x}" cy="${centerY}" rx="${size * 0.5}" ry="${size * 0.8}" 
                         fill="${this.colors.pinkLace}" opacity="0.25"/>
                <ellipse cx="${x}" cy="${centerY}" rx="${size * 0.25}" ry="${size * 0.5}" 
                         fill="${this.colors.pinkDot}" opacity="0.4"/>
            `;
        }
        
        return elements;
    }

    renderVerticalLaceEyesRow(totalHeight, centerX, startY, size) {
        const count = Math.floor(totalHeight / (size * 1.8));
        const spacing = totalHeight / count;
        let elements = '';
        
        for (let i = 0; i < count; i++) {
            const y = startY + i * spacing + spacing / 2;
            elements += `
                <ellipse cx="${centerX}" cy="${y}" rx="${size * 0.8}" ry="${size * 0.5}" 
                         fill="${this.colors.pinkLace}" opacity="0.25"/>
                <ellipse cx="${centerX}" cy="${y}" rx="${size * 0.5}" ry="${size * 0.25}" 
                         fill="${this.colors.pinkDot}" opacity="0.4"/>
            `;
        }
        
        return elements;
    }

    renderDotRow(totalWidth, y, spacing) {
        const count = Math.floor(totalWidth / spacing);
        const actualSpacing = totalWidth / count;
        let dots = '';
        
        for (let i = 0; i < count; i++) {
            const x = i * actualSpacing + actualSpacing / 2;
            const isYellow = i % 3 === 1;
            const color = isYellow ? this.colors.yellowDot : this.colors.pinkDot;
            const size = isYellow ? 2.5 : 2;
            dots += `<circle cx="${x}" cy="${y}" r="${size}" fill="${color}" opacity="0.6"/>`;
        }
        
        return dots;
    }

    renderVerticalDotRow(totalHeight, x, startY, spacing) {
        const count = Math.floor(totalHeight / spacing);
        const actualSpacing = totalHeight / count;
        let dots = '';
        
        for (let i = 0; i < count; i++) {
            const y = startY + i * actualSpacing + actualSpacing / 2;
            const isYellow = i % 3 === 1;
            const color = isYellow ? this.colors.yellowDot : this.colors.pinkDot;
            const size = isYellow ? 2.5 : 2;
            dots += `<circle cx="${x}" cy="${y}" r="${size}" fill="${color}" opacity="0.6"/>`;
        }
        
        return dots;
    }

    renderCornerDecorations() {
        const { width, height, laceWidth, outerBandHeight } = this;
        const corners = [
            { x: laceWidth, y: outerBandHeight + laceWidth, flipX: 1, flipY: 1 },
            { x: width - laceWidth, y: outerBandHeight + laceWidth, flipX: -1, flipY: 1 },
            { x: laceWidth, y: height - outerBandHeight - laceWidth, flipX: 1, flipY: -1 },
            { x: width - laceWidth, y: height - outerBandHeight - laceWidth, flipX: -1, flipY: -1 }
        ];

        return `
            <g class="corner-decorations">
                ${corners.map((c, i) => `
                    <g transform="translate(${c.x}, ${c.y}) scale(${c.flipX}, ${c.flipY})">
                        ${this.renderCornerFlower()}
                    </g>
                `).join('')}
            </g>
        `;
    }

    renderCornerFlower() {
        return `
            <g opacity="0.5">
                <circle cx="0" cy="0" r="6" fill="${this.colors.pinkLace}" opacity="0.4"/>
                <circle cx="0" cy="0" r="3" fill="${this.colors.pinkDot}" opacity="0.6"/>
                <ellipse cx="0" cy="-8" rx="2" ry="4" fill="${this.colors.pinkLace}" opacity="0.5"/>
                <ellipse cx="8" cy="0" rx="4" ry="2" fill="${this.colors.pinkLace}" opacity="0.5"/>
            </g>
        `;
    }

    renderButterflies() {
        const { width, height, laceWidth, outerBandHeight } = this;
        const leftX = laceWidth / 2;
        const rightX = width - laceWidth / 2;
        const midY = height / 2;

        return `
            <g class="butterfly-decorations">
                <g transform="translate(${leftX}, ${midY})">
                    ${this.renderButterfly('left')}
                </g>
                <g transform="translate(${rightX}, ${midY}) scale(-1, 1)">
                    ${this.renderButterfly('left')}
                </g>
            </g>
        `;
    }

    renderButterfly() {
        return `
            <g opacity="0.7">
                <ellipse cx="-8" cy="-10" rx="10" ry="12" 
                         fill="${this.colors.butterfly}" opacity="0.5"
                         transform="rotate(-20, -8, -10)"/>
                <ellipse cx="-8" cy="-10" rx="5" ry="7" 
                         fill="${this.colors.butterflyDark}" opacity="0.3"
                         transform="rotate(-20, -8, -10)"/>
                
                <ellipse cx="-8" cy="10" rx="8" ry="10" 
                         fill="${this.colors.butterfly}" opacity="0.5"
                         transform="rotate(20, -8, 10)"/>
                <ellipse cx="-8" cy="10" rx="4" ry="6" 
                         fill="${this.colors.butterflyDark}" opacity="0.3"
                         transform="rotate(20, -8, 10)"/>
                
                <ellipse cx="0" cy="0" rx="2" ry="12" fill="${this.colors.butterflyDark}" opacity="0.6"/>
                
                <circle cx="-2" cy="-14" r="1.5" fill="${this.colors.yellowDot}" opacity="0.7"/>
                <path d="M 0 -12 Q -3 -18, -5 -20" stroke="${this.colors.butterflyDark}" stroke-width="0.8" fill="none"/>
                <path d="M 2 -12 Q 5 -18, 7 -20" stroke="${this.colors.butterflyDark}" stroke-width="0.8" fill="none"/>
            </g>
        `;
    }

    renderInnerLace(position) {
        const { width, height, laceWidth, outerBandHeight, innerLaceWidth } = this;
        const innerX = laceWidth + innerLaceWidth;
        const innerY = outerBandHeight + laceWidth + innerLaceWidth;
        const innerWidth = width - (laceWidth + innerLaceWidth) * 2;
        const innerHeight = height - (outerBandHeight + laceWidth + innerLaceWidth) * 2;

        const isTop = position === 'top';
        const isBottom = position === 'bottom';
        const isLeft = position === 'left';
        const isRight = position === 'right';

        if (isTop || isBottom) {
            const y = isTop ? outerBandHeight + laceWidth : height - outerBandHeight - laceWidth - innerLaceWidth;
            const scallopSize = 6;
            const topScallop = this.generateScallops(width, y, scallopSize, true);
            const bottomScallop = this.generateScallops(width, y + innerLaceWidth, scallopSize, false);

            return `
                <g class="inner-lace lace-${position}">
                    <path d="M 0 ${y} ${topScallop} L ${width} ${y + innerLaceWidth} 
                             ${bottomScallop} L 0 ${y} Z" 
                          fill="${this.colors.pinkLace}" opacity="0.3"/>
                    
                    <path d="${topScallop}" 
                          fill="none" stroke="${this.colors.pinkLaceDark}" stroke-width="0.8" opacity="0.4"/>
                    <path d="${bottomScallop}" 
                          fill="none" stroke="${this.colors.pinkLaceDark}" stroke-width="0.8" opacity="0.4"/>
                    
                    ${this.renderDotRow(width, y + innerLaceWidth / 2, 15)}
                </g>
            `;
        } else {
            const x = isLeft ? laceWidth : width - laceWidth - innerLaceWidth;
            const topY = outerBandHeight + laceWidth + innerLaceWidth;
            const bottomY = height - outerBandHeight - laceWidth - innerLaceWidth;
            const sideHeight = bottomY - topY;
            const scallopSize = 6;
            
            const leftScallop = this.generateVerticalScallops(sideHeight, x, scallopSize, true);
            const rightScallop = this.generateVerticalScallops(sideHeight, x + innerLaceWidth, scallopSize, false);

            return `
                <g class="inner-lace lace-${position}">
                    <path d="M ${x} ${topY} 
                             ${leftScallop}
                             L ${x + innerLaceWidth} ${bottomY}
                             ${rightScallop}
                             L ${x} ${topY} Z" 
                          fill="${this.colors.pinkLace}" opacity="0.3"/>
                    
                    <path d="${leftScallop}" 
                          fill="none" stroke="${this.colors.pinkLaceDark}" stroke-width="0.8" opacity="0.4"/>
                    <path d="${rightScallop}" 
                          fill="none" stroke="${this.colors.pinkLaceDark}" stroke-width="0.8" opacity="0.4"/>
                    
                    ${this.renderVerticalDotRow(sideHeight, x + innerLaceWidth / 2, topY, 15)}
                </g>
            `;
        }
    }
}
