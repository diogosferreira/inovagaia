export function gsapTitles() {
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


    // 3) Per-line reveal with stagger (no flash)
    document.querySelectorAll("[data-text-line='true']").forEach((el) => {
        const lines = el.querySelectorAll(".lines");
        if (!lines.length) return;

        gsap.to(lines, {
            yPercent: 0,
            opacity: 1,
            ease: "power1.inOut",
            stagger: 0.1,
            duration: 0.65,
            overwrite: true,
            // prevent any eager painting
            immediateRender: false,
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                once: true,
                invalidateOnRefresh: true,
            },
            // cleanup (optional)
            onComplete() {
                gsap.set(lines, { clearProps: "transform,opacity" });
            },
        });
    });


    gsap.set(texts, { visibility: "visible" });
}


