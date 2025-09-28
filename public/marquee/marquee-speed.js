export function marqueeSpeed() {
    const element = document.querySelector(".marquee_list-speed");
    if (!element) return;

    const marquees = document.querySelectorAll(".marquee_track-speed");

    marquees.forEach((track, index) => {
        const speed = 100; // px per second
        const list = track.querySelector(".marquee_list-speed");
        if (!list) return;

        // Clone content
        const clone = list.cloneNode(true);
        track.appendChild(clone);

        requestAnimationFrame(() => {
            setTimeout(() => {
                const width = list.offsetWidth;
                if (width === 0) return;

                const duration = width / speed;

                gsap.set(track, { x: 0 });
                const tween = gsap.to(track, {
                    x: -width,
                    duration: duration,
                    ease: "none",
                    repeat: -1
                });

                // ✅ Stop on hover if data attribute is present
                const wrapper = track.closest(".marquee-speed");
                if (wrapper && wrapper.getAttribute("data-stop-on-hover") === "true") {
                    wrapper.addEventListener("mouseenter", () => tween.pause());
                    wrapper.addEventListener("mouseleave", () => tween.resume());
                }
            }, 300);
        });
    });
}