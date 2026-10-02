// ================= MOBILE MENU =================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

const backToTop = document.getElementById("backToTop");


menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("show");

    const open = navMenu.classList.contains("show");

    menuToggle.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

});


// ================= CLOSE MOBILE MENU =================

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    });

});


// ================= ACTIVE NAVIGATION =================

function updateActiveMenu() {

    let current = "home";

    sections.forEach(section => {

        if (window.scrollY >= section.offsetTop - 160) {
            current = section.id;
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }

    });

}


// ================= SCROLL =================

window.addEventListener("scroll", () => {

    updateActiveMenu();

    backToTop.classList.toggle(
        "show",
        window.scrollY > 500
    );

});


// ================= BACK TO TOP =================

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ================= CURRENT YEAR =================

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


// ================= PROJECT SLIDER =================

const track =
    document.getElementById("projectsTrack");

const projectCards =
    document.querySelectorAll(".project-card");

const prevProject =
    document.getElementById("prevProject");

const nextProject =
    document.getElementById("nextProject");

const sliderDots =
    document.getElementById("sliderDots");


let projectIndex = 0;


// จำนวน Project ที่แสดงตามขนาดหน้าจอ
function projectsPerView() {

    if (window.innerWidth <= 550) {
        return 1;
    }

    if (window.innerWidth <= 900) {
        return 2;
    }

    return 3;

}


// ================= MAX INDEX =================

function maxProjectIndex() {

    return Math.max(
        0,
        projectCards.length - projectsPerView()
    );

}


// ================= CREATE DOTS =================

function createDots() {

    sliderDots.innerHTML = "";

    const total = maxProjectIndex() + 1;


    for (let i = 0; i < total; i++) {

        const dot =
            document.createElement("button");

        dot.className = "slider-dot";

        dot.setAttribute(
            "aria-label",
            `Project ${i + 1}`
        );


        dot.addEventListener("click", () => {

            projectIndex = i;

            updateProjectSlider();

        });


        sliderDots.appendChild(dot);

    }

}


// ================= UPDATE PROJECT =================

function updateProjectSlider() {

    const maxIndex =
        maxProjectIndex();


    if (projectIndex > maxIndex) {

        projectIndex = maxIndex;

    }


    const card =
        projectCards[0];


    const gap =
        parseFloat(
            getComputedStyle(track).gap
        ) || 0;


    const move =
        card.offsetWidth + gap;


    track.style.transform =
        `translateX(-${projectIndex * move}px)`;


    prevProject.disabled =
        projectIndex === 0;


    nextProject.disabled =
        projectIndex === maxIndex;


    document
        .querySelectorAll(".slider-dot")
        .forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === projectIndex
            );

        });

}


// ================= NEXT =================

nextProject.addEventListener("click", () => {

    if (projectIndex < maxProjectIndex()) {

        projectIndex++;

        updateProjectSlider();

    }

});


// ================= PREVIOUS =================

prevProject.addEventListener("click", () => {

    if (projectIndex > 0) {

        projectIndex--;

        updateProjectSlider();

    }

});


// ================= WINDOW RESIZE =================

window.addEventListener("resize", () => {

    createDots();

    updateProjectSlider();

});


// ================= INITIAL =================

createDots();

updateProjectSlider();

updateActiveMenu();