/**
 * Author: Jay Annadurai
 * Date: 11 Sep 2023
 * File: app.js
 * Project: N320-Base
 * Description: HW3a - Utilize Promises to Retrieve Quotes from an API
 */

//Questions
//Was this completed as expected in terms of using an async function correctly to grab the data?
    //I.e. should I convert the JSON promise section to an async function?


//-----------------------------------
//              Config
//-----------------------------------

//Import Classes to Build HTML via JS

//Define Path to Root
const pathToRoot = '../../'

//Import the Modules
import {HTMLasJS,HJShortcuts, UtilHTML,Console} from "../../Library/Modules/HTMLasJS.js";

//Inject CSS into the Head
HJShortcuts.injectCSS(pathToRoot);

//Build a Wrapper onto the Page
let wrapperHTML = HJShortcuts.buildWrapper();

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
    'Quotes from Quotable API'
);

//Build Title onto the Wrapper
wrapperHTML.get().appendChild(pageTitle.build());

//-------------------------------------
//              Execution
//-------------------------------------

//Run the Fetch Function on the API
fetchQuotes(
    true,
    48,
    "https://api.quotable.io/quotes",
    wrapperHTML, //Container to Build Elements On
    quoteBuilder, //Callback Function to Display Page Elements
    displayError //Callback Function to Display Errors
);


//-------------------------------------
//              Functions
//-------------------------------------

//Fetching Data from an External Source
//Note, ideally a fetch will take as long as necessary to resolve, so it's good practice to add a timeout
async function fetchQuotes(random = true, quantity = 48, api = "https://api.quotable.io/quotes", container = wrapperHTML, viewFunction = quoteBuilder, errorFunction = displayError)
{
    //Bind the API URL
    let quotes = { api: api }

    //Concatenate the Random Flag if Enabled
    if(random === true) {
        quotes.api += "/random"
    }

    //Concatenate the Quote Quantity
    quotes.api += "?limit=" + quantity;

    //This Fetch Retrieves Quotes from an API
    quotes.fetch = fetch(quotes.api);

    //Check the state of the incoming external data
    console.log("Raw Fetch Data",quotes.fetch);

    //When the fetch call successfully resolves and responds
    quotes.fetch
        //On Successful Resolve:
        .then( (resolvedResponse) => {
            //Utilize the .json Method of the built-in Response class
            //Returns a promise in and of itself that will then read JSON data
            quotes.data = resolvedResponse.json();

            //Indirect Promise Chaining
            quotes.data
                //On Correct Resolution
                .then ((data) => {
                    //Log the JSON Data from the Promise
                    console.log("Parsed Fetch Data", data);

                    //Rebind the Data | Note, the Data is captured in the Results field
                    quotes.data = data;

                    //Build the Quotes onto the Page with the Function
                    viewFunction(quotes.data,container);
                })
                //Catch Errors
                .catch( (error) => {
                    displayError(error,container,"Data Parse Failed- ");
                });

            //Log the Entire Quotes Objects
            setTimeout(() => { console.log("Quotes Object", quotes); },400);

        })//End of Fetch Resolve

        //On Erroneous Resolve:
        .catch((error) => {
            errorFunction(error,container,"API Fetch Failed- ");
        });

}//End of Asynchronous Function to Fetch Quotes


/**
 * Builds Quotes onto the Page
 * @param quotes - Array of Quote Objects with the properties of '_id', 'author', and 'content'
 * @param container - HTMLasJS Object to Build Objects Into
 */
function quoteBuilder (quotes,container) {

    //Build Grid Container
    let gridContainer = new HTMLasJS(
        "div",
        {
            id: "gridContainer"
        },
        {
            display: "grid",
            gridTemplateColumns: "33% 33% 33%",
            margin: "1em"
        },
        ''
    );
    container.get().appendChild(gridContainer.build());

    //Sort the Quotes by Length so formatting between left and right containers can be symmetrical
    quotes.sort((quoteA,quoteB) => {return quoteA.length - quoteB.length})

    //Iterate Through the Quotes
    for(let quote of quotes) {

        //Define the ID of the Quote
        let divID = `Q-${quote['_id']}`
        let contentID = `QC-${quote['_id']}`
        let authorID = `QA-${quote['_id']}`

        //Build Quote Container that houses the Text and Author
        let quoteContainer = new HTMLasJS(
            "div",
            {
                id: divID
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

                fontSize: "large",

            },
            ''
        );


        //Build Quote Content
        let quoteContent = new HTMLasJS(
            "div",
            {
                id: contentID
            },
            {
                color: "inherit",
                fontFamily: "baskerville, serif",
                //margin: '0.5em 2em',
                textAlign: 'center'
            },
            "'"+quote.content+"'"
        );


        //Build Author
        let quoteAuthor = new HTMLasJS(
            "div",
            {
                id: authorID
            },
            {
                color: "inherit",

                fontStyle: "italic",
                fontFamily: "brush script mt, cursive",
                fontSize: "1.5em",

                alignSelf: "flex-end",
                //padding: "5px",
            },
            "-"+quote.author
        );

        //Grab the Appropriate Containers and Build The HTMLasJS Objects into HTML
        gridContainer.get().appendChild(quoteContainer.build())
        quoteContainer.get().appendChild(quoteContent.build());
        quoteContainer.get().appendChild(quoteAuthor.build());

    }//End of For Of Loop iterating through the quotes

}//End of Quote Builder

/**
 * Displays Errors by Logging the Issue to the Console and the Page
 * @param error - Error Object to Log to Console and Page
 * @param container - Container to Build Console
 * @param msg - Message to Provide to the User
 * @return {Promise<void>}
 */
function displayError (error,container,msg= "Error: ") {
    //Grab the Container and Build the Console using the Console Class
    container.get().appendChild(Console.generateConsole().build());

    //Log the Error to the Inspector Console
    console.log(msg,error);

    //Log the Error to the Page Console
    Console.log(msg+error.toString());

}

