import { lenisAllowScroll } from './lenis/lenis-scroll.js';
import { marqueeSpeed } from './marquee/marquee-speed.js';
import { copyright } from './copyright/copyright.js';




function initAll() {
    marqueeSpeed();
    lenisAllowScroll();
    copyright();

}


initAll();
