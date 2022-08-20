let resistenzaInput = document.querySelector("#resistenza-input");
let intensitaInput = document.querySelector("#intensita-input");

let resistenzaSpan = document.querySelector("#resistenza-span");
let intensitaSpan = document.querySelector("#intensita-span");

let htmlOutput = document.querySelector("#html-output");

function calcolaVolt(props) {
  let formula = props.ohm * props.amp;

  resistenzaSpan.textContent = `${props.ohm}ohm`;
  intensitaSpan.textContent = `${props.amp}ampere`;

  props.htmlOutput.textContent = formula.toFixed(2);
}

let props = {
  ohm: resistenzaInput.value,
  amp: intensitaInput.value,
  htmlOutput,
};

calcolaVolt(props);

let arrayInput = [resistenzaInput, intensitaInput];

arrayInput.forEach((input) => {
  input.addEventListener(
    "input",
    () => {
      props = {
        ohm: resistenzaInput.value,
        amp: intensitaInput.value,
        htmlOutput,
      };

      calcolaVolt(props);

      navigator.vibrate(10);
    },
    { passive: true },
  );
});
