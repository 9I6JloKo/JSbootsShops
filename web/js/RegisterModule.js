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
                     
        })
    }
}
const registerModule = new RegisterModule();
export {registerModule}


