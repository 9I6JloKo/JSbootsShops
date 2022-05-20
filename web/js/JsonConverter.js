class JsonConverter {
    createClient(){
        const login = document.getElementById("login");
        const password = document.getElementById("password");
        const credendial = {
            "login": login,
            "password": password
        };
        let promise = fetch("send_user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(credendial) // перевод в правильный стринг 
        });
        promise.then(response => response.json)
                .then(response => {
                    if(response.info === "Неправильный логин или пароль"){
                        document.getElementById('content').innerHTML = `
                            <form action="send_user" method="POST">
                                <fieldset>
                                  <legend style="margin-bottom: 20px">Login</legend>
                                    <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="login" placeholder="Login">
                                    <label for="floatingInput">Login</label>
                                    </div>
                                    <div class="form-group has-danger">
                                        <label class="form-label mt-4" for="inputInvalid">Invalid input</label>
                                        <input type="text" class="form-control is-invalid" id="login" placeholder="Login">
                                        <div class="invalid-feedback">Wrong login or password</div>
                                    </div>
                                    <div class="form-floating">
                                        <input type="password" class="form-control" id="password" placeholder="Password">
                                        <label for="floatingPassword">Password</label>
                                      </div>
                                      <button id = "login_submit" type="submit" class="btn btn-primary" style="margin-top: 30px">Submit</button>
                                    </div>
                                </fieldset>
                            </form>
                            `;  // ДОДЕЛАТЬ
                    }
//                    if(response.auth){
//                        sessionStorage.setItem('user',JSON.stringify(response.user));
//                        sessionStorage.setItem('role',JSON.stringify(response.role));
//                        checkMenu();
//                        document.getElementById('content').innerHTML = "";
//                    } 
               })
               .catch(error =>{
                    document.getElementById('info').innerHTML = "Ошибка сервера: "+error;
                    checkMenu();
                    document.getElementById('content').innerHTML = "";
               });
        });
    }
}
const jsonConverter = new JsonConverter();
export {jsonConverter}