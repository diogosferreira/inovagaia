var swiper_base = new Swiper(".swiper-base", {
    slidesPerView: 4,
    speed: 700,
    spaceBetween: 40,
    centeredSlides: false,
    loop: false,
    //loopedSlides: 50,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return (
                '<span class="' + className + ' is-services-pagination">' + "</span>"
            );
        },
    },
    navigation: {
        nextEl: ".base-next-arrow",
        prevEl: ".base-prev-arrow",
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
            spaceBetween: 40,
        },
        1400: {
            //slidesPerView: 3.5,
            spaceBetween: 40,
        },
    },
    on: {
        init: function () {
            //show div when slider e set
            //$(".swiper").css("opacity", "1");
        },
    },
});
