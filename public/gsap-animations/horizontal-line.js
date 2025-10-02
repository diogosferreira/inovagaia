export function linesAnimation() {
    const element = document.querySelector("[horizontal-line-scroll-anim='true']");
    if (!element) return;




    gsap.fromTo("[horizontal-line-scroll-anim='true']",
        { width: "0%" },
        {
            width: "100%",
            duration: 1.2,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "[horizontal-line-scroll-anim='true']",
                start: "top 85%",
                toggleActions: "play none none reverse"
                // markers: true
            }
        }
    );



    function animateLinesStaggerWidthHeight() {
        document.querySelectorAll("[animate-lines-stagger='true']").forEach(section => {
            const verticalLines = section.querySelectorAll("[animate-vertical-line='true']");
            const horizontalLines = section.querySelectorAll("[animate-horizontal-line='true']");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                    // markers: true
                },
                defaults: { duration: 1.2, ease: "power1.inOut" }
            });

            // Vertical: reveal with scaleY (no height tweening)
            if (verticalLines.length) {
                gsap.set(verticalLines, { transformOrigin: "top", scaleY: 0 });
                tl.to(verticalLines, { scaleY: 1, stagger: { amount: 0.6 } }, 0);
            }

            // Horizontal: reveal with scaleX (or keep your width tween)
            if (horizontalLines.length) {
                gsap.set(horizontalLines, { transformOrigin: "left", scaleX: 0 });
                tl.to(horizontalLines, { scaleX: 1, stagger: { amount: 0.6 } }, 0);
                // If you prefer width tween instead:
                // gsap.set(horizontalLines, { width: "0%" });
                // tl.to(horizontalLines, { width: "100%", stagger: { amount: 0.6 } }, 0);
            }
        });
    }

    animateLinesStaggerWidthHeight();

}