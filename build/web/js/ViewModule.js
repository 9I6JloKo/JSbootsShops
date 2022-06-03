import {loginModule} from "./LoginModule.js";
import {shoeModule} from "./ShoeModule.js";
import {registerModule} from "./RegisterModule.js";
import {purchaseModule} from "./PurchaseModule.js";
import {changeClientModule} from "./ChangeClientModule.js"
import {shoeOptionsModule} from "./ShoeOptionsModule.js"
import {clientOptionsModule} from "./ClientOptionsModule.js"
import {changeShoeModule} from "./ChangeShoeModule.js"
import {earningModule} from "./EarningModule.js"
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
                  <input type="number" step = "0.01" class="form-control" id="client_Money" placeholder="client_Money">
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
                  <input type="number" step = "0.01" class="form-control" id="ShoePrice" placeholder="ShoePrice(dollars)">
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
        });
        shoeOptionsModule.getShoeOptions();
    }
    showChangeClientForm(){
        document.getElementById('content').innerHTML = `
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
                  <input type="number" step = "0.01" class="form-control" id="client_Money" placeholder="client_Money">
                  <label for="floatingInput">Money(dollars)</label>
                   <div class="invalid-feedback d-none" id="error_client_Money">Wrong money</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="client_Login" placeholder="client_Login">
                  <label for="floatingInput">Client login</label>
                   <div class="invalid-feedback d-none" id="error_client_Login">Wrong login</div>
            </div>
            <div class="form-floating mb-3">
                  <input class="form-control" type="password" id="client_Password" placeholder="client_Password">
                  <label for="floatingInput">Client password</label>
            </div>
            <div class="form-group" style="margin-bottom:15px">
                <select class="form-select" id="selectLevel">
                    <option value = "">Choose option, please</option>
                    <option value = "USER">USER</option>
                    <option value = "MANAGER">MANAGER</option>
                    <option value = "SECADMIN">SECADMIN</option>
                </select>
                <div class="invalid-feedback d-none" id="error_selectLevel">Wrong level</div>
            </div>
            <div style= "display: flex; flex-direction: column; justify-content: center">
                <button id = "change_submit_client" class="btn btn-primary" style="margin-top: 30px; width:100%">Change</button>
            </div>
            `;
        const clientSelect = document.getElementById('selectClient');
        clientSelect.addEventListener('change', e => {
            e.preventDefault();
            if(document.getElementById('selectClient').value !== ''){
                changeClientModule.fillInputs();
            }else{
                changeClientModule.emptyInputs();
            }
        });
        const changeSubmitClient = document.getElementById("change_submit_client");
        changeSubmitClient.addEventListener('click', e => {
            e.preventDefault();
            if(document.getElementById('selectClient').value !== ''){
                changeClientModule.edit();
            }else{
                document.getElementById('info').innerHTML = "Choose client you want, please";
            }
        });
        clientOptionsModule.getClientOptions();
    }
    showChangeShoesForm(){
        document.getElementById('content').innerHTML = `
            <div class="form-group">
                <label for="exampleSelect1" class="form-label mt-4">Shoes</label>
                <select class="form-select" id="selectShoe">
                </select>
            </div>
            <legend style="margin-bottom: 20px; margin-top: 20px">Editing</legend>
            <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="shoeFirm" placeholder="shoeFirm">
                  <label for="floatingInput">shoeFirm</label>
                   <div class="invalid-feedback d-none" id="error_shoeFirm">Wrong shoeFirm</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="shoeModell" placeholder="shoeModell">
                  <label for="floatingInput">shoeModell</label>
                   <div class="invalid-feedback d-none" id="error_shoeModell">Wrong shoeModell</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="number" class="form-control" id="ShoeSize" placeholder="ShoeSize(european)">
                  <label for="floatingInput">ShoeSize(european)</label>
                   <div class="invalid-feedback d-none" id="error_ShoeSize">Wrong ShoeSize</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="number" step = "0.01" class="form-control" id="ShoePrice" placeholder="ShoePrice(dollars)">
                  <label for="floatingInput">ShoePrice(dollars)</label>
                   <div class="invalid-feedback d-none" id="error_ShoePrice">Wrong ShoePrice</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="number" class="form-control" id="ShoeCount" placeholder="ShoeCount(in pairs)">
                  <label for="floatingInput">ShoeCount(in pairs)</label>
                   <div class="invalid-feedback d-none" id="error_ShoeCount">Wrong ShoeCount</div>
            </div>
            <div style= "display: flex; flex-direction: column; justify-content: center">
                <button id = "change_submit_Shoe" class="btn btn-primary" style="margin-top: 30px; width:100%">Change</button>
            </div>
            `;
        const selectShoe = document.getElementById('selectShoe');
        selectShoe.addEventListener('change', e => {
            e.preventDefault();
            if(document.getElementById('selectShoe').value !== ''){
                changeShoeModule.fillInputs();
            }else{
                changeShoeModule.emptyInputs();
            }
        });
        const changeSubmitShoe = document.getElementById("change_submit_Shoe");
        changeSubmitShoe.addEventListener('click', e => {
            e.preventDefault();
            if(document.getElementById('selectShoe').value !== ''){
                changeShoeModule.edit();
            }else{
                document.getElementById('info').innerHTML = "Choose shoe you want, please";
            }
        });
        shoeOptionsModule.getShoeOptions();
    }
    showEarning(){
        document.getElementById('content').innerHTML = `
            <div class="form-group">
                <label for="exampleSelect1" class="form-label mt-4">Months</label>
                <select class="form-select" id="selectMonth">
                    <option value = "0">Choose month</option>
                    <option value = "1">January</option>
                    <option value = "2">February</option>
                    <option value = "3">March</option>
                    <option value = "4">Aprill</option>
                    <option value = "5">May</option>
                    <option value = "6">June</option>
                    <option value = "7">July</option>
                    <option value = "8">August</option>
                    <option value = "9">September</option>
                    <option value = "10">October</option>
                    <option value = "11">November</option>
                    <option value = "12">December</option>
                     <option value = "13">Shop earning</option>
                </select>
            </div>
            <div class="form-group">
<!--            <fieldset>
              <label class="form-label mt-4" for="readOnlyInput">Earning</label>
              <input class="form-control" id="client_Earning" type="text" value = "" placeholder="Earning for this period of time is..." readonly="">
            </fieldset> 
          </div> -->
                    <p id="client_Earning" style = "border: 2px solid lightgrey; width: 100%; margin-top: 30px; border-radius: 5px; padding: 5px 15px; text-align:center; text-transform:uppercase; letter-spacing: 5px">Earning</p>
            `
        const selectMonth = document.getElementById('selectMonth');
        selectMonth.addEventListener('change', e => {
            e.preventDefault();
            if(document.getElementById('selectMonth').value !== '0'){
                earningModule.calculate();
            }else{
                document.getElementById('earning').value = '';
            }
        })
    }
    showEditMyself(){
        document.getElementById('content').innerHTML = `
            <legend style="margin-bottom: 20px">Editing myself</legend>
            <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="client_Name" placeholder="clientName">
                  <label for="floatingInput">Name</label>
                   <div class="invalid-feedback d-none" id="error_clientName">Wrong Name</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="client_Surname" placeholder="client_Surname">
                  <label for="floatingInput">Surname</label>
                   <div class="invalid-feedback d-none" id="error_client_Surname">Wrong surname</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="number" class="form-control" id="client_Number" placeholder="client_Number">
                  <label for="floatingInput">Number</label>
                   <div class="invalid-feedback d-none" id="error_client_Number">Wrong number</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="number" step = "0.01" class="form-control" id="client_Money" placeholder="client_Money">
                  <label for="floatingInput">Money(dollars)</label>
                   <div class="invalid-feedback d-none" id="error_client_Money">Wrong money</div>
            </div>
            <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="client_Login" placeholder="client_Login">
                  <label for="floatingInput">Login</label>
                   <div class="invalid-feedback d-none" id="error_client_Login">Wrong login</div>
            </div>
            <div class="form-floating mb-3">
                  <input class="form-control" type="password" id="client_Password" placeholder="client_Password">
                  <label for="floatingInput">Password</label>
            </div>
            <div style= "display: flex; flex-direction: column; justify-content: center">
                <button id = "change_submit_client" class="btn btn-primary" style="margin-top: 30px; width:100%">Change</button>
            </div>
            `;
        changeClientModule.fillInputs();
        const changeSubmitClient = document.getElementById("change_submit_client");
        changeSubmitClient.addEventListener('click', e => {
            e.preventDefault();
                changeClientModule.edit();
        });
    }
}
const viewModule = new ViewModule();
export {viewModule};