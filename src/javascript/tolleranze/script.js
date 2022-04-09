let tolleranzeURL = "https://gsx2json.com/api?id=1LCd6P9pF9jYhiNQQn-Pu3Te-xlqkqwD78J4_ZuoOt34&sheet=h_tolleranze";

/* fetch data and transform it to json  */
fetch(tolleranzeURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let tolleranze = data.columns;

        document.getElementById("output-json").textContent = JSON.stringify(data);
        console.log(tolleranze);
    });