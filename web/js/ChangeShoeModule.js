import {shoeOptionsModule} from "./ShoeOptionsModule.js"
class ChangeShoeModule {
    fillInputs(){
        const shoeId = document.getElementById('selectShoe').value;
        const shoe = {
            "shoeId": shoeId
        }
        let promise = fetch("fillInputsShoes",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            body: JSON.stringify(shoe)
        });
        promise.then(response => response.json())
                .then(response => {
                    if(response.status){
                        document.getElementById('shoeFirm').value = response.shoe.productFirm;
                        document.getElementById('shoeModell').value = response.shoe.productModell;
                        document.getElementById('ShoeSize').value = response.shoe.productSize;
                        document.getElementById('ShoePrice').value = response.shoe.productPrice;
                        document.getElementById('ShoeCount').value = response.shoe.productPiece;
                    }
        })
    }
    emptyInputs(){
        document.getElementById('shoeFirm').value = "";
        document.getElementById('shoeModell').value = "";
        document.getElementById('ShoeSize').value = "";
        document.getElementById('ShoePrice').value = "";
        document.getElementById('ShoeCount').value = "";
    }
    edit(){
        const shoeFirm_edit = document.getElementById('shoeFirm').value;
        const shoeModell_edit = document.getElementById('shoeModell').value;
        const shoeSize_edit = document.getElementById('ShoeSize').value;
        const shoePrice_edit = document.getElementById('ShoePrice').value;
        const shoeCount_edit = document.getElementById('ShoeCount').value;
        const shoeId_edit = document.getElementById('selectShoe').value;
        const shoeEdit = {
            'shoeFirm_edit': shoeFirm_edit,
            'shoeModell_edit': shoeModell_edit,
            'shoeSize_edit': shoeSize_edit,
            'shoePrice_edit': shoePrice_edit,
            'shoeCount_edit': shoeCount_edit,
            'shoeId_edit': shoeId_edit,
        }
        let promise = fetch("editShoe", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            body:
                JSON.stringify(shoeEdit)
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
                    if(response.done){
                        document.getElementById('info').innerHTML = "SUCCESSFUL!";
                        shoeOptionsModule.getShoeOptions();
                    }else{
                          if(!response.shoeFirmEdit){
                            document.getElementById('error_shoeFirm').classList.remove('d-none');
                            document.getElementById('shoeFirm').classList.add('is-invalid');
                        }
                        else if(!response.shoeModellEdit){
                            document.getElementById('error_shoeModell').classList.remove('d-none');
                            document.getElementById('shoeModell').classList.add('is-invalid');
                        }
                        else if(!response.shoeSizeEdit){
                            document.getElementById('error_ShoeSize').classList.remove('d-none');
                            document.getElementById('ShoeSize').classList.add('is-invalid');
                        }
                        else if(!response.shoePriceEdit){
                            document.getElementById('error_ShoePrice').classList.remove('d-none');
                            document.getElementById('ShoePrice').classList.add('is-invalid');
                        }
                        else if(!response.shoeCountEdit){
                            document.getElementById('error_ShoeCount').classList.remove('d-none');
                            document.getElementById('ShoeCount').classList.add('is-invalid');
                        }
                    }
                    
        })
    }
}
const changeShoeModule = new ChangeShoeModule();
export {changeShoeModule}