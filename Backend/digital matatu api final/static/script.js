document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.sliderPrevBtn');
    const nextBtn = document.querySelector('.sliderNextBtn');
    let currentIndex = 0;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    });

    slides.forEach((slide, index) => {
        const thumbnail = slide.dataset.thumbnail;
        const heading = slide.dataset.heading;
        slide.style.backgroundImage = `url(${thumbnail})`;
        slide.innerHTML = `<h3>${heading}</h3>`;
    });
});
