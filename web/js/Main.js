import {viewModule} from "./ViewModule.js";
import {loginModule} from "./LoginModule.js";
import {shoeModule} from "./ShoeModule.js";
document.getElementById('navbar').classList.add('d-none');
const loginButton = document.getElementById("login_button");
const navbar_massive = document.getElementsByClassName("nav-link");
loginButton.addEventListener("click", e => {
    e.preventDefault();
    if(document.getElementById('content').classList.contains('d-none')){
        document.getElementById('content').classList.remove('d-none');   
    }
    viewModule.showLoginForm();   
    selectItemMenu(loginButton);
});
const logoutButton = document.getElementById('logout_button');
logoutButton.addEventListener("click", e => {
    e.preventDefault();
    loginModule.logout();
});
//const editMyself = document.getElementById("edit_myself");
//editMyself.addEventListener("click", e => {
//    e.preventDefault();
//    selectItemMenu(editMyself);
//});
const shoes = document.getElementById("shoes");
shoes.addEventListener("click", e => {
    e.preventDefault();
    selectItemMenu(shoes);
    viewModule.showShoeForm();
});
const shopping = document.getElementById("shopping");
shopping.addEventListener("click", e => {
    e.preventDefault();
    selectItemMenu(shopping);
    viewModule.showPurchaseForm();
});
const clientsChange = document.getElementById("clients_change");
clientsChange.addEventListener("click", e => {
    e.preventDefault();
    selectItemMenu(clientsChange);
    viewModule.showChangeClientForm();
});
const shoesChange = document.getElementById("shoes_change");
shoesChange.addEventListener("click", e => {
    e.preventDefault();
    selectItemMenu(shoesChange);
    viewModule.showChangeShoesForm();
});
const earning = document.getElementById("earning");
earning.addEventListener("click", e => {
    e.preventDefault();
    selectItemMenu(earning);
    viewModule.showEarning();
});
const editMyself = document.getElementById("edit_myself");
editMyself.addEventListener("click", e => {
    e.preventDefault();
    selectItemMenu(editMyself);
    viewModule.showEditMyself();
});
window.addEventListener("load", e => {
    e.preventDefault();
    if(null !== sessionStorage.getItem('user')){
    document.getElementById('navbar').classList.remove('d-none');
    document.getElementById('login_button').classList.add('d-none');
    document.getElementById('logout_button').classList.remove('d-none');
    if(JSON.parse(sessionStorage.getItem('user')).level.toString() === "USER"){
//                            document.getElementById('edit_myself').classList.add('d-none');
        document.getElementById('shoes').classList.add('d-none');
        document.getElementById('clients_change').classList.add('d-none');
        document.getElementById('shoes_change').classList.add('d-none');
        document.getElementById('earning').classList.add('d-none');
    }
    if(JSON.parse(sessionStorage.getItem('user')).level.toString() === "MANAGER"){
//                            document.getElementById('edit_myself').classList.add('d-none');
        document.getElementById('clients_change').classList.add('d-none');
    }
    document.getElementById('content').innerHTML = "";
    document.getElementById('info').innerHTML = 'С возвращением, ' + JSON.parse(sessionStorage.getItem('user')).firstname.toString() + '!';
    }
});
function selectItemMenu(element_to_change){
    for(let i = 0; i < navbar_massive.length; i++){
        if(navbar_massive[i].classList.contains("active")){
            navbar_massive[i].classList.remove("active");
            navbar_massive[i].style.letterSpacing = "2px";
        }
    }
    document.getElementById('info').innerHTML = '';
    element_to_change.style.letterSpacing = "5px";
    element_to_change.classList.add("active");
}