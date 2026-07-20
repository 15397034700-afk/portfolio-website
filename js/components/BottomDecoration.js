export class BottomDecoration {
    constructor() {}

    renderLaceBorder() {
        return `
            <svg class="bottom-lace-svg" viewBox="0 0 1200 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.45">
                    <path d="${this.generateSineWave(1200, 30, 7, 100)}" 
                          fill="none" stroke="#A8B898" stroke-width="1" stroke-linecap="round"/>
                </g>

                <g opacity="0.4">
                    ${this.generatePeakDots(1200, 30, 7, 100)}
                </g>

                <g opacity="0.25">
                    <path d="${this.generateSineWave(1200, 48, 5, 80, 0.25)}" 
                          fill="none" stroke="#C5D0B8" stroke-width="0.7" stroke-linecap="round"/>
                </g>

                <g opacity="0.22">
                    ${this.generatePeakDots(1200, 48, 5, 80, 0.25)}
                </g>

                <g opacity="0.15">
                    ${this.generateScatteredDots(1200, 55, 75)}
                </g>
            </svg>
        `;
    }

    generateSineWave(totalWidth, baseY, amplitude, wavelength, phaseOffset = 0) {
        let path = '';
        const step = 2;
        const phase = phaseOffset * Math.PI * 2;

        for (let x = 0; x <= totalWidth; x += step) {
            const y = baseY + Math.sin((x / wavelength) * Math.PI * 2 + phase) * amplitude;
            if (x === 0) {
                path = `M ${x} ${y}`;
            } else {
                path += ` L ${x} ${y}`;
            }
        }

        return path;
    }

    generatePeakDots(totalWidth, baseY, amplitude, wavelength, phaseOffset = 0) {
        const dots = [];
        const phase = phaseOffset * Math.PI * 2;
        const halfWave = wavelength / 2;
        const count = Math.ceil(totalWidth / halfWave);

        for (let i = 0; i <= count; i++) {
            const x = i * halfWave;
            const angle = (x / wavelength) * Math.PI * 2 + phase;
            const y = baseY + Math.sin(angle) * amplitude;
            const r = 1.5;
            dots.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="#A8B898"/>`);
        }

        return dots.join('');
    }

    generateScatteredDots(totalWidth, topY, bottomY) {
        const dots = [];
        const positions = [
            { x: 0.03, y: 0.3, r: 2.2 },
            { x: 0.08, y: 0.7, r: 1.5 },
            { x: 0.14, y: 0.2, r: 1.8 },
            { x: 0.2, y: 0.6, r: 2 },
            { x: 0.27, y: 0.4, r: 1.3 },
            { x: 0.33, y: 0.8, r: 1.6 },
            { x: 0.4, y: 0.25, r: 2.1 },
            { x: 0.46, y: 0.65, r: 1.4 },
            { x: 0.52, y: 0.35, r: 1.9 },
            { x: 0.58, y: 0.75, r: 2.3 },
            { x: 0.65, y: 0.5, r: 1.5 },
            { x: 0.72, y: 0.2, r: 1.7 },
            { x: 0.78, y: 0.6, r: 2 },
            { x: 0.85, y: 0.4, r: 1.4 },
            { x: 0.92, y: 0.7, r: 1.8 },
            { x: 0.97, y: 0.3, r: 1.6 },
        ];

        positions.forEach(d => {
            const x = d.x * totalWidth;
            const y = topY + d.y * (bottomY - topY);
            dots.push(`<circle cx="${x}" cy="${y}" r="${d.r}" fill="#C5D0B8"/>`);
        });

        return dots.join('');
    }

    renderSwing() {
        return '';
    }
}
