/**
 * Main application logic and state management
 */

// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const backToTop = document.getElementById('backToTop');
const loadingScreen = document.getElementById('loadingScreen');
const progressBar = document.getElementById('progressBar');
const scrollProgress = document.getElementById('scrollProgress');
const particleCanvas = document.getElementById('particleCanvas');
const projectModal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close-modal');

// Data storage
let portfolioData = null;
let currentLang = localStorage.getItem('selectedLang') || 'en';
let particles = [];
let testimonialIndex = 0;

// Canvas setup for particles
const ctx = particleCanvas.getContext('2d');

// Initialize application
document.addEventListener('DOMContentLoaded', initializeApp);

async function initializeApp() {
    try {
        showLoadingProgress(0);
        setupCanvas();
        showLoadingProgress(20);
        await loadData();
        showLoadingProgress(60);
        setupNavigation();
        setupParticles();
        setupScrollEffects();
        setupPortfolioFilters();
        setupCertificateFilters();
        setupTestimonialSlider();
        setupContactForm();
        setupDownloadCV();
        setupLanguageToggle();
        setupProjectModal();
        setupScrollProgress();
        showLoadingProgress(80);
        await renderContent();
        showLoadingProgress(100);
        setTimeout(hideLoadingScreen, 500);
    } catch (error) {
        console.error('Error initializing app:', error);
        hideLoadingScreen();
    }
}

function showLoadingProgress(percentage) {
    if (progressBar) progressBar.style.width = percentage + '%';
}

function hideLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'visible';
    }
}

// Data Loading
async function loadData() {
    try {
        const response = await fetch('./assets/data/data.json');
        portfolioData = await response.json();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Canvas and Particles
function setupCanvas() {
    function resizeCanvas() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

function setupParticles() {
    const particleCount = window.innerWidth > 768 ? 100 : 50;
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * particleCanvas.width,
            y: Math.random() * particleCanvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2,
            color: `hsl(${35 + Math.random() * 25}, 75%, 65%)`
        });
    }
    animateParticles();
}

function animateParticles() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0) particle.x = particleCanvas.width;
        if (particle.x > particleCanvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = particleCanvas.height;
        if (particle.y > particleCanvas.height) particle.y = 0;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
    });
    drawConnections();
    ctx.globalAlpha = 1;
    requestAnimationFrame(animateParticles);
}

function drawConnections() {
    particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
            const distance = Math.sqrt(
                Math.pow(particle.x - otherParticle.x, 2) +
                Math.pow(particle.y - otherParticle.y, 2)
            );
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.strokeStyle = `rgba(212, 175, 55, ${0.2 - distance / 500})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        });
    });
}

// Scroll Progress
function setupScrollProgress() {
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollProgress) scrollProgress.style.width = scrolled + "%";
    });
}

// Navigation
function setupNavigation() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');

        updateActiveNavLink();

        if (window.scrollY > 500) backToTop.classList.add('show');
        else backToTop.classList.remove('show');
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) link.classList.add('active');
    });
}

// Scroll Effects
function setupScrollEffects() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -10% 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('fade-in-up');
        });
    }, observerOptions);
    document.querySelectorAll('section, .glass-card, .timeline-item, .portfolio-item').forEach(el => {
        observer.observe(el);
    });
}

// Language Toggle
function setupLanguageToggle() {
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.getAttribute('data-lang');
            if (selectedLang !== currentLang) {
                currentLang = selectedLang;
                localStorage.setItem('selectedLang', currentLang);
                langBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderContent();
            }
        });
    });
}

// Project Modal Logic
function setupProjectModal() {
    if (!closeModal) return;
    closeModal.addEventListener('click', () => {
        projectModal.style.display = "none";
        document.body.style.overflow = "auto";
    });

    window.addEventListener('click', (event) => {
        if (event.target == projectModal) {
            projectModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
}

function openProjectModal(projectId) {
    const project = portfolioData.portfolio.find(p => p.id === projectId);
    if (!project) return;

    const ui = portfolioData.ui;
    modalBody.innerHTML = `
        <img src="${project.image}" alt="${t(project, 'title')}" class="modal-image">
        <h2 class="modal-title">${t(project, 'title')}</h2>
        <div class="modal-tech-list">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <p class="modal-desc">${t(project, 'longDescription')}</p>
        
        <div class="features-list">
            <h3>${ui.modal_key_features}</h3>
            <ul>
                ${t(project, 'features').map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-footer">
            <a href="${project.demoUrl}" target="_blank" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Live Demo</a>
            <a href="${project.githubUrl}" target="_blank" class="btn btn-outline"><i class="fab fa-github"></i> GitHub</a>
        </div>
    `;

    projectModal.style.display = "block";
    document.body.style.overflow = "hidden";
}

// Portfolio Filters
function setupPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category');
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });
}

function setupCertificateFilters() {
    const filterButtons = document.querySelectorAll('.cert-filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            const certificateItems = document.querySelectorAll('.certificate-item');

            certificateItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Testimonial Slider
function setupTestimonialSlider() {
    const container = document.getElementById('testimonials-container');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    if (!container || !nextButton || !prevButton) return;

    function showTestimonial(index) {
        const count = portfolioData.testimonials.length;
        if (count === 0) return;
        testimonialIndex = (index + count) % count;
        container.style.transform = `translateX(-${testimonialIndex * 100}%)`;
    }
    nextButton.addEventListener('click', () => showTestimonial(testimonialIndex + 1));
    prevButton.addEventListener('click', () => showTestimonial(testimonialIndex - 1));
    setInterval(() => showTestimonial(testimonialIndex + 1), 5000);
}

// Contact Form Integration (EmailJS)
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    if (window.emailjs) emailjs.init("7wQgQvtxj0OI7a530");

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const ui = portfolioData.ui;
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;

        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            await emailjs.sendForm('service_d6o9r3s', 'template_jjl8lzi', contactForm);
            showFormMessage(t(ui, 'form_success'), 'success');
            contactForm.reset();
        } catch (error) {
            console.error('EmailJS Error:', error);
            showFormMessage(t(ui, 'form_error'), 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    });
}

function setupDownloadCV() {
    const downloadBtn = document.getElementById('downloadCV');
    if (downloadBtn) downloadBtn.addEventListener('click', generateCV);
}
