let alert = document.querySelector('#alert');
let success_alert = document.querySelector('#success-alert');

let FORO_Form = document.getElementById('form-foro');
let albero_Form = document.getElementById('form-albero');

let FORO_inputs = FORO_Form.querySelectorAll('input');
let albero_inputs = albero_Form.querySelectorAll('input');

let output = document.getElementById('output');

/* get the data from the 2 forms and create a json object from the data */
function getData() {
    let data = {};
    let FORO_data = {};
    let albero_data = {};

    FORO_inputs.forEach((item) => {
        if (item.value.length != 0) {
            FORO_data[item.name] = item.value.replace(",", ".");
            showSuccessAlert();
        } else {
            showAlert();
        }
    });

    albero_inputs.forEach((item) => {
        if (item.value.length != 0) {
            albero_data[item.name] = item.value.replace(",", ".");
            showSuccessAlert()
        } else {
            showAlert();
        }
    });

    data['FORO'] = FORO_data;
    data['albero'] = albero_data;

    console.log(data);
    return data;
}

function showAlert() {
    alert.classList.add("alert-visible");
    /* after 2 seconds remove the alert*/
    setTimeout(() => {
        alert.classList.remove("alert-visible");
    }, 2000);
}

function showSuccessAlert() {
    success_alert.classList.add("success-visible");
    /* after 2 seconds remove the alert*/
    console.log("success");
    setTimeout(() => {
        success_alert.classList.remove("success-visible");
    }, 1100);
}

function checkModalita() {
    let data = getData();

    let max_FORO = data['FORO']['max_foro'];
    let max_albero = data['albero']['max_albero'];

    let min_FORO = data['FORO']['min_foro'];
    let min_albero = data['albero']['min_albero'];


    if (min_FORO > max_albero) {
        output.textContent = "gioco";

        output.classList.add("output-animation");
        setTimeout(() => {
            output.classList.remove("output-animation");
        }, 1000);

        console.log("gioco");
    }
    /* interferenza */
    else if (max_FORO < min_albero) {
        output.textContent = "interferenza";

        output.classList.add("output-animation");
        setTimeout(() => {
            output.classList.remove("output-animation");
        }, 1000);

        console.log("interferenza");
    }
    /* incerto */
    else if (
        min_FORO == min_albero ||
        min_FORO == max_albero ||
        max_FORO == min_albero ||
        max_FORO == max_albero ||
        min_FORO < min_albero && max_FORO < max_albero ||
        min_FORO > min_albero && max_FORO > max_albero ||
        min_FORO < min_albero && max_FORO > max_albero ||
        min_FORO > min_albero && max_FORO < max_albero
    ) {
        output.textContent = "incerto";

        output.classList.add("output-animation");
        setTimeout(() => {
            output.classList.remove("output-animation");
        }, 1000);

        console.log("incerto");
    } else {
        output.textContent = "questa non lo hai programmata, ma potrebbe essere incerto";
    }
}

function submitForm() {
    checkModalita();
    /* SCROLL TO id="outputs-container" */
    document.querySelector("#outputs-container").scrollIntoView({
        behavior: "smooth"
    });
}

document.querySelector("#btn-form")
    .addEventListener("click", submitForm);

window
    .addEventListener("keyup", (e) => {
        if (e.keyCode == 13) {
            submitForm();
        }
    });