/**
 * CV Generation logic using jsPDF
 */

function generateCV() {
    if (!portfolioData) return;
    const { profile, skills, experience, education, certificates, portfolio, ui } = portfolioData;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Theme Colors
    const colors = {
        primary: [31, 41, 55],    // Black/Dark Gray
        secondary: [212, 175, 55], // Orange (Website Theme)
        sidebarBg: [235, 238, 242], // Light Gray
        textBlack: [0, 0, 0],      // Max Contrast
        textMain: [31, 41, 55],
        textLight: [75, 85, 99]
    };

    const sidebarWidth = 65;
    const mainX = sidebarWidth + 12;

    // --- PAGING SYSTEM ---
    let sidePage = 1;
    let mainPage = 1;

    // Helper: Ensure page exists and has sidebar background
    const preparePage = (n) => {
        const totalPages = doc.internal.getNumberOfPages();
        if (n > totalPages) {
            for (let i = totalPages + 1; i <= n; i++) {
                doc.addPage();
                doc.setFillColor(...colors.sidebarBg);
                doc.rect(0, 0, sidebarWidth, pageHeight, 'F');
                doc.setDrawColor(200, 200, 200);
                doc.setLineWidth(0.1);
                doc.line(sidebarWidth, 0, sidebarWidth, pageHeight);
            }
        }
        doc.setPage(n);
    };

    // Initialize first page
    preparePage(1);

    // Helper: Draw Sidebar Header
    const drawSidebarHeader = (text, y) => {
        if (y > pageHeight - 30) {
            sidePage++;
            preparePage(sidePage);
            y = 20;
        }
        doc.setPage(sidePage);
        doc.setFillColor(...colors.primary);
        doc.rect(0, y, sidebarWidth - 5, 8, 'F');
        doc.triangle(sidebarWidth - 5, y, sidebarWidth - 5, y + 8, sidebarWidth + 2, y + 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text(text.toUpperCase(), (sidebarWidth - 5) / 2, y + 5.5, { align: 'center' });
        return y + 15;
    };

    // --- SIDEBAR ---
    let sideY = 25;

    // 1. Photo / Avatar (AH initials)
    doc.setDrawColor(...colors.secondary);
    doc.setLineWidth(1.5);
    doc.circle(sidebarWidth / 2, sideY, 18, 'S');
    doc.setFontSize(16);
    doc.setTextColor(...colors.textBlack);
    doc.setFont('helvetica', 'bold');
    doc.text("AH", sidebarWidth / 2, sideY + 2, { align: 'center' });
    sideY += 35;

    // 2. Contact
    sideY = drawSidebarHeader("Contact", sideY);
    const contactConfig = [
        { label: 'PHONE:', text: profile.phone },
        { label: 'EMAIL:', text: profile.email },
        { label: 'LINKEDIN:', text: "achmad-hamzah" },
        { label: 'ADDRESS:', text: profile.location }
    ];

    contactConfig.forEach(item => {
        if (sideY > pageHeight - 15) sideY = drawSidebarHeader("Contact", sideY);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...colors.primary);
        doc.text(item.label, 10, sideY);
        sideY += 4;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...colors.textBlack);
        const lines = doc.splitTextToSize(item.text, sidebarWidth - 15);
        doc.text(lines, 10, sideY);
        sideY += (lines.length * 4.5) + 2;
    });
    sideY += 3;
    sideY += 5;

    // 3. Education
    sideY = drawSidebarHeader(ui.section_education || "Education", sideY);
    education.forEach(edu => {
        if (sideY > pageHeight - 25) { sideY = drawSidebarHeader(ui.section_education || "Education", sideY); }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(...colors.textBlack);
        const degLines = doc.splitTextToSize(t(edu, 'degree'), sidebarWidth - 20);
        doc.text(degLines, 10, sideY);
        sideY += degLines.length * 4.5;
        doc.setFontSize(8.5);
        doc.setTextColor(...colors.textMain);
        doc.text(t(edu, 'institution'), 10, sideY);
        sideY += 4.5;
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...colors.textLight);
        doc.text(edu.period + (edu.gpa ? ` | GPA: ${edu.gpa}` : ''), 10, sideY);
        sideY += 8;
    });

    // 4. Tech Skills
    sideY = drawSidebarHeader("Tech Skills", sideY);
    doc.setFontSize(8);
    doc.setTextColor(...colors.textBlack);
    skills.technical.slice(0, 5).forEach(cat => {
        if (sideY > pageHeight - 15) { sideY = drawSidebarHeader("Tech Skills", sideY); }
        doc.setFont('helvetica', 'bold');
        doc.text(cat.category.toUpperCase(), 10, sideY);
        sideY += 4.5;
        doc.setFont('helvetica', 'normal');
        const items = cat.items.join(', ');
        const skillLines = doc.splitTextToSize(items, sidebarWidth - 20);
        doc.text(skillLines, 10, sideY);
        sideY += skillLines.length * 4 + 2;
    });

    // 5. Soft Skills
    sideY = drawSidebarHeader("Soft Skills", sideY);
    skills.soft.slice(0, 10).forEach(skill => {
        if (sideY > pageHeight - 10) sideY = drawSidebarHeader("Soft Skills", sideY);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...colors.textBlack);
        doc.text(`- ${skill}`, 12, sideY);
        sideY += 5;
    });

    // Language
    sideY = drawSidebarHeader("Language", sideY);
    profile.languages.slice(0, 3).forEach(lang => {
        if (sideY > pageHeight - 10) sideY = drawSidebarHeader("Language", sideY);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...colors.textBlack);
        doc.text(`- ${lang.name} (${lang.level})`, 12, sideY);
        sideY += 5;
    });

    // --- MAIN CONTENT ---
    let yPos = 25;
    preparePage(1); // Return to first page for main body

    doc.setTextColor(...colors.primary);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.text(profile.name.toUpperCase(), mainX, yPos);

    yPos += 10;
    doc.setFontSize(14);
    doc.setTextColor(...colors.secondary);
    doc.setFont('helvetica', 'normal');
    doc.text(profile.title.toUpperCase(), mainX, yPos);

    yPos += 15;

    // Professional Summary
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...colors.primary);
    doc.text("Professional Summary", mainX, yPos);

    yPos += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...colors.textBlack);
    const sumLines = doc.splitTextToSize(profile.bio, pageWidth - mainX - 10);
    doc.text(sumLines, mainX, yPos);
    yPos += sumLines.length * 4.5 + 10;

    // Professional Experience
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text("Professional Experience", mainX, yPos);
    yPos += 10;

    experience.forEach(job => {
        if (yPos > pageHeight - 50) {
            mainPage++;
            preparePage(mainPage);
            yPos = 20;
        }

        doc.setDrawColor(209, 213, 219);
        doc.setLineWidth(0.3);
        doc.line(mainX + 2, yPos - 5, mainX + 2, yPos + 25);

        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...colors.primary);
        doc.text(t(job, 'position'), mainX + 7, yPos);

        yPos += 5.5;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...colors.textLight);
        doc.text(job.company, mainX + 7, yPos);

        yPos += 4.5;
        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(...colors.secondary);
        doc.text(t(job, 'period'), mainX + 7, yPos);

        yPos += 6.5;
        doc.setTextColor(...colors.textBlack);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const achievements = t(job, 'achievements') || [];
        achievements.forEach(ach => {
            const achLines = doc.splitTextToSize(`\u2022 ${ach}`, pageWidth - mainX - 15);
            achLines.forEach(line => {
                if (yPos > pageHeight - 15) {
                    mainPage++;
                    preparePage(mainPage);
                    yPos = 20;
                }
                doc.text(line, mainX + 10, yPos);
                yPos += 4.8;
            });
        });
        yPos += 6;
    });

    const featuredCerts = certificates.filter(c => c.featured);
    if (featuredCerts.length > 0) {
        if (yPos > pageHeight - 50) { mainPage++; preparePage(mainPage); yPos = 20; }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(...colors.primary);
        doc.text("Featured Certifications", mainX, yPos);
        yPos += 8;

        featuredCerts.forEach(cert => {
            if (yPos > pageHeight - 15) { mainPage++; preparePage(mainPage); yPos = 20; }
            doc.setFontSize(9.5);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...colors.textBlack);
            doc.text(`\u2022 ${t(cert, 'name')} - ${cert.issuer} (${cert.date})`, mainX + 5, yPos);
            yPos += 5.5;
        });
        yPos += 10;
    }

    // Portfolio Highlights
    if (portfolio && portfolio.length > 0) {
        if (yPos > pageHeight - 50) { mainPage++; preparePage(mainPage); yPos = 20; }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.text("Portfolio Highlights", mainX, yPos);
        yPos += 8;

        portfolio.filter(p => p.featured).slice(0, 5).forEach(proj => {
            if (yPos > pageHeight - 40) { mainPage++; preparePage(mainPage); yPos = 20; }
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...colors.primary);
            doc.text(t(proj, 'title'), mainX + 5, yPos);
            yPos += 5;
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...colors.textLight);
            const pDesc = t(proj, 'description');
            const pLines = doc.splitTextToSize(pDesc, pageWidth - mainX - 15);
            pLines.forEach(line => {
                doc.text(line, mainX + 5, yPos);
                yPos += 4.5;
            });
            yPos += 5;
        });
    }

    doc.save(`${profile.name.replace(/\s+/g, '_')}_CV.pdf`);
}
