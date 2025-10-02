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



    const textLineElements = document.querySelectorAll("[data-text-line='true']");

    if (textLineElements.length) {
        textLineElements.forEach(el => {
            const lines = el.querySelectorAll(".lines");

            // Set initial opacity
            gsap.set(lines, { opacity: 0.35 });

            gsap.to(lines, {
                opacity: 1,
                ease: "power1.inOut",
                stagger: 0.03,
                delay: 2,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    end: "top 40%",
                    scrub: true,
                }
            });
        });
    }







}
