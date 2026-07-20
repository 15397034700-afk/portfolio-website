export class CrossPlatformComparison {
    constructor() {}

    render() {
        return `
            <section class="section cross-platform-section" id="cross-platform">
                <div class="cross-platform-container">

                    <div class="cross-platform-header">
                        <p class="research-section-label">Cross-platform Comparison</p>
                        <h2 class="research-section-title">Cross-platform Comparison</h2>
                        <p class="cross-platform-subtitle">同一首歌，在不同社区形成了不同的话语模式。</p>
                    </div>

                    <div class="comparison-grid">

                        <div class="comparison-column comparison-youtube">
                            <h3 class="comparison-platform">YouTube</h3>
                            <ul class="comparison-list">
                                <li>短句情绪表达</li>
                                <li>个人情感共鸣</li>
                                <li>相互鼓励支持</li>
                                <li>社区归属感</li>
                            </ul>
                        </div>

                        <div class="comparison-divider"></div>

                        <div class="comparison-column comparison-xiaohongshu">
                            <h3 class="comparison-platform">小红书</h3>
                            <ul class="comparison-list">
                                <li>较长文本讨论</li>
                                <li>个人经验叙述</li>
                                <li>批判性反思</li>
                                <li>社会意义解读</li>
                            </ul>
                        </div>

                    </div>

                    <p class="comparison-summary">平台机制不仅影响用户如何表达，也影响他们选择讨论什么。</p>

                </div>
            </section>
        `;
    }

    init() {}
}