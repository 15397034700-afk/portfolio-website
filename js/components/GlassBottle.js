export class GlassBottle {
    constructor() {}

    render() {
        return `
            <svg class="glass-bottle-svg" viewBox="0 0 60 140" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="glassBody" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="rgba(255,255,255,0.4)" stop-opacity="1"/>
                        <stop offset="25%" stop-color="rgba(255,255,255,0.18)" stop-opacity="1"/>
                        <stop offset="50%" stop-color="rgba(255,255,255,0.08)" stop-opacity="1"/>
                        <stop offset="75%" stop-color="rgba(255,255,255,0.2)" stop-opacity="1"/>
                        <stop offset="100%" stop-color="rgba(255,255,255,0.35)" stop-opacity="1"/>
                    </linearGradient>

                    <linearGradient id="glassStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="rgba(232,197,206,0)" stop-opacity="1"/>
                        <stop offset="20%" stop-color="rgba(232,197,206,0.3)" stop-opacity="1"/>
                        <stop offset="50%" stop-color="rgba(232,197,206,0.2)" stop-opacity="1"/>
                        <stop offset="80%" stop-color="rgba(232,197,206,0.3)" stop-opacity="1"/>
                        <stop offset="100%" stop-color="rgba(232,197,206,0)" stop-opacity="1"/>
                    </linearGradient>

                    <linearGradient id="corkBody" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#F0E2CC" stop-opacity="0.95"/>
                        <stop offset="50%" stop-color="#E0CCA8" stop-opacity="0.9"/>
                        <stop offset="100%" stop-color="#CCB288" stop-opacity="0.95"/>
                    </linearGradient>

                    <linearGradient id="corkTop" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#F8EEDC" stop-opacity="0.95"/>
                        <stop offset="100%" stop-color="#E8D8BC" stop-opacity="0.9"/>
                    </linearGradient>

                    <radialGradient id="seed1" cx="30%" cy="25%">
                        <stop offset="0%" stop-color="#A89878" stop-opacity="0.85"/>
                        <stop offset="100%" stop-color="#8B7B5B" stop-opacity="0.95"/>
                    </radialGradient>

                    <radialGradient id="seed2" cx="35%" cy="20%">
                        <stop offset="0%" stop-color="#B0A080" stop-opacity="0.8"/>
                        <stop offset="100%" stop-color="#938363" stop-opacity="0.9"/>
                    </radialGradient>

                    <filter id="softShadow">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
                    </filter>
                </defs>

                <ellipse cx="30" cy="132" rx="16" ry="3.5" fill="rgba(184,136,148,0.1)" filter="url(#softShadow)"/>

                <path d="M 26 32
                         Q 24 35, 23 40
                         L 21 55
                         Q 14 65, 12 85
                         Q 10 105, 13 120
                         Q 15 130, 30 132
                         Q 45 130, 47 120
                         Q 50 105, 48 85
                         Q 46 65, 39 55
                         L 37 40
                         Q 36 35, 34 32
                         Z"
                      fill="url(#glassBody)"
                      stroke="rgba(232,197,206,0.35)"
                      stroke-width="0.7"/>

                <path d="M 21 58
                         Q 15.5 66, 13.5 82
                         Q 11.5 100, 14 118
                         Q 15.5 127, 30 129
                         Q 44.5 127, 46 118
                         Q 48.5 100, 46.5 82
                         Q 44.5 66, 39 58"
                      fill="none"
                      stroke="url(#glassStroke)"
                      stroke-width="0.5"
                      opacity="0.5"/>

                <ellipse cx="30" cy="128" rx="15" ry="2.5" fill="rgba(252,238,242,0.45)"/>

                <path d="M 22 55
                         Q 18 68, 16.5 85
                         Q 15.5 100, 16 115"
                      stroke="rgba(255,255,255,0.35)"
                      stroke-width="1.3"
                      fill="none"
                      stroke-linecap="round"
                      opacity="0.65"/>

                <path d="M 27 58
                         Q 24 70, 22.5 85
                         Q 21.5 98, 22 110"
                      stroke="rgba(255,255,255,0.25)"
                      stroke-width="0.7"
                      fill="none"
                      stroke-linecap="round"
                      opacity="0.55"/>

                <g>
                    <ellipse cx="30" cy="25" rx="9" ry="2.5" fill="url(#corkTop)" stroke="rgba(204,178,136,0.45)" stroke-width="0.4"/>
                    
                    <path d="M 22 25
                             L 21.5 33
                             Q 21.5 38, 30 39
                             Q 38.5 38, 38.5 33
                             L 38 25"
                          fill="url(#corkBody)"
                          stroke="rgba(204,178,136,0.4)"
                          stroke-width="0.35"/>
                    
                    <ellipse cx="30" cy="39" rx="8.5" ry="2" fill="#D4BC92" opacity="0.8"/>

                    <path d="M 22.5 28 L 37.5 28" stroke="rgba(204,178,136,0.25)" stroke-width="0.35"/>
                    <path d="M 22 31 L 38 31" stroke="rgba(204,178,136,0.22)" stroke-width="0.3"/>
                    <path d="M 22.5 34 L 37.5 34" stroke="rgba(204,178,136,0.2)" stroke-width="0.3"/>
                    <path d="M 22.5 37 L 37.5 37" stroke="rgba(204,178,136,0.18)" stroke-width="0.3"/>

                    <path d="M 23 26.5 Q 24 28, 23 29.5" stroke="rgba(204,178,136,0.2)" stroke-width="0.25" fill="none"/>
                    <path d="M 37 26.5 Q 36 28, 37 29.5" stroke="rgba(204,178,136,0.2)" stroke-width="0.25" fill="none"/>
                    <path d="M 23.5 32.5 Q 24.5 33.5, 23.5 34.5" stroke="rgba(204,178,136,0.18)" stroke-width="0.25" fill="none"/>
                    <path d="M 36.5 32.5 Q 35.5 33.5, 36.5 34.5" stroke="rgba(204,178,136,0.18)" stroke-width="0.25" fill="none"/>
                </g>

                <g transform="translate(0, -1)">
                    <ellipse cx="27" cy="115" rx="4" ry="2.8" fill="url(#seed1)"/>
                    <ellipse cx="33.5" cy="117" rx="3.2" ry="2.2" fill="url(#seed2)"/>
                    <ellipse cx="29.5" cy="111" rx="2.2" ry="1.5" fill="#9C8B6B" opacity="0.7"/>

                    <path d="M 25.5 113.5 Q 27 113, 28.5 114" stroke="rgba(120,104,74,0.4)" stroke-width="0.35" fill="none"/>
                    <path d="M 32 116 Q 34 115.5, 35.5 116.5" stroke="rgba(120,104,74,0.35)" stroke-width="0.3" fill="none"/>
                </g>

                <ellipse cx="28" cy="113" rx="0.9" ry="0.5" fill="rgba(255,255,255,0.3)"/>
                <ellipse cx="34.5" cy="114.5" rx="0.7" ry="0.4" fill="rgba(255,255,255,0.25)"/>
            </svg>
        `;
    }
}
