export class ResearchDataset {
    constructor() {}

    render() {
        return `
            <section class="section research-dataset-section" id="research-dataset">
                <div class="research-dataset-container">

                    <div class="dataset-bar">
                        <div class="dataset-item">
                            <span class="dataset-num">200</span>
                            <span class="dataset-label">条评论完成整理与分析</span>
                        </div>
                        <div class="dataset-divider"></div>
                        <div class="dataset-item">
                            <span class="dataset-num">100</span>
                            <span class="dataset-label">条 YouTube 评论</span>
                        </div>
                        <div class="dataset-divider"></div>
                        <div class="dataset-item">
                            <span class="dataset-num">100</span>
                            <span class="dataset-label">条小红书评论</span>
                        </div>
                        <div class="dataset-divider"></div>
                        <div class="dataset-item">
                            <span class="dataset-num">2</span>
                            <span class="dataset-label">个平台进行对比</span>
                        </div>
                        <div class="dataset-divider"></div>
                        <div class="dataset-item">
                            <span class="dataset-num">5</span>
                            <span class="dataset-label">种解释框架</span>
                        </div>
                    </div>

                    <p class="dataset-note">所有评论均经过人工筛选、编码、归类与跨平台比较。</p>

                </div>
            </section>
        `;
    }

    init() {}
}
