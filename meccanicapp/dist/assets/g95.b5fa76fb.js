import"./style.7bbbca57.js";let n=document.querySelector("#raggio-utensile-input"),u=document.querySelector("#raggio-utensile-span"),i=document.querySelector("#html-outputMIN"),o=document.querySelector("#html-outputMAX");function l(t){let r=.5*t.raggio,g=1/4*t.raggio;u.textContent=`${t.raggio}mm (raggio utensile)`;let e={raggio:t.raggio,max:r,min:g};return t.maxHtml.textContent=e.max.toFixed(2),t.minHtml.textContent=e.min.toFixed(2),e}let a={raggio:n.value/10,minHtml:i,maxHtml:o};l(a);let m=[n];m.forEach(t=>{t.addEventListener("input",()=>{a={raggio:n.value/10,minHtml:i,maxHtml:o},l(a),navigator.vibrate(10)},{passive:!0})});
