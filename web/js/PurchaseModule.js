import {shoeOptionsModule} from "./ShoeOptionsModule.js"
class PurchaseModule {
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
                    shoeOptionsModule.getShoeOptions();
        });
    }
}
const purchaseModule = new PurchaseModule();
export {purchaseModule};