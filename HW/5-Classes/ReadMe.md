Homework 5: Classes
----
https://in-info-web4.informatics.iupui.edu/~jayannad/N320/HW/5-Classes/
----
In the last assignment, you practiced using javascript array methods. In this assignment, you will incorporate that knowledge along with your knowledge of classes a library catalog system.

You will create a library catalog system that keeps track of different types of media: books, DVDs, and CDs. You will create classes to represent these items as well as manage your inventory - such as adding items, removing items, displaying items, and calculating the total value.

The image below is just an example of the end product.

To complete this homework, complete the following:
----

Add the following code to your HTML file:
```html
<h1></h1>

<div><h2 class="desc"></h2></div>

<div><h2 class="desc"></h2></div>
```

Create a javascript file and link it to your HTML file. 
Create a class that will hold the following information:
- id
- title
- publication year
- value

From this class, you will create the individual item types, adding properties for each type:
- Books: author, genre
- DVD: director, runtime
- CD: artist, number of songs

Create another class that will include the following methods:
- constructor: an empty catalog
- addItem: add one or more items 
- removeItem: remove item from the catalog by its id.
- totalValue: calculate and return the total value of all the catalog items.
- displayCatalog: display the items in the catalog, including the titles (italicized), publication data, value, and additional properties specific to the media type.

_You will use both a spread operator AND a rest operator in this assignment._ 
_You will use the reduce method in this assignment._ 

Display Requirements
----

- Add AT LEAST three items to your library: a book, a DVD, and a CD. You may add as many as you like.
- Add a heading to your page with the text: Library Catalog
- Display all the library items in the first div with the heading: Catalog Items
- Add the total value inside the same div element.
- Remove an item from your inventory.
- Display all the library items in the second div with the heading: Updated Catalog Items
- Add the new value inside the same div element.
- Add a button at the bottom of the page that will randomly delete an item and then update the updated information. (3 EC pts)


Upload your project to the web 4 server.
Create a readme.md file. (This will be the file where you add your web4 link).
Upload your project to github.
Submit your web github link/URL for the assignment submission. 