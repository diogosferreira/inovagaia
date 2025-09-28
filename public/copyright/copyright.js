export function copyright() {
    const element = document.querySelector("[copyright-year]");
    if (!element) return;

    document.addEventListener("DOMContentLoaded", function () {
        $("[copyright-year]").text(new Date().getFullYear());
    });
}