import { lenisAllowScroll } from './lenis/lenis-scroll.js';
import { marqueeSpeed } from './marquee/marquee-speed.js';
import { copyright } from './copyright/copyright.js';
import { swiperMentors } from './swiper/swiper-mentors.js';
import { swiperSessions } from './swiper/swiper-sessions.js';
import { swiperTestimonials } from './swiper/swiper-testimonials.js';
import { timeline } from './timeline/timeline.js';
import { numbersCount } from './numbers/number-count.js';
import { backgroundGradient } from './gradient/background-gradient.js';
import { linesAnimation } from './gsap-animations/horizontal-line.js';
import { menu } from './menu/menu.js';
import { loader } from './loader/loader.js';
import { gsapTitles } from './gsap-animations/text-animations.js';




function initAll() {
    gsapTitles();
    loader();
    menu();
    linesAnimation();
    backgroundGradient();
    numbersCount();
    swiperMentors();
    marqueeSpeed();
    lenisAllowScroll();
    copyright();
    swiperSessions();
    swiperTestimonials();
    timeline();
}


initAll();
