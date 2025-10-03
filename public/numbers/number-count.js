export function numbersCount() {
    const element = document.querySelector("[data-numbers-count-wrapper='true']");
    if (!element) return;

    $("[data-numbers-count-wrapper='true']").each(function () {
        let html = $(this).html();

        // só apanha a parte numérica e envolve num <span>
        html = html.replace(/(\d[\d.,]*)/g, '<span data-numbers-anim="true">$1</span>');

        $(this).html(html);
    });



    // 1) nice thousands with dots
    function numberWithDots(n) {
        const parts = n.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(".");
    }

    // 2) Animate ONLY the numeric spans
    $("[data-numbers-anim='true']").each(function () {
        const $span = $(this);

        // Read the final number from the span’s current text (strip non-digits)
        const final = parseInt(($span.text() || "").replace(/[^\d]/g, ""), 10) || 0;

        // Start from 0 visually
        $span.text("0");

        // Use the closest wrapper as the ScrollTrigger trigger (so it animates when its card enters)
        const triggerEl =
            $span.closest("[data-numbers-count-wrapper='true']")[0] || $span[0];

        gsap.fromTo(
            $span[0],
            { innerText: 0 },
            {
                innerText: final,
                duration: 2.5,
                ease: "expo.out",
                snap: { innerText: 1 }, // round to integers
                scrollTrigger: {
                    trigger: triggerEl,
                    start: "top 80%",
                    // end: "bottom top", // not needed for one-shot
                },
                onUpdate: function () {
                    const el = this.targets()[0];
                    const val = Math.round(gsap.getProperty(el, "innerText"));
                    el.textContent = numberWithDots(val);
                },
            }
        );
    });

}