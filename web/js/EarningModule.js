class EarningModule {
    calculate(){
        const monthId = document.getElementById('selectMonth').value;
        const monthIdJson = {
            'monthId': monthId,
        }
        let promise = fetch('calculateEarning', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            body:
                JSON.stringify(monthIdJson)
        })
        promise.then(response => response.json())
                .then(response => {
                    if(response.earning === undefined){
                        response.earning = 0;
                    }
                    document.getElementById('client_Earning').innerHTML = response.earning + '$';
        })
    }
}
const earningModule = new EarningModule();
export {earningModule}
