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
                    document.getElementById('earning').value = response.earning;
        })
    }
}
const earningModule = new EarningModule();
export {earningModule}
