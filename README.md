# dpd-tracking
Simple Node-parser for tracking the tracks of the postal service DPD
Only dpd.ru

### Install ###

```
npm install dpd-tracking
```   

### Basic Usage ###
```js
const dpd = require('dpd-tracking')

dpd("YOUR TRACK-NUMBER")
    .then(response => {
        const { trackInfo, info } = response;
        console.log(trackInfo); 
        console.log(info);
    })
    .catch(e => console.log(e))
    
/*
{
    trackInfo: '✅Заказ оформлен.\n' +
    '✅Отправка принята у отправителя.\n' +
    '✅Отправка готова к транспортировке по маршруту.\n' +
    '✅Отправка следует по маршруту.\n' +
    '✅Отправка готова для выдачи получателю.\n' +
    '✅Доставлено.\n',
    info: {
        deliveryVariant: 'до пункта выдачи',
        deliveryDateIn: '13.04.2020',
        deliveryDateOut: '23.04.2020',
        deliveryCity: 'Павлодар'
    }
}
*/
```

### Tests ###
```
git clone https://github.com/kdanet/dpd-tracking
cd dpd-tracking/
npm test
```
