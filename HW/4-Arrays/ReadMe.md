Homework 4: Arrays

https://in-info-web4.informatics.iupui.edu/~jayannad/N320/HW/4-Arrays/

Use this HTML file:
<h1>Student Information</h1>
<p class="sList">Student Name List: </p>
<p>All students have passed the class: </p>
<p>Any student with a perfect score: </p>
<p class="sList">Top student List (avg grade of 90 or higher): </p>
<p>List of all students with their average grade: </p>
<ul id="studentAvgs"></ul>
<p>Total Number of Grades: </p>
<script src="arraysAssignment.js"></script>

Create a javascript file to link to your html file.
In your Javascript file, create the following object array:
const students = [

{ name: 'Alice', grades: [85, 92, 78, 90] },

{ name: 'Bob', grades: [75, 88, 95, 100] },

{ name: 'Charlie', grades: [60, 72, 68, 74] },

{ name: 'David', grades: [92, 88, 95, 98] },

{ name: 'Eve', grades: [100, 100, 100, 100] }

];

For the following information, add your result to the end of the existing text in the appropriate html element.
Make sure you use DOM element selection to target the HTML elements; do not add any information to the HTML file.
Use the forEach method to display the name of each student in the appropriate HTML element.
Use the every method to check if all students have passed the class. Students need a 60 or higher to pass.). Display the result in the appropriate HTML element.
Use the some method to check if at least one student has achieved a perfect score in the class. (All grades are 100.) Display the result in the appropriate HTML element.
Use the filter method to create the result of all the students with the average grade of 90 or higher.
Use the map method to create a new array called studentSummaries that will format the data as follows: "Name: [student name] , Average Grade: [average grade]". Each student will be a list item in the unordered list.
Use the reduce method to calculate the total number of grades across all students. Display your result in the appropriate HTML element.
Create a readme.md file. (This will be the file where you add your github link).
Upload your project to the web 4 server.
Add the web4 link to the readme.md file.
Upload your project folder to github
Submit your githhub link/URL for the assignment submission. 