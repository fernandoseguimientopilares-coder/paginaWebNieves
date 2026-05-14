// Smooth scrolling para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Intersection Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar las tarjetas de recursos
document.querySelectorAll('.recurso-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Observar las tarjetas de highlights
document.querySelectorAll('.highlight-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease-out';
    observer.observe(item);
});

// Tracking de descargas
document.querySelectorAll('.btn-download').forEach(button => {
    button.addEventListener('click', function() {
        const fileName = this.textContent.trim();
        console.log(`Recurso abierto: ${fileName}`);
    });
});

// Loading animation para botones
document.querySelectorAll('.btn-primary, .btn-download').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Contador animado para stats
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Detectar cuando los stats son visibles
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !isNaN(statNumber.textContent)) {
                const finalValue = parseInt(statNumber.textContent);
                animateValue(statNumber, 0, finalValue, 2000);
                entry.target.dataset.animated = 'true';
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('.nav');
    if (window.innerWidth <= 768 && nav) {
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-toggle';
        menuButton.innerHTML = '☰';
        menuButton.style.cssText = `
            display: block;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        `;

        menuButton.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.background = 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))';
            nav.style.padding = '1rem';
        });

        const header = document.querySelector('.header .container');
        if (!header.querySelector('.mobile-menu-toggle')) {
            header.appendChild(menuButton);
        }
    }
};

// Inicializar menú móvil si es necesario
window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// Console message
console.log('%c♻️ Proyecto: Mi comunidad recicla', 'color: #059669; font-size: 20px; font-weight: bold;');
console.log('%c👩‍🎓 Autora: Ma. Nieves Solís Ortega', 'color: #047857; font-size: 14px;');
console.log('%c📚 Prepa en Línea SEP — Módulo 23 — 2026', 'color: #10b981; font-size: 14px;');
