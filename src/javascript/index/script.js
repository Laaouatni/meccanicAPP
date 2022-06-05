let btn = document.querySelectorAll("a");

btn.forEach((el) => {
    el.addEventListener("mouseover", () => {
        el.scrollIntoView({ behavior: "smooth", block: 'center' });
    });
});