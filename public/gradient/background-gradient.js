export function backgroundGradient() {
    const element = document.querySelector(".gradient-base-background");
    if (!element) return;


    // Call this once after GSAP is loaded
    function animateBulbs() {
        document.querySelectorAll(".gradient-base-background").forEach(parent => {
            const bulbs = Array.from(parent.querySelectorAll("[data-bulb='true']"));
            if (!bulbs.length) return;

            // per-bulb state
            const states = bulbs.map(bulb => {
                const startX = bulb.offsetLeft;
                const startY = bulb.offsetTop;
                gsap.set(bulb, { x: 0, y: 0, willChange: "transform" });
                return { bulb, startX, startY, target: null };
            });

            const EASES = ["power1.inOut", "sine.inOut", "power2.inOut", "power3.inOut", "expo.inOut"];

            // helpers
            const bounds = () => {
                const maxX = parent.clientWidth - states[0].bulb.offsetWidth;
                const maxY = parent.clientHeight - states[0].bulb.offsetHeight;
                return { maxX: Math.max(0, maxX), maxY: Math.max(0, maxY) };
            };

            const getPos = s => {
                // current absolute position (within parent) = initial offset + current gsap x/y
                return {
                    x: s.startX + (gsap.getProperty(s.bulb, "x") || 0),
                    y: s.startY + (gsap.getProperty(s.bulb, "y") || 0)
                };
            };

            const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

            function pickTarget(currState) {
                const { maxX, maxY } = bounds();
                // Min distance: ~20–30% of the smaller dimension (tweak as you like)
                const minD = Math.max(80, Math.min(maxX, maxY) * 0.25);

                // Try several times to find a spot not too close to others
                for (let tries = 0; tries < 12; tries++) {
                    const candidate = {
                        x: gsap.utils.random(0, maxX),
                        y: gsap.utils.random(0, maxY)
                    };

                    // Compare with other bulbs' CURRENT positions (not just last targets)
                    let ok = true;
                    for (const s of states) {
                        if (s === currState) continue;
                        const p = getPos(s);
                        if (dist(candidate, p) < minD) { ok = false; break; }
                    }
                    if (ok) return candidate;
                }

                // If we didn't find a perfect spot, just return something bounded
                return {
                    x: gsap.utils.random(0, maxX),
                    y: gsap.utils.random(0, maxY)
                };
            }

            function moveOne(s) {
                const { x, y } = pickTarget(s);
                s.target = { x, y };

                const curr = getPos(s);
                const dx = x - s.startX;
                const dy = y - s.startY;

                gsap.to(s.bulb, {
                    x: dx,
                    y: dy,
                    duration: gsap.utils.random(3, 6),           // varied duration
                    ease: gsap.utils.random(EASES),
                    delay: gsap.utils.random(0.2, 1.0),          // small random delay to desync
                    onComplete: () => moveOne(s)
                });
            }

            // Kick off each bulb with a different phase so they don't sync up
            states.forEach((s, i) => {
                gsap.delayedCall(gsap.utils.random(0, 0.8), () => moveOne(s));
            });

            // Keep bulbs inside on resize (reclamp the current transform)
            const onResize = () => {
                const { maxX, maxY } = bounds();
                states.forEach(s => {
                    const p = getPos(s);
                    const clampedX = gsap.utils.clamp(0, maxX, p.x);
                    const clampedY = gsap.utils.clamp(0, maxY, p.y);
                    gsap.set(s.bulb, {
                        x: clampedX - s.startX,
                        y: clampedY - s.startY
                    });
                });
            };
            window.addEventListener("resize", onResize);
        });
    }

    // start it
    animateBulbs();

}