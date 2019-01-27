import Acuity from 'acuityscheduling';



let acuity = Acuity.basic({
    userId: process.env.ACUITY_USER_ID,
    apiKey: process.env.ACUITY_API_KEY
});

console.log(`process.env.ACUITY_USER_ID:${process.env.ACUITY_USER_ID}`)
console.log(`process.env:${JSON.stringify(process.env)}`);
export default acuity;



// acuity.request('/appointments', function (err, res, appointments) {
//     if (err) return console.error(err);
//     console.log(appointments);
// });
