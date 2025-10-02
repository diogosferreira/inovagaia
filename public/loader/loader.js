export function loader() {
    //const element = document.querySelector("");
    //if (!element) return;



    // Always start at top (even on refresh/back/forward)
    (function forceScrollTop() {
        // Disable browser scroll restoration
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        // Kill native smooth so Lenis controls it
        try {
            var css = document.createElement('style');
            css.textContent = 'html,body{scroll-behavior:auto!important;}';
            document.head.appendChild(css);
        } catch (_) { }

        // Helper that works with or without Lenis
        function toTopImmediate() {
            if (window.lenis && typeof window.lenis.scrollTo === 'function') {
                // jump instantly, no easing
                window.lenis.scrollTo(0, { immediate: true, force: true });
            } else {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }
        }

        // On first paint
        document.addEventListener('DOMContentLoaded', toTopImmediate, { once: true });

        // After all assets (some browsers still try to restore here)
        window.addEventListener('load', toTopImmediate, { once: true });

        // When returning via bfcache (Safari/Firefox)
        window.addEventListener('pageshow', function (e) {
            if (e.persisted) toTopImmediate();
        });

        // If you initialize Lenis later, call this right after init too:
        //   lenis = new Lenis({...});
        //   lenis.scrollTo(0, { immediate: true, force: true });
    })();

}