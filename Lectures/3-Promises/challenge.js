//Import Classes to Build HTML via JS

//Define Path to Root
const pathToRoot = '../../'

//Import the Modules
import {HTMLasJS,HJShortcuts, UtilJ,Console} from "../../Library/Modules/HTMLasJS.js";

//Inject CSS into the Head
HJShortcuts.injectCSS(pathToRoot);

//Build a Wrapper onto the Page
let wrapperHTML = HJShortcuts.buildWrapper();




//Async Function to have three separate promises with respective delays
async function allThree(){

    //Define the Specs of Each Promise
    let requirements = [
        {label: "First", delay: 1000 },
        {label: "Second", delay: 2000 },
        {label: "Third", delay: 3000 }
    ]

    //Define an Array of Promises for the Promise.all
    let promises = []

    //For each required promise, build the appropriate promise!
    for (const timeOut of requirements) {

        //Create the Promise
        const timeOutPromise = new Promise((resolve, reject) => {
            //Create a timeout to delay before console.log
            setTimeout( () => {
                console.log(`${timeOut.label} Promise!`);
                //On Resolve, Log the Message
                resolve(`${timeOut.label} Promise Fulfilled!`);
            },timeOut.delay);
        });

        //Add the individual Promise to the array of Promises
        promises.push(timeOutPromise);
    }

    //Bind all the promises together
    const combinedPromise = Promise.all(promises);

    //Return the Combined Promise to the calling function
    return combinedPromise;
}

//Final Return Data Function
async function returnData() {
    //This will be a resolved promise all
    let data = await allThree();
    //Log the Data to the console
    console.log(data);
}

//Initiate the Stack
returnData();

//My Attempt
//Promise with a setTimeout
//Notice there is no explicit conditional logic to guide whether it is resolved or rejected | it will always resolve
// const timeoutPromise = new Promise( (resolveFunction,rejectFunction) => {
//     console.log(`setTimeout Promise Initiated`);
//     setTimeout( () => { resolveFunction(UtilJ.random(0,10))}, 2000);
// });

//
// const sequentialPromises = () => {
//     const oneSecPromise = new Promise( (resolveFunction,rejectFunction) => {
//         let delay = 1000;
//         console.log(`${delay/1000} Second Promise Initiated!`);
//         setTimeout( () => { resolveFunction(`${delay/1000} Second Promise Fulfilled!`) }, delay);
//     });
//
//     const twoSecPromise = new Promise( (resolveFunction,rejectFunction) => {
//         let delay = 2000;
//         console.log(`${delay/1000} Second Promise Initiated!`);
//         setTimeout( () => { resolveFunction(`${delay/1000} Second Promise Fulfilled!`) }, delay);
//     });
//
//     const threeSecPromise = new Promise( (resolveFunction,rejectFunction) => {
//         let delay = 3000;
//         console.log(`${delay/1000} Second Promise Initiated!`);
//         setTimeout( () => { resolveFunction(`${delay/1000} Second Promise Fulfilled!`) }, delay);
//     });
//
//     //Promise Chain
//     threeSecPromise.then((data) => {
//         twoSecPromise.then((data) => {
//             oneSecPromise.then((data) => {
//                 // console.log(`All Data Arrived!`);
//                 return `All Data Arrived!`;
//             })
//         })
//     })
//
// };
//
// sequentialPromises();
//
// async function results() {
//     console.log(`Waiting for Results!`);
//     const results = await sequentialPromises();
//     console.log(results);
// }
//
// results();
//
// // //Resolution Function
// // timeoutPromise.then((data) => {
// //     console.log(`setTimeout Promise Resolved: ${data}`);
// // })


