let btn = document.querySelectorAll("a");

btn.forEach((el) => {
    el.addEventListener("mouseenter", () => {
        if (window.innerWidth < 800) {
            el.scrollIntoView({ behavior: "smooth", block: 'center' });
            console.log("entered on mobile");
        } else {
            let scrollAfterTime = setTimeout(() => {
                el.scrollIntoView({ behavior: "smooth", block: 'center' });
                console.log("pc, 1 second after, started scrolling");
            }, 1500);

            el.addEventListener('mouseleave', () => {
                clearTimeout(scrollAfterTime);
                console.log("leave on pc, before the 1500")
            });
        }
    });
});