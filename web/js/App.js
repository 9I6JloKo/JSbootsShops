const login_button = document.getElementById("login_button");
login_button.addEventListener("hover", e => {
    e.preventDefault();
    login_button.style.transitionDuration = "0.5s";
    login_button.style.color = "black";
});