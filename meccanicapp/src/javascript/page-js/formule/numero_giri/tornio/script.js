let vtInput = document.querySelector('#vt-input');
let diametroInput = document.querySelector('#diametro-input');
let htmlOutput = document.querySelector('#html-output');

let vtSpan = document.querySelector('#vt-value-span');
let diametroSpan = document.querySelector('#diametro-value-span');

function calcolaGiri(props) {
    let formula = (props.vt * 1000) / (props.diametro * Math.PI);

    vtSpan.textContent = `${props.vt} m/min`;
    diametroSpan.textContent = `Ø ${props.diametro} mm`;


    let results = {
        vt: props.vt,
        diametro: props.diametro,
        giri: formula.toFixed(2)
    }
    props.htmlOutput.textContent = results.giri;

    /*  document.querySelector("#test-json-giri").textContent = JSON.stringify(results); */

    return results;
}

let props = {
    "vt": vtInput.value ? vtInput.value : "❌ errore, l'input ha qualche problema",
    "diametro": diametroInput.value ? diametroInput.value : "❌ errore, l'input ha qualche problema'",
    "htmlOutput": htmlOutput,
}

calcolaGiri(props);

let arrayInput = [vtInput, diametroInput];

arrayInput.forEach((input) => {
    input.addEventListener('input', () => {
        props = {
            "vt": vtInput.value ? vtInput.value : "❌",
            "diametro": diametroInput.value ? diametroInput.value : "❌",
            "htmlOutput": htmlOutput,
        }

        calcolaGiri(props);

        navigator.vibrate(10);
    }, { passive: true });
});

/* if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("../../../../sw.js")
            .then(res => console.log("service worker registered", res))
            .catch(err => console.log("service worker not registered", err)) 
})
} */