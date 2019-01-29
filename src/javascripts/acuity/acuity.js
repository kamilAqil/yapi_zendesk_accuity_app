import Acuity from 'acuityscheduling';
// import axios 
import axios from 'axios'

let acuity = Acuity.basic({
    userId: process.env.ACUITY_USER_ID,
    apiKey: process.env.ACUITY_API_KEY
});

let acuityOptions = {
    headers : {
        'Access-Control-Allow-Origin': 'http://localhost:4567',
        'Access-Control-Allow-Credentials':'true'
    }
}




// acuity.request('/appointments', acuityOptions, function (err, res, appointments) {
//     if (err) return console.error(err);
//     console.log(appointments);
// });

console.log(JSON.stringify(acuity.request('/appointments', acuityOptions, function (err, res, appointments) {
    if (err) return console.error(err);
    console.log(appointments);
})));

console.log(`process.env.ACUITY_USER_ID:${process.env.ACUITY_USER_ID}`)
console.log(`process.env:${JSON.stringify(process.env)}`);
export default acuity;



