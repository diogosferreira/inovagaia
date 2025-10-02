export function gsapTitles() {
    const element = document.querySelector("[data-text-split='true']");
    if (!element) return;


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
        gsap.set(text, { visibility: "visible" });
    });


    const textLetterElements = document.querySelectorAll("[data-text-letter='true']");

    if (textLetterElements.length) {
        textLetterElements.forEach(el => {
            const chars = el.querySelectorAll(".char");

            // Set initial opacity
            gsap.set(chars, { opacity: 0.35 });

            gsap.to(chars, {
                opacity: 1,
                ease: "power1.inOut",
                stagger: 0.03,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    end: "top 40%",
                    scrub: true,
                }
            });
        });
    }




    const wrappers = document.querySelectorAll("[data-text-line='true']");

    wrappers.forEach((el) => {
        const lines = el.querySelectorAll(".lines");
        if (!lines.length) return;

        // perf hint
        lines.forEach(l => (l.style.willChange = "transform, opacity"));

        gsap.fromTo(lines,
            { yPercent: 100 },
            {
                yPercent: 0,
                ease: "power1.inOut",
                stagger: 0.1,
                delay: 0,                    // avoid fixed 2s delay unless you want it
                duration: 0.65,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    once: true,                // play only once; remove if you want replay
                    invalidateOnRefresh: true

                },
                onComplete() {
                    // clean up perf hint
                    lines.forEach(l => (l.style.willChange = ""));
                }
            }
        );
    });







}
