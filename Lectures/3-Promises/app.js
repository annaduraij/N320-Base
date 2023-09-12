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
import {HTMLasJS,HJShortcuts, UtilHTML,Console} from "../../Library/Modules/HTMLasJS.js";

//Inject CSS into the Head
HJShortcuts.injectCSS(pathToRoot);

//Build a Wrapper onto the Page
let wrapperHTML = HJShortcuts.buildWrapper();


// Promises
// 3 States: Pending | Fulfilled | Rejected
// Must account for Pending and either Fulfilled or Rejected
// Normally accepts Data from an API

//Callback Functions are argued into the promise
//Constants are typically used to hold Promises
const basicPromise = new Promise((resolveFunction,rejectFunction) => {
    let x = 10;

    if (x===10) {
        resolveFunction();
    }

    else {
        rejectFunction();
    }

});

//'Then' only runs if the promise is fulfilled
basicPromise.then(
    //Will Run on Resolved
    function () {
        wrapperHTML.get().innerHTML += "Basic Promise Resolved";
    },
    //Will Run on Rejected
    function() {
        wrapperHTML.get().innerHTML += "Basic Promise Rejected";
    }
);


//Another basic function using catch
const catchPromise = new Promise((resolveFunction, rejectFunction) => {
    //Generates value from 0 to 0.9999
    let randNum = Math.random();

    if(randNum < 0.5) {
        resolveFunction(randNum);
    }

    else {
        rejectFunction(randNum);
    }

}); //End of Catch Promise

//Notice how the function following the 'then' is the resolution function, and the function following the 'catch' is the rejection function
//You technically can do the promise as above where the rejection function is simply passed as a second argument to the 'then' function
catchPromise.then (
    //Resolve Function
    (num) => {
        console.log(`Catch Promise Resolved: ${num}`)
    }
//Then and uses Catch
).catch(
    //Rejection Function
    (num) => {
        console.log(`Catch Promise Rejected: ${num}`)
    },
);

//Promise with a setTimeout
//Notice there is no explicit conditional logic to guide whether it is resolved or rejected | it will always resolve
const timeoutPromise = new Promise( (resolveFunction,rejectFunction) => {
    console.log(`setTimeout Promise Initiated`);
    setTimeout( () => { resolveFunction(UtilHTML.random(0,10))}, 2000);
});

//Resolution Function
timeoutPromise.then((data) => {
    console.log(`setTimeout Promise Resolved: ${data}`);
})

//Note to the User that the Timeout Function has begun;


//Promise Chaining
const chainPromise = new Promise( (resolveFunction, rejectFunction) => {
    resolveFunction(UtilHTML.random(0,10));
});

//Actual Promise Chain
chainPromise.then((data) => {
    console.log(`Promise Chain 1: ${data}`);
    return data*2;
}).then((data) => {
    console.log(`Promise Chain 2 (x2): ${data}`);
    return data+10;
}).then((data) => {
    console.log(`Promise Chain 3(+10): ${data}`);
});