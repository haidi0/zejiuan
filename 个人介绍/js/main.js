// ========================================
// 页面加载动画
// ========================================
function initPageLoader() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;

    // 禁止滚动直到加载完成
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        initHeroAnimations();
    }, 2000);
}

// ========================================
// 滚动进度条
// ========================================
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ========================================
// Hero区域动画
// ========================================
function initHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('revealed');
    }
}

// ========================================
// 增强的滚动显示动画
// ========================================
function initEnhancedScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ========================================
// 卡片3D悬停效果
// ========================================
function init3DCardEffect() {
    const cards = document.querySelectorAll('.about-card, .social-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ========================================
// 鼠标跟随光效
// ========================================
function initMouseGlow() {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(168, 213, 186, 0.15) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: left 0.3s ease, top 0.3s ease;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}

// ========================================
// 平滑的锚点滚动
// ========================================
function initSmoothAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// 数字滚动动画
// ========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * easeProgress;

        if (target % 1 !== 0) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

// ========================================
// 打字机效果
// ========================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ========================================
// 星座条形图动画
// ========================================
function animateBars() {
    const bars = document.querySelectorAll('.bar-fill');
    bars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = `${width}%`;
        }, index * 200);
    });
}

// ========================================
// 标签页切换
// ========================================
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const targetId = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// ========================================
// 雷达图绘制
// ========================================
function drawRadarChart() {
    const svg = document.querySelector('.radar-chart');
    if (!svg) return;

    const centerX = 200;
    const centerY = 200;
    const radius = 150;
    const levels = 5;

    const skills = [
        { name: '内容创作', value: 90 },
        { name: 'AI工具', value: 40 },
        { name: '平台运营', value: 80 },
        { name: '数据分析', value: 30 },
        { name: '沟通协调', value: 85 }
    ];

    const angleStep = (2 * Math.PI) / skills.length;

    svg.innerHTML = '';

    // 绘制背景网格
    for (let i = 1; i <= levels; i++) {
        const levelRadius = (radius / levels) * i;
        let points = '';

        for (let j = 0; j < skills.length; j++) {
            const angle = j * angleStep - Math.PI / 2;
            const x = centerX + levelRadius * Math.cos(angle);
            const y = centerY + levelRadius * Math.sin(angle);
            points += `${x},${y} `;
        }

        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', points.trim());
        polygon.setAttribute('fill', 'none');
        polygon.setAttribute('stroke', '#C9E4CA');
        polygon.setAttribute('stroke-width', '1');
        svg.appendChild(polygon);
    }

    // 绘制轴线
    for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', centerX);
        line.setAttribute('y1', centerY);
        line.setAttribute('x2', x);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', '#C9E4CA');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);
    }

    // 绘制数据点和连线
    let dataPoints = '';
    for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const valueRadius = (skills[i].value / 100) * radius;
        const x = centerX + valueRadius * Math.cos(angle);
        const y = centerY + valueRadius * Math.sin(angle);

        dataPoints += `${x},${y} `;

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '6');
        circle.setAttribute('fill', '#5A8F6B');
        circle.setAttribute('stroke', 'white');
        circle.setAttribute('stroke-width', '2');
        svg.appendChild(circle);
    }

    // 数据区域
    const dataPolygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    dataPolygon.setAttribute('points', dataPoints.trim());
    dataPolygon.setAttribute('fill', 'rgba(90, 143, 107, 0.3)');
    dataPolygon.setAttribute('stroke', '#5A8F6B');
    dataPolygon.setAttribute('stroke-width', '2');
    svg.appendChild(dataPolygon);

    // 添加标签
    for (let i = 0; i < skills.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const labelRadius = radius + 30;
        const x = centerX + labelRadius * Math.cos(angle);
        const y = centerY + labelRadius * Math.sin(angle);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('fill', '#5D6B5E');
        text.setAttribute('font-size', '14');
        text.textContent = skills[i].name;
        svg.appendChild(text);
    }
}

// ========================================
// 照片墙Lightbox效果
// ========================================
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close">&times;</button>
        <img class="lightbox-img" src="" alt="">
        <div class="lightbox-caption"></div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption');

            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption ? caption.textContent : '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// IP板块动画
// ========================================
function initIPSection() {
    const ipSection = document.querySelector('.ip-section');
    if (!ipSection) return;

    const ipName = ipSection.querySelector('.ip-name');
    const poemLines = ipSection.querySelectorAll('.poem-line');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (ipName) {
                    ipName.style.opacity = '1';
                    ipName.style.transform = 'translateY(0)';
                }
                poemLines.forEach((line, index) => {
                    setTimeout(() => {
                        line.style.opacity = '1';
                        line.style.transform = 'translateY(0)';
                    }, index * 300);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(ipSection);
}

// ========================================
// 为各个区块添加滚动动画类
// ========================================
function addRevealClasses() {
    // 关于我
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach((card, index) => {
        card.classList.add('reveal', `delay-${index + 1}`);
    });

    // 性格世界
    const personalityCard = document.querySelector('.personality-card');
    if (personalityCard) personalityCard.classList.add('reveal');

    // 价值观
    const valueRanking = document.querySelector('.value-ranking');
    const braveStory = document.querySelector('.brave-story');
    if (valueRanking) valueRanking.classList.add('reveal-left');
    if (braveStory) braveStory.classList.add('reveal-right');

    // 时间线项目 - 添加visible类
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.3}s`;
    });

    // 技能
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.classList.add('reveal-left', `delay-${index + 1}`);
    });

    const radarContainer = document.querySelector('.radar-container');
    if (radarContainer) radarContainer.classList.add('reveal-right');

    // 社交媒体
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach((card, index) => {
        card.classList.add('reveal-scale', `delay-${index + 1}`);
    });

    // 照片
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.classList.add('reveal-scale', `delay-${(index % 4) + 1}`);
    });

    // IP区域
    const ipMain = document.querySelector('.ip-main');
    const ipPoem = document.querySelector('.ip-poem');
    const ipMeaning = document.querySelector('.ip-meaning');
    if (ipMain) ipMain.classList.add('reveal');
    if (ipPoem) ipPoem.classList.add('reveal-scale');
    if (ipMeaning) ipMeaning.classList.add('reveal');
}

// ========================================
// 时间线滚动动画
// ========================================
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => observer.observe(item));
}

// ========================================
// 视差滚动效果
// ========================================
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (heroSection && scrolled < window.innerHeight) {
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            heroSection.style.backgroundPositionY = yPos + 'px';
        }
    });
}

// ========================================
// 初始化所有功能
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // 页面加载动画
    initPageLoader();

    // 滚动进度条
    initScrollProgress();

    // 为元素添加动画类
    addRevealClasses();

    // 打字机效果（延迟启动）
    setTimeout(() => {
        const typingElement = document.getElementById('typing-text');
        if (typingElement) {
            typeWriter(typingElement, '一个18岁的大一男生 · 巨蟹座 · 少年音 · 善良且纯粹', 80);
        }
    }, 2500);

    // 数字滚动动画
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // 星座条形图动画
    const barsSection = document.querySelector('.zodiac-bars');
    if (barsSection) {
        const barsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateBars();
                    barsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        barsObserver.observe(barsSection);
    }

    // 标签页切换
    initTabs();

    // 时间线动画
    initTimelineAnimation();

    // 增强的滚动动画
    initEnhancedScrollAnimations();

    // 雷达图
    drawRadarChart();

    // 平滑锚点滚动
    initSmoothAnchorScroll();

    // 照片墙Lightbox
    initGalleryLightbox();

    // IP板块动画
    initIPSection();

    // 卡片3D效果
    init3DCardEffect();

    // 鼠标跟随光效
    initMouseGlow();

    // 视差效果
    initParallaxEffect();
});
