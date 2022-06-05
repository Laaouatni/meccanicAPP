let btn = document.querySelectorAll("a");

btn.forEach((el) => {
    el.addEventListener("mousemove", () => {
        el.scrollIntoView({ behavior: "smooth", block: 'center' });
    });
});