/* ==================================================
   CHRISTIAN MENDOZA
   HEADER JAVASCRIPT
   ================================================== */


/* ==================================================
   ELEMENTS
   ================================================== */

const header = document.getElementById("site-header");

const menuToggle = document.getElementById("menu-toggle");

const mobileMenu = document.getElementById("mobile-menu");

const mobileLinks = mobileMenu.querySelectorAll("a");


/* ==================================================
   HEADER SCROLL EFFECT
   ================================================== */

function handleHeaderScroll() {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
);


/* Run once when page loads */

handleHeaderScroll();


/* ==================================================
   MOBILE MENU
   ================================================== */

function openMobileMenu() {

    mobileMenu.classList.add("active");

    menuToggle.classList.add("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Cerrar menú"
    );

    document.body.classList.add("menu-open");

}


function closeMobileMenu() {

    mobileMenu.classList.remove("active");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Abrir menú"
    );

    document.body.classList.remove("menu-open");

}


function toggleMobileMenu() {

    const isOpen =
        mobileMenu.classList.contains("active");


    if (isOpen) {

        closeMobileMenu();

    } else {

        openMobileMenu();

    }

}


/* ==================================================
   MENU BUTTON
   ================================================== */

menuToggle.addEventListener(
    "click",
    toggleMobileMenu
);


/* ==================================================
   CLOSE MENU WHEN CLICKING A LINK
   ================================================== */

mobileLinks.forEach(link => {

    link.addEventListener(
        "click",
        closeMobileMenu
    );

});


/* ==================================================
   CLOSE MENU WITH ESC
   ================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    }
);


/* ==================================================
   CLOSE MENU WHEN RESIZING TO DESKTOP
   ================================================== */

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 900) {

            closeMobileMenu();

        }

    }
);
