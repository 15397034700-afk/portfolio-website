/**
 * VoiceArchive - 双平台 3D 评论球容器
 *
 * 管理两个独立的 3D 评论球（YouTube + 小红书），
 * 负责数据加载、球体初始化、换一组、详情浮层。
 *
 * 优先从 JSON 文件加载真实数据；fetch 失败时使用内置 fallback。
 */

import { createCommentSphere } from './VoiceSphere.js';
import { fallbackYouTube, fallbackXiaohongshu } from './VoiceArchiveData.js';

export class VoiceArchive {
    constructor() {
        this.youtubeComments = [];
        this.xiaohongshuComments = [];
        this.youtubeSphere = null;
        this.xiaohongshuSphere = null;
        this.detailModal = null;
        this.modalBody = null;
    }

    render() {
        return `
            <div class="voice-archive-container">

                <div class="voice-archive-header">
                    <p class="research-section-label">Voice Archive</p>
                    <h2 class="research-section-title">Voice Archive</h2>
                    <p class="voice-archive-zh">同一首歌曲，</p>
                    <p class="voice-archive-zh">在两个平台形成了不同的表达空间。</p>
                </div>

                <div class="voice-spheres-row">

                    <div class="voice-sphere-block voice-sphere-youtube">
                        <div class="sphere-header">
                            <p class="sphere-platform-label">YouTube</p>
                            <p class="sphere-comment-count"><span class="count-num">100</span> Comments</p>
                        </div>
                        <div class="sphere-stage" id="youtubeSphere"></div>
                        <div class="sphere-footer">
                            <div class="sphere-emotions">
                                <div class="emotion-tag">
                                    <span class="emotion-zh">感动</span>
                                </div>
                                <div class="emotion-tag">
                                    <span class="emotion-zh">共鸣</span>
                                </div>
                                <div class="emotion-tag">
                                    <span class="emotion-zh">鼓励</span>
                                </div>
                            </div>
                            <p class="sphere-desc">更直接地表达情绪与支持。</p>
                            <button class="sphere-refresh-btn" data-target="youtube">
                                <span>换一组</span>
                            </button>
                        </div>
                    </div>

                    <div class="voice-sphere-block voice-sphere-xiaohongshu">
                        <div class="sphere-header">
                            <p class="sphere-platform-label">小红书</p>
                            <p class="sphere-comment-count"><span class="count-num">100</span> Comments</p>
                        </div>
                        <div class="sphere-stage" id="xiaohongshuSphere"></div>
                        <div class="sphere-footer">
                            <div class="sphere-emotions">
                                <div class="emotion-tag">
                                    <span class="emotion-zh">焦虑</span>
                                </div>
                                <div class="emotion-tag">
                                    <span class="emotion-zh">质疑</span>
                                </div>
                                <div class="emotion-tag">
                                    <span class="emotion-zh">反思</span>
                                </div>
                            </div>
                            <p class="sphere-desc">更常连接个人经验与社会议题。</p>
                            <button class="sphere-refresh-btn" data-target="xiaohongshu">
                                <span>换一组</span>
                            </button>
                        </div>
                    </div>

                </div>

                <div class="voice-detail-modal" id="voiceDetailModal">
                    <div class="voice-detail-modal-card">
                        <button class="voice-detail-close" aria-label="Close">×</button>
                        <div class="voice-detail-modal-body" id="voiceDetailModalBody"></div>
                    </div>
                </div>

            </div>
        `;
    }

    async init() {
        this.detailModal = document.getElementById('voiceDetailModal');
        this.modalBody = document.getElementById('voiceDetailModalBody');

        // 加载评论数据
        this.youtubeComments = await this.loadComments(
            'assets/data/youtube-comments.json',
            fallbackYouTube
        );
        this.xiaohongshuComments = await this.loadComments(
            'assets/data/xiaohongshu-comments.json',
            fallbackXiaohongshu
        );

        // 初始化两个球
        const youtubeContainer = document.getElementById('youtubeSphere');
        const xhsContainer = document.getElementById('xiaohongshuSphere');

        if (youtubeContainer && this.youtubeComments.length > 0) {
            this.youtubeSphere = await createCommentSphere({
                container: youtubeContainer,
                comments: this.youtubeComments,
                platform: 'YouTube',
                nodeColor: 'sage',
                rotationDirection: 1,
                onClick: (c) => this.showModal('YouTube', c)
            });
        }

        if (xhsContainer && this.xiaohongshuComments.length > 0) {
            this.xiaohongshuSphere = await createCommentSphere({
                container: xhsContainer,
                comments: this.xiaohongshuComments,
                platform: 'Xiaohongshu',
                nodeColor: 'pink',
                rotationDirection: -1,
                onClick: (c) => this.showModal('Xiaohongshu', c)
            });
        }

        this.bindRefreshButtons();
        this.bindModalClose();
    }

    async loadComments(url, fallback) {
        try {
            const resp = await fetch(url, { cache: 'no-cache' });
            if (resp.ok) {
                const data = await resp.json();
                if (Array.isArray(data) && data.length > 0) {
                    console.log(`[VoiceArchive] Loaded ${data.length} comments from ${url}`);
                    return data;
                }
            }
            console.warn(`[VoiceArchive] Fallback data used for ${url}`);
            return fallback;
        } catch (err) {
            console.warn(`[VoiceArchive] Fetch failed (${url}), using fallback:`, err.message);
            return fallback;
        }
    }

    bindRefreshButtons() {
        document.querySelectorAll('.sphere-refresh-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.target;
                const sphere = target === 'youtube' ? this.youtubeSphere : this.xiaohongshuSphere;
                const stage = btn.closest('.voice-sphere-block').querySelector('.sphere-stage');
                if (!sphere || !stage) return;

                stage.classList.add('fading');
                setTimeout(() => {
                    sphere.refresh();
                    stage.classList.remove('fading');
                }, 350);
            });
        });
    }

    bindModalClose() {
        if (!this.detailModal) return;
        this.detailModal.addEventListener('click', (e) => {
            if (e.target === this.detailModal) this.hideModal();
        });
        const closeBtn = this.detailModal.querySelector('.voice-detail-close');
        if (closeBtn) closeBtn.addEventListener('click', () => this.hideModal());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hideModal();
        });
    }

    showModal(platform, comment) {
        if (!this.modalBody) return;
        this.modalBody.innerHTML = `
            <div class="modal-row">
                <span class="modal-label">Platform</span>
                <p class="modal-value modal-platform">${platform}</p>
            </div>
            <div class="modal-row">
                <span class="modal-label">Comment</span>
                <p class="modal-value modal-comment">"${comment.comment}"</p>
            </div>
        `;
        this.detailModal.classList.add('active');
    }

    hideModal() {
        if (!this.detailModal) return;
        this.detailModal.classList.remove('active');
    }

    destroy() {
        this.youtubeSphere && this.youtubeSphere.destroy();
        this.xiaohongshuSphere && this.xiaohongshuSphere.destroy();
    }
}
