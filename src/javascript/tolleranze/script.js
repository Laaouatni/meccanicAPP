let albero_excel_url = "https://gsx2json.com/api?id=1LCd6P9pF9jYhiNQQn-Pu3Te-xlqkqwD78J4_ZuoOt34";

let h_albero_dati_URL = albero_excel_url + "&sheet=h_albero_dati";

let jsonData = {};


console.log(h_albero_dati_URL);

fetch(h_albero_dati_URL)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        jsonData = data;
        document.getElementById("output-json").textContent += JSON.stringify(data);
    }).then(() => {
        calcolaTolleranza();
    })

let previewDiametro = document.getElementById("preview-diametro");

function calcolaTolleranza() {
    let diametro_value = diametroRangeInput.value;
    let h_value = hRangeInput.value;

    previewDiametro.textContent = diametro_value;
    console.log(jsonData)
}

/* range */

let hRangeInput = document.getElementById("h-range");
let hSpan = document.getElementById("h_span");

hRangeInput.addEventListener("mousemove", () => {
    let h_value = hRangeInput.value;
    hSpan.textContent = "h" + h_value;
});

let diametroRangeInput = document.getElementById("diametro-range");
let diametroSpan = document.getElementById("diametro_span");

diametroRangeInput.addEventListener("mousemove", () => {
    let diametro_value = diametroRangeInput.value;
    diametroSpan.textContent = "Ø" + diametro_value;
});

/*  */