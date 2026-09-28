import { navItems } from '../data/works.js';

export class Navigation {
    constructor({ works }) {
        this.works = works;
        this.items = navItems;
    }

    render() {
        return `
            <nav class="sidebar-nav">
                <div class="sidebar-nav-line"></div>
                
                <div class="sidebar-nav-items">
                    ${this.items.map(item => this.renderNavItem(item)).join('')}
                </div>
                
                <div class="sidebar-sound-tag">
                    <div class="sound-tag-string"></div>
                    <div class="sound-tag-paper">
                        Sound
                        <span>ON</span>
                    </div>
                </div>
            </nav>
            
            <header class="mobile-header">
                <div class="mobile-header-left">
                    <span class="mobile-logo">Chen Ming</span>
                </div>
                <button type="button" class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer">
                    <span class="menu-icon"></span>
                    <span class="menu-icon"></span>
                    <span class="menu-icon"></span>
                </button>
            </header>
            
            <div class="mobile-drawer" id="mobile-drawer" role="dialog" aria-modal="true" aria-labelledby="mobile-drawer-title" aria-hidden="true" inert>
                <div class="mobile-drawer-overlay" id="mobile-drawer-overlay"></div>
                <div class="mobile-drawer-content">
                    <div class="mobile-drawer-header">
                        <span class="mobile-drawer-title" id="mobile-drawer-title">Menu</span>
                        <button type="button" class="mobile-drawer-close" id="mobile-drawer-close" aria-label="Close menu">
                            <span>✕</span>
                        </button>
                    </div>
                    <nav class="mobile-drawer-nav">
                        ${this.items.map(item => this.renderMobileNavItem(item)).join('')}
                    </nav>
                </div>
            </div>
        `;
    }

    renderNavItem(item) {
        const isWorks = item.id === 'works';

        return `
            <div class="sidebar-nav-group">
                <button type="button" class="sidebar-nav-item ${item.id === 'home' ? 'active' : ''}" data-section="${item.id}">
                    ${item.number ? `<span class="sidebar-nav-number">${item.number}</span>` : ''}
                    <span class="sidebar-nav-label">${item.label}</span>
                </button>

                ${isWorks && item.subItems ? `
                    <div class="sidebar-nav-subitems">
                        ${item.subItems.map(sub => `
                            <button type="button" class="sidebar-nav-subitem" data-project="${sub.id}">
                                ${sub.label}
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderMobileNavItem(item) {
        const isWorks = item.id === 'works';

        return `
            <div class="mobile-nav-group">
                <button type="button" class="mobile-nav-item ${item.id === 'home' ? 'active' : ''}" data-section="${item.id}">
                    ${item.number ? `<span class="mobile-nav-number">${item.number}</span>` : ''}
                    <span class="mobile-nav-label">${item.label}</span>
                </button>

                ${isWorks && item.subItems ? `
                    <div class="mobile-nav-subitems">
                        ${item.subItems.map(sub => `
                            <button type="button" class="mobile-nav-subitem" data-project="${sub.id}">
                                ${sub.label}
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    init() {
        this.bindMobileEvents();
    }

    bindMobileEvents() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const drawer = document.getElementById('mobile-drawer');
        const overlay = document.getElementById('mobile-drawer-overlay');
        const closeBtn = document.getElementById('mobile-drawer-close');
        if (!menuBtn || !drawer || !closeBtn) return;

        let previousFocus = null;
        const openDrawer = () => {
            previousFocus = document.activeElement === document.body ? menuBtn : document.activeElement;
            drawer.inert = false;
            drawer.classList.add('open');
            drawer.setAttribute('aria-hidden', 'false');
            menuBtn.setAttribute('aria-expanded', 'true');
            menuBtn.setAttribute('aria-label', 'Close menu');
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
        };

        const closeDrawer = (restoreFocus = true) => {
            if (!drawer.classList.contains('open')) return;
            drawer.classList.remove('open');
            drawer.setAttribute('aria-hidden', 'true');
            drawer.inert = true;
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', 'Open menu');
            document.body.style.overflow = '';
            if (restoreFocus) {
                const destination = previousFocus?.isConnected ? previousFocus : menuBtn;
                destination.focus();
            }
        };

        menuBtn.addEventListener('click', () => {
            if (drawer.classList.contains('open')) closeDrawer();
            else openDrawer();
        });
        overlay?.addEventListener('click', () => closeDrawer());
        closeBtn.addEventListener('click', () => closeDrawer());

        drawer.querySelectorAll('.mobile-nav-item, .mobile-nav-subitem').forEach(item => {
            item.addEventListener('click', () => closeDrawer(false));
        });

        document.addEventListener('keydown', (event) => {
            if (!drawer.classList.contains('open')) return;

            if (event.key === 'Escape') {
                event.preventDefault();
                closeDrawer();
            } else if (event.key === 'Tab') {
                const focusable = Array.from(drawer.querySelectorAll('button:not([disabled])'));
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        });
    }
}
