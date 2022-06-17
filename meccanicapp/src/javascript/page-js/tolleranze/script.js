let albero_excel_url = "https://gsx2json.com/api?id=1LCd6P9pF9jYhiNQQn-Pu3Te-xlqkqwD78J4_ZuoOt34";

let h_albero_dati_URL = albero_excel_url + "&sheet=h_albero_dati";

let jsonData = {};

let hRangeInput = document.getElementById("h-range");
let hSpan = document.getElementById("h_span");

let diametroRangeInput = document.getElementById("diametro-range");
let diametroSpan = document.getElementById("diametro_span");

let preview_max = document.getElementById("preview-max");
let preview_min = document.getElementById("preview-min");

let loading = document.getElementById("loading-container");

function addLoading() {
    loading.style.display = "grid";
}

function removeLoading() {
    loading.style.display = "none";
}

function fetchAndDisplay() {
    addLoading();

    fetch(h_albero_dati_URL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            jsonData = data;
        })
        .then(() => {
            let diametro_value = diametroRangeInput.value;
            diametroSpan.textContent = "Ø" + diametro_value;

            let h_value = hRangeInput.value;
            hSpan.textContent = "h" + h_value;

            calcolaTolleranza()

            //pc

            let mouse_events = ["mousemove", "mousedown", "click"];

            mouse_events.forEach((item) => {
                hRangeInput.addEventListener(item, () => {
                    h_value = hRangeInput.value;
                    hSpan.textContent = "h" + h_value;
                    calcolaTolleranza();
                });

                diametroRangeInput.addEventListener(item, () => {
                    diametro_value = diametroRangeInput.value;
                    diametroSpan.textContent = "Ø" + diametro_value;
                    calcolaTolleranza();
                });
            });

            //mobile

            let touch_events = ["touchstart", "touchend", "touchmove"];

            touch_events.forEach((item) => {
                hRangeInput.addEventListener(item, () => {
                    h_value = hRangeInput.value;
                    hSpan.textContent = "h" + h_value;
                    calcolaTolleranza();
                }, { passive: true });

                diametroRangeInput.addEventListener(item, () => {
                    diametro_value = diametroRangeInput.value;
                    diametroSpan.textContent = "Ø" + diametro_value;
                    calcolaTolleranza();
                }, { passive: true });
            });


        }).catch((error) => {
            let alert = document.querySelector('#alert');
            let testoErrore = document.querySelector("#testo-errore");
            alert.classList.add("alert-visible");

            testoErrore.textContent = error; /* after 2 seconds remove the alert*/

            setTimeout(() => {
                alert.classList.remove("alert-visible");
            }, 2000);

            setTimeout(() => {
                window.location.reload(true);
            }, 5000);

        }).finally(() => {
            removeLoading();
        });
}

fetchAndDisplay();

let previewDiametro = document.getElementById("preview-diametro");

function calcolaTolleranza() {
    let diametro_value = diametroRangeInput.value;
    let h_value = hRangeInput.value;

    previewDiametro.textContent = diametro_value;

    let columnsNumber = Object.keys(jsonData.columns);
    let columnsContent = Object.values(jsonData.columns);

    columnsNumber.pop();

    columnsNumber.forEach((item, index) => {
        if (item <= diametro_value) {
            let selected_array = columnsContent[index];
            let selectedString = selected_array[h_value - 1];

            preview_max.textContent = selectedString.split(";")[0];
            preview_min.textContent = selectedString.split(";")[1];
        }
    });

    navigator.vibrate(10);
}