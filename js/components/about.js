export class About {
    constructor() {}

    render() {
        return `
            <section class="section about-section" id="about">
                <div class="about-row about-row-1">
                    <div class="about-photo-block">
                        <div class="about-photo-wrapper">
                            <div class="about-photo-tape"></div>
                            <div class="about-polaroid">
                                <div class="about-photo-frame">
                                    <img src="assets/about-photo.jpg" alt="Chen Ming" class="about-photo-img" />
                                </div>
                                <div class="about-polaroid-caption">Chen Ming · 2024</div>
                            </div>
                            <div class="about-stamp">
                                <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="18" cy="18" r="16" fill="none" stroke="#DDB8C2" stroke-width="1" opacity="0.4"/>
                                    <circle cx="18" cy="18" r="13" fill="none" stroke="#DDB8C2" stroke-width="0.6" opacity="0.3"/>
                                    <text x="18" y="16" text-anchor="middle" fill="#DDB8C2" font-family="serif" font-size="8" font-style="italic" opacity="0.5">ABOUT</text>
                                    <text x="18" y="26" text-anchor="middle" fill="#DDB8C2" font-family="serif" font-size="7" opacity="0.4">ME</text>
                                </svg>
                            </div>
                            <div class="about-sticky-note">
                                <p class="about-sticky-text">Hello :)</p>
                            </div>
                        </div>
                    </div>

                    <div class="about-story-block">
                        <div class="about-header">
                            <p class="about-label">About Me</p>
                            <h2 class="about-title">关于我</h2>
                            <p class="about-subtitle">关注 AI 产品与用户体验的设计者。</p>
                            <p class="about-subtitle">横跨环境设计、媒体研究与数字产品探索。</p>
                        </div>

                        <div class="about-content">
                            <p>我习惯从用户需求出发，通过研究、设计和技术实现，将抽象想法转化为真实可用的产品体验。</p>
                        </div>
                    </div>
                </div>

                <div class="about-row about-row-2">
                    <div class="about-keywords-block">
                        <p class="about-block-title">My Focus</p>
                        <div class="about-tags">
                            <span class="about-tag">AI Product</span>
                            <span class="about-tag">User Research</span>
                            <span class="about-tag">Product Design</span>
                            <span class="about-tag">Content Strategy</span>
                            <span class="about-tag">Creative Technology</span>
                        </div>
                    </div>
                </div>

                <div class="about-brand">
                    <p class="about-brand-en">From Research to Product.</p>
                    <p class="about-brand-cn">从研究到产品，连接人与技术。</p>
                </div>
            </section>
        `;
    }

    init() {}
}
