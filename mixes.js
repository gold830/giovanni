/* =========================================================
   OWN GEZI — MIXES PAGE INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const page = document.querySelector(".og-mixes-page");

    if (!page) return;

    const revealItems = page.querySelectorAll(
        ".mixes-section-top, .mix-card, .mixes-live-content"
    );

    if (
        !("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        revealItems.forEach(item => {
            item.classList.add("mixes-visible");
        });

        return;
    }

    revealItems.forEach(item => {
        item.classList.add("mixes-reveal");
    });

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("mixes-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealItems.forEach(item => observer.observe(item));
});