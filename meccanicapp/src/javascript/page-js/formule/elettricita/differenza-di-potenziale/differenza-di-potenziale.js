// let protoniInput = document.querySelector("#protoni-input");
// let elettroniInput = document.querySelector("#elettroni-input");

// let protoniSpan = document.querySelector("#protoni-span");
// let elettroniSpan = document.querySelector("#elettroni-span");

// let htmlOutput = document.querySelector("#html-output");

// function calcolaOHM(props) {
//   let formula =
//     parseFloat(
//       props.elettroni > props.protoni ? props.protoni : props.elettroni,
//     ) + parseFloat(props.protoni);

//   protoniSpan.textContent = `${props.protoni}protoni`;
//   elettroniSpan.textContent = `${props.elettroni}elettroni`;

//   props.htmlOutput.textContent = formula.toFixed(2);
// }

// let props = {
//   protoni: protoniInput.value,
//   elettroni: elettroniInput.value,
//   htmlOutput,
// };

// calcolaOHM(props);

// let arrayInput = [protoniInput, elettroniInput];

// arrayInput.forEach((input) => {
//   input.addEventListener(
//     "input",
//     () => {
//       props = {
//         protoni: protoniInput.value,
//         elettroni: elettroniInput.value,
//         htmlOutput,
//       };

//       calcolaOHM(props);

//       navigator.vibrate(10);
//     },
//     { passive: true },
//   );
// });
