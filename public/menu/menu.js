document.addEventListener("DOMContentLoaded", function () {
    ScrollTrigger.create({
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
    });
});
