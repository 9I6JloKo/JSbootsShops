class ShoeModule {
    sendShoe(){
        const formData = new FormData(document.getElementById('shoeForm'));
        const promise = fetch('sendShoe', {
            method: 'POST',
            credentials: 'include',
            body: formData
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
                        const massiveShoe = document.getElementsByClassName('form-control');
                        for(let i = 0; i < massiveShoe.length; i++){
                            massiveShoe[i].value = ""; 
                        }
                                document.getElementById('info').innerHTML = "SUCCESSFUL!"
                    }else{
                        if(!response.shoeFirm){
                            document.getElementById('error_ShoeFirm').classList.remove('d-none');
                            document.getElementById('ShoeFirm').classList.add('is-invalid');
                        }else if(!response.shoeModell){
                            document.getElementById('error_ShoeModell').classList.remove('d-none');
                            document.getElementById('ShoeModell').classList.add('is-invalid');
                        }else if(!response.shoeSize){
                            document.getElementById('error_ShoeSize').classList.remove('d-none');
                            document.getElementById('ShoeSize').classList.add('is-invalid');
                        }
                        else if(!response.shoePrice){
                            document.getElementById('error_ShoePrice').classList.remove('d-none');
                            document.getElementById('ShoePrice').classList.add('is-invalid');
                        }
                        else if(!response.shoeCount){
                            document.getElementById('error_ShoeCount').classList.remove('d-none');
                            document.getElementById('ShoeCount').classList.add('is-invalid');
                        }
                        else if(!response.shoeFile){
                            document.getElementById('error_ShoeFile').classList.remove('d-none');
                            document.getElementById('ShoeFile').classList.add('is-invalid');
                        }
                    }
        });
    }
}
const shoeModule = new ShoeModule();
export{shoeModule}