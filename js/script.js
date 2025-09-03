// ===== Hero Slideshow =====
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (slides.length === 0) return;
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
}

// Automatic hero slideshow
setInterval(() => { plusSlides(1); }, 1500);

// ===== All DOM Loaded Features =====
document.addEventListener("DOMContentLoaded", () => {

    // ===== Stats Counters =====
    const counters = document.querySelectorAll(".counter");

    function formatNumber(num) {
        if (num >= 1000) return (num / 1000).toFixed(0) + "K+";
        return num + "+";
    }

    function formatNumber(num) {
        if (num >= 1000) return (num / 1000).toFixed(0) + "K+";
        return num + "+";
    }

    function runCounter(counter) {
        const target = +counter.getAttribute("data-target"); // numeric target
        let current = 0; // numeric counter

        const increment = Math.ceil(target / 200); // adjust speed

        const updateCounter = () => {
            current += increment;
            if (current >= target) current = target;
            counter.innerText = formatNumber(current);
            if (current < target) {
                setTimeout(updateCounter, 10);
            }
        };

        updateCounter();
    }

    const observerCounters = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observerCounters.observe(counter));

    // ===== Fade-Up Animations =====
    const animatedEls = document.querySelectorAll(".animate-fade-up");
    const observerFade = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    animatedEls.forEach(el => observerFade.observe(el));

    // ===== About Photos Slideshow =====
    const aboutPhotos = document.querySelectorAll(".about-photo");
    let currentIndex = 0;

    function showNextPhoto() {
        aboutPhotos.forEach(photo => photo.classList.remove("visible"));
        if (aboutPhotos.length === 0) return;
        aboutPhotos[currentIndex].classList.add("visible");
        currentIndex = (currentIndex + 1) % aboutPhotos.length;
    }

    showNextPhoto();
    setInterval(showNextPhoto, 3000);

    // ===== Why Us Accordion =====
    document.querySelectorAll(".why-header").forEach(header => {
        header.addEventListener("click", () => {
            const box = header.parentElement;

            // Close all others
            document.querySelectorAll(".why-box").forEach(b => {
                if (b !== box) b.classList.remove("active");
            });

            // Toggle current
            box.classList.toggle("active");
        });
    });

    // ===== Campaign Videos =====
    const campaignVideos = document.querySelectorAll('#campaigns video');

    campaignVideos.forEach(video => {
        video.addEventListener('click', () => {
            campaignVideos.forEach(v => {
                if (v !== video) {
                    v.pause();
                    v.classList.remove('playing');
                }
            });

            if (video.paused) {
                video.play();
                video.classList.add('playing');
            } else {
                video.pause();
                video.classList.remove('playing');
            }
        });

        video.addEventListener('ended', () => {
            video.classList.remove('playing');
        });
    });

    // ===== Services Fade-In =====
    const serviceBoxes = document.querySelectorAll(".service-box");
    const observerServices = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    serviceBoxes.forEach(box => observerServices.observe(box));
});



const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const total = items.length;

let currentMiddle = 0;

function updateCarousel() {
    // Remove all active classes first
    items.forEach(item => item.classList.remove('active'));

    // Calculate indices for left, middle, right
    const middle = currentMiddle % total;
    const left = (middle - 1 + total) % total;
    const right = (middle + 1) % total;

    // Apply active class to middle only
    items[middle].classList.add('active');

    // Move track so middle item is centered
    const offset = -middle * 100 / 3; // 33.33% per item
    track.style.transform = `translateX(${offset}%)`;

    // Move to next middle
    currentMiddle = (currentMiddle + 1) % total;
}

// Auto-run every 4s (middle visible longer)
setInterval(updateCarousel, 4000);
