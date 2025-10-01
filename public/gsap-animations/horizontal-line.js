export function horizontalLinesAnimation() {
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

}