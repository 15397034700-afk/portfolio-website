export class Footer {
    constructor() {}

    render() {
        return `
            <footer class="footer-section">
                <p class="footer-text">© 2024 Chen Ming. All rights reserved.</p>
            </footer>
            
            <div class="mobile-contact-bar">
                <button class="mobile-contact-btn" data-action="download-resume">
                    <span>Download Resume</span>
                </button>
                <a href="mailto:15397034700@163.com" class="mobile-contact-btn" style="text-decoration: none;">
                    <span>Send Email</span>
                </a>
            </div>
        `;
    }

    init() {
    }
}
