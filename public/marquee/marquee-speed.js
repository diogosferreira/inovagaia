
export function marqueeSpeed() {
    const element = document.querySelector(".marquee_list-speed");
    if (!element) return;

    const marquees = document.querySelectorAll(".marquee_track-speed");

    marquees.forEach((track, index) => {

        const speed = 100; // px per second
        const list = track.querySelector(".marquee_list-speed");
        if (!list) {
            return;
        }

        // Clone content
        const clone = list.cloneNode(true);
        track.appendChild(clone);
        //console.log(`[Marquee ${index + 1}] ✅ List cloned`);

        // Wait for images, fonts, and layout to be fully ready
        requestAnimationFrame(() => {
            setTimeout(() => {
                const width = list.offsetWidth;
                //console.log(`[Marquee ${index + 1}] 📏 Calculated width: ${width}px`);

                if (width === 0) {
                    //console.warn(`[Marquee ${index + 1}] ❗ Content width is 0. Aborting.`);
                    return;
                }

                const duration = width / speed;

                gsap.set(track, { x: 0 });
                gsap.to(track, {
                    x: -width,
                    duration: duration,
                    ease: "none",
                    repeat: -1,
                });

                //console.log(`[Marquee ${index + 1}] 🎬 Animation started (duration: ${duration.toFixed(2)}s)`);
            }, 300); // Delay for dynamic content like Webflow CMS or lazy-loaded items
        });
    });


}