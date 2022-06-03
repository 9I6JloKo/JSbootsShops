import {clientOptionsModule} from "./ClientOptionsModule.js"
class ChangeClientModule {
    fillInputs(){
        let clientId;
        try{
            if(document.getElementById('selectClient').value !== ''){
                clientId = document.getElementById('selectClient').value;
            }
        }catch(e){
            clientId = JSON.parse(sessionStorage.getItem('user')).id.toString();
        }
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
                        try{
                            document.getElementById('selectLevel').value = response.client.level;   
                        }catch(e){
                            
                        }
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
        document.getElementById('selectLevel').value = "";
    }
    edit(){
        const clientName_edit = document.getElementById('client_Name').value;
        const clientSurname_edit = document.getElementById('client_Surname').value;
        const clientNumber_edit = document.getElementById('client_Number').value;
        const clientMoney_edit = document.getElementById('client_Money').value;
        const clientLogin_edit = document.getElementById('client_Login').value;
        const clientPassword_edit = document.getElementById('client_Password').value;
        let clientLevel_edit = '';
        let clientId_edit;
        let try_myself = '0';
        try{
            if(document.getElementById('selectClient').value !== ''){
                 clientId_edit = document.getElementById('selectClient').value;
                clientLevel_edit = document.getElementById('selectLevel').value;
            }
        }catch(e){
            clientId_edit = JSON.parse(sessionStorage.getItem('user')).id.toString();
            try_myself = '1';
        }
        const clientEdit = {
            'clientName_edit': clientName_edit,
            'clientSurname_edit': clientSurname_edit,
            'clientNumber_edit': clientNumber_edit,
            'clientMoney_edit': clientMoney_edit,
            'clientLogin_edit': clientLogin_edit,
            'clientPassword_edit': clientPassword_edit,
            'clientLevel_edit': clientLevel_edit,
            'clientId_edit': clientId_edit,
            'try_myself': try_myself,
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
                        if(response.insertOptionsTrue){
                            clientOptionsModule.getClientOptions();
                        }
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
                        else if(!response.clientLevelEdit){
                            document.getElementById('error_selectLevel').classList.remove('d-none');
                            document.getElementById('selectLevel').classList.add('is-invalid');
                        }
                    }
                    
        })
    }
}
const changeClientModule = new ChangeClientModule();
export {changeClientModule}