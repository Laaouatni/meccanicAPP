let alert = document.querySelector('#alert');
let FORO_Form = document.getElementById('form-foro');
let albero_Form = document.getElementById('form-albero');

let FORO_inputs = FORO_Form.querySelectorAll('input');
let albero_inputs = albero_Form.querySelectorAll('input');


let button

/* get the data from the 2 forms and create a json object from the data */
function getData() {
    let data = {};
    let FORO_data = {};
    let albero_data = {};

    FORO_inputs.forEach((item, index) => {
        FORO_data[item.name] = item.value;
    });

    albero_inputs.forEach((item, index) => {
        albero_data[item.name] = item.value;
    });

    data['FORO'] = FORO_data;
    data['albero'] = albero_data;

    console.log(data);
    return data;
}

function checkInputs() {
    FORO_Form.submit().preventDefault();
    albero_Form.submit().preventDefault();
}

function showAlert() {
    alert.classList.add("alert-visible");
    /* after 2 seconds remove the alert*/
    setTimeout(() => {
        alert.classList.remove("alert-visible");
        item.border = 'inherit';
    }, 2000);
}

function submitForm() {
    checkInputs();

    getData();
}