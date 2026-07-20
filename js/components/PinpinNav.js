export class PinpinNav {
    constructor() {}

    render() {
        return `
            <nav class="pinpin-minimal-nav">
                <a href="index.html#works" class="pinpin-nav-back">
                    <span class="nav-back-arrow">←</span>
                    <span class="nav-back-text">Works</span>
                </a>
                <a href="index.html" class="pinpin-nav-logo">
                    <span class="nav-logo-script">Chen Ming</span>
                </a>
            </nav>
        `;
    }

    init() {}
}
