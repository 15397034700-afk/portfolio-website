export class ProjectFrame {
    constructor({
        image = '',
        video = '',
        alt = '',
        className = '',
        width = 700,
        height = 524,
        imagePadX = 29,
        imagePadY = 12,
        colors = {
            creamPink: '#FFF5F7',
            creamWhite: '#FFFBF8',
            sakuraPink: '#F5D5DC',
            sakuraPinkDark: '#E8C5CE',
            sakuraPinkLight: '#FAE8ED',
            sakuraPinkSoft: '#F9E6EA',
            sageGreen: '#C5D0B8',
            sageGreenLight: '#DCE4D0',
            sageGreenDark: '#B0C4A0',
            butterYellow: '#F5EBC8',
            warmBeige: '#F5EEE6',
            softGray: '#E8E4DE',
            threadPink: '#E8C5CE'
        }
    } = {}) {
        this.image = image;
        this.video = video;
        this.alt = alt;
        this.className = className;
        this.width = width;
        this.height = height;
        this.imagePadX = imagePadX;
        this.imagePadY = imagePadY;
        this.colors = colors;

        this.greenBandHeight = 16;
        this.laceWidthTopBottom = 18;
        this.laceWidthLeftRight = 36;
        this.innerLaceWidth = 9;
    }

    get imageArea() {
        const leftPad = this.laceWidthLeftRight + this.innerLaceWidth + this.imagePadX;
        const topPad = this.greenBandHeight + this.laceWidthTopBottom + this.innerLaceWidth + this.imagePadY;
        return {
            x: leftPad,
            y: topPad,
            width: this.width - leftPad * 2,
            height: this.height - topPad * 2,
            leftPercent: (leftPad / this.width) * 100,
            topPercent: (topPad / this.height) * 100
        };
    }

    render() {
        const area = this.imageArea;
        const leftPct = area.leftPercent.toFixed(3);
        const topPct = area.topPercent.toFixed(3);

        return `
            <div class="project-frame ${this.className}" data-project-frame>
                <div class="project-frame-image-layer">
                    ${this.video ? this.renderVideo() : ''}
                    ${this.image && !this.video ? `<img src="${this.image}" alt="${this.alt}" class="project-frame-image" />` : ''}
                </div>
                <div class="project-frame-border-layer">
                    ${this.renderSVG()}
                </div>
            </div>
        `;
    }

    renderVideo() {
        return `
            <div class="project-video-container">
                <video class="project-frame-video" autoplay loop muted playsinline>
                    <source src="${this.video}" type="video/mp4">
                </video>
                <div class="project-video-overlay">
                    <div class="video-play-icon">▶</div>
                </div>
            </div>
        `;
    }

    renderSVG() {
        return `
            <svg class="project-frame-svg"
                 viewBox="0 0 ${this.width} ${this.height}"
                 xmlns="http://www.w3.org/2000/svg"
                 preserveAspectRatio="none">
                <defs>
                    ${this.renderDefs()}
                </defs>

                <g id="Background">
                    <rect x="0" y="0" width="${this.width}" height="${this.height}" fill="none"/>
                </g>

                <g id="Top-Cloth">
                    ${this.renderTopCloth()}
                </g>

                <g id="Bottom-Cloth">
                    ${this.renderBottomCloth()}
                </g>

                <g id="Pink-Lace-Top">
                    ${this.renderPinkLace('top')}
                </g>

                <g id="Pink-Lace-Bottom">
                    ${this.renderPinkLace('bottom')}
                </g>

                <g id="Pink-Lace-Left">
                    ${this.renderPinkLace('left')}
                </g>

                <g id="Pink-Lace-Right">
                    ${this.renderPinkLace('right')}
                </g>

                <g id="Corner-TL">
                    ${this.renderCorner('tl')}
                </g>

                <g id="Corner-TR">
                    ${this.renderCorner('tr')}
                </g>

                <g id="Corner-BL">
                    ${this.renderCorner('bl')}
                </g>

                <g id="Corner-BR">
                    ${this.renderCorner('br')}
                </g>

                <g id="Ribbon-Left">
                    ${this.renderRibbon('left')}
                </g>

                <g id="Ribbon-Right">
                    ${this.renderRibbon('right')}
                </g>

                <g id="Needle-Stitch">
                    ${this.renderNeedleStitch()}
                </g>

                <g id="Inner-Frame">
                    ${this.renderInnerFrame()}
                </g>

                <g id="Fabric-Shadow">
                    ${this.renderFabricShadow()}
                </g>

                <g id="Fabric-Fold">
                    ${this.renderFabricFold()}
                </g>

                <g id="Paper-Texture">
                    ${this.renderPaperTexture()}
                </g>
            </svg>
        `;
    }

    renderDefs() {
        const c = this.colors;
        return `
            <pattern id="diamondPatternDense" x="0" y="0" width="20" height="14" patternUnits="userSpaceOnUse">
                <g opacity="0.25">
                    <path d="M 10 0 L 20 7 L 10 14 L 0 7 Z"
                          fill="none" stroke="${c.sageGreen}" stroke-width="0.6"/>
                    <path d="M 10 2 L 17 7 L 10 12 L 3 7 Z"
                          fill="none" stroke="${c.sageGreenLight}" stroke-width="0.4" opacity="0.5"/>
                    <circle cx="10" cy="7" r="0.8" fill="${c.sageGreenDark}" opacity="0.35"/>
                    <path d="M 10 5 L 10 9 M 8 7 L 12 7"
                          stroke="${c.sageGreen}" stroke-width="0.5" opacity="0.3"/>
                    <path d="M 6 3 Q 10 2, 14 3" stroke="${c.sageGreen}" stroke-width="0.4" opacity="0.25"/>
                    <path d="M 6 11 Q 10 12, 14 11" stroke="${c.sageGreen}" stroke-width="0.4" opacity="0.25"/>
                </g>
            </pattern>

            <pattern id="eyeletPatternDense" x="0" y="0" width="18" height="20" patternUnits="userSpaceOnUse">
                <g opacity="0.4">
                    <ellipse cx="9" cy="10" rx="4" ry="7" fill="${c.sakuraPinkLight}" opacity="0.5"/>
                    <ellipse cx="9" cy="10" rx="2" ry="4" fill="${c.creamWhite}" opacity="0.4"/>
                    <circle cx="9" cy="5" r="0.8" fill="${c.butterYellow}" opacity="0.5"/>
                    <circle cx="9" cy="15" r="0.8" fill="${c.butterYellow}" opacity="0.5"/>
                    <circle cx="4" cy="10" r="0.6" fill="${c.sakuraPink}" opacity="0.3"/>
                    <circle cx="14" cy="10" r="0.6" fill="${c.sakuraPink}" opacity="0.3"/>
                </g>
            </pattern>

            <pattern id="dotPatternHDense" x="0" y="0" width="12" height="8" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="4" r="0.8" fill="${c.sakuraPink}" opacity="0.5"/>
                <circle cx="7" cy="4" r="0.6" fill="${c.butterYellow}" opacity="0.45"/>
                <circle cx="10" cy="4" r="0.7" fill="${c.sakuraPinkLight}" opacity="0.4"/>
            </pattern>

            <pattern id="dotPatternVDense" x="0" y="0" width="8" height="12" patternUnits="userSpaceOnUse">
                <circle cx="4" cy="3" r="0.8" fill="${c.sakuraPink}" opacity="0.5"/>
                <circle cx="4" cy="7" r="0.6" fill="${c.butterYellow}" opacity="0.45"/>
                <circle cx="4" cy="10" r="0.7" fill="${c.sakuraPinkLight}" opacity="0.4"/>
            </pattern>

            <pattern id="fabricTexture" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <g opacity="0.04">
                    <path d="M 0 0 Q 20 5, 40 0" stroke="${c.sakuraPink}" stroke-width="0.3" fill="none"/>
                    <path d="M 0 10 Q 20 15, 40 10" stroke="${c.sakuraPink}" stroke-width="0.2" fill="none"/>
                    <path d="M 0 20 Q 20 25, 40 20" stroke="${c.sakuraPink}" stroke-width="0.3" fill="none"/>
                    <path d="M 0 30 Q 20 35, 40 30" stroke="${c.sakuraPink}" stroke-width="0.2" fill="none"/>
                    <circle cx="10" cy="15" r="0.5" fill="${c.sakuraPinkDark}"/>
                    <circle cx="30" cy="25" r="0.4" fill="${c.sakuraPinkDark}"/>
                    <circle cx="20" cy="5" r="0.3" fill="${c.sakuraPinkDark}"/>
                    <circle cx="5" cy="32" r="0.4" fill="${c.sakuraPinkDark}"/>
                </g>
            </pattern>

            <pattern id="stitchPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="4" cy="4" r="0.6" fill="${c.threadPink}" opacity="0.3"/>
            </pattern>

            <pattern id="faintStripes" x="0" y="0" width="100" height="4" patternUnits="userSpaceOnUse">
                <line x1="0" y1="2" x2="100" y2="2" stroke="${c.sakuraPink}" stroke-width="0.3" opacity="0.1"/>
            </pattern>

            <pattern id="pinkLaceSmallPattern" x="0" y="0" width="10" height="12" patternUnits="userSpaceOnUse">
                <g opacity="0.35">
                    <ellipse cx="5" cy="6" rx="2.5" ry="3.8" fill="${c.sakuraPinkSoft}" opacity="0.3"/>
                </g>
                <g opacity="0.45">
                    <ellipse cx="5" cy="6" rx="1.8" ry="2.8" fill="none" stroke="${c.sakuraPinkDark}" stroke-width="0.35"/>
                    <ellipse cx="5" cy="6" rx="1" ry="1.8" fill="none" stroke="${c.sakuraPink}" stroke-width="0.25"/>
                    <circle cx="5" cy="6" r="0.4" fill="${c.sakuraPinkDark}" opacity="0.25"/>
                </g>
                <g opacity="0.3">
                    <circle cx="5" cy="2.2" r="0.6" fill="${c.butterYellow}"/>
                    <circle cx="5" cy="9.8" r="0.6" fill="${c.butterYellow}"/>
                    <circle cx="1.2" cy="6" r="0.4" fill="${c.sakuraPink}"/>
                    <circle cx="8.8" cy="6" r="0.4" fill="${c.sakuraPink}"/>
                </g>
                <g opacity="0.18">
                    <path d="M 5 2.2 L 5 3.8" stroke="${c.sakuraPinkDark}" stroke-width="0.2"/>
                    <path d="M 5 8.2 L 5 9.8" stroke="${c.sakuraPinkDark}" stroke-width="0.2"/>
                    <path d="M 1.2 6 L 2.8 6" stroke="${c.sakuraPinkDark}" stroke-width="0.2"/>
                    <path d="M 7.2 6 L 8.8 6" stroke="${c.sakuraPinkDark}" stroke-width="0.2"/>
                </g>
                <g opacity="0.12">
                    <circle cx="2.8" cy="3" r="0.25" fill="${c.sakuraPink}"/>
                    <circle cx="7.2" cy="3" r="0.25" fill="${c.sakuraPink}"/>
                    <circle cx="2.8" cy="9" r="0.25" fill="${c.sakuraPink}"/>
                    <circle cx="7.2" cy="9" r="0.25" fill="${c.sakuraPink}"/>
                </g>
            </pattern>

            <pattern id="pinkLaceSmallPatternV" x="0" y="0" width="12" height="10" patternUnits="userSpaceOnUse">
                <g opacity="0.35">
                    <ellipse cx="6" cy="5" rx="3.8" ry="2.5" fill="${c.sakuraPinkSoft}" opacity="0.3"/>
                </g>
                <g opacity="0.45">
                    <ellipse cx="6" cy="5" rx="2.8" ry="1.8" fill="none" stroke="${c.sakuraPinkDark}" stroke-width="0.35"/>
                    <ellipse cx="6" cy="5" rx="1.8" ry="1" fill="none" stroke="${c.sakuraPink}" stroke-width="0.25"/>
                    <circle cx="6" cy="5" r="0.4" fill="${c.sakuraPinkDark}" opacity="0.25"/>
                </g>
                <g opacity="0.3">
                    <circle cx="2.2" cy="5" r="0.6" fill="${c.butterYellow}"/>
                    <circle cx="9.8" cy="5" r="0.6" fill="${c.butterYellow}"/>
                    <circle cx="6" cy="1.2" r="0.4" fill="${c.sakuraPink}"/>
                    <circle cx="6" cy="8.8" r="0.4" fill="${c.sakuraPink}"/>
                </g>
                <g opacity="0.18">
                    <path d="M 2.2 5 L 3.8 5" stroke="${c.sakuraPinkDark}" stroke-width="0.2"/>
                    <path d="M 8.2 5 L 9.8 5" stroke="${c.sakuraPinkDark}" stroke-width="0.2"/>
                    <path d="M 6 1.2 L 6 2.8" stroke="${c.sakuraPinkDark}" stroke-width="0.2"/>
                    <path d="M 6 7.2 L 6 8.8" stroke="${c.sakuraPinkDark}" stroke-width="0.2"/>
                </g>
                <g opacity="0.12">
                    <circle cx="3" cy="2.8" r="0.25" fill="${c.sakuraPink}"/>
                    <circle cx="9" cy="2.8" r="0.25" fill="${c.sakuraPink}"/>
                    <circle cx="3" cy="7.2" r="0.25" fill="${c.sakuraPink}"/>
                    <circle cx="9" cy="7.2" r="0.25" fill="${c.sakuraPink}"/>
                </g>
            </pattern>

            <pattern id="scallopDotRowH" x="0" y="0" width="8" height="5" patternUnits="userSpaceOnUse">
                <circle cx="4" cy="2.5" r="0.6" fill="${c.sakuraPink}" opacity="0.3"/>
                <circle cx="1.5" cy="2.5" r="0.4" fill="${c.butterYellow}" opacity="0.25"/>
                <circle cx="6.5" cy="2.5" r="0.4" fill="${c.sakuraPinkLight}" opacity="0.25"/>
            </pattern>

            <pattern id="scallopDotRowV" x="0" y="0" width="5" height="8" patternUnits="userSpaceOnUse">
                <circle cx="2.5" cy="4" r="0.6" fill="${c.sakuraPink}" opacity="0.3"/>
                <circle cx="2.5" cy="1.5" r="0.4" fill="${c.butterYellow}" opacity="0.25"/>
                <circle cx="2.5" cy="6.5" r="0.4" fill="${c.sakuraPinkLight}" opacity="0.25"/>
            </pattern>

            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
            </filter>

            <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feComponentTransfer>
                    <feFuncA type="table" tableValues="0.5 0"/>
                </feComponentTransfer>
                <feGaussianBlur stdDeviation="1.5"/>
                <feOffset dx="0" dy="1"/>
                <feComposite in2="SourceGraphic" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        `;
    }

    renderTopCloth() {
        const { width, greenBandHeight, colors: c } = this;
        const y = 0;

        return `
            <g id="Top-Cloth-Main">
                <path d="${this.generateScallopPath(width, greenBandHeight, 16, 'up').path}
                         L ${width} 0 L 0 0 Z"
                      fill="${c.sageGreenLight}" opacity="0.35"/>

                <rect x="0" y="4" width="${width}" height="${greenBandHeight - 8}"
                      fill="url(#diamondPatternDense)"/>

                <path d="${this.generateScallopPath(width, greenBandHeight - 3, 12, 'down').outline}"
                      fill="none" stroke="${c.sageGreen}" stroke-width="0.6" opacity="0.25"
                      stroke-dasharray="2 2"/>

                <path d="${this.generateScallopPath(width, greenBandHeight - 5, 10, 'down').outline}"
                      fill="none" stroke="${c.sageGreenDark}" stroke-width="0.5" opacity="0.2"/>

                <rect x="2" y="8" width="${width - 4}" height="${greenBandHeight - 20}"
                      fill="url(#faintStripes)" opacity="0.5"/>

                ${this.renderScatteredDots(width, y + greenBandHeight / 2, 8, 6)}
            </g>
        `;
    }

    renderBottomCloth() {
        const { width, greenBandHeight, colors: c } = this;
        const y = this.height - greenBandHeight;
        const scallop = this.generateScallopPath(width, y + greenBandHeight, 16, 'down');

        return `
            <g id="Bottom-Cloth-Main">
                <path d="M 0 ${y}
                         L 0 ${y + greenBandHeight}
                         ${scallop.path.replace(/^M\s+\S+\s+\S+/, '')}
                         L ${width} ${y} Z"
                      fill="${c.sageGreenLight}" opacity="0.35"/>

                <rect x="0" y="${y + 4}" width="${width}" height="${greenBandHeight - 8}"
                      fill="url(#diamondPatternDense)"/>

                <path d="${this.generateScallopPath(width, y + 3, 12, 'up').outline}"
                      fill="none" stroke="${c.sageGreen}" stroke-width="0.6" opacity="0.25"
                      stroke-dasharray="2 2"/>

                <path d="${this.generateScallopPath(width, y + 5, 10, 'up').outline}"
                      fill="none" stroke="${c.sageGreenDark}" stroke-width="0.5" opacity="0.2"/>

                <rect x="2" y="${y + 8}" width="${width - 4}" height="${greenBandHeight - 20}"
                      fill="url(#faintStripes)" opacity="0.5"/>

                ${this.renderScatteredDots(width, y + greenBandHeight / 2, 8, 6)}
            </g>
        `;
    }

    renderLeftCloth() {
        const { height, greenBandHeight, colors: c } = this;
        const x = 0;
        const topY = greenBandHeight;
        const bottomY = height - greenBandHeight;
        const sideHeight = bottomY - topY;

        const innerScallop = this.generateVerticalScallopPath(sideHeight, x + greenBandHeight, topY, 16, 'right');

        return `
            <g id="Left-Cloth-Main">
                <path d="M ${x} ${topY}
                         L ${x + greenBandHeight} ${topY}
                         ${innerScallop.path.replace(/^M\s+\S+\s+\S+/, '')}
                         L ${x} ${bottomY} Z"
                      fill="${c.sageGreenLight}" opacity="0.35"/>

                <rect x="${x}" y="${topY + 4}" width="${greenBandHeight - 8}" height="${sideHeight - 8}"
                      fill="url(#diamondPatternDense)"/>

                <path d="${innerScallop.outline}"
                      fill="none" stroke="${c.sageGreen}" stroke-width="0.6" opacity="0.25"
                      stroke-dasharray="2 2"/>

                <path d="${this.generateVerticalScallopPath(sideHeight, x + greenBandHeight - 5, topY, 10, 'right').outline}"
                      fill="none" stroke="${c.sageGreenDark}" stroke-width="0.5" opacity="0.2"/>

                <rect x="${x + 2}" y="${topY + 8}" width="${greenBandHeight - 20}" height="${sideHeight - 16}"
                      fill="url(#faintStripes)" opacity="0.5"
                      transform="rotate(90 ${x + greenBandHeight / 2} ${topY + sideHeight / 2})"/>

                ${this.renderScatteredDots(sideHeight, topY + sideHeight / 2, 8, 6, x + greenBandHeight / 2)}
            </g>
        `;
    }

    renderRightCloth() {
        const { height, greenBandHeight, colors: c } = this;
        const x = this.width - greenBandHeight;
        const topY = greenBandHeight;
        const bottomY = height - greenBandHeight;
        const sideHeight = bottomY - topY;

        const innerScallop = this.generateVerticalScallopPath(sideHeight, x, topY, 16, 'left');

        return `
            <g id="Right-Cloth-Main">
                <path d="M ${x + greenBandHeight} ${topY}
                         L ${x} ${topY}
                         ${innerScallop.path.replace(/^M\s+\S+\s+\S+/, '')}
                         L ${x + greenBandHeight} ${bottomY} Z"
                      fill="${c.sageGreenLight}" opacity="0.35"/>

                <rect x="${x + 8}" y="${topY + 4}" width="${greenBandHeight - 8}" height="${sideHeight - 8}"
                      fill="url(#diamondPatternDense)"/>

                <path d="${innerScallop.outline}"
                      fill="none" stroke="${c.sageGreen}" stroke-width="0.6" opacity="0.25"
                      stroke-dasharray="2 2"/>

                <path d="${this.generateVerticalScallopPath(sideHeight, x + 5, topY, 10, 'left').outline}"
                      fill="none" stroke="${c.sageGreenDark}" stroke-width="0.5" opacity="0.2"/>

                <rect x="${x + 20 - 2}" y="${topY + 8}" width="${greenBandHeight - 20}" height="${sideHeight - 16}"
                      fill="url(#faintStripes)" opacity="0.5"
                      transform="rotate(90 ${x + greenBandHeight / 2} ${topY + sideHeight / 2})"/>

                ${this.renderScatteredDots(sideHeight, topY + sideHeight / 2, 8, 6, x + greenBandHeight / 2)}
            </g>
        `;
    }

    renderPinkLace(position) {
        const { width, height, greenBandHeight, laceWidthTopBottom, laceWidthLeftRight, colors: c } = this;
        const isTop = position === 'top';
        const isBottom = position === 'bottom';
        const isLeft = position === 'left';
        const isRight = position === 'right';

        const laceTopY = greenBandHeight;
        const laceBottomY = height - greenBandHeight - laceWidthTopBottom;

        if (isTop || isBottom) {
            const y = isTop ? laceTopY : laceBottomY;
            const laceX = 0;
            const laceRightX = width;
            const laceW = width;
            const outerScallopSize = 10;
            const innerScallopSize = 7;
            const midScallopSize = 8;

            const outerScallop = this.generateScallopPath(laceW, y, outerScallopSize, isTop ? 'up' : 'down', laceX);
            const innerScallop = this.generateScallopPath(laceW, y + laceWidthTopBottom, innerScallopSize, isTop ? 'down' : 'up', laceX);
            const midOuterScallop = this.generateScallopPath(laceW, y + laceWidthTopBottom * 0.25, midScallopSize, isTop ? 'down' : 'up', laceX);
            const midInnerScallop = this.generateScallopPath(laceW, y + laceWidthTopBottom * 0.75, midScallopSize, isTop ? 'up' : 'down', laceX);

            return `
                <g id="Pink-Lace-${position.toUpperCase()}-Main">
                    <g id="Pink-Lace-${position.toUpperCase()}-Fill">
                        <rect x="${laceX}" y="${y}" width="${laceW}" height="${laceWidthTopBottom}"
                              fill="${c.sakuraPinkSoft}" opacity="0.45"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Outer-Scallop">
                        <path d="${outerScallop.outline}"
                              fill="none" stroke="${c.sakuraPinkDark}" stroke-width="0.6" opacity="0.35"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Inner-Scallop">
                        <path d="${innerScallop.outline}"
                              fill="none" stroke="${c.sakuraPinkDark}" stroke-width="0.5" opacity="0.3"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Mid-Scallop-1">
                        <path d="${midOuterScallop.outline}"
                              fill="none" stroke="${c.sakuraPink}" stroke-width="0.4" opacity="0.25"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Mid-Scallop-2">
                        <path d="${midInnerScallop.outline}"
                              fill="none" stroke="${c.sakuraPink}" stroke-width="0.4" opacity="0.25"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Eyelet-Pattern">
                        <rect x="${laceX + 3}" y="${y + laceWidthTopBottom * 0.2}" width="${laceW - 6}" height="${laceWidthTopBottom * 0.6}"
                              fill="url(#pinkLaceSmallPattern)"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Outer-Dot-Row">
                        <rect x="${laceX + 2}" y="${y + 3}" width="${laceW - 4}" height="6"
                              fill="url(#scallopDotRowH)"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Inner-Dot-Row">
                        <rect x="${laceX + 2}" y="${y + laceWidthTopBottom - 9}" width="${laceW - 4}" height="6"
                              fill="url(#scallopDotRowH)"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Fine-Stitch-Outer">
                        <path d="${this.generateScallopPath(laceW, y + 6, 4, isTop ? 'down' : 'up', laceX).outline}"
                              fill="none" stroke="${c.sakuraPinkDark}" stroke-width="0.3" opacity="0.2"
                              stroke-dasharray="1.5 1.5"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Fine-Stitch-Inner">
                        <path d="${this.generateScallopPath(laceW, y + laceWidthTopBottom - 6, 4, isTop ? 'up' : 'down', laceX).outline}"
                              fill="none" stroke="${c.sakuraPinkDark}" stroke-width="0.3" opacity="0.2"
                              stroke-dasharray="1.5 1.5"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Fine-Scallops-1">
                        <path d="${this.generateScallopPath(laceW, y + laceWidthTopBottom * 0.12, 5, isTop ? 'down' : 'up', laceX).outline}"
                              fill="none" stroke="${c.sakuraPink}" stroke-width="0.3" opacity="0.2"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Fine-Scallops-2">
                        <path d="${this.generateScallopPath(laceW, y + laceWidthTopBottom * 0.88, 5, isTop ? 'up' : 'down', laceX).outline}"
                              fill="none" stroke="${c.sakuraPink}" stroke-width="0.3" opacity="0.2"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Fabric-Texture">
                        <rect x="${laceX + 2}" y="${y + 2}" width="${laceW - 4}" height="${laceWidthTopBottom - 4}"
                              fill="url(#fabricTexture)" opacity="0.4"/>
                    </g>
                </g>
            `;
        }

        if (isLeft || isRight) {
            const x = isLeft ? 0 : width - laceWidthLeftRight;
            const sideLaceTopY = greenBandHeight + laceWidthTopBottom;
            const sideLaceBottomY = height - greenBandHeight - laceWidthTopBottom;
            const sideLaceH = sideLaceBottomY - sideLaceTopY;
            const outerScallopSize = 8;
            const innerScallopSize = 6;
            const midScallopSize = 7;

            const outerScallop = this.generateVerticalScallopPath(sideLaceH, x, sideLaceTopY, outerScallopSize, isLeft ? 'left' : 'right');
            const innerScallop = this.generateVerticalScallopPath(sideLaceH, x + laceWidthLeftRight, sideLaceTopY, innerScallopSize, isLeft ? 'right' : 'left');
            const midOuterScallop = this.generateVerticalScallopPath(sideLaceH, x + laceWidthLeftRight * 0.25, sideLaceTopY, midScallopSize, isLeft ? 'right' : 'left');
            const midInnerScallop = this.generateVerticalScallopPath(sideLaceH, x + laceWidthLeftRight * 0.75, sideLaceTopY, midScallopSize, isLeft ? 'left' : 'right');

            return `
                <g id="Pink-Lace-${position.toUpperCase()}-Main">
                    <g id="Pink-Lace-${position.toUpperCase()}-Fill">
                        <rect x="${x}" y="${sideLaceTopY}" width="${laceWidthLeftRight}" height="${sideLaceH}"
                              fill="${c.sakuraPinkSoft}" opacity="0.45"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Outer-Scallop">
                        <path d="${outerScallop.outline}"
                              fill="none" stroke="${c.sakuraPinkDark}" stroke-width="0.6" opacity="0.35"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Inner-Scallop">
                        <path d="${innerScallop.outline}"
                              fill="none" stroke="${c.sakuraPinkDark}" stroke-width="0.5" opacity="0.3"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Mid-Scallop-1">
                        <path d="${midOuterScallop.outline}"
                              fill="none" stroke="${c.sakuraPink}" stroke-width="0.4" opacity="0.25"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Mid-Scallop-2">
                        <path d="${midInnerScallop.outline}"
                              fill="none" stroke="${c.sakuraPink}" stroke-width="0.4" opacity="0.25"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Eyelet-Pattern">
                        <rect x="${x + laceWidthLeftRight * 0.15}" y="${sideLaceTopY + 3}" width="${laceWidthLeftRight * 0.7}" height="${sideLaceH - 6}"
                              fill="url(#pinkLaceSmallPatternV)"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Outer-Dot-Row">
                        <rect x="${x + 3}" y="${sideLaceTopY + 2}" width="5" height="${sideLaceH - 4}"
                              fill="url(#scallopDotRowV)"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Inner-Dot-Row">
                        <rect x="${x + laceWidthLeftRight - 8}" y="${sideLaceTopY + 2}" width="5" height="${sideLaceH - 4}"
                              fill="url(#scallopDotRowV)"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Fine-Stitch-Outer">
                        <path d="${this.generateVerticalScallopPath(sideLaceH, x + 5, sideLaceTopY, 3, isLeft ? 'right' : 'left').outline}"
                              fill="none" stroke="${c.sakuraPinkDark}" stroke-width="0.3" opacity="0.2"
                              stroke-dasharray="1.5 1.5"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Fine-Stitch-Inner">
                        <path d="${this.generateVerticalScallopPath(sideLaceH, x + laceWidthLeftRight - 5, sideLaceTopY, 3, isLeft ? 'left' : 'right').outline}"
                              fill="none" stroke="${c.sakuraPinkDark}" stroke-width="0.3" opacity="0.2"
                              stroke-dasharray="1.5 1.5"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Fine-Scallops-1">
                        <path d="${this.generateVerticalScallopPath(sideLaceH, x + laceWidthLeftRight * 0.15, sideLaceTopY, 4, isLeft ? 'right' : 'left').outline}"
                              fill="none" stroke="${c.sakuraPink}" stroke-width="0.3" opacity="0.2"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Fine-Scallops-2">
                        <path d="${this.generateVerticalScallopPath(sideLaceH, x + laceWidthLeftRight * 0.85, sideLaceTopY, 4, isLeft ? 'left' : 'right').outline}"
                              fill="none" stroke="${c.sakuraPink}" stroke-width="0.3" opacity="0.2"/>
                    </g>

                    <g id="Pink-Lace-${position.toUpperCase()}-Fabric-Texture">
                        <rect x="${x + 2}" y="${sideLaceTopY + 2}" width="${laceWidthLeftRight - 4}" height="${sideLaceH - 4}"
                              fill="url(#fabricTexture)" opacity="0.4"/>
                    </g>
                </g>
            `;
        }
    }

    renderCorner(position) {
        const { laceWidthLeftRight, greenBandHeight, laceWidthTopBottom, colors: c } = this;
        const isTop = position.includes('t');
        const isLeft = position.includes('l');

        const cx = isLeft ? laceWidthLeftRight : this.width - laceWidthLeftRight;
        const cy = isTop ? greenBandHeight + laceWidthTopBottom : this.height - greenBandHeight - laceWidthTopBottom;

        const flipX = isLeft ? 1 : -1;
        const flipY = isTop ? 1 : -1;

        return `
            <g transform="translate(${cx}, ${cy}) scale(${flipX}, ${flipY})">
                <g id="Corner-${position.toUpperCase()}-Fold">
                    <path d="M -${laceWidthLeftRight} 0
                             Q -${laceWidthLeftRight * 0.8} -${laceWidthLeftRight * 0.6}, -${laceWidthLeftRight * 0.4} -${laceWidthLeftRight * 0.8}
                             Q -${laceWidthLeftRight * 0.2} -${laceWidthLeftRight * 0.9}, 0 -${laceWidthLeftRight}
                             L 0 -${laceWidthLeftRight - 5}
                             Q -${laceWidthLeftRight * 0.2} -${laceWidthLeftRight * 0.85}, -${laceWidthLeftRight * 0.5} -${laceWidthLeftRight * 0.65}
                             Q -${laceWidthLeftRight * 0.75} -${laceWidthLeftRight * 0.45}, -${laceWidthLeftRight - 5} 0
                             Z"
                          fill="${c.sakuraPinkSoft}" opacity="0.5"/>

                    <path d="M -${laceWidthLeftRight} 0
                             Q -${laceWidthLeftRight * 0.8} -${laceWidthLeftRight * 0.6}, -${laceWidthLeftRight * 0.4} -${laceWidthLeftRight * 0.8}
                             Q -${laceWidthLeftRight * 0.2} -${laceWidthLeftRight * 0.9}, 0 -${laceWidthLeftRight}"
                          fill="none" stroke="${c.sakuraPinkDark}" stroke-width="0.6" opacity="0.4"/>

                    <path d="M -${laceWidthLeftRight * 0.5} -${laceWidthLeftRight * 0.2}
                             L -${laceWidthLeftRight * 0.2} -${laceWidthLeftRight * 0.5}"
                          fill="none" stroke="${c.sakuraPink}" stroke-width="0.4" opacity="0.3"
                          stroke-dasharray="2 1.5"/>
                </g>

                <g id="Corner-${position.toUpperCase()}-Shadow">
                    <path d="M -${laceWidthLeftRight} 0
                             Q -${laceWidthLeftRight * 0.7} -${laceWidthLeftRight * 0.5}, -${laceWidthLeftRight * 0.3} -${laceWidthLeftRight * 0.7}
                             L -${laceWidthLeftRight * 0.3} -${laceWidthLeftRight * 0.6}
                             Q -${laceWidthLeftRight * 0.6} -${laceWidthLeftRight * 0.4}, -${laceWidthLeftRight} 0 Z"
                          fill="${c.sakuraPinkDark}" opacity="0.1"/>
                </g>

                <g id="Corner-${position.toUpperCase()}-Scallops">
                    <path d="M -${laceWidthLeftRight} 0
                             Q -${laceWidthLeftRight * 0.9} -${laceWidthLeftRight * 0.15}, -${laceWidthLeftRight * 0.8} -${laceWidthLeftRight * 0.25}
                             Q -${laceWidthLeftRight * 0.7} -${laceWidthLeftRight * 0.35}, -${laceWidthLeftRight * 0.6} -${laceWidthLeftRight * 0.45}
                             Q -${laceWidthLeftRight * 0.5} -${laceWidthLeftRight * 0.55}, -${laceWidthLeftRight * 0.4} -${laceWidthLeftRight * 0.65}
                             Q -${laceWidthLeftRight * 0.3} -${laceWidthLeftRight * 0.75}, -${laceWidthLeftRight * 0.2} -${laceWidthLeftRight * 0.85}
                             Q 0 -${laceWidthLeftRight}, 0 -${laceWidthLeftRight}"
                          fill="none" stroke="${c.sakuraPinkDark}" stroke-width="0.5" opacity="0.35"/>
                </g>

                <g id="Corner-${position.toUpperCase()}-Flower">
                    <g transform="translate(-${laceWidthLeftRight * 0.4}, -${laceWidthLeftRight * 0.4})">
                        <g opacity="0.4">
                            <ellipse cx="0" cy="-5" rx="2.5" ry="4" fill="${c.sakuraPink}"/>
                            <ellipse cx="4" cy="-1" rx="2.5" ry="4" fill="${c.sakuraPink}" transform="rotate(72)"/>
                            <ellipse cx="3" cy="3" rx="2.5" ry="4" fill="${c.sakuraPink}" transform="rotate(144)"/>
                            <ellipse cx="-3" cy="3" rx="2.5" ry="4" fill="${c.sakuraPink}" transform="rotate(216)"/>
                            <ellipse cx="-4" cy="-1" rx="2.5" ry="4" fill="${c.sakuraPink}" transform="rotate(288)"/>
                            <circle cx="0" cy="0" r="1.5" fill="${c.butterYellow}" opacity="0.5"/>
                        </g>
                    </g>
                </g>

                <g id="Corner-${position.toUpperCase()}-Dots">
                    <circle cx="-${laceWidthLeftRight * 0.15}" cy="-${laceWidthLeftRight * 0.5}" r="1" fill="${c.butterYellow}" opacity="0.4"/>
                    <circle cx="-${laceWidthLeftRight * 0.5}" cy="-${laceWidthLeftRight * 0.15}" r="1" fill="${c.butterYellow}" opacity="0.4"/>
                    <circle cx="-${laceWidthLeftRight * 0.3}" cy="-${laceWidthLeftRight * 0.3}" r="0.6" fill="${c.sakuraPinkLight}" opacity="0.5"/>
                    <circle cx="-${laceWidthLeftRight * 0.65}" cy="-${laceWidthLeftRight * 0.65}" r="0.5" fill="${c.sakuraPink}" opacity="0.35"/>
                    <circle cx="-${laceWidthLeftRight * 0.2}" cy="-${laceWidthLeftRight * 0.7}" r="0.5" fill="${c.sakuraPink}" opacity="0.35"/>
                    <circle cx="-${laceWidthLeftRight * 0.7}" cy="-${laceWidthLeftRight * 0.2}" r="0.5" fill="${c.sakuraPink}" opacity="0.35"/>
                </g>
            </g>
        `;
    }

    renderRibbon(side) {
        const { laceWidthLeftRight, greenBandHeight, colors: c } = this;
        const isLeft = side === 'left';
        const x = isLeft ? laceWidthLeftRight * 0.35 : this.width - laceWidthLeftRight * 0.35;
        const y = this.height / 2;

        const flipX = isLeft ? 1 : -1;

        return `
            <g transform="translate(${x}, ${y}) scale(${flipX * 0.4}, 0.4)" opacity="0.5">
                <g id="Ribbon-${side === 'left' ? 'Left' : 'Right'}-Main">
                    <ellipse cx="-14" cy="-8" rx="11" ry="14"
                             fill="${c.sakuraPink}" opacity="0.25"
                             transform="rotate(-25, -14, -8)"/>
                    <ellipse cx="-14" cy="-8" rx="5" ry="8"
                             fill="${c.sakuraPinkLight}" opacity="0.2"
                             transform="rotate(-25, -14, -8)"/>

                    <ellipse cx="-14" cy="10" rx="9" ry="12"
                             fill="${c.sakuraPink}" opacity="0.22"
                             transform="rotate(25, -14, 10)"/>
                    <ellipse cx="-14" cy="10" rx="5" ry="7"
                             fill="${c.sakuraPinkLight}" opacity="0.18"
                             transform="rotate(25, -14, 10)"/>

                    <ellipse cx="0" cy="0" rx="4" ry="6" fill="${c.sakuraPinkDark}" opacity="0.25"/>
                    <ellipse cx="0" cy="0" rx="2" ry="4" fill="${c.sakuraPink}" opacity="0.2"/>

                    <path d="M 1 -3 Q 6 -15, 4 -22" stroke="${c.sakuraPinkDark}"
                          stroke-width="0.5" fill="none" opacity="0.2"/>
                    <path d="M 1 3 Q 7 14, 5 22" stroke="${c.sakuraPinkDark}"
                          stroke-width="0.5" fill="none" opacity="0.2"/>

                    <circle cx="4" cy="-22" r="0.8" fill="${c.butterYellow}" opacity="0.25"/>
                    <circle cx="5" cy="22" r="0.8" fill="${c.butterYellow}" opacity="0.25"/>
                </g>

                <g id="Ribbon-${side === 'left' ? 'Left' : 'Right'}-Tails">
                    <path d="M -1 5 Q -8 14, -6 24 Q -4 30, -7 36"
                          stroke="${c.sakuraPink}" stroke-width="0.8" fill="none" opacity="0.18"/>
                    <path d="M 1 5 Q 6 15, 4 25 Q 2 32, 5 38"
                          stroke="${c.sakuraPink}" stroke-width="0.8" fill="none" opacity="0.18"/>
                </g>
            </g>
        `;
    }

    renderFlowers() {
        const { laceWidthLeftRight, greenBandHeight, colors: c } = this;
        const sideMidY = this.height / 2;

        const flowers = [];
        for (let i = 0; i < 12; i++) {
            const side = i % 2 === 0 ? 'left' : 'right';
            const yOffset = ((i >> 1) - 2.5) * 80;
            const size = 4 + (i % 3) * 1.5;
            flowers.push({ side, yOffset, size });
        }

        return flowers.map((f, i) => {
            const x = f.side === 'left' ? laceWidthLeftRight * 0.4 : this.width - laceWidthLeftRight * 0.4;
            const y = sideMidY + f.yOffset;
            const flip = f.side === 'left' ? 1 : -1;
            const opacity = 0.35 + (i % 4) * 0.05;
            return `
                <g id="Flower-${i}" transform="translate(${x}, ${y}) scale(${flip}, 1)">
                    <g opacity="${opacity}">
                        <ellipse cx="0" cy="-${f.size * 0.6}" rx="${f.size * 0.35}" ry="${f.size * 0.5}"
                                 fill="${c.sakuraPink}"/>
                        <ellipse cx="${f.size * 0.5}" cy="-${f.size * 0.2}" rx="${f.size * 0.35}" ry="${f.size * 0.5}"
                                 fill="${c.sakuraPink}" transform="rotate(72)"/>
                        <ellipse cx="${f.size * 0.35}" cy="${f.size * 0.4}" rx="${f.size * 0.35}" ry="${f.size * 0.5}"
                                 fill="${c.sakuraPink}" transform="rotate(144)"/>
                        <ellipse cx="-${f.size * 0.35}" cy="${f.size * 0.4}" rx="${f.size * 0.35}" ry="${f.size * 0.5}"
                                 fill="${c.sakuraPink}" transform="rotate(216)"/>
                        <ellipse cx="-${f.size * 0.5}" cy="-${f.size * 0.2}" rx="${f.size * 0.35}" ry="${f.size * 0.5}"
                                 fill="${c.sakuraPink}" transform="rotate(288)"/>
                        <circle cx="0" cy="0" r="${f.size * 0.2}" fill="${c.butterYellow}" opacity="0.5"/>
                    </g>
                    <path d="M 0 ${f.size * 0.5} Q ${f.size * 0.25} ${f.size * 1}, 0 ${f.size * 1.5}"
                          stroke="${c.sageGreen}" stroke-width="0.4" fill="none" opacity="0.3"/>
                    <ellipse cx="${f.size * 0.25}" cy="${f.size * 0.9}" rx="${f.size * 0.15}" ry="${f.size * 0.3}"
                             fill="${c.sageGreenLight}" opacity="0.25" transform="rotate(30)"/>
                </g>
            `;
        }).join('');
    }

    renderHearts() {
        const { laceWidthLeftRight, greenBandHeight, colors: c } = this;
        const sideMidY = this.height / 2;

        const hearts = [];
        for (let i = 0; i < 8; i++) {
            const side = i % 2 === 0 ? 'left' : 'right';
            const yOffset = ((i >> 1) - 1.5) * 100 + (i % 2 === 0 ? 20 : -20);
            const size = 3 + (i % 2) * 1;
            hearts.push({ side, yOffset, size });
        }

        return hearts.map((h, i) => {
            const x = h.side === 'left' ? laceWidthLeftRight * 0.65 : this.width - laceWidthLeftRight * 0.65;
            const y = sideMidY + h.yOffset;
            const flip = h.side === 'left' ? 1 : -1;
            return `
                <g id="Heart-${i}" transform="translate(${x}, ${y}) scale(${flip}, 1)">
                    <g opacity="0.25">
                        <path d="M 0 ${h.size * 0.8}
                                 Q -${h.size * 0.8} -${h.size * 0.3}, -${h.size * 0.5} -${h.size * 0.5}
                                 Q 0 -${h.size * 0.8}, ${h.size * 0.5} -${h.size * 0.5}
                                 Q ${h.size * 0.8} -${h.size * 0.3}, 0 ${h.size * 0.8} Z"
                              fill="${c.sakuraPink}" />
                    </g>
                </g>
            `;
        }).join('');
    }

    renderNeedleStitch() {
        const { width, height, greenBandHeight, laceWidthTopBottom, laceWidthLeftRight, innerLaceWidth, colors: c } = this;
        const ix = laceWidthLeftRight + innerLaceWidth;
        const iy = greenBandHeight + laceWidthTopBottom + innerLaceWidth;
        const iw = width - (laceWidthLeftRight + innerLaceWidth) * 2;
        const ih = height - (greenBandHeight + laceWidthTopBottom + innerLaceWidth) * 2;

        const stitchSpacing = 16;

        return `
            <g id="Needle-Stitch-Main">
                ${this.renderStitchRow(iw, ix, iy, stitchSpacing)}
                ${this.renderStitchRow(iw, ix, iy + ih, stitchSpacing)}
                ${this.renderStitchColumn(ih, ix, iy, stitchSpacing)}
                ${this.renderStitchColumn(ih, ix + iw, iy, stitchSpacing)}
            </g>
        `;
    }

    renderStitchRow(length, startX, y, spacing) {
        const { colors: c } = this;
        const count = Math.floor(length / spacing);
        let stitches = '';

        for (let i = 0; i < count; i++) {
            const x = startX + i * spacing + spacing / 2;
            stitches += `
                <circle cx="${x}" cy="${y}" r="0.7" fill="${c.threadPink}" opacity="0.35"/>
                <circle cx="${x + 2}" cy="${y + 1}" r="0.5" fill="${c.threadPink}" opacity="0.25"/>
            `;
        }

        return stitches;
    }

    renderStitchColumn(length, x, startY, spacing) {
        const { colors: c } = this;
        const count = Math.floor(length / spacing);
        let stitches = '';

        for (let i = 0; i < count; i++) {
            const y = startY + i * spacing + spacing / 2;
            stitches += `
                <circle cx="${x}" cy="${y}" r="0.7" fill="${c.threadPink}" opacity="0.35"/>
                <circle cx="${x + 1}" cy="${y + 2}" r="0.5" fill="${c.threadPink}" opacity="0.25"/>
            `;
        }

        return stitches;
    }

    renderInnerFrame() {
        const { width, height, greenBandHeight, laceWidthTopBottom, laceWidthLeftRight, innerLaceWidth, imagePadX, imagePadY, colors: c } = this;
        const ix = laceWidthLeftRight + innerLaceWidth + imagePadX;
        const iy = greenBandHeight + laceWidthTopBottom + innerLaceWidth + imagePadY;
        const iw = width - (laceWidthLeftRight + innerLaceWidth + imagePadX) * 2;
        const ih = height - (greenBandHeight + laceWidthTopBottom + innerLaceWidth + imagePadY) * 2;

        const waveOffset = 2;
        const waveWidth = 30;
        const waveHeight = 1.5;

        let topPath = `M ${ix} ${iy}`;
        let bottomPath = `M ${ix} ${iy + ih}`;
        let leftPath = `M ${ix} ${iy}`;
        let rightPath = `M ${ix + iw} ${iy}`;

        for (let i = 0; i < Math.ceil(iw / waveWidth); i++) {
            const x = ix + i * waveWidth;
            const midX = x + waveWidth / 2;
            const nextX = Math.min(x + waveWidth, ix + iw);
            topPath += ` Q ${midX} ${iy - waveHeight}, ${nextX} ${iy}`;
            bottomPath += ` Q ${midX} ${iy + ih + waveHeight}, ${nextX} ${iy + ih}`;
        }

        for (let i = 0; i < Math.ceil(ih / waveWidth); i++) {
            const y = iy + i * waveWidth;
            const midY = y + waveWidth / 2;
            const nextY = Math.min(y + waveWidth, iy + ih);
            leftPath += ` Q ${ix - waveHeight} ${midY}, ${ix} ${nextY}`;
            rightPath += ` Q ${ix + iw + waveHeight} ${midY}, ${ix + iw} ${nextY}`;
        }

        return `
            <g id="Inner-Frame-Main">
                <g id="Inner-Frame-Fabric">
                    <rect x="${ix - 4}" y="${iy - 4}" width="${iw + 8}" height="${ih + 8}"
                          fill="${c.warmBeige}" opacity="0.4"/>
                </g>

                <g id="Inner-Frame-Wave-Top">
                    <path d="${topPath}" fill="none" stroke="${c.sakuraPinkDark}" stroke-width="0.5" opacity="0.3"/>
                    <path d="${topPath}" fill="none" stroke="${c.sakuraPink}" stroke-width="0.3" opacity="0.2"
                          transform="translate(0, 1)"/>
                </g>

                <g id="Inner-Frame-Wave-Bottom">
                    <path d="${bottomPath}" fill="none" stroke="${c.sakuraPinkDark}" stroke-width="0.5" opacity="0.3"/>
                    <path d="${bottomPath}" fill="none" stroke="${c.sakuraPink}" stroke-width="0.3" opacity="0.2"
                          transform="translate(0, -1)"/>
                </g>

                <g id="Inner-Frame-Wave-Left">
                    <path d="${leftPath}" fill="none" stroke="${c.sakuraPinkDark}" stroke-width="0.5" opacity="0.3"/>
                    <path d="${leftPath}" fill="none" stroke="${c.sakuraPink}" stroke-width="0.3" opacity="0.2"
                          transform="translate(1, 0)"/>
                </g>

                <g id="Inner-Frame-Wave-Right">
                    <path d="${rightPath}" fill="none" stroke="${c.sakuraPinkDark}" stroke-width="0.5" opacity="0.3"/>
                    <path d="${rightPath}" fill="none" stroke="${c.sakuraPink}" stroke-width="0.3" opacity="0.2"
                          transform="translate(-1, 0)"/>
                </g>

                <g id="Inner-Frame-Soft-Border">
                    <rect x="${ix - 2}" y="${iy - 2}" width="${iw + 4}" height="${ih + 4}"
                          fill="none" stroke="${c.softGray}" stroke-width="0.8" opacity="0.3"/>
                </g>
            </g>
        `;
    }

    renderFabricShadow() {
        const { width, height, greenBandHeight, laceWidthTopBottom, laceWidthLeftRight, innerLaceWidth, colors: c } = this;

        return `
            <g id="Fabric-Shadow-Main">
                <path d="M 0 ${greenBandHeight + laceWidthTopBottom}
                         L ${width} ${greenBandHeight + laceWidthTopBottom}
                         L ${width} ${greenBandHeight + laceWidthTopBottom + 2}
                         L 0 ${greenBandHeight + laceWidthTopBottom + 2} Z"
                      fill="${c.sakuraPinkDark}" opacity="0.08"/>

                <path d="M 0 ${height - greenBandHeight - laceWidthTopBottom}
                         L ${width} ${height - greenBandHeight - laceWidthTopBottom}
                         L ${width} ${height - greenBandHeight - laceWidthTopBottom - 2}
                         L 0 ${height - greenBandHeight - laceWidthTopBottom - 2} Z"
                      fill="${c.sakuraPinkDark}" opacity="0.08"/>

                <path d="M ${laceWidthLeftRight} ${greenBandHeight + laceWidthTopBottom}
                         L ${laceWidthLeftRight} ${height - greenBandHeight - laceWidthTopBottom}
                         L ${laceWidthLeftRight + 2} ${height - greenBandHeight - laceWidthTopBottom}
                         L ${laceWidthLeftRight + 2} ${greenBandHeight + laceWidthTopBottom} Z"
                      fill="${c.sakuraPinkDark}" opacity="0.06"/>

                <path d="M ${width - laceWidthLeftRight} ${greenBandHeight + laceWidthTopBottom}
                         L ${width - laceWidthLeftRight} ${height - greenBandHeight - laceWidthTopBottom}
                         L ${width - laceWidthLeftRight - 2} ${height - greenBandHeight - laceWidthTopBottom}
                         L ${width - laceWidthLeftRight - 2} ${greenBandHeight + laceWidthTopBottom} Z"
                      fill="${c.sakuraPinkDark}" opacity="0.06"/>

                <path d="M ${laceWidthLeftRight + innerLaceWidth} ${greenBandHeight + laceWidthTopBottom + innerLaceWidth}
                         L ${laceWidthLeftRight + innerLaceWidth} ${height - greenBandHeight - laceWidthTopBottom - innerLaceWidth}
                         L ${laceWidthLeftRight + innerLaceWidth + 1} ${height - greenBandHeight - laceWidthTopBottom - innerLaceWidth}
                         L ${laceWidthLeftRight + innerLaceWidth + 1} ${greenBandHeight + laceWidthTopBottom + innerLaceWidth} Z"
                      fill="${c.sakuraPinkDark}" opacity="0.04"/>
            </g>
        `;
    }

    renderFabricFold() {
        const { width, height, greenBandHeight, laceWidthTopBottom, laceWidthLeftRight, colors: c } = this;

        return `
            <g id="Fabric-Fold-Main">
                <path d="M 0 ${greenBandHeight}
                         Q 50 ${greenBandHeight - 3}, 100 ${greenBandHeight}
                         Q 150 ${greenBandHeight + 2}, 200 ${greenBandHeight}"
                      fill="none" stroke="${c.sakuraPink}" stroke-width="0.4" opacity="0.15"/>

                <path d="M ${width} ${greenBandHeight}
                         Q ${width - 50} ${greenBandHeight - 3}, ${width - 100} ${greenBandHeight}
                         Q ${width - 150} ${greenBandHeight + 2}, ${width - 200} ${greenBandHeight}"
                      fill="none" stroke="${c.sakuraPink}" stroke-width="0.4" opacity="0.15"/>

                <path d="M 0 ${height - greenBandHeight}
                         Q 50 ${height - greenBandHeight + 3}, 100 ${height - greenBandHeight}
                         Q 150 ${height - greenBandHeight - 2}, 200 ${height - greenBandHeight}"
                      fill="none" stroke="${c.sakuraPink}" stroke-width="0.4" opacity="0.15"/>

                <path d="M ${width} ${height - greenBandHeight}
                         Q ${width - 50} ${height - greenBandHeight + 3}, ${width - 100} ${height - greenBandHeight}
                         Q ${width - 150} ${height - greenBandHeight - 2}, ${width - 200} ${height - greenBandHeight}"
                      fill="none" stroke="${c.sakuraPink}" stroke-width="0.4" opacity="0.15"/>

                <path d="M ${laceWidthLeftRight} ${greenBandHeight + laceWidthTopBottom}
                         L ${laceWidthLeftRight} ${greenBandHeight + laceWidthTopBottom + 50}
                         Q ${laceWidthLeftRight + 2} ${greenBandHeight + laceWidthTopBottom + 75}, ${laceWidthLeftRight} ${greenBandHeight + laceWidthTopBottom + 100}"
                      fill="none" stroke="${c.sakuraPink}" stroke-width="0.3" opacity="0.1"/>

                <path d="M ${width - laceWidthLeftRight} ${greenBandHeight + laceWidthTopBottom}
                         L ${width - laceWidthLeftRight} ${greenBandHeight + laceWidthTopBottom + 50}
                         Q ${width - laceWidthLeftRight - 2} ${greenBandHeight + laceWidthTopBottom + 75}, ${width - laceWidthLeftRight} ${greenBandHeight + laceWidthTopBottom + 100}"
                      fill="none" stroke="${c.sakuraPink}" stroke-width="0.3" opacity="0.1"/>
            </g>
        `;
    }

    renderPaperTexture() {
        const { width, height, colors: c } = this;
        return `
            <rect x="0" y="0" width="${width}" height="${height}"
                  fill="url(#fabricTexture)" opacity="0.5"/>
        `;
    }

    generateScallopPath(totalWidth, baseY, size, direction = 'up', startX = 0) {
        const count = Math.ceil(totalWidth / (size * 2));
        const actualSize = totalWidth / count / 2;
        const depth = size * 0.4;

        let fillPath = `M ${startX} ${baseY}`;
        let outlinePath = `M ${startX} ${baseY}`;

        for (let i = 0; i < count; i++) {
            const x = startX + i * actualSize * 2;
            const midX = x + actualSize;
            const endX = Math.min(x + actualSize * 2, startX + totalWidth);
            const curveY = direction === 'up' ? baseY - depth : baseY + depth;

            fillPath += ` Q ${midX} ${curveY}, ${endX} ${baseY}`;
            outlinePath += ` Q ${midX} ${curveY}, ${endX} ${baseY}`;
        }

        return { path: fillPath, outline: outlinePath };
    }

    generateVerticalScallopPath(totalHeight, baseX, startY, size, direction = 'left') {
        const count = Math.ceil(totalHeight / (size * 2));
        const actualSize = totalHeight / count / 2;
        const depth = size * 0.4;

        let fillPath = `M ${baseX} ${startY}`;
        let outlinePath = `M ${baseX} ${startY}`;

        for (let i = 0; i < count; i++) {
            const y = startY + i * actualSize * 2;
            const midY = y + actualSize;
            const endY = Math.min(y + actualSize * 2, startY + totalHeight);
            const curveX = direction === 'left' ? baseX - depth : baseX + depth;

            fillPath += ` Q ${curveX} ${midY}, ${baseX} ${endY}`;
            outlinePath += ` Q ${curveX} ${midY}, ${baseX} ${endY}`;
        }

        return { path: fillPath, outline: outlinePath };
    }

    renderScatteredDots(length, y, spacing, size, fixedX = null) {
        const { colors: c } = this;
        const count = Math.floor(length / spacing);
        let dots = '';

        for (let i = 0; i < count; i++) {
            const isYellow = (i + 1) % 3 === 0;
            const dotSize = isYellow ? size * 0.8 : size * 0.6;
            const color = isYellow ? c.butterYellow : c.sageGreenLight;
            if (fixedX !== null) {
                const dotY = i * spacing + spacing / 2;
                dots += `<circle cx="${fixedX}" cy="${dotY}" r="${dotSize}" fill="${color}" opacity="0.3"/>`;
            } else {
                const x = i * spacing + spacing / 2;
                dots += `<circle cx="${x}" cy="${y}" r="${dotSize}" fill="${color}" opacity="0.3"/>`;
            }
        }

        return dots;
    }

    renderFabricWrinkles(direction, width, y, height, offsetX = 0, offsetY = 0) {
        const { colors: c } = this;
        const count = 5;
        let wrinkles = '';

        for (let i = 0; i < count; i++) {
            if (direction === 'horizontal') {
                const x = offsetX + (width / (count + 1)) * (i + 1);
                wrinkles += `
                    <path d="M ${x - 15} ${y + height / 2}
                             Q ${x} ${y + height / 2 - 2}, ${x + 15} ${y + height / 2}"
                          fill="none" stroke="${c.sakuraPinkDark}" stroke-width="0.3" opacity="0.1"/>
                `;
            } else {
                const rowY = y + (height / (count + 1)) * (i + 1);
                const centerX = offsetX + width / 2;
                wrinkles += `
                    <path d="M ${centerX} ${rowY - 15}
                             Q ${centerX - 2} ${rowY}, ${centerX} ${rowY + 15}"
                          fill="none" stroke="${c.sakuraPinkDark}" stroke-width="0.3" opacity="0.1"/>
                `;
            }
        }

        return wrinkles;
    }

    renderLaceEyesRow(totalWidth, centerY, spacing, scale) {
        const { colors: c } = this;
        const count = Math.floor(totalWidth / spacing);
        let elements = '';

        for (let i = 0; i < count; i++) {
            const x = i * spacing + spacing / 2;
            const r1 = 3 * scale;
            const r2 = 5 * scale;
            elements += `
                <ellipse cx="${x}" cy="${centerY}" rx="${r2}" ry="${r1}" fill="${c.sakuraPink}" opacity="0.2"/>
                <ellipse cx="${x}" cy="${centerY}" rx="${r1}" ry="${r2 * 0.6}" fill="${c.sakuraPinkLight}" opacity="0.3"/>
                <circle cx="${x}" cy="${centerY - r1}" r="0.8" fill="${c.butterYellow}" opacity="0.4"/>
                <circle cx="${x}" cy="${centerY + r1}" r="0.8" fill="${c.butterYellow}" opacity="0.4"/>
            `;
        }

        return elements;
    }

    renderVerticalLaceEyesRow(totalHeight, centerX, startY, spacing, scale) {
        const { colors: c } = this;
        const count = Math.floor(totalHeight / spacing);
        let elements = '';

        for (let i = 0; i < count; i++) {
            const y = startY + i * spacing + spacing / 2;
            const r1 = 3 * scale;
            const r2 = 5 * scale;
            elements += `
                <ellipse cx="${centerX}" cy="${y}" rx="${r1}" ry="${r2}" fill="${c.sakuraPink}" opacity="0.2"/>
                <ellipse cx="${centerX}" cy="${y}" rx="${r1 * 0.6}" ry="${r2}" fill="${c.sakuraPinkLight}" opacity="0.3"/>
                <circle cx="${centerX - r1}" cy="${y}" r="0.8" fill="${c.butterYellow}" opacity="0.4"/>
                <circle cx="${centerX + r1}" cy="${y}" r="0.8" fill="${c.butterYellow}" opacity="0.4"/>
            `;
        }

        return elements;
    }
}