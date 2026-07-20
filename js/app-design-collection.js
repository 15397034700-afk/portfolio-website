/**
 * Design Collection — Horizontal Album Browser
 * Apple Gallery-style horizontal scroll for each catalog
 */

class HorizontalAlbum {
    constructor(albumEl) {
        this.album = albumEl;
        this.albumName = albumEl.dataset.album;
        this.track = albumEl.querySelector('.album-track');
        this.pages = Array.from(albumEl.querySelectorAll('.album-page'));
        this.currentIndex = 0;
        this.isActive = false;
        this.scrollAccumulator = 0;
        this.scrollThreshold = 80;
        this.touchStartX = 0;
        this.isAnimating = false;

        this.bindScroll();
        this.bindKeys();
        this.bindTouch();
        this.bindClick();
    }

    activate() {
        this.isActive = true;
        this.updateCurrentPage();
    }

    deactivate() {
        this.isActive = false;
    }

    bindScroll() {
        window.addEventListener('wheel', (e) => {
            if (!this.isActive) return;
            if (window.app.state.activeAlbum !== this.albumName) return;

            const absX = Math.abs(e.deltaX);
            const absY = Math.abs(e.deltaY);

            // Capture horizontal wheel/trackpad
            if (absX > absY && absX > 4) {
                e.preventDefault();
                this.scrollAccumulator += e.deltaX;
            } else if (e.shiftKey && absY > 4) {
                // Vertical scroll with shift = horizontal
                e.preventDefault();
                this.scrollAccumulator += e.deltaY;
            } else {
                // Allow vertical scroll to pass through to next section
                return;
            }

            if (this.isAnimating) return;

            if (this.scrollAccumulator > this.scrollThreshold) {
                this.next();
                this.scrollAccumulator = 0;
            } else if (this.scrollAccumulator < -this.scrollThreshold) {
                this.prev();
                this.scrollAccumulator = 0;
            }
        }, { passive: false });
    }

    bindKeys() {
        window.addEventListener('keydown', (e) => {
            if (!this.isActive) return;
            if (window.app.state.activeAlbum !== this.albumName) return;

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                this.next();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                this.prev();
            }
        });
    }

    bindTouch() {
        this.track.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        }, { passive: true });

        this.track.addEventListener('touchend', (e) => {
            if (!this.isActive) return;
            const diff = this.touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) this.next();
                else this.prev();
            }
        }, { passive: true });
    }

    bindClick() {
        this.pages.forEach(page => {
            const leftZone = page.querySelector('.click-left');
            const rightZone = page.querySelector('.click-right');

            if (leftZone) {
                leftZone.addEventListener('click', (e) => {
                    if (!this.isActive) return;
                    if (window.app.state.activeAlbum !== this.albumName) return;
                    e.stopPropagation();
                    this.prev();
                });
            }

            if (rightZone) {
                rightZone.addEventListener('click', (e) => {
                    if (!this.isActive) return;
                    if (window.app.state.activeAlbum !== this.albumName) return;
                    e.stopPropagation();
                    this.next();
                });
            }
        });
    }

    next() {
        if (this.currentIndex >= this.pages.length - 1) {
            // Exit album — go to next section
            this.exitAlbum('next');
            return;
        }
        this.goTo(this.currentIndex + 1);
    }

    prev() {
        if (this.currentIndex <= 0) {
            // Exit album — go back to project list
            this.exitAlbum('prev');
            return;
        }
        this.goTo(this.currentIndex - 1);
    }

    goTo(index) {
        if (index < 0 || index >= this.pages.length) return;
        if (this.isAnimating) return;

        this.isAnimating = true;
        const direction = index > this.currentIndex ? 1 : -1;

        const currentPage = this.pages[this.currentIndex];
        const nextPage = this.pages[index];

        // Exit current page
        currentPage.classList.remove('is-current');
        currentPage.classList.add(direction > 0 ? 'is-exit-left' : 'is-exit-right');

        // Enter new page
        nextPage.classList.remove('is-exit-left', 'is-exit-right');
        nextPage.classList.add('is-current');

        this.currentIndex = index;
        this.updateProgress();

        setTimeout(() => {
            currentPage.classList.remove('is-exit-left', 'is-exit-right');
            this.isAnimating = false;
        }, 800);
    }

    updateCurrentPage() {
        this.pages.forEach((page, i) => {
            page.classList.remove('is-current', 'is-exit-left', 'is-exit-right');
            if (i === this.currentIndex) {
                page.classList.add('is-current');
            }
        });
        this.updateProgress();
    }

    updateProgress() {
        const total = this.pages.length;
        const current = this.currentIndex + 1;
        const progress = (current / total) * 100;
        const progressBar = document.querySelector('.dc-progress .progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }

    exitAlbum(direction) {
        if (direction === 'next') {
            if (this.albumName === 'tosummer') {
                // Move to RIMOWA transition + RIMOWA album
                window.app.goToRimowa();
            } else {
                // End of archive
                window.app.goToEnd();
            }
        } else if (direction === 'prev') {
            // Back to project list
            window.app.goToList();
        }
    }
}

class DesignCollectionApp {
    constructor() {
        this.state = {
            currentSection: 'hero',
            activeAlbum: null
        };

        this.sections = {
            hero: document.getElementById('dc-hero'),
            list: document.getElementById('dc-list'),
            albumTosummer: document.getElementById('dc-album-tosummer'),
            albumRimowa: document.getElementById('dc-album-rimowa'),
            end: document.getElementById('dc-end')
        };

        this.albums = {
            tosummer: new HorizontalAlbum(this.sections.albumTosummer),
            rimowa: new HorizontalAlbum(this.sections.albumRimowa)
        };

        window.app = this;
        this.init();
    }

    init() {
        this.bindProjectList();
        this.bindEndActions();
        this.observeSections();
        this.albums.tosummer.updateCurrentPage();
        this.albums.rimowa.updateCurrentPage();
    }

    bindProjectList() {
        const items = document.querySelectorAll('.dc-list-item');
        items.forEach(item => {
            const right = item.querySelector('.list-item-right');
            if (right) {
                right.addEventListener('click', (e) => {
                    e.preventDefault();
                    const catalog = item.dataset.catalog;
                    if (catalog === 'tosummer') {
                        this.enterAlbum('tosummer');
                    } else if (catalog === 'rimowa') {
                        this.enterAlbum('rimowa');
                    }
                });
            }
        });
    }

    bindEndActions() {
        const backProjects = document.querySelector('[data-action="back-projects"]');
        if (backProjects) {
            backProjects.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToList();
            });
        }
    }

    observeSections() {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    this.onSectionVisible(id);
                }
            });
        }, { threshold: 0.5 });

        Object.values(this.sections).forEach(section => {
            if (section) sectionObserver.observe(section);
        });
    }

    onSectionVisible(id) {
        // Deactivate all albums first
        this.albums.tosummer.deactivate();
        this.albums.rimowa.deactivate();
        this.state.activeAlbum = null;

        if (id === 'dc-album-tosummer') {
            this.albums.tosummer.activate();
            this.state.activeAlbum = 'tosummer';
        } else if (id === 'dc-album-rimowa') {
            this.albums.rimowa.activate();
            this.state.activeAlbum = 'rimowa';
        } else if (id === 'dc-hero') {
            this.state.currentSection = 'hero';
        } else if (id === 'dc-list') {
            this.state.currentSection = 'list';
        } else if (id === 'dc-end') {
            this.state.currentSection = 'end';
        }

        this.updateProgress();
    }

    enterAlbum(name) {
        this.state.activeAlbum = name;
        const target = name === 'tosummer' ? this.sections.albumTosummer : this.sections.albumRimowa;
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }

    goToRimowa() {
        this.albums.tosummer.deactivate();
        // Jump directly to RIMOWA album
        this.albums.rimowa.activate();
        this.state.activeAlbum = 'rimowa';
        this.sections.albumRimowa.scrollIntoView({ behavior: 'smooth' });
    }

    goToEnd() {
        this.albums.rimowa.deactivate();
        this.state.activeAlbum = null;
        this.sections.end.scrollIntoView({ behavior: 'smooth' });
    }

    goToList() {
        this.albums.tosummer.deactivate();
        this.albums.rimowa.deactivate();
        this.state.activeAlbum = null;
        // Reset albums
        this.albums.tosummer.currentIndex = 0;
        this.albums.rimowa.currentIndex = 0;
        this.albums.tosummer.updateCurrentPage();
        this.albums.rimowa.updateCurrentPage();
        this.sections.list.scrollIntoView({ behavior: 'smooth' });
    }

    updateProgress() {
        const progressBar = document.querySelector('.dc-progress .progress-bar');
        if (!progressBar) return;

        if (this.state.activeAlbum === 'tosummer') {
            const total = this.albums.tosummer.pages.length;
            const current = this.albums.tosummer.currentIndex + 1;
            progressBar.style.width = `${(current / total) * 100}%`;
            progressBar.parentElement.style.opacity = '1';
        } else if (this.state.activeAlbum === 'rimowa') {
            const total = this.albums.rimowa.pages.length;
            const current = this.albums.rimowa.currentIndex + 1;
            progressBar.style.width = `${(current / total) * 100}%`;
            progressBar.parentElement.style.opacity = '1';
        } else {
            progressBar.parentElement.style.opacity = '0';
        }
    }
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
    new DesignCollectionApp();
});