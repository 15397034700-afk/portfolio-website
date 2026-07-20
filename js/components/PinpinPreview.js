export class PinpinPreview {
    constructor() {}

    render() {
        return `
            <section class="section pinpin-preview-section" id="pinpin-preview" style="opacity: 1; transform: translateY(0);">
                <div class="pinpin-preview-container">
                    <div class="pinpin-section-header">
                        <p class="pinpin-section-label">Product Preview</p>
                        <h2 class="pinpin-section-title">Product Preview</h2>
                    </div>
                    
                    <div class="preview-gallery">
                        <div class="preview-item">
                            <div class="preview-image-wrapper preview-card">
                                <img src="assets/pinpin-daily-routine.jpg" alt="Daily Routine" class="preview-image">
                            </div>
                        </div>
                        <div class="preview-item">
                            <div class="preview-image-wrapper preview-card">
                                <img src="assets/pinpin-ai-assistant.jpg" alt="AI Assistant" class="preview-image">
                            </div>
                        </div>
                        <div class="preview-item">
                            <div class="preview-image-wrapper preview-card">
                                <img src="assets/pinpin-skin-memory.jpg" alt="Skin Memory" class="preview-image">
                            </div>
                        </div>
                    </div>
                    
                    <div class="preview-features">
                        <div class="feature-item">
                            <p class="feature-tag">Daily Routine</p>
                            <p class="feature-desc">建立稳定的每日护肤流程。</p>
                        </div>
                        <div class="feature-item">
                            <p class="feature-tag">AI Assistant</p>
                            <p class="feature-desc">根据用户记录提供个性化护肤建议。</p>
                        </div>
                        <div class="feature-item">
                            <p class="feature-tag">Skin Memory</p>
                            <p class="feature-desc">持续记录长期护肤变化。</p>
                        </div>
                    </div>
                    
                    <div class="preview-reflection">
                        <p class="reflection-label">Reflection</p>
                        <div class="reflection-content">
                            <p>PinPin 是我围绕 AI 与日常习惯设计的一次 MVP 探索。</p>
                            <p>相比增加更多功能，我更关注产品是否能够自然融入用户每天都会发生的行为，让坚持变得更加简单。</p>
                        </div>
                    </div>
                    
                    <div class="preview-ending">
                        <p class="ending-text">Better routines.</p>
                        <p class="ending-text ending-accent">Better skin.</p>
                    </div>
                </div>
            </section>
        `;
    }

    init() {}
}
