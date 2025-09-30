import { lenisAllowScroll } from './lenis/lenis-scroll.js';
import { marqueeSpeed } from './marquee/marquee-speed.js';
import { copyright } from './copyright/copyright.js';
import { swiperMentors } from './swiper/swiper-mentors.js';
import { swiperSessions } from './swiper/swiper-sessions.js';




function initAll() {
    swiperMentors();
    marqueeSpeed();
    lenisAllowScroll();
    copyright();
    swiperSessions();
}


initAll();
