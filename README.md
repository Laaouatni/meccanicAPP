# meccanicAPP

L'App che ti aiuta se sei un Disegnatore Tecnico, oppure operatore CNC!

Questa App è attualmente in versione "Web-Edition", così più persone avranno la possibilità di utilizzarla!

<https://meccanicapp.vercel.app>

## Funzionalità MeccanicAPP

### 1. Trovare da delle Tolleranze, se "albero-foro" è

- [x] acc. con Gioco
- [x] acc. con Interferenza
- [x] acc. con Incerto

-----

### 2. Trovare le misure delle tolleranze "h"

- [x] da "h1" a "h12"
- [x] da "ø3" a "ø50"

-----

### 3. Generare GCODE automaticamente

[x] spianatura FRESA.

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

<hr>

### 4 . calcolatore Velocità rotazione mandrino

- giri/minuto (con formula)

> (VT *1000) / (Ø* Math.PI) <br><br> vt= velocità di taglio (m/min) <br> Ø=diametro pezzo (mm) <br> Math.PI = 3.14

<hr>

### 5. Generatore di  avanzamento

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
  - > **FORMULA:** <br> Fz *Zn* S = avanz_G94 mm/min <br><br> **esempio:** <br> 0.8mm *4n* 1200giri/min = 3840 mm/min

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
  - > **FORMULA:** <br> MIN_avanz = R *(1/4) <br><br> **esempio:** <br> 0.8mm*  0.25 = 0.2mm/giro <hr> **FORMULA:** <br> MAX_avanz = R *(1/2) <br><br> **esempio:** <br> 0.8mm*  0.5 = 0.4mm/giro

-----

### 6. velocità rotazione

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
  - > **FORMULA:** <br> (S *D* π) / 1000 = Vt_G96 m/min <br><br> **esempio:** <br> 1200 *50* 3.14 = 188.5 m/min (metri/minuto)

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
  - > **FORMULA:** <br> (VT *1000) / (Ømm*  π) = G97 giri/min <br><br> **esempio:** <br> (180m/min *1000) / (200* 3.14) = 286.48giri/min (giri/minuto)

![](https://visitor-badge.glitch.me/badge?page_id=meccanicAPP)
