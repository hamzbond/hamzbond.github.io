/**
 * Utility functions for the portfolio application
 */

// Language helper (for translatable sections)
function t(obj, key) {
    if (!obj) return '';
    const localizedKey = `${key}_${currentLang}`;
    return obj[localizedKey] !== undefined ? obj[localizedKey] : (obj[key] !== undefined ? obj[key] : '');
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
