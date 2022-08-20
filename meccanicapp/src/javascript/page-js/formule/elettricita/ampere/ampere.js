let resistenzaInput = document.querySelector("#resistenza-input");
let tensioneInput = document.querySelector("#tensione-input");

let resistenzaSpan = document.querySelector("#resistenza-span");
let tensioneSpan = document.querySelector("#tensione-span");

let htmlOutput = document.querySelector("#html-output");

function calcolaAmpere(props) {
  let formula = props.volt / props.ohm;

  resistenzaSpan.textContent = `${props.ohm}ohm`;
  tensioneSpan.textContent = `${props.volt}volt`;

  props.htmlOutput.textContent = formula.toFixed(2);
}

let props = {
  ohm: resistenzaInput.value,
  volt: tensioneInput.value,
  htmlOutput,
};

calcolaAmpere(props);

let arrayInput = [resistenzaInput, tensioneInput];

arrayInput.forEach((input) => {
  input.addEventListener(
    "input",
    () => {
      props = {
        ohm: resistenzaInput.value,
        volt: tensioneInput.value,
        htmlOutput,
      };

      calcolaAmpere(props);

      navigator.vibrate(10);
    },
    { passive: true },
  );
});
