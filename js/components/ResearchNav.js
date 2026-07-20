export class ResearchNav {
    constructor() {}

    render() {
        return `
            <nav class="research-minimal-nav">
                <a href="index.html#works" class="research-nav-back">
                    <span class="nav-back-arrow">←</span>
                    <span class="nav-back-text">Back</span>
                </a>
                <a href="index.html" class="research-nav-logo">
                    <span class="nav-logo-script">Chen Ming</span>
                </a>
            </nav>
        `;
    }

    init() {}
}
