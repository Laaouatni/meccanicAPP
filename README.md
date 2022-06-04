# meccanicAPP

L'App che ti aiuta se sei un Disegnatore Tecnico, oppure operatore CNC!

Questa App è attualmente in versione "Web-Edition", così più persone avranno la possibilità di utilizzarla!

https://meccanicapp.vercel.app 

## Funzionalità

### 1. Trovare da delle Tolleranze, se "albero-foro" è:
   - acc. con Gioco
   - acc. con Interferenza
   - acc. con Incerto

-----

### 2. Trovare le misure delle tolleranze "h":

- da "h1" a "h12"
- da "ø3" a "ø50"

> Tutto ciò, in modo semplice (tramite slider, senza dover digitare con la tastiera)

-----

### 3. Generare GCODE automaticamente:

- spianatura FRESA.

###### esempio generato: 
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

> (VT * 1000) / (Ø * Math.PI) <br><br> vt= velocità di taglio (m/min) <br> Ø=diametro pezzo (mm) <br> Math.PI = 3.14



![](https://visitor-badge.glitch.me/badge?page_id=meccanicAPP)
