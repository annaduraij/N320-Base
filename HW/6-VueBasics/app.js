/**
 * Author: Jay Annadurai
 * Date: 27 Oct 2023
 * File: app.js
 * Project: N320-Vue
 * Description: Vue Basics
 */

//==========================
//      Page Setup
//==========================

//Import Vue Basics to Build HTML via JS

//Define Path to Root
const pathToRoot = '../../'

//Import the Modules
import {HJShortcuts, HTMLasJS, UtilJ} from "../../Library/Modules/HTMLasJS.js";

//Inject CSS into the Head
HJShortcuts.injectCSS(pathToRoot);

//Build a Wrapper onto the Page
let wrapperHTML = HJShortcuts.buildWrapper();

//Build a HTML Console onto the Page
// wrapperHTML.get().appendChild(Console.generateConsole().build());

// 1. Create folder called assignment_six.
// 2. Create both the html and javascript files.
// 3. Link the files and create a component/element that will be controlled by Vue.
//Build a Page Header Vue Component
let vuePageHeader = new HTMLasJS(
    'section',
    {id: 'VueHeader'},
    {},
)

//Build the Vue Component onto the Page
wrapperHTML.get().appendChild(vuePageHeader.build());


//==========================
//       Vue Header
//==========================
// 4. This Vue-controlled component will contain the following data:
//     * (Note: The data type is in parentheses)
let vuePageHeaderData = {
    //1. Name (string)
    name: "Jay Annadurai",
    //2. Course (string)
    course: "N320",
    //3. Assignment Name (string)
    assignmentName: 'Vue Basics HW',
    //4. Difficulty Level (integer)
    difficultyLevel: 3,
    //5. Assignment Due Date (method call)
    assignmentDueDate: UtilJ.addDays(new Date(),7,true),
    //6. Completed (boolean)
    completed: true
}

// 5. Create a function that will print out the due date which will be seven days from the current date. Use your knowledge of Javascript to make this dynamic content.
//console.log(UtilJ.addDays)

// 6. This information will be displayed as follows:
let mountsHeader = [
    // 1. Name as largest heading element
    {tag: 'h1', data: '{{name}}', dir: ''},
    // 2. Course: Assignment Name as second largest heading
    {tag: 'h2', data: '{{course}}: {{assignmentName}}', dir: ''},
    // 3. Due Date: Date as third largest heading
    //The 'v-bind:href="vueLink" is known as a Vue Directive
    {tag: 'h3', data: 'Due Date: {{assignmentDueDate}}', dir: ''},
    // 4. Difficulty Level: Number/5 as fourth largest heading
    {tag: 'h4', data: 'Difficulty Level: {{difficultyLevel}} / 5', dir: ''},
];

//Attach the Mounts to the HTML
mountsHeader.forEach( (mount) => {
    //Define the Mount
    let element = new HTMLasJS(
        mount.tag,
        mount.dir,
        {textAlign: "center", fontWeight: "400", padding: "5px", margin: "2px"},
        mount.data
    )
    //Attach the Mount
    vuePageHeader.get().appendChild(element.build())
});

//Create the Vue Header Component and Aggregate the Previous Information Into it
const vueHeaderComponent = Vue.createApp({
    data() { return vuePageHeaderData; },
    methods: {}
});
//Mount the Header Component
vueHeaderComponent.mount('#VueHeader');


//==========================
//       Vue OurList
//==========================

//========= Vue OurList ==== Cycle Selection ===========//
// 7. Create another component called My List.
//Build a List Vue Component
let vueOurList = { html: new HTMLasJS(
        'section',
        {id: 'VueList'},
        {},
    ) }
//Build the Vue Component onto the Page
wrapperHTML.get().appendChild(vueOurList.html.build());

// 8. In this component, you will create an array that will have a list of at least 7 items. Those items are for you to choose.
vueOurList.data = {
    title: "Colors from the Palette of Laura & Jay!",
    colors: [
        {c: "Crimson Glory",  h: "#be3022"},
        {c: "Rich Carmine",  h: "#d70040"},
        {c: "Sienna",  h: "#a0522d"},

        {c: "Iris", h: "#5a4fcf"},
        {c: "Bellflower", h:"#5d66aa"},
        {c: "Bituminous Blue", h: "#001156"},

        {c: "Hummingbird Green", h: "#7fe817"},
        {c: "Medium Spring Green", h: "#00fa9a"},
        {c: "British Racing Green", h: "#004225"},

        {c: "Aloe Plant", h: "#b8ba87"},
        {c: "Brassy", h: "#d5ab2c"},
        {c: "Black", h: "#000000"}
    ]
}

// 9. Add an h1 that displays a fitting title.
let mountsList = [
    {tag: 'h1', data: '{{title}}',style: {color: "white",fontWeight: "300", textAlign: "center"}, dir: ''},
]

// 10. Display all the List items on your page is an unordered list using a loop.

//Computed Property
vueOurList.computed = {
    colorsList: (colorsList,colorsMetaData) => {
        console.log("Regenerating Colors List:",colorsList)

        //Function to Create the Unordered List Element
        function colorsListElement(colorObj = '',id='') {

            //Check if the colorObj has a User Property
            if (colorObj.hasOwnProperty("user")){
                console.log("Color was created by a user:", colorObj)

                //If the ID is a Number, add an ID Attribute
                if(colorObj.user.id !== undefined ) {
                    id = `id="userColor-${colorObj.user.id}"`
                }

            } //else {console.log("Color does not have a User")}

            return `
                    <li ${id}>
                        <div 
                            style="
                            background-color: ${colorObj.h};
                            display: flex;
                            flex-flow: row wrap;
                            justify-content: center;
                            padding: 4px 8px; 
                            margin: 4px; 
                            border: 1px solid black;
                            border-radius: 16px;
                            "
                        >
                            <div
                                style = "
                                background-color: rgba(0,0,0,0.3);
                                color: white;
                                font-size: 1.2em;
                                font-weight: 600; 
                                padding: 4px 4px; 
                                margin:1px; 
                                width: 100%; 
                                text-align: center;
                                border: 1px solid black;
                                border-radius: 8px;
                                "
                            >
                                ${colorObj.c}
                            </div>
        
                        </div>
                    </li>
                `;
        }

        //Generate the Unordered List Element for Each Color
        return colorsList.map( (color) => {

            //Check if there is a property titled 'user' and if so ensure it's a Boolean with a value of true which means it's ready to be assigned an ID
            if (color.user !== undefined && color.user === true) {
                console.log(colorsMetaData);

                //Increment the Metadata ID
                colorsMetaData.id++;
                //logColorInput(color,colorsMetaData);

                //Assign the ID back into the Color
                color.user = {id: colorsMetaData.id};
            }

            //Then Return the Color
            return colorsListElement(color)

        }).join("\n") //Join all the String HTML Elements together
    }
}

//Push the Unordered List Carrier into the HTML
mountsList.push({
    tag: 'ul',
    data: '',
    style: {listStyleType: "none", padding: 0, display: "grid",gridTemplateColumns: "auto auto auto", width: "90vw"},
    dir: {'v-html':'colorsList'}
});

//Attach the Mounts to the HTML
mountsList.forEach( (mount) => {
    //Define the Mount
    let element = new HTMLasJS(
        mount.tag,
        mount.dir,
        mount.style,
        mount.data
    )
    //Attach the Mount
    vueOurList.html.get().appendChild(element.build())
});

// 11. This page will contain a button that reads Favorite Item, with Item being the category of your items. For instance, if you have an array of your favorite bands, the button will read "Favorite Band."

//Build Selection Color Button
let selectionButton = new HTMLasJS(
    "button",
    {
        id: "selectionButton",
        'v-on:click': "selectNext",
    },
    {
        cursor: "pointer",
        outlineStyle: 'none',
        display: 'block',
        margin: '2px auto',
        fontSize: "1.2em",
        padding: '0.5em',
        width: 'fit-content',
        border: 'none',
        borderRadius: '15px',
        backgroundColor: 'black',
        color: 'white',
    },
    'Cycle Selection Color'
);

//Build Button onto the Page
vueOurList.html.get().appendChild(selectionButton.build());

// 12. When the user clicks the button, a paragraph under the button will appear with the text "My favorite category is category item!" Again, for example, if your category is bands and one item is My Chemical Romance, the paragraph at some time will read "My favorite band is My Chemical Romance!"

//Establish a Selection Data Property
vueOurList.data.selection = { active: false , index: 0 }
//Establish a Computed Property for the Selection Message
vueOurList.computed.selectionMsg = (colorList,selectionProp) => {
    //If Selection isn't active, return
    if (!selectionProp.active) {
        return 'No color is selected yet!';
    }

    //Bind the Color Object from the Color List
    let selected = colorList[selectionProp.index]
    //Update the Selection Message
    return "Selected" + colorObjToString(selected,"white");
}

//Build Selection Message onto the Page
let selectionMsgHTML = new HTMLasJS(
    "p",
    {
        'v-show': 'selection.active',
        'v-html': 'selectionMsg'
    },
    {
        cursor: "pointer",
        outlineStyle: 'none',
        display: 'block',
        margin: '5px auto',
        fontSize: "1.2em",
        padding: '0.5em',
        width: 'fit-content',
        border: 'none',
        borderRadius: '15px',
        backgroundColor: 'black',
        color: 'white',
    },
);

//Build Selection Message onto the Page
vueOurList.html.get().appendChild(selectionMsgHTML.build());

// 13. With each button click, the favorite band selected will change to cycle through your list.
//Add a Property to the Data to Indicate the Selection
vueOurList.methods = {
    selectNext: (colorsList,selectionProp) => {

        //If the Selection Property isn't Active, activate it
        if (!selectionProp.active) {
            selectionProp.active = true;
            console.log("Selection Activated!", selectionProp);
            return selectionProp;
            //console.log("Selection Activated!")
        }

        //If it is Active, increment it
        selectionProp.index++;

        //If the Index is beyond the length of the list, reset it
        if (selectionProp.index > colorsList.length - 1) {
            selectionProp.index = 0
        }

        //Log the Selection
        console.log("Selection Incremented!", selectionProp);
        //Fluent such that it can Update the Original Selection Property Object
        return selectionProp;
    }
}


//========= Vue OurList ==== Add Input into List ===========//
// 14. After this button, you will add functionality to allow a user to add a language to the list. To do this, you will need to create a label, input, and button.
//Create a Data Property to Bind the User Color Input
vueOurList.data.colorInput = '';

//Function to Extract Both a Color Name and Hex from the Text Input
function extractColorInfo(input) {
    //Initialize variables for color name and hash
    let color = {name: '', hex: ''}

    //Find the index of the hex symbol
    let hexIndex = input.indexOf('#');
    if (hexIndex === -1) { return null; } //Return null if no hex symbol is found

    //Extract the raw strings for the color name and hex
    let rawColorName = input.slice(0, hexIndex).trim();
    //Remove non-alphabetic characters and leading/trailing spaces from the rawColorName [ChatGPT]
    color.name = rawColorName.replace(/[^a-zA-Z\s]/g, '').trim();

    //Capture the 6 Immediate Digits after the # for the hex code and trim any spaces
    color.hex = input.slice(hexIndex + 1, hexIndex + 7).trim()
    //Ensure that the rawHex contains only 6 numeric digits
    if (color.hex.length !== 6) { return null; }

    //Return in the Same form as the other Color Objects
    return {
        c: color.name,
        h: `#${color.hex}`
    };
}

//Function to Parse a Color Object into a String
function colorObjToString(colorObj,textColor = "black") {
    return `
        Color: <span style="font-weight: 600; color: ${colorObj.h}"> ${colorObj.c} </span>  
        ( Hex - <span style="font-family: monospace; color: ${textColor}; font-size: 1.25em"> ${colorObj.h}</span> )
    `;
}

//Create the HTML Input and Input Label
vueOurList.customInput = {
    //Create a Label for a Text Input
    label: {
        html: new HTMLasJS(
            "label",
            {
                id: "textInputLabel",
                for: "textInput"
            },
            {
                display: "block",
                margin: "10px 0",
                fontSize: "1em",
                color: "black"
            },
            ""
        )
    },
    //Create a Text Input with a V-Model Data Binding
    input: {
        html: new HTMLasJS(
            "input",
            {
                id: "colorInput",
                type: "text",
                name: "colorInput",
                placeholder: "ColorName - #RRGGBB",
                //'v-on:keyup.enter': "addColor",
                'v-model': 'colorInput'
            },
            {
                letterSpacing: '0.2em',
                textAlign: 'center',
                color: 'black',
                display: "block",
                margin: "0 auto",
                fontSize: "1em",
                padding: "0.5em",
                width: "60%",
                border: "1px solid black",
                borderRadius: "5px"
            }
        )
    },
    //Create a Button with that utilizes the Input Value as Part of the Text
    button: {
        html: new HTMLasJS(
            "button",
            {
                id: "addColorButton",
                //'v-show' : "colorInputObj !== null",
                'v-on:click': "addColor",
                'v-html': "colorInputSubmitText"
            },
            {
                cursor: "pointer",
                outlineStyle: 'none',
                display: 'block',
                margin: '10px auto',
                fontSize: "1.2em",
                padding: '0.5em',
                width: 'fit-content',
                border: 'none',
                borderRadius: '15px',
                backgroundColor: 'white',
                color: 'black',
            }
        )
    }
};

//Build Inputs: Input Label, Text Input, and the Button onto the Page
vueOurList.html.get().appendChild(vueOurList.customInput.label.html.build());
vueOurList.customInput.label.html.get().appendChild(vueOurList.customInput.input.html.build());
vueOurList.customInput.label.html.get().appendChild(vueOurList.customInput.button.html.build());

//Create a Computed Property to Capture the Parsed Color Object
vueOurList.computed.colorInputObj = (colorInputString,colorsMetaData) => {
    let colorObj = extractColorInfo(colorInputString);
    if (colorObj !== null) { colorObj.user = true }
    if (colorObj === null && colorsMetaData !== undefined) {  }
    console.log(colorObj);
   // console.log(colorObj);
    return colorObj;
}

//Create a Method to Push/Add the New Color Object into the Color List
vueOurList.methods.addColor = (colorsList,colorInputObj,colorsMetaData) => {

    //If the Color Input Object is Null or is Simply Not an Object, Escape
    if (colorInputObj === null || typeof colorInputObj !== 'object') { return; }

    //Otherwise, Push the Color into the Colors List
    colorsList.push(colorInputObj)

    //Set the colorsMetaData to Active if it is Defined and Ready to Go
    if(colorsMetaData !== undefined) {
        colorsMetaData.active = true;
    }

    //Return the Color List just in case
    return colorsList;
}

//Create a Button with that utilizes the Input Value as Part of the Text

// 15. The button text should change depending on what the user enters into the input field.
//      1. Before the user starts typing, the button should read "Add to List."
//      2. When the user enters information, (for example, Candlebox), the button will then read "Add Candlebox to List." This change should happen as the user is typing in the input field.

vueOurList.computed.colorInputSubmitText = (colorInputObj) => {
    //If the Property is Null, Return
    if(colorInputObj === null) {
        //console.log("Color Input Object is Null:", colorInputObj);
        return "Type a Color & Hex to add it!";
    }
    //Return the Parsed String
    return "Add "+colorObjToString(colorInputObj)
};

// 16. When the user clicks the add to List button, the new item should be added to the list. However, the item contains an id and a name. Make sure the id continues in the same pattern and increases by one for each new addition.
vueOurList.data.colorsMetaData = {author: "Jay", id: 0};

//Updated functionality of colorsList computed Property to Adjust for an ID

// 17. The new item will then appear in the unordered list.
//colorsList is already a computed property so automatically updates

// 18. After the item is added to the list, a paragraph should appear that reads Candlebox has been added to your List!, for example.
//Create a Data Property for the Addition Message
vueOurList.data.colorAdditionMsgText = '';

//Build Addition Message HTML Container onto the Page
let logAdditionMessageHTML = new HTMLasJS(
    "p",
    {
        'v-show': 'colorsMetaData.active',
        'v-html': 'colorAdditionMsgText',
    },
    {
        cursor: "pointer",
        outlineStyle: 'none',
        display: 'block',
        margin: '5px auto',
        fontSize: "1.2em",
        padding: '0.5em',
        width: 'fit-content',
        border: 'none',
        borderRadius: '15px',
        backgroundColor: 'black',
        color: 'white',
        opacity: '0.5'
    }
);

//Build Log Addition Message onto the Page
vueOurList.html.get().appendChild(logAdditionMessageHTML.build());

vueOurList.computed.logColorAdditionMsg = (colorInputObj,colorsMetaData,appendElement=false) =>
{
    //If the Color Input Object is Not Ready, do Not Run the Function
    if(colorInputObj === undefined || colorInputObj === null) {
        return;
    }

    //Set the colorsMetaData to Active if it is Defined and Ready to Go
    if(colorsMetaData === undefined || colorsMetaData === null) {
        return;
    }
    //
    // //If there is already stored text
    // if(colorsMetaData.text !== undefined && colorsMetaData.active === false) {
    //     return colorsMetaData.text;
    // }


    //Define the Insertion Message
    let text = colorObjToString(colorInputObj, "white") + " was inserted at " + new Date().toLocaleTimeString('en-US', {hour12: false});

    //Check if there is a property titled 'user' and if there isn't, exit!
    if (colorInputObj.user === undefined) {
        console.log("Cannot validate creation of a color from the User")
    }

    //If appendElement Flag is Enabled, it Adds the Message to the Bottom
    if (appendElement) {
        let insertionMsgHTML = new HTMLasJS(
            "p",
            {
                id: `ColorInsertionMsg-${colorsMetaData.id}`
            },
            {
                opacity: "0.5",
                cursor: "pointer",
                outlineStyle: 'none',
                display: 'block',
                margin: '5px auto',
                fontSize: "1.2em",
                padding: '0.5em',
                width: 'fit-content',
                border: 'none',
                borderRadius: '15px',
                backgroundColor: 'black',
                color: 'white',
            },
            text
        );

        //Build Selection Message onto the Page
        vueOurList.html.get().appendChild(insertionMsgHTML.build());
    }

    return text;

}
//
// function logColorInput(colorInputObj,colorsMetaData,appendElement=false) {
//
//     //Set the colorsMetaData to Active
//     colorsMetaData.active = true;
//
//     //Define the Insertion Message
//     let text = colorObjToString(colorInputObj,"white") + " was inserted at " + new Date().toLocaleTimeString('en-US', { hour12: false });
//
//     //Check if there is a property titled 'user' and if there isn't, exit!
//     if (colorInputObj.user === undefined) {
//         console.log("Cannot validate creation of a color from the User")
//     }
//
//     if(appendElement) {
//         let insertionMsgHTML = new HTMLasJS(
//             "p",
//             {
//                 id: `ColorInsertionMsg-${colorsMetaData.id}`
//             },
//             {
//                 opacity: "0.5",
//                 cursor: "pointer",
//                 outlineStyle: 'none',
//                 display: 'block',
//                 margin: '5px auto',
//                 fontSize: "1.2em",
//                 padding: '0.5em',
//                 width: 'fit-content',
//                 border: 'none',
//                 borderRadius: '15px',
//                 backgroundColor: 'black',
//                 color: 'white',
//             },
//             text
//         );
//
//         //Build Selection Message onto the Page
//         vueOurList.html.get().appendChild(insertionMsgHTML.build());
//     }
//
//     return text;
// }

//Mount the List Component
const vueListComponent = Vue.createApp({
    data() { return vueOurList.data },
    methods: {
        //Selects Next Element in the Colors Array
        selectNext() {
            //Update the Original Selection Data and also execute the method
            this.selection = vueOurList.methods.selectNext(this.colors,this.selection);
        },
        //Adds User Inputted Color Element into the List
        addColor() {
            //Update the Original Colors List and also execute the Method
            console.log(this.colorInputObj)
            this.colors = vueOurList.methods.addColor(this.colors,this.colorInputObj,this.colorsMetaData);
            this.colorAdditionMsg();
        },

        //Message to Output to the Color Input
        colorAdditionMsg() {
            this.colorAdditionMsgText = vueOurList.computed.logColorAdditionMsg(this.colorInputObj,this.colorsMetaData,false);
        }
    },
    computed: {
        //List of Colors
        colorsList() {
            //if (this.colorInputObj !== null && typeof this.colorInputObj === 'object') { this.colors.push(this.colorInputObj)}
            return vueOurList.computed.colorsList(this.colors,this.colorsMetaData)
        },

        //Message to Output to the Selected Color Message on Cycling Color Selection
        selectionMsg() {
            return vueOurList.computed.selectionMsg(this.colors, this.selection);
        },

        //Parsed Color Input Object from the Text Input
        colorInputObj() {
            return vueOurList.computed.colorInputObj(this.colorInput,this.colorsMetaData)
        },

        //Message to Output to the Cycle Selection Color
        colorInputSubmitText() {
            return vueOurList.computed.colorInputSubmitText (this.colorInputObj)
        },

        // //Message to Output to the Color Input
        // colorAdditionMsg() {
        //     return vueOurList.computed.logColorAdditionMsg(this.colorInputObj,this.colorsMetaData)
        // }
    }
});

console.log(vueListComponent)
vueListComponent.mount('#VueList');



// let selectionMsgHTML = new HTMLasJS(
//     "p",
//     {
//         'v-show': 'selection.active',
//         'v-html': 'selectionMsg'
//     },
//     {
//         cursor: "pointer",
//         outlineStyle: 'none',
//         display: 'block',
//         margin: '5px auto',
//         fontSize: "1.2em",
//         padding: '0.5em',
//         width: 'fit-content',
//         border: 'none',
//         borderRadius: '15px',
//         backgroundColor: 'white',
//         color: 'black',
//     },
//
// );
//
// //Build Selection Message onto the Page
// vueOurList.html.get().appendChild(selectionMsgHTML.build());


// 19. Create a readme.md file. (This will be the file where you add your web4 link).

// Completed
// 20. Upload your project to the web 4 server and github.

// 21. Submit your github server link/URL for the assignment submission.