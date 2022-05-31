class PurchaseModule {
    getShoeOptions(){
        let promise = fetch("getShoeOptions", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
        });
        promise.then(response => response.json())
                .then(response => {
                    if(response.status){
                        let shoeSelect = document.getElementById('selectShoe');
                        shoeSelect.options.length = 0;
                        let option = null;
                        option = document.createElement('option');
                        option.text = "Сhoose shoes you want";
                        option.value = '';
                        shoeSelect.add(option);
                        for(let i = 0; i < response.options.length; i++){
                            option = document.createElement('option');
                            option.text = response.options[i].productFirm + ' ' + response.options[i].productModell + '; Price: ' + response.options[i].productPrice + '€; Size: ' + response.options[i].productSize + '; Count: ' + response.options[i].productPiece;
                            option.value = response.options[i].id;
                            shoeSelect.add(option);
                        }
                    }else{
                            let shoeSelect = document.getElementById('selectShoe');
                            shoeSelect.options.length = 0;
                            let option = null;
                            option = document.createElement('option');
                            option.text = "We've ran out of shoes, sorry";
                            option.value = '';
                            shoeSelect.add(option);
                        }
                    })
                .catch(error=>{
                    document.getElementById('info').innerHTML = 'Ошибка сервера insertProductOptions: '+error;
                });
    }
    buying(){
        const productId = document.getElementById('selectShoe').value;
        const product = {
            productId:productId
        }
        let promise = fetch("BuyShoe", {
            method:'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            body: JSON.stringify(product)
        });
        promise.then(response => response.json())
                .then(response => {
                    document.getElementById('info').innerHTML = response.info;
        });
    }
}
const purchaseModule = new PurchaseModule();
export {purchaseModule};