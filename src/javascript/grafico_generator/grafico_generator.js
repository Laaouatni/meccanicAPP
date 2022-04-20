/* get the & in the url of the page */

let url_param = window.location.search.substring(1);
let url_param_array = url_param.split("&");

let modalita = url_param_array[0].split("=")[1];