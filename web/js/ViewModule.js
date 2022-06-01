import {loginModule} from "./LoginModule.js";
import {shoeModule} from "./ShoeModule.js";
import {registerModule} from "./RegisterModule.js";
import {purchaseModule} from "./PurchaseModule.js";
import {changeClientModule} from "./ChangeClientModule.js"
class ViewModule {
    showLoginForm() {
        const content = document.getElementById("content");
        content.innerHTML = `
            <legend style="margin-bottom: 20px">Enter to the system</legend>
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
        const registerButton = document.getElementById('register_submit');
        registerButton.addEventListener("click", e => {
            e.preventDefault();
            viewModule.showRegisterForm();
        });
    }
showRegisterForm(){
        document.getElementById('content').innerHTML = `
            <legend style="margin-bottom: 20px">Registration in the system</legend>
            <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="client_Name" placeholder="clientName">
                  <label for="floatingInput">Your name</label>
                   <div class="invalid-feedback d-none" id="error_clientName">Wrong Name</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="client_Surname" placeholder="client_Surname">
                  <label for="floatingInput">Your surname</label>
                   <div class="invalid-feedback d-none" id="error_client_Surname">Wrong surname</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="number" class="form-control" id="client_Number" placeholder="client_Number">
                  <label for="floatingInput">Number</label>
                   <div class="invalid-feedback d-none" id="error_client_Number">Wrong number</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="number" class="form-control" id="client_Money" placeholder="client_Money">
                  <label for="floatingInput">Money(dollars)</label>
                   <div class="invalid-feedback d-none" id="error_client_Money">Wrong money</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="client_Login" placeholder="client_Login">
                  <label for="floatingInput">Login</label>
                   <div class="invalid-feedback d-none" id="error_client_Login">Wrong login</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="password" class="form-control" id="client_Password" placeholder="client_Password">
                  <label for="floatingInput">Password</label>
                   <div class="invalid-feedback d-none" id="error_client_Password">Wrong password</div>
            </div>
             <div style= "display: flex; flex-direction: column; justify-content: center">
                <button id = "register_submit" class="btn btn-primary" style="margin-top: 30px; width:100%">Create</button>
            </div>
            `;
        const registerSubmit = document.getElementById("register_submit");
        registerSubmit.addEventListener('click', e => {
            e.preventDefault();
            registerModule.register();
        });
    }
    showShoeForm(){
        document.getElementById('content').innerHTML = `
            <legend style="margin-bottom: 20px">SHOE ADDING</legend>
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
            `;
        const shoeSubmit = document.getElementById("shoe_submit");
        shoeSubmit.addEventListener('click', e => {
            e.preventDefault();
            shoeModule.sendShoe();
        });
    }
    showPurchaseForm(){
        document.getElementById('content').innerHTML = `
            <legend style="margin-bottom: 20px">PURCHASE</legend>
            <div class="form-group">
                <label for="exampleSelect1" class="form-label mt-4">Shoes</label>
                <select class="form-select" id="selectShoe">
                </select>
            </div>
            <div style= "display: flex; flex-direction: column; justify-content: center">
                <button id = "purchase_submit" class="btn btn-primary" style="margin-top: 30px; width:100%">Buy</button>
            </div>
            `
        const purchaseSubmit = document.getElementById("purchase_submit");
        purchaseSubmit.addEventListener('click', e => {
            e.preventDefault();
            purchaseModule.buying();
            purchaseModule.getShoeOptions();
        });
        purchaseModule.getShoeOptions();
    }
    showChangeClientForm(){
        document.getElementById('content').innerHTML = `
            <legend style="margin-bottom: 20px">Edit client</legend>
            <div class="form-group" style="margin-bottom:20px">
                <label for="exampleSelect1" class="form-label mt-4">Clients</label>
                <select class="form-select" id="selectClient">
                </select>
            </div>
            <legend style="margin-bottom: 20px">Editing</legend>
            <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="client_Name" placeholder="clientName">
                  <label for="floatingInput">Client name</label>
                   <div class="invalid-feedback d-none" id="error_clientName">Wrong Name</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="client_Surname" placeholder="client_Surname">
                  <label for="floatingInput">Client surname</label>
                   <div class="invalid-feedback d-none" id="error_client_Surname">Wrong surname</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="number" class="form-control" id="client_Number" placeholder="client_Number">
                  <label for="floatingInput">Client number</label>
                   <div class="invalid-feedback d-none" id="error_client_Number">Wrong number</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="client_Login" placeholder="client_Login">
                  <label for="floatingInput">Client login</label>
                   <div class="invalid-feedback d-none" id="error_client_Login">Wrong login</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="password" class="form-control" id="client_Password" placeholder="client_Password">
                  <label for="floatingInput">Client password</label>
                   <div class="invalid-feedback d-none" id="error_client_Password">Wrong password</div>
            </div>
            <div class="form-group" style="margin-bottom:15px">
                <select class="form-select" id="selectLevel">
                    <option value = "USER">USER</option>
                    <option value = "SELLER">SELLER</option>
                    <option value = "ADMINISTRATOR">ADMINISTRATOR</option>
                </select>
                <div class="invalid-feedback d-none" id="error_client_Level">Wrong level</div>
            </div>
            <div style= "display: flex; flex-direction: column; justify-content: center">
                <button id = "change_submit" class="btn btn-primary" style="margin-top: 30px; width:100%">Change</button>
            </div>
            `;
        const clientSelect = document.getElementById('selectClient');
        clientSelect.addEventListener('change', e => {
            e.preventDefault();
            if(document.getElementById('selectClient').value !== ''){
                changeClientModule.fillInputs();
            }else{
                changeClientModule.emptyInputs()
            }
        });
//        const registerSubmit = document.getElementById("register_submit");
//        registerSubmit.addEventListener('click', e => {
//            e.preventDefault();
//            changeClientModule.change();
//            changeClientModule.getClientOptions();
//        });
        changeClientModule.getClientOptions();
    }
}
const viewModule = new ViewModule();
export {viewModule};