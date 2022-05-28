import {loginModule} from "./LoginModule.js";
import {shoeModule} from "./ShoeModule.js";
import {registerModule} from "./RegisterModule.js";
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
              <div style= "display: flex; flex-direction: column; justify-content: center">
                <button id = "login_submit" class="btn btn-primary" style="margin-top: 30px">Enter</button>
                <button id = "register_submit" class="btn btn-primary" style="margin-top: 30px; float:left">REGISTRATION</button>
            </div>
                            `;
        const loginSubmit = document.getElementById("login_submit");
        loginSubmit.addEventListener('click', e => {
            e.preventDefault()
            loginModule.login();
        });
        const registerSubmit = document.getElementById("register_submit");
        registerSubmit.addEventListener('click', e => {
            e.preventDefault()
            registerModule.register();
        });
    }
    showShoeForm(){
        document.getElementById('info').innerHTML = "SHOE ADDING"
        document.getElementById('content').innerHTML = `
            <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="ShoeFirm" placeholder="ShoeFirm">
                  <label for="floatingInput">ShoeFirm</label>
                   <div class="invalid-feedback d-none" id="error_ShoeFirm">Wrong ShoeFirm</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="ShoeModell" placeholder="ShoeModell">
                  <label for="floatingInput">ShoeModell</label>
                   <div class="invalid-feedback d-none" id="error_ShoeModell">Wrong ShoeModell</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="number" class="form-control" id="ShoeSize" placeholder="ShoeSize(european)">
                  <label for="floatingInput">ShoeSize(european)</label>
                   <div class="invalid-feedback d-none" id="error_ShoeSize">Wrong ShoeSize</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="number" class="form-control" id="ShoePrice" placeholder="ShoePrice(dollars)">
                  <label for="floatingInput">ShoePrice(dollars)</label>
                   <div class="invalid-feedback d-none" id="error_ShoePrice">Wrong ShoePrice</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="number" class="form-control" id="ShoeCount" placeholder="ShoeCount(in pairs)">
                  <label for="floatingInput">ShoeCount(in pairs)</label>
                   <div class="invalid-feedback d-none" id="error_ShoeCount">Wrong ShoeCount</div>
            </div>
             <div style= "display: flex; flex-direction: column; justify-content: center">
                <button id = "shoe_submit" class="btn btn-primary" style="margin-top: 30px; width:100%">add</button>
            </div>
            `
        const shoeSubmit = document.getElementById("shoe_submit");
        shoeSubmit.addEventListener('click', e => {
            e.preventDefault()
            shoeModule.sendShoe();
        });
    }
    
}
const viewModule = new ViewModule();
export {viewModule};