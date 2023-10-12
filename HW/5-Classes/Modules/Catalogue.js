/**
 * Author: Jay Annadurai
 * Date: 06 Oct 2023
 * File: Catalog.class.js
 * Project: N320-Base
 * Description: Composition Class for Media Objects
 */

/* Class Details
    - constructor: an empty catalog
    - addItem: add one or more items
    - removeItem: remove item from the catalog by its id.
    - totalValue: calculate and return the total value of all the catalog items.
    - displayCatalog: display the items in the catalog, including the titles (italicized), publication data, value, and additional properties specific to the media type.
 */

//Catalogue Class Imports Media Item Class
import {Media,Book,CD,DVD} from "./Media.js";
//Import the Modules
import {HTMLasJS,HJShortcuts, UtilHTML,Console} from "../../../Library/Modules/HTMLasJS.js";

export class Catalogue {

    //Add Media Item(s) to the Catalogue
    addItem(...items) {

        //Only Accept Media Objects
        let mediaItems = items.filter((item, index, array) => {
            //If the Element is a Media Item, Accept It
            if (item instanceof Media) {
                return true;
            }
            //Otherwise Log the Item, and Reject it
            else {
                console.log("Invalid Non-Media Item",item);
                return false;
            }
        });

        //Expand the Array and Store in the Main Object Array
        this.items.push(...mediaItems);

        this.refresh();

        return this;
    }

    //Remove Media Item(s) from the Catalogue either via ID or by passing a Media Item
    removeItem(...items) {

        //Validate an Array of ItemIDs
        let toRemoveItemIDs = items.map((element, index, array) => {
            //If the Element is a Media Item, grab the Item ID
            if (element instanceof Media) {
                return element.id;
            }

            //If the Element is a number, it's likely an ID but can be validated by checking that the catalogue's items include such an item
            else if (
                typeof element === 'number' &&
                this.items.map((item) => {
                    return item.id
                }).includes(element)
            ) {
                return element;
            } else {
                console.log("Invalid Argument for RemoveItem", element);
            }
        });

        //Set the Items of the Catalogue without the Removed Items
        this.items = this.items.filter((catalogueItem, index, array) => {
            //Return only items not found in the toRemoveItemIDs array
            return !toRemoveItemIDs.includes(catalogueItem.id);
        });

        this.refresh();

        return this;
    }

    //Get the Total Count of All Catalogue Items
    getCount() {
        let count = {
            media: 0,
            book: 0,
            dvd: 0,
            cd: 0
        }

        return this._items.reduce( (count, currentItem) => {
            if (currentItem instanceof Media) { count.media++; }
            if (currentItem instanceof Book) { count.book++; }
            if (currentItem instanceof DVD) { count.dvd++; }
            if (currentItem instanceof CD) { count.cd++; }

            return count;
        }, count)
    }

    //Get the Total Value of All Catalogue Items
    getTotalValue(currency='usd') {
        //Aggregate the Value of All Items' Value Properties
        return this._items.reduce( (accumulator,currentItem) => {
            //console.log(currentItem.value);
            return accumulator + currentItem.value;
        },0);
    }

    set items(mediaItems) {
        this._items = mediaItems;
        this.refresh();
        return this;
    }
    get items() {
        this.refresh();
        return this._items;
    }

    //Organize
    organize() {
        this.sorted = {
            books: this._items.filter( (item) => { return item instanceof Book }),
            cds: this._items.filter( (item) => { return item instanceof CD }),
            dvds: this._items.filter( (item) => { return item instanceof DVD })
        }
        return this;
    }

    //Refresh All Properties
    refresh() {
        this.value = this.getTotalValue();
        this.count = this.getCount();
        this.organize();
    }

    constructor(...items) {

        //Create an Array to Bind the Items
        this.items = [];

        //Generate a Random ID
        this.id = Math.random().toString(20).substr(2, 6);

        //If any Items were provided, add them into the catalogue
        if (items !== null) {
            this.addItem(...items);
        }

        this.refresh();
    }

    //Build HTMLasJS Elements to Display
    display(htmlContainer) {
        //Build Catalogue Wrapper that Contains Both the Title and the Content Container
        let catalogueWrapper = new HTMLasJS(
            "div",
            {
                id: `cWrapper-${this.id}`
            },
            {
                display: "flex",
                flexFlow: "column wrap",
                justifyContent: "space-between",

                backgroundColor: 'black',
                color: 'black',

                border: '0px solid black',
                borderRadius: '15px',

                //width: "60vw",

                fontSize: "1.5em",

                fontFamily: "baskerville, serif",
                textAlign: 'center'

            },
            ''
        );

        let catalogueTitle = new HTMLasJS(
            "div",
            {
                id: `cTitle-${this.id}`
            },
            {
                display: "flex",
                flexFlow: "column wrap",
                flexGrow: 1,
                justifyContent: "space-between",

                backgroundColor: 'maroon',
                color: 'white',

                border: '1px solid black',
                borderRadius: '15px 15px 0 0',

                //width: "60vw",
                padding: '0.5em',

                fontSize: "1.5em",

                fontFamily: "baskerville, serif",
                textAlign: 'center'

            },
            'Catalogue'
        );

        let catalogueContentContainer = new HTMLasJS(
            "div",
            {
                id: `cContentContainer-${this.id}`
            },
            {
                display: "flex",
                flexFlow: "row wrap",
                flexGrow: 0,
                justifyContent: "space-between",

                backgroundColor: 'white',
                color: 'black',

                border: '1px solid black',
                borderRadius: '0 0 15px 15px',

                //width: "60vw",
                padding: '0.5em',
                // margin: '0.5em',

                fontSize: "1.5em",

                fontFamily: "baskerville, serif",
                textAlign: 'center'

            },
            ''
        );




        //Build Main Catalogue Wrapper
        htmlContainer.appendChild(catalogueWrapper.build());
        catalogueWrapper.get().appendChild(catalogueTitle.build());
        catalogueWrapper.get().appendChild(catalogueContentContainer.build());

        for (let mediaItem of this._items) {
            console.log(mediaItem);
            mediaItem.display(catalogueContentContainer.get());
        }

    }
}