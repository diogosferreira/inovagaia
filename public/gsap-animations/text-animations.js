/*export function gsapTitles() {
    const element = document.querySelector("[data-text-split='true']");
    if (!element) return;

    const texts = document.querySelectorAll("[data-text-split='true']");

    document.querySelectorAll("[data-text-split='true']").forEach((text) => {
        const split = new SplitText(text, {
            type: "words, chars, lines",
            //mask: "words",
            mask: "lines",
            wordsClass: "word",
            linesClass: "lines",
            charsClass: "char",
        });
        //

    });

    // 2) Per-letter opacity scrub
    const textLetterElements = document.querySelectorAll("[data-text-letter='true']");
    textLetterElements.forEach((el) => {
        const chars = el.querySelectorAll(".char");
        if (!chars.length) return;

        gsap.fromTo(
            chars,
            { opacity: 0.35 },
            {
                opacity: 1,
                ease: "power1.inOut",
                stagger: 0.03,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    end: "top 40%",
                    scrub: true,
                    // markers: true,
                },
            }
        );
    });

    // 3) Per-line reveal (slide up)
    const lineBlocks = document.querySelectorAll("[data-text-line='true']");
    lineBlocks.forEach((el) => {
        const lines = el.querySelectorAll(".lines");
        if (!lines.length) return;

        gsap.fromTo(
            lines,
            { yPercent: 100 },
            {
                yPercent: 0,
                ease: "power1.inOut",
                //stagger: 0.1,
                duration: 0.65,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    once: true,
                    invalidateOnRefresh: true,
                    // markers: true,
                },

            }
        );
    });


    gsap.set(texts, { visibility: "visible" });
}


*/


export function gsapTitles() {
    const targets = document.querySelectorAll("[data-text-split='true']");
    if (!targets.length) return;

    /*

    document.fonts.ready.then(() => {
        targets.forEach((el) => {
            if (el.__splitDone) return;
            el.__splitDone = true;

            const wantsLineReveal = el.matches("[data-text-line='true']");
            const wantsLetterAnim = el.matches("[data-text-letter='true']");

            SplitText.create(el, {
                type: "lines,words,chars",
                autoSplit: true,
                mask: "lines",
                linesClass: "lines",
                wordsClass: "word",
                charsClass: "char",
                onSplit(self) {
                    if (wantsLineReveal) {
                        return gsap.timeline({
                            scrollTrigger: {
                                trigger: el,
                                start: "top bottom",
                                end: "top 80%",
                                toggleActions: "none play none reset",
                            },
                        })
                            .from(self.lines, {
                                yPercent: 110,
                                duration: 0.8,
                                delay: 0.2,
                                stagger: { amount: 0.5 },
                                ease: "power1.out",
                            });
                    }
                },
            });

            if (wantsLetterAnim) {
                const chars = el.querySelectorAll(".char");
                if (chars.length) {
                    gsap.fromTo(
                        chars,
                        { opacity: 0.35 },
                        {
                            opacity: 1,
                            ease: "power1.inOut",
                            stagger: 0.03,
                            scrollTrigger: {
                                trigger: el,
                                start: "top 80%",
                                end: "top 40%",
                                scrub: true,
                            },
                        }
                    );
                }
            }
        });

        // reveal after setup to avoid flicker
        gsap.set(targets, { visibility: "visible" });
    });


    */


    // -------------------------
    // 1) Shared split function
    // -------------------------
    function splitText(el) {
        // only split once
        if (el.__split) return el.__split;

        el.__split = SplitText.create(el, {
            type: "lines,words,chars",
            autoSplit: true,
            mask: "lines",
            linesClass: "lines",
            wordsClass: "word",
            charsClass: "char",
        });

        return el.__split;
    }

    // -------------------------
    // 2) Animations
    // -------------------------
    function animateLines(el) {
        const split = splitText(el);

        gsap.fromTo(split.lines,
            { yPercent: 100, opacity: 0 },
            {
                yPercent: 0,
                opacity: 1,
                ease: "power2.out",
                stagger: 0.1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }

    function animateChars(el) {
        const split = splitText(el);

        gsap.fromTo(split.chars,
            { opacity: 0.2 },
            {
                opacity: 1,
                ease: "power1.inOut",
                stagger: 0.02,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    scrub: true
                }
            }
        );
    }

    // -------------------------
    // 3) Init
    // -------------------------
    document.querySelectorAll("[data-text-line='true']").forEach(animateLines);
    document.querySelectorAll("[data-text-letter='true']").forEach(animateChars);
}