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
                            <video class="pinpin-promo-video" id="pinpinPromoVideo" src="assets/pinpin-promo.mp4" loop playsinline preload="auto" muted poster="">
                                Your browser does not support the video tag.
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
                                <button class="video-mute-button" id="pinpinMuteButton" aria-label="Mute Toggle" type="button">
                                    <svg class="icon-unmuted" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 9V15H7L12 20V4L7 9H3Z" fill="#5A6B5D" opacity="0.7"/>
                                        <path d="M15.5 8.5C16.5 9.5 17 10.7 17 12C17 13.3 16.5 14.5 15.5 15.5" stroke="#5A6B5D" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
                                        <path d="M17.5 6.5C19.2 8.2 20 10 20 12C20 14 19.2 15.8 17.5 17.5" stroke="#5A6B5D" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
                                    </svg>
                                    <svg class="icon-muted" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:none;">
                                        <path d="M3 9V15H7L12 20V4L7 9H3Z" fill="#5A6B5D" opacity="0.7"/>
                                        <path d="M16 9L21 14M21 9L16 14" stroke="#5A6B5D" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    init() {
        const video = document.getElementById('pinpinPromoVideo');
        const overlay = document.getElementById('pinpinVideoOverlay');
        const wrapper = document.getElementById('pinpinVideoWrapper');
        const muteBtn = document.getElementById('pinpinMuteButton');
        const iconUnmuted = muteBtn ? muteBtn.querySelector('.icon-unmuted') : null;
        const iconMuted = muteBtn ? muteBtn.querySelector('.icon-muted') : null;
        if (!video || !overlay || !wrapper) return;

        video.muted = true;

        video.addEventListener('loadedmetadata', () => {
            const ratio = video.videoWidth / video.videoHeight;
            wrapper.style.aspectRatio = ratio ? ratio.toString() : '4 / 5';
        });

        const updateMuteIcon = () => {
            if (!muteBtn) return;
            if (video.muted) {
                iconUnmuted.style.display = 'none';
                iconMuted.style.display = 'block';
            } else {
                iconUnmuted.style.display = 'block';
                iconMuted.style.display = 'none';
            }
        };

        const togglePlay = () => {
            if (video.paused) {
                video.play().then(() => {
                    overlay.classList.add('hidden');
                }).catch(() => {
                    video.muted = true;
                    video.play().then(() => {
                        overlay.classList.add('hidden');
                    }).catch(() => {});
                });
            } else {
                video.pause();
                overlay.classList.remove('hidden');
            }
        };

        const toggleMute = (e) => {
            e.stopPropagation();
            video.muted = !video.muted;
            updateMuteIcon();
        };

        overlay.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);
        if (muteBtn) {
            muteBtn.addEventListener('click', toggleMute);
        }
        video.addEventListener('ended', () => {
            overlay.classList.remove('hidden');
        });

        updateMuteIcon();
    }
}
