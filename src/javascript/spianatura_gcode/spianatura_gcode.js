/* get #pezzo-grezzo */
let pezzoGrezzo = document.getElementById("pezzo-grezzo");

let altezzaInput = document.getElementById("altezza-pezzo-range");
let lunghezzaInput = document.getElementById("lunghezza-pezzo-range");

let altezzaRangeValue = altezzaInput.value;
let lunghezzaRangeValue = lunghezzaInput.value;

let pezzoInputJSON = {
    "altezza": altezzaRangeValue,
    "lunghezza": lunghezzaRangeValue
};

let mouse_events = ["mousemove", "mousedown", "click"];
let touch_events = ["touchstart", "touchend", "touchmove"];


// create vh and vw
let vh = window.innerHeight / 100;
let vw = window.innerWidth / 100;

function calcolaAspectRatio(height, width) {
    let aspectRatio = height / width;
    return aspectRatio;
}

//pc
mouse_events.forEach((item) => {
    altezzaInput.addEventListener(item, () => {
        altezzaInput = document.getElementById("altezza-pezzo-range");
        lunghezzaInput = document.getElementById("lunghezza-pezzo-range");

        altezzaRangeValue = altezzaInput.value;
        lunghezzaRangeValue = lunghezzaInput.value;

        pezzoInputJSON = {
            "altezza": altezzaRangeValue,
            "lunghezza": lunghezzaRangeValue
        };

        pezzoGrezzo.style.aspectRatio = calcolaAspectRatio(pezzoInputJSON.altezza, pezzoInputJSON.lunghezza);

        if (pezzoGrezzo.offsetHeight > vh * 80) {
            pezzoGrezzo.style.width = 100 + "px";
        }
    });

    lunghezzaInput.addEventListener(item, () => {

        altezzaInput = document.getElementById("altezza-pezzo-range");
        lunghezzaInput = document.getElementById("lunghezza-pezzo-range");

        altezzaRangeValue = altezzaInput.value;
        lunghezzaRangeValue = lunghezzaInput.value;

        pezzoInputJSON = {
            "altezza": altezzaRangeValue,
            "lunghezza": lunghezzaRangeValue
        };

        pezzoGrezzo.style.aspectRatio = calcolaAspectRatio(pezzoInputJSON.altezza, pezzoInputJSON.lunghezza);

        if (pezzoGrezzo.offsetHeight > vh * 80) {
            pezzoGrezzo.style.width = 100 + "px";
        }
    });
});

//mobile
touch_events.forEach((item) => {
    altezzaInput.addEventListener(item, () => {

        altezzaInput = document.getElementById("altezza-pezzo-range");
        lunghezzaInput = document.getElementById("lunghezza-pezzo-range");

        altezzaRangeValue = altezzaInput.value;
        lunghezzaRangeValue = lunghezzaInput.value;

        pezzoInputJSON = {
            "altezza": altezzaRangeValue,
            "lunghezza": lunghezzaRangeValue
        };

        pezzoGrezzo.style.aspectRatio = calcolaAspectRatio(pezzoInputJSON.altezza, pezzoInputJSON.lunghezza);

        if (pezzoGrezzo.offsetHeight > vh * 80) {
            pezzoGrezzo.style.width = 100 + "px";
        }
    });

    lunghezzaInput.addEventListener(item, () => {

        altezzaInput = document.getElementById("altezza-pezzo-range");
        lunghezzaInput = document.getElementById("lunghezza-pezzo-range");

        altezzaRangeValue = altezzaInput.value;
        lunghezzaRangeValue = lunghezzaInput.value;

        pezzoInputJSON = {
            "altezza": altezzaRangeValue,
            "lunghezza": lunghezzaRangeValue
        };

        pezzoGrezzo.style.aspectRatio = calcolaAspectRatio(pezzoInputJSON.altezza, pezzoInputJSON.lunghezza);
        if (pezzoGrezzo.offsetHeight > vh * 80) {
            pezzoGrezzo.style.width = 100 + "px";
        }
    });
});