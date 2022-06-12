let avanzDenteInput = document.querySelector("#avanz-dente-input");
let avanzDenteSpan = document.querySelector("#avanz-dente-span");

let numDentiInput = document.querySelector("#num-denti-input");
let numDentiSpan = document.querySelector("#num-denti-span");

let giriInput = document.querySelector("#giri-input");
let giriSpan = document.querySelector("#giri-span");

let htmlOutput = document.querySelector("#html-output");

function calcolaG94(props) {
    let formula = (props.avanzDente * props.numDenti) * props.giri;

    avanzDenteSpan.textContent = `${props.avanzDente}mm (avanzamento per dente)`;
    numDentiSpan.textContent = `${props.numDenti} numero denti`;
    giriSpan.textContent = `${props.giri} giri/min`;

    let results = {
        "g94": formula.toFixed(2),
        "avanzDente": avanzDenteInput.value / 100,
        "numDenti": numDentiInput.value,
        "giri": giriInput.value,
    }

    props.htmlOutput.textContent = results.g94;

    return results;
}

let props = {
    "avanzDente": avanzDenteInput.value / 100,
    "numDenti": numDentiInput.value,
    "giri": giriInput.value,
    htmlOutput
}

calcolaG94(props);

let arrayInput = [avanzDenteInput, numDentiInput, giriInput];

arrayInput.forEach((input) => {
    input.addEventListener('input', () => {
        props = {
            "avanzDente": avanzDenteInput.value / 100,
            "numDenti": numDentiInput.value,
            "giri": giriInput.value,
            htmlOutput
        }

        calcolaG94(props);
    }, { passive: true });
});