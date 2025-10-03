export function menu() {


    if ($(window).width() >= 991) {

        document.addEventListener("DOMContentLoaded", function () {
            (function navHoverClip() {
                const wrapper = document.querySelector(".nav-button-menu_wrapper");
                const trigger = document.querySelector(".nav-hamburger");
                const menu = document.querySelector(".nav_menu");
                const closeBtn = document.querySelector(".nav-close-button"); // NEW

                if (!wrapper || !trigger || !menu) return;

                // Hidden state: menu clipped from the LEFT; close button hidden
                gsap.set(menu, { clipPath: "inset(0% 0% 0% 100% round 40px)", autoAlpha: 1 });
                if (closeBtn) gsap.set(closeBtn, { autoAlpha: 0, pointerEvents: "none" });

                const tl = gsap.timeline({
                    paused: true,
                    defaults: { ease: "power3.inOut", duration: 0.8 }
                })
                    .to(menu, {
                        autoAlpha: 1,
                        clipPath: "inset(0% 0% 0% 0% round 40px)" // reveal full width (left→right)
                    })
                    // fade in close button while menu opens
                    .to(closeBtn, { autoAlpha: 1, pointerEvents: "auto" }, 0); // sync at start

                const openMenu = () => {
                    tl.play();
                    trigger.setAttribute("aria-expanded", "true");
                };

                const closeMenu = () => {
                    tl.reverse();
                    trigger.setAttribute("aria-expanded", "false");
                };

                trigger.addEventListener("mouseenter", openMenu);
                wrapper.addEventListener("mouseleave", closeMenu);

                // Click toggles for touch/keyboard users
                let open = false;
                trigger.addEventListener("click", (e) => {
                    e.preventDefault();
                    open = !open;
                    open ? openMenu() : closeMenu();
                });

                // Optional: clicking the close button closes the menu
                if (closeBtn) {
                    closeBtn.addEventListener("click", (e) => {
                        e.preventDefault();
                        open = false;
                        closeMenu();
                    });
                }

                // Optional: if focus leaves wrapper (keyboard), close it
                wrapper.addEventListener("focusout", (e) => {
                    if (!wrapper.contains(e.relatedTarget)) closeMenu();
                });
            })();
        });

    }


    /*
        document.addEventListener("DOMContentLoaded", function () {
            (function navHoverClip() {
                const wrapper = document.querySelector(".nav-button-menu_wrapper");
                const trigger = document.querySelector(".nav-hamburger");
                const menu = document.querySelector(".nav_menu");
                if (!wrapper || !trigger || !menu) return;
    
                // Hidden state: fully clipped from the LEFT (100% on left side)
                gsap.set(menu, {
                    clipPath: "inset(0% 0% 0% 100% round 40px)", // top right bottom left
                    autoAlpha: 1
                });
    
                const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut", duration: 0.8 } })
                    .to(menu, {
                        autoAlpha: 1,
                        clipPath: "inset(0% 0% 0% 0% round 40px)" // reveal full width (left→right)
                    });
    
                const onEnter = () => {
                    tl.play();
                    trigger.setAttribute("aria-expanded", "true");
                };
    
                const onLeaveWrapper = () => {
                    tl.reverse();
                    trigger.setAttribute("aria-expanded", "false");
                };
    
                trigger.addEventListener("mouseenter", onEnter);
                wrapper.addEventListener("mouseleave", onLeaveWrapper);
    
                let open = false;
                trigger.addEventListener("click", (e) => {
                    e.preventDefault();
                    open = !open;
                    if (open) {
                        tl.play();
                        trigger.setAttribute("aria-expanded", "true");
                    } else {
                        tl.reverse();
                        trigger.setAttribute("aria-expanded", "false");
                    }
                });
    
                wrapper.addEventListener("focusout", (e) => {
                    if (!wrapper.contains(e.relatedTarget)) onLeaveWrapper();
                });
            })();
        });
    */

    /* ScrollTrigger.create({
         start: "top top",
         end: 99999,
         onUpdate: (self) => {
             const currentScroll = window.pageYOffset;
 
             if (currentScroll > 100) {
                 // Animate opacity of .nav_background to 1
                 gsap.to(".nav_background", {
                     opacity: 1,
                     duration: 0.5,
                     ease: "power2.out",
                 });
 
                 // Show/hide navbar based on scroll direction
                 if (self.direction === -1) {
                     // Show navbar on scroll up
                     gsap.to(".nav_fixed", {
                         yPercent: 0,
                         duration: 0.9,
                         ease: "power2.out",
                     });
                 } else {
                     // Hide navbar on scroll down
                     gsap.to(".nav_fixed", {
                         yPercent: -100,
                         duration: 0.9,
                         ease: "power2.out",
                     });
                 }
             } else {
                 // Animate opacity of .nav_background to 0
                 gsap.to(".nav_background", {
                     opacity: 0,
                     duration: 0.5,
                     ease: "power2.out",
                 });
 
                 // Always show navbar if less than 100px scrolled
                 gsap.to(".nav_fixed", {
                     yPercent: 0,
                     duration: 0.9,
                     ease: "power2.out",
                 });
             }
         },
     });*/



}