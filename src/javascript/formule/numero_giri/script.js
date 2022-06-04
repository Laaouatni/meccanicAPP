let vtInput = document.querySelector('#vt-input');
let diametroInput = document.querySelector('#diametro-input');
let htmlOutput = document.querySelector('#html-output');



function calcolaGiri(props) {
    console.log(props)
    let formula = Math.round((props.vt * 1000) / (props.diametro * Math.PI));
    props.htmlOutput.textContent = formula;
}

let arrayInput = [vtInput, diametroInput];

arrayInput.forEach((input) => {
    input.addEventListener('input', () => {
        let props = {
            "vt": vtInput.value ? vtInput.value : "❌",
            "diametro": diametroInput.value ? diametroInput.value : "❌",
            "htmlOutput": htmlOutput,
        }

        calcolaGiri(props);
    });
});