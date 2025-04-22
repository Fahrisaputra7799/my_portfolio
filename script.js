function startInfiniteCarousel() {
    const track = document.querySelector('.carousel-track');
    track.innerHTML += track.innerHTML; // Duplikasi gambar agar looping lebih mulus

    let scrollAmount = 0;
    const scrollSpeed = 1; // Kecepatan pergeseran (bisa disesuaikan)

    function loopCarousel() {
        scrollAmount -= scrollSpeed;
        if (Math.abs(scrollAmount) >= track.scrollWidth / 2) {
            scrollAmount = 0; // Reset ke awal saat setengah gambar sudah bergeser
        }
        track.style.transform = `translateX(${scrollAmount}px)`;
        requestAnimationFrame(loopCarousel); // Jalankan animasi terus-menerus
    }

    loopCarousel();
}

document.addEventListener("DOMContentLoaded", startInfiniteCarousel);


// method image slider
const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
    }

    updateGallery() {
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3', 'gallery-item-4', 'gallery-item-5');
        });

        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i + 1}`);
        });
    }

    setCurrentState(direction) {
        if (direction.classList.contains('gallery-controls-previous')) {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
    }

    setControls() {
        this.carouselControls.forEach(control => {
            const button = document.createElement('button');
            button.className = `gallery-controls-${control}`;
            galleryControlsContainer.appendChild(button);
        });
    }

    useControls() {
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(trigger => {
            trigger.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(trigger);
            });
        });
    }
}

// Inisialisasi Carousel
const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);
exampleCarousel.setControls();
exampleCarousel.useControls();
