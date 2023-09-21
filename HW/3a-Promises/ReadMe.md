Homework 3a: Promises

https://in-info-web4.informatics.iupui.edu/~jayannad/N320/HW/3a-Promises/

Create the following files:
promises.html |
promises.js |
promises.css.
You will fetch data from an API and display various data from the API. Use the following API to pull data:
https://api.quotable.io/quotes?limit=20
In your javascript file, you will create a promise that fetch data from the API.
Once the data is returned successfully, don't forget to parse it as JSON.
Create another async function that takes the fetched data and displays it in the HTML container you created in index.html. You can use template literals or any other method to format and display the data.
Display the data as shown in the Example.
If the promise is rejected, have the console.log display the following text through a new Error object: Failed to fetch data. Also have the error message display on your page to give your users some feedback. 

