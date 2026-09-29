/* ==========================================================================
   SLIDE-STYLE PORTFOLIO - CORE LOGIC
   Features: Slide Observer, Level Slider Animations, Portfolio Filter, Modals, Forms
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* 1. SCROLL HEADER BLUR & ACTIVE NAV LINK TRIGGER */
    const header = document.querySelector('.main-header');
    const sections = document.querySelectorAll('.slide-section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        highlightNavLink();
    });

    function highlightNavLink() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 180; // Offset for header height and threshold

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }


    /* 2. MOBILE NAVIGATION TOGGLE */
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const openMenu = () => {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', openMenu);
    mobileClose.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    /* 3. SKILL LEVEL PROGRESS BAR ANIMATIONS (VIEWPORT OBSERVER) */
    const progressFills = document.querySelectorAll('.slider-fill');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const targetPercent = fill.getAttribute('data-progress');
                // Set width to trigger CSS transition
                fill.style.width = targetPercent;
                // Once animated, stop observing this specific progress fill
                skillsObserver.unobserve(fill);
            }
        });
    }, {
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: '0px 0px -30px 0px'
    });

    progressFills.forEach(fill => {
        // Start width at 0
        fill.style.width = '0%';
        skillsObserver.observe(fill);
    });


    /* 4. PORTFOLIO FILTER SYSTEM */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                card.style.transform = 'scale(0.85)';
                card.style.opacity = '0';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.transform = 'scale(1)';
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // Trigger active filter on page load to initialize grid display
    const activeFilter = document.querySelector('.filter-btn.active');
    if (activeFilter) {
        const initialFilter = activeFilter.getAttribute('data-filter');
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (initialFilter === 'all' || category === initialFilter) {
                card.style.display = 'block';
                card.style.transform = 'scale(1)';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
            }
        });
    }


    /* 5. CUSTOM VIDEO MODAL PLAYER CONTROL */
    const modal = document.getElementById('video-player-modal');
    const modalVideo = document.getElementById('modal-video');
    const modalClose = document.querySelector('.modal-close-btn');
    const modalBg = document.querySelector('.modal-bg');
    
    const mTitle = document.getElementById('modal-project-title');
    const mClient = document.getElementById('modal-project-client');
    const mRole = document.getElementById('modal-project-role');
    const mDesc = document.getElementById('modal-project-desc');
    const mTools = document.getElementById('modal-project-tools');

    // Portfolio project modal triggers
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoUrl = card.getAttribute('data-video');
            const title = card.querySelector('.project-title').textContent;
            const category = card.querySelector('.project-cat').textContent;
            
            const client = card.querySelector('.meta-client').textContent;
            const role = card.querySelector('.meta-role').textContent;
            const desc = card.querySelector('.meta-desc').textContent;
            const tools = card.querySelector('.meta-tools').textContent;

            mTitle.textContent = title;
            mClient.textContent = client;
            mRole.textContent = role;
            mDesc.textContent = desc;
            mTools.textContent = tools;

            modalVideo.src = videoUrl;
            modalVideo.onloadedmetadata = () => {
                const aspectRatio = modalVideo.videoWidth / modalVideo.videoHeight;
                if (aspectRatio < 1) {
                    modal.classList.add('vertical-video');
                } else {
                    modal.classList.remove('vertical-video');
                }
            };
            modal.classList.add('open');
            modalVideo.play().catch(e => console.log('Autoplay blocked:', e));
            document.body.style.overflow = 'hidden';
        });

        // Interactive video hover preview (silent video playback on mouse hover)
        const previewVideo = card.querySelector('.project-card-video');
        if (previewVideo) {
            card.addEventListener('mouseenter', () => {
                previewVideo.play().catch(() => {});
            });
            card.addEventListener('mouseleave', () => {
                previewVideo.pause();
                previewVideo.currentTime = 0;
            });
        }
    });

    // Main showreel trigger (linked in Portfolio card triggers or manually)
    const playShowreelBtn = document.getElementById('play-showreel');
    if (playShowreelBtn) {
        playShowreelBtn.addEventListener('click', () => {
            const videoUrl = playShowreelBtn.getAttribute('data-video-url');
            mTitle.textContent = playShowreelBtn.getAttribute('data-project-title');
            mClient.textContent = playShowreelBtn.getAttribute('data-client');
            mRole.textContent = playShowreelBtn.getAttribute('data-role');
            mDesc.textContent = playShowreelBtn.getAttribute('data-desc');
            mTools.textContent = playShowreelBtn.getAttribute('data-tools');

            modalVideo.src = videoUrl;
            modalVideo.onloadedmetadata = () => {
                const aspectRatio = modalVideo.videoWidth / modalVideo.videoHeight;
                if (aspectRatio < 1) {
                    modal.classList.add('vertical-video');
                } else {
                    modal.classList.remove('vertical-video');
                }
            };
            modal.classList.add('open');
            modalVideo.play().catch(e => console.log('Autoplay blocked:', e));
            document.body.style.overflow = 'hidden';
        });
    }

    const closeVideoModal = () => {
        modal.classList.remove('open');
        modal.classList.remove('vertical-video');
        modalVideo.pause();
        modalVideo.src = '';
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeVideoModal);
    modalBg.addEventListener('click', closeVideoModal);
    
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeVideoModal();
        }
    });


    /* 6. CONTACT FORM VALIDATION */
    const contactForm = document.getElementById('portfolio-contact-form');
    const successOverlay = document.getElementById('form-success');
    const closeSuccessBtn = document.getElementById('close-success-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');

            inputs.forEach(input => {
                const formGroup = input.closest('.form-group');
                
                if (!input.value.trim() || (input.type === 'email' && !validateEmail(input.value))) {
                    isValid = false;
                    formGroup.classList.add('invalid');
                } else {
                    formGroup.classList.remove('invalid');
                }

                input.addEventListener('input', () => {
                    formGroup.classList.remove('invalid');
                });
            });

            if (isValid) {
                successOverlay.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', () => {
            successOverlay.classList.remove('show');
            document.body.style.overflow = '';
            contactForm.reset();
            
            const groups = contactForm.querySelectorAll('.form-group');
            groups.forEach(g => g.classList.remove('invalid'));
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }


    /* 7. SCROLL INTERSECTION OBSERVER FOR SLIDE REVEALS */
    const revealElements = document.querySelectorAll('.scroll-anim');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    /* 8. INTERACTIVE GRAVITY CANVAS ANIMATION */
    const canvas = document.getElementById('gravity-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const svgStrings = [
            // Premiere Pro (Pr)
            `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="#00005B" stroke="#9999FF" stroke-width="2"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="20" fill="#9999FF">Pr</text></svg>`,
            // DaVinci Resolve
            `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="#12131C" stroke="#FF5C38" stroke-width="1.5"/><g transform="scale(1.6667)"><path d="M11.962 3.423c-1.976.089-3.204 1.658-3.214 3.29.019 1.443 1.635 3.481 2.884 4.53.12.099.154.109.33.18.062.025.198-.047.327-.135.36-.245.993-.947 1.648-1.738a7.67 7.67 0 0 0 1.031-1.683c.409-.89.261-1.599.235-1.888a3.983 3.983 0 0 0-.99-1.692 3.36 3.36 0 0 0-2.251-.864z" fill="#FF4D4D"/><path d="M16.134 11.345a10.185 10.185 0 0 0-3.244.61c-.15.058-.26.1-.374.17-.057.036-.11.135-.105.292.017.433.29 1.278.624 2.27.384 1.135 1.066 2.27 1.844 2.74a3.23 3.23 0 0 0 2.53.342c.832-.243 1.595-.868 1.962-1.546.986-1.818.19-3.548-1.121-4.417-.447-.296-1.133-.445-1.89-.46-.074 0-.15-.002-.226-.001z" fill="#34C759"/><path d="M7.702 11.383a6.201 6.201 0 0 0-.752.047c-.596.078-.932.273-1.29.51a3.177 3.177 0 0 0-1.365 1.979c-.075.552-.086 1.053.033 1.507.433 1.389 1.326 2.222 2.847 2.452.636.028 1.37-.063 1.99-.45 1.269-.782 2.08-3.17 2.412-4.742.053-.176.035-.357-.013-.42-.005-.067-.044-.113-.19-.183-.398-.192-1.32-.417-2.375-.6a7.68 7.68 0 0 0-1.297-.1z" fill="#007AFF"/></g></svg>`,
            // After Effects (Ae)
            `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="#00003B" stroke="#D999FF" stroke-width="2"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="20" fill="#D999FF">Ae</text></svg>`,
            // CapCut
            `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="#000000" stroke="#FFFFFF" stroke-width="1.5"/><path d="M24.189 6.442V2.671l-4.535 2.383V4.91c.002-1.505-1.078-2.411-2.638-2.411H2.64C.993 2.5 0 3.407 0 4.91V8.72L6.354 12 0 15.316v3.8C0 20.595 1 21.5 2.64 21.5h14.373c1.56 0 2.639-.907 2.639-2.382v-.197l4.536 2.409v-3.828L13.64 12 24.19 6.443zM9.982 13.873l7.797 4.083H2.157l7.825-4.083zm7.741-7.828l-7.742 4.057-7.825-4.057h15.567z" fill="#FFFFFF" transform="translate(8, 9.25)"/></svg>`
        ];

        const images = svgStrings.map(svg => {
            const img = new Image();
            img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
            return img;
        });

        const maxSpeed = 1.2;
        const minSpeed = 0.2;

        class LogoParticle {
            constructor(x, y, size = null) {
                this.size = size || Math.floor(Math.random() * 15) + 30; // 30px to 45px
                this.x = x !== null && x !== undefined ? x : Math.random() * (canvas.width - this.size);
                // Spread initial Y positions across the viewport so they start distributed
                this.y = y !== null && y !== undefined ? y : Math.random() * (canvas.height - this.size);
                
                // Low speed multi-directional velocity for floating
                this.vx = (Math.random() - 0.5) * 1.5;
                this.vy = (Math.random() - 0.5) * 1.5;
                
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.015;
                this.image = images[Math.floor(Math.random() * images.length)];
            }

            update() {
                // Gently add a tiny random drift force to mimic light air currents
                this.vx += (Math.random() - 0.5) * 0.02;
                this.vy += (Math.random() - 0.5) * 0.02;

                this.x += this.vx;
                this.y += this.vy;
                this.rotation += this.rotationSpeed;

                // Mouse interaction repulsion force
                if (mouse.x !== null && mouse.y !== null) {
                    const centerX = this.x + this.size / 2;
                    const centerY = this.y + this.size / 2;
                    const dx = centerX - mouse.x;
                    const dy = centerY - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        const pushForce = force * 2.0;
                        this.vx += Math.cos(angle) * pushForce;
                        this.vy += Math.sin(angle) * pushForce;
                    }
                }

                // Cap speeds to keep the floating smooth
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (speed > maxSpeed) {
                    this.vx = (this.vx / speed) * maxSpeed;
                    this.vy = (this.vy / speed) * maxSpeed;
                } else if (speed < minSpeed && speed > 0) {
                    this.vx = (this.vx / speed) * minSpeed;
                    this.vy = (this.vy / speed) * minSpeed;
                }

                // Floor bounce
                if (this.y + this.size > canvas.height) {
                    this.y = canvas.height - this.size;
                    this.vy = -Math.abs(this.vy);
                }

                // Ceiling bounce
                if (this.y < 0) {
                    this.y = 0;
                    this.vy = Math.abs(this.vy);
                }

                // Left wall bounce
                if (this.x < 0) {
                    this.x = 0;
                    this.vx = Math.abs(this.vx);
                }

                // Right wall bounce
                if (this.x + this.size > canvas.width) {
                    this.x = canvas.width - this.size;
                    this.vx = -Math.abs(this.vx);
                }
            }

            draw() {
                if (this.image.complete && this.image.naturalWidth !== 0) {
                    ctx.save();
                    ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
                    ctx.rotate(this.rotation);
                    ctx.drawImage(this.image, -this.size / 2, -this.size / 2, this.size, this.size);
                    ctx.restore();
                }
            }
        }

        const mouse = { x: null, y: null, radius: 180 };
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Spawn initial particles
        const initialCount = 14;
        for (let i = 0; i < initialCount; i++) {
            particles.push(new LogoParticle());
        }

        // Click interaction to spawn and toss a logo
        window.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input') || e.target.closest('textarea') || e.target.closest('.modal-content') || e.target.closest('.menu-toggle') || e.target.closest('.mobile-nav')) {
                return;
            }
            const size = Math.floor(Math.random() * 15) + 30;
            const p = new LogoParticle(e.clientX - size / 2, e.clientY - size / 2, size);
            p.vx = (Math.random() - 0.5) * 4;
            p.vy = (Math.random() - 0.5) * 4; // drift in any direction
            particles.push(p);

            if (particles.length > 50) {
                particles.shift();
            }
        });

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }

});



