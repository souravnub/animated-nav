let activeMenuTimeline = gsap.timeline({ defaults: { ease: "expo.inOut" } });
let closeMenuTimeline = gsap.timeline({ defaults: { ease: "expo.inOut" } });
let menuToggleBtn = document.querySelector(".menu-toggle-btn");
let bodyOverlay = document.querySelector(".body-overlay");
let menuToggleBtnOverlay = document.querySelector(
    ".menu-toggle-btn .btn-overlay"
);

let styledBtns = document.querySelectorAll(".styled-btn");

let navLinks = document.querySelectorAll(".nav-link");
let menu = document.querySelector(".main-navigation");

function openMenu() {
    menu.classList.add("open-menu");
    menuToggleBtn.classList.add("open-menu");

    activeMenuTimeline
        .to(bodyOverlay, {
            opacity: 1,
            duration: 0.5,
            visibility: "visible",
        })
        .to(menu, { borderRadius: 0 }, "-=.5")
        .to(
            menu,
            {
                x: 0,
                duration: 1.5,
            },
            "-=1"
        )
        .to(
            ".nav-link",
            {
                x: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power4.inOut",
            },
            "-=1.4"
        );
}

function closeMenu() {
    menu.classList.remove("open-menu");
    menuToggleBtn.classList.remove("open-menu");

    closeMenuTimeline
        .to(bodyOverlay, {
            opacity: 0,
            duration: 0.5,
        })
        .set(bodyOverlay, { visibility: "hidden" })
        .to(
            menu,
            {
                x: "100%",
                duration: 1,
            },
            "-=.5"
        )
        .to(
            menu,
            {
                borderBottomLeftRadius: "50%",
                borderTopLeftRadius: "50%",
            },
            "-=.7"
        )
        .to(
            ".nav-link",
            {
                x: "50%",
                duration: 1,
                stagger: 0.1,
            },
            "-=1"
        );
}

menuToggleBtn.addEventListener("click", () => {
    if (!menu.classList.contains("open-menu")) {
        openMenu();
    } else {
        closeMenu();
    }
});

window.addEventListener("click", (e) => {
    if (e.target.classList.contains("body-overlay")) {
        closeMenu();
    }
});

// styled btns
styledBtns.forEach((btn) => {
    let btnOverlay = btn.querySelector(".btn-overlay");
    btn.addEventListener("mouseover", () => {
        gsap.to(btnOverlay, {
            duration: 0.5,
            y: 0,
            ease: "expo.inOut",
        });
    });
    btn.addEventListener("mouseout", () => {
        gsap.timeline()
            .to(btnOverlay, {
                duration: 0.5,
                y: "-100%",
                ease: "expo.inOut",
            })
            .set(btnOverlay, { y: "100%" });
    });
});

// animations for the blue color on the menu button

menuToggleBtn.addEventListener("mouseover", () => {
    gsap.to(menuToggleBtnOverlay, {
        duration: 0.5,
        y: 0,
        ease: "expo.inOut",
    });
});
menuToggleBtn.addEventListener("mouseout", () => {
    if (!menuToggleBtn.classList.contains("open-menu")) {
        gsap.timeline()
            .to(menuToggleBtnOverlay, {
                duration: 0.5,
                y: "-100%",
                ease: "expo.inOut",
            })
            .set(menuToggleBtnOverlay, { y: "100%" });
    } else {
        gsap.set(menuToggleBtnOverlay, { y: 0 });
    }
});

// nav links circle animations

let activeLink = document.querySelector(".nav-link.active");
navLinks.forEach((navLink) => {
    navLink.addEventListener("mouseover", () => {
        navLink.querySelector(".circle").style.transform = "scale(1)";
        if (!navLink.classList.contains("active")) {
            activeLink.querySelector(".circle").style.transform = "scale(0)";
        }
    });
    navLink.addEventListener("mouseout", () => {
        navLink.querySelector(".circle").style.transform = "scale(0)";
        activeLink.querySelector(".circle").style.transform = "scale(1)";
    });
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        activeLink.classList.remove("active");
        link.classList.add("active");
        activeLink = link;
    });
});
