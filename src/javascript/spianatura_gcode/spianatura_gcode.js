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
let previusX = 0;
let previusY = 10;
let previusZ = 0;



function initGcode(options) {
    resetGcode();
    resetXYZ();
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

    function resetGcode() {
        gcode = [];
    }

    function resetXYZ() {
        previusX = 0;
        previusY = 0;
        previusZ = 0;
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

function G0(x, y, z) {
    let XYZ = checkSolveXYZ(x, y, z);
    gcode.push(`G0 X${XYZ.x} Y${XYZ.y} Z${XYZ.z}`);
}

function G1(x, y, z) {
    let XYZ = checkSolveXYZ(x, y, z);
    gcode.push(`G1 X${XYZ.x} Y${XYZ.y} Z${XYZ.z}`);
}

function checkSolveXYZ(x, y, z) {
    if (x == null || x == undefined || x == "") {
        console.log(x)
        if (previusX != null || previusX != undefined || previusX != "") {
            x = previusX;
        } else {
            x = 0;
        }
    }
    if (y == null || y == undefined || y == "") {

        if (previusY != null || previusY != undefined || previusY != "") {
            y = previusY;
            console.log("hello i am previus")
        } else {
            y = 0;
            console.log("i am 0")
        }
    }
    if (z == null || z == undefined || z == "") {

        console.log(z)
        if (previusZ != null || previusZ != undefined || previusZ != "") {
            z = previusZ;
        } else {
            z = 0;
        }
    }

    return { x, y, z };
}

function startGsicurezza() {
    let startPoint = 0 - options.diametro / 2 - 2;
    G0(startPoint);
    G1(pezzoGrezzo.X0);
}

function createGcodeProgram(pezzoGrezzo, options) {
    gcode.push("errore codice non giusto, sto ancora programmando l'app, non utilizzare!!! <br> ")

    initGcode(options);
    setGargoments(options);
    startGsicurezza();


    // now create a var with the gcode program
    let gcodeProgram = gcode.join("<br>");
    return gcodeProgram;
}


outputGcode.innerHTML = createGcodeProgram(pezzoGrezzo, options);