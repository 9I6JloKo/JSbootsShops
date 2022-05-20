import {loginModule} from "./LoginModule.js";
const login_button = document.getElementById("login-button");
login_button.addEventListener("click", e => {
    e.preventDefault();
    change_item(login_button);
    loginModule.showLoginForm();
});
const clients = document.getElementById("clients");
clients.addEventListener("click", e => {
    e.preventDefault();
    change_item(clients);
});
const shoes = document.getElementById("shoes");
shoes.addEventListener("click", e => {
    e.preventDefault();
    change_item(shoes);
});
const shopping = document.getElementById("shopping");
shopping.addEventListener("click", e => {
    e.preventDefault();
    change_item(shopping);
});
const clients_change = document.getElementById("clients-change");
clients_change.addEventListener("click", e => {
    e.preventDefault();
    change_item(clients_change);
});
const shoes_change = document.getElementById("shoes-change");
shoes_change.addEventListener("click", e => {
    e.preventDefault();
    change_item(shoes_change);
});
const dropdown = document.getElementById("dropdown");
dropdown.addEventListener("click", e => {
    e.preventDefault();
    change_item(dropdown);
});
function change_item(element_to_change){
    const navbar_massive = document.getElementsByClassName("nav-link");
    for(let i = 0; i < navbar_massive.length; i++){
        navbar_massive[i].style.transitionDuration = "0.2s";
        if(navbar_massive[i].classList.contains("active")){
            navbar_massive[i].classList.remove("active");
            navbar_massive[i].style.fontSize = "14px";
        }
    }
    element_to_change.style.fontSize = "17px";
    element_to_change.classList.add("active");
}