# meccanicAPP

L'App che ti aiuta se sei un Disegnatore Tecnico, oppure operatore CNC!

Questa App è attualmente in versione "Web-Edition", così più persone avranno la possibilità di utilizzarla!

<https://meccanicapp.vercel.app>

-----

## table of contents
- [meccanicAPP](#meccanicapp)
  - [table of contents](#table-of-contents)
  - [Funzionalità MeccanicAPP](#funzionalità-meccanicapp)
    - [1. Generare GCODE automaticamente](#1-generare-gcode-automaticamente)
          - [esempio generato](#esempio-generato)
    - [2. Trovare le misure delle tolleranze "h"](#2-trovare-le-misure-delle-tolleranze-h)
  - [esempi:](#esempi)
    - [3. Tolleranze Albero-Foro -> quale Tipologia? (Calcolatrice)](#3-tolleranze-albero-foro---quale-tipologia-calcolatrice)
  - [esempi:](#esempi-1)
    - [4. Generatore di  avanzamento](#4-generatore-di--avanzamento)
    - [5. velocità rotazione](#5-velocità-rotazione)
    - [come funziona?](#come-funziona)

-----

## Funzionalità MeccanicAPP

### 1. Generare GCODE automaticamente

- [x] spianatura FRESA.

###### esempio generato

```GCODE
G90
G54
T10
M6
S1592 M3
G0 X-12 Y-2 Z0
F637
G1 X22 Y-2 Z0
G1 X22 Y-14 Z0
G1 X-12 Y-14 Z0
G1 X-12 Y-14 Z2
G0 X-12 Y-14 Z20
M30
```

-----

### 2. Trovare le misure delle tolleranze "h"

- [x] da **"h1"** a **"h12"**
- [x] da **"ø3"** a **"ø50"**

esempi:
---

- ⬇️ h7 D10, qual è il valore? ⬇️

```json
{ 
  max: 0, 
  min: -0.018 
}
```

<br>

- ⬇️ h3 D20, qual è il valore? ⬇️

```json
{ 
  max: 0, 
  min: -0.004
}
```

<br>

- ⬇️ h12 D50, qual è il valore? ⬇️

```json
{ 
  max: 0, 
  min: -0.250 
}
```

> il risultato è calcolato in diretta: <br>
  cioè appena viene modificato un `value=""` dei `<input>`, il risultato velocemente in meno di 1 secondo.

-----

### 3. Tolleranze Albero-Foro -> quale Tipologia? (Calcolatrice)
- [x] acc. con Gioco
- [x] acc. con Interferenza
- [x] acc. con Incerto

esempi:
---
- esempio **INTERFERENZA**:
<section style="display: flex; gap: 1rem;">

  | FORO 	    | MAX_FORO	  | MIN_FORO 	  | 
  |----------	|------------	|------------	|
  |        	  | 0.021      	| 0.000      	|

  | ALBERO 	| max_albero 	| min_albero 	|
  |--------	|------------	|------------	|
  |       	| 0.015      	| 0.010      	|

</section>

- esempio **INCERTO**: 
<section style="display: flex; gap: 1rem;">

  | FORO 	    | MAX_FORO	  | MIN_FORO 	  | 
  |----------	|------------	|------------	|
  |        	  | 0.021      	| 0.000      	|

  | ALBERO 	| max_albero 	| min_albero 	|
  |--------	|------------	|------------	|
  |       	| 0.028      	| 0.015      	|

</section>

- esempio **GIOCO**:
<section style="display: flex; gap: 1rem;">

  | **FORO** 	| MAX_FORO 	| MIN_FORO 	|
  |----------	|----------	|----------	|
  |       	  | 0.020    	| 0.010    	|

  | ALBERO 	| max_albero 	| min_albero 	|
  |--------	|------------	|------------	|
  |       	| 0.05       	| 0.000      	|

</section>

> ecc..., <br><br> 
  in modo semplice: <br> 1. inserisci i dati <br> 2. clicca buttone "calcola"

-----

### 4. Generatore di  avanzamento

- [x]  aggiunto generatore di **Avanzamento** `G94` per la fresatura:

  - unità di misura del risultato:
    - **mm/min** (millimetri/minuto)
  - codice da utilizzare in GCODE CNC (programmazione):
    - **G94**
  - interfaccia semplice:
    - con 3 input `type="range"`
    - 1 `<output>`
  - il risultato è calcolato in diretta:
    - cioè appena viene modificato un `value=""` dei `<input>`, il risultato velocemente in meno di 1 secondo.
  - parametri richiesti dai input:
    - FZ: Avanzamento per dente dell'utensile
    - ZN: numero dei denti dell'utensile
    - S: Velocità in giri/minuto
  - > **FORMULA:** <br> Fz * Zn * S = avanz_G94 mm/min <br><br> **esempio:** <br> 0.8mm * 4n * 1200giri/min = 3840 mm/min

<br>

- [x]  aggiunto generatore di **Avanzamento** `G95` per il tornitura:

  - unità di misura del risultato:
    - MAX_avanz: **mm/giro** (millimetri/giro)
    - MIN_avanz: **mm/giro** (millimetri/giro)
  - codice da utilizzare in GCODE CNC (programmazione):
    - **G95**
  - interfaccia semplice:
    - con 1 input `type="range"`
    - 2 `<output>`
  - il risultato è calcolato in diretta:
    - cioè appena viene modificato un `value=""` dei `<input>`, il risultato velocemente in meno di 1 secondo.
    - l'app suggerisce 2 valori, il valore minimo possibile, e il valore massimo possibile...
  - parametri richiesti dai input:
    - R: raggio utensile (mm)
  - > **FORMULA:** <br> MIN_avanz = R * (1/4) <br><br> **esempio:** <br> 0.8mm * 0.25 = 0.2mm/giro <hr> **FORMULA:** <br> MAX_avanz = R * (1/2) <br><br> **esempio:** <br> 0.8mm * 0.5 = 0.4mm/giro

-----

### 5. velocità rotazione

- [x]  aggiunto generatore di **Velocità di Taglio** (VT) `G96` per il tornitura:

  - unità di misura del risultato:
    - **m/min** (metri/minuto)
  - codice da utilizzare in GCODE CNC (programmazione):
    - **G96**
  - interfaccia semplice:
    - con 2 input `type="range"`
    - 1 `<output>`
    - 2 `<input disabled>` (piGreco, 1000)
  - il risultato è calcolato in diretta:
    - cioè appena viene modificato un `value=""` dei `<input>`, il risultato velocemente in meno di 1 secondo.
  - parametri dei input:
    - variabili, modificabili dall'utente:
      - D: diametro pezzo grezzo
      - S: Velocità in giri/minuto
    - fisse, non modificabili:
      - π: piGreco, cioè 3.141592653589793 (`Math.PI`)
      - 1000: valore che divide la moltiplicazione dei parametri precedenti
  - > **FORMULA:** <br> (S * D * π) / 1000 = Vt_G96 m/min <br><br> **esempio:** <br> 1200 * 50 * 3.14 = 188.5 m/min (metri/minuto)

<br>

- [x]  aggiunto generatore di **Velocità** `G97` per la fresatura:

  - unità di misura del risultato:
    - **giri/min** (giri/minuto)
  - codice da utilizzare in GCODE CNC (programmazione):
    - **G97**
  - interfaccia semplice:
    - con 2 input `type="range"`
    - 1 `<output>`
    - 2 `<input disabled>` (piGreco, 1000)
  - il risultato è calcolato in diretta:
    - cioè appena viene modificato un `value=""` dei `<input>`, il risultato velocemente in meno di 1 secondo.
  - parametri dei input:
    - variabili, modificabili dall'utente:
      - VT: velocità di taglio (m/min)
      - Ø: diametro Fresa in mm
    - fisse, non modificabili:
      - 1000: valore moltiplicato per VT
      - π: piGreco, cioè 3.141592653589793 (`Math.PI`)
  - > **FORMULA:** <br> (VT * 1000) / (Ømm *  π) = G97 giri/min <br><br> **esempio:** <br> (180m/min * 1000) / (200 * 3.14) = 286.48giri/min (giri/minuto)


-----

### come funziona?

- [x] il generatore di spiantura è formato da un'insieme di funzioni al suo interno!

  ```javascript
  function createGcodeProgram(options) {
    initGcode();
    setGargoments();
    startGsicurezza();
    spianaturaGenerator();
    stopGprogram();

    return gcodeProgram;
  }
  ```

- [x] il generatore GCODE è **100% personalizzabile**, grazie all'utilizzo di un `JSON` file!

  ```json
  utensile = {
    "vt": calcolaVelocitaDiTaglio(),  // 230
    "fz": calcolateAvanzPerDente(),   // 0.8
    "nDenti": calcolateNumDenti(),    // 4
    "feed": calcolaFeed(),            // 1200
    "speed": calcolaSpeed(),          // 1500
    "diametro": calcolaDiametro()     // 50
  }

  pezzoGrezzo = {
    "X0": calcolaX0(),  // 50
    "Y0": calcolaY0(),  // 100
    "Z0": calcolaZ0()   // 1
  }

  options = {
    "absolute": isAbsolute,       // true or false
    "F": utensile.feed,           // 1200
    "S": utensile.speed,          // 1500
    "D": utensile.diametro,       // 50
    "vt": utensile.vt,            // 230
    "Fz": utensile.fz,            // 0.8
    "nDenti": utensile.nDenti,    // 4
    "X0": pezzoGrezzo.X0,         // 50
    "Y0": pezzoGrezzo.Y0,         // 100
    "Z0": pezzoGrezzo.Z0,         // 1
    "diamPercentLavorazione": 60, // 60%
    "diamPercMisura": calcolaPercOfUtensile(), // 12
  };
  ```

- [x] calcolatore di avanzamento:

  ```javascript
  function calcolaFeed(utensile) {
    let FeedFormula = Math.round((utensile.Fz() * n_denti) * utensile.speed);

    return FeedFormula;
  }
  ```

- [x] calcolatore di velocità:

  ```javascript
  function calcolaSpeed(utensile) {
      let SpeedFormula = Math.round((vc * 1000) / (utensile.diametro * Math.PI));

      return SpeedFormula;
  }
  ```

- [x] percentuale Loading:
  ```javascript
  let onePerc = 100 / gcodeArray.length;
  let currentPerc = onePerc * (index + 1);

  el.style.width = `${currentPerc}%`;
  el.textContent = `${currentPerc.toFixed(1)}%`;
  ```

- [x] buttone "copia codice GCODE"
  ```javascript
  navigator.clipboard.writeText()
  ```

- [x] buttone "ritorna in alto"
  
  ```javascript   
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  ```

- [x] il programma ricorda l'ultima posizione XYZ: 
```javascript
// salvare i punti precedenti
function setLastPosVar(x, y, z) {
  previusX = x;
  previusY = y;
  previusZ = z;

  options.previusX = previusX;
  options.previusY = previusY;
  options.previusZ = previusZ;
}

function checkSolveXYZ(x, y, z) {
  // se un valore è nullo, verrà scritto 0, 
  // altrimenti si scriverà il valore precedente
  x == "" || previusX == "" ? x = 0 : x = previusX;
  y == "" || previusY == "" ? y = 0 : y = previusY;
  z == "" || previusZ == "" ? z = 0 : z = previusZ;

  return { x, y, z };
}
```

- [x] `G0` GCODE funzione: 
```javascript
function G0(x, y, z) {
  // risolvere prima i possibili errori nei parametri
  let XYZ = checkSolveXYZ(x, y, z);

  // inserire la linea di codice
  gcode.push(`G0 X${XYZ.x % 1 == 0 ? XYZ.x : XYZ.x.toFixed(1)} Y${XYZ.y % 1 == 0 ? XYZy : XYZ.y.toFixed(1)} Z${XYZ.z % 1 == 0 ? XYZ.z : XYZ.z.toFixed(1)}`);

  // salvare l'ultima posizione
  setLastPosVar(XYZ.x, XYZ.y, XYZ.z);
}
```

- [x] `G1` GCODE funzione:
```javascript
function G0(x, y, z) {
  // risolvere prima i possibili errori nei parametri
  let XYZ = checkSolveXYZ(x, y, z);

  // inserire la linea di codice
  gcode.push(`G1 X${XYZ.x % 1 == 0 ? XYZ.x : XYZ.x.toFixed(1)} Y${XYZ.y % 1 == 0 ? XYZy : XYZ.y.toFixed(1)} Z${XYZ.z % 1 == 0 ? XYZ.z : XYZ.z.toFixed(1)}`);

  // salvare l'ultima posizione
  setLastPosVar(XYZ.x, XYZ.y, XYZ.z);
}
```

- [x] generazione SPIANATURA: 

```javascript
function spianaturaGenerator(options) {
  let isDestra = false; // iniziare da sinistra
  
  // calcolare il numero di spianatura necessarie
  let lineeY_totali = Math.floor(options.Y0 / options.diamPercMisura);

  // Altezza da spianare 
  let lineeZ_totali = options.Z0;


  for (...) { // cliclo ripetizione Z spianatura
    // G54 punto di origine X (coordinata)
    let startPointX = 0 - (options.D / 2) - 2; 
    // G54 punto di origine Y (coordinata)
    let startPointY = (options.D / 2) - options.diamPercMisura;

    previusZ = lineeZ_completed; // numero Z spianture mancanti da eseguire

    G0(startPointX, startPointY, previusZ); // distanza di sicurezza

      for (...) { // cliclo ripetizione Y spianatura
        if (lineeY_completed == 1) { 
          // inserimento di F nel programma
          gcode.push(`F${options.feed}`);
        }

        // se utensile è a destra si mouverà a sinistra
        // se utensile è a sinistra si mouverà a destra
        isDestra ? GtoSinistra() : GtoDestra();

        if (lineeY_completed == lineeY_totali) {
          lastGspianatura(options, isDestra);
        }
      }
    }

  // funzione per andare a destra
  function GtoDestra(options) {
    G1(options.X0 + 2, "", ""); // X è uguale a "lunghezza_totale +2mm"
    isDestra = true;  // siamo a destra attualmente, dopo lalavorazione G1
    GtoDown();        // andare sotto
  }

  // funzione per andare a sinistra
  function GtoSinistra() {
    G1(0 - 2, "", ""); // 2mm fouri a sinistra (0 = punto origine)
    isDestra = false; // siamo a sinistra attualmente, dopo lalavorazione G1
    GtoDown(); // andare sotto
  }

  // funzione per andare giù del 60%
  function GtoDown() {
    G1("", previusY - diamPercMisura, ""); // andiamo sotto del 60%
  }

 // ultima passata, con sicurezza
  function lastGspianatura(options, isDestra) {
    let formulaDestra = options.X0 + (options.diametro / 2) + 2;
    let formulaSinistra = 0 - (options.diametro / 2) - 2;
    
    if (isDestra) {
        // VAI A SINISTRA
        G1(formulaSinistra, "", "");
        Zsicurezza();
        isDestra = false;
    } else {
        // VAI A DESTRA
        G1(formulaDestra, "", "");
        Zsicurezza();
        isDestra = true;
    }

    // distanza di sicurezza in Z
    function Zsicurezza(isDestra) {
        G1("", "", previusZ + 2);
        G0("", "", 0 + 20);
    }
  }
}
```

- [x] animazioni GCODE generazione linea:
```javascript
// inserire codice sullo schermo
function displayGcode(options, pezzoGrezzo) {
  document.querySelector("#output-gcode").textContent = "";
  let gcodeArray = createGcodeProgram(options, pezzoGrezzo); // array completo contutti i codici generati

  // animazione per ognuna linea di codice
  gcodeArray.forEach((Gline, index) => {
    setTimeout(() => {
        addLine(Gline, index, gcodeArray) // aggiungere una linea di codice generatada un'array
    }, index * 1000 / 30); // 1 secondo diviso per numero volte che vogliamo
  }
```

- [x] numerazione linea di codice:
```javascript
function addLine(Gline, index, gcodeArray) {
  ...

  GnumLine.textContent = `N${index + 1}`; // numero linea

  ...
}
```

-----

![](https://visitor-badge.glitch.me/badge?page_id=meccanicAPP)
