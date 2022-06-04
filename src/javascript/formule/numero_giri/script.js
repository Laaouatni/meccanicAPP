let vtInput = document.querySelector('#vt-input');
let diametroInput = document.querySelector('#diametro-input');
let htmlOutput = document.querySelector('#html-output');

let props = {
    "vt": vtInput.value,
    "diametro": diametroInput.value,
    "htmlOutput": htmlOutput,
}

function calcolaGiri(props) {
    let formula = Math.round((props.vt * 1000) / (props.diametro * Math.PI));
    props.htmlOutput.textContent = formula;
}