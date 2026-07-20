export class ResearchInsights {
    constructor() {}

    render() {
        return `
            <section class="section research-insights-section" id="research-insights">
                <div class="research-insights-container">

                    <div class="research-insights-header">
                        <p class="research-section-label">Platform Insights</p>
                        <h2 class="research-section-title">Platform Insights</h2>
                        <p class="research-insights-subtitle">同一内容，在不同平台形成了不同的用户表达路径。</p>
                    </div>

                    <!-- A. 平台对比 -->
                    <div class="platform-comparison">
                        <div class="comparison-grid">
                            <div class="comparison-column comparison-youtube">
                                <h3 class="comparison-platform">YouTube</h3>
                                <div class="comparison-item">
                                    <span class="comparison-label">表达特点</span>
                                    <p class="comparison-text">短句、直接、情绪明确</p>
                                </div>
                                <div class="comparison-item">
                                    <span class="comparison-label">常见内容</span>
                                    <p class="comparison-text">共鸣、安慰、鼓励</p>
                                </div>
                                <div class="comparison-item">
                                    <span class="comparison-label">用户路径</span>
                                    <p class="comparison-text">感受到共鸣 → 获得支持 → 形成归属感</p>
                                </div>
                                <p class="comparison-summary">YouTube 更像一个情绪支持空间。</p>
                            </div>

                            <div class="comparison-divider"></div>

                            <div class="comparison-column comparison-xiaohongshu">
                                <h3 class="comparison-platform">小红书</h3>
                                <div class="comparison-item">
                                    <span class="comparison-label">表达特点</span>
                                    <p class="comparison-text">长文本、经验叙述、观点讨论</p>
                                </div>
                                <div class="comparison-item">
                                    <span class="comparison-label">常见内容</span>
                                    <p class="comparison-text">焦虑、质疑、审美反思</p>
                                </div>
                                <div class="comparison-item">
                                    <span class="comparison-label">用户路径</span>
                                    <p class="comparison-text">分享个人经历 → 展开讨论 → 重新理解内容</p>
                                </div>
                                <p class="comparison-summary">小红书更像一个经验讨论与意义协商空间。</p>
                            </div>
                        </div>

                        <div class="platform-conclusion">
                            <p>平台不仅影响用户怎么说，</p>
                            <p>也影响他们愿意讨论什么。</p>
                        </div>
                    </div>

                    <!-- B. 对工作的帮助 -->
                    <div class="work-value">
                        <h3 class="work-value-title">What I Learned</h3>
                        <p class="work-value-subtitle">这项研究如何帮助我做产品</p>

                        <div class="work-value-list">
                            <article class="work-value-item">
                                <span class="work-value-num">01</span>
                                <div class="work-value-content">
                                    <h4>理解评论背后的真实需求</h4>
                                    <p>用户评论不仅表达满意或不满，也透露情绪、动机、困惑与未被满足的需求。</p>
                                </div>
                            </article>

                            <article class="work-value-item">
                                <span class="work-value-num">02</span>
                                <div class="work-value-content">
                                    <h4>根据社区文化设计互动方式</h4>
                                    <p>同一个功能放在不同平台，可能产生完全不同的用户行为与表达习惯。</p>
                                </div>
                            </article>

                            <article class="work-value-item">
                                <span class="work-value-num">03</span>
                                <div class="work-value-content">
                                    <h4>把定性信息转化为产品洞察</h4>
                                    <p>数据告诉我发生了什么，评论帮助我理解为什么会发生。</p>
                                </div>
                            </article>
                        </div>

                        <div class="work-value-closing">
                            <p>这次研究让我建立了一个新的工作习惯：</p>
                            <p>不只看数据结果，也去理解数据背后的用户语言。</p>
                        </div>
                    </div>

                </div>
            </section>
        `;
    }

    init() {}
}
