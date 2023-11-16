Homework 6: Vue Basics
----
https://in-info-web4.informatics.iupui.edu/~jayannad/N320-Vue/HW/6-VueBasics
----

----
This is the first assignment where you will build a Vue project.
You will create two components to demonstrate your understanding of the content up to this point.

To complete this homework, complete the following. The image below illustrates a possible outcome for this project.
----

1. Create folder called assignment_six.
2. Create both the html and javascript files.
3. Link the files and create a component/element that will be controlled by Vue.
4. This Vue-controlled component will contain the following data:
    * (Note: The data type is in parentheses)
    1. Name (string)
    2. Course (string)
    3. Assignment Name (string)
    4. Difficulty Level (integer)
    5. Assignment Due Date (method call)
    6. Completed (boolean)

5. Create a function that will print out the due date which will be seven days from the current date. Use your knowledge of Javascript to make this dynamic content.
6. This information will be displayed as follows:
    1. Name as largest heading element
    2. Course: Assignment Name as second largest heading
    3. Due Date: Date as third largest heading
    4. Difficulty Level: Number/5 as fourth largest heading
7. Create another component called My List.
8. In this component, you will create an array that will have a list of at least 7 items. Those items are for you to choose.
9. Add an h1 that displays a fitting title.
10. Display all the List items on your page is an unordered list using a loop.
11. This page will contain a button that reads Favorite Item, with Item being the category of your items. For instance, if you have an array of your favorite bands, the button will read "Favorite Band."
12. When the user clicks the button, a paragraph under the button will appear with the text "My favorite category is category item!" Again, for example, if your category is bands and one item is My Chemical Romance, the paragraph at some time will read "My favorite band is My Chemical Romance!"
13. With each button click, the favorite band selected will change to cycle through your list.
14. After this button, you will add functionality to allow a user to add a language to the list. To do this, you will need to create a label, input, and button.
15. The button text should change depending on what the user enters into the input field.
    1. Before the user starts typing, the button should read "Add to List."
    2. When the user enters information, (for example, Candlebox), the button will then read "Add Candlebox to List." This change should happen as the user is typing in the input field.

16. When the user clicks the add to List button, the new item should be added to the list. However, the item contains an id and a name. Make sure the id continues in the same pattern and increases by one for each new addition.
17. The new item will then appear in the unordered list.
18. After the item is added to the list, a paragraph should appear that reads Candlebox has been added to your List!, for example.
19. Create a readme.md file. (This will be the file where you add your web4 link).
20. Upload your project to the web 4 server and github.
21. Submit your github server link/URL for the assignment submission.

_NOTE: Please organize your project as it will play a part into your grade._