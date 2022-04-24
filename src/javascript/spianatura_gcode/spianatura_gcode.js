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
    "diametro": 20
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
    setSpeed(options); // S3000

    function setUtensile(options) {
        if (options.tool != null &&
            options.tool != "" &&
            options.tool != undefined) {
            gcode.push(`M06 T${options.tool}`);
            gcode.push(`G43 H${options.tool}`);
        } else {
            let randomUtensile = Math.floor(Math.random() * 10);
            gcode.push(`M06 ${randomUtensile}`);
            gcode.push(`G43 H${randomUtensile}`);
        }
    }

    function setSpeed(options) {
        if (options.speed != null &&
            options.speed != "" &&
            options.speed != undefined) {
            gcode.push(`S${options.speed} M3`);
        } else {
            gcode.push(`S1000 M3`);
        }
    }
}

function G1(x, y, z) {
    gcode.push(`G1 X${x} Y${y} Z${z}`);
}

function G0(x, y, z) {
    // if x or y o z is null or undefined then set it to 0
    if (x == null ||
        x == undefined) {
        x = 0;

    }
    if (y == null ||
        y == undefined) {
        y = 0;
    }
    if (z == null ||
        z == undefined ||
        z == "") {
        z = 0;
    }
    gcode.push(`G0 X${x} Y${y} Z${z}`);
}

function startGsicurezza() {
    let startPoint = 0 - options.diametro / 2 - 2;
    G0(startPoint);
    G1(pezzoGrezzo.X0);
}

function createGcodeProgram(pezzoGrezzo, options) {
    gcode = [];

    gcode.push("errore codice non giusto, sto ancora programmando l'app, non utilizzare!!! <br> ")

    initGcode(options);
    setGargoments(options);
    startGsicurezza();

    // now create a var with the gcode program
    let gcodeProgram = gcode.join("<br>");
    return gcodeProgram;
}

outputGcode.innerHTML = createGcodeProgram(pezzoGrezzo, options);