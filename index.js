// Skills Section
const skills = [
    { name: "HTML", value: 80 },
    { name: "CSS", value: 70 },
    { name: "JavaScript", value: 80 },
    { name: "Linux", value: 70 },
    { name: "Python", value: 90 },
    { name: "XML", value: 90 },
    { name: "Database", value: 75 }
];

function renderSkills(skills) {
    const mid = Math.ceil(skills.length / 2);
    const columns = [skills.slice(0, mid), skills.slice(mid)];
    const html = columns.map((col, idx) => `
        <div class="col-lg-6" data-aos="fade-up"${idx ? ' data-aos-delay="100"' : ''}>
            ${col.map(skill => `
                <div class="progress">
                    <span class="skill">${skill.name} <i class="val">${skill.value}%</i></span>
                    <div class="progress-bar-wrap">
                        <div class="progress-bar" role="progressbar" aria-valuenow="${skill.value}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('');
    document.getElementById('skills-content').innerHTML = html;
}
renderSkills(skills);

// Services Section
const services = [
    {
    icon: "icofont-computer",
    title: "Odoo Modul Customize",
    desc: "I can do customize odoo module for spesific purpose."
    },
    {
    icon: "icofont-chart-bar-graph",
    title: "Odoo Technical Training",
    desc: "I can train you to become odoo developer."
    },
    {
    icon: "icofont-earth",
    title: "Other Training",
    desc: "I can deliver training for other subjects."
    }
];

function renderServices(list) {
    document.getElementById('services-list').innerHTML = list.map((srv, idx) => `
    <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up"${idx ? ` data-aos-delay="${idx * 100}"` : ''}>
        <div class="icon"><i class="${srv.icon}"></i></div>
        <h4 class="title"><a href="#">${srv.title}</a></h4>
        <p class="description">${srv.desc}</p>
    </div>
    `).join('');
}
renderServices(services);

// Resume Section
const resumeData = {
    education: [
        {
            title: "Sarjana Sistem Informasi",
            period: "2024 - Present",
            place: "Universitas Terbuka",
            desc: "Currently pursuing a Bachelor's degree in Information Systems. Focused on enhancing my knowledge in software development and database management."
        },
        {
            title: "Diploma in Computer Technology",
            period: "2016 - 2019",
            place: "Telkom University",
            desc: "Gained comprehensive knowledge in software development, embedded systems, and networking. Successfully designed and built line follower robots as part of academic projects."
        }
    ],
    experience: [
        {
            title: "Odoo Developer & Technical Trainer",
            period: "May 2021 - Present",
            place: "Nurosoft Consulting",
            desc: [
                "Develop and customize Odoo modules to meet client-specific requirements.",
                "Deliver technical training sessions to enhance team proficiency in Odoo development."
            ]
        },
        {
            title: "Freelance Frontend Developer",
            period: "September 2020 - October 2020",
            place: "PT. Kelola Mina Laut",
            desc: [
                "Developed an internal ERP system to streamline company operations."
            ]
        },
        {
            title: "Database Engineer",
            period: "December 2019 - February 2020",
            place: "PT. Mitra Informatika",
            desc: [
                "Optimized complex database queries to improve system performance.",
                "Maintained and monitored server infrastructure.",
                "Developed a web-based monitoring tool for slow queries."
            ]
        },
        {
            title: "Junior Frontend Developer",
            period: "August 2019 - November 2019",
            place: "PT. Techno Infinity",
            desc: [
                "Implemented database replication solutions.",
                "Contributed to the development of the company’s marketplace website."
            ]
        }
    ]
};

function renderResume(resume) {
    const eduHtml = `
    <div class="col-lg-6" data-aos="fade-up">
        <h3 class="resume-title">Education</h3>
        ${resume.education.map(item => `
        <div class="resume-item">
            <h4>${item.title}</h4>
            <h5>${item.period}</h5>
            <p><em>${item.place}</em></p>
            <p>${item.desc}</p>
        </div>
        `).join('')}
    </div>
    `;

    const expHtml = `
    <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
        <h3 class="resume-title">Professional Experience</h3>
        ${resume.experience.map(item => `
        <div class="resume-item">
            <h4>${item.title}</h4>
            <h5>${item.period}</h5>
            <p><em>${item.place}</em></p>
            <ul>
            ${item.desc.map(d => `<li>${d}</li>`).join('')}
            </ul>
        </div>
        `).join('')}
    </div>
    `;

    document.getElementById('resume-content').innerHTML = eduHtml + expHtml;
}
renderResume(resumeData);

// Certification Section
const certifications = [
    {
    img: "assets/img/certificates/07Z6L4VJJPQR.png",
    title: "Belajar Dasar Pemrograman Web",
    link: "https://www.dicoding.com/certificates/07Z6L4VJJPQR",
    filters: ["filter-cweb", "filter-cfrontend"]
    },
    {
    img: "assets/img/certificates/JMZV27QW3ZN9.png",
    title: "Belajar Membuat Aplikasi Flutter untuk Pemula",
    link: "https://www.dicoding.com/certificates/JMZV27QW3ZN9",
    filters: ["filter-cweb", "filter-capps"]
    },
    {
    img: "assets/img/certificates/061221142324.png",
    title: "Memulai Pemrograman dengan Dart",
    link: "https://www.dicoding.com/certificates/NVP71D1QGPR0",
    filters: ["filter-cweb", "filter-capps", "filter-cfrontend", "filter-cbackend"]
    },
    {
    img: "assets/img/certificates/JLX136375P72.png",
    title: "Cloud Practitioner Essentials",
    link: "https://www.dicoding.com/certificates/JLX136375P72",
    filters: ["filter-cbackend"]
    },
    {
    img: "assets/img/certificates/4EXG6L6QGZRL.png",
    title: "Belajar Dasar Pemrograman Javascript",
    link: "https://www.dicoding.com/certificates/4EXG6L6QGZRL",
    filters: ["filter-cfrontend", "filter-cbackend"]
    },
    {
    img: "assets/img/certificates/81P21JGOOZOY.png",
    title: "Belajar Membuat Aplikasi Back-End untuk Pemula",
    link: "https://www.dicoding.com/certificates/81P21JGOOZOY",
    filters: ["filter-cbackend"]
    },
    {
    img: "assets/img/certificates/1RXYY9Y21XVM.png",
    title: "Architecting on AWS",
    link: "https://www.dicoding.com/certificates/1RXYY9Y21XVM",
    filters: ["filter-cbackend"]
    },
    {
    img: "assets/img/certificates/GRX5KYD6YZ0M.png",
    title: "Belajar Dasar GIT dengan Github",
    link: "https://www.dicoding.com/certificates/GRX5KYD6YZ0M",
    filters: ["filter-cbackend"]
    }
];

function renderCertifications(list) {
    document.getElementById('certification-list').innerHTML = list.map(cert => `
    <div class="col-lg-6 col-md-6 portfolio-item ${cert.filters.join(' ')}">
        <div class="portfolio-wrap">
        <img src="${cert.img}" class="img-fluid" alt="">
        <div class="portfolio-links">
            <a href="${cert.img}" data-gall="portfolioGallery" class="venobox" title="${cert.title}"><i class="bx bx-show"></i></a>
            <a href="${cert.link}" target="_blank" title="More Details"><i class="bx bx-link"></i></a>
        </div>
        <p class="text-center">${cert.title}</p>
        </div>
    </div>
    `).join('');
}
renderCertifications(certifications);

// Portfolio Section
const portfolios = [
    {
    img: "assets/img/portfolio/portfolio-1.jpg",
    title: "App 1",
    link: "portfolio-details.html",
    filters: ["filter-papp"]
    },
    {
    img: "assets/img/portfolio/portfolio-2.jpg",
    title: "Web 3",
    link: "portfolio-details.html",
    filters: ["filter-pweb"]
    },
    {
    img: "assets/img/portfolio/portfolio-3.jpg",
    title: "App 2",
    link: "portfolio-details.html",
    filters: ["filter-papp"]
    },
    {
    img: "assets/img/portfolio/portfolio-4.jpg",
    title: "Card 2",
    link: "portfolio-details.html",
    filters: ["filter-pcard"]
    },
    {
    img: "assets/img/portfolio/portfolio-5.jpg",
    title: "Web 2",
    link: "portfolio-details.html",
    filters: ["filter-pweb"]
    },
    {
    img: "assets/img/portfolio/portfolio-6.jpg",
    title: "App 3",
    link: "portfolio-details.html",
    filters: ["filter-papp"]
    },
    {
    img: "assets/img/portfolio/portfolio-7.jpg",
    title: "Card 1",
    link: "portfolio-details.html",
    filters: ["filter-pcard"]
    },
    {
    img: "assets/img/portfolio/portfolio-8.jpg",
    title: "Card 3",
    link: "portfolio-details.html",
    filters: ["filter-pcard"]
    },
    {
    img: "assets/img/portfolio/portfolio-9.jpg",
    title: "Web 3",
    link: "portfolio-details.html",
    filters: ["filter-pweb"]
    }
];

function renderPortfolios(list) {
    document.getElementById('portfolio-list').innerHTML = list.map(portfolio => `
    <div class="col-lg-6 col-md-6 portfolio-item ${portfolio.filters.join(' ')}">
        <div class="portfolio-wrap">
        <img src="${portfolio.img}" class="img-fluid" alt="">
        <div class="portfolio-links">
            <a href="${portfolio.img}" data-gall="portfolioGallery" class="venobox" title="${portfolio.title}"><i class="bx bx-plus"></i></a>
            <a href="${portfolio.link}" title="More Details"><i class="bx bx-link"></i></a>
        </div>
        </div>
    </div>
    `).join('');
}
renderPortfolios(portfolios);

// Filter functionality for Certification and Portfolio
function setupFilters(filterId, containerId) {
    const filters = document.querySelectorAll(`#${filterId} li`);
    const items = document.querySelectorAll(`#${containerId} .portfolio-item`);
    filters.forEach(filter => {
    filter.addEventListener('click', function () {
        filters.forEach(f => f.classList.remove('filter-active'));
        this.classList.add('filter-active');
        const filterValue = this.getAttribute('data-filter');
        items.forEach(item => {
        if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
        });
    });
    });
}
setupFilters('certification-flters', 'certification-list');
setupFilters('portfolio-flters', 'portfolio-list');