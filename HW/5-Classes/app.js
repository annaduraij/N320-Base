/**
 * Author: Jay Annadurai
 * Date: 11 Sep 2023
 * File: app.js
 * Project: N320-Base
 * Description: Classes Assignment
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
    'Classes Demonstration'
);

//Build Remove Button
let removeButton = new HTMLasJS(
    "div",
    {
        id: "itemRemove",
    },
    {
        cursor: "pointer",
        outlineStyle: 'none',

        margin: '0 auto',
        fontSize: "3em",
        padding: '0.5em',
        width: 'fit-content',
        borderRadius: '15px',


        backgroundColor: 'maroon',
        color: 'white',
    },
    'Remove Random Media Item'
);


//Build Title onto the Wrapper
wrapperHTML.get().appendChild(pageTitle.build());

//Import Media and Catalogue Classes
import {Media,Book,DVD,CD} from "./Modules/Media.js";
import {Catalogue} from "./Modules/Catalogue.js";

//Generate an Array of Media Items
let items = [
    new Book("Cornelia", "Funke","Fantasy","Dragon Rider",2000,19.99,'CF-DragonRider'),
    new DVD("Gary","Trousdale",84,"Beauty and the Beast",1991,16.49,'GT-BeautyAndTheBeast'),
    new CD("Juniper","Vale",11,"Everything is Color",2018,7.99,'JV-EverythingIsColor'),
]

//Tertiary Catalogue with Randomly Removable Item
let tertiaryCatalogue = new Catalogue("Catalogue with Removable Items",...items);

//Build the Remove Item Button onto the Page and Add a Click Event Listener
document.body.appendChild(removeButton.build());
tertiaryCatalogue.display(wrapperHTML.get());
removeButton.get().addEventListener("click", () => {
    tertiaryCatalogue.randRemoveDisplay();
});
