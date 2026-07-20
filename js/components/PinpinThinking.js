export class PinpinThinking {
    constructor() {}

    render() {
        return `
            <section class="section pinpin-thinking-section" id="pinpin-thinking" style="opacity: 1; transform: translateY(0);">
                <div class="pinpin-thinking-container">
                    <div class="pinpin-section-header">
                        <p class="pinpin-section-label">Design Thinking</p>
                        <h2 class="pinpin-section-title">Design Thinking</h2>
                    </div>
                    
                    <div class="thinking-diagram">
                        <div class="thinking-flow">
                            <div class="flow-step">
                                <div class="node-circle">
                                    <span class="node-label">Problem</span>
                                </div>
                                <p class="node-desc">很多用户拥有很多护肤产品，<br>却难以坚持每天护肤。</p>
                            </div>
                            
                            <div class="flow-arrow">
                                <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
                                    <path d="M12 0L12 14M12 14L6 8M12 14L18 8" stroke="#D4DEC9" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
                                </svg>
                            </div>
                            
                            <div class="flow-step">
                                <div class="node-circle">
                                    <span class="node-label">Routine</span>
                                </div>
                                <p class="node-desc">帮助用户建立稳定的<br>每日护肤流程。</p>
                            </div>
                            
                            <div class="flow-arrow">
                                <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
                                    <path d="M12 0L12 14M12 14L6 8M12 14L18 8" stroke="#D4DEC9" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
                                </svg>
                            </div>
                            
                            <div class="flow-step">
                                <div class="node-circle">
                                    <span class="node-label">Memory</span>
                                </div>
                                <p class="node-desc">记录产品使用情况<br>与皮肤变化。</p>
                            </div>
                            
                            <div class="flow-arrow">
                                <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
                                    <path d="M12 0L12 14M12 14L6 8M12 14L18 8" stroke="#D4DEC9" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
                                </svg>
                            </div>
                            
                            <div class="flow-step">
                                <div class="node-circle node-accent">
                                    <span class="node-label">Companion</span>
                                </div>
                                <p class="node-desc">AI 持续陪伴用户，<br>而不是一次性回答问题。</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="thinking-modules">
                        <div class="thinking-module">
                            <p class="module-tag">Observation</p>
                            <p class="module-desc">真正困难的不是护肤，而是坚持。</p>
                        </div>
                        
                        <div class="thinking-module">
                            <p class="module-tag">Thinking</p>
                            <p class="module-desc">我没有继续增加功能，而是希望降低坚持护肤的成本，让产品自然融入每天都会发生的行为。</p>
                        </div>
                        
                        <div class="thinking-module">
                            <p class="module-tag">Solution</p>
                            <p class="module-desc">整个产品围绕三个关键词展开：</p>
                            <div class="solution-tags">
                                <span class="solution-tag">Routine</span>
                                <span class="solution-tag">Memory</span>
                                <span class="solution-tag">Companion</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="thinking-quote">
                        <p class="quote-text">Good products don't just solve problems.</p>
                        <p class="quote-text quote-accent">They build better habits.</p>
                    </div>
                </div>
            </section>
        `;
    }

    init() {}
}
