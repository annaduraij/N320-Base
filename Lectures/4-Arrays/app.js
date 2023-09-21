/**
 * Author: Jay Annadurai
 * Date: 11 Sep 2023
 * File: app.js
 * Project: N320-Base
 * Description: Array Methods
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

//Build a HTML Console onto the Page
wrapperHTML.get().appendChild(Console.generateConsole().build());


//***** Array Methods *****//

//***** forEach *****//

const testArrayFE = [1,2,4,8,16]
testArrayFE.forEach( (value,index,array) => {
    let output  = `Index - ${index} : Value - ${value}`;
    Console.log(output); console.log(output);
})

function doubleValues(inputArray) {
    let returnArray = [];
    inputArray.forEach(
        (value,index,array) =>
        {
            returnArray.push(2*value);
        }
    );
    return returnArray
}

Console.log(doubleValues(testArrayFE));
console.log("Doubled Values", doubleValues(testArrayFE));

//***** Every *****//

//Accepts only boolean values
const testArrayE = [-1,-2,-3];


const everyFn1 = testArrayE.every(
    (value,index, array) =>
        {
            return value < 0;
        }
    );
console.log("Every Method (Numbers below 0)", testArrayE, "Results:", everyFn1);

const everyFn2 = testArrayE.every(
    (value,index, array) =>
    {
        return value > -2;
    }
);
console.log("Every Method (Numbers greater than -2)", testArrayE, "Results:", everyFn2);


//Checks to see if all values are lower case!
function allLowerCase(string) {

    //Split Converts String into Array of Characters
    //Return True if Every Value is lower case
    return string.split("").every(
        (value, index, array) =>
        {

            return value === value.toLowerCase();
        });
}

const str1 = "this is a sentence";
console.log(`Every Method (All Lowercase) 1: ${str1} > `, allLowerCase(str1));
const str2 = "Today is Thursday";
console.log(`Every Method (All Lowercase) 2: ${str2} > `, allLowerCase(str2));

//Check to see if all Array Values are arrays themselves
function allArray(inputArray) {
    return inputArray.every(Array.isArray);
}

const arr1 = [ [1,2] , ["Dog","Cat"] , [3], [true] ];
console.log(`Every Method (All Array Values are also Arrays) 1:`, arr1, ` > `, allArray(arr1));
const arr2 = [ [1,2] , ["Dog","Cat"] , [3,4], [true,false] ];
console.log(`Every Method (All Array Values are also Arrays) 1:`, arr2 , ` > `, allArray(arr1));

//***** Some *****//
const testArrayS = [10,20,30];

//If Some Values in an Array are Less than 20
function someFn1(inputArray) {
    return inputArray.some(
            (value, index, array) =>
                {
                    return value < 20;
                }
            );
}

console.log(`Some Method (Some Array Values less than 20 ):`, testArrayS , ` > `, someFn1(testArrayS));

//If Some Values in an Array are Less than 5
function someFn2(inputArray) {
    return inputArray.some(
        (value, index, array) =>
        {
            return value < 5;
        }
    );
}

console.log(`Some Method (Some Array Values less than 5 ):`, testArrayS , ` > `, someFn2(testArrayS));

//If Some Values in an Array are perfectly divisble by 2 AKA Even
function hasSomeEvenNum(inputArray) {
    return inputArray.some(
        (value, index, array) =>
        {
            return value%2 === 0;
        }
    );
}

console.log(`Some Method (Some Array Values are Even and Divisible by 2 ):`, testArrayS , ` > `, hasSomeEvenNum(testArrayS));

//Filter

//Map