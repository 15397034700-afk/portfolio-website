export class Trunk {
    constructor({ path }) {
        this.path = path;
        this.element = null;
    }

    render() {
        return `
            <g class="tree-trunk">
                <path 
                    id="tree-trunk-path"
                    d="${this.path}"
                    stroke="var(--color-tree-trunk)"
                    stroke-width="5"
                    fill="none"
                    stroke-linecap="round"
                    style="stroke-dasharray: 3000; stroke-dashoffset: 3000;"
                />
                <path 
                    d="${this.path}"
                    stroke="var(--color-tree-light)"
                    stroke-width="3"
                    fill="none"
                    stroke-linecap="round"
                    opacity="0.5"
                    style="stroke-dasharray: 3000; stroke-dashoffset: 3000;"
                />
                ${this.createBarkTexture()}
            </g>
        `;
    }

    createBarkTexture() {
        const points = [
            { x: 170, y: 1900 },
            { x: 175, y: 1700 },
            { x: 170, y: 1500 },
            { x: 180, y: 1300 },
            { x: 175, y: 1100 },
            { x: 180, y: 900 },
            { x: 175, y: 700 }
        ];
        
        return points.map((point, i) => `
            <g transform="translate(${point.x}, ${point.y})">
                <path d="M 0 0 Q ${-2 - i * 0.2} ${15 + i * 2}, ${0} ${30 + i * 3}" stroke="rgba(168, 155, 138, 0.3)" stroke-width="0.5" fill="none" />
                <path d="M 0 0 Q ${2 + i * 0.2} ${12 + i * 1.5}, ${0} ${25 + i * 2.5}" stroke="rgba(196, 181, 165, 0.2)" stroke-width="0.5" fill="none" />
            </g>
        `).join('');
    }

    animate(duration = 2000) {
        const path = document.getElementById('tree-trunk-path');
        if (!path) return;
        
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.transition = `stroke-dashoffset ${duration}ms ease-out`;
        path.style.strokeDashoffset = '0';
        
        const overlay = path.nextElementSibling;
        if (overlay) {
            overlay.style.strokeDasharray = length;
            overlay.style.transition = `stroke-dashoffset ${duration}ms ease-out`;
            overlay.style.strokeDashoffset = '0';
        }
    }
}

export class Branch {
    constructor({ path, index }) {
        this.path = path;
        this.index = index;
        this.element = null;
    }

    render() {
        const width = 3 - this.index * 0.3;
        
        return `
            <g class="tree-branch" id="branch-${this.index}">
                <path 
                    d="${this.path}"
                    stroke="var(--color-tree-branch)"
                    stroke-width="${Math.max(width, 1.5)}"
                    fill="none"
                    stroke-linecap="round"
                    style="stroke-dasharray: 500; stroke-dashoffset: 500;"
                />
                <path 
                    d="${this.path}"
                    stroke="var(--color-tree-light)"
                    stroke-width="${Math.max(width - 1, 0.5)}"
                    fill="none"
                    stroke-linecap="round"
                    opacity="0.4"
                    style="stroke-dasharray: 500; stroke-dashoffset: 500;"
                />
            </g>
        `;
    }

    animate(duration = 1000) {
        const branch = document.getElementById(`branch-${this.index}`);
        if (!branch) return;
        
        const paths = branch.querySelectorAll('path');
        paths.forEach(path => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.transition = `stroke-dashoffset ${duration}ms ease-out`;
            path.style.strokeDashoffset = '0';
        });
    }
}

export class Node {
    constructor({ position, projectId }) {
        this.position = position;
        this.projectId = projectId;
        this.element = null;
    }

    render() {
        return `
            <g class="tree-node" id="node-${this.projectId}" data-project-id="${this.projectId}">
                <circle 
                    cx="${this.position.x}" 
                    cy="${this.position.y}" 
                    r="8" 
                    fill="var(--color-pink-cherry)" 
                    opacity="0"
                    class="node-outer"
                />
                <circle 
                    cx="${this.position.x}" 
                    cy="${this.position.y}" 
                    r="4" 
                    fill="white" 
                    opacity="0"
                    class="node-inner"
                />
                <circle 
                    cx="${this.position.x}" 
                    cy="${this.position.y}" 
                    r="20" 
                    fill="transparent" 
                    class="node-hitarea"
                />
            </g>
        `;
    }

    animate(delay = 0) {
        setTimeout(() => {
            const node = document.getElementById(`node-${this.projectId}`);
            if (!node) return;
            
            const outer = node.querySelector('.node-outer');
            const inner = node.querySelector('.node-inner');
            
            outer.style.transition = 'all 0.6s ease-out';
            outer.style.opacity = '1';
            outer.style.transform = 'scale(1)';
            
            setTimeout(() => {
                inner.style.transition = 'all 0.4s ease-out';
                inner.style.opacity = '1';
                inner.style.transform = 'scale(1)';
            }, 200);
        }, delay);
    }

    hover(isHover) {
        const node = document.getElementById(`node-${this.projectId}`);
        if (!node) return;
        
        const outer = node.querySelector('.node-outer');
        const inner = node.querySelector('.node-inner');
        
        if (isHover) {
            outer.style.transform = 'scale(1.4)';
            inner.style.transform = 'scale(1.2)';
        } else {
            outer.style.transform = 'scale(1)';
            inner.style.transform = 'scale(1)';
        }
    }
}

export class Leaf {
    constructor({ position, rotation, projectId }) {
        this.position = position;
        this.rotation = rotation;
        this.projectId = projectId;
        this.element = null;
    }

    render() {
        const size = 8 + Math.random() * 4;
        
        return `
            <g class="tree-leaf" id="leaf-${this.projectId}-${Math.random().toString(36).substr(2, 9)}" data-project-id="${this.projectId}" transform="translate(${this.position.x}, ${this.position.y}) rotate(${this.rotation})">
                <path 
                    d="M 0 0 Q ${size * 0.5} ${-size * 0.3}, ${size * 0.3} ${-size} Q 0 ${-size * 0.7}, ${-size * 0.3} ${-size} Q ${-size * 0.5} ${-size * 0.3}, 0 0" 
                    fill="var(--color-green-sage)" 
                    opacity="0"
                    class="leaf-shape"
                />
                <path 
                    d="M 0 0 L 0 ${-size * 0.8}" 
                    stroke="var(--color-green-olive)" 
                    stroke-width="0.5" 
                    fill="none"
                    opacity="0"
                    class="leaf-vein"
                />
            </g>
        `;
    }

    animate(delay = 0) {
        setTimeout(() => {
            const leaf = document.querySelector(`[data-project-id="${this.projectId}"] .leaf-shape`);
            const vein = document.querySelector(`[data-project-id="${this.projectId}"] .leaf-vein`);
            
            if (leaf) {
                leaf.style.transition = 'all 0.5s ease-out';
                leaf.style.opacity = '0.6';
            }
            if (vein) {
                vein.style.transition = 'all 0.5s ease-out';
                vein.style.opacity = '0.4';
            }
        }, delay);
    }

    sway(isSway) {
        const leaf = document.querySelector(`[data-project-id="${this.projectId}"]`);
        if (!leaf) return;
        
        if (isSway) {
            leaf.style.animation = 'sway 1s ease-in-out infinite';
        } else {
            leaf.style.animation = 'none';
        }
    }
}

export class Flower {
    constructor({ position }) {
        this.position = position;
    }

    render() {
        return `
            <g class="tree-flower" transform="translate(${this.position.x}, ${this.position.y})">
                ${[0, 60, 120, 180, 240, 300].map((rot, i) => `
                    <path d="M 0 0 Q 3 -4, 2 -7 Q 0 -5, -2 -7 Q -3 -4, 0 0" fill="rgba(239, 184, 200, ${0.4 - i * 0.05})" transform="rotate(${rot})" opacity="0" class="flower-petal" style="transition: opacity 0.5s ease-out ${i * 0.1}s" />
                `).join('')}
                <circle r="3" fill="rgba(247, 231, 238, 0.6)" opacity="0" class="flower-center" />
            </g>
        `;
    }

    animate(delay = 0) {
        setTimeout(() => {
            const petals = document.querySelectorAll('.flower-petal');
            const center = document.querySelector('.flower-center');
            
            petals.forEach(petal => {
                petal.style.opacity = petal.getAttribute('fill').match(/[\d.]+$/)[0];
            });
            
            if (center) {
                center.style.transition = 'opacity 0.5s ease-out';
                center.style.opacity = '1';
            }
        }, delay);
    }
}