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


if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("../../../../sw.js")
            .then(res => console.log("service worker registered", res))
            .catch(err => console.log("service worker not registered", err))
    })
}