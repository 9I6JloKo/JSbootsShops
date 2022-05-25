import {loginModule} from "./LoginModule.js";
class ViewModule {
    showLoginForm() {
        const content = document.getElementById("content");
        content.innerHTML = `
                                  <legend style="margin-bottom: 20px">Enter to system</legend>
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="login" placeholder="Login">
                                        <label for="floatingInput">Login</label>
                                    </div>
                                    <div class="form-floating">
                                        <input type="password" class="form-control" id="password" placeholder="Password">
                                        <label for="floatingPassword">Password</label>
                                        <div class="invalid-feedback d-none" id="error_password">Wrong login or password</div>
                                    </div>
                                    <button id = "login_submit" class="btn btn-primary" style="margin-top: 30px">Submit</button>
                            `;
        const loginSubmit = document.getElementById("login_submit");
        loginSubmit.addEventListener('click', e => {
            e.preventDefault()
            loginModule.login();
        });
    }
    
}
const viewModule = new ViewModule();
export {viewModule};