# 🚀 Hamzbond Portfolio

> Modern, professional portfolio website with a golden-brown glassmorphism design, interactive particles, and built-in PDF CV generator.

[![Live Demo](https://img.shields.io/badge/Demo-Live-success?style=for-the-badge)](https://hamzbond.github.io)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://pages.github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **Modular Architecture** - Cleanly separated CSS and JS for better maintenance.
- 📄 **PDF CV Generator** - Real-time PDF generation with custom layout and multi-page support.
- 🌍 **Multi-Language Support** - English (EN) and Indonesian (ID) language toggling.
- 🎨 **Modern Glassmorphism** - Unique golden-brown frosted glass aesthetic.
- ⚡ **Interactive Particle System** - Dynamic canvas-based background with mouse interaction.
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop viewing.
- 🔄 **Data-Driven Content** - Entire portfolio managed via `data.json`.
- 📧 **EmailJS Integration** - Fully functional contact form.

## 🛠️ Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![jsPDF](https://img.shields.io/badge/jsPDF-2.5.1-E34F26?style=flat-square)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat-square&logo=pwa&logoColor=white)

## 📁 Project Structure

```
hamzbond.github.io/
├── 📄 index.html              # Core layout and structure
├── 📁 assets/
│   ├── 🎨 css/                # Modular stylesheets
│   │   ├── base.css           # Design tokens, variables, & resets
│   │   ├── navigation.css     # Navbar, scroll effects, & footer
│   │   ├── sections.css       # Layouts for portfolio components
│   │   └── animations.css     # Transitions & particle setup
│   ├── ⚡ js/                  # Specialized script modules
│   │   ├── main.js             # App initialization & core logic
│   │   ├── renderers.js        # DOM population & UI rendering
│   │   ├── cv-generator.js     # PDF generation engine
│   │   └── utils.js            # Translation & helper utilities
│   ├── 📊 data/
│   │   └── data.json          # Source of truth for all content
│   └── 🖼️ images/             # Organized asset library
│       ├── brand/             # Logos and icons
│       ├── profile/           # Personal photography
│       └── portfolio/         # Project screenshots
├── 🔧 Configuration Files
│   ├── manifest.json          # PWA configuration
│   ├── sw.js                 # Service worker for offline use
│   └── robots.txt            # SEO optimization
└── 📋 .gitignore             # Git ignore rules
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/hamzbond/hamzbond.github.io.git
   ```

2. **Run a local server** (Pick one)
   ```bash
   python -m http.server 8000    # Python
   npx serve .                   # Node.js
   ```

3. **Open browser** at `http://localhost:8000`

### Updating Your Content

The entire website is data-driven. To change your personal information, projects, or skills:
1. Open `assets/data/data.json`.
2. Update the fields. The website and the PDF CV will update automatically after refresh.

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

⭐ **Star this repo if you found it helpful!** ⭐