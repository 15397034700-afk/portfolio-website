export class ConcertCaseStrategy {
    constructor() {}

    render() {
        return `
            <section class="case-screen case-screen-02" id="concert-strategy">
                <div class="case-container">

                    <div class="case-screen-header">
                        <p class="case-eyebrow">Strategy & Impact</p>
                        <h2 class="case-screen-title">From Event To Consumption</h2>
                        <p class="case-screen-subtitle">Connecting Audience, Business and City</p>
                    </div>

                    <div class="strategy-grid">

                        <div class="strategy-left">
                            <div class="strategy-block">
                                <h3 class="strategy-block-title">Challenge</h3>
                                <p class="strategy-block-text">大型活动能够快速聚集大量用户，但活动结束后，观众离开城市，流量也随之结束。</p>
                                <p class="strategy-block-text">项目希望解决：<br>如何让一次性的演唱会流量，进一步进入城市消费场景？</p>
                            </div>

                            <div class="user-journey">
                                <p class="user-journey-label">User Journey</p>
                                <div class="journey-flow">
                                    <div class="journey-step">
                                        <span class="journey-num">01</span>
                                        <span class="journey-text">演唱会</span>
                                    </div>
                                    <span class="journey-arrow">↓</span>
                                    <div class="journey-step">
                                        <span class="journey-num">02</span>
                                        <span class="journey-text">游客进入丽水</span>
                                    </div>
                                    <span class="journey-arrow">↓</span>
                                    <div class="journey-step">
                                        <span class="journey-num">03</span>
                                        <span class="journey-text">消费券</span>
                                    </div>
                                    <span class="journey-arrow">↓</span>
                                    <div class="journey-step">
                                        <span class="journey-num">04</span>
                                        <span class="journey-text">80+ 商户</span>
                                    </div>
                                    <span class="journey-arrow">↓</span>
                                    <div class="journey-step">
                                        <span class="journey-num">05</span>
                                        <span class="journey-text">餐饮 / 酒店 / 零售</span>
                                    </div>
                                    <span class="journey-arrow">↓</span>
                                    <div class="journey-step">
                                        <span class="journey-num">06</span>
                                        <span class="journey-text">城市消费</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="strategy-divider"></div>

                        <div class="strategy-right">
                            <h3 class="strategy-block-title">My Contribution</h3>
                            <div class="contribution-list">
                                <div class="contribution-item">
                                    <h4>Resource Coordination</h4>
                                    <p>协调演出方、平台、合作单位及商户资源，推进项目筹备和执行。</p>
                                </div>
                                <div class="contribution-item">
                                    <h4>Merchant Collaboration</h4>
                                    <p>参与 80+ 本地商户资源整合，覆盖酒店、餐饮、汽车、零售、生活服务等多个消费场景。</p>
                                </div>
                                <div class="contribution-item">
                                    <h4>Campaign Operation</h4>
                                    <p>参与消费节、开票活动、宣传推广和现场执行，推动项目顺利落地。</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="strategy-images">
                        <div class="strategy-image-slot">
                            <div class="image-placeholder">
                                <span class="image-placeholder-num">01</span>
                                <span class="image-placeholder-label">消费券海报</span>
                            </div>
                        </div>
                        <div class="strategy-image-slot">
                            <div class="image-placeholder">
                                <span class="image-placeholder-num">02</span>
                                <span class="image-placeholder-label">开票仪式现场</span>
                            </div>
                        </div>
                        <div class="strategy-image-slot">
                            <div class="image-placeholder">
                                <span class="image-placeholder-num">03</span>
                                <span class="image-placeholder-label">合作商户展示</span>
                            </div>
                        </div>
                    </div>

                    <div class="project-outcome">
                        <p class="case-eyebrow">Project Outcome</p>
                        <div class="outcome-grid">
                            <div class="outcome-item">
                                <span class="outcome-label">Audience</span>
                                <span class="outcome-num">30,000+</span>
                            </div>
                            <div class="outcome-item">
                                <span class="outcome-label">Partners</span>
                                <span class="outcome-num">80+</span>
                            </div>
                            <div class="outcome-item">
                                <span class="outcome-label">Coupons</span>
                                <span class="outcome-num">580<span class="outcome-unit"> RMB</span></span>
                            </div>
                            <div class="outcome-item">
                                <span class="outcome-label">Artists</span>
                                <span class="outcome-num">6</span>
                            </div>
                            <div class="outcome-item">
                                <span class="outcome-label">Business Categories</span>
                                <span class="outcome-num">5+</span>
                            </div>
                        </div>
                    </div>

                    <div class="partner-network">
                        <h3 class="partner-network-title">80+ Local Partners</h3>
                        <p class="partner-network-subtitle">Covering hotels, restaurants, retail, lifestyle and automotive.</p>

                        <div class="partner-categories">
                            <div class="partner-category">
                                <span class="partner-category-name">Hotels</span>
                                <div class="partner-logos">
                                    ${this.renderPartnerLogos('H', 4)}
                                </div>
                            </div>
                            <div class="partner-category">
                                <span class="partner-category-name">Restaurants</span>
                                <div class="partner-logos">
                                    ${this.renderPartnerLogos('R', 5)}
                                </div>
                            </div>
                            <div class="partner-category">
                                <span class="partner-category-name">Retail</span>
                                <div class="partner-logos">
                                    ${this.renderPartnerLogos('S', 4)}
                                </div>
                            </div>
                            <div class="partner-category">
                                <span class="partner-category-name">Lifestyle</span>
                                <div class="partner-logos">
                                    ${this.renderPartnerLogos('L', 3)}
                                </div>
                            </div>
                            <div class="partner-category">
                                <span class="partner-category-name">Automotive</span>
                                <div class="partner-logos">
                                    ${this.renderPartnerLogos('A', 3)}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        `;
    }

    renderPartnerLogos(letter, count) {
        let html = '';
        for (let i = 0; i < count; i++) {
            html += `<div class="partner-logo-placeholder">${letter}${i + 1}</div>`;
        }
        return html;
    }

    init() {}
}
