let intensitaInput = document.querySelector("#intensita-input");
let tensioneInput = document.querySelector("#tensione-input");

let intensitaSpan = document.querySelector("#intensita-span");
let tensioneSpan = document.querySelector("#tensione-span");

let htmlOutput = document.querySelector("#html-output");

function calcolaOHM(props) {
  let formula = props.volt / props.amp;

  intensitaSpan.textContent = `${props.amp}ampere`;
  tensioneSpan.textContent = `${props.volt}volt`;

  props.htmlOutput.textContent = formula.toFixed(2);
}

let props = {
  amp: intensitaInput.value,
  volt: tensioneInput.value,
  htmlOutput,
};

calcolaOHM(props);

let arrayInput = [intensitaInput, tensioneInput];

arrayInput.forEach((input) => {
  input.addEventListener(
    "input",
    () => {
      props = {
        amp: intensitaInput.value,
        volt: tensioneInput.value,
        htmlOutput,
      };

      calcolaOHM(props);

      navigator.vibrate(10);
    },
    { passive: true },
  );
});
