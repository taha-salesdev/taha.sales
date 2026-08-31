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

/* ==========================================================
   MOBILE SOCIAL TOGGLE
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const toggles = document.querySelectorAll(".mobile-social-toggle");
    
    toggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const headerSocial = toggle.closest(".header-social");
            if(headerSocial) {
                headerSocial.classList.toggle("show-all");
                const icon = toggle.querySelector("i");
                if (icon) {
                    if (headerSocial.classList.contains("show-all")) {
                        icon.classList.remove("fa-plus");
                        icon.classList.add("fa-chevron-left");
                    } else {
                        icon.classList.remove("fa-chevron-left");
                        icon.classList.add("fa-plus");
                    }
                }
            }
        });
    });
});

/* ==========================================================
   HIDE HEADER SOCIAL ON FOOTER
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const footer = document.querySelector("footer");
    const headerSocial = document.querySelector(".header-social");
    
    if (footer && headerSocial) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    headerSocial.style.opacity = "0";
                    headerSocial.style.visibility = "hidden";
                    headerSocial.style.pointerEvents = "none";
                } else {
                    headerSocial.style.opacity = "1";
                    headerSocial.style.visibility = "visible";
                    headerSocial.style.pointerEvents = "auto";
                }
            });
        }, { threshold: 0.05 });
        
        headerSocial.style.transition = "opacity 0.3s ease, visibility 0.3s ease";
        observer.observe(footer);
    }
});

/* ==========================================================
   CONTACT FORM SUBMISSION
========================================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const submitBtn = contactForm.querySelector("button[type='submit']");
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending...";

        const formData = new FormData(contactForm);
        const turnstileToken = formData.get("cf-turnstile-response");

        if (!turnstileToken) {
            alert("Please complete the CAPTCHA before sending your message.");
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            return;
        }

        try {

            // Step 1: verify CAPTCHA via our serverless function
            const verifyRes = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ "cf-turnstile-response": turnstileToken })
            });

            const verifyData = await verifyRes.json();

            if (!verifyData.success) {
                alert(verifyData.message || "CAPTCHA verification failed. Please try again.");
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                return;
            }

            // Step 2: CAPTCHA passed — send the message directly from the browser to FormSubmit
            const fsRes = await fetch("https://formsubmit.co/ajax/tahaatworknow@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    Name: formData.get("Name"),
                    Email: formData.get("Email"),
                    Subject: formData.get("Subject"),
                    Message: formData.get("Message"),
                    _subject: "New Portfolio Inquiry",
                    _template: "table",
                    _captcha: "false"
                })
            });

            if (fsRes.ok) {
                window.location.href = "https://tahasalesdev.vercel.app/thankyou.html";
            } else {
                throw new Error("FormSubmit request failed");
            }

        } catch (err) {
            console.error("Contact form error:", err);
            alert("Something went wrong sending your message. Please try again later.");
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }

    });

}
