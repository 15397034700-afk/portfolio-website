import { BottomDecoration } from './BottomDecoration.js';
import { contactData } from '../data/works.js';

export class Contact {
    constructor() {
        this.data = contactData;
        this.bottomDeco = new BottomDecoration();
    }

    render() {
        return `
            <section class="section contact-section" id="contact">
                <div class="contact-ending">
                    <div class="contact-washi-tape"></div>
                    <p class="contact-ending-text">Let's Connect</p>
                    <div class="contact-signature">Chen Ming</div>
                    ${this.renderHandwrittenDate()}
                </div>
                
                <div class="bottom-lace-decoration">
                    ${this.bottomDeco.renderLaceBorder()}
                </div>
                
                <div class="contact-content">
                    <div class="contact-item">
                        <div class="contact-stamp">
                            <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y="4" width="20" height="20" fill="none" stroke="#DDB8C2" stroke-width="0.8" opacity="0.4"/>
                                <text x="14" y="12" text-anchor="middle" fill="#DDB8C2" font-size="7" opacity="0.4">RESUME</text>
                                <text x="14" y="20" text-anchor="middle" fill="#DDB8C2" font-size="6" opacity="0.35">DOWNLOAD</text>
                            </svg>
                        </div>
                        <p class="contact-number-label">03</p>
                        <span class="contact-link">${this.data.resumeLabel}</span>
                    </div>
                    <div class="contact-item">
                        <div class="contact-stamp">
                            <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="14" cy="14" r="10" fill="none" stroke="#D4DEC9" stroke-width="0.8" opacity="0.4"/>
                                <text x="14" y="14" text-anchor="middle" fill="#D4DEC9" font-size="8" opacity="0.4">CONTACT</text>
                            </svg>
                        </div>
                        <p class="contact-number-label">04</p>
                        <span class="contact-link">${this.data.contactLabel}</span>
                    </div>
                </div>
                
                ${this.renderScatteredDecorations()}
            </section>
        `;
    }

    renderHandwrittenDate() {
        return `
            <div class="contact-date">
                <svg width="120" height="24" viewBox="0 0 120 24" xmlns="http://www.w3.org/2000/svg">
                    <text x="60" y="18" text-anchor="middle" fill="#A8998C" font-family="var(--font-family-script)" font-size="14" opacity="0.5">July 19, 2024</text>
                </svg>
            </div>
        `;
    }

    renderScatteredDecorations() {
        return `
            <div class="contact-scattered">
                <div class="contact-deco flower" style="left: 20%; top: 10%;">
                    <svg width="25" height="30" viewBox="0 0 25 30" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.15">
                            <ellipse cx="12" cy="8" rx="4" ry="6" fill="#F0D5DC"/>
                            <ellipse cx="12" cy="8" rx="4" ry="6" fill="#F0D5DC" transform="rotate(60, 12, 12)"/>
                            <ellipse cx="12" cy="8" rx="4" ry="6" fill="#F0D5DC" transform="rotate(120, 12, 12)"/>
                            <circle cx="12" cy="12" r="3" fill="#F5EBC8"/>
                        </g>
                    </svg>
                </div>
                <div class="contact-deco leaf" style="right: 25%; top: 20%;">
                    <svg width="20" height="25" viewBox="0 0 20 25" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 10 2 Q 5 8, 3 15 Q 5 20, 10 23 Q 15 20, 17 15 Q 15 8, 10 2" fill="none" stroke="#D4DEC9" stroke-width="0.5" opacity="0.2"/>
                    </svg>
                </div>
                <div class="contact-deco stamp" style="left: 15%; bottom: 30%;">
                    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="8" fill="none" stroke="#E8C5CE" stroke-width="0.6" opacity="0.2"/>
                        <circle cx="10" cy="10" r="5" fill="none" stroke="#E8C5CE" stroke-width="0.4" opacity="0.15"/>
                    </svg>
                </div>
            </div>
        `;
    }

    init() {
    }
}
