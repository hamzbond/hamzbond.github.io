/**
 * Utility functions for the portfolio application
 */

// Language helper (for translatable sections)
function t(obj, key) {
    if (!obj) return '';
    const localizedKey = `${key}_${currentLang}`;
    return obj[localizedKey] !== undefined ? obj[localizedKey] : (obj[key] !== undefined ? obj[key] : '');
}

// Image fallback used when a portfolio image file is missing
const IMG_FALLBACK_SRC = 'assets/images/portfolio/placeholder.svg';
const IMG_ERROR_HANDLER = `this.onerror=null;this.src='${IMG_FALLBACK_SRC}';`;

// Returns a copy of obj with every translatable key (key_en / key_id) resolved for the current language
function localize(obj) {
    const result = {};
    Object.keys(obj || {}).forEach(key => {
        if (/_(en|id)$/.test(key)) return;
        result[key] = t(obj, key);
    });
    return result;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function showFormMessage(message, type) {
    const formMessage = document.createElement('div');
    formMessage.className = `form-message ${type}`;
    formMessage.textContent = message;
    const form = document.getElementById('contact-form');
    form.appendChild(formMessage);
    setTimeout(() => formMessage.remove(), 5000);
}
