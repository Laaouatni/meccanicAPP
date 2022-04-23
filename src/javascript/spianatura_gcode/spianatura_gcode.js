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
    console.log({ height, width })
    return aspectRatio;
}

function setAspectRatioPezzo() {
    altezzaInput = document.getElementById("altezza-pezzo-range");
    lunghezzaInput = document.getElementById("lunghezza-pezzo-range");

    altezzaRangeValue = altezzaInput.value;
    lunghezzaRangeValue = lunghezzaInput.value;

    pezzoInputJSON = {
        "altezza": altezzaRangeValue,
        "lunghezza": lunghezzaRangeValue
    };

    pezzoGrezzo.style.aspectRatio = calcolaAspectRatio(pezzoInputJSON.altezza, pezzoInputJSON.lunghezza);

    if (pezzoGrezzo.offsetWidth > vw * 80) {
        pezzoGrezzo.style.width = pezzoGrezzo.offsetWidth - vw / 2 + 'px';
    }
}

//pc
mouse_events.forEach((item) => {
    altezzaInput.addEventListener(item, () => {
        setAspectRatioPezzo();
    });

    lunghezzaInput.addEventListener(item, () => {
        setAspectRatioPezzo();
    });
});

//mobile
touch_events.forEach((item) => {
    altezzaInput.addEventListener(item, () => {
        setAspectRatioPezzo();
    });

    lunghezzaInput.addEventListener(item, () => {
        setAspectRatioPezzo();
    });
});