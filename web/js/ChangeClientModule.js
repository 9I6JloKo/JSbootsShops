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
                        document.getElementById('client_Login').value = response.client.login;
                        document.getElementById('selectLevel').value = response.client.level;
                    }else{
                        emptyInputs();
                    }
        })
    }
    emptyInputs(){
        document.getElementById('client_Name').value = "";
        document.getElementById('client_Surname').value = "";
        document.getElementById('client_Number').value = "";
        document.getElementById('client_Login').value = "";
        document.getElementById('client_Password').value = "";
        document.getElementById('client_Level').value = "";
    }
    change(){
        
    }
    getClientOptions(){
        let promise = fetch("getClientOptions", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
        });
        promise.then(response => response.json())
                .then(response => {
                    if(response.status){
                        let clientSelect = document.getElementById('selectClient');
                        clientSelect.options.length = 0;
                        let option = null;
                        option = document.createElement('option');
                        option.text = "Сhoose client you want";
                        option.value = '';
                        clientSelect.add(option);
                        for(let i = 0; i < response.options.length; i++){
                            option = document.createElement('option');
                            option.text = response.options[i].firstname + ' ' + response.options[i].lastname + '; Number: ' + response.options[i].number + '; Login: ' + response.options[i].login + '; Password: ' + response.options[i].password + '; Level: ' + response.options[i].level;
                            option.value = response.options[i].id;
                            clientSelect.add(option);
                        }
                    }else{
                            let clientSelect = document.getElementById('selectClient');
                            clientSelect.options.length = 0;
                            let option = null;
                            option = document.createElement('option');
                            option.text = "We dont have any clients";
                            option.value = '';
                            clientSelect.add(option);
                        }
                    })
                .catch(error=>{
                    document.getElementById('info').innerHTML = 'Ошибка сервера insertProductOptions: '+error;
                });
    }
}
const changeClientModule = new ChangeClientModule();
export {changeClientModule}