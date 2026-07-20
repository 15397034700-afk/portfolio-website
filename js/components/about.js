export class About {
    constructor() {}

    render() {
        return `
            <section class="section about-section" id="about">
                <div class="about-row about-row-1">
                    <div class="about-mosaic-block">
                        <div class="about-mosaic">
                            <div class="mosaic-item mosaic-item-1" data-index="0">
                                <img src="assets/about-mosaic-1.jpg" alt="Chen Ming" class="mosaic-img" />
                            </div>
                            <div class="mosaic-item mosaic-item-2" data-index="1">
                                <img src="assets/about-mosaic-2.jpg" alt="" class="mosaic-img" />
                            </div>
                            <div class="mosaic-item mosaic-item-3" data-index="2">
                                <img src="assets/about-mosaic-3.jpg" alt="" class="mosaic-img" />
                            </div>
                            <div class="mosaic-item mosaic-item-4" data-index="3">
                                <img src="assets/about-mosaic-4.jpg" alt="" class="mosaic-img" />
                            </div>
                        </div>
                    </div>

                    <div class="about-story-block">
                        <div class="about-header">
                            <p class="about-label">About Me</p>
                            <h2 class="about-title">关于我</h2>
                        </div>

                        <div class="about-content">
                            <p>陈铭，来自浙江丽水。</p>
                            <p>本科-浙江大学城市学院（环境设计专业）</p>
                            <p>硕士-马来西亚理工大学（传播与数字文化专业）</p>
                            <p>设计与研究让我始终关注人与产品之间的关系，也让我逐渐将兴趣延伸到 AI 产品、用户体验与数字内容领域。</p>
                            <p>希望通过研究、设计与技术，构建更自然、更有温度的产品体验。</p>
                        </div>
                    </div>
                </div>

                <div class="about-row about-row-2">
                    <div class="about-keywords-block">
                        <p class="about-block-title">My Focus</p>
                        <div class="about-tags">
                            <span class="about-tag">AI Product</span>
                            <span class="about-tag">User Research</span>
                            <span class="about-tag">Product Design</span>
                            <span class="about-tag">Content Strategy</span>
                            <span class="about-tag">Creative Technology</span>
                        </div>
                    </div>
                </div>

                <div class="about-brand">
                    <p class="about-brand-en">From Research to Product.</p>
                    <p class="about-brand-cn">从研究到产品，连接人与技术。</p>
                </div>

                <div class="about-lightbox" id="aboutLightbox">
                    <div class="lightbox-overlay"></div>
                    <div class="lightbox-content">
                        <button class="lightbox-close" aria-label="Close">×</button>
                        <button class="lightbox-prev" aria-label="Previous">‹</button>
                        <img src="" alt="" class="lightbox-img" />
                        <button class="lightbox-next" aria-label="Next">›</button>
                    </div>
                </div>
            </section>
        `;
    }

    init() {
        this.initLightbox();
        this.initMosaicAnimation();
    }

    initLightbox() {
        const lightbox = document.getElementById('aboutLightbox');
        if (!lightbox) return;

        const overlay = lightbox.querySelector('.lightbox-overlay');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const mosaicItems = document.querySelectorAll('.mosaic-item');
        const images = Array.from(mosaicItems).map(item => item.querySelector('img').src);
        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            lightboxImg.src = images[currentIndex];
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            lightboxImg.src = images[currentIndex];
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % images.length;
            lightboxImg.src = images[currentIndex];
        }

        mosaicItems.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
        });

        overlay.addEventListener('click', closeLightbox);
        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
        nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        });
    }

    initMosaicAnimation() {
        const items = document.querySelectorAll('.mosaic-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            item.style.transitionDelay = `${0.1 + index * 0.12}s`;

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                });
            });
        });
    }
}
