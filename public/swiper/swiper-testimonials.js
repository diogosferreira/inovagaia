export function swiperTestimonials() {
    const element = document.querySelector(".swiper-testimonials");
    if (!element) return;


    var swiper_base = new Swiper(".swiper-testimonials", {
        slidesPerView: 1,
        speed: 700,
        spaceBetween: 24,
        centeredSlides: false,
        loop: false,
        //loopedSlides: 50,
        pagination: {
            el: ".swiper-pagination.is-testimonials",
            clickable: true,
            renderBullet: function (index, className) {
                return (
                    '<span class="' + className + ' is-testimonials-pagination">' + "</span>"
                );
            },
        },

        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
        breakpoints: {
            0: {
                //slidesPerView: 1.8,
                spaceBetween: 16,
                slidesPerView: 1,
            },
            1024: {
                //slidesPerView: 2.8,
                spaceBetween: 24,
            },
            1400: {
                //slidesPerView: 3.5,
                spaceBetween: 24,
            },
        },
        on: {
            init: function () {
                //show div when slider e set
                //$(".swiper").css("opacity", "1");
            },
        },
    });

}