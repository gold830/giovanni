/* =========================================================
   DEEJAY GIOVANNI
   MUSIC PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MARQUEE
    ===================================================== */

    var marquee = document.querySelector(".music-hero-marquee div");

    if (marquee) {

        marquee.addEventListener("mouseenter", function () {
            marquee.style.animationPlayState = "paused";
        });

        marquee.addEventListener("mouseleave", function () {
            marquee.style.animationPlayState = "running";
        });

    }


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    var hero = document.querySelector(".music-hero");
    var heroLetter = document.querySelector(".music-hero-letter");

    if (hero && heroLetter && window.innerWidth > 900) {

        hero.addEventListener("mousemove", function (event) {

            var x = (event.clientX / window.innerWidth - 0.5) * 18;
            var y = (event.clientY / window.innerHeight - 0.5) * 12;

            heroLetter.style.transform =
                "translate(" + x + "px, " + y + "px)";

        });

        hero.addEventListener("mouseleave", function () {

            heroLetter.style.transform =
                "translate(0, 0)";

        });

    }


    /* =====================================================
       RELEASE ART TILT
    ===================================================== */

    var releaseArt = document.querySelector(".release-art");

    if (releaseArt && window.innerWidth > 900) {

        releaseArt.addEventListener("mousemove", function (event) {

            var rect = releaseArt.getBoundingClientRect();

            var x =
                (event.clientX - rect.left) /
                rect.width - 0.5;

            var y =
                (event.clientY - rect.top) /
                rect.height - 0.5;

            var rotateY = x * 2.5;
            var rotateX = y * -2.5;

            releaseArt.style.transform =
                "perspective(1100px) " +
                "rotateY(" + rotateY + "deg) " +
                "rotateX(" + rotateX + "deg)";

        });


        releaseArt.addEventListener("mouseleave", function () {

            releaseArt.style.transform =
                "perspective(1100px) rotateY(0deg) rotateX(0deg)";

        });

    }


    /* =====================================================
       RELEASE ROWS
    ===================================================== */

    var releaseRows =
        document.querySelectorAll(".release-row");

    releaseRows.forEach(function (row) {

        row.addEventListener("mouseenter", function () {
            row.classList.add("is-hovered");
        });

        row.addEventListener("mouseleave", function () {
            row.classList.remove("is-hovered");
        });

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    var revealElements =
        document.querySelectorAll(
            ".release-header, " +
            ".featured-release, " +
            ".music-statement-content, " +
            ".discography-header, " +
            ".release-row, " +
            ".platform-content, " +
            ".platform-card, " +
            ".music-video-copy, " +
            ".music-video-card, " +
            ".music-booking-content"
        );


    if ("IntersectionObserver" in window) {

        var revealObserver =
            new IntersectionObserver(function (entries) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                });

            }, {
                threshold: 0.1
            });


        revealElements.forEach(function (element, index) {

            element.classList.add("music-page-reveal");

            if (element.classList.contains("release-row")) {

                var delay =
                    Math.min(index * 0.06, 0.3);

                element.style.transitionDelay =
                    delay + "s";

            }

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       PLATFORM CARD MOVEMENT
    ===================================================== */

    var platformCards =
        document.querySelectorAll(".platform-card");


    if (window.innerWidth > 900) {

        platformCards.forEach(function (card) {

            card.addEventListener("mousemove", function (event) {

                var rect =
                    card.getBoundingClientRect();

                var x =
                    (event.clientX - rect.left) /
                    rect.width - 0.5;

                var y =
                    (event.clientY - rect.top) /
                    rect.height - 0.5;

                var moveX = x * 4;
                var moveY = y * 4;

                card.style.transform =
                    "translate3d(" +
                    moveX +
                    "px, " +
                    moveY +
                    "px, 0)";

            });


            card.addEventListener("mouseleave", function () {

                card.style.transform =
                    "translate3d(0, 0, 0)";

            });

        });

    }


    /* =====================================================
       PLACEHOLDER LISTEN BUTTONS
    ===================================================== */

    var playButtons =
        document.querySelectorAll(
            ".music-play-button"
        );


    playButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            var href =
                button.getAttribute("href");


            if (href === "#") {

                event.preventDefault();

                button.classList.add(
                    "placeholder-active"
                );


                var textNode = null;

                for (
                    var i = 0;
                    i < button.childNodes.length;
                    i++
                ) {

                    var node =
                        button.childNodes[i];

                    if (
                        node.nodeType === Node.TEXT_NODE &&
                        node.textContent.trim() !== ""
                    ) {

                        textNode = node;
                        break;

                    }

                }


                if (textNode) {

                    textNode.textContent =
                        " MUSIC LINK COMING SOON";

                }


                setTimeout(function () {

                    button.classList.remove(
                        "placeholder-active"
                    );


                    if (textNode) {

                        textNode.textContent =
                            " LISTEN NOW";

                    }

                }, 1800);

            }

        });

    });


    /* =====================================================
       PLACEHOLDER LINKS
    ===================================================== */

    var placeholderLinks =
        document.querySelectorAll('a[href="#"]');


    placeholderLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

        });

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    var year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

});