
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize all interactive components
            initThreeJS();
            initEnhancedMouseTrail();
            initInteractiveComponents();
            initTerminal();
            initSkillBars();
            initTechOrbit();
            initJourneyTimeline();
            initProjectsGallery();
            initCyberPad();
            initThemeToggle();
            initAnimations();
        });

        // Initialize Three.js scene for 3D background
        function initThreeJS() {
            const canvas = document.getElementById('bg-canvas');
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            
            const cityGroup = new THREE.Group();
            
            for (let i = 0; i < 50; i++) {
                const buildingHeight = Math.random() * 20 + 5;
                const buildingWidth = Math.random() * 4 + 1;
                const buildingDepth = Math.random() * 4 + 1;
                
                const buildingGeometry = new THREE.BoxGeometry(buildingWidth, buildingHeight, buildingDepth);
                const buildingMaterial = new THREE.MeshBasicMaterial({ 
                    color: 0x1a0a2e,
                    wireframe: true
                });
                
                const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
                
                const x = (i % 10 - 5) * 10;
                const z = Math.floor(i / 10 - 2.5) * 10;
                
                building.position.set(x, buildingHeight / 2, z);
        
                for (let j = 0; j < 5; j++) {
                    const windowGeometry = new THREE.PlaneGeometry(0.5, 0.5);
                    const windowMaterial = new THREE.MeshBasicMaterial({ 
                        color: Math.random() > 0.5 ? 0xff00ff : 0x8a2be2,
                        side: THREE.DoubleSide
                    });
                    
                    const window = new THREE.Mesh(windowGeometry, windowMaterial);
                    window.position.set(
                        0,
                        -buildingHeight / 2 + (j + 1) * (buildingHeight / 6),
                        buildingDepth / 2 + 0.01
                    );
                    
                    building.add(window);
                }
                
                cityGroup.add(building);
            }
            
            scene.add(cityGroup);
            
    
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 2000;
            const posArray = new Float32Array(particlesCount * 3);
            
            for(let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 100;
            }
            
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            
            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.05,
                color: 0xff00ff
            });
            
            const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);
            
            const gridHelper = new THREE.GridHelper(100, 100, 0xff00ff, 0xff00ff);
            gridHelper.material.opacity = 0.1;
            gridHelper.material.transparent = true;
            scene.add(gridHelper);
            
            camera.position.z = 30;
            camera.position.y = 15;

            function animate() {
                requestAnimationFrame(animate);
                
                cityGroup.rotation.y += 0.001;
                particlesMesh.rotation.y += 0.002;
                
                renderer.render(scene, camera);
            }
            
            animate();
 
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }

        function initEnhancedMouseTrail() {
            const trail = document.getElementById('mouse-trail');
            let mouseX = 0, mouseY = 0;
            let trailX = 0, trailY = 0;
            const trailParticles = [];
            const maxTrailLength = 20;
            
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                trail.style.opacity = '1';
                
                for (let i = 0; i < 4; i++) {
                    createTrailParticle(mouseX, mouseY);
                }
            });
            
            function createTrailParticle(x, y) {
                const particle = document.createElement('div');
                particle.className = 'trail-particle';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                
                const size = Math.random() * 10 + 5;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                
                const colors = ['#ff00ff', '#8a2be2', '#da70d6'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.background = color;
                
                particle.style.filter = `blur(${Math.random() * 3 + 1}px)`;
                
                document.body.appendChild(particle);
                trailParticles.push(particle);
                
                gsap.to(particle, {
                    x: (Math.random() - 0.5) * 40,
                    y: (Math.random() - 0.5) * 40,
                    opacity: 0,
                    scale: 0,
                    duration: Math.random() * 1.5 + 0.5,
                    ease: 'power2.out',
                    onComplete: () => {
                        if (document.body.contains(particle)) {
                            document.body.removeChild(particle);
                        }
                        const index = trailParticles.indexOf(particle);
                        if (index > -1) {
                            trailParticles.splice(index, 1);
                        }
                    }
                });
                
                if (trailParticles.length > maxTrailLength) {
                    const oldParticle = trailParticles.shift();
                    if (oldParticle && document.body.contains(oldParticle)) {
                        document.body.removeChild(oldParticle);
                    }
                }
            }
            
            function updateTrail() {
                trailX += (mouseX - trailX) * 0.1;
                trailY += (mouseY - trailY) * 0.1;
                
                trail.style.left = trailX - 15 + 'px';
                trail.style.top = trailY - 15 + 'px';
                
                requestAnimationFrame(updateTrail);
            }
            
            updateTrail();
            
            document.addEventListener('mouseleave', () => {
                trail.style.opacity = '0';
            });
        }


        function initTerminal() {
            const terminal = document.getElementById('cyber-terminal');
            const toggleBtn = document.getElementById('terminal-toggle');
            const closeBtn = terminal.querySelector('.control.close');
            const terminalInput = terminal.querySelector('.terminal-input');
            const terminalContent = terminal.querySelector('.terminal-content');
            
            toggleBtn.addEventListener('click', () => {
                if (terminal.style.display === 'flex') {
                    terminal.style.display = 'none';
                } else {
                    terminal.style.display = 'flex';
                    terminalInput.focus();
                }
            });
            
            closeBtn.addEventListener('click', () => {
                terminal.style.display = 'none';
            });
            
            terminalInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const command = terminalInput.value.trim();
                    terminalInput.value = '';
   
                    const commandLine = document.createElement('div');
                    commandLine.className = 'terminal-line';
                    commandLine.textContent = `> ${command}`;
                    terminalContent.appendChild(commandLine);
                    
                    processTerminalCommand(command);
                    
          
                    terminalContent.scrollTop = terminalContent.scrollHeight;
                }
            });
            
            function processTerminalCommand(command) {
                const responseLine = document.createElement('div');
                responseLine.className = 'terminal-line';
                
                switch(command.toLowerCase()) {
                    case 'help':
                        responseLine.innerHTML = `
                            Available commands:<br>
                            - help: Show this help message<br>
                            - about: Learn about the developer<br>
                            - skills: View technical skills<br>
                            - projects: List projects<br>
                            - contact: Get contact information<br>
                            - clear: Clear terminal<br>
                            - theme [light/dark]: Change theme
                        `;
                        break;
                    case 'about':
                        responseLine.textContent = '> I\'m a passionate CS student specializing in immersive web experiences and full-stack development.';
                        break;
                    case 'skills':
                        responseLine.textContent = '> C#, ASP.NET, Blazor, JavaScript, HTML, CSS, PHP, Node.js, SQL';
                        break;
                    case 'projects':
                        responseLine.textContent = '> Inventory Management System, E-commerce System, PDF summarizer, Note-Taking App, Events Platform';
                        break;
                    case 'contact':
                        responseLine.textContent = '> Email: drixyl.nacu@gmail.com | GitHub: https://github.com/DrexReeeeee';
                        break;
                    case 'clear':
                        terminalContent.innerHTML = `
                            <div class="terminal-line">> Terminal cleared.</div>
                            <div class="terminal-line">> Type 'help' for commands</div>
                            <div class="terminal-input-line">
                                <span class="prompt">></span>
                                <input type="text" class="terminal-input" placeholder="Type commands here...">
                            </div>
                        `;
                        terminalInput = terminalContent.querySelector('.terminal-input');
                        terminalInput.focus();
                        return;
                    case 'theme light':
                        document.body.style.setProperty('--dark-purple', '#f0f0f0');
                        document.body.style.setProperty('--darker-purple', '#e0e0e0');
                        document.body.style.setProperty('--text-primary', '#333333');
                        document.body.style.setProperty('--text-secondary', '#666666');
                        responseLine.textContent = '> Theme changed to light mode';
                        break;
                    case 'theme dark':
                        document.body.style.setProperty('--dark-purple', '#1a0a2e');
                        document.body.style.setProperty('--darker-purple', '#0f0519');
                        document.body.style.setProperty('--text-primary', '#e0e0ff');
                        document.body.style.setProperty('--text-secondary', '#a0a0c0');
                        responseLine.textContent = '> Theme changed to dark mode';
                        break;
                    default:
                        responseLine.textContent = `> Command not found: ${command}. Type 'help' for available commands.`;
                }
                
                terminalContent.insertBefore(responseLine, terminalContent.lastElementChild);
            }
        }

        // Initialize interactive components
        function initInteractiveComponents() {
            // Color toggle
            document.getElementById('color-toggle').addEventListener('click', function() {
                const colors = [
                    { pink: '#ff00ff', purple: '#8a2be2' },
                    { pink: '#00ffff', purple: '#0080ff' },
                    { pink: '#ffff00', purple: '#ff8000' },
                    { pink: '#00ff00', purple: '#008000' }
                ];
                
                const currentPink = getComputedStyle(document.body).getPropertyValue('--neon-pink').trim();
                let currentIndex = colors.findIndex(c => c.pink === currentPink);
                const nextIndex = (currentIndex + 1) % colors.length;
                
                document.body.style.setProperty('--neon-pink', colors[nextIndex].pink);
                document.body.style.setProperty('--neon-purple', colors[nextIndex].purple);
            });
            
            // Music toggle
            document.getElementById('music-toggle').addEventListener('click', function() {
                this.classList.toggle('active');
                if (this.classList.contains('active')) {
                    // In a real implementation, you would play ambient music here
                    this.innerHTML = '<i class="fas fa-volume-mute"></i><span>Mute Sound</span>';
                    // Simulate sound with visual feedback
                    document.body.style.animation = 'pulse 2s infinite';
                } else {
                    this.innerHTML = '<i class="fas fa-music"></i><span>Ambient Sound</span>';
                    document.body.style.animation = 'none';
                }
            });
            
            // Particle toggle
            document.getElementById('particle-toggle').addEventListener('click', function() {
                this.classList.toggle('active');
                const bgCanvas = document.getElementById('bg-canvas');
                if (this.classList.contains('active')) {
                    bgCanvas.style.opacity = '1';
                } else {
                    bgCanvas.style.opacity = '0.3';
                }
            });
        }

        // Initialize skill bars animation
        function initSkillBars() {
            const skillBars = document.querySelectorAll('.skill-fill');
            
  
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const skillFill = entry.target;
                        const skillLevel = skillFill.getAttribute('data-skill');
                        skillFill.style.width = skillLevel + '%';
                        observer.unobserve(skillFill);
                    }
                });
            }, { threshold: 0.5 });
            
            skillBars.forEach(bar => {
                observer.observe(bar);
            });
        }


        function initTechOrbit() {
            const techIconsContainer = document.querySelector('.tech-icons');
            const techInfoPanel = document.querySelector('.tech-info-panel');
            const techName = techInfoPanel.querySelector('.tech-name');
            const techDescription = techInfoPanel.querySelector('.tech-description');
            const skillDots = techInfoPanel.querySelectorAll('.skill-dots .dot');
            const projectsCount = techInfoPanel.querySelector('.projects-count');
            
            const technologies = [
                { 
                    name: 'HTML5', 
                    icon: 'fab fa-html5', 
                    description: 'Semantic markup and modern HTML5 features',
                    skill: 4,
                    projects: 8
                },
                { 
                    name: 'CSS3', 
                    icon: 'fab fa-css3-alt', 
                    description: 'Advanced styling, animations, and responsive design',
                    skill: 4,
                    projects: 8
                },
                { 
                    name: 'JavaScript', 
                    icon: 'fab fa-js', 
                    description: 'ES6+, DOM manipulation, and interactive web features',
                    skill: 4,
                    projects: 6
                },
                { 
                    name: 'C#', 
                    icon: 'fab fa-microsoft', 
                    description: 'Object-oriented programming with .NET ecosystem',
                    skill: 4,
                    projects: 1
                },
                { 
                    name: 'ASP.NET', 
                    icon: 'fas fa-globe', 
                    description: 'Web application framework for building dynamic sites',
                    skill: 3,
                    projects: 3
                },
                { 
                    name: 'Blazor', 
                    icon: 'fas fa-bolt', 
                    description: 'Interactive web UIs using C# instead of JavaScript',
                    skill: 3,
                    projects: 2
                },
                { 
                    name: 'PHP', 
                    icon: 'fab fa-php', 
                    description: 'Server-side scripting for web development',
                    skill: 3,
                    projects: 4
                },
                { 
                    name: 'Node.js', 
                    icon: 'fab fa-node-js', 
                    description: 'JavaScript runtime for server-side development',
                    skill: 2,
                    projects: 2
                },
                { 
                    name: 'SQL', 
                    icon: 'fas fa-database', 
                    description: 'Database management and querying',
                    skill: 3,
                    projects: 5
                }
            ];
            
            // Create tech icons
            technologies.forEach((tech, index) => {
                const techIcon = document.createElement('div');
                techIcon.className = 'tech-icon';
                techIcon.setAttribute('data-tooltip', tech.name);
                techIcon.innerHTML = `<i class="${tech.icon}"></i>`;
                
                const angle = (index / technologies.length) * Math.PI * 2;
                const radius = 200;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                techIcon.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
          
                techIcon.addEventListener('click', () => {
                 
                    techName.textContent = tech.name;
                    techDescription.textContent = tech.description;
                    projectsCount.textContent = tech.projects;
                    
              
                    skillDots.forEach((dot, i) => {
                        if (i < tech.skill) {
                            dot.classList.add('active');
                        } else {
                            dot.classList.remove('active');
                        }
                    });
                 
                    techInfoPanel.classList.add('active');
                    
                    techIcon.style.animation = 'pulse 0.5s';
                    setTimeout(() => {
                        techIcon.style.animation = '';
                    }, 500);
                });
                
                techIconsContainer.appendChild(techIcon);
            });
            
            let isDragging = false;
            let startX, startY;
            let initialRotation = 0;
            const techOrbit = document.querySelector('.tech-orbit');
            
            techOrbit.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                techOrbit.style.cursor = 'grabbing';
            });
            
            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                
                const deltaX = e.clientX - startX;
                const rotation = initialRotation + deltaX * 0.5;
                
                techIconsContainer.style.transform = `rotate(${rotation}deg)`;

                const techIcons = document.querySelectorAll('.tech-icon');
                techIcons.forEach(icon => {
                    icon.style.transform = icon.style.transform.replace(/rotate\([^)]*\)/, '') + ` rotate(${-rotation}deg)`;
                });
            });
            
            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    techOrbit.style.cursor = 'grab';
                    initialRotation = parseFloat(techIconsContainer.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
                }
            });
        }

        // Initialize interactive journey timeline
        function initJourneyTimeline() {
            const journeyNodesContainer = document.querySelector('.journey-nodes');
            const journeyDetails = document.querySelector('.journey-details');
            const journeyYear = journeyDetails.querySelector('.journey-year');
            const journeyDescription = journeyDetails.querySelector('.journey-description');
            const skillsList = journeyDetails.querySelector('.skills-list');
            const projectsList = journeyDetails.querySelector('.projects-list');
            const prevBtn = document.getElementById('timeline-prev');
            const nextBtn = document.getElementById('timeline-next');
            
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
                    year: '1st Year',
                    description: 'Expanded knowledge in C, JavaScript, HTML, CSS, and PHP',
                    skills: ['Advanced JavaScript', 'Responsive Design', 'PHP Backend', 'MySQL'],
                    projects: ['E-commerce Site', 'Coffee Shop Site', 'Appointment and Networking Platform']
                },
                {
                    year: '2nd Year',
                    description: 'Focus on C#, ASP.NET, Blazor, and exploring Node.js',
                    skills: ['C#', 'ASP.NET', 'Blazor', 'Node.js'],
                    projects: ['To Do Application', 'E-Commerce and IMS hybrid platform']
                },
                {
                    year: 'Future',
                    description: 'Coming Soon - AI/ML, Cloud Computing',
                    skills: ['Machine Learning', 'Software Architecture'],
                    projects: ['AI Assistant', 'Cloud Deployment', 'and more...']
                }
            ];
            
            let currentIndex = 0;
            
            // Create journey nodes
            journeyData.forEach((data, index) => {
                const journeyNode = document.createElement('div');
                journeyNode.className = 'journey-node' + (index === journeyData.length - 1 ? ' future' : '');
                
                journeyNode.innerHTML = `
                    <div class="node-orb"></div>
                    <div class="node-content">
                        <h3>${data.year}</h3>
                        <p>${data.description}</p>
                    </div>
                `;
                
                journeyNode.addEventListener('click', () => {
                    currentIndex = index;
                    updateJourneyDetails();
                    journeyDetails.classList.add('active');
                });
                
                journeyNodesContainer.appendChild(journeyNode);
            });
            
            // Navigation buttons
            prevBtn.addEventListener('click', () => {
                currentIndex = Math.max(0, currentIndex - 1);
                updateJourneyDetails();
                journeyDetails.classList.add('active');
            });
            
            nextBtn.addEventListener('click', () => {
                currentIndex = Math.min(journeyData.length - 1, currentIndex + 1);
                updateJourneyDetails();
                journeyDetails.classList.add('active');
            });
            
            function updateJourneyDetails() {
                const data = journeyData[currentIndex];
                journeyYear.textContent = data.year;
                journeyDescription.textContent = data.description;
                
                skillsList.innerHTML = '';
                data.skills.forEach(skill => {
                    const skillTag = document.createElement('span');
                    skillTag.className = 'skill-tag';
                    skillTag.textContent = skill;
                    skillsList.appendChild(skillTag);
                });
                
                projectsList.innerHTML = '';
                data.projects.forEach(project => {
                    const projectTag = document.createElement('span');
                    projectTag.className = 'project-tag';
                    projectTag.textContent = project;
                    projectsList.appendChild(projectTag);
                });
            }
            
            // Make timeline draggable
            let isTimelineDragging = false;
            let timelineStartX;
            let timelineScrollLeft = 0;
            const journeyPath = document.querySelector('.journey-path');
            
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

        // Initialize interactive projects gallery
        function initProjectsGallery() {
            const projectsGallery = document.querySelector('.projects-gallery');
            const filterBtns = document.querySelectorAll('.filter-btn');
            const projectModal = document.getElementById('project-modal');
            const modalClose = projectModal.querySelector('.modal-close');
            
            const projectsData = [
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

            
             function renderProjects(filter = 'all') {
        projectsGallery.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? projectsData 
            : projectsData.filter(project => project.category === filter);
        
        filteredProjects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-category', project.category);
            
            projectCard.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <div class="project-image">
                            <img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'; this.parentNode.innerHTML='<i class=\\'fas fa-image\\'></i>';">
                        </div>
                        <h3>${project.title}</h3>
                        <p>${project.description.substring(0, 100)}...</p>
                        <div class="tech-tags">
                            ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                        </div>
                    </div>
                    <div class="card-back">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="tech-used">
                            ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                        </div>
                        <div class="project-links">
                            <a href="${project.github}" target="_blank" class="project-link github-link">
                                <i class="fab fa-github"></i> Source Code
                            </a>
                            <a href="${project.demo}" target="_blank" class="project-link demo-link">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>
                        </div>
                        <a href="#" class="project-link view-details" data-index="${index}">View Details</a>
                    </div>
                </div>
            `;
            
            projectsGallery.appendChild(projectCard);
        });
        
        // Add event listeners to view details buttons
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const index = parseInt(btn.getAttribute('data-index'));
                openProjectModal(index);
            });
        });
    }
    
    // Filter projects
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.getAttribute('data-filter'));
        });
    });
    
// Open project modal
function openProjectModal(index) {
    const project = projectsData[index];
    const modal = projectModal;
    const modalTitle = modal.querySelector('.modal-title');
    const modalTech = modal.querySelector('.modal-tech');
    const modalImage = modal.querySelector('.modal-image');
    const modalDescription = modal.querySelector('.modal-description p');
    const featuresList = modal.querySelector('.features-list');
    const liveDemoLink = modal.querySelector('.live-demo');
    const sourceCodeLink = modal.querySelector('.source-code');
    
    // Update modal content
    modalTitle.textContent = project.title;
    modalTech.innerHTML = project.tech.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    // Use actual image in modal instead of icon
    modalImage.innerHTML = `
        <img src="${project.image}" alt="${project.title}" 
             onerror="this.style.display='none'; this.parentNode.innerHTML='<i class=\\'fas fa-image\\'></i>';">
    `;
    
    modalDescription.textContent = project.description;
    
    // Update features list
    featuresList.innerHTML = project.features.map(feature => 
        `<li>${feature}</li>`
    ).join('');
    
    // Update the links - only if they exist in the project data
    if (project.github) {
        sourceCodeLink.href = project.github;
        sourceCodeLink.target = '_blank';
        sourceCodeLink.style.display = 'flex';
        // Prevent the modal from closing when clicking links
        sourceCodeLink.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    } else {
        sourceCodeLink.style.display = 'none';
    }
    
    if (project.demo) {
        liveDemoLink.href = project.demo;
        liveDemoLink.target = '_blank';
        liveDemoLink.style.display = 'flex';
        // Prevent the modal from closing when clicking links
        liveDemoLink.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    } else {
        liveDemoLink.style.display = 'none';
    }
    
    // Show modal
    modal.classList.add('active');
}
    
    modalClose.addEventListener('click', () => {
        projectModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
        }
    });
    
    // Initial render
    renderProjects();
}

        // Initialize cyber pad
        function initCyberPad() {
            const padCells = document.querySelectorAll('.pad-cell');
            const playBtn = document.getElementById('pad-play');
            const clearBtn = document.getElementById('pad-clear');
            let sequence = [];
            let isPlaying = false;
            
            // Add click events to pad cells
            padCells.forEach(cell => {
                cell.addEventListener('click', () => {
                    if (isPlaying) return;
                    
                    const soundId = cell.getAttribute('data-sound');
                    playSound(soundId);
                    cell.classList.add('active');
                    sequence.push(soundId);
                    
                    setTimeout(() => {
                        cell.classList.remove('active');
                    }, 200);
                });
            });
            
            // Play sequence
            playBtn.addEventListener('click', () => {
                if (sequence.length === 0 || isPlaying) return;
                
                isPlaying = true;
                playBtn.disabled = true;
                
                let i = 0;
                const playNext = () => {
                    if (i >= sequence.length) {
                        isPlaying = false;
                        playBtn.disabled = false;
                        return;
                    }
                    
                    const soundId = sequence[i];
                    const cell = document.querySelector(`.pad-cell[data-sound="${soundId}"]`);
                    
                    cell.classList.add('active');
                    playSound(soundId);
                    
                    setTimeout(() => {
                        cell.classList.remove('active');
                        i++;
                        setTimeout(playNext, 300);
                    }, 500);
                };
                
                playNext();
            });
            
            // Clear sequence
            clearBtn.addEventListener('click', () => {
                sequence = [];
            });
            
            // Play sound (simulated with visual feedback)
            function playSound(id) {
                // In a real implementation, you would play actual sounds here
                const colors = ['#ff00ff', '#8a2be2', '#00ffff', '#ffff00', '#00ff00', '#ff8000', '#ff0080', '#8000ff', '#0080ff'];
                document.body.style.backgroundColor = colors[id - 1];
                
                setTimeout(() => {
                    document.body.style.backgroundColor = '';
                }, 200);
            }
        }

        // Initialize theme toggle
        function initThemeToggle() {
            const themeToggle = document.getElementById('theme-toggle');
            const resetBtn = document.getElementById('reset-all');
            
            themeToggle.addEventListener('click', () => {
                const currentBg = getComputedStyle(document.body).getPropertyValue('--dark-purple').trim();
                
                if (currentBg === '#1a0a2e') {
                    // Switch to light theme
                    document.body.style.setProperty('--dark-purple', '#f5f5f5');
                    document.body.style.setProperty('--darker-purple', '#e0e0e0');
                    document.body.style.setProperty('--text-primary', '#333333');
                    document.body.style.setProperty('--text-secondary', '#666666');
                    themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Theme';
                } else {
                    // Switch to dark theme
                    document.body.style.setProperty('--dark-purple', '#1a0a2e');
                    document.body.style.setProperty('--darker-purple', '#0f0519');
                    document.body.style.setProperty('--text-primary', '#e0e0ff');
                    document.body.style.setProperty('--text-secondary', '#a0a0c0');
                    themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Theme';
                }
            });
            
            resetBtn.addEventListener('click', () => {
                // Reset all interactive elements to default state
                location.reload();
            });
        }

        // Initialize GSAP animations
        function initAnimations() {
            // Register ScrollTrigger plugin
            gsap.registerPlugin(ScrollTrigger);
            
            // Animate hero content
            gsap.from('.hologram-logo', {
                duration: 2,
                y: 100,
                opacity: 0,
                ease: 'power3.out'
            });
            
            gsap.from('.tagline', {
                duration: 1.5,
                y: 50,
                opacity: 0,
                delay: 0.5,
                ease: 'power3.out'
            });
            
            // Animate section titles
            gsap.utils.toArray('.section-title').forEach(title => {
                gsap.from(title, {
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                });
            });
            
            // Animate about panel
            gsap.from('.holographic-panel', {
                scrollTrigger: {
                    trigger: '.holographic-panel',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
            
            // Animate tech icons
            gsap.utils.toArray('.tech-icon').forEach((icon, i) => {
                gsap.from(icon, {
                    scrollTrigger: {
                        trigger: '.tech-orbit',
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    },
                    scale: 0,
                    rotation: 360,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: 'back.out(1.7)'
                });
            });
            
            // Animate journey nodes
            gsap.utils.toArray('.journey-node').forEach((node, i) => {
                gsap.from(node, {
                    scrollTrigger: {
                        trigger: node,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    },
                    x: i % 2 === 0 ? -100 : 100,
                    opacity: 0,
                    duration: 1,
                    delay: i * 0.2,
                    ease: 'power3.out'
                });
            });
            
            // Animate project cards
            gsap.utils.toArray('.project-card').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    delay: i * 0.1,
                    ease: 'power3.out'
                });
            });
            
            // Animate contact form
            gsap.from('.contact-form', {
                scrollTrigger: {
                    trigger: '.contact-form',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                x: -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
            
            gsap.from('.contact-info', {
                scrollTrigger: {
                    trigger: '.contact-info',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                x: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
            
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          
            const href = anchor.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const target = document.querySelector(targetId);
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
            
           // Form submission handler for mailto
            document.getElementById('contactForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const form = this;
                const submitBtn = form.querySelector('.submit-btn');
                const originalText = submitBtn.querySelector('span').textContent;
        
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
   
                const mailtoLink = `mailto:drixyl.nacu@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`)}`;

                submitBtn.querySelector('span').textContent = 'Opening Email...';
                submitBtn.style.background = 'var(--neon-pink)';
                submitBtn.style.color = 'var(--dark-purple)';
           
                window.location.href = mailtoLink;
                
                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.style.background = 'transparent';
                    submitBtn.style.color = 'var(--neon-pink)';
                    form.reset();
                }, 2000);
            });
            
            document.addEventListener('click', (e) => {
                for (let i = 0; i < 8; i++) {
                    const particle = document.createElement('div');
                    particle.style.position = 'fixed';
                    particle.style.width = '6px';
                    particle.style.height = '6px';
                    particle.style.borderRadius = '50%';
                    particle.style.background = Math.random() > 0.5 ? 'var(--neon-pink)' : 'var(--neon-purple)';
                    particle.style.pointerEvents = 'none';
                    particle.style.zIndex = '9999';
                    particle.style.left = e.clientX + 'px';
                    particle.style.top = e.clientY + 'px';
                    
                    document.body.appendChild(particle);
                    
                    gsap.to(particle, {
                        x: (Math.random() - 0.5) * 150,
                        y: (Math.random() - 0.5) * 150,
                        opacity: 0,
                        scale: 0,
                        duration: Math.random() * 1.5 + 0.5,
                        ease: 'power2.out',
                        onComplete: () => {
                            document.body.removeChild(particle);
                        }
                    });
                }
            });
        }

