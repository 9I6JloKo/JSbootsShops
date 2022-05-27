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
    showShoeForm(){
        document.getElementById('content').innerHTML = `
            <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="ShoeFirm" placeholder="ShoeFirm">
                  <label for="floatingInput">ShoeFirm</label>
                   <div class="invalid-feedback d-none" id="error_password">Wrong ShoeFirm</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="ShoeModell" placeholder="ShoeModell">
                  <label for="floatingInput">ShoeModell</label>
                   <div class="invalid-feedback d-none" id="error_ShoeModell">Wrong ShoeModell</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="number" min="20" max="55" class="form-control" id="ShoeSize" placeholder="ShoeSize(european)">
                  <label for="floatingInput">ShoeSize(european)</label>
                   <div class="invalid-feedback d-none" id="error_ShoeSize">Wrong ShoeSize</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="number" max="300" min="0.01" class="form-control" id="ShoePrice" placeholder="ShoePrice(dollars)">
                  <label for="floatingInput">ShoePrice(dollars)</label>
                   <div class="invalid-feedback d-none" id="error_ShoePrice">Wrong ShoePrice</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="number" max="150" min="1" class="form-control" id="ShoeCount" placeholder="ShoeCount(in pairs)">
                  <label for="floatingInput">ShoeCount(in pairs)</label>
                    <div class="invalid-feedback d-none" id="error_ShoeCount">Wrong ShoeCount</div>
            </div>
            <button id = "shoe_submit" class="btn btn-primary" style="margin-top: 30px">add</button>
            `
        const shoeSubmit = document.getElementById("shoe_submit");
        shoeSubmit.addEventListener('click', e => {
            e.preventDefault()
            shoeSubmit.sendShoe();
        });
    }
    
}
const viewModule = new ViewModule();
export {viewModule};