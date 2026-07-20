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
                <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle menu">
                    <span class="menu-icon"></span>
                    <span class="menu-icon"></span>
                    <span class="menu-icon"></span>
                </button>
            </header>
            
            <div class="mobile-drawer" id="mobile-drawer">
                <div class="mobile-drawer-overlay" id="mobile-drawer-overlay"></div>
                <div class="mobile-drawer-content">
                    <div class="mobile-drawer-header">
                        <span class="mobile-drawer-title">Menu</span>
                        <button class="mobile-drawer-close" id="mobile-drawer-close" aria-label="Close menu">
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
                <div class="sidebar-nav-item ${item.id === 'home' ? 'active' : ''}" data-section="${item.id}">
                    ${item.number ? `<span class="sidebar-nav-number">${item.number}</span>` : ''}
                    <span class="sidebar-nav-label">${item.label}</span>
                </div>
                
                ${isWorks && item.subItems ? `
                    <div class="sidebar-nav-subitems">
                        ${item.subItems.map(sub => `
                            <div class="sidebar-nav-subitem" data-project="${sub.id}">
                                ${sub.label}
                            </div>
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
                <div class="mobile-nav-item ${item.id === 'home' ? 'active' : ''}" data-section="${item.id}">
                    ${item.number ? `<span class="mobile-nav-number">${item.number}</span>` : ''}
                    <span class="mobile-nav-label">${item.label}</span>
                </div>
                
                ${isWorks && item.subItems ? `
                    <div class="mobile-nav-subitems">
                        ${item.subItems.map(sub => `
                            <div class="mobile-nav-subitem" data-project="${sub.id}">
                                ${sub.label}
                            </div>
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
        
        const openDrawer = () => {
            drawer.classList.add('open');
            document.body.style.overflow = 'hidden';
        };
        
        const closeDrawer = () => {
            drawer.classList.remove('open');
            document.body.style.overflow = '';
        };
        
        menuBtn?.addEventListener('click', openDrawer);
        overlay?.addEventListener('click', closeDrawer);
        closeBtn?.addEventListener('click', closeDrawer);
        
        document.querySelectorAll('.mobile-nav-item, .mobile-nav-subitem').forEach(item => {
            item.addEventListener('click', closeDrawer);
        });
    }
}
