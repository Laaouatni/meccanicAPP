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
    "Y0": pezzoGrezzo.Y0
};

function createGcodeProgram(pezzoGrezzo, options) {
    let gcode = [];

    gcode.push("errore codice non giusto, sto ancora programmando l'app, non utilizzare!!! ")
    if (options.absolute) {
        gcode.push(`G90`);
    } else {
        gcode.push(`G90 test errore`); // change to G91 then
    }

    gcode.push(`G54`); // posizione zero pezzo
    gcode.push(`M06 T${options.tool}`); // M06 T1
    gcode.push(`G43 H${options.tool}`); // G43 H1000 Z3000

    gcode.push(`G0 X0 Y0 Z100`); // prima di iniziare
    gcode.push(`G0 Z${options.feed}`);
    gcode.push(`G0 X${pezzoGrezzo.X0} Y${pezzoGrezzo.Y0}`);
    gcode.push(`G0 Z0`);
    gcode.push(`G0 X0 Y0`);
    gcode.push(`G0 Z${options.feed}`);
    gcode.push(`G0 X${pezzoGrezzo.X0} Y${pezzoGrezzo.Y0}`);
    gcode.push(`G0 Z0`);
    gcode.push(`G0 X0 Y0`);
    gcode.push(`G0 Z${options.feed}`);
    gcode.push(`G0 X${pezzoGrezzo.X0} Y${pezzoGrezzo.Y0}`);
    gcode.push(`G0 Z0`);
    gcode.push(`G0 X0 Y0`);

    // now create a var with the gcode program
    let gcodeProgram = gcode.join("<br>");
    return gcodeProgram;
}

outputGcode.innerHTML = createGcodeProgram(pezzoGrezzo, options);