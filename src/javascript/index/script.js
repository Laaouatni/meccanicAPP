let btn = document.querySelectorAll("a");

btn.forEach((el) => {
    el.addEventListener("mouseenter", () => {
        el.scrollIntoView({ behavior: "smooth", block: 'center' });
        console.log("entered");
    });
});