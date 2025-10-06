export function marqueeSpeed() {
    const element = document.querySelector(".marquee_list-speed");
    if (!element) return;

    const marquees = document.querySelectorAll(".marquee_track-speed");

    marquees.forEach((track) => {
        const list = track.querySelector(".marquee_list-speed");
        if (!list) return;

        // Clone content
        const clone = list.cloneNode(true);
        track.appendChild(clone);

        requestAnimationFrame(() => {
            setTimeout(() => {
                const width = list.offsetWidth;
                if (width === 0) return;

                // Default speed
                let speed = 100;

                // ✅ Check wrapper attributes
                const wrapper = track.closest(".marquee-speed");

                // If under 991px and wrapper has data-mobile-speed → override
                if (window.innerWidth < 991 && wrapper?.hasAttribute("data-mobile-speed")) {
                    const mobileSpeed = parseFloat(wrapper.getAttribute("data-mobile-speed"));
                    if (!isNaN(mobileSpeed) && mobileSpeed > 0) {
                        speed = mobileSpeed;
                    }
                }

                const duration = width / speed;

                gsap.set(track, { x: 0 });
                const tween = gsap.to(track, {
                    x: -width,
                    duration: duration,
                    ease: "none",
                    repeat: -1
                });

                // ✅ Stop on hover if data attribute is present
                if (wrapper && wrapper.getAttribute("data-stop-on-hover") === "true") {
                    wrapper.addEventListener("mouseenter", () => tween.pause());
                    wrapper.addEventListener("mouseleave", () => tween.resume());
                }
            }, 300);
        });
    });
}