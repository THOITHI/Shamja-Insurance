// Back to top button
document.getElementById('back-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
});

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('back-to-top');
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('opacity-100');
        backToTopButton.classList.remove('opacity-0');
    } else {
        backToTopButton.classList.add('opacity-0');
        backToTopButton.classList.remove('opacity-100');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 

// --- Green Overlay + Animated Triangle Page Transition ---
(function() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'page-transition-green-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.background = 'radial-gradient(circle at 50% 50%, #34d399 0%, #059669 100%)'; // fun green
    overlay.style.opacity = 0;
    overlay.style.pointerEvents = 'none';
    overlay.style.transition = 'opacity 0.3s';
    overlay.style.zIndex = 9999;
    // Triangle SVG
    const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    triangle.setAttribute('width', '120');
    triangle.setAttribute('height', '120');
    triangle.setAttribute('viewBox', '0 0 100 100');
    triangle.innerHTML = '<polygon points="50,10 90,90 10,90" fill="#fbbf24" id="triangle-shape"/>';
    triangle.style.transform = 'scale(0.5) rotate(0deg)';
    triangle.style.transition = 'transform 0.6s cubic-bezier(.68,-0.55,.27,1.55)';
    overlay.appendChild(triangle);
    document.body.appendChild(overlay);
})();

function getMainImageColor(defaultColor) {
    const heroImg = document.querySelector('.w-full.h-48.object-cover, .hero-image, .main-hero-image');
    if (heroImg) {
        const img = heroImg;
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        try {
            ctx.drawImage(img, 0, 0, 1, 1);
            const data = ctx.getImageData(0, 0, 1, 1).data;
            return `rgb(${data[0]},${data[1]},${data[2]})`;
        } catch (e) {
            return defaultColor;
        }
    }
    return defaultColor;
}

function animateGreenTriangleTransition(href) {
    const overlay = document.getElementById('page-transition-green-overlay');
    const triangle = overlay.querySelector('polygon');
    const color = getMainImageColor('#fbbf24');
    triangle.setAttribute('fill', color);
    overlay.style.pointerEvents = 'auto';
    overlay.style.opacity = 1;
    // Animate triangle: scale up and spin
    const svg = overlay.querySelector('svg');
    svg.style.transform = 'scale(0.5) rotate(0deg)';
    setTimeout(() => {
        svg.style.transform = 'scale(2.5) rotate(720deg)';
    }, 10);
    setTimeout(() => {
        window.location.href = href;
    }, 650);
}

document.querySelectorAll('a, button').forEach(el => {
    if (el.tagName === 'A' && el.getAttribute('href') && !el.getAttribute('href').startsWith('#') && el.getAttribute('href') !== '#') {
        const href = el.getAttribute('href');
        if (/^(mailto:|tel:|http(s)?:\/\/)/.test(href)) return;
        el.addEventListener('click', function(e) {
            e.preventDefault();
            animateGreenTriangleTransition(href);
        });
    }
});

window.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('page-transition-green-overlay');
    const svg = overlay.querySelector('svg');
    overlay.style.transition = 'none';
    overlay.style.opacity = 1;
    svg.style.transform = 'scale(2.5) rotate(720deg)';
    setTimeout(() => {
        overlay.style.transition = 'opacity 0.6s';
        overlay.style.opacity = 0;
        overlay.style.pointerEvents = 'none';
        svg.style.transform = 'scale(0.5) rotate(0deg)';
    }, 200);
}); 