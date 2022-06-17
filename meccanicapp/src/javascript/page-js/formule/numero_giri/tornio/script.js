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

    return results;
}

let props = {
    "vt": vtInput.value,
    "diametro": diametroInput.value,
    "htmlOutput": htmlOutput,
}

calcolaGiri(props);

let arrayInput = [vtInput, diametroInput];

arrayInput.forEach((input) => {
    input.addEventListener('input', () => {
        props = {
            "vt": vtInput.value,
            "diametro": diametroInput.value,
            "htmlOutput": htmlOutput,
        }

        calcolaGiri(props);

        navigator.vibrate(10);
    }, { passive: true });
});