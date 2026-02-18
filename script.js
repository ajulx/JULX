// Toggle menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Tutup menu saat klik link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll untuk semua link anchor
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animasi fade in/out section saat scroll
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.3
});

document.querySelectorAll('.section-content').forEach(content => {
    sectionObserver.observe(content);
});

// Animasi saat scroll - elemen muncul perlahan
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animasi untuk skill cards dan project cards
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Animasi partikel bergerak acak di section home
const particlesCanvas = document.getElementById('particlesCanvas');
const particlesCtx = particlesCanvas.getContext('2d');

let particles = [];
const particleCount = 50;

function resizeParticlesCanvas() {
    particlesCanvas.width = particlesCanvas.parentElement.offsetWidth;
    particlesCanvas.height = particlesCanvas.parentElement.offsetHeight;
}

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.color = `rgba(0, 120, 200, ${Math.random() * 0.5 + 0.5})`;
    }

    draw() {
        particlesCtx.beginPath();
        particlesCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        particlesCtx.fillStyle = this.color;
        particlesCtx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > particlesCanvas.width) {
            this.speedX = -this.speedX;
        }
        if (this.y < 0 || this.y > particlesCanvas.height) {
            this.speedY = -this.speedY;
        }

        this.draw();
    }
}

function drawConnections() {
    const maxDistance = 120;
    
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
                const opacity = 1 - (distance / maxDistance);
                particlesCtx.beginPath();
                particlesCtx.moveTo(particles[i].x, particles[i].y);
                particlesCtx.lineTo(particles[j].x, particles[j].y);
                particlesCtx.strokeStyle = `rgba(0, 150, 220, ${opacity * 0.6})`;
                particlesCtx.lineWidth = 1;
                particlesCtx.stroke();
            }
        }
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    drawConnections();
    particles.forEach(particle => particle.update());
    requestAnimationFrame(animateParticles);
}

resizeParticlesCanvas();
initParticles();
animateParticles();

particlesCanvas.addEventListener('click', (e) => {
    const rect = particlesCanvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    let nearestParticle = null;
    let minDistance = Infinity;
    
    particles.forEach(particle => {
        const dx = particle.x - clickX;
        const dy = particle.y - clickY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minDistance) {
            minDistance = distance;
            nearestParticle = particle;
        }
    });
    
    if (nearestParticle) {
        nearestParticle.x = clickX;
        nearestParticle.y = clickY;
    }
});

window.addEventListener('resize', () => {
    resizeParticlesCanvas();
});

// Skills section - tab functionality
const skillOptions = document.querySelectorAll('.skill-option');
const skillContents = document.querySelectorAll('.skill-content');

if (skillOptions.length > 0) {
    skillOptions.forEach(option => {
        option.addEventListener('click', () => {
            const skillId = option.getAttribute('data-skill');
            
            skillOptions.forEach(opt => opt.classList.remove('active'));
            skillContents.forEach(content => content.classList.remove('active'));
            
            option.classList.add('active');
            const targetContent = document.getElementById(skillId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Downloads section - tab functionality
const downloadOptions = document.querySelectorAll('.download-option');
const downloadContents = document.querySelectorAll('.download-content');

if (downloadOptions.length > 0) {
    downloadOptions.forEach(option => {
        option.addEventListener('click', () => {
            const downloadId = option.getAttribute('data-download');
            
            downloadOptions.forEach(opt => opt.classList.remove('active'));
            downloadContents.forEach(content => content.classList.remove('active'));
            
            option.classList.add('active');
            const targetContent = document.getElementById(downloadId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}
