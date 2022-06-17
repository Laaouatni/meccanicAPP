let lunghezzaInput = document.getElementById("lunghezza-pezzo-input");
let larghezzaInput = document.getElementById("larghezza-pezzo-input");
let altezzaInput = document.getElementById("altezza-pezzo-input");
let avanzPerDenteInput = document.getElementById("avanzamento-per-dente-input");
let vtInput = document.getElementById("velocita-di-taglio-input");
let nDentiInput = document.getElementById("numero-denti-fresa-input");
let percLavorazInput = document.getElementById("percentuale-lavorazione-input");

let isAnimatoInput = document.getElementById("isAnimato-input");
let diametroInput = document.getElementById("diametro-utensile-input");

let success_alert = document.querySelector('#success-alert');
let percent_span = document.querySelector('#perc-gcode');

let alertChanges = document.querySelector('#changes-alert');
let parentContainerOutput = document.querySelector("#spianatura-output");
let codeContainerOutput = document.querySelector("#output-gcode");

let numInputAfterClick = 0;

document.querySelector("#copia-buttone").style.display = "none";

[larghezzaInput, lunghezzaInput].forEach((input) => {
    input.addEventListener("input", (e) => {
        let inputValue = e.target.value;
        let inputLength = inputValue.length;

        if (inputLength > 1) {
            input.style.width = inputLength + 1.3 + "rem";
        }

        if (inputLength > 4) {
            showAlert("Errore: numero troppo grande.")
            input.value = inputValue.slice(0, -1);
            input.style.width = inputLength + 0.5 + "rem";
        }
    });
});

diametroInput.addEventListener("input", (e) => {

    let inputValue = e.target.value;
    let inputLength = inputValue.length;
    if (inputLength > 3) {
        showAlert("Errore: numero troppo grande.")
        e.target.value = inputValue.slice(0, -1);
    }
});

// when we write in the input if the number get bigger so make the width of the input bigger
let outputGcode = document.getElementById("output-gcode");

let pezzoGrezzo = {};
let utensile = {};

let options = {};
let gcode = [];

let previusX;
let previusY;
let previusZ;



let calcolaBtn = document.querySelector("#btn-form");

function initGcode(options, pezzoGrezzo) {
    resetGcode();
    resetXYZ();
    setWorkpiece(pezzoGrezzo);
    G90orG91(options); // G90
    ZeroPosition(); //G54

    function setWorkpiece(pezzoGrezzo) {
        gcode.push(`WORKPIECE(,"",, "BOX",64, ${pezzoGrezzo.Z0}, -${(pezzoGrezzo.Z0 - 1) - (pezzoGrezzo.Z0 - 1)}, -80, 0, -${pezzoGrezzo.Y0}, ${pezzoGrezzo.X0}, ${pezzoGrezzo.Y0})`)
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
            utensileFunctions(options);
        } else {
            utensileFunctions(options);
        }

        function utensileFunctions(options) {
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
    gcode.push(`G0 X${XYZ.x % 1 == 0 ? XYZ.x : XYZ.x.toFixed(1)} Y${XYZ.y % 1 == 0 ? XYZ.y : XYZ.y.toFixed(1)} Z${XYZ.z % 1 == 0 ? XYZ.z : XYZ.z.toFixed(1)}`);
    setLastPosVar(XYZ.x, XYZ.y, XYZ.z);
}

function G1(x, y, z) {
    let XYZ = checkSolveXYZ(x, y, z);

    gcode.push(`G1 X${XYZ.x % 1 == 0 ? XYZ.x : XYZ.x.toFixed(1)} Y${XYZ.y % 1 == 0 ? XYZ.y : XYZ.y.toFixed(1)} Z${XYZ.z % 1 == 0 ? XYZ.z : XYZ.z.toFixed(1)}`);

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

/* function countDiamPercentuale(options) {
    diamPercMisura = options.diametro / 100 * options.percLavorazUtensile;
    options.diamPercMisura = diamPercMisura;
    return diamPercMisura;
} */

function startGsicurezza(options) {
    let startPointX = 0 - (options.diametro / 2) - 2;
    let startPointY = (options.diametro / 2) - options.diamPercMisura;

    G0(startPointX, startPointY, options.Z0 - 1);
}

function setLastPosVar(x, y, z) {
    previusX = x;
    options.previusX = previusX;
    previusY = y;
    options.previusY = previusY;
    previusZ = z;
    options.previusZ = previusZ;
}

function spianaturaGenerator(options) {
    let isDestra = false;
    let lineeY_totali = Math.floor(options.Y0 / options.diamPercMisura);

    let lineeZ_totali = options.Z0 - 1;

    for (let lineeZ_completed = lineeZ_totali; lineeZ_completed >= 0; lineeZ_completed--) {
        let startPointX = 0 - (options.diametro / 2) - 2;
        let startPointY = (options.diametro / 2) - options.diamPercMisura;


        previusZ = lineeZ_completed;
        G0(startPointX, startPointY, previusZ);

        for (let lineeY_completed = 1; lineeY_completed <= lineeY_totali; lineeY_completed++) {
            if (lineeY_completed == 1) {
                gcode.push(`F${options.feed}`);
            }

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
        G1("", previusY - options.diamPercMisura, "");
    }

    function lastGspianatura(options, isDestra) {

        let formulaDestra = options.X0 + (options.diametro / 2) + 2;
        let formulaSinistra = 0 - (options.diametro / 2) - 2;
        // VAI A SINISTRA
        if (isDestra) {
            G1(formulaSinistra, "", "");
            Zsicurezza();
            isDestra = false;
        } else {
            // VAI A DESTRA
            G1(formulaDestra, "", "");
            Zsicurezza();
            isDestra = true;
        }

        function Zsicurezza(isDestra) {
            G1("", "", previusZ + 2);
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

    let gcodeProgram = gcode;
    return gcodeProgram;
}

calcolaBtn.addEventListener("click", () => {
    pezzoGrezzo = {
        "X0": parseInt(lunghezzaInput.value),
        "Y0": parseInt(larghezzaInput.value),
        "Z0": parseInt(altezzaInput.value),
    }

    utensile = {
        "vt": parseInt(vtInput.value),
        "Fz": parseFloat(avanzPerDenteInput.value),
        "n_denti": parseInt(nDentiInput.value),
        "feed": options.feed,
        "speed": options.speed,
        "diametro": parseInt(diametroInput.value),
        "percLavorazUtensile": parseInt(percLavorazInput.value)
    }

    options = {
        "absolute": true,
        "feed": parseInt(calcolateFeed(utensile)),
        "speed": parseInt(calcolateSpeed(utensile)),
        "diametro": utensile.diametro,
        "percLavorazUtensile": utensile.percLavorazUtensile,
        "diamPercMisura": (utensile.diametro / 100) * utensile.percLavorazUtensile,
        "X0": pezzoGrezzo.X0,
        "Y0": pezzoGrezzo.Y0,
        "Z0": pezzoGrezzo.Z0,
        "nameGprogram": "undefined, there isn't a name (this functionality isn't working now)",
    };

    removeAlertChanges();

    displayGcode(options, pezzoGrezzo);

    document.querySelector("#copia-buttone").style.display = "grid";
    document.querySelector("#bottom-footer-info").style.display = "flex";
});

function displayGcode(options, pezzoGrezzo) {
    document.querySelector("#output-gcode").innerHTML = "";
    document.querySelector("#spianatura-output").classList.add("withCodeInside");

    let gcodeArray = createGcodeProgram(options, pezzoGrezzo);

    gcodeArray.forEach((Gline, index) => {

        if (isAnimatoInput.checked) {
            setTimeout(() => {
                addLine(Gline, index, gcodeArray)
            }, index * 1000 / 30);
        } else {
            addLineSmooth(Gline, index, gcodeArray);
        }

        function addLineSmooth(Gline, index, gcodeArray) {
            let newGcodeLine = document.createElement("div");
            let GcopyTemplate = document.querySelector("#template-g-line").content.cloneNode(true);

            newGcodeLine.appendChild(GcopyTemplate);
            document.querySelector("#output-gcode").appendChild(newGcodeLine);

            newGcodeLine.querySelector(".gcode-line").textContent = Gline;
            newGcodeLine.querySelector(".gnum-line").textContent = `N${index + 1}`;

            newGcodeLine.classList.add("gcode-line");
            newGcodeLine.scrollIntoView({ behaviour: "smooth" });
            showSuccessAlert(gcodeArray, index);
        }

        function addLine(Gline, index, gcodeArray) {
            let newGcodeLine = document.createElement("div");
            let GcopyTemplate = document.querySelector("#template-g-line").content.cloneNode(true);

            newGcodeLine.appendChild(GcopyTemplate);
            document.querySelector("#output-gcode").appendChild(newGcodeLine);

            newGcodeLine.querySelector(".gcode-line").textContent = Gline;
            newGcodeLine.querySelector(".gnum-line").textContent = `N${index + 1}`;

            hljs.highlightElement(newGcodeLine.querySelector(".gcode-line"));

            newGcodeLine.scrollIntoView({});
            showSuccessAlert(gcodeArray, index);
        }
    });
}

function calcolateSpeed(utensile) {
    let SpeedFormula = Math.round((utensile.vt * 1000) / (utensile.diametro * Math.PI));

    return SpeedFormula;
}

function calcolateFeed(utensile) {
    let FeedFormula = Math.round((utensile.Fz * utensile.n_denti) * calcolateSpeed(utensile));

    return FeedFormula;
}

function showAlert(text) {
    let alert = document.querySelector('#alert');

    alert.classList.add("alert-visible");
    alert.querySelector("#testo-errore").textContent = text;

    setTimeout(() => {
        alert.classList.remove("alert-visible");
    }, 2000);
}

function showSuccessAlert(gcodeArray, index) {
    success_alert.classList.remove("success-visible");
    success_alert.classList.add("success-alltime");

    let onePerc = 100 / gcodeArray.length;

    let currentPerc = onePerc * (index + 1);

    success_alert.style.width = `${currentPerc}%`;
    percent_span.textContent = `${currentPerc.toFixed(1)}%`;
    percent_span.style = `font-size: 1.5rem; font-weight: bold; position: absolute; left: calc(${currentPerc}vw - 3rem); background: var(--alert-green); padding: 0.1rem 0.5rem; border-radius: 0 0 0.5rem 0.5rem; opacity: 1;`;
    // console.log("currentPerc: ", currentPerc, " di", gcodeArray.length, " con index", index);

    if (index + 1 == gcodeArray.length) {
        success_alert.classList.remove("success-alltime");
        percent_span.style = `opacity: 0;`;
    }
}

document.querySelector("#copia-buttone").style.display = "none";

document.querySelector("#copia-buttone").addEventListener("click", () => {
    let textToCopy = gcode.join("\n");

    navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
            if (textToCopy.length > 0) {
                document.querySelector("#copia-buttone").classList.add("copia-success");
                setTimeout(() => {
                    document.querySelector("#copia-buttone").classList.remove("copia-success");
                }, 1000);
            } else {
                showAlert("il testo è vuoto, prova a generare il gcode prima di copiarlo");
            }
        })
        .catch((err) => {
            console.error(err);
            showAlert(err);
        });
});

// create a button that go up to the top of the page
const goToTopBtn = document.querySelector("#go-to-top");

goToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        goToTopBtn.style.display = "grid";
    } else {
        goToTopBtn.style.display = "none";
    }
});

document.querySelectorAll("input")
    .forEach((el) => {
        el.addEventListener("input", () => {
            let hasCode = document.querySelector("#spianatura-output").classList.contains("withCodeInside");

            if (hasCode) {
                numInputAfterClick++;
                if (numInputAfterClick <= 1) {
                    console.log("✅ there is some modifications after last save");
                    addAlertChanges();
                }
            }
        })
    });


function addAlertChanges() {
    alertChanges.style.display = "flex";
    parentContainerOutput.style.padding = "0px";
    codeContainerOutput.style.display = `grid`;
    codeContainerOutput.style.padding = "0.5rem 1rem";
}

function removeAlertChanges() {
    numInputAfterClick = 0;
    console.log("removed")
    alertChanges.style.display = "none";
    parentContainerOutput.style.padding = "";
    codeContainerOutput.style.padding = "";
}