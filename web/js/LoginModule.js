class LoginModule {
    login(){
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const credendial = {
            "login": login,
            "password": password
        };
        let promise = fetch("sendUser", {
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
                        document.getElementById('login_button').innerHTML = "logout";
                        if(sessionStorage.getItem('user').level === 'USER'){
                            document.getElementById('clients').classList.add('d-none');
                            document.getElementById('shoes').classList.add('d-none');
                            document.getElementById('clients_change').classList.add('d-none');
                            document.getElementById('shoes_change').classList.add('d-none');
                        }
                        document.getElementById('content').innerHTML = "";
                        document.getElementById('info').innerHTML = response.info;
                    }
               })
               .catch(error =>{
                    document.getElementById('info').innerHTML = "Ошибка сервера: "+error;
                    checkMenu();
                    document.getElementById('content').innerHTML = "";
               });
        };
        
    }
const loginModule = new LoginModule();
export {loginModule}