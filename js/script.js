/* ==========================================================
   LOADER
========================================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    loader.style.opacity = "0";

    loader.style.visibility = "hidden";

});


/* ==========================================================
   TYPING EFFECT
========================================================== */

const words = [

    "Sales Development Representative",

    "Lead Generation Specialist",

    "Virtual Assistant",

    "CRM Management Expert",

    "Market Research Specialist"

];

let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

const typing = document.getElementById("typing");

function typeEffect() {

    if (!typing) return;

    const currentWord = words[wordIndex];

    if (!isDeleting) {

        typing.textContent = currentWord.substring(0, letterIndex++);

        if (letterIndex > currentWord.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1500);

            return;

        }

    } else {

        typing.textContent = currentWord.substring(0, letterIndex--);

        if (letterIndex < 0) {

            isDeleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, isDeleting ? 40 : 80);

}

typeEffect();


/* ==========================================================
   COUNTER ANIMATION
========================================================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;

            const target = +counter.dataset.target;

            let count = 0;

            const speed = target / 100;

            const updateCounter = () => {

                count += speed;

                if (count < target) {

                    counter.innerText = Math.ceil(count);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = target + "+";

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

}, {

    threshold: 0.6

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* ==========================================================
   BACK TO TOP
========================================================== */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ==========================================================
   SCROLL PROGRESS BAR
========================================================== */

const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", () => {

    const scroll = document.documentElement.scrollTop;

    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const progress = (scroll / height) * 100;

    progressBar.style.width = progress + "%";

});


/* ==========================================================
   STICKY HEADER
========================================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "rgba(3,7,18,.96)";

        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

    } else {

        header.style.background = "rgba(3,7,18,.82)";

        header.style.boxShadow = "none";

    }

});


/* ==========================================================
   MOBILE MENU
========================================================== */

const menuBtn = document.querySelector(".menu-btn");

const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("show");

});


/* ==========================================================
   SCROLL REVEAL
========================================================== */

const revealElements = document.querySelectorAll(

    ".card, .stat-card, .hero-text, .hero-image, .section-title"

);

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("activeReveal");

        }

    });

}, {

    threshold: 0.15

});

revealElements.forEach(el => {

    el.classList.add("reveal");

    revealObserver.observe(el);

});


/* ==========================================================
   BUTTON RIPPLE EFFECT
========================================================== */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function(e) {

        const circle = document.createElement("span");

        const diameter = Math.max(this.clientWidth, this.clientHeight);

        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;

        circle.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;

        circle.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;

        circle.classList.add("ripple");

        const ripple = this.getElementsByClassName("ripple")[0];

        if (ripple) {

            ripple.remove();

        }

        this.appendChild(circle);

    });

});


/* ==========================================================
   ACTIVE NAVIGATION
========================================================== */

const currentPage = location.pathname.split("/").pop();

document.querySelectorAll("nav a").forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage || (currentPage === "" && href === "index.html")) {

        link.classList.add("active");

    }

});


/* ==========================================================
   PARALLAX HERO
========================================================== */

window.addEventListener("mousemove", e => {

    const heroImage = document.querySelector(".hero-image img");

    if (!heroImage) return;

    const x = (window.innerWidth / 2 - e.clientX) / 40;

    const y = (window.innerHeight / 2 - e.clientY) / 40;

    heroImage.style.transform = `translate(${x}px, ${y}px)`;

});


/* ==========================================================
   CONSOLE MESSAGE
========================================================== */

console.log("%cPortfolio Developed by Taha Bin Ishfaq",

"color:#3b82f6;font-size:18px;font-weight:bold;");
