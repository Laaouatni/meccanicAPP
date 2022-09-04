/**
 * Gets the value of the lunghezza-pezzo input element.       
 * @returns {number} The value of the lunghezza-pezzo input element.       
 */
let lunghezzaInput = document.getElementById("lunghezza-pezzo-input");
/**
 * Gets the value of the larghezza input element.       
 * @returns {number} The value of the larghezza input element.       
 */
let larghezzaInput = document.getElementById("larghezza-pezzo-input");
let altezzaInput = document.getElementById("altezza-pezzo-input");
/**
 * Gets the value of the avanzamento per dente input. 
 * @returns {number} The value of the avanzamento per dente input. 
 */
let avanzPerDenteInput = document.getElementById("avanzamento-per-dente-input");
let vtInput = document.getElementById("velocita-di-taglio-input");
let nDentiInput = document.getElementById("numero-denti-fresa-input");
let percLavorazInput = document.getElementById("percentuale-lavorazione-input");

let isAnimatoInput = document.getElementById("isAnimato-input");
let diametroInput = document.getElementById("diametro-utensile-input");

let success_alert = document.querySelector("#success-alert");
/**
 * Finds the percentage of the page that is covered by the given code.
 * @param {string} code - The code to check.
 * @returns {number} The percentage of the page that is covered by the given code.
 */
let percent_span = document.querySelector("#perc-gcode");

let alertChanges = document.querySelector("#changes-alert");
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
      showAlert("Errore: numero troppo grande.");
      input.value = inputValue.slice(0, -1);
      input.style.width = inputLength + 0.5 + "rem";
    }
  });
});

diametroInput.addEventListener("input", (e) => {
  let inputValue = e.target.value;
  let inputLength = inputValue.length;
  if (inputLength > 3) {
    showAlert("Errore: numero troppo grande.");
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

  /**
   * Sets the workpiece to the given pezzoGrezzo.
   * @param {PezzoGrezzo} pezzoGrezzo - the pezzoGrezzo to set the workpiece to.
   * @returns None
   */
  function setWorkpiece(pezzoGrezzo) {
    gcode.push(
      `WORKPIECE(,"",, "BOX",64, ${pezzoGrezzo.Z0}, -${
        pezzoGrezzo.Z0 - 1 - (pezzoGrezzo.Z0 - 1)
      }, -80, 0, -${pezzoGrezzo.Y0}, ${pezzoGrezzo.X0}, ${pezzoGrezzo.Y0})`,
    );
  }

  /**
   * Adds the G90 or G91 command to the gcode array.
   * @param {object} options - the options object.
   * @param {boolean} options.absolute - whether to use absolute or relative positioning.
   * @returns None
   */
  function G90orG91(options) {
    if (options.absolute) {
      gcode.push(`G90`);
    } else {
      gcode.push(`G91`); // change to G91 then
    }
  }

  /**
   * Moves the tool to the zero position.
   * @returns None
   */
  function ZeroPosition() {
    gcode.push(`G54`);
  }

  function resetGcode() {
    gcode = [];
  }

  /**
   * Resets the x, y, and z values to 0.
   * @returns None
   */
  function resetXYZ() {
    previusX = 0;
    previusY = 0;
    previusZ = 0;
  }
}

function setGargoments(options) {
  setUtensile(options); // T1
  setSpeed(options); // S3000

  /**
   * Sets the utensile diameter.
   * @param {object} options - the options object.
   * @returns None
   */
  function setUtensile(options) {
    if (
      options.diametro == null ||
      options.diametro == undefined ||
      options.diametro == "" ||
      options.diametro == 0 ||
      isNaN(options.diametro)
    ) {
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

  /**
   * Sets the speed of the printer.
   * @param {object} options - the options object.
   * @param {number} [options.speed=1000] - the speed to set the printer to.
   * @returns None
   */
  function setSpeed(options) {
    if (
      options.speed != null &&
      options.speed != "" &&
      options.speed != undefined
    ) {
      gcode.push(`S${options.speed} M3`);
    } else {
      gcode.push(`S1000 M3`);
    }
  }
}

/**
 * Takes in a set of x, y, and z values and returns a string of gcode that will move the machine to the given point.
 * @param {number} x - the x value of the point to move to
 * @param {number} y - the y value of the point to move to
 * @param {number} z - the z value of the point to move to
 * @returns None
 */
function G0(x, y, z) {
  let XYZ = checkSolveXYZ(x, y, z);
  gcode.push(
    `G0 X${XYZ.x % 1 == 0 ? XYZ.x : XYZ.x.toFixed(1)} Y${
      XYZ.y % 1 == 0 ? XYZ.y : XYZ.y.toFixed(1)
    } Z${XYZ.z % 1 == 0 ? XYZ.z : XYZ.z.toFixed(1)}`,
  );
  setLastPosVar(XYZ.x, XYZ.y, XYZ.z);
}

/**
 * Takes in a set of x, y, and z values and returns a string of gcode that will move the machine to the given point.
 * @param {number} x - the x value of the point to move to
 * @param {number} y - the y value of the point to move to
 * @param {number} z - the z value of the point to move to
 * @returns None
 */
function G1(x, y, z) {
  let XYZ = checkSolveXYZ(x, y, z);

  gcode.push(
    `G1 X${XYZ.x % 1 == 0 ? XYZ.x : XYZ.x.toFixed(1)} Y${
      XYZ.y % 1 == 0 ? XYZ.y : XYZ.y.toFixed(1)
    } Z${XYZ.z % 1 == 0 ? XYZ.z : XYZ.z.toFixed(1)}`,
  );

  setLastPosVar(XYZ.x, XYZ.y, XYZ.z);
}

/**
 * Checks if the given x, y, and z values are valid.
 * @param {number} x - the x value to check
 * @param {number} y - the y value to check
 * @param {number} z - the z value to check
 * @returns {number} - the x, y, and z values that are valid.
 */
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

/**
 * Starts the G-code for the gsicurezza.           
 * @param {number} diametro - the diameter of the gsicurezza.           
 * @param {number} diamPercMisura - the diameter of the gsicurezza in percentage of the           
 * diameter of the gsicurezza.           
 * @param {number} Z0 - the height of the gsicurezza.           
 * @returns None           
 */
function startGsicurezza(options) {
  let startPointX = 0 - options.diametro / 2 - 2;
  let startPointY = options.diametro / 2 - options.diamPercMisura;

  G0(startPointX, startPointY, options.Z0 - 1);
}

/**
 * Sets the last position variables to the given values.           
 * @param {number} x - the x position to set the last position variables to.           
 * @param {number} y - the y position to set the last position variables to.           
 * @param {number} z - the z position to set the last position variables to.           
 * @returns None           
 */
function setLastPosVar(x, y, z) {
  previusX = x;
  options.previusX = previusX;
  previusY = y;
  options.previusY = previusY;
  previusZ = z;
  options.previusZ = previusZ;
}

function spianaturaGenerator(options) {
  /**
   * Checks if the given string is a valid CSS selector.           
   * @param {string} selector - the string to check           
   * @returns {boolean} - true if the string is a valid CSS selector, false otherwise.           
   */
  let isDestra = false;
  /**
   * Calculates the number of lines that the Y axis of the graph will have.           
   * @param {number} Y0 - the Y0 value of the graph.           
   * @param {number} diamPercMisura - the diameter of the graph in percentage of the window.           
   * @returns {number} the number of lines that the Y axis of the graph will have.           
   */
  let lineeY_totali = Math.floor(options.Y0 / options.diamPercMisura);

  let lineeZ_totali = options.Z0 - 1;

  for (
    let lineeZ_completed = lineeZ_totali;
    lineeZ_completed >= 0;
    lineeZ_completed--
  ) {
    let startPointX = 0 - options.diametro / 2 - 2;
    let startPointY = options.diametro / 2 - options.diamPercMisura;

    previusZ = lineeZ_completed;
    G0(startPointX, startPointY, previusZ);

    for (
      let lineeY_completed = 1;
      lineeY_completed <= lineeY_totali;
      lineeY_completed++
    ) {
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

  /**
   * @param {number} X0 - the X coordinate of the center of the circle.       
   * @param {number} diametro - the diameter of the circle.       
   * @param {number} previusZ - the Z coordinate of the previous point.       
   * @param {number} [spaces=0] - the number of spaces to indent the code.       
   * @returns None       
   */
  function lastGspianatura(options, isDestra) {
    let formulaDestra = options.X0 + options.diametro / 2 + 2;
    let formulaSinistra = 0 - options.diametro / 2 - 2;
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
    X0: parseInt(lunghezzaInput.value),
    Y0: parseInt(larghezzaInput.value),
    Z0: parseInt(altezzaInput.value),
  };

  utensile = {
    vt: parseInt(vtInput.value),
    Fz: parseFloat(avanzPerDenteInput.value),
    n_denti: parseInt(nDentiInput.value),
    feed: options.feed,
    speed: options.speed,
    diametro: parseInt(diametroInput.value),
    percLavorazUtensile: parseInt(percLavorazInput.value),
  };

  options = {
    absolute: true,
    feed: parseInt(calcolateFeed(utensile)),
    speed: parseInt(calcolateSpeed(utensile)),
    diametro: utensile.diametro,
    percLavorazUtensile: utensile.percLavorazUtensile,
    diamPercMisura: (utensile.diametro / 100) * utensile.percLavorazUtensile,
    X0: pezzoGrezzo.X0,
    Y0: pezzoGrezzo.Y0,
    Z0: pezzoGrezzo.Z0,
    nameGprogram:
      "undefined, there isn't a name (this functionality isn't working now)",
  };

  removeAlertChanges();

  displayGcode(options, pezzoGrezzo);

  document.querySelector("#copia-buttone").style.display = "grid";
  document.querySelector("#bottom-footer-info").style.display = "flex";
});

/**
 * Displays the gcode program in the output area.       
 * @param {Array<string>} gcodeArray - the gcode program array.       
 * @param {number} index - the index of the current line.       
 * @returns None       
 */
function displayGcode(options, pezzoGrezzo) {
  document.querySelector("#output-gcode").innerHTML = "";
  document.querySelector("#spianatura-output").classList.add("withCodeInside");

  let gcodeArray = createGcodeProgram(options, pezzoGrezzo);

  gcodeArray.forEach((Gline, index) => {
    if (isAnimatoInput.checked) {
      setTimeout(() => {
        addLine(Gline, index, gcodeArray);
      }, (index * 1000) / 30);
    } else {
      addLineSmooth(Gline, index, gcodeArray);
    }

    function addLineSmooth(Gline, index, gcodeArray) {
      let newGcodeLine = document.createElement("div");
      let GcopyTemplate = document
        .querySelector("#template-g-line")
        .content.cloneNode(true);

      newGcodeLine.appendChild(GcopyTemplate);
      document.querySelector("#output-gcode").appendChild(newGcodeLine);

      newGcodeLine.querySelector(".gcode-line").textContent = Gline;
      newGcodeLine.querySelector(".gnum-line").textContent = `N${index + 1}`;

      newGcodeLine.classList.add("gcode-line");
      newGcodeLine.scrollIntoView({ behaviour: "smooth" });
      showSuccessAlert(gcodeArray, index);
    }

    /**
     * Adds a new line to the output G-code area.           
     * @param {string} Gline - the G-code line to add.           
     * @param {number} index - the index of the G-code line.           
     * @param {string[]} gcodeArray - the array of G-code lines.           
     * @returns None           
     */
    function addLine(Gline, index, gcodeArray) {
      let newGcodeLine = document.createElement("div");
      let GcopyTemplate = document
        .querySelector("#template-g-line")
        .content.cloneNode(true);

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

/**
 * Calculates the speed of the given utensile.           
 * @param {Utensile} utensile - the utensile to calculate the speed of.           
 * @returns {number} the speed of the utensile.           
 */
function calcolateSpeed(utensile) {
  let SpeedFormula = Math.round(
    (utensile.vt * 1000) / (utensile.diametro * Math.PI),
  );

  return SpeedFormula;
}

/**
 * Calculates the feed rate for the given utensile.           
 * @param {Utensile} utensile - the utensile to calculate the feed rate for.           
 * @returns {number} the feed rate for the given utensile.           
 */
function calcolateFeed(utensile) {
  let FeedFormula = Math.round(
    utensile.Fz * utensile.n_denti * calcolateSpeed(utensile),
  );

  return FeedFormula;
}

/**
 * Shows an alert with the given text.       
 * @param {string} text - the text to show in the alert.       
 * @returns None       
 */
function showAlert(text) {
  let alert = document.querySelector("#alert");

  alert.classList.add("alert-visible");
  alert.querySelector("#testo-errore").textContent = text;

  setTimeout(() => {
    alert.classList.remove("alert-visible");
  }, 2000);
}

/**
 * Shows the success alert and updates the progress bar.           
 * @param {string[]} gcodeArray - the array of gcode commands           
 * @param {number} index - the index of the current gcode command           
 * @returns None           
 */
function showSuccessAlert(gcodeArray, index) {
  success_alert.classList.remove("success-visible");
  success_alert.classList.add("success-alltime");

  let onePerc = 100 / gcodeArray.length;

  let currentPerc = onePerc * (index + 1);

  success_alert.style.width = `${currentPerc}%`;
  percent_span.textContent = `${currentPerc.toFixed(1)}%`;
  percent_span.style = `font-size: 1.5rem; font-weight: bold; position: absolute; left: calc(${currentPerc}vw - 3rem); background: var(--alert-green); padding: 0.1rem 0.5rem; border-radius: 0 0 0.5rem 0.5rem; opacity: 1;`;

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
          document
            .querySelector("#copia-buttone")
            .classList.remove("copia-success");
        }, 1000);
      } else {
        showAlert(
          "il testo è vuoto, prova a generare il gcode prima di copiarlo",
        );
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

document.querySelectorAll("input").forEach((el) => {
  el.addEventListener("input", () => {
    let hasCode = document
      .querySelector("#spianatura-output")
      .classList.contains("withCodeInside");

    if (hasCode) {
      numInputAfterClick++;
      if (numInputAfterClick <= 1) {
        addAlertChanges();
      }
    }
  });
});

/**
 * Adds the alert changes button to the page.       
 * @returns None       
 */
function addAlertChanges() {
  alertChanges.style.display = "flex";
  parentContainerOutput.style.padding = "0px";
  codeContainerOutput.style.display = `grid`;
  codeContainerOutput.style.padding = "0.5rem 1rem";
}

/**
 * Removes the alert changes from the page.           
 * @returns None           
 */
function removeAlertChanges() {
  numInputAfterClick = 0;

  alertChanges.style.display = "none";
  parentContainerOutput.style.padding = "";
  codeContainerOutput.style.padding = "";
}
