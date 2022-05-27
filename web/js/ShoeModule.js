class ShoeModule {
    sendShoe(){
        const ShoeFirm = document.getElementById('ShoeFirm');
        const ShoeModell = document.getElementById('ShoeModell');
        const ShoePrice = document.getElementById('ShoePrice');
        const ShoeCount = document.getElementById('ShoeCount');
        const ShoeSize = document.getElementById('ShoeSize');
        const shoe = {
            'ShoeFirm': ShoeFirm,
            'ShoeModell': ShoeModell,
            'ShoePrice': ShoePrice,
            'ShoeCount': ShoeCount,
            'ShoeSize': ShoeSize
        }
        const promise = fetch('sendShoe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            body: JSON.stringify(shoe)
        });
        promise.then(response => response.json).
                then(response => {
                    
        })
    }
}
const shoeModule = new ShoeModule();
export{shoeModule}