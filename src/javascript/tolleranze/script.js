let albero_excel_url = "https://gsx2json.com/api?id=1LCd6P9pF9jYhiNQQn-Pu3Te-xlqkqwD78J4_ZuoOt34";

let h_albero_num_URL = albero_excel_url + "&sheet=h_albero_numero";
let h_albero_dati_URL = albero_excel_url + "&sheet=h_albero_dati";


fetch(h_albero_num_URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let tolleranze = data.columns;

        document.getElementById("output-json").textContent += JSON.stringify(data);
        console.log(tolleranze);
    });

fetch(h_albero_dati_URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let tolleranze = data.columns;

        document.getElementById("output-json").textContent += JSON.stringify(data);
        console.log(tolleranze);
    });