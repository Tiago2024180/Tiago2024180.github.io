// ===========================
// NAVBAR — Scroll effect & Mobile menu
// ===========================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
    });
});

// ===========================
// ACTIVE NAV LINK on scroll
// ===========================
const sections = document.querySelectorAll('.section, .hero');

function updateActiveLink() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===========================
// SCROLL REVEAL animation
// ===========================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-title, .section-subtitle, .project-card, .skill-category, .about-text, .about-details, .contact-card, .detail-card');

    reveals.forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }

        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// ===========================
// PROJECT FILTER
// ===========================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    });
});

// ===========================
// TOGGLE PROJECT DETAILS (relatório inline)
// ===========================
function toggleDetails(button) {
    const details = button.nextElementSibling;
    if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        button.innerHTML = `
            <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
            Esconder Detalhes
        `;
    } else {
        details.classList.add('hidden');
        button.innerHTML = `
            <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 8V4l8 8-8 8v-4H4V8z"/></svg>
            Ver Detalhes
        `;
    }
}

// ===========================
// TYPING EFFECT (opcional — hero title)
// ===========================
const titles = ['Developer', 'Cybersecurity Student', 'GPSI Graduate', 'Problem Solver'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const heroTitle = document.querySelector('.hero-title');

function typeEffect() {
    const current = titles[titleIndex];

    if (isDeleting) {
        heroTitle.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        heroTitle.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000; // pausa no fim
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

// Iniciar typing effect
setTimeout(typeEffect, 1500);
