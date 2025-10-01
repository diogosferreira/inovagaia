import { lenisAllowScroll } from './lenis/lenis-scroll.js';
import { marqueeSpeed } from './marquee/marquee-speed.js';
import { copyright } from './copyright/copyright.js';
import { swiperMentors } from './swiper/swiper-mentors.js';
import { swiperSessions } from './swiper/swiper-sessions.js';
import { swiperTestimonials } from './swiper/swiper-testimonials.js';
import { timeline } from './timeline/timeline.js';
import { numbersCount } from './numbers/number-count.js';




function initAll() {
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
