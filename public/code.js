import { lenisAllowScroll } from './lenis/lenis-scroll.js';
import { marqueeSpeed } from './marquee/marquee-speed.js';
import { copyright } from './copyright/copyright.js';
import { swiperMentors } from './swiper/swiper-mentors.js';
import { swiperSessions } from './swiper/swiper-sessions.js';
import { timeline } from './timeline/timeline.js';




function initAll() {
    swiperMentors();
    marqueeSpeed();
    lenisAllowScroll();
    copyright();
    swiperSessions();
    timeline();
}


initAll();
