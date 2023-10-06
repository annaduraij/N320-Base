/**
 * Author: Jay Annadurai
 * Date: 11 Sep 2023
 * File: app.js
 * Project: N320-Base
 * Description: Array Methods Challenge
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


//***** Code Challenge *****//

//Test String
const testStringZ = "Zephyr is the God of the West Wind!"

//hasAZ - True if string has at least one z
function hasZ(string) {
    //Split Converts String into Array of Characters
    //Return True if Every Value is lower case
    return string.split("").some(
        (value, index, array) =>
        {
            //Lowercase it before checking
            return "z" === value.toLowerCase();
        });
}
console.log("String has a Z? - ", testStringZ, " - Results:", hasZ(testStringZ));


//Test Array
const testArrayOO =  [1,3,9]


//hasOnlyOdd - True if every number in the array is odd
function hasOnlyOdd(array) {
    return array.every(
        (value,index, array) =>
        {
            return value%2 !== 0;
        }
    );
}
console.log("Array of only odd numbers?", testArrayOO, "Results:", hasOnlyOdd(testArrayOO));