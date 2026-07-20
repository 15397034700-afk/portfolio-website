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

    init() {
    }
}
