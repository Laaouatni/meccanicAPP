let lunghezzaInput = document.getElementById("lunghezza-pezzo-input");
let larghezzaInput = document.getElementById("larghezza-pezzo-input");

let outputGcode = document.getElementById("output-gcode");

let pezzoGrezzo = {
    "X0": lunghezzaInput.value,
    "Y0": larghezzaInput.value
}

let utensile = {
    "num": "1",
    "feed": 1000,
    "speed": 3000,
    "diametro": 20,
    "diametroPercentLavorazione": 60
}

let options = {
    "absolute": true,
    "tool": utensile.num,
    "feed": utensile.feed,
    "speed": utensile.speed,
    "diametro": utensile.diametro,
    "diamPercentLavorazione": utensile.diametroPercentLavorazione,
    "diamPercMisura": "",
    "X0": pezzoGrezzo.X0,
    "Y0": pezzoGrezzo.Y0,
    "nameGprogram": "",
};

let gcode = [];

let previusX;
let previusY;
let previusZ;

let diamPercMisura;

let calcolaBtn = document.querySelector("#btn-form");

function initGcode(options) {
    resetGcode();
    resetXYZ();
    addGnameProgram(options); // %O012345
    G90orG91(options); // G90
    ZeroPosition(); //G54

    function addGnameProgram(options) {
        if (options.nameGprogram != null && options.nameGprogram != "" && options.nameGprogram != undefined) {
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
        countDiamPercentuale(options);
        console.log(options)
        if (options.tool != null && options.tool != "" && options.tool != undefined) {
            gcode.push(`M06 T${options.tool}`);
            gcode.push(`G43 H${options.tool}`);
        } else {
            let randomUtensile = Math.floor(Math.random() * 10);
            gcode.push(`M06 ${randomUtensile}`);
            gcode.push(`G43 H${randomUtensile}`);
        }
    }

    function setSpeed(options) {
        if (options.speed != null && options.speed != "" && options.speed != undefined) {
            gcode.push(`S${options.speed} M3`);
        } else {
            gcode.push(`S1000 M3`);
        }
    }
}

function G0(x, y, z) {
    let XYZ = checkSolveXYZ(x, y, z);
    gcode.push(`G0 X${XYZ.x} Y${XYZ.y} Z${XYZ.z}`);
    setLastPosVar(XYZ.x, XYZ.y, XYZ.z);
}

function G1(x, y, z) {
    let XYZ = checkSolveXYZ(x, y, z);
    gcode.push(`G1 X${XYZ.x} Y${XYZ.y} Z${XYZ.z}`);
    setLastPosVar(XYZ.x, XYZ.y, XYZ.z);
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
        } else {
            y = 0;
        }
    }
    if (z == null || z == undefined || z == "") {
        if (previusZ != null || previusZ != undefined || previusZ != "") {
            z = previusZ;
        } else {
            z = 0;
        }
    }

    return { x, y, z };
}


function countDiamPercentuale(options) {
    diamPercMisura = options.diametro / 100 * options.diamPercentLavorazione;
    // add this to json string
    options.diamPercMisura = diamPercMisura;
    return diamPercMisura;
}

function startGsicurezza(options) {
    let startPointX = 0 - (options.diametro / 2) - 2;
    let startPointY = (options.diametro / 2) - options.diamPercMisura;

    G0(startPointX, startPointY, 0);
}

function setLastPosVar(x, y, z) {
    previusX = x;
    previusY = y;
    previusZ = z;
}

function spianaturaGenerator(options) {
    let isDestra = false;
    let lineeY_totali = options.Y0 / options.diamPercMisura;

    for (let lineeY_completed = 1; lineeY_completed <= lineeY_totali; lineeY_completed++) {
        if (isDestra) {
            console.log("Destra" + " " + lineeY_completed);
            GtoSinistra();
        } else {
            console.log("Sinistra" + " " + lineeY_completed)
            GtoDestra(options);
        }
    }

    function GtoDestra(options) {
        G1(options.X0 + 2, "", "");
        isDestra = true;
    }

    function GtoSinistra() {
        G1(0 - 2, "", "");
        isDestra = false;
    }

    function GtoDown() {
        G1("", previusY - diamPercMisura, "");
    }

}

function createGcodeProgram(options) {
    initGcode(options);
    setGargoments(options);
    startGsicurezza(options);
    spianaturaGenerator(options);

    // now create a var with the gcode program
    let gcodeProgram = gcode.join("<br>");
    return gcodeProgram;
}

/* calcolaBtn.addEventListener("click", () => {
    displayGcode(options);
}); */

displayGcode(options);

function displayGcode(options) {
    outputGcode.innerHTML = createGcodeProgram(options);
}