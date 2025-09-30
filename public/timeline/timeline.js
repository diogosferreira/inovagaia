export function timeline() {
    const element = document.querySelector(".timeline-sticky_wrapper");
    if (!element) return;


    $("[data-timeline-numbers='true']").each(function (i) {
        $(this).text(i + 1);
    });



    (function timelineSlideLeft() {
        const wrapper = document.querySelector(".timeline-sticky_wrapper");
        if (!wrapper) return;

        const viewport =
            wrapper.querySelector(".timeline-anim_wrapper") || wrapper;

        const list =
            wrapper.querySelector(".timeline-points_wrapper.w-dyn-items") ||
            wrapper.querySelector(".timeline-points_wrapper");
        if (!list) return;



        // How far left we must move so right edges align
        const targetX = () => {
            const vw = viewport.clientWidth;
            const lw = list.scrollWidth;           // full width of the horizontal content
            const overflow = Math.max(0, lw - vw); // don't go positive if content is smaller
            return -overflow;                      // negative => move left
        };

        // Build the animation paused and let ScrollTrigger drive its progress
        const anim = gsap.fromTo(
            list,
            { x: 0 },
            {
                x: targetX,               // function-based for responsive recalcs
                ease: "power1.inOut",
                immediateRender: false    // don't force-render on creation
            }
        );

        ScrollTrigger.create({
            animation: anim,
            trigger: ".timeline-sticky_wrapper",
            start: "top+=10% top",
            end: "bottom-=10% bottom",
            scrub: true,
            invalidateOnRefresh: true,
            onRefresh: (self) => {
                // Recompute the TO value and keep progress in sync
                anim.vars.x = targetX;
                anim.invalidate();        // re-measure & rebuild tween
            }
            // markers: true
        });

        // If images/fonts affect width, refresh after they load
        window.addEventListener("load", () => ScrollTrigger.refresh());
    })();

}