Homework 3b: Async

https://in-info-web4.informatics.iupui.edu/~jayannad/N320/HW/3b-Async/

Create the following files:
async.html |
async.js |
async.css.
You will fetch data from an API and display various data from the API. Use the following API to pull data:
https://dog.ceo/api/breeds/image/random/20
In your javascript file, you will create an async function that fetch data from the API.
If the promise is successful, you will display the data as shown in the Example. Remember to use "await" to handle the asynchronous request.
Once the data is returned successfully, don't forget to parse it as JSON.
Create another async function that takes the fetched data and displays it in the HTML container you created in index.html. You can use template literals or any other method to format and display the data.
If the promise is rejected, have the console.log display the following text through a new Error object: Failed to fetch data. Also have the error message display on your page to give your users some feedback. 