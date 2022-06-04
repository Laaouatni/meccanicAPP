let vtInput = document.querySelector('#vt-input');
let diametroInput = document.querySelector('#diametro-input');
let htmlOutput = document.querySelector('#html-output');

let vtSpan = document.querySelector('#vt-value-span');
let diametroSpan = document.querySelector('#diametro-value-span');

function calcolaGiri(props) {
    let formula = (props.vt * 1000) / (props.diametro * Math.PI);

    vtSpan.textContent = `${props.vt} m/min`;
    diametroSpan.textContent = `Ø ${props.diametro} mm`;

    props.htmlOutput.textContent = formula.toFixed(2);
}


let props = {
    "vt": vtInput.value ? vtInput.value : "❌",
    "diametro": diametroInput.value ? diametroInput.value : "❌",
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
    }, { passive: true });
});