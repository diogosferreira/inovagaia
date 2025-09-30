export function timeline() {
    const element = document.querySelector(".timeline-sticky_wrapper");
    if (!element) return;



    (function timelineSlideLeft() {
        const wrapper = document.querySelector(".timeline-sticky_wrapper");
        if (!wrapper) return;

        // The visible mask (the thing that clips overflow)
        const viewport = wrapper.querySelector(".timeline-anim_wrapper") || wrapper;

        // The long horizontal strip to move
        const list =
            wrapper.querySelector(".timeline-points_wrapper.w-dyn-items") ||
            wrapper.querySelector(".timeline-points_wrapper");

        if (!list) return;


        // Compute how far LEFT we must go so the right edges align
        const targetX = () => {
            const vw = viewport.getBoundingClientRect().width;
            const lw = list.scrollWidth; // full content width
            const overflow = lw - vw;
            // Debug to see what we’re animating to:
            // console.log({ vw, lw, overflow, x: -Math.max(0, overflow) });
            return -Math.max(0, overflow); // NEGATIVE -> go left
        };

        gsap.to(list, {
            x: targetX,                 // move left by overflow
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".timeline-sticky_wrapper",
                start: "top+=10% top",
                end: "bottom-=10% bottom",
                scrub: true,
                invalidateOnRefresh: true,
                onRefresh: () => gsap.set(list, { x: 0 }) // reset before recalculating
                // markers: true
            }
        });
    })();


}