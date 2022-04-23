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