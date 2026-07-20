/**
 * createCommentSphere - 真正的 3D 评论球（优化版）
 *
 * 使用 Three.js + CSS3DRenderer + OrbitControls
 * - Fibonacci Sphere 算法均匀分布节点到真实球面
 * - 三层节点体系：主节点、次节点、辅助节点
 * - 节点朝向球体外侧 + 曲面倾斜
 * - 加强景深：scale/opacity/blur/pointer-events/z-index
 * - 自动旋转 + 用户拖拽 + 悬停暂停
 * - 极淡球面辅助线（SVG）
 * - 静态降级方案
 */

let THREE = null;
let CSS3DRenderer = null;
let CSS3DObject = null;
let OrbitControls = null;
let threeLoaded = false;
let loadAttempted = false;

async function loadThreeModules() {
    if (loadAttempted) return threeLoaded;
    loadAttempted = true;
    try {
        THREE = await import('three');
        const rendererMod = await import('three/addons/renderers/CSS3DRenderer.js');
        CSS3DRenderer = rendererMod.CSS3DRenderer;
        CSS3DObject = rendererMod.CSS3DObject;
        const controlsMod = await import('three/addons/controls/OrbitControls.js');
        OrbitControls = controlsMod.OrbitControls;
        threeLoaded = true;
    } catch (err) {
        console.warn('[VoiceSphere] Three.js load failed:', err);
        threeLoaded = false;
    }
    return threeLoaded;
}

/* ============ 工具函数 ============ */

function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function fibonacciSpherePositions(count, radius) {
    const positions = [];
    for (let i = 0; i < count; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / count);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        positions.push({ x, y, z });
    }
    return positions;
}

function generatePrimarySummary(text) {
    if (!text) return '';
    const isChinese = /[\u4e00-\u9fff]/.test(text);
    if (isChinese) {
        const cleaned = text.replace(/\s+/g, ' ').trim();
        const sentences = cleaned.split(/[。！？.!?]/).filter(s => s.trim().length > 0);
        if (sentences.length > 0) {
            const sentence = sentences[0].trim();
            return sentence.length > 25 ? sentence.slice(0, 25) + '…' : sentence;
        }
        return cleaned.slice(0, 25);
    } else {
        const words = text.trim().split(/\s+/);
        const count = Math.min(12, Math.max(5, Math.ceil(words.length * 0.25)));
        return words.slice(0, count).join(' ');
    }
}

function generateSecondarySummary(text) {
    if (!text) return '';
    const isChinese = /[\u4e00-\u9fff]/.test(text);
    if (isChinese) {
        const cleaned = text.replace(/\s+/g, ' ').trim();
        const sentences = cleaned.split(/[。！？.!?]/).filter(s => s.trim().length > 0);
        if (sentences.length > 0) {
            const sentence = sentences[0].trim();
            return sentence.length > 20 ? sentence.slice(0, 20) + '…' : sentence;
        }
        return cleaned.slice(0, 20);
    } else {
        const words = text.trim().split(/\s+/);
        const count = Math.min(9, Math.max(4, Math.ceil(words.length * 0.2)));
        return words.slice(0, count).join(' ');
    }
}

function generateFragment(text) {
    if (!text) return '';
    const isChinese = /[\u4e00-\u9fff]/.test(text);
    if (isChinese) {
        return text.replace(/\s+/g, ' ').trim().slice(0, 2 + Math.floor(Math.random() * 4));
    } else {
        const words = text.trim().split(/\s+/);
        return words.slice(0, 1 + Math.floor(Math.random() * 3)).join(' ');
    }
}

function generateShortSummary(text) {
    if (!text) return '';
    const isChinese = /[\u4e00-\u9fff]/.test(text);
    if (isChinese) {
        const cleaned = text.replace(/\s+/g, ' ').trim();
        const sentences = cleaned.split(/[。！？.!?]/).filter(s => s.trim().length > 0);
        if (sentences.length > 0) {
            const sentence = sentences[0].trim();
            return sentence.length > 18 ? sentence.slice(0, 18) + '…' : sentence;
        }
        return cleaned.slice(0, 18);
    } else {
        const words = text.trim().split(/\s+/);
        const count = Math.min(7, Math.max(3, Math.ceil(words.length * 0.15)));
        return words.slice(0, count).join(' ');
    }
}

/* ============ 球体轮廓 SVG ============ */

function createSphereOutlineSVG() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.classList.add('sphere-outline-svg');
    svg.innerHTML = `
        <ellipse cx="100" cy="100" rx="96" ry="96" fill="none" stroke="rgba(130,125,115,0.08)" stroke-width="0.35"/>
        <ellipse cx="100" cy="100" rx="96" ry="45" fill="none" stroke="rgba(130,125,115,0.06)" stroke-width="0.3"/>
        <ellipse cx="100" cy="100" rx="96" ry="70" fill="none" stroke="rgba(130,125,115,0.05)" stroke-width="0.25"/>
        <ellipse cx="100" cy="100" rx="96" ry="25" fill="none" stroke="rgba(130,125,115,0.05)" stroke-width="0.25"/>
        <ellipse cx="100" cy="100" rx="45" ry="96" fill="none" stroke="rgba(130,125,115,0.06)" stroke-width="0.3"/>
        <ellipse cx="100" cy="100" rx="70" ry="96" fill="none" stroke="rgba(130,125,115,0.05)" stroke-width="0.25"/>
        <ellipse cx="100" cy="100" rx="25" ry="96" fill="none" stroke="rgba(130,125,115,0.05)" stroke-width="0.25"/>
        <ellipse cx="100" cy="100" rx="82" ry="82" fill="none" stroke="rgba(130,125,115,0.04)" stroke-width="0.2"/>
        <ellipse cx="100" cy="100" rx="60" ry="60" fill="none" stroke="rgba(130,125,115,0.04)" stroke-width="0.2"/>
    `;
    return svg;
}

/* ============ 静态降级 ============ */

function renderStaticFallback(container, comments, options) {
    const { nodeColor = 'sage', onClick = null } = options;
    const isMobile = window.innerWidth < 720;
    const visible = shuffleArray(comments).slice(0, isMobile ? 18 : 28);
    const radius = isMobile ? 140 : 180;
    const positions = fibonacciSpherePositions(visible.length, radius);

    container.classList.add('voice-sphere-static');
    container.innerHTML = '';

    const cloud = document.createElement('div');
    cloud.className = 'static-cloud';
    container.appendChild(cloud);

    visible.forEach((c, i) => {
        const p = positions[i];
        const node = document.createElement('div');
        const tier = i < 6 ? 'primary' : (i < 18 ? 'secondary' : 'auxiliary');
        node.className = `static-node static-${nodeColor} static-${tier}`;
        node.innerHTML = `<span class="static-node-text">${tier === 'auxiliary' ? generateFragment(c.comment) : generateSecondarySummary(c.comment)}</span>`;
        node.style.left = `calc(50% + ${p.x}px)`;
        node.style.top = `calc(50% + ${p.y}px)`;
        const depth = (p.z + radius) / (radius * 2);
        node.style.transform = `translate(-50%, -50%) scale(${0.5 + depth * 0.6})`;
        node.style.opacity = 0.15 + depth * 0.85;
        node.addEventListener('click', () => onClick && onClick(c));
        cloud.appendChild(node);
    });
}

/* ============ 核心：创建 3D 评论球 ============ */

export async function createCommentSphere({
    container,
    comments,
    platform,
    nodeColor = 'sage',
    rotationDirection = 1,
    onClick = null
}) {
    const ready = await loadThreeModules();
    if (!ready) {
        renderStaticFallback(container, comments, { nodeColor, onClick });
        return null;
    }

    const isMobile = window.innerWidth < 720;
    const radius = isMobile ? 240 : 320;
    const totalCount = isMobile ? 240 : 360;
    const primaryCount = isMobile ? 12 : 20;
    const secondaryCount = isMobile ? 55 : 90;
    const auxiliaryCount = totalCount - primaryCount - secondaryCount;

    /* --- Scene / Camera / Renderer --- */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 1, 3000);
    camera.position.set(0, 0, radius * 1.85);

    const renderer = new CSS3DRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    container.appendChild(renderer.domElement);

    /* --- 球体轮廓 SVG --- */
    const outlineSVG = createSphereOutlineSVG();
    container.appendChild(outlineSVG);

    /* --- 球体 Group --- */
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    /* --- 状态 --- */
    const state = {
        hovered: null,
        dragging: false,
        autoRotate: true,
        resumeTimer: null,
        visible: true,
        rafId: null,
        destroyed: false,
        currentSubset: []
    };

    /* --- 创建节点 --- */
    const objects = [];

    function buildNodes() {
        objects.forEach(obj => {
            sphereGroup.remove(obj);
            if (obj.element && obj.element.parentNode) {
                obj.element.parentNode.removeChild(obj.element);
            }
        });
        objects.length = 0;

        const expandedComments = [];
        for (let i = 0; i < totalCount; i++) {
            expandedComments.push(comments[i % comments.length]);
        }
        const shuffled = shuffleArray(expandedComments);
        state.currentSubset = shuffled;
        const positions = fibonacciSpherePositions(totalCount, radius);

        // 按深度区域分配节点：前/中/后各层都要有文本节点
        const depthZones = { front: [], middle: [], back: [] };
        positions.forEach((p, i) => {
            const normalizedZ = (p.z + radius) / (radius * 2);
            if (normalizedZ > 0.66) depthZones.front.push(i);
            else if (normalizedZ > 0.33) depthZones.middle.push(i);
            else depthZones.back.push(i);
        });

        // 每个区域分配文本节点
        const primaryPerZone = Math.ceil(primaryCount / 3);
        const secondaryPerZone = Math.ceil(secondaryCount / 3);

        const primaryIndices = new Set();
        const secondaryIndices = new Set();

        ['front', 'middle', 'back'].forEach(zone => {
            const shuffledZone = shuffleArray([...depthZones[zone]]);
            let pCount = 0, sCount = 0;
            for (let i = 0; i < shuffledZone.length && (pCount < primaryPerZone || sCount < secondaryPerZone); i++) {
                if (pCount < primaryPerZone) {
                    primaryIndices.add(shuffledZone[i]);
                    pCount++;
                } else if (sCount < secondaryPerZone) {
                    secondaryIndices.add(shuffledZone[i]);
                    sCount++;
                }
            }
        });

        // 如果还有剩余名额，随机补充
        const remainingIndices = positions.map((_, i) => i)
            .filter(i => !primaryIndices.has(i) && !secondaryIndices.has(i));
        const shuffledRemaining = shuffleArray(remainingIndices);
        let extraPrimary = primaryCount - primaryIndices.size;
        let extraSecondary = secondaryCount - secondaryIndices.size;
        for (let i = 0; i < shuffledRemaining.length && (extraPrimary > 0 || extraSecondary > 0); i++) {
            if (extraPrimary > 0) {
                primaryIndices.add(shuffledRemaining[i]);
                extraPrimary--;
            } else if (extraSecondary > 0) {
                secondaryIndices.add(shuffledRemaining[i]);
                extraSecondary--;
            }
        }

        shuffled.forEach((c, i) => {
            const p = positions[i];
            const isPrimary = primaryIndices.has(i);
            const isSecondary = secondaryIndices.has(i);
            const tier = isPrimary ? 'primary' : (isSecondary ? 'secondary' : 'auxiliary');

            const div = document.createElement('div');
            div.className = `voice-3d-node voice-3d-${nodeColor} voice-3d-${tier}`;
            div.dataset.id = c.id;
            div.dataset.full = c.comment;

            const inner = document.createElement('div');
            inner.className = 'voice-3d-inner';

            if (isPrimary) {
                const summary = generatePrimarySummary(c.comment);
                inner.innerHTML = `<span class="voice-3d-text">${summary}</span>`;
            } else if (isSecondary) {
                const summary = generateSecondarySummary(c.comment);
                inner.innerHTML = `<span class="voice-3d-text">${summary}</span>`;
            } else {
                const decoType = Math.floor(Math.random() * 20);
                if (decoType === 0) {
                    inner.innerHTML = `<span class="voice-3d-dot-mark"></span>`;
                } else if (decoType === 1) {
                    inner.innerHTML = `<span class="voice-3d-line-mark"></span>`;
                } else if (decoType === 2) {
                    inner.innerHTML = `<span class="voice-3d-fragment">${generateShortSummary(c.comment)}</span>`;
                } else if (decoType === 3) {
                    inner.innerHTML = `<span class="voice-3d-word">${generateShortSummary(c.comment)}</span>`;
                } else {
                    const shortSummary = generateShortSummary(c.comment);
                    inner.innerHTML = `<span class="voice-3d-mini-text">${shortSummary}</span>`;
                }
            }

            div.appendChild(inner);

            const obj = new CSS3DObject(div);
            obj.position.set(p.x, p.y, p.z);

            // 朝向球体外侧
            const outward = obj.position.clone().normalize();
            const target = obj.position.clone().add(outward);
            obj.lookAt(target);

            // 轻微曲面倾斜
            const phi = Math.acos(p.y / radius);
            const theta = Math.atan2(p.x, p.z);
            obj.rotateZ((Math.random() - 0.5) * 0.14);
            obj.rotateX((Math.random() - 0.5) * 0.10);

            sphereGroup.add(obj);
            objects.push(obj);

            // 事件
            if (tier !== 'auxiliary') {
                div.addEventListener('mouseenter', () => {
                    state.hovered = obj;
                    state.autoRotate = false;
                    div.classList.add('hovered');
                });
                div.addEventListener('mouseleave', () => {
                    state.hovered = null;
                    div.classList.remove('hovered');
                    clearTimeout(state.resumeTimer);
                    state.resumeTimer = setTimeout(() => {
                        state.autoRotate = true;
                    }, 600);
                });
            }

            div.addEventListener('click', (e) => {
                e.stopPropagation();
                if (onClick) onClick(c);
            });
        });
    }

    buildNodes();

    /* --- OrbitControls --- */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.rotateSpeed = 0.35;

    controls.addEventListener('start', () => {
        state.dragging = true;
        state.autoRotate = false;
    });
    controls.addEventListener('end', () => {
        state.dragging = false;
        clearTimeout(state.resumeTimer);
        state.resumeTimer = setTimeout(() => {
            state.autoRotate = true;
        }, 1800);
    });

    /* --- 景深更新 --- */
    const tempVec = new THREE.Vector3();

    function updateDepth() {
        objects.forEach(obj => {
            obj.getWorldPosition(tempVec);
            const normalizedDepth = (tempVec.z + radius) / (radius * 2);

            let scale, opacity, blur;

            if (normalizedDepth > 0.6) {
                scale = 0.78 + (normalizedDepth - 0.6) * 0.6;
                opacity = 0.65 + (normalizedDepth - 0.6) * 0.6;
                blur = 0;
            } else if (normalizedDepth > 0.3) {
                scale = 0.58 + (normalizedDepth - 0.3) * 0.67;
                opacity = 0.32 + (normalizedDepth - 0.3) * 1.1;
                blur = Math.max(0, (0.6 - normalizedDepth) * 0.4);
            } else {
                scale = 0.48 + normalizedDepth * 0.43;
                opacity = 0.28 + normalizedDepth * 0.47;
                blur = (0.3 - normalizedDepth) * 0.8;
            }

            obj.element.style.pointerEvents = normalizedDepth > 0.2 ? 'auto' : 'none';

            const inner = obj.element.querySelector('.voice-3d-inner');
            if (inner) {
                inner.style.opacity = Math.min(1, Math.max(0.02, opacity));
                inner.style.transform = `scale(${scale})`;
                inner.style.filter = blur > 0.1 ? `blur(${blur.toFixed(2)}px)` : '';
            }
            obj.element.style.zIndex = Math.round(normalizedDepth * 1000);

            if (state.hovered && state.hovered !== obj) {
                if (inner) {
                    const currentOpacity = parseFloat(inner.style.opacity);
                    inner.style.opacity = (currentOpacity * 0.78).toFixed(3);
                }
            }
        });
    }

    /* --- 动画循环 --- */
    let timeOffset = 0;

    function animate() {
        if (state.destroyed) return;
        state.rafId = requestAnimationFrame(animate);
        if (!state.visible) return;

        if (state.autoRotate) {
            sphereGroup.rotation.y += 0.0010 * rotationDirection;
            timeOffset += 0.002;
            sphereGroup.rotation.x = Math.sin(timeOffset) * 0.03;
        }

        controls.update();
        updateDepth();
        renderer.render(scene, camera);
    }
    animate();

    /* --- 可见性检测 --- */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            state.visible = entry.isIntersecting;
        });
    }, { threshold: 0.05 });
    observer.observe(container);

    /* --- 响应式 --- */
    function handleResize() {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }
    window.addEventListener('resize', handleResize);

    /* --- 返回 API --- */
    return {
        refresh() {
            buildNodes();
        },
        destroy() {
            state.destroyed = true;
            cancelAnimationFrame(state.rafId);
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
            clearTimeout(state.resumeTimer);
            controls.dispose();
            objects.forEach(obj => {
                sphereGroup.remove(obj);
                if (obj.element && obj.element.parentNode) {
                    obj.element.parentNode.removeChild(obj.element);
                }
            });
            if (renderer.domElement && renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
            if (outlineSVG && outlineSVG.parentNode) {
                outlineSVG.parentNode.removeChild(outlineSVG);
            }
        }
    };
}
