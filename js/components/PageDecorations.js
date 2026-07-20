export class PageDecorations {
    constructor() {}

    renderCornerFlower(position) {
        const isTop = position.includes('top');
        const isLeft = position.includes('left');
        const flipX = isLeft ? '' : 'scaleX(-1)';
        const flipY = isTop ? '' : 'scaleY(-1)';
        
        return `
            <div class="page-corner-decoration corner-${position}" style="transform: ${flipX} ${flipY};">
                <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.22">
                        <path d="M 5 5 Q 20 5, 25 15 Q 30 25, 20 35 Q 10 45, 5 35 Q 0 25, 5 15 Q 5 10, 5 5" 
                              fill="none" stroke="#E8C5CE" stroke-width="0.8"/>
                        <circle cx="15" cy="12" r="4" fill="#F0D5DC"/>
                        <circle cx="15" cy="12" r="1.5" fill="#F9E6EA"/>
                        
                        <path d="M 5 5 Q 25 0, 40 10 Q 50 18, 55 25" stroke="#E8C5CE" stroke-width="0.7" fill="none"/>
                        <path d="M 5 5 Q 0 25, 10 40 Q 18 50, 25 55" stroke="#E8C5CE" stroke-width="0.7" fill="none"/>
                        
                        <circle cx="42" cy="12" r="2" fill="#D4DEC9"/>
                        <circle cx="52" cy="22" r="1.5" fill="#D4DEC9"/>
                        <circle cx="15" cy="45" r="2" fill="#D4DEC9"/>
                        <circle cx="28" cy="52" r="1.5" fill="#D4DEC9"/>
                        
                        <path d="M 35 8 Q 38 5, 42 7" stroke="#E8C5CE" stroke-width="0.5" fill="none"/>
                        <path d="M 8 35 Q 5 38, 7 42" stroke="#E8C5CE" stroke-width="0.5" fill="none"/>
                        
                        <ellipse cx="45" cy="18" rx="1.5" ry="2.5" fill="#F0D5DC" opacity="0.6" transform="rotate(30, 45, 18)"/>
                        <ellipse cx="20" cy="50" rx="1.5" ry="2.5" fill="#F0D5DC" opacity="0.6" transform="rotate(-30, 20, 50)"/>
                    </g>
                </svg>
            </div>
        `;
    }

    renderSideDecoration(side, yOffset = 0) {
        const isLeft = side === 'left';
        const flip = isLeft ? '' : 'scaleX(-1)';
        
        return `
            <div class="page-side-decoration side-${side}" style="top: ${yOffset}%; transform: ${flip};">
                <svg width="40" height="200" viewBox="0 0 40 200" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.18">
                        <path d="M 5 0 Q 15 30, 10 60 Q 5 90, 15 120 Q 20 150, 10 180 Q 5 195, 10 200" 
                              stroke="#E8C5CE" stroke-width="1" fill="none"/>
                        
                        <circle cx="15" cy="25" r="3" fill="#F0D5DC"/>
                        <circle cx="8" cy="55" r="2" fill="#D4DEC9"/>
                        <circle cx="18" cy="85" r="2.5" fill="#F0D5DC"/>
                        <circle cx="10" cy="115" r="2" fill="#D4DEC9"/>
                        <circle cx="16" cy="145" r="3" fill="#F0D5DC"/>
                        <circle cx="8" cy="175" r="2" fill="#D4DEC9"/>
                        
                        <path d="M 10 25 Q 20 20, 25 25" stroke="#E8C5CE" stroke-width="0.6" fill="none"/>
                        <path d="M 5 85 Q 15 80, 20 85" stroke="#E8C5CE" stroke-width="0.6" fill="none"/>
                        <path d="M 10 145 Q 20 140, 25 145" stroke="#E8C5CE" stroke-width="0.6" fill="none"/>
                    </g>
                </svg>
            </div>
        `;
    }

    renderLaceDivider() {
        return `
            <div class="lace-divider">
                <svg width="100%" height="24" viewBox="0 0 400 24" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.25">
                        <path d="M 0 12 Q 20 4, 40 12 Q 60 20, 80 12 Q 100 4, 120 12 Q 140 20, 160 12 Q 180 4, 200 12 Q 220 20, 240 12 Q 260 4, 280 12 Q 300 20, 320 12 Q 340 4, 360 12 Q 380 20, 400 12" 
                              stroke="#E8C5CE" stroke-width="0.8" fill="none"/>
                        
                        ${[20, 60, 100, 140, 180, 220, 260, 300, 340, 380].map(x => `
                            <circle cx="${x}" cy="${x % 40 === 20 ? 6 : 18}" r="1" fill="#E8C5CE"/>
                        `).join('')}
                        
                        ${[40, 120, 200, 280, 360].map(x => `
                            <path d="M ${x-3} 2 l 3 -2 l 3 2" stroke="#E8C5CE" stroke-width="0.6" fill="none"/>
                            <path d="M ${x-3} 22 l 3 2 l 3 -2" stroke="#E8C5CE" stroke-width="0.6" fill="none"/>
                        `).join('')}
                    </g>
                </svg>
            </div>
        `;
    }

    renderEmbroideryPattern(x, y, size = 30, color = 'pink') {
        const strokeColor = color === 'pink' ? '#E8C5CE' : '#D4DEC9';
        const fillColor = color === 'pink' ? '#F5D5DC' : '#E0E8D9';
        
        return `
            <svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.3">
                    <circle cx="15" cy="15" r="8" fill="none" stroke="${strokeColor}" stroke-width="0.8" stroke-dasharray="2 2"/>
                    <circle cx="15" cy="15" r="4" fill="${fillColor}" opacity="0.5"/>
                    <path d="M 15 5 L 15 25 M 5 15 L 25 15" stroke="${strokeColor}" stroke-width="0.6"/>
                    <path d="M 8 8 L 22 22 M 22 8 L 8 22" stroke="${strokeColor}" stroke-width="0.5" opacity="0.6"/>
                </g>
            </svg>
        `;
    }
}
