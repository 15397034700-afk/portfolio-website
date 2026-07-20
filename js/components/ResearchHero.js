export class ResearchHero {
    constructor() {}

    render() {
        return `
            <section class="section research-hero-section" id="research-hero">
                <div class="research-hero-container">

                    <div class="research-hero-header">
                        <p class="research-hero-label">Selected Work · 02</p>
                        <h1 class="research-hero-title">Digital Culture Research</h1>
                        <p class="research-hero-subtitle">从 200 条用户评论中提炼跨平台用户洞察</p>
                    </div>

                    <div class="research-hero-main">
                        <div class="research-hero-text">
                            <p>用户评论不只是内容发布后的反馈。</p>
                            <p>它们也记录了用户的情绪、经验、质疑与价值判断。</p>
                            <p class="hero-text-space">我以 (G)I-DLE《Allergy》为案例，</p>
                            <p>整理并分析 YouTube 与小红书共 200 条评论，</p>
                            <p>观察同一内容在不同平台如何形成不同的表达方式与讨论方向。</p>

                            <div class="research-hero-meta">
                                <div class="meta-item">
                                    <span class="meta-label">角色</span>
                                    <span class="meta-value">研究者</span>
                                </div>
                                <div class="meta-item">
                                    <span class="meta-label">方法</span>
                                    <span class="meta-value">定性研究</span>
                                </div>
                                <div class="meta-item">
                                    <span class="meta-label">数据</span>
                                    <span class="meta-value">200 条用户评论</span>
                                </div>
                                <div class="meta-item">
                                    <span class="meta-label">平台</span>
                                    <span class="meta-value">YouTube × 小红书</span>
                                </div>
                            </div>
                        </div>

                        <div class="research-case-card">
                            <div class="case-card-label">研究案例</div>
                            <div class="case-card-image-placeholder">
                                <img src="assets/research-allergy-mv.jpg" alt="(G)I-DLE Allergy MV Screenshot" class="case-card-image">
                            </div>
                            <div class="case-card-info">
                                <p class="case-card-title">(G)I-DLE《Allergy》</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        `;
    }

    init() {}
}
