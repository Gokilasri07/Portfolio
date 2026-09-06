
const loader = document.querySelector(".loader");

window.addEventListener("load", () => {
    setTimeout(() => {
        loader.classList.add("hide");
    }, 700);
});


const typingText = document.getElementById("typingText");

const roles = [
    "AI & ML Enthusiast",
    "IoT Developer",
    "Full Stack Explorer",
    "Computer Science Engineer"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

    } else {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, deleting ? 45 : 85);
}

typeEffect();


const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuBtn.textContent = navLinks.classList.contains("open") ? "×" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.textContent = "☰";
    });
});


const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const lightMode = document.body.classList.contains("light");

    themeBtn.textContent = lightMode ? "☀" : "☾";

    localStorage.setItem("theme", lightMode ? "light" : "dark");
});

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "☀";
}


const progressBar = document.querySelector(".progress-bar");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / height) * 100;

    progressBar.style.width = `${progress}%`;
});


const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});


const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const element = entry.target;
            const target = parseFloat(element.dataset.count);

            let current = 0;
            const increment = target / 50;

            function updateCounter() {

                current += increment;

                if (current >= target) {
                    element.textContent = target === 9.47
                        ? "9.47"
                        : Math.floor(target) + "+";
                    return;
                }

                element.textContent = target === 9.47
                    ? current.toFixed(2)
                    : Math.floor(current);

                requestAnimationFrame(updateCounter);
            }

            updateCounter();

            counterObserver.unobserve(element);
        });

    },
    {
        threshold: 0.7
    }
);

counters.forEach(counter => {
    counterObserver.observe(counter);
});


const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(button => {
            button.classList.remove("active");
        });

        filter.classList.add("active");

        const selected = filter.dataset.filter;

        projects.forEach(project => {

            if (selected === "all") {
                project.classList.remove("hidden");
                return;
            }

            const categories = project.dataset.category.split(" ");

            if (categories.includes(selected)) {
                project.classList.remove("hidden");
            } else {
                project.classList.add("hidden");
            }

        });

    });

});


const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", event => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        formStatus.textContent = "Please fill in all fields.";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        formStatus.textContent = "Please enter a valid email address.";
        return;
    }

    formStatus.textContent = "Message validated successfully!";

    contactForm.reset();

});


const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {
        backTop.classList.add("show");
    } else {
        backTop.classList.remove("show");
    }

});

backTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", event => {

    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;

    follower.style.left = `${event.clientX - 14}px`;
    follower.style.top = `${event.clientY - 14}px`;

});


document.querySelectorAll("a, button").forEach(element => {

    element.addEventListener("mouseenter", () => {
        follower.style.transform = "scale(1.5)";
    });

    element.addEventListener("mouseleave", () => {
        follower.style.transform = "scale(1)";
    });

});


const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(item => {

        item.classList.remove("active");

        if (item.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
        }

    });

});


document.querySelectorAll(".project-card").forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * -4;
        const rotateY = ((x / rect.width) - 0.5) * 4;

        card.style.transform =
            `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });

});


document.querySelectorAll(".skill-tags span").forEach(tag => {

    tag.addEventListener("click", () => {

        tag.style.transform = "scale(1.08)";

        setTimeout(() => {
            tag.style.transform = "";
        }, 200);

    });

});

