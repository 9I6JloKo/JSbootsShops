class RegisterModule {
    register(){
        const clientName = document.getElementById('client_Name').value;
        const clientSurname = document.getElementById('client_Surname').value;
        const clientNumber = document.getElementById('client_Number').value;
        const clientMoney = document.getElementById('client_Money').value;
        const clientLogin = document.getElementById('client_Login').value;
        const clientPassword = document.getElementById('client_Password').value;
        const client = {
            "clientName": clientName,
            "clientSurname": clientSurname,
            "clientNumber": clientNumber,
            "clientMoney": clientMoney,
            "clientLogin": clientLogin,
            "clientPassword": clientPassword
        }
        const promise = fetch('sendClient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            body: JSON.stringify(client)
        });
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
                    if(response.done){
                        const massiveClient = document.getElementsByClassName('form-control');
                        for(let i = 0; i < massiveClient.length; i++){
                            massiveClient[i].value = ""; 
                        }
                        document.getElementById('info').innerHTML = "SUCCESSFUL!";
                    }else{
                        if(!response.clientName){
                            document.getElementById('error_clientName').classList.remove('d-none');
                            document.getElementById('client_Name').classList.add('is-invalid');
                        }
                        else if(!response.clientSurname){
                            document.getElementById('error_client_Surname').classList.remove('d-none');
                            document.getElementById('client_Surname').classList.add('is-invalid');
                        }
                        else if(!response.clientNumber){
                            document.getElementById('error_client_Number').classList.remove('d-none');
                            document.getElementById('client_Number').classList.add('is-invalid');
                        }
                        else if(!response.clientMoney){
                            document.getElementById('error_client_Money').classList.remove('d-none');
                            document.getElementById('client_Money').classList.add('is-invalid');
                        }
                        else if(!response.clientLogin){
                            document.getElementById('error_client_Login').classList.remove('d-none');
                            document.getElementById('client_Login').classList.add('is-invalid');
                        }
                        else if(!response.clientPassword){
                            document.getElementById('error_client_Password').classList.remove('d-none');
                            document.getElementById('client_Password').classList.add('is-invalid');
                        }else if(response.infoforif){
                            document.getElementById('info').innerHTML = "This login is already exists";
                        }
                    }
        });
    }
}
const registerModule = new RegisterModule();
export {registerModule}


