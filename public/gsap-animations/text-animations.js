export function gsapTitles() {
    const element = document.querySelector("[data-text-split='true']");
    if (!element) return;


    // 1) Split text into lines/words/chars for all targets
    const splitTargets = document.querySelectorAll("[data-text-split='true']");
    if (splitTargets.length) {
        splitTargets.forEach((text) => {
            // Avoid re-splitting if already processed
            if (text.__splitDone) return;
            if (typeof SplitText !== "function") return; // SplitText must be loaded

            new SplitText(text, {
                type: "words, chars, lines",
                mask: "lines",
                wordsClass: "word",
                linesClass: "lines",
                charsClass: "char",
            });

            gsap.set(text, { visibility: "visible" });
            text.__splitDone = true;
        });
    }

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
                stagger: 0.1,
                duration: 0.65,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    once: true,
                    invalidateOnRefresh: true,
                    // markers: true,
                },
                onComplete() {
                    lines.forEach((ln) => (ln.style.willChange = ""));
                },
            }
        );
    });
}