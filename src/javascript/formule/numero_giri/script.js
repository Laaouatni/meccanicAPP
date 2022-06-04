let vtInput = document.querySelector('#vt-input');
let diametroInput = document.querySelector('#diametro-input');
let htmlOutput = document.querySelector('#html-output');

let props = {
    "vt": vtInput ? vtInput.value && console.log("✅") : "❌",
    "diametro": diametroInput.value && console.log("✅") ? diametroInput.value : "❌",
    "htmlOutput": htmlOutput,
}

function calcolaGiri(props) {
    console.log(props)
    let formula = Math.round((props.vt * 1000) / (props.diametro * Math.PI));
    props.htmlOutput.textContent = formula;
}

let arrayInput = [vtInput, diametroInput];

arrayInput.forEach((input) => {
    input.addEventListener('input', () => {
        calcolaGiri(props);
    });
});