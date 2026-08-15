/* =====================================================
   CHRISTIAN MENDOZA - SCRIPT MODIFICADO
   ===================================================== */

const header = document.getElementById("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

/* ================= MOBILE MENU ================= */
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    document.body.classList.toggle("menu-open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        document.body.classList.remove("menu-open");
    });
});

/* ================= SCROLL REVEAL ================= */
const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealElements.forEach(element => { observer.observe(element); });

/* ================= SMOOTH NAVIGATION ================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(event) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        const target = document.querySelector(targetId);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

/* ================= CURRENT YEAR ================= */
const year = new Date().getFullYear();
document.querySelectorAll(".footer-bottom span").forEach(element => {
    if (element.textContent.includes("2026")) {
        element.textContent = element.textContent.replace("2026", year);
    }
});

/* =====================================================
   SCROLL FRAME ANIMATION (FONDO FIJO)
   ===================================================== */
(function () {
    const FRAME_COUNT = 224;
    const FRAME_PATH = (i) => `frames/frame_${String(i).padStart(4, "0")}.jpg`;
    const canvas = document.getElementById("frameCanvas");
    const progressEl = document.getElementById("loadProgress");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const images = new Array(FRAME_COUNT);
    let loadedCount = 0;
    let currentFrame = -1;
    let ticking = false;

    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        drawFrame(currentFrame === -1 ? 0 : currentFrame, true);
    }

    function drawImageCover(img) {
        const cw = window.innerWidth;
        const ch = window.innerHeight;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        if (!iw || !ih) return;
        const scale = Math.max(cw / iw, ch / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        const dx = (cw - dw) / 2;
        const dy = (ch - dh) / 2;
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, dx, dy, dw, dh);
    }

    function drawFrame(index, force = false) {
        index = Math.max(0, Math.min(FRAME_COUNT - 1, index));
        if (index === currentFrame && !force) return;
        const img = images[index];
        if (img && img.complete && img.naturalWidth) {
            drawImageCover(img);
            currentFrame = index;
        }
    }

    function preloadImages() {
        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.onload = function () {
                loadedCount++;
                if (progressEl) {
                    const pct = Math.round((loadedCount / FRAME_COUNT) * 100);
                    if (pct < 100) {
                        progressEl.textContent = `Cargando imágenes ${pct}%`;
                    } else {
                        progressEl.style.display = 'none'; // Ocultar al terminar
                    }
                }
                if (i === 0 && currentFrame === -1) { drawFrame(0, true); }
            };
            img.onerror = function () { loadedCount++; };
            img.src = FRAME_PATH(i + 1);
            images[i] = img;
        }
    }

    function updateFrameFromScroll() {
        // Calcula el scroll total de la página web
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;

        let progress = total > 0 ? scrolled / total : 0;
        progress = Math.max(0, Math.min(1, progress));

        const frameIndex = Math.round(progress * (FRAME_COUNT - 1));
        drawFrame(frameIndex);
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateFrameFromScroll);
            ticking = true;
        }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();
    preloadImages();
    updateFrameFromScroll();
})();
