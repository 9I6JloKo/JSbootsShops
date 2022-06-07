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
    fillImg(){
        let shoeId;
        try{
            if(document.getElementById('selectShoe').value !== ''){
                shoeId = document.getElementById('selectShoe').value;
            }
        }catch(e){
        }
        const shoe = {
            "shoeId": shoeId
        }
        let promise = fetch("fillInputsPicture",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            body: JSON.stringify(shoe)
        });
        promise.then(response => response.json())
                .then(response => {
                    if(response.status){
                        console.log(response.pathToFile)
                        try{
                            document.getElementById('imgShoe').src = response.pathToFile;
                        }catch(e){
                            document.getElementById('info').innerHTML = "error";
                        }
                    }else{
                        document.getElementById('info').innerHTML = "picture is not available";
                    }
        })
    }
    emptyImg(){
        document.getElementById('imgShoe').src = "";
    }
}
const purchaseModule = new PurchaseModule();
export {purchaseModule};