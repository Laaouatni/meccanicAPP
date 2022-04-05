let alert = document.querySelector('#alert');
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

    FORO_inputs.forEach((item, index) => {
        if (item.value.length != 0) {
            FORO_data[item.name] = item.value.replace(",", ".");
        } else {
            showAlert();

        }
    });

    albero_inputs.forEach((item, index) => {
        if (item.value.length != 0) {
            albero_data[item.name] = item.value.replace(",", ".");
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

function checkModalita() {
    let data = getData();

    let max_FORO = data['FORO']['max_FORO'];
    let max_albero = data['albero']['max_albero'];

    let min_FORO = data['FORO']['min_FORO'];
    let min_albero = data['albero']['min_albero'];


    /* libero */
    if (min_FORO > max_albero) {
        output.textContent = "libero";
    }
    /* interferenza */
    else if (min_FORO < max_albero) {
        output.textContent = "interferenza";
        /* incerto */
        if (min_FORO > min_albero) {
            output.textContent = "incerto";
        }
    } else if (max_FORO < max_albero) {
        output.textContent = "interferenza";
    } else if (min_FORO > min_albero) {
        output.textContent = "libero";
        if (min_FORO > max_albero) {
            output.textContent = "libero";
        }
    } else {
        output.textContent = "questa non lo hai programmata";
    }
}

function submitForm() {
    checkModalita();
}