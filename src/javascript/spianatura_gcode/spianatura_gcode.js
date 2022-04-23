let lunghezzaInput = document.getElementById("lunghezza-pezzo-input");
let larghezzaInput = document.getElementById("larghezza-pezzo-input");

let outputGcode = document.getElementById("output-gcode");

let pezzoGrezzo = {
    "X0": lunghezzaInput.value,
    "Y0": larghezzaInput.value
}

let options = {
    "absolute": true,
    "tool": "1",
    "feed": "1000",
    "speed": "3000",
    "X0": pezzoGrezzo.X0,
    "Y0": pezzoGrezzo.Y0,
    "nameGprogram": `%O0${10000 + Math.floor(Math.random() * 99999)}`
};

function init(options) {
    G90orG91();
    G54();

    function addGnameProgram(options) {
        if (options.nameGprogram != null) {}
    }

    function G90orG91(options) {
        if (options.absolute) {
            gcode.push(`G90`);
        } else {
            gcode.push(`G91`); // change to G91 then
        }
    }

    function G54() {
        gcode.push(`
G54 `);
    }
}

function createGcodeProgram(pezzoGrezzo, options) {
    let gcode = [];

    gcode.push("errore codice non giusto, sto ancora programmando l'app, non utilizzare!!! ")

    // now create a var with the gcode program
    let gcodeProgram = gcode.join("<br>");
    return gcodeProgram;
}

outputGcode.innerHTML = createGcodeProgram(pezzoGrezzo, options);