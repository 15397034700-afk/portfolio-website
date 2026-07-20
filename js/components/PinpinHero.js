export class PinpinHero {
    constructor() {}

    render() {
        return `
            <section class="section pinpin-hero-section" id="pinpin-hero" style="opacity: 1; transform: translateY(0);">
                <div class="pinpin-hero-container">
                    <div class="pinpin-hero-content">
                        <div class="pinpin-hero-left">
                            <p class="pinpin-hero-label">Selected Work · 01</p>
                            <h1 class="pinpin-hero-title">PinPin</h1>
                            <p class="pinpin-hero-subtitle">AI Beauty Companion</p>
                            
                            <div class="pinpin-hero-slogan">
                                <p>Better routines.</p>
                                <p>Better skin.</p>
                            </div>
                            
                            <div class="pinpin-hero-desc">
                                <p>PinPin 是一款 AI 护肤管理小程序，帮助用户记录护肤过程、管理护肤产品，并通过 AI 提供个性化建议，让长期护肤变得更简单、更轻松。</p>
                            </div>
                            
                            <div class="pinpin-hero-meta">
                                <div class="meta-item">
                                    <span class="meta-label">Role</span>
                                    <span class="meta-value">Product Design</span>
                                </div>
                                <div class="meta-item">
                                    <span class="meta-label">Platform</span>
                                    <span class="meta-value">WeChat Mini Program</span>
                                </div>
                                <div class="meta-item">
                                    <span class="meta-label">Year</span>
                                    <span class="meta-value">2026</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="pinpin-hero-right">
                            <div class="pinpin-video-wrapper" id="pinpinVideoWrapper">
                                <video class="pinpin-promo-video" id="pinpinPromoVideo" controls loop playsinline preload="auto">
                                    <source src="assets/pinpin-promo.mp4" type="video/mp4">
                                </video>
                                <div class="pinpin-video-overlay" id="pinpinVideoOverlay">
                                    <div class="video-play-button">
                                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="32" cy="32" r="31" stroke="#DDB8C2" stroke-width="1" opacity="0.5"/>
                                            <path d="M26 21L44 32L26 43V21Z" fill="#DDB8C2" opacity="0.7"/>
                                        </svg>
                                    </div>
                                    <p class="video-play-text">Click to Play</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    init() {
        // 视频播放逻辑由 pinpin.html 中的内联脚本处理
    }
}
