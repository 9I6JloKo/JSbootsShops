import {viewModule} from "./ViewModule.js";
document.getElementById('navbar').classList.add('d-none');
const loginButton = document.getElementById("login_button");
loginButton.addEventListener("click", e => {
    e.preventDefault();
    selectItemMenu(loginButton);
    if(loginButton.value == 'login'){
        viewModule.showLoginForm();   
    }
//    else{
//        const navigation = document.getElementsByClassName('nav-link')
//        navigation.pop();
//        for(let i = 0; i < navigation.length; i++){
//            if(!navigation[i].contains('d-none')){
//                navigation[i].add('d-none');
//            }
//        }
//    }
});
const clients = document.getElementById("clients");
clients.addEventListener("click", e => {
    e.preventDefault();
    selectItemMenu(clients);
});
const shoes = document.getElementById("shoes");
shoes.addEventListener("click", e => {
    e.preventDefault();
    selectItemMenu(shoes);
});
const shopping = document.getElementById("shopping");
shopping.addEventListener("click", e => {
    e.preventDefault();
    selectItemMenu(shopping);
});
const clientsChange = document.getElementById("clients_change");
clientsChange.addEventListener("click", e => {
    e.preventDefault();
    selectItemMenu(clientsChange);
});
const shoesChange = document.getElementById("shoes_change");
shoesChange.addEventListener("click", e => {
    e.preventDefault();
    selectItemMenu(shoesChange);
});
const dropdown = document.getElementById("dropdown");
dropdown.addEventListener("click", e => {
    e.preventDefault();
    selectItemMenu(dropdown);
});
function selectItemMenu(element_to_change){
    const navbar_massive = document.getElementsByClassName("nav-link");
    for(let i = 0; i < navbar_massive.length; i++){
        if(navbar_massive[i].classList.contains("active")){
            navbar_massive[i].classList.remove("active");
            navbar_massive[i].style.letterSpacing = "2px";
        }
    }
    element_to_change.style.letterSpacing = "5px";
    element_to_change.classList.add("active");
}