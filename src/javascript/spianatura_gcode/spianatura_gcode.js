let lunghezzaInput = document.getElementById("lunghezza-pezzo-input");
let larghezzaInput = document.getElementById("larghezza-pezzo-input");

let diametroInput = document.getElementById("diametro-utensile-input");

let success_alert = document.querySelector('#success-alert');

[larghezzaInput, lunghezzaInput].forEach((input) => {
    input.addEventListener("input", (e) => {
        let inputValue = e.target.value;
        let inputLength = inputValue.length;
        if (inputLength > 3 && inputLength < 6) {
            input.style.width = inputLength + 0.5 + "rem";
        }
        if (inputLength > 5) {
            showAlert("Errore: numero troppo grande.")
            input.value = inputValue.slice(0, -1);
        }
    });
});

diametroInput.addEventListener("input", (e) => {
    console.log("test input jidbbcc")
    let inputValue = e.target.value;
    let inputLength = inputValue.length;
    if (inputLength > 3) {
        showAlert("Errore: numero troppo grande.")
        e.target.value = inputValue.slice(0, -1);
    }
});

// when we write in the input if the number get bigger so make the width of the input bigger
let outputGcode = document.getElementById("output-gcode");

let pezzoGrezzo = {
    "X0": parseInt(lunghezzaInput.value),
    "Y0": parseInt(larghezzaInput.value),
    "Z0": 10
}


let utensile = {}
let options = {};
let gcode = [];

let previusX;
let previusY;
let previusZ;

let diamPercMisura;

let calcolaBtn = document.querySelector("#btn-form");

function initGcode(options, pezzoGrezzo) {
    resetGcode();
    resetXYZ();
    setWorkpiece(pezzoGrezzo);
    G90orG91(options); // G90
    ZeroPosition(); //G54

    function setWorkpiece(pezzoGrezzo) {
        gcode.push(`WORKPIECE(,"",, "BOX",64, 1, -${pezzoGrezzo.Z0}, -80, 0, -${pezzoGrezzo.Y0}, ${pezzoGrezzo.X0}, ${pezzoGrezzo.Y0})`)
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
        if (options.diametro == null || options.diametro == undefined || options.diametro == "" || options.diametro == 0 || isNaN(options.diametro)) {
            options.diametro = 20;
            console.log("diametro non settato" + options.diametro);
            utensileFunctions(options);
        } else {
            console.log("else utensile")
            utensileFunctions(options);
        }

        function utensileFunctions(options) {
            countDiamPercentuale(options);
            gcode.push(`T="CUTTER ${options.diametro}"`);
            gcode.push(`M6`);
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
    let lineeY_totali = Math.floor(options.Y0 / options.diamPercMisura);

    for (let lineeY_completed = 1; lineeY_completed <= lineeY_totali; lineeY_completed++) {
        if (isDestra) {

            GtoSinistra();
            GtoDown();
        } else {

            GtoDestra(options);
            GtoDown();
        }

        if (lineeY_completed == lineeY_totali) {
            lastGspianatura(options, isDestra);
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

    function lastGspianatura(options, isDestra) {
        // VAI A SINISTRA
        if (isDestra) {
            G1(0 - (options.diametro / 2) - 2, "", "");
            isDestra = false;
            Zsicurezza();

        } else {
            // VAI A DESTRA
            G1(options.X0 + (options.diametro / 2) + 2, "", "");
            isDestra = true;
            Zsicurezza();
        }

        function Zsicurezza() {
            G1("", "", 0 + 2);
            G0("", "", 0 + 20);
        }
    }
}

function stopGprogram() {
    gcode.push(`M30`);
}

function createGcodeProgram(options, pezzoGrezzo) {
    initGcode(options, pezzoGrezzo);
    setGargoments(options);
    startGsicurezza(options);
    spianaturaGenerator(options);
    stopGprogram();

    // now create a var with the gcode program
    let gcodeProgram = gcode;
    return gcodeProgram;
}

calcolaBtn.addEventListener("click", () => {
    pezzoGrezzo = {
        "X0": parseInt(lunghezzaInput.value),
        "Y0": parseInt(larghezzaInput.value),
        "Z0": 10
    }


    utensile = {
        "feed": 1000,
        "speed": 3000,
        "diametro": parseInt(diametroInput.value),
        "diametroPercentLavorazione": 60
    }

    options = {
        "absolute": true,
        "feed": utensile.feed,
        "speed": utensile.speed,
        "diametro": utensile.diametro,
        "diamPercentLavorazione": utensile.diametroPercentLavorazione,
        "diamPercMisura": "",
        "X0": pezzoGrezzo.X0,
        "Y0": pezzoGrezzo.Y0,
        "nameGprogram": "",
    };
    displayGcode(options, pezzoGrezzo);
});

function displayGcode(options, pezzoGrezzo) {
    document.querySelector("#output-gcode").innerHTML = "";
    let gcodeArray = createGcodeProgram(options, pezzoGrezzo);

    showSuccessAlert();

    gcodeArray.forEach((Gline, index) => {;
        setTimeout(() => {
            let newGcodeLine = document.createElement("div");
            let GcopyTemplate = document.querySelector("#template-g-line").content.cloneNode(true);

            newGcodeLine.appendChild(GcopyTemplate);
            document.querySelector("#output-gcode").appendChild(newGcodeLine);

            newGcodeLine.querySelector(".gcode-line").textContent = Gline;
            newGcodeLine.querySelector(".gnum-line").textContent = `N${index + 1}`;

            newGcodeLine.classList.add("gcode-line");
            newGcodeLine.scrollIntoView({});

            if (index + 1 == gcodeArray.length) {
                success_alert.classList.remove("success-alltime");
            }
        }, index * 50);
    });
}

function showAlert(text) {
    let alert = document.querySelector('#alert');

    alert.classList.add("alert-visible");
    alert.querySelector("#testo-errore").textContent = text;

    setTimeout(() => {
        alert.classList.remove("alert-visible");
    }, 2000);
}

function showSuccessAlert() {
    success_alert.classList.remove("success-visible");
    success_alert.classList.add("success-alltime");
    console.log("success")
}