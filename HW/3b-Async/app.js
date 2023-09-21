/**
 * Author: Jay Annadurai
 * Date: 11 Sep 2023
 * File: app.js
 * Project: N320-Base
 * Description: HW3b - Utilize Promises with Async Function to Retrieve Images from an API
 */


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
    'Breed Images from Dogs API'
);

//Build Title onto the Wrapper
wrapperHTML.get().appendChild(pageTitle.build());

//-------------------------------------
//              Execution
//-------------------------------------

//Execute the Function
fetchAndDisplayDogBreedImages(
    true,
    50,
    "https://dog.ceo/api/breeds/image",
    wrapperHTML, //Container to Build Elements On
);

//-------------------------------------
//              Functions
//-------------------------------------

//Function to Grab Data from the Fetch and Then Render it Onto the Page
async function fetchAndDisplayDogBreedImages(
    random = true,
    quantity = 48,
    api = "https://dog.ceo/api/breeds/image",
    container = wrapperHTML
) {
    //Exception Handle
    try {
        //Bind the Images from the Promise

        //Fetch the Response from the API
        const imagesPromise = await fetchDogBreedImages(random,quantity,api,container);
        console.log("Fetch Promise: ",imagesPromise);

        //Process the Response from the API
        const imagesResponse = await imagesPromise.json();
        console.log("Response: ",imagesResponse);

        //Grab the Images from the Response
        const images = imagesResponse.message;
        console.log("Data: ",images);


        //Use the Image Builder to Build the Dog Breed Images onto the Page
        dogBreedImagesBuilder(images, container);
    }

    //Catch Any Exceptions
    catch (error) {
        displayError(error,container,"API Fetch Failed- ")
    }
}

//Fetching Data from an External Source
//Note, ideally a fetch will take as long as necessary to resolve, so it's good practice to add a timeout
async function fetchDogBreedImages(random = true, quantity = 48, api = "https://dog.ceo/api/breeds/image", container = wrapperHTML)
{
    //Bind the API URL
    let dogBreedImages = { api: api }

    //Concatenate the Random Flag if Enabled
    if(random === true) {
        dogBreedImages.api += "/random"
    }

    //Concatenate the Quote Quantity
    dogBreedImages.api += "/" + quantity;

    //This Fetch Retrieves Breed Images from an API
    return fetch(dogBreedImages.api);

}//End of Asynchronous Function to Fetch Dog BreedImages


/**
 * Builds Dog Breed Images onto the Page
 * @param Images - Array of Image Objects with the properties of '_id', 'author', and 'content'
 * @param container - HTMLasJS Object to Build Objects Into
 */
function dogBreedImagesBuilder (Images,container) {

    //Build Grid Container
    let flexContainer = new HTMLasJS(
        "div",
        {
            id: "flexContainer"
        },
        {
            display: "flex",
            flexFlow: "row wrap",
            width: "100%",
            //flexGrow: 1,
            margin: "1em auto",
            justifyContent: "Space-evenly",
            alignItems: "center"
        },
        ''
    );
    container.get().appendChild(flexContainer.build());


    //Iterate Through the BreedImages
    Images.forEach((imageURL,index) => {

        //Build Image Container that houses the Text and Author
        let imageContainer = new HTMLasJS(
            "div",
            {
                id: "ImgC-"+(index+1)
            },
            {
                //display: "flex",
                //flexFlow: "column wrap",
                //flexGrow: 1,
                //justifyContent: "space-between",

                backgroundColor: 'white',
                color: 'black',
                //height: 'fit-content',

                border: '4px solid black',
                borderRadius: '1em',

                height: "20vh",
                //width: "25vw",
                padding: '0.5em',
                margin: '1em',

                fontSize: "large",

            },
            ''
        );


        //Build Image Content
        let image = new HTMLasJS(
            "img",
            {
                id: "Img-"+(index+1),
                src: imageURL,
                height: "100%",
            },
            {
                display: 'block',
                borderRadius: '1em',
                maxWidth: '100%',
                margin: "auto"
                //border: "solid 4px black"
            },
            ''
        );

        //Grab the Appropriate Containers and Build The HTMLasJS Objects into HTML
        flexContainer.get().appendChild(imageContainer.build())
        imageContainer.get().appendChild(image.build());

    });//End of For Of Loop iterating through the Images

}//End of Image Builder

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

