class LoginModule {
    login(){
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const credendial = {
            "login": login,
            "password": password
        };
        let promise = fetch("login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(credendial)
        });
        promise.then(response => response.json())
                .then(response => {
                    if(!response.auth){
                        document.getElementById('login').classList.add('is-invalid');
                        document.getElementById('password').classList.add('is-invalid');
                        document.getElementById('error_password').classList.remove('d-none');
                    }
                    else {
                        if(document.getElementById('login').classList.contains('is-invalid')){
                            document.getElementById('login').classList.remove('is-invalid');
                            document.getElementById('password').classList.remove('is-invalid');
                            document.getElementById('error_password').classList.add('d-none');
                        }
                        sessionStorage.setItem('user', JSON.stringify(response.user));
                        document.getElementById('navbar').classList.remove('d-none');
                        document.getElementById('login_button').classList.add('d-none');
                        document.getElementById('logout_button').classList.remove('d-none');
                        if(response.user.level === "USER"){
//                            document.getElementById('edit_myself').classList.add('d-none');
                            document.getElementById('shoes').classList.add('d-none');
                            document.getElementById('clients_change').classList.add('d-none');
                            document.getElementById('shoes_change').classList.add('d-none');
                            document.getElementById('earning').classList.add('d-none');
                        }
                        document.getElementById('content').innerHTML = "";
                        document.getElementById('info').innerHTML = response.info;
                    }
               })
               .catch(error =>{
                    document.getElementById('login').classList.add('is-invalid');
                    document.getElementById('password').classList.add('is-invalid');
                    document.getElementById('error_password').classList.remove('d-none');
               });
        };
    logout(){
        let promise = fetch("logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
        });
        promise.then(response => response.json())
                .then(response => {
                    const loginButton = document.getElementById("login_button");
                    const logoutButton = document.getElementById('logout_button');
                    const navbar_massive = document.getElementsByClassName("nav-link");
                    if(!document.getElementById('content').classList.contains('d-none')){
                        document.getElementById('content').classList.add('d-none');   
                    }
                    for(let i = 0; i < navbar_massive.length; i++){
                        if(navbar_massive[i].classList.contains('d-none')){
                            navbar_massive[i].classList.remove('d-none');
                        }
                    }
                    document.getElementById('navbar').classList.add('d-none');
                    document.getElementById('info').innerHTML = 'Bro, do not leave us!';
                    logoutButton.classList.add('d-none');
                    loginButton.classList.remove('d-none');
                    sessionStorage.removeItem('user');
               })
               .catch(error =>{
                    document.getElementById('info').innerHTML = "Ошибка сервера: "+error;
                    document.getElementById('content').innerHTML = "";
               });
        };
    }
const loginModule = new LoginModule();
export {loginModule}