/* =========================================================
   DJ TRIZZY VIBES
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   PRELOADER
========================================================= */

document.body.classList.add("loading");

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.querySelector(".loader");

        loader.classList.add("hide");

        document.body.classList.remove("loading");

    }, 2200);

});



/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");

menuToggle.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

    menuToggle.classList.toggle("active");

});


mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        menuToggle.classList.remove("active");

    });

});



/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;


window.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

});


function animateCursor() {

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    cursorFollower.style.left = `${followerX}px`;
    cursorFollower.style.top = `${followerY}px`;

    requestAnimationFrame(animateCursor);

}

animateCursor();


const interactiveElements = document.querySelectorAll(
    "a, button, .gallery-item, .event-row"
);

interactiveElements.forEach(element => {

    element.addEventListener("mouseenter", () => {

        cursorFollower.classList.add("active");

    });

    element.addEventListener("mouseleave", () => {

        cursorFollower.classList.remove("active");

    });

});



/* =========================================================
   HERO PARALLAX
========================================================= */

const hero = document.querySelector(".hero");

const heroBack = document.querySelector(".hero-image-back");
const heroMain = document.querySelector(".hero-image-main");
const heroSmall = document.querySelector(".hero-image-small");


window.addEventListener("mousemove", (e) => {

    if (window.innerWidth < 900) return;

    const x = (e.clientX / window.innerWidth - .5);
    const y = (e.clientY / window.innerHeight - .5);

    heroBack.style.transform =
        `translate(${x * 30}px, ${y * 25}px) rotate(6deg)`;

    heroMain.style.transform =
        `translate(${x * -20}px, ${y * -20}px) rotate(-4deg)`;

    heroSmall.style.transform =
        `translate(${x * 45}px, ${y * 35}px) rotate(8deg)`;

});



/* =========================================================
   IMAGE GALLERY
========================================================= */

/*
   ADD YOUR ACTUAL FILE NAMES HERE.

   Example:

   "pics/photo1.jpg"
   "pics/photo2.jpg"
   "pics/photo3.jpg"

   You can add as many images as you want.
*/

const galleryImages = [

    "pics/1.jpg",
    "pics/2.jpg",
    "pics/3.jpg",
    "pics/4.jpg",
    "pics/5.jpg",
    "pics/1.jpg",
    "pics/2.jpg",
    "pics/3.jpg",
    "pics/4.jpg",
    "pics/5.jpg",
    "pics/1.jpg",
    "pics/2.jpg",
    "pics/3.jpg",
    "pics/4.jpg",
    "pics/5.jpg",
    "pics/1.jpg",
    "pics/2.jpg",
    "pics/3.jpg",
    "pics/4.jpg",
    "pics/5.jpg"

];


const galleryGrid = document.getElementById("galleryGrid");
const loadMore = document.getElementById("loadMore");


let imagesPerLoad = 10;
let currentLoaded = 0;


function createGalleryItem(src, index) {

    const item = document.createElement("div");

    item.classList.add("gallery-item");

    item.dataset.index = index;


    const image = document.createElement("img");

    image.src = src;

    image.alt = `DJ Trizzy Vibes moment ${index + 1}`;

    image.loading = "lazy";


    const number = document.createElement("span");

    number.classList.add("gallery-number");

    number.textContent =
        String(index + 1).padStart(2, "0");


    item.appendChild(image);

    item.appendChild(number);

    galleryGrid.appendChild(item);


    item.addEventListener("click", () => {

        openLightbox(index);

    });


    /* Scroll reveal */

    requestAnimationFrame(() => {

        observeGalleryItem(item);

    });

}


function loadGalleryImages() {

    const nextImages =
        galleryImages.slice(
            currentLoaded,
            currentLoaded + imagesPerLoad
        );


    nextImages.forEach((image, index) => {

        createGalleryItem(
            image,
            currentLoaded + index
        );

    });


    currentLoaded += nextImages.length;


    if (currentLoaded >= galleryImages.length) {

        loadMore.style.display = "none";

    }

}


loadMore.addEventListener("click", loadGalleryImages);

loadGalleryImages();



/* =========================================================
   GALLERY SCROLL REVEAL
========================================================= */

const galleryObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                galleryObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: .12
    }

);


function observeGalleryItem(item) {

    galleryObserver.observe(item);

}



/* =========================================================
   GENERAL SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".intro-image, .media-card, .event-row, .booking-image"
);


const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("reveal-active");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: .15
    }

);


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================================================
   LIGHTBOX
========================================================= */

const lightbox = document.getElementById("lightbox");

const lightboxImage =
    document.querySelector(".lightbox-image img");

const closeLightbox =
    document.querySelector(".lightbox-close");

const prevButton =
    document.querySelector(".lightbox-prev");

const nextButton =
    document.querySelector(".lightbox-next");

const currentImage =
    document.getElementById("currentImage");

const totalImages =
    document.getElementById("totalImages");


let currentIndex = 0;


totalImages.textContent =
    String(galleryImages.length).padStart(2, "0");


function openLightbox(index) {

    currentIndex = index;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

    updateLightbox();

}


function closeLightboxFunction() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


function updateLightbox() {

    lightboxImage.src =
        galleryImages[currentIndex];

    currentImage.textContent =
        String(currentIndex + 1).padStart(2, "0");

}


function nextImage() {

    currentIndex++;

    if (currentIndex >= galleryImages.length) {

        currentIndex = 0;

    }

    updateLightbox();

}


function previousImage() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = galleryImages.length - 1;

    }

    updateLightbox();

}


closeLightbox.addEventListener(
    "click",
    closeLightboxFunction
);

nextButton.addEventListener(
    "click",
    nextImage
);

prevButton.addEventListener(
    "click",
    previousImage
);


lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        closeLightboxFunction();

    }

});


document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("active")) return;


    if (e.key === "Escape") {

        closeLightboxFunction();

    }


    if (e.key === "ArrowRight") {

        nextImage();

    }


    if (e.key === "ArrowLeft") {

        previousImage();

    }

});



/* =========================================================
   TOUCH SWIPE FOR LIGHTBOX
========================================================= */

let touchStartX = 0;


lightbox.addEventListener("touchstart", (e) => {

    touchStartX = e.changedTouches[0].screenX;

});


lightbox.addEventListener("touchend", (e) => {

    const touchEndX =
        e.changedTouches[0].screenX;

    const distance =
        touchEndX - touchStartX;


    if (Math.abs(distance) < 50) return;


    if (distance < 0) {

        nextImage();

    } else {

        previousImage();

    }

});



/* =========================================================
   SCROLL IMAGE PARALLAX
========================================================= */

const parallaxImages =
    document.querySelectorAll(
        ".intro-image img, .media-image img, .booking-image img"
    );


window.addEventListener("scroll", () => {

    if (window.innerWidth < 900) return;


    parallaxImages.forEach(image => {

        const rect =
            image.parentElement.getBoundingClientRect();


        const viewportCenter =
            window.innerHeight / 2;


        const distance =
            rect.top + rect.height / 2 - viewportCenter;


        const movement =
            distance * -0.035;


        image.style.transform =
            `translateY(${movement}px) scale(1.04)`;

    });

});



/* =========================================================
   EVENT ROW MOUSE MOVEMENT
========================================================= */

const eventRows =
    document.querySelectorAll(".event-row");


eventRows.forEach(row => {

    row.addEventListener("mousemove", (e) => {

        if (window.innerWidth < 900) return;


        const rect =
            row.getBoundingClientRect();


        const x =
            e.clientX - rect.left;


        const y =
            e.clientY - rect.top;


        const moveX =
            (x / rect.width - .5) * 8;


        const moveY =
            (y / rect.height - .5) * 4;


        row.style.transform =
            `translate(${moveX}px, ${moveY}px)`;

    });


    row.addEventListener("mouseleave", () => {

        row.style.transform = "";

    });

});



/* =========================================================
   MAGNETIC BOOKING BUTTON
========================================================= */

const bookingButton =
    document.querySelector(".booking-button");


if (bookingButton) {

    bookingButton.addEventListener("mousemove", (e) => {

        if (window.innerWidth < 900) return;


        const rect =
            bookingButton.getBoundingClientRect();


        const x =
            e.clientX - rect.left - rect.width / 2;


        const y =
            e.clientY - rect.top - rect.height / 2;


        bookingButton.style.transform =
            `translate(${x * .18}px, ${y * .18}px)`;

    });


    bookingButton.addEventListener("mouseleave", () => {

        bookingButton.style.transform = "";

    });

}



/* =========================================================
   HERO IMAGE HOVER
========================================================= */

document.querySelectorAll(".hero-image").forEach(image => {

    image.addEventListener("mouseenter", () => {

        image.querySelector("img").style.transform =
            "scale(1.08)";

    });


    image.addEventListener("mouseleave", () => {

        image.querySelector("img").style.transform =
            "scale(1)";

    });

});



/* =========================================================
   SMOOTH SECTION NUMBER PARALLAX
========================================================= */

const sectionNumbers =
    document.querySelectorAll(".section-number");


window.addEventListener("scroll", () => {

    sectionNumbers.forEach(number => {

        const rect =
            number.parentElement.getBoundingClientRect();


        const movement =
            (window.innerHeight / 2 -
                (rect.top + rect.height / 2)) * .05;


        number.style.transform =
            `translateY(${movement}px)`;

    });

});