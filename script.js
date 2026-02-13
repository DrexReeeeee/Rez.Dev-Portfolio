// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);
});

// =========================================
// 2. CUSTOM CURSOR
// =========================================

const cursor = document.querySelector('.cursor');
const trail = document.querySelector('.cursor-trail');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
    }, 50);
});

// Hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .exp-card, .skill-item, .pad-cell, .btn-primary, .nav-link');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        trail.style.transform = 'translate(-50%, -50%) scale(1.5)';
        trail.style.borderColor = 'var(--accent)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        trail.style.transform = 'translate(-50%, -50%) scale(1)';
        trail.style.borderColor = 'rgba(155, 77, 202, 0.3)';
    });
});

// =========================================
// 3. TYPING ANIMATION
// =========================================

const typingElement = document.getElementById('typingText');
if (typingElement) {
    const words = ["Immersive Web", "3D Experiences", ".NET Solutions", "Interactive UI", "C# Developer", "Full-Stack Apps"];
    let i = 0, j = 0, isDeleting = false;
    
    function type() {
        const currentWord = words[i];
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, j-1);
            j--;
            if (j == 0) { 
                isDeleting = false; 
                i = (i + 1) % words.length; 
            }
        } else {
            typingElement.textContent = currentWord.substring(0, j+1);
            j++;
            if (j == currentWord.length) { 
                isDeleting = true; 
                setTimeout(type, 2000); 
                return; 
            }
        }
        setTimeout(type, isDeleting ? 100 : 200);
    }
    type();
}

// =========================================
// 4. SCROLL ANIMATIONS (GSAP)
// =========================================

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);

// Reveal elements on scroll
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(element => {
    gsap.fromTo(element, 
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// Stats counter animation with GSAP
const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach(stat => {
    const target = parseInt(stat.parentElement.getAttribute('data-count'));
    
    ScrollTrigger.create({
        trigger: stat,
        start: 'top 80%',
        onEnter: () => {
            let current = 0;
            const increment = target / 50;
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };
            updateCounter();
        }
    });
});

// Stat bars animation
const statFills = document.querySelectorAll('.stat-fill');
statFills.forEach(fill => {
    const percent = fill.getAttribute('data-percent');
    
    ScrollTrigger.create({
        trigger: fill,
        start: 'top 80%',
        onEnter: () => {
            fill.style.width = percent + '%';
        }
    });
});

// =========================================
// 5. 3D PROJECTS CAROUSEL 
// =========================================

const projectsData = [
    {
        title: 'SmartNotes',
        description: 'A smart note-taking web app integrated with OpenRouter AI for PDF summarization. Users can add, edit, and delete notes while generating AI-based summaries.',
        tech: ['HTML', 'CSS', 'C#', 'ASP.NET', 'Blazor'],
        features: [
            'Upload and summarize PDF documents',
            'AI-assisted text summarization',
            'Add, edit, and delete notes',
            'Collaborative note editing integration',
            'Pixel-themed retro 8-bit user interface'
        ],
        category: 'csharp',
        image: 'images/smartnotes.png',
        github: 'https://github.com/DrexReeeeee/SmartNotes',
        demo: 'https://github.com/DrexReeeeee/SmartNotes'
    },
    {
        title: 'BELLE',
        description: 'A multi-role system featuring a customer side for ordering and checkout, a cashier interface for receiving orders, and an admin dashboard for inventory management and tracking.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Python (Flask)'],
        features: [
            'Customer ordering and checkout system',
            'Cashier dashboard for order management',
            'Admin panel for inventory and sales tracking',
            'Real-time order updates',
            'Responsive and role-based interfaces'
        ],
        category: 'web',
        image: 'images/belle.png',
        github: 'https://github.com/Neutrin0S/system',
        demo: 'https://github.com/Neutrin0S/system'

    },
    {
        title: 'Reece.Co',
        description: 'A minimalist cafe website showcasing a list of menu items with modern design and smooth layout transitions.',
        tech: ['HTML', 'CSS'],
        features: [
            'Clean and responsive menu design',
            'Organized menu layout by category',
            'Mobile-friendly interface',
            'Simple navigation experience',
            'Modern aesthetic with subtle animations'
        ],
        category: 'web',
        image: 'images/reeces.png',
        github: 'https://github.com/24102070/CIS1202GRP11_Nacu_Cafe-Website',
        demo: 'https://24102070.github.io/CIS1202GRP11_Nacu_Cafe-Website/'
    },
    {
        title: 'EVE',
        description: 'An event and planning platform where freelancers and companies can network, while customers can book appointments, avail packages, post reviews, and chat in real time.',
        tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
        features: [
            'User registration and profile system',
            'Company and freelancer listings',
            'Appointment booking and package selection',
            'Integrated chat and rating system',
            'Networking and post-sharing features'
        ],
        category: 'web',
        image: 'images/eve.png',
        github: 'https://github.com/24102070/EVE_Gr-2_Final-Project',
        demo: 'https://github.com/24102070/EVE_Gr-2_Final-Project'
    },
    {
        title: 'Cebu Plant Depot',
        description: 'An all-in-one Inventory Management and E-commerce platform designed for a plant business, integrating sales tracking and online store functionality.',
        tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
        features: [
            'Product management with categories',
            'Inventory tracking with automatic stock updates',
            'Online ordering and checkout system',
            'Sales analytics and dashboard view',
            'Responsive E-commerce interface'
        ],
        category: 'web',
        image: 'images/cebuplant.png',
        github: 'https://github.com/24102070/Cebu_Plant_Depot',
        demo: 'https://cebuplantdepot.dcism.org/'
    },
    {
        title: 'Sign of Affection',
        description: 'An interactive web-based sign language experience that allows users to express emotions and messages through customizable visual cards, real-time gesture recognition, and shareable digital memories.',
        tech: ['HTML', 'CSS', 'JavaScript', 'MediaPipe', 'Three.js'],
        features: [
            'Real-time hand gesture recognition powered by MediaPipe',
            'AI-based sign detection with dynamic visual feedback overlays',
            'Customizable digital affection cards with text, filters, and animations',
            'Photo capture and short video recording feature',
            'Download or instantly share generated sign moments',
            'Smooth scroll animations and interactive UI transitions',
            'Gesture-triggered animations and effects',
            'Optimized real-time tracking with low-latency performance',
            'Modern responsive design for desktop and mobile devices'
        ],
        category: 'web-ai',
        image: 'images/signofaffection.png',
        github: 'https://github.com/yourusername/sign-of-affection',
        demo: 'https://your-demo-link.com'
    },
    {
        title: 'Easekolar',
        description: 'A Scholarship Matching platform that helps students find scholarships in the Philippines and match them with AI based on eligibility and description.',
        tech: ['Node.js', 'React.js'],
        features: [
            'Scholarship listing and search filters',
            'AI-driven scholarship matching',
            'Bookmark and save functionality',
            'Admin panel for managing scholarships',
            'User authentication and personalization'
        ],
        category: 'ai',
        image: 'images/easekolar.png',
        github: 'https://github.com/DrexReeeeee/Easkolar',
        demo: 'https://easekolar.dcism.org'
    },
    {
        title: 'ToDo App',
        description: 'A simple and intuitive to-do list app that helps users efficiently track and manage their daily tasks. Stay organized, set priorities, and boost productivity with ease.',
        tech: ['HTML', 'CSS', 'Javascript', 'JQuery'],
        features: [
            'Add, edit, and delete tasks',
            'Mark tasks as active or completed',
            'User authentication for secure access'
        ],
        category: 'web',
        image: 'images/todoapp.png',
        github: 'https://github.com/DrexReeeeee/To-Do_App',
        demo: 'https://to-do-app-green-beta.vercel.app/'
    },
    {
        title: 'PANIC-TYPE',
        description: 'A psychological horror typing game built with Blazor WebAssembly, where players must type commands to maintain firewall integrity against an awakening AI entity called COGNITO-7.',
        tech: ['.NET', 'C#', 'JavaScript'],
        features: [
            'Emotion-driven interactive gameplay mechanics',
            'Dynamic UI behavior based on user input',
            'Real-time feedback and state changes',
            'Clean backend logic using .NET',
            'Optimized for performance and responsiveness'
        ],
        category: 'web',
        image: 'images/Panic-Type.png',
        github: 'https://github.com/DrexReeeeee/Panic-Type',
        demo: 'https://github.com/DrexReeeeee/Panic-Type'
    }
];

const wrapper = document.getElementById('projectsWrapper');
if (wrapper) {
    // Clear existing content
    wrapper.innerHTML = '';
    
    // Inject Slides with enhanced design
    projectsData.forEach((p, index) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.setAttribute('data-swiper-autoplay', '5000');
        
        // Create tech tags HTML
        const techTags = p.tech.map(t => `<span class="project-tech-tag">${t}</span>`).join('');
        
        // Create features HTML (first 3 features)
        const features = p.features.slice(0, 3).map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('');
        
        slide.innerHTML = `
            <div class="project-card-3d">
                <div class="project-card-inner">
                    <div class="project-card-front">
                        <div class="project-image-container">
                            <img src="${p.image}" alt="${p.title}" class="project-image" onerror="this.src='https://via.placeholder.com/600x400/1a1a2a/9b4dca?text=${p.title.replace(' ', '+')}'">
                            <div class="project-image-overlay">
                                <div class="project-category">${p.category}</div>
                                <h3 class="project-title">${p.title}</h3>
                            </div>
                        </div>
                        <div class="project-tech-strip">
                            ${techTags}
                        </div>
                    </div>
                    <div class="project-card-back">
                        <h3 class="project-back-title">${p.title}</h3>
                        <p class="project-description">${p.description}</p>
                        <div class="project-features">
                            <h4>Key Features:</h4>
                            <ul class="features-list">
                                ${features}
                            </ul>
                        </div>
                        <div class="project-links">
                            <a href="${p.github}" target="_blank" class="project-link github">
                                <i class="fab fa-github"></i> Code
                            </a>
                            <a href="${p.demo}" target="_blank" class="project-link demo">
                                <i class="fas fa-external-link-alt"></i> Demo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        wrapper.appendChild(slide);
    });

    // Initialize Swiper with enhanced smooth settings
    const swiper = new Swiper('.project-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        initialSlide: 2,
        speed: 1000,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            init: function () {
                this.el.addEventListener('mouseenter', () => {
                    this.autoplay.stop();
                });
                this.el.addEventListener('mouseleave', () => {
                    this.autoplay.start();
                });
            }
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            640: {
                slidesPerView: 'auto',
                spaceBetween: 30
            }
        }
    });

    // Add smooth transition on hover
    const cards = document.querySelectorAll('.project-card-3d');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// =========================================
// 6. TECH LAB GAME (THREE.JS)
// =========================================

const initTechGame = () => {
    const container = document.getElementById('tech-game-container');
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.02);

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 8, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0x404060, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x9b4dca, 1.5);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Add point lights for atmosphere
    const pointLight1 = new THREE.PointLight(0x9b4dca, 1, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x7a32a8, 1, 20);
    pointLight2.position.set(-5, 5, -5);
    scene.add(pointLight2);

    // 3. Environment (Grid Floor)
    const gridHelper = new THREE.GridHelper(60, 60, 0x9b4dca, 0x2a2a4a);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    const planeGeo = new THREE.PlaneGeometry(60, 60);
    const planeMat = new THREE.MeshStandardMaterial({ 
        color: 0x0a0a1a, 
        roughness: 0.7,
        metalness: 0.1,
        emissive: 0x1a1a2a
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.1;
    plane.receiveShadow = true;
    scene.add(plane);

    // 4. Player (The Cube)
    const playerGeo = new THREE.BoxGeometry(1, 1, 1);
    const playerMat = new THREE.MeshStandardMaterial({ 
        color: 0x9b4dca, 
        emissive: 0x4a1a6a, 
        emissiveIntensity: 0.5,
        metalness: 0.3,
        roughness: 0.2
    });
    const player = new THREE.Mesh(playerGeo, playerMat);
    player.position.y = 0.5;
    player.castShadow = true;
    player.receiveShadow = true;
    scene.add(player);

    const playerLight = new THREE.PointLight(0x9b4dca, 2, 8);
    playerLight.position.set(0, 1, 0);
    player.add(playerLight);

    // Add floating particles around player
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 20;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        particlePositions[i * 3] = Math.cos(angle) * 1.5;
        particlePositions[i * 3 + 1] = 0.5;
        particlePositions[i * 3 + 2] = Math.sin(angle) * 1.5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x9b4dca, size: 0.05, transparent: true });
    const particles = new THREE.Points(particleGeo, particleMat);
    player.add(particles);

    // 5. Tech Monoliths
    const techs = [
        { name: "C# .NET", val: 90, x: 0, z: -6, color: "#9b4dca" },
        { name: "ASP.NET Core", val: 85, x: -6, z: -3, color: "#a55dda" },
        { name: "Blazor", val: 85, x: 6, z: -3, color: "#b06ae0" },
        { name: "React", val: 75, x: -4, z: 4, color: "#9b4dca" },
        { name: "Node.js", val: 70, x: 4, z: 4, color: "#a55dda" },
        { name: "PHP", val: 80, x: -8, z: 0, color: "#b06ae0" },
        { name: "JavaScript", val: 85, x: 8, z: 0, color: "#9b4dca" },
        { name: "MySQL", val: 80, x: 0, z: 8, color: "#a55dda" },
        { name: "Entity Framework", val: 80, x: -5, z: -8, color: "#b06ae0" },
        { name: "Three.js", val: 75, x: 5, z: -8, color: "#9b4dca" }
    ];

    const techObjects = [];

    // Helper: Create Text Texture
    function createTextTexture(text) {
        const cvs = document.createElement('canvas');
        cvs.width = 512;
        cvs.height = 256;
        const ctx = cvs.getContext('2d');
        
        // Background
        ctx.fillStyle = 'rgba(26, 26, 46, 0.9)';
        ctx.fillRect(0, 0, 512, 256);
        
        // Border
        ctx.strokeStyle = '#9b4dca';
        ctx.lineWidth = 4;
        ctx.strokeRect(2, 2, 508, 252);
        
        // Text
        ctx.font = 'bold 60px "Syne", sans-serif';
        ctx.fillStyle = '#9b4dca';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 256, 128);
        
        // Glow effect
        ctx.shadowColor = '#9b4dca';
        ctx.shadowBlur = 15;
        ctx.fillText(text, 256, 128);
        
        return new THREE.CanvasTexture(cvs);
    }

    techs.forEach((t, index) => {
        // Pillar
        const geo = new THREE.BoxGeometry(1.5, 3, 1.5);
        const mat = new THREE.MeshStandardMaterial({ 
            color: 0x222222, 
            metalness: 0.8, 
            roughness: 0.2,
            emissive: 0x1a1a2a
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(t.x, 1.5, t.z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData = { ...t, id: index };
        
        // Add glow rings
        const ringGeo = new THREE.TorusGeometry(1, 0.1, 16, 32);
        const ringMat = new THREE.MeshStandardMaterial({ color: t.color, emissive: t.color, transparent: true, opacity: 0.3 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 0.5;
        mesh.add(ring);
        
        scene.add(mesh);
        techObjects.push(mesh);

        // Floating Label
        const labelGeo = new THREE.PlaneGeometry(3, 1.5);
        const labelMat = new THREE.MeshBasicMaterial({ 
            map: createTextTexture(t.name), 
            transparent: true, 
            side: THREE.DoubleSide 
        });
        const label = new THREE.Mesh(labelGeo, labelMat);
        label.position.y = 2.5;
        label.position.z = 0.8;
        label.lookAt(camera.position);
        mesh.add(label);
    });

    // Add floating orbs
    const orbCount = 30;
    const orbs = [];
    for (let i = 0; i < orbCount; i++) {
        const orbGeo = new THREE.SphereGeometry(0.1, 8, 8);
        const orbMat = new THREE.MeshStandardMaterial({ 
            color: 0x9b4dca,
            emissive: 0x4a1a6a,
            transparent: true,
            opacity: 0.6
        });
        const orb = new THREE.Mesh(orbGeo, orbMat);
        
        const angle = (i / orbCount) * Math.PI * 2;
        const radius = 12;
        orb.position.x = Math.cos(angle) * radius;
        orb.position.z = Math.sin(angle) * radius;
        orb.position.y = Math.sin(angle * 2) * 2 + 2;
        
        scene.add(orb);
        orbs.push(orb);
    }

    // 6. Game Logic
    const keys = { w:false, a:false, s:false, d:false, shift:false };
    const speed = 0.15;
    const runSpeed = 0.25;

    document.addEventListener('keydown', e => {
        const k = e.key.toLowerCase();
        if(keys.hasOwnProperty(k)) keys[k] = true;
        if(k === 'shift') keys.shift = true;
        if(e.key.startsWith('Arrow')) {
            if(e.key==='ArrowUp') keys.w = true;
            if(e.key==='ArrowDown') keys.s = true;
            if(e.key==='ArrowLeft') keys.a = true;
            if(e.key==='ArrowRight') keys.d = true;
            e.preventDefault();
        }
    });

    document.addEventListener('keyup', e => {
        const k = e.key.toLowerCase();
        if(keys.hasOwnProperty(k)) keys[k] = false;
        if(k === 'shift') keys.shift = false;
        if(e.key.startsWith('Arrow')) {
            if(e.key==='ArrowUp') keys.w = false;
            if(e.key==='ArrowDown') keys.s = false;
            if(e.key==='ArrowLeft') keys.a = false;
            if(e.key==='ArrowRight') keys.d = false;
        }
    });

    // UI Elements
    const ui = document.getElementById('tech-info-panel');
    const uiName = document.getElementById('tech-name');
    const uiBar = document.getElementById('tech-level-bar');
    const uiText = document.getElementById('tech-level-text');

    let time = 0;

    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Move Player
        const currentSpeed = keys.shift ? runSpeed : speed;
        if(keys.w) player.position.z -= currentSpeed;
        if(keys.s) player.position.z += currentSpeed;
        if(keys.a) player.position.x -= currentSpeed;
        if(keys.d) player.position.x += currentSpeed;

        // Clamp to grid
        player.position.x = Math.max(-15, Math.min(15, player.position.x));
        player.position.z = Math.max(-15, Math.min(15, player.position.z));

        // Rotate player based on movement
        if (keys.w || keys.s || keys.a || keys.d) {
            player.rotation.y += 0.05;
        }

        // Camera Follow (Smooth)
        camera.position.x += (player.position.x - camera.position.x) * 0.1;
        camera.position.z += (player.position.z + 8 - camera.position.z) * 0.1;
        camera.position.y += (player.position.y + 4 - camera.position.y) * 0.1;
        camera.lookAt(player.position);

        // Animate orbs
        orbs.forEach((orb, i) => {
            orb.position.y = Math.sin(time * 2 + i) * 2 + 2;
        });

        // Check Interactions
        let near = false;
        let nearestDist = Infinity;
        let nearestObj = null;

        techObjects.forEach(obj => {
            // Float animation
            obj.position.y = 1.5 + Math.sin(time * 2 + obj.userData.id) * 0.2;
            
            // Rotate rings
            if (obj.children[0]) {
                obj.children[0].rotation.z += 0.01;
            }

            // Distance Check
            const dist = player.position.distanceTo(new THREE.Vector3(obj.position.x, 0.5, obj.position.z));
            
            if(dist < 3) {
                obj.material.emissive.setHex(0x333333);
                obj.material.emissiveIntensity = 0.5;
                
                if (dist < nearestDist) {
                    nearestDist = dist;
                    nearestObj = obj;
                }
            } else {
                obj.material.emissive.setHex(0x000000);
            }
        });

        if (nearestObj && nearestDist < 2.5) {
            near = true;
            const obj = nearestObj;
            
            // Highlight nearest
            obj.material.emissive.set(obj.userData.color);
            obj.material.emissiveIntensity = 0.8;

            // Update UI
            ui.classList.add('active');
            uiName.textContent = obj.userData.name;
            uiBar.style.width = obj.userData.val + "%";
            uiText.textContent = `MASTERY: ${obj.userData.val}%`;
        } else {
            ui.classList.remove('active');
        }

        renderer.render(scene, camera);
    }
    animate();

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
};

// Start Game when DOM ready
document.addEventListener('DOMContentLoaded', initTechGame);

// =========================================
// 7. JOURNEY TIMELINE
// =========================================

const journeyData = [
    {
        year: 'Grade 11',
        description: 'Started with C basics, learning programming fundamentals',
        skills: ['C Programming', 'Algorithm Basics', 'Problem Solving'],
        projects: ['Simple Calculator', 'Number Guessing Game', 'Tic-Tac-Toe']
    },
    {
        year: 'Grade 12',
        description: 'Learned Java basics and built Inventory Management System with Flask',
        skills: ['Java', 'HTML', 'CSS', 'JavaScript', 'Python', 'SQLite', 'Flask'],
        projects: ['Inventory Management and Point-of-Sale System']
    },
    {
        year: '1st Year College',
        description: 'Expanded knowledge in C, JavaScript, HTML, CSS, and PHP',
        skills: ['Advanced JavaScript', 'Responsive Design', 'PHP Backend', 'MySQL'],
        projects: ['E-commerce Site', 'Coffee Shop Site', 'Appointment Platform']
    },
    {
        year: '2nd Year College',
        description: 'Focus on C#, ASP.NET, Blazor, and exploring Node.js',
        skills: ['C#', 'ASP.NET', 'Blazor', 'Node.js', 'Entity Framework'],
        projects: ['SmartNotes', 'EaseKolar', 'PANIC-TYPE', 'ToDo App']
    },
    {
        year: 'Future',
        description: 'Planning to explore AI/ML, Cloud Computing, Microservices',
        skills: ['Machine Learning', 'Cloud Architecture', 'DevOps'],
        projects: ['AI Assistant', 'Cloud Platform', 'Mobile Apps']
    }
];

const journeyNodesContainer = document.getElementById('journeyNodes');
const journeyYear = document.querySelector('.journey-year');
const journeyDescription = document.querySelector('.journey-description');
const journeySkills = document.getElementById('journeySkills');
const journeyProjects = document.getElementById('journeyProjects');
const prevBtn = document.getElementById('timeline-prev');
const nextBtn = document.getElementById('timeline-next');

if (journeyNodesContainer) {
    let currentIndex = 0;
    
    // Create journey nodes
    journeyData.forEach((data, index) => {
        const journeyNode = document.createElement('div');
        journeyNode.className = 'journey-node' + (index === journeyData.length - 1 ? ' future' : '');
        
        journeyNode.innerHTML = `
            <div class="node-orb"></div>
            <div class="node-content">
                <h3>${data.year}</h3>
                <p>${data.description.substring(0, 50)}...</p>
            </div>
        `;
        
        journeyNode.addEventListener('click', () => {
            currentIndex = index;
            updateJourneyDetails();
            
            // Highlight active node
            document.querySelectorAll('.journey-node').forEach((node, i) => {
                if (i === index) {
                    node.style.transform = 'scale(1.1)';
                } else {
                    node.style.transform = 'scale(1)';
                }
            });
        });
        
        journeyNodesContainer.appendChild(journeyNode);
    });
    
    // Navigation buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = Math.max(0, currentIndex - 1);
            updateJourneyDetails();
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = Math.min(journeyData.length - 1, currentIndex + 1);
            updateJourneyDetails();
        });
    }
    
    function updateJourneyDetails() {
        const data = journeyData[currentIndex];
        if (journeyYear) journeyYear.textContent = data.year;
        if (journeyDescription) journeyDescription.textContent = data.description;
        
        if (journeySkills) {
            journeySkills.innerHTML = '';
            data.skills.forEach(skill => {
                const skillTag = document.createElement('span');
                skillTag.className = 'skill-tag';
                skillTag.textContent = skill;
                journeySkills.appendChild(skillTag);
            });
        }
        
        if (journeyProjects) {
            journeyProjects.innerHTML = '';
            data.projects.forEach(project => {
                const projectTag = document.createElement('span');
                projectTag.className = 'project-tag';
                projectTag.textContent = project;
                journeyProjects.appendChild(projectTag);
            });
        }
    }
    
    // Make timeline draggable
    const journeyPath = document.querySelector('.journey-path');
    if (journeyPath) {
        let isTimelineDragging = false;
        let timelineStartX;
        let timelineScrollLeft = 0;
        
        journeyPath.addEventListener('mousedown', (e) => {
            isTimelineDragging = true;
            timelineStartX = e.pageX - journeyPath.offsetLeft;
            timelineScrollLeft = journeyPath.scrollLeft;
            journeyPath.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isTimelineDragging) return;
            e.preventDefault();
            const x = e.pageX - journeyPath.offsetLeft;
            const walk = (x - timelineStartX) * 2;
            journeyPath.scrollLeft = timelineScrollLeft - walk;
        });
        
        document.addEventListener('mouseup', () => {
            isTimelineDragging = false;
            journeyPath.style.cursor = 'grab';
        });
    }
}

// =========================================
// 8. TERMINAL FUNCTIONALITY
// =========================================

const terminalToggle = document.getElementById('terminal-toggle');
const cyberTerminal = document.getElementById('cyber-terminal');
const terminalClose = document.querySelector('.terminal-close');
const terminalInput = document.querySelector('.terminal-input');

if (terminalToggle && cyberTerminal) {
    terminalToggle.addEventListener('click', () => {
        cyberTerminal.classList.toggle('active');
    });
}

if (terminalClose) {
    terminalClose.addEventListener('click', () => {
        cyberTerminal.classList.remove('active');
    });
}

// Terminal commands
if (terminalInput) {
    terminalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.toLowerCase();
            const terminalContent = document.querySelector('.terminal-content');
            
            // Add command to terminal
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line';
            commandLine.innerHTML = `> ${terminalInput.value}`;
            terminalContent.insertBefore(commandLine, terminalContent.lastElementChild);
            
            // Process command
            let response = '';
            switch(command) {
                case 'help':
                    response = 'Available commands: about, skills, projects, experience, education, contact, clear';
                    break;
                case 'about':
                    response = 'Drixyl Nacu - 2nd year CS student specializing in full-stack development. Passionate about immersive web experiences and C#/.NET development.';
                    break;
                case 'skills':
                    response = 'C#, ASP.NET Core, Blazor, React, Node.js, PHP, MySQL, Three.js, JavaScript, HTML/CSS';
                    break;
                case 'projects':
                    response = 'SmartNotes (AI PDF Summarizer), EaseKolar (Scholarship Matcher), EVE (Booking Platform), PANIC-TYPE (Horror Game), Cebu Plant Depot (E-commerce)';
                    break;
                case 'experience':
                    response = 'Software Engineering Intern @ e-Permits System (2025-Present), Ambassador @ Innovare (2025-Present), POS Developer @ Cebu Plant Depot (2025), OJT @ Qualfon (2024)';
                    break;
                case 'education':
                    response = 'BS Computer Science @ University of San Carlos (2024-Present) - Dean\'s Lister, Senior High @ University of Cebu (2024) - Top 1 with Highest Honors';
                    break;
                case 'contact':
                    response = 'Email: drixyl.nacu@gmail.com | GitHub: DrexReeeeee | LinkedIn: Drixy Reece Irish Nacu';
                    break;
                case 'clear':
                    const lines = document.querySelectorAll('.terminal-line:not(:first-child):not(:nth-child(2)):not(:nth-child(3)):not(:nth-child(4))');
                    lines.forEach(line => line.remove());
                    response = 'Terminal cleared.';
                    break;
                default:
                    response = `Command not recognized: ${command}. Type 'help' for available commands.`;
            }
            
            // Show response
            const responseLine = document.createElement('div');
            responseLine.className = 'terminal-line';
            responseLine.style.color = '#9b4dca';
            responseLine.textContent = response;
            terminalContent.insertBefore(responseLine, terminalContent.lastElementChild);
            
            // Clear input
            terminalInput.value = '';
            
            // Scroll to bottom
            terminalContent.scrollTop = terminalContent.scrollHeight;
        }
    });
}

// =========================================
// 9. INTERACTIVE PAD
// =========================================

const padCells = document.querySelectorAll('.pad-cell');
if (padCells.length > 0) {
    padCells.forEach(cell => {
        cell.addEventListener('click', function() {
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
            }, 200);
        });
    });
    
    const padPlay = document.getElementById('pad-play');
    const padClear = document.getElementById('pad-clear');
    
    if (padPlay) {
        padPlay.addEventListener('click', () => {
            padCells.forEach((cell, index) => {
                setTimeout(() => {
                    cell.classList.add('active');
                    setTimeout(() => {
                        cell.classList.remove('active');
                    }, 200);
                }, index * 100);
            });
        });
    }
    
    if (padClear) {
        padClear.addEventListener('click', () => {
            padCells.forEach(cell => {
                cell.classList.remove('active');
            });
        });
    }
}

// =========================================
// 10. MOBILE MENU (Optional Enhancement)
// =========================================

const menuBtn = document.querySelector('.nav-menu-btn');
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// =========================================
// 11. ACTIVE NAVIGATION ON SCROLL
// =========================================

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// =========================================
// 12. PARALLAX EFFECT ON HERO
// =========================================

window.addEventListener('scroll', () => {
    const heroContent = document.querySelector('.hero-content');
    const scrolled = window.scrollY;
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.002);
    }
});

// =========================================
// 13. INITIALIZE TOOLTIPS
// =========================================

const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    const level = item.getAttribute('data-level');
    if (level) {
        item.setAttribute('title', `Proficiency: ${level}%`);
    }
});

console.log('Portfolio initialized successfully! 🚀');