let giriInput = document.querySelector("#vt-giri-input");
let diamInput = document.querySelector("#vt-diam-input"); // 

let giriSpan = document.querySelector("#giri-span");
let diamSpan = document.querySelector("#diam-span");

let htmlOutput = document.querySelector('#html-output');


function calcolaVT(props) {
    let formula = (props.giri * props.diametro * Math.PI) / 1000;

    giriSpan.textContent = `${props.giri} giri/minuto`;
    diamSpan.textContent = `Ø ${props.diametro} mm`;

    let results = {
        giri: props.giri,
        diametro: props.diametro,
        vt: formula.toFixed(2)
    }

    props.htmlOutput.textContent = results.vt;

    return results;
}

let props = {
    "giri": giriInput.value,
    "diametro": diamInput.value,
    "htmlOutput": htmlOutput,
}

calcolaVT(props);

let arrayInput = [giriInput, diamInput];

arrayInput.forEach((input) => {
    input.addEventListener('input', () => {
        props = {
            "giri": giriInput.value,
            "diametro": diamInput.value,
            "htmlOutput": htmlOutput,
        }

        calcolaVT(props);

        navigator.vibrate(10);
    }, { passive: true });
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("../../../../sw.js")
            .then(res => console.log("service worker registered", res))
            .catch(err => console.log("service worker not registered", err))
    })
}