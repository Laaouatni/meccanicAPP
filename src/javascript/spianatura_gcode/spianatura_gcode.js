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
    "nameGprogram": 12345,
};

let gcode = [];

function initGcode(options) {
    addGnameProgram(options); // %O012345
    G90orG91(options); // G90
    ZeroPosition(); //G54

    function addGnameProgram(options) {
        if (options.nameGprogram != null &&
            options.nameGprogram != "" &&
            options.nameGprogram != undefined) {
            gcode.push(`%O0${options.nameGprogram}`);
        } else {
            gcode.push(`%O0${10000 + Math.floor(Math.random() * 99999)}`);
        }
    }

    function G90orG91(options) {
        if (options.absolute) {
            gcode.push(`G90`);
        } else {
            gcode.push(`G91`); // change to G91 then
        }
    }

    function ZeroPosition() {
        gcode.push(`G54`);
    }
}

function setGargoments(options) {
    setUtensile(options); // T1

    function setUtensile(options) {
        if (options.tool != null &&
            options.tool != "" &&
            options.tool != undefined) {
            gcode.push(`M06 T${options.tool}`);
        } else {
            gcode.push(`M06 ${Math.floor(Math.random() * 10)}`);
        }
    }
}

function createGcodeProgram(pezzoGrezzo, options) {
    gcode = [];

    gcode.push("errore codice non giusto, sto ancora programmando l'app, non utilizzare!!! <br> ")

    initGcode(options);
    setGargoments(options);

    // now create a var with the gcode program
    let gcodeProgram = gcode.join("<br>");
    return gcodeProgram;
}

outputGcode.innerHTML = createGcodeProgram(pezzoGrezzo, options);