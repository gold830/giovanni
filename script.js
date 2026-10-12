
document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    document.querySelector("#year").textContent =
        new Date().getFullYear();

    if (!menuButton || !mobileMenu) return;

    function closeMenu() {
        menuButton.classList.remove("active");
        mobileMenu.classList.remove("open");
        document.body.classList.remove("menu-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
    }

    menuButton.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("open");

        menuButton.classList.toggle("active", isOpen);
        document.body.classList.toggle("menu-open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeMenu();
    });
});
