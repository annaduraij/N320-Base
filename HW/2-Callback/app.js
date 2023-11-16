/**
 * Author: Jay Annadurai
 * Date: 11 Sep 2023
 * File: app.js
 * Project: N320-Base
 * Description: Callback Function Example
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

/*
Create a folder called homework-two.
You can either create an html/javascript file pair or write the javascript directly in the html file.
Your html portion of this homework will include the following:
Largest heading with text: Callback Functions
Second-largest heading with the current date.
Second-largest heading with your name.
1st paragraph will include the two numbers. (read below)
2nd paragraph will include the total value. (read below)
3rd paragraph will include the average. (read below)
Using your knowledge of targeting elements WITHOUT using IDs, add the information above to your HTML WITHOUT using IDs.
You will create a higher order function that will take in two numeric parameters and a callback function.
The higher order function will find the arithmetic values of addition, subtraction, multiplication and division of the two numbers.
You will use these values in your callback function and go through the values to find the average of all the values.
Use the data from your functions to display the information listed above.
Upload your project to the web 4 server.
Create a readme.md file. (This will be the file where you add your web4 link).
Add the web 4 link to the readme.md file.
    Commit and push your homework-two folder to github.
    Submit your github for the assignment submission.
*/


/**
 * Outer Computation Function that Calculates Sum, Difference, Product, and Quotient of a set of Numbers
 * @param secondaryCompute - Call Buck Function to Process Results
 * @param numbers - A List of Numbers
 * @return results - An Object Literal with the Results of the Primary and Secondary Operations
 */
const arithmeticCompute = (secondaryCompute,...numbers) => {
    //Establish the Results
    let data = {
        numbers: numbers,
        results: {
            sum: 0,
            difference: 0,
            product: 1,
            quotient: 1,
        },
        secondary: {
            //...
        }
    };

    //Iterate through the Numbers
    numbers.forEach((num,i,numbers) => {

        //The Original Values Must be Modified
        if(i === 0) {
            for (let operation in data.results) {
                //Replace the Original Value with the Number
                data.results[operation] = num;
            }
        } else {
            //Otherwise apply the operation
            data.results.sum += num;
            data.results.product *= num;
            data.results.difference -= num;
            data.results.quotient /= num;
        }

    });

    //Process the Results via the Secondary Compute and Return It
    // console.log("Outgoing Numbers")
    // console.log(Object.values(data.results));
    data.secondary = secondaryCompute(...Object.values(data.results));

    //Return the Original Data Array
    return data;
}

/**
 * Takes a List of Numbers and Returns the Average
 * @param numbers - A list of numbers
 * @return The average number
 */
const averageNumbers = (...numbers) => {

    //Compute the Sum
    let sum = 0;

    // console.log("Incoming Numbers")
    // console.log(numbers)

    //Iterate through all the Numbers
    for (let num of numbers) {

        //Increment the Sum
        sum += parseFloat(num);
    }

    //Compute the Average
    return { 'sum': sum, 'average': sum/(numbers.length+1) };
}

//Predefined List of Numbers
const numbers = [2,4,8,16];

//Run the computation function and bind the results
const data = (arithmeticCompute(averageNumbers,...numbers));
console.log(data);

//Assignment Display Requirements
const requirements = [
    {tag: 'h1', id: 'title', content: "Callback Functions"},
    {tag: 'h2', id: 'date', content: new Date(1694479600134).toLocaleDateString()},
    {tag: 'h2', id: 'author', content: "Jay Annadurai"},
    {tag: 'p', id: 'numList', content: `Numbers: ${numbers.toString()}`},
    {tag: 'p', id: 'numTotal', content: `Total: ${data.secondary.sum}`},
    {tag: 'p', id: 'numAverage', content: `Average: ${data.secondary.average}`}
]

//Build the Required HTML Elements onto the Page
for (let element of requirements) {

    //Build HTMLasJS Object
    let elementHTML = new HTMLasJS(
        element.tag,
        {
            id: element.id
        },
        {},
        element.content
    )

    //Build HTML Object onto the Page
    wrapperHTML.get().appendChild(elementHTML.build())
}