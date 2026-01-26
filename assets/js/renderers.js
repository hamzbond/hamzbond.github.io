/**
 * UI Rendering functions
 */

async function renderContent() {
    if (!portfolioData) return;
    renderUI(portfolioData.ui);
    renderProfile(portfolioData.profile);
    renderSkills(portfolioData.skills);
    renderExperience(portfolioData.experience);
    renderEducation(portfolioData.education);
    renderCertificates(portfolioData.certificates);
    renderPortfolio(portfolioData.portfolio);
    renderTestimonials(portfolioData.testimonials);
}

function renderUI(ui) {
    const elements = {
        'nav-home': ui.nav_home,
        'nav-about': ui.nav_about,
        'nav-experience': ui.nav_experience,
        'nav-portfolio': ui.nav_portfolio,
        'nav-contact': ui.nav_contact,
        'btn-view-work': ui.btn_view_work,
        'btn-download-cv': ui.btn_download_cv,
        'btn-get-in-touch': ui.btn_get_in_touch,
        'about-title': ui.section_about_title,
        'about-subtitle': ui.section_about_subtitle,
        'personal-info-title': ui.section_personal_info,
        'tech-skills-title': ui.section_tech_skills,
        'soft-skills-title': ui.section_soft_skills,
        'experience-title': ui.section_experience_title,
        'experience-subtitle': ui.section_experience_subtitle,
        'education-title-sub': ui.section_education,
        'certificates-title-sub': ui.section_certificates,
        'portfolio-title': ui.section_portfolio_title,
        'portfolio-subtitle': ui.section_portfolio_subtitle,
        'testimonials-title': ui.section_testimonials_title,
        'testimonials-subtitle': ui.section_testimonials_subtitle,
        'contact-title': ui.section_contact_title,
        'contact-subtitle': ui.section_contact_subtitle,
        'contact-info-title': ui.section_contact_info,
        'send-message-title': ui.section_send_message
    };

    Object.entries(elements).forEach(([id, text]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    });

    const scrollDownText = document.getElementById('scroll-down-text');
    if (scrollDownText) scrollDownText.textContent = ui.section_scroll_down;

    const loadingText = document.getElementById('loading-text');
    if (loadingText) loadingText.textContent = ui.section_loading;

    if (document.getElementById('label-email')) document.getElementById('label-email').textContent = ui.section_email;
    if (document.getElementById('label-phone')) document.getElementById('label-phone').textContent = ui.section_phone;
    if (document.getElementById('label-location')) document.getElementById('label-location').textContent = ui.section_location;

    if (document.getElementById('languages-title')) document.getElementById('languages-title').textContent = ui.section_languages;
    if (document.getElementById('interests-title')) document.getElementById('interests-title').textContent = ui.section_interests;
    if (document.getElementById('label-availability')) document.getElementById('label-availability').textContent = ui.section_availability;
    if (document.getElementById('label-experience')) document.getElementById('label-experience').textContent = ui.section_experience;
    if (document.getElementById('label-work-mode')) document.getElementById('label-work-mode').textContent = ui.section_work_mode;

    const contactBtn = document.querySelector('#contact-form .btn-primary');
    if (contactBtn) contactBtn.innerHTML = `<i class="fas fa-paper-plane"></i> ${ui.btn_send_message}`;

    const footerLinks = document.querySelectorAll('.footer-links a');
    if (footerLinks.length >= 4) {
        footerLinks[0].textContent = ui.nav_home;
        footerLinks[1].textContent = ui.nav_about;
        footerLinks[2].textContent = ui.nav_portfolio;
        footerLinks[3].textContent = ui.nav_contact;
    }

    const form = document.getElementById('contact-form');
    if (form) {
        form.querySelector('input[name="name"]').placeholder = ui.form_name;
        form.querySelector('input[name="email"]').placeholder = ui.form_email;
        form.querySelector('input[name="subject"]').placeholder = ui.form_subject;
        form.querySelector('textarea[name="message"]').placeholder = ui.form_message;
    }

    const filterBtns = document.querySelectorAll('.filter-btn, .cert-filter-btn');
    filterBtns.forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        const filterKey = `filter_${filter}`;
        if (ui[filterKey]) btn.textContent = ui[filterKey];
    });
}

function renderProfile(profile) {
    document.getElementById('profile-name').textContent = profile.name;
    document.getElementById('profile-title').textContent = profile.title;
    document.getElementById('profile-bio').textContent = profile.bio;
    document.getElementById('profile-avatar').src = profile.avatar;
    document.getElementById('profile-avatar').alt = `${profile.name} - Profile Picture`;

    document.getElementById('info-name').textContent = profile.name;
    document.getElementById('info-location').textContent = profile.location;
    document.getElementById('info-email').textContent = profile.email;
    document.getElementById('info-phone').textContent = profile.phone;

    if (document.getElementById('info-availability')) document.getElementById('info-availability').textContent = profile.availability;
    if (document.getElementById('info-experience')) document.getElementById('info-experience').textContent = `${profile.experience_years} Years`;
    if (document.getElementById('info-work-mode')) document.getElementById('info-work-mode').textContent = profile.work_mode;

    document.getElementById('footer-name').textContent = profile.name;
    document.title = `${profile.name} - ${profile.title}`;

    renderContact(profile);
    renderLanguages(profile.languages);
    renderInterests(profile.interests);
    renderSocialLinks(profile.social);
}

function renderContact(profile) {
    document.getElementById('contact-email').textContent = profile.email;
    document.getElementById('contact-email').href = `mailto:${profile.email}`;
    document.getElementById('contact-phone').textContent = profile.phone;
    document.getElementById('contact-phone').href = `tel:${profile.phone.replace(/\s+/g, '')}`;
    document.getElementById('contact-location').textContent = profile.location;
}

function renderLanguages(languages) {
    const languagesContainer = document.getElementById('languages-list');
    if (!languagesContainer) return;

    const languagesHTML = languages.map(lang => `
        <div class="language-item">
            <span class="language-name">${lang.name}</span>
            <span class="language-level">${lang.level}</span>
        </div>
    `).join('');
    languagesContainer.innerHTML = languagesHTML;
}

function renderInterests(interests) {
    const interestsContainer = document.getElementById('interests-list');
    if (!interestsContainer || !interests) return;

    const interestsHTML = interests.map(interest => `
        <span class="interest-tag">${interest}</span>
    `).join('');
    interestsContainer.innerHTML = interestsHTML;
}

function renderSocialLinks(social) {
    const socialLinksContainer = document.getElementById('social-links');
    const contactSocialContainer = document.getElementById('contact-social');
    const socialPlatforms = [
        { key: 'github', icon: 'fab fa-github', name: 'GitHub' },
        { key: 'linkedin', icon: 'fab fa-linkedin', name: 'LinkedIn' },
        { key: 'instagram', icon: 'fab fa-instagram', name: 'Instagram' }
    ];
    const socialHTML = socialPlatforms
        .filter(platform => social[platform.key])
        .map(platform => `
            <a href="${social[platform.key]}" target="_blank" rel="noopener noreferrer" class="social-link" title="${platform.name}">
                <i class="${platform.icon}"></i>
            </a>
        `).join('');
    socialLinksContainer.innerHTML = socialHTML;
    contactSocialContainer.innerHTML = socialHTML;
}

function renderSkills(skills) {
    const technicalSkillsContainer = document.getElementById('technical-skills');
    const technicalHTML = skills.technical.map(category => `
        <div class="skill-category">
            <div class="skill-category-header">
                <span class="skill-category-icon">${category.icon}</span>
                <span class="skill-category-title">${category.category}</span>
            </div>
            <div class="skill-tags">
                ${category.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
            </div>
        </div>
    `).join('');
    technicalSkillsContainer.innerHTML = technicalHTML;

    const softSkillsContainer = document.getElementById('soft-skills');
    const softHTML = (skills.soft || []).map(skill => `<div class="soft-skill-item">${skill}</div>`).join('');
    softSkillsContainer.innerHTML = softHTML;
}

function renderExperience(experience) {
    const timelineContainer = document.getElementById('experience-timeline');
    const experienceHTML = experience.map(exp => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-period">${t(exp, 'period')}</div>
                <h3 class="timeline-position">${t(exp, 'position')}</h3>
                <div class="timeline-company">${exp.company} - ${t(exp, 'location')}</div>
                <p class="timeline-description">${t(exp, 'description')}</p>
                <ul class="timeline-achievements">
                    ${(t(exp, 'achievements') || []).map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
    timelineContainer.innerHTML = experienceHTML;
}

function renderEducation(education) {
    const timelineContainer = document.getElementById('education-timeline');
    if (!timelineContainer) return;

    const educationHTML = education.map(edu => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-period">${t(edu, 'period')}</div>
                <h3 class="timeline-position">${t(edu, 'degree')}</h3>
                <div class="timeline-company">${t(edu, 'institution')}</div>
                ${edu.gpa ? `<div class="timeline-description">GPA: ${edu.gpa}</div>` : ''}
                <ul class="timeline-achievements">
                    ${(t(edu, 'achievements') || []).map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
    timelineContainer.innerHTML = educationHTML;
}

function renderCertificates(certificates) {
    const certificatesContainer = document.getElementById('certificates-grid');
    if (!certificatesContainer) return;

    const certificatesHTML = certificates.map(cert => `
        <div class="certificate-item" data-category="${cert.category || 'others'}">
            <h3 class="certificate-name">${t(cert, 'name')}</h3>
            <div class="certificate-issuer">${cert.issuer}</div>
            <div class="certificate-date">${cert.date}</div>
            <div class="certificate-id">ID: ${cert.credentialId}</div>
        </div>
    `).join('');
    certificatesContainer.innerHTML = certificatesHTML;
}

function renderPortfolio(portfolio) {
    const portfolioContainer = document.getElementById('portfolio-grid');
    const ui = portfolioData.ui;
    const portfolioHTML = portfolio.map(project => `
        <div class="portfolio-item" 
             data-id="${project.id}"
             data-category="${project.featured ? 'featured' : 'regular'} ${getCategoryFromTech(project.technologies)}">
            ${project.featured ? '<div class="featured-badge">Featured</div>' : ''}
            <div class="portfolio-image">
                <img src="${project.image}" alt="${t(project, 'title')}">
                <div class="portfolio-overlay">
                    <button class="portfolio-link view-details-btn" title="${ui.btn_details}">
                        <i class="fas fa-search-plus"></i>
                    </button>
                    <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="portfolio-link" title="View Demo">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
            <div class="portfolio-content">
                <h3 class="portfolio-title">${t(project, 'title')}</h3>
                <p class="portfolio-description">${t(project, 'description')}</p>
                <div class="portfolio-tech">
                    ${project.technologies.slice(0, 3).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    ${project.technologies.length > 3 ? `<span class="tech-tag">+${project.technologies.length - 3}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
    portfolioContainer.innerHTML = portfolioHTML;

    // Add event listeners for details buttons
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = btn.closest('.portfolio-item').getAttribute('data-id');
            openProjectModal(projectId);
        });
    });

    // Add Tilt Effect
    setupTiltEffect();
}

function setupTiltEffect() {
    const items = document.querySelectorAll('.portfolio-item');
    items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}

function getCategoryFromTech(technologies) {
    const mobileFrameworks = ['React Native', 'Flutter', 'Ionic'];
    if (technologies.some(tech => mobileFrameworks.includes(tech))) return 'mobile';
    return 'web';
}

function renderTestimonials(testimonials) {
    const testimonialsContainer = document.getElementById('testimonials-container');
    if (!testimonialsContainer) return;

    const testimonialsHTML = testimonials.map(testimonial => `
        <div class="testimonial-item">
            <p class="testimonial-text">${t(testimonial, 'text')}</p>
            <div class="testimonial-author">
                <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
                <div class="testimonial-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.position} at ${testimonial.company}</p>
                </div>
            </div>
        </div>
    `).join('');
    testimonialsContainer.innerHTML = testimonialsHTML;
}
