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

// //***** forEach *****//
//
// const testArrayFE = [1,2,4,8,16]
// testArrayFE.forEach( (value,index,array) => {
//     let output  = `Index - ${index} : Value - ${value}`;
//     Console.log(output); console.log(output);
// })
//
// function doubleValues(inputArray) {
//     let returnArray = [];
//     inputArray.forEach(
//         (value,index,array) =>
//         {
//             returnArray.push(2*value);
//         }
//     );
//     return returnArray
// }
//
// Console.log(doubleValues(testArrayFE));
// console.log("Doubled Values", doubleValues(testArrayFE));
//
// //***** Every *****//
//
// //Accepts only boolean values
// const testArrayE = [-1,-2,-3];
//
//
// const everyFn1 = testArrayE.every(
//     (value,index, array) =>
//         {
//             return value < 0;
//         }
//     );
// console.log("Every Method (Numbers below 0)", testArrayE, "Results:", everyFn1);
//
// const everyFn2 = testArrayE.every(
//     (value,index, array) =>
//     {
//         return value > -2;
//     }
// );
// console.log("Every Method (Numbers greater than -2)", testArrayE, "Results:", everyFn2);
//
//
// //Checks to see if all values are lower case!
// function allLowerCase(string) {
//
//     //Split Converts String into Array of Characters
//     //Return True if Every Value is lower case
//     return string.split("").every(
//         (value, index, array) =>
//         {
//
//             return value === value.toLowerCase();
//         });
// }
//
// const str1 = "this is a sentence";
// console.log(`Every Method (All Lowercase) 1: ${str1} > `, allLowerCase(str1));
// const str2 = "Today is Thursday";
// console.log(`Every Method (All Lowercase) 2: ${str2} > `, allLowerCase(str2));
//
// //Check to see if all Array Values are arrays themselves
// function allArray(inputArray) {
//     return inputArray.every(Array.isArray);
// }
//
// const arr1 = [ [1,2] , ["Dog","Cat"] , [3], [true] ];
// console.log(`Every Method (All Array Values are also Arrays) 1:`, arr1, ` > `, allArray(arr1));
// const arr2 = [ [1,2] , ["Dog","Cat"] , [3,4], [true,false] ];
// console.log(`Every Method (All Array Values are also Arrays) 1:`, arr2 , ` > `, allArray(arr1));
//
// //***** Some *****//
// const testArrayS = [10,20,30];
//
// //If Some Values in an Array are Less than 20
// function someFn1(inputArray) {
//     return inputArray.some(
//             (value, index, array) =>
//                 {
//                     return value < 20;
//                 }
//             );
// }
//
// console.log(`Some Method (Some Array Values less than 20 ):`, testArrayS , ` > `, someFn1(testArrayS));
//
// //If Some Values in an Array are Less than 5
// function someFn2(inputArray) {
//     return inputArray.some(
//         (value, index, array) =>
//         {
//             return value < 5;
//         }
//     );
// }
//
// console.log(`Some Method (Some Array Values less than 5 ):`, testArrayS , ` > `, someFn2(testArrayS));
//
// //If Some Values in an Array are perfectly divisble by 2 AKA Even
// function hasSomeEvenNum(inputArray) {
//     return inputArray.some(
//         (value, index, array) =>
//         {
//             return value%2 === 0;
//         }
//     );
// }
//
// console.log(`Some Method (Some Array Values are Even and Divisible by 2 ):`, testArrayS , ` > `, hasSomeEvenNum(testArrayS));

//Filter
//Returns a subset of the array for elements that satisfy the filter

//Test 1: Numbers Greater than 2
function filterGreaterThanTwo (array) {
    return array.filter( (value) => {
        return value > 2
    });
}
let testArray = [1,2,3,4];

console.log(`Filter Numbers Greater than 2 - ${testArray} - Results: ${filterGreaterThanTwo(testArray)} `);

//Test 2: Names Larger than 4
function filterNamesLongerThanFour (array) {
    return array.filter( (value) => {
        return value.length >= 4;
    });
}
testArray = ["Jay", "Carrie", "Anna", "Jayanth", "Annadurai"];

console.log(`Filter Names Longer than 4 Chars - ${testArray} - Results: ${filterNamesLongerThanFour(testArray)} `);


//Test 3: Filter Only 300s Level Classes
function filterMajorClasses (array) {
    return array.filter( (value) => {
        //Separate the Class Level by using a Substring
        return value.substring(1,2) >= 3;
    });
}
testArray = ['N125','N215','N220','N317', 'N320', 'N423'];

console.log(`Filter 300+ Level Courses - ${testArray} - Results: ${filterMajorClasses(testArray)} `);


//Test 4: Check if Students are Employed
function antiFilterStudents (students,property) {
    return students.filter( (value) => {
        //Note that this will return correctly when the property doesn't exist OR is false innately
        return !value[property];
    });
}

let students = [
    {first: "Greg", last: "Smith", employed: true,},
    {first: "Sally", last: "Richards"},
    {first: "Jake", last: "Farmer", employed: true,},
    {first: "Kelce", last: "Rogers", employed: false,}
]
console.log(`Filter Unemployed Students - `,students, `- Results:`, antiFilterStudents(students,"employed"));

//Map
//Walks through an Array and Applies a Function
testArray = [2,3,4,5,6];

function mapCubedNums(array) {
    return array.map( (value,index) => {
        return { original: index, cube: value^3 }
    });
}
console.log(`Map Num Array into Cubed Num Array - `,testArray,` - Results: `,mapCubedNums(testArray));