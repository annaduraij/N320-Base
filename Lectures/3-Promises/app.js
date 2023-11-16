/**
 * Author: Jay Annadurai
 * Date: 11 Sep 2023
 * File: app.js
 * Project: N320-Base
 * Description: Promises
 */

//Import Classes to Build HTML via JS

//Define Path to Root
const pathToRoot = '../../'

//Import the Modules
import {HTMLasJS,HJShortcuts, UtilJ,Console} from "../../Library/Modules/HTMLasJS.js";

//Inject CSS into the Head
HJShortcuts.injectCSS(pathToRoot);

//Build a Wrapper onto the Page
let wrapperHTML = HJShortcuts.buildWrapper();

//
// // Promises
// // 3 States: Pending | Fulfilled | Rejected
// // Must account for Pending and either Fulfilled or Rejected
// // Normally accepts Data from an API
//
// //Callback Functions are argued into the promise
// //Constants are typically used to hold Promises
// const basicPromise = new Promise((resolveFunction,rejectFunction) => {
//     let x = 10;
//
//     if (x===10) {
//         resolveFunction();
//     }
//
//     else {
//         rejectFunction();
//     }
//
// });
//
// //'Then' only runs if the promise is fulfilled
// basicPromise.then(
//     //Will Run on Resolved
//     function () {
//         wrapperHTML.get().innerHTML += "Basic Promise Resolved";
//     },
//     //Will Run on Rejected
//     function() {
//         wrapperHTML.get().innerHTML += "Basic Promise Rejected";
//     }
// );
//
//
// //Another basic function using catch
// const catchPromise = new Promise((resolveFunction, rejectFunction) => {
//     //Generates value from 0 to 0.9999
//     let randNum = Math.random();
//
//     if(randNum < 0.5) {
//         resolveFunction(randNum);
//     }
//
//     else {
//         rejectFunction(randNum);
//     }
//
// }); //End of Catch Promise
//
// //Notice how the function following the 'then' is the resolution function, and the function following the 'catch' is the rejection function
// //You technically can do the promise as above where the rejection function is simply passed as a second argument to the 'then' function
// catchPromise.then (
//     //Resolve Function
//     (num) => {
//         console.log(`Catch Promise Resolved: ${num}`)
//     }
// //Then and uses Catch
// ).catch(
//     //Rejection Function
//     (num) => {
//         console.log(`Catch Promise Rejected: ${num}`)
//     },
// );
//
// //Promise with a setTimeout
// //Notice there is no explicit conditional logic to guide whether it is resolved or rejected | it will always resolve
// const timeoutPromise = new Promise( (resolveFunction,rejectFunction) => {
//     console.log(`setTimeout Promise Initiated`);
//     setTimeout( () => { resolveFunction(UtilJ.random(0,10))}, 2000);
// });
//
// //Resolution Function
// timeoutPromise.then((data) => {
//     console.log(`setTimeout Promise Resolved: ${data}`);
// })
//
// //Note to the User that the Timeout Function has begun;
//
//
// //Promise Chaining
// const chainPromise = new Promise( (resolveFunction, rejectFunction) => {
//     resolveFunction(UtilJ.random(0,10));
// });
//
// //Actual Promise Chain
// chainPromise.then((data) => {
//     console.log(`Promise Chain 1: ${data}`);
//     return data*2;
// }).then((data) => {
//     console.log(`Promise Chain 2 (x2): ${data}`);
//     return data+10;
// }).then((data) => {
//     console.log(`Promise Chain 3(+10): ${data}`);
// });
//
//
// //Fetching Data from an External Source
// //Note, ideally a fetch will take as long as necessary to resolve, so it's good practice to add a timeout
//
// //This JSON just has some product information
// const fetchPromise = fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json")
//
// //Check the state of the incoming external data
// console.log("Fetched Promise: ",fetchPromise);
//
// //When it successfully resolves and responds
// fetchPromise.then( (resolveResults) => {
//     //Bind the Data and encode it into JSON into a Promise
//     //Note, when getting json data from an API, it is inherently treated as a promise
//     const jsonPromise = resolveResults.json();
//
//     //Indirect Promise Chaining
//     jsonPromise.then ((jsonData) => {
//         console.log("Fetch Response Data", jsonData);
//     });
// });



async function goChuck() {
    //API Call - Note remember that Fetch is a Promise
    const response = await fetch("https://api.chucknorris.io/jokes/random");

    //Bind the Results as a JSON once the response from the API is acquired
    const results = await response.json()

    //Check the Results
    console.log(results);

    //Return the Results
    return results;
}

goChuck().then( (data) => {

    //Build HTMLasJS Object
    let elementHTML = new HTMLasJS(
        "p",
        {
            id: "NorrisQuote"
        },
        {
            fontSize: "large",
            fontWeight: "bold"
        },
        data.value
    )

    //Build HTML Object onto the Page
    wrapperHTML.get().appendChild(elementHTML.build())
}).catch( (error) => {
    console.log(error);
});