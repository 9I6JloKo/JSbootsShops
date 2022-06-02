import {clientOptionsModule} from "./ClientOptionsModule.js"
class ChangeClientModule {
    fillInputs(){
        const clientId = document.getElementById('selectClient').value;
        const client = {
            "clientId": clientId
        }
        let promise = fetch("fillInputsClient",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            body: JSON.stringify(client)
        });
        promise.then(response => response.json())
                .then(response => {
                    if(response.status){
                        document.getElementById('client_Name').value = response.client.firstname;
                        document.getElementById('client_Surname').value = response.client.lastname;
                        document.getElementById('client_Number').value = response.client.number;
                        document.getElementById('client_Money').value = response.client.money;
                        document.getElementById('client_Login').value = response.client.login;
                        document.getElementById('selectLevel').value = response.client.level;
                    }
        })
    }
    emptyInputs(){
        document.getElementById('selectClient').value = "";
        document.getElementById('client_Name').value = "";
        document.getElementById('client_Surname').value = "";
        document.getElementById('client_Number').value = "";
        document.getElementById('client_Money').value = "";
        document.getElementById('client_Password').value = "";
        document.getElementById('client_Login').value = "";
        document.getElementById('client_Level').value = "";
    }
    edit(){
        const clientName_edit = document.getElementById('client_Name').value;
        const clientSurname_edit = document.getElementById('client_Surname').value;
        const clientNumber_edit = document.getElementById('client_Number').value;
        const clientMoney_edit = document.getElementById('client_Money').value;
        const clientLogin_edit = document.getElementById('client_Login').value;
        const clientPassword_edit = document.getElementById('client_Password').value;
        const clientLevel_edit = document.getElementById('selectLevel').value;
        const clientId_edit = document.getElementById('selectClient').value;
        const clientEdit = {
            'clientName_edit': clientName_edit,
            'clientSurname_edit': clientSurname_edit,
            'clientNumber_edit': clientNumber_edit,
            'clientMoney_edit': clientMoney_edit,
            'clientLogin_edit': clientLogin_edit,
            'clientPassword_edit': clientPassword_edit,
            'clientLevel_edit': clientLevel_edit,
            'clientId_edit': clientId_edit,
        }
        let promise = fetch("editClient", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            body:
                JSON.stringify(clientEdit)
        })
        promise.then(response => response.json())
                .then(response => {
                    const invalidLabel = document.getElementsByClassName('invalid-feedback');
                    const invalidInput = document.getElementsByClassName('form-control');
                    for(let i = 0; i < invalidLabel.length; i++){
                            if(!invalidLabel[i].classList.contains('d-none')){
                                invalidLabel[i].classList.add('d-none');
                            }
                            if(invalidInput[i].classList.contains('is-invalid')){
                                invalidInput[i].classList.remove('is-invalid');
                            }
                    }
                    if(response.status){
                        document.getElementById('info').innerHTML = "SUCCESSFUL!";
                        clientOptionsModule.getClientOptions();
                    }else{
                          if(!response.clientNameEdit){
                            document.getElementById('error_clientName').classList.remove('d-none');
                            document.getElementById('client_Name').classList.add('is-invalid');
                        }
                        else if(!response.clientSurnameEdit){
                            document.getElementById('error_client_Surname').classList.remove('d-none');
                            document.getElementById('client_Surname').classList.add('is-invalid');
                        }
                        else if(!response.clientNumberEdit){
                            document.getElementById('error_client_Number').classList.remove('d-none');
                            document.getElementById('client_Number').classList.add('is-invalid');
                        }
                        else if(!response.clientMoneyEdit){
                            document.getElementById('error_client_Money').classList.remove('d-none');
                            document.getElementById('client_Money').classList.add('is-invalid');
                        }
                        else if(!response.clientLoginEdit){
                            document.getElementById('error_client_Login').classList.remove('d-none');
                            if(response.clientLoginEditText){
                                document.getElementById('error_client_Login').innerHTML = "This login already exists";
                            }
                            document.getElementById('client_Login').classList.add('is-invalid');
                        }
                    }
                    
        })
    }
}
const changeClientModule = new ChangeClientModule();
export {changeClientModule}