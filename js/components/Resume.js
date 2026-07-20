import { resumeData } from '../data/works.js';

export class Resume {
    constructor() {
        this.data = resumeData;
    }

    render() {
        return `
            <section class="section resume-section" id="resume">
                <div class="resume-header">
                    <p class="resume-label">${this.data.titleEn}</p>
                    <h2 class="resume-title">${this.data.titleCn}</h2>
                    <div class="resume-subtitle">
                        ${this.data.subtitleLines.map(line => `<p>${line}</p>`).join('')}
                    </div>
                    <div class="resume-divider"></div>
                </div>

                <div class="resume-grid">
                    <div class="resume-left">
                        <p class="resume-block-title">联系方式</p>
                        ${this.renderContactCard()}
                    </div>
                    <div class="resume-right">
                        <p class="resume-block-title">Quick Links</p>
                        <div class="resume-quick-links">
                            ${this.data.quickLinks.map(link => this.renderQuickLink(link)).join('')}
                        </div>
                    </div>
                </div>

                <div class="resume-ending">
                    <div class="resume-ending-line"></div>
                    <p class="resume-ending-text">${this.data.endingText}</p>
                </div>
            </section>
        `;
    }

    renderEducationCard(edu) {
        return `
            <div class="resume-education-card">
                <p class="edu-name">${edu.name}</p>
                <div class="edu-divider"></div>
                <p class="edu-degree">${edu.degree}</p>
                <p class="edu-field">${edu.field}</p>
            </div>
        `;
    }

    renderContactCard() {
        const c = this.data.contact;
        return `
            <div class="resume-contact-card">
                <div class="resume-contact-header">
                    <p class="resume-contact-name">${c.name}</p>
                    <p class="resume-contact-role">${c.role}</p>
                </div>
                <div class="resume-contact-divider"></div>
                <ul class="resume-contact-list">
                    <li class="resume-contact-item">
                        <span class="contact-item-icon">📍</span>
                        <span class="contact-item-text">${c.location}</span>
                    </li>
                    <li class="resume-contact-item">
                        <a href="mailto:${c.email}" class="contact-item-link">
                            <span class="contact-item-icon">📧</span>
                            <span class="contact-item-text">${c.email}</span>
                        </a>
                    </li>
                    <li class="resume-contact-item">
                        <span class="contact-item-icon">📱</span>
                        <span class="contact-item-text">${c.phone}</span>
                    </li>
                </ul>
            </div>
        `;
    }

    renderQuickLink(link) {
        const isEmail = link.id === 'email';
        const isResume = link.id === 'resume';
        const tag = isResume ? 'button' : 'a';
        const hrefAttr = isEmail ? `href="mailto:${this.data.contact.email}"` : '#';
        const downloadAttr = isResume ? 'data-action="download-resume"' : '';

        return `
            <${tag} ${hrefAttr} class="resume-quick-link" data-link="${link.id}" ${downloadAttr}>
                <span class="quick-link-cn">${link.labelCn}</span>
                <span class="quick-link-en">${link.labelEn}</span>
                <svg class="quick-link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M5 12h14M13 5l7 7-7 7"></path>
                </svg>
            </${tag}>
        `;
    }

    init() {}
}
