let raggioInput = document.querySelector("#raggio-utensile-input");
let raggioSpan = document.querySelector("#raggio-utensile-span");

let minHtml = document.querySelector('#html-outputMIN');
let maxHtml = document.querySelector('#html-outputMAX');

function calcolaRaggio(props) {
    let formulaAvanzMax = (1 / 2) * props.raggio;
    let formulaAvanzMin = (1 / 4) * props.raggio;

    raggioSpan.textContent = `${props.raggio}mm (raggio utensile)`;

    let results = {
        raggio: props.raggio,
        max: formulaAvanzMax,
        min: formulaAvanzMin
    }

    props.maxHtml.textContent = results.max.toFixed(2);
    props.minHtml.textContent = results.min.toFixed(2);

    return results;
}

let props = {
    "raggio": raggioInput.value / 10,
    minHtml,
    maxHtml
}

calcolaRaggio(props);

let arrayInput = [raggioInput];

arrayInput.forEach((input) => {
    input.addEventListener('input', () => {
        props = {
            "raggio": raggioInput.value / 10,
            minHtml,
            maxHtml
        }

        calcolaRaggio(props);
    }, { passive: true });
});