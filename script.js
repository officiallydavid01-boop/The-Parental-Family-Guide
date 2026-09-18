/* =========================================================
   KING PANELS
   THE PRACTICAL FAMILY GUIDE
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header = document.getElementById("site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-navigation");

    const modal = document.querySelector(".payment-modal");
    const modalClose = document.querySelector(".payment-modal-close");

    const navLinks = document.querySelectorAll(
        ".main-navigation a"
    );

    const buyButtons = document.querySelectorAll(
        ".buy-button, .nav-buy-button"
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMenu() {

        if (!navigation || !menuToggle) return;

        navigation.classList.add("is-open");
        navigation.classList.add("active");

        menuToggle.classList.add("is-active");
        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add("menu-open");
    }


    function closeMenu() {

        if (!navigation || !menuToggle) return;

        navigation.classList.remove("is-open");
        navigation.classList.remove("active");

        menuToggle.classList.remove("is-active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("menu-open");
    }


    if (menuToggle) {

        menuToggle.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            if (
                navigation &&
                (
                    navigation.classList.contains("is-open") ||
                    navigation.classList.contains("active")
                )
            ) {
                closeMenu();
            } else {
                openMenu();
            }

        });

    }


    /* =====================================================
       NAVIGATION LINKS
    ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");

            closeMenu();

            if (
                !href ||
                !href.startsWith("#") ||
                href === "#"
            ) {
                return;
            }

            const target = document.querySelector(href);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const position =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (!navigation || !menuToggle) return;

        if (
            navigation.classList.contains("is-open") &&
            !navigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            closeMenu();

        }

    });


    /* =====================================================
       PAYMENT MODAL
    ===================================================== */

    function openModal() {

        if (!modal) return;

        modal.classList.add("active");
        modal.classList.add("is-open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("modal-open");

        closeMenu();

    }


    function closeModal() {

        if (!modal) return;

        modal.classList.remove("active");
        modal.classList.remove("is-open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove("modal-open");

    }


    /* =====================================================
       BUY BUTTONS
    ===================================================== */

    buyButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            openModal();

        });

    });


    /* =====================================================
       MODAL CLOSE BUTTON
    ===================================================== */

    if (modalClose) {

        modalClose.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            closeModal();

        });

    }


    /* =====================================================
       CLOSE MODAL BY CLICKING BACKDROP
    ===================================================== */

    if (modal) {

        modal.addEventListener("click", (event) => {

            if (event.target === modal) {

                closeModal();

            }

        });

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") return;

        closeMenu();
        closeModal();

    });


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    function handleScroll() {

        if (!header) return;

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    handleScroll();


    /* =====================================================
       SCREEN SIZE
    ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            closeMenu();

        }

    });


    /* =====================================================
       INITIAL STATES
    ===================================================== */

    if (menuToggle) {

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (modal) {

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =====================================================
       BODY SCROLL LOCK
    ===================================================== */

    const style = document.createElement("style");

    style.textContent = `
        body.menu-open,
        body.modal-open {
            overflow: hidden;
        }
    `;

    document.head.appendChild(style);


    console.log(
        "King Panels website initialized successfully."
    );

});
/* =====================================================
   COPY PAYMENT DETAILS
===================================================== */

const copyButtons = document.querySelectorAll(".copy-button");

copyButtons.forEach((button) => {

    button.addEventListener("click", async () => {

        const textToCopy = button.getAttribute("data-copy");

        if (!textToCopy) return;

        try {

            await navigator.clipboard.writeText(textToCopy);

            const originalText = button.textContent;

            button.textContent = "Copied!";

            button.classList.add("copied");

            setTimeout(() => {

                button.textContent = originalText;

                button.classList.remove("copied");

            }, 1800);

        } catch (error) {

            /* Fallback for browsers where Clipboard API
               isn't available */

            const textArea = document.createElement("textarea");

            textArea.value = textToCopy;

            textArea.style.position = "fixed";
            textArea.style.opacity = "0";

            document.body.appendChild(textArea);

            textArea.select();

            try {
                document.execCommand("copy");

                button.textContent = "Copied!";

                setTimeout(() => {
                    button.textContent = "Copy";
                }, 1800);

            } catch (fallbackError) {

                button.textContent = "Copy failed";

                setTimeout(() => {
                    button.textContent = "Copy";
                }, 1800);

            }

            document.body.removeChild(textArea);

        }

    });

});
