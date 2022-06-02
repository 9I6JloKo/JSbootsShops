class ClientOptionsModule{
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
                            option.text = response.options[i].firstname + ' ' + response.options[i].lastname + '; Number: ' + response.options[i].number + '; Money: ' + response.options[i].money + '$; Login: ' + response.options[i].login + '; Password: ' + response.options[i].password + '; Level: ' + response.options[i].level;
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
                    document.getElementById('info').innerHTML = 'Ошибка сервера insertClientOptions: '+error;
                });
    }
}
const clientOptionsModule = new ClientOptionsModule();
export {clientOptionsModule}
