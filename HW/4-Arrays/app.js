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
//wrapperHTML.get().appendChild(Console.generateConsole().build());

//Build Title
let pageTitle = new HTMLasJS(
    "div",
    {
        id: "pageTitle"
    },
    {
        margin: "0 auto",
        fontSize: "3em",
        fontFamily: "Brush Script MT, cursive"
    },
    'Array Method Demonstration'
);

//Build Title onto the Wrapper
wrapperHTML.get().appendChild(pageTitle.build());

//***** Array Methods *****//
const students = [

    { name: 'Alice', grades: [85, 92, 78, 90] },

    { name: 'Bob', grades: [75, 88, 95, 100] },

    { name: 'Charlie', grades: [60, 72, 68, 74] },

    { name: 'David', grades: [92, 88, 95, 98] },

    { name: 'Eve', grades: [100, 100, 100, 100] }

];

//***** Program Logic *****//

function calcGrade(grades) {
    //Average = Sum/Length
    //Use Reducer to Grab the Sum of all Grades
    let sumGrade = grades.reduce((runningTotal,currentValue) => {return runningTotal+currentValue; });

    //Compute Average utilizing the sum
    return sumGrade/grades.length;
}

let requirements = {
    q1: {
        //Contains a String for a Prompt
        msg: "List of Students:",
        //Returns a String for the Answer to the Prompt
        eval: (array) => {
            //forEach method to display the name of each student in the appropriate HTML element
            function listStudentNames(array) {
                let names = [];
                array.forEach( (student, i, students) => { names.push(student.name); });
                return names;
            }

            return listStudentNames(array).join(" | ");
        }
    },//End of q1

    q2: {
        //Contains a String for a Prompt
        msg: "Have all students passed the class?",
        //Returns a String for the Answer to the Prompt
        eval: (array,pass= 60) => {
            //Use the every method to check if all students have passed the class
            //Students need a 60 or higher to pass
            function allPass(array,score) {
                //Check every student
                return array.every(
                    (student, i, students) => {


                        /* Extracted grade computation functionality
                        Average = Sum/Length
                        //Use Reducer to Grab the Sum of all Grades
                        let sumGrade = student.grades.reduce((runningTotal,currentValue) => {return runningTotal+currentValue; });

                        //Compute Average utilizing the sum
                        let grade = sumGrade/student.grades.length;
                        //Check and Return
                         return grade >= score;
                         */

                        return calcGrade(student.grades);
                    }
                );
            }

            let response = allPass(array,pass) ? "Yes, they all passed" : "No, they did not all pass";

            return `${response} with a ${pass}% or higher!`;
        }
    },//End of q2

    q3: {
        //Contains a String for a Prompt
        msg: "Is there a student with all perfect scores?",
        //Returns a String for the Answer to the Prompt
        eval: (array,perfect= 100) => {
            //Use the some method to check if at least one student has achieved a perfect score in the class.
            //Student has received 100 on all graded deliverables
            function anyPerfect(array,perfect) {
                //Hold Perfect Student, initialize to null
                let perfectStudent;
                
                let status = array.some( (student, i, students) => {

                    let success = student.grades.every( (grade) => {
                        return grade >= perfect;
                    });

                    //If there is a success, bind the student object themselves
                    if(success) { perfectStudent= student; }

                    return success;
                });

                //Return an Object with any such perfect Students
                return { status: status , student: perfectStudent };
            }

            let result = anyPerfect(array,perfect);

            //If both the function returns true and there is a student object bound, bind a success message otherwise a fail
            let response = result.status && result.student?
                `Yes, for example, ${result.student.name} has` : "No, no one has";

            return `${response} achieved ${perfect}% or higher on all assignments!`;

        }
    },//End of q3

    q4: {
        //Contains a String for a Prompt
        msg: "List of Students with 90% and higher:",
        //Returns a String for the Answer to the Prompt
        eval: (array,threshold = 90) => {
            //Use the filter method to create the result of all the students with the average grade of 90 or higher.
            function topStudents(array,score) {
                //Check every student
                return array.filter(
                    (student, i, students) => { return calcGrade(student.grades) >= threshold }
                );
            }

            //Function to get Names of the Students as a CSV string
            function getNames(students) {
                    return students.map( (value,index,array) => {
                        return (index !== array.length - 1)? value.name : `and ${value.name}`
                    }).join(", ");
            }

            //Get Names of the Top Students
            let studentNames = getNames(topStudents(array,threshold));

            let response = studentNames ? `${studentNames}` : `There were no students`;

            return `${response} with a grade of ${threshold}% or higher!`;
        }
    },//End of q4

    q5: {
        //Contains a String for a Prompt
        msg: "List of Students and respective average grades:",
        //Returns a String for the Answer to the Prompt
        eval: (array) => {
            //Use the map method to create a new array called studentSummaries that will format the data as follows
            // "Name: [student name] , Average Grade: [average grade]"
            // Each student will be a list item in the unordered list.
            function formatStudents(array) {
                //Return an Array of Strings in the aforementioned format "Name: [student name] , Average Grade: [average grade]"
                return array.map(
                    (student,i,students) =>
                    {return `Name: ${student.name} | Average Grade: ${calcGrade(student.grades)}%` }
                );
            }

            function formatListHTML(array) {
                //Enclose Each Element as a List Tag
                let list = array.map( (element, i, array) => {
                    return `<li style="color: inherit">${element}</li>`
                });
                //Aggregate the List Elements into a String
                let listHTML = list.reduce((accumulator,nextElement) => { return accumulator+nextElement},'');

                //Enclose the List in an Unordered List Tag
                return `<ul style="color: inherit"> ${listHTML} </ul>`;
            }
            return formatListHTML(formatStudents(array));

        }
    },//End of q5

    q6: {
        //Contains a String for a Prompt
        msg: "Total Number of Grades:",
        //Returns a String for the Answer to the Prompt
        eval: (array) => {
            //Use the reduce method to calculate the total number of grades across all students.

            //Recursive Counter Method
            function counter(array,initialAccumulator = 0) {
                return array.reduce ( (accumulator,nextValue) => {
                    //If the subsequent Value is also an array, recursively apply the counter function
                    if (Array.isArray(nextValue)) { return accumulator+counter(nextValue) }
                    //Otherwise increment the value of the accumulator
                    else { return accumulator+1;}
                } , initialAccumulator);
            }

            //Get Array of Grade Arrays
            function getGrades(students) {
                return students.map((student,i,students) => {return student.grades; });
            }

            //Get all Grades
            return `${counter(getGrades(array))} grades exist!`;
        }
    } //End of q6
}

//Log the Responses into the Console
for(let q in requirements) {
    let question = requirements[q];
    console.log(`${q}: ${question.msg}`);
    console.log(`${q}: ${question.eval(students)}`);

    //Build Response Container that Contains Both the Query and Answer
    let responseContainer = new HTMLasJS(
        "div",
        {
            id: q
        },
        {
            display: "flex",
            flexFlow: "column wrap",
            flexGrow: 1,
            justifyContent: "space-between",

            backgroundColor: 'white',
            color: 'black',

            border: '1px solid black',
            borderRadius: '0.5em',

            //width: "60vw",
            padding: '0.5em',
            margin: '0.5em',

            fontSize: "1.5em",

            fontFamily: "baskerville, serif",
            textAlign: 'center'

        },
        ''
    );


    //Build Div for the Query
    let query = new HTMLasJS(
        "div",
        {},
        {
            color: "inherit",
            fontFamily: "inherit",
            textAlign: 'inherit'
        },
        question.msg
    );


    //Build Div for the Answer
    let answer = new HTMLasJS(
        "div",
        {},
        {
            color: '#800707',
            fontFamily: "inherit",
            textAlign: 'inherit'

            //padding: "5px",
        },
        question.eval(students)
    );

    //Grab the Appropriate Containers and Build The HTMLasJS Objects into HTML
    wrapperHTML.get().appendChild(responseContainer.build())
    responseContainer.get().appendChild(query.build());
    responseContainer.get().appendChild(answer.build());
}