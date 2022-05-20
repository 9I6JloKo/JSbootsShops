import {jsonConverter} from "./JsonConverter.js";
class LoginModule {
    showLoginForm() {
        const content = document.getElementById("content");
        content.innerHTML = `
                            <form action="send_user" method="POST">
                                <fieldset>
                                  <legend style="margin-bottom: 20px">Login</legend>
                                    <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="login" placeholder="Login">
                                    <label for="floatingInput">Login</label>
                                    </div>
                                    <div class="form-floating">
                                        <input type="password" class="form-control" id="password" placeholder="Password">
                                        <label for="floatingPassword">Password</label>
                                      </div>
                                      <button id = "login_submit" type="submit" class="btn btn-primary" style="margin-top: 30px">Submit</button>
                                    </div>
                                </fieldset>
                            </form>
                            `
        const login_submit = document.getElementById("login_submit");
        login_submit.addEventListener(e => {
            e.preventDefault()
            jsonConverter.createClient();
        });
    }
    
}
const loginModule = new LoginModule();
export {loginModule};