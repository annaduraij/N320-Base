/**
 * Author: Jay Annadurai
 * Date: 11 Sep 2023
 * File: HTMLasJS.js
 * Project: N320-Base
 * Description:
 */

//---------------------------------------------------------
//                        JS Classes
//---------------------------------------------------------

//Class to Create JS Objects that Represent an HTML Object
export class HTMLasJS {
    //Constructor
    //All Arguments can be Objects themselves
    /**
     * Class to Create JS Objects that Represent an HTML Object
     * @param htmlTag - String of HTML Tag
     * @param htmlAttributes - HTML Tag Attributes: { id: '<id>' , class: '<class>' }
     * @param cssStyles - HTML Style Arguments: { display: 'flex' , flexFlow: 'row warp' }
     * @param innerHTML - Inner HTML Content as String
     * @param htmlDataset - HTML Datasets: { 'dataset1': value1 , 'dataset2': value2}
     * @param extraAttributes - Custom Attributes for Manual Use
     */
    constructor(htmlTag = '',htmlAttributes = {},cssStyles = {},innerHTML = '', htmlDataset= {},extraAttributes = {}) {

        //HTML Tag to Construct Element
        this.tag = htmlTag;

        //HTML Attributes such as ID & Class
        this.attributes = htmlAttributes;

        //HTML Dataset Attributes
        //Note, several Dataset Key: Value pairs may be stored under 'dataset'
        this.dataset = htmlDataset;

        //Style Properties such as Width & Height
        this.style = cssStyles;

        //InnerHTML Content of the HTML Div Element
        this.innerHTML = innerHTML;

        //Miscellaneous Properties
        this.extras =  extraAttributes;

        //Instance Method to Build HTML Element from JS Object
        this.build = function (returnHTML = true, buildHTML = true)
        {

            //Create HTML Element with correct tag and Implant into Carrier Variable
            let elementHTML = document.createElement(this.tag);

            //Set HTML Element's InnerHTML content
            elementHTML.innerHTML = this.innerHTML;

            //Attach Attributes to the HTML Div using a for...in... loop [Equivalent of forEach in Associative Arrays]
            //Iterate Through All HTML Attributes
            for (let attributeName in this.attributes){

                //HTML Attribute Value is the Value stored under the Attribute name of the parent attributes property
                let attributeValue = this.attributes[attributeName];

                //Set elementHTML Attribute
                elementHTML.setAttribute(attributeName, attributeValue);

            } //End of forIn Loop for Attributes

            //Attach Datasets to the HTML Div using a for...in... loop [Equivalent of forEach in Associative Arrays]
            //Iterate Through All Dataset Key-Value Pairs
            for (let datasetKey in this.dataset){

                //Dataset Value is the Value stored under the Key of the parent dataset property
                let datasetValue = this.dataset[datasetKey];

                //Set elementHTML Dataset Attribute
                elementHTML.dataset[datasetKey] = datasetValue;

            } //End of forIn Loop for Attributes

            //Attach Style Properties to the HTML Div using a for...in... loop [Equivalent of forEach in Associative Arrays]
            for (let property in this.style){

                //Log the Initial Object Properties
                //console.log(property,this.style[property]);

                //Can use the Javascript Object as an Array functionality
                //Remember a named function is just a function bound to a name/var

                elementHTML['style'][property.toString()] = this.style[property];

            } //End of forIn Loop for Style Properties

            //If the Method Argument requires Building the HTML Object
            //Set the Attribute of the HTMLasJS Object to Include the HTML Object
            if (buildHTML) { this.html = elementHTML;}

            //If the Method Argument requires Returning the HTML Object
            //Return the Completed HTML Object
            if (returnHTML) {return elementHTML;}


        } //End of method build()

        //Method to Return the Document HTML Entity that Corresponds to this JS Object Entity
        this.get = function() {
            return document.getElementById(this.attributes.id);
        }//End of get Method

        //Scale the JS Object Size Attributes and Update the HTML
        this.scale = function(scalingFactor,scaleWidth = true,scaleHeight = true,existingObj = true)
        {
            //Create an Array of Numeric Style Properties to Scale
            let styles = [];

            //If Width Scaling is Enabled, Scale the Width
            if (scaleWidth) { styles.push('width') }
            //If Height Scaling is Enabled, Scale the Height
            if (scaleHeight) { styles.push('height') }

            //Increment through Style Properties and Apply Respective Methods to Sale
            for (let i = 0; i < styles.length; i++){
                //Legacy: Logs of Conversion Steps
                //Log the Original Object
                //console.log('JS Object', elementObj);
                //Log the Style Object of the elementObj
                //console.log('JS Object: Style', elementObj['style']);
                //Log the Width of the Style Object of the elementObj
                //console.log('JS Object: Style: Width', elementObj['style']['width']);

                //Log the i value
                //console.log(styles[i]);

                //Convert the Property to a String
                let strProperty = styles[i].toString();

                let styleProperty = this['style'][strProperty];
                //Log the Original Representation
                //console.log('Original Value',styles[i],styleProperty);

                //Parse the Unit into an Integer
                styleProperty = this.constructor.decodeUnit(styleProperty);
                //Log the Numeric Representation
                //console.log('Numeric ',styles[i],styleProperty);

                //Scale the Value by the Scaling Factor
                styleProperty *= scalingFactor;
                //Log the Scaled Numeric Representation
                //console.log('Scaled Numeric ',styles[i],styleProperty);

                //Encode the Value and Store into JS Obj
                this['style'][strProperty] = this.constructor.encodeUnit(styleProperty);
                //Log the Encoded Representation
                //console.log('Encoded ',styles[i],elementObj['style'][strProperty]);

                //Overwrite the existing HTML Document entity with the new JS Object Info if the existingObj Arg is True
                if (existingObj) {
                    //Fetch the Actual HTML Element
                    let elementHTML = this.get();

                    //Take JS Obj Property and Assign to actual HTML Element
                    elementHTML['style'][strProperty] = this['style'][strProperty];
                    //Log the HTML Representation
                    //console.log('HTML CSS ',styles[i],elementObj['style'][strProperty]);
                }//End of If Statement to Manage Existing HTML Object

                //Update the Actual HTML Object encoded into the JS Object
                this.build(false,true);

            } //End of for Loop Function

        } //End of function scale()


        //Method to Change the Cursor upon Engaging with an Interactive Element
        this.setInteractive = function () {
            //Create an Event Handler that changes the Cursor to a Pointer on Hovering over the Button
            this.get().addEventListener('mouseover',function () {
                HTMLasJS.docBody.style.cursor = 'pointer';
            })//End of mouseover handler

            //Create an Event Handler that returns the Cursor to default on hovering out of the Button
            this.get().addEventListener('mouseout',function () {
                HTMLasJS.docBody.style.cursor = 'auto';
            })//End of mouseout handler
        }//End of Method to Set the Element as Interactive

        // Changes the Background Color of the Provided JS Element Obj to Provided Color and then Updates HTML Object
        this.setColor = function (color,existingObj = true)
        {

            //Update the JS Object Instance with the New Style Property
            this.style.backgroundColor = color.toString();

            //Update the Actual HTML Object encoded into the JS Object
            this.build(false,true);

            //Overwrite the existing HTML Document entity with the new JS Object Info if the existingObj Arg is True
            if (existingObj) {
                //Set the style property of the existing HTML Obj to reflect updated JS Object
                this.get().style.backgroundColor = this.style.backgroundColor;
            }

        } //End of 'setColor' Setter Method

        // Changes the Text Color of the Provided JS Element Obj to Provided Color and then Updates HTML Object
        this.setTextColor = function (color,existingObj = true)
        {

            //Update the JS Object Instance with the New Style Property
            this.style.color = color.toString();

            //Update the Actual HTML Object encoded into the JS Object
            this.build(false,true);

            //Overwrite the existing HTML Document entity with the new JS Object Info if the existingObj Arg is True
            if (existingObj) {
                //Set the style property of the existing HTML Obj to reflect updated JS Object
                this.get().style.color = this.style.color;
            }

        } //End of 'setTextColor' Setter Method

        // Changes the Font Weight of the Provided JS Element Obj to Provided Weight and then Updates HTML Object
        this.setFontWeight = function (fontWeight,existingObj = true)
        {

            //Update the JS Object Instance with the New Style Property
            this.style.fontWeight = fontWeight.toString();

            //Update the Actual HTML Object encoded into the JS Object
            this.build(false,true);

            //Overwrite the existing HTML Document entity with the new JS Object Info if the existingObj Arg is True
            if (existingObj) {
                //Set the style property of the existing HTML Obj to reflect updated JS Object
                this.get().style.fontWeight  = this.style.fontWeight
            }

        } //End of 'setTextColor' Setter Method

        // Sets the innerHTML of the JS Object and Updates the HTML Entity's innerHTML as Well
        this.setInnerHTML = function (newInnerHTML, existingObj = true) {

            //Set JS Obj's innerHTML Attribute to the Provided innerHTML
            this.innerHTML = newInnerHTML.toString();

            //Update the Actual HTML Object encoded into the JS Object
            this.build(false,true);

            //Overwrite the existing HTML Document entity with the new JS Object Info if the existingObj Arg is True
            if (existingObj) {
                //Set the innerHTML property of the existing HTML Obj to reflect updated JS Object
                this.get().innerHTML = this.innerHTML;
            }

        }//End of innerHTML Setter Method


        // Sets the Dataset Property of the JS Object and Updates the HTML Entity's Dataset as Well
        this.setDataset = function (datasetKey, datasetValue, existingObj = true) {

            //Set JS Obj's Dataset Property for the Dataset Key to the Dataset Value
            this.dataset[datasetKey] = datasetValue;

            //Update the Actual HTML Object encoded into the JS Object
            this.build(false,true);

            //Overwrite the existing HTML Document entity with the new JS Object Info if the existingObj Arg is True
            if (existingObj) {
                //Bind the Value stored inside the HTMLasJS Object's Dataset Values to the Actual HTML Element it Represents
                this.get().dataset[datasetKey] = this.dataset[datasetKey];
            }

        }//End of Dataset Setter Method

    }//End of HTMLasJS Obj Constructor

    //Static Properties
    static docBody = document.getElementsByTagName('body')[0];

    //Static Methods
    //Shifted to UtilHTML Class

}//End of HTMLasJS Class

//Class with Static HTML Utility Methods
export class UtilHTML{
    //Function to split a property's value and its unit
    static decodeUnit (intWithUnit,unit='px'){
        //Force Unit Suffix to String
        unit.toString();

        //Split the String based on the suffix
        //Return and store the first element aka [0]
        //This should be an integer
        let intWithoutUnit = intWithUnit.split(unit)[0];

        //Trim any Extra Space on the Right
        intWithoutUnit.trimEnd();

        //Return the Integer
        return intWithoutUnit;

    }//End of Static decodeUnit Method

    //Sister Function of decodeUnit that returns the Integer with the Unit
    static encodeUnit (intWithoutUnit,unit='px'){
        //Force Unit Suffix to String
        unit.toString();

        //Force intWithoutUnit to String
        intWithoutUnit = intWithoutUnit.toString();

        //Trim any Extra Space on the Right of the String
        intWithoutUnit.trimEnd();

        //Concatenate with String Addition
        //Joins the integer (as a string) and the unit (as a string)
        //let intWithUnit = intWithoutUnit+unit;

        //Return the Integer
        //return intWithUnit;

        //Inline Return
        return intWithoutUnit+unit;

    }//End of Static encodeUnit Method

    //Static Function to Parse a String from rgb(r,g,b) or rgba(r,g,b,a) to a Color Object
    //Argument is a string color in the format of 'rgb(r,g,b)' or 'rgba(r,g,b,a)'
    static parseColor(colorStr){

        //Trim any extra spaces from the Color String
        colorStr = colorStr.trim();

        //Set the String to Lowercase
        colorStr = colorStr.toLowerCase();

        //Check if the String Contains an Alpha Value
        //Redundant, just check for a fourth array element after stripping the 'rgba(' and ')' from the string
        //let enableAlpha = (colorStr.includes('a('));

        //Should now be in the form of rgb[a](r,g,b[,a]) AKA rgb(r,g,b) or rgba(r,g,b,a)

        //Error Handler- If the colorStr is Empty or Invalid
        if(typeof colorStr !== "string" || colorStr === '') {
            //Log the Error
            console.log("Parsed Color was Invalid",colorStr);
            //Return
            return;
        }

        //Trim the 'rgba(' or 'rgb(' portion by splitting on '('
        colorStr = colorStr.split("(");
        //Grab the string after it, which should be r,g,b[,a])
        colorStr = colorStr[1];

        //Trim the ')' portion at the end by splitting on ')' and grabbing the string before it
        colorStr = colorStr.split(")");
        //Grab the string before it, which should be r,g,b[,a]
        colorStr = colorStr[0];

        //Split the string, which should be now comma separated values
        colorStr = colorStr.split(",");
        //The array should now correspond to [r,g,b,a]
        //Grab the values and store as parsed r, g, b values
        let r = Number(colorStr[0]);
        let g = Number(colorStr[1]);
        let b = Number(colorStr[2]);
        if(colorStr[3] != null)

            //Define the Color Object
            var color = {red: r, green: g, blue: b};

        //If there is a fourth value in the colorStr, that would be the alpha value
        if(colorStr[3] != null) {
            //Parse the Alpha Value
            let a = Number(colorStr[3]);
            //Define the Color Object with the Alpha Property
            color.alpha = a;
        }
        //Return the Color Object
        return color;

    }// End of parseColor function

    //Static Randomization Method
    //function 'random' Chooses a Random Value Between Two Integers
    //Inclusive of Both Values
    static random(minimum, maximum) {
        //Set Minimum Value and Round It Up to the Next Value
        minimum = Math.ceil(minimum);
        //Set Maximum Value and Round It Down to the next Value
        maximum = Math.floor(maximum);
        //Generates Random Value
        let baseRandom = Math.random()

        //Normalized Random (Linear Adjustment), remember final function is wrapped in Math.floor, so it's rounded down and to counteract that, must raise by 1
        //Math.round() * Math.Random isn't used here because Math.round under-represents the endpoints
        //Consider 0: to get 0, 0.00 - 0.49 is an accepted value | Consider 1: to get 1, 0.50 - 1.49 is an accepted value
        //Note, if for whatever reason, Math.ceiling is using in the final adjustment, you'd subtract by 1 here to counteract the round up
        let scaleRandom = maximum - minimum + 1

        //Adjust the Value to the Minimum
        let interceptRandom = minimum;

        //Final Random
        //let random = Math.floor(baseRandom * scaleRandom + interceptRandom);

        //Return Random Integer
        //return random;

        //Inline Return
        return Math.floor(baseRandom * scaleRandom + interceptRandom);

    }//End of Random Function

    //Static String Uppercase Method
    //Gets first character of a string and uppercases it
    static ucFirst(string) {
        //Grab first character, upper case it and then append rest of the string
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

}

//Class to Create HTML Console Outputs
//Extends HTMLasJS
//Requires consoleObj to be Built into Page
export class Console extends HTMLasJS {
    //Specialized Constructor
    constructor(
        htmlTag = '',
        htmlAttributes = {},
        cssStyles = {},
        innerHTML = '',
        extraAttributes = {},
    ) {

        //Call the Parent Constructor for Most of the Functionality and Pass the incoming values
        super(
            htmlTag,
            htmlAttributes,
            cssStyles,
            innerHTML,
            extraAttributes
        );

    }//End of Constructor

    //Generate the Console
    //Technically is the Container of the Console Output Objects
    //Return HTMLasJS instance to create JS object to represent the HTML Console
    static generateConsole (
        htmlTag = 'div',
        htmlAttributes = { id: 'console'},
        cssStyles = {
            width: 'fit-content',
            height: 'fit-content',
            margin: '10px auto',
            padding: '10px',

            border: '1px solid black',
            borderRadius: '10px',
            backgroundColor: '#000000',
            color: 'rgb(44,61,58)',
            textAlign: 'center'
        },
        innerHTML = 'Console Log',
        extraAttributes = {},
    ){
        //Generate and Return the Console Object
        return new HTMLasJS(
            htmlTag,
            htmlAttributes,
            cssStyles,
            innerHTML,
            extraAttributes
        );
    } //End of Method to Generate Parent/Console Container

    //Store the Individual Console Entries into the Class
    static outputLog = [];

    //Static Field to Hold Console Counter
    static i = 0;

    //Generate the Console Entries
    //The Console Outputs that are then Placed into the Console Container
    //Returns HTMLasJS instance to create JS object to represent the HTML Console
    static generateConsoleEntry (
        innerHTML,
        logLines = true,
        htmlAttributes = {
            id: 'c' + Console.i,
            class: 'consoleEntry'
        },
        extraAttributes = {
            active: true
        },
        cssStyles = {
            width: 'available',
            height: 'fit-content',
            margin: '5px 0px',
            padding: '6px',

            border: '0px solid black',
            borderRadius: '5px',
            backgroundColor: '#000000',

            fontSize: '0.8em',
            color: '#ffffff',
            textAlign: 'left'
        },
        htmlTag = 'div'
    ){
        //Append the innerHTML to the console counter
        if(logLines) { innerHTML = `${Console.i}: `+innerHTML;}

        //Generate and Return the Console Object
        return new HTMLasJS(
            htmlTag,
            htmlAttributes,
            cssStyles,
            innerHTML,
            extraAttributes
        );
    } //End of Method to Generate Parent/Console Container

    //Store the Console Object Directly into the Class
    static obj = this.generateConsole();

    //Static Method to Log Information to the Console
    static log(consoleOutput) {

        //Increment the Static Field Counter
        Console.i++;

        //Iterate Through All Existing Console Entries
        for (let previousEntry of this.outputLog){
            //If Any are Active, Inactive Them and Set Text Color to a Duller Color
            if(previousEntry.extras.active) {
                previousEntry.setTextColor('#505050');
            }
        }

        //Generate the Console Entry
        let entry = this.generateConsoleEntry(consoleOutput);

        //Put the Console Entry into the Console Entry Log
        this.outputLog.push(entry);

        this.obj.get().insertBefore(
            //Build the Document Entity of the Console Element Obj
            entry.build(),

            //Place Right Before the Console's First Child Element
            //Keeps the Top of the Console Updated
            this.obj.get().firstElementChild
        );
    }

    //Static Method to Limit Size of Console
    static limitLogSize(logMaxLength = 5) {
        //If the Console Log has more than the Stated Maximum
        while (Console.outputLog.length>(logMaxLength)) {
            //Remove any excess
            //Remove the JS Object Instance from the Console Output Array
            Console.outputLog.shift();
            //Remove the HTML Object from the Page
            Console.obj.get().removeChild(Console.obj.get().lastChild);
        }//End of While Loop
    }

}//End of Console Class

//Class with Shortcut Methods
export class HJShortcuts {

    /**
     * Project Configuration
     * @type {{path: string, files: string[]}}
     */
    static css = {
        //Path to CSS directory from Root
        folderPath: 'Library/CSS/',
        //CSS Files to Inject
        files: [
            'normalize.css',
            'outline.css',
            'style.css',
            'vars.css'
        ]
    }

    /**
     * Builds Wrapper onto the Page
     * @param cssID - ID of Wrapper as String
     * @param cssClass - Class of Wrapper as String
     * @param cssStyles - Style Attributes of Wrapper
     * @returns {HTMLasJS} - Returns the HTMLasJS Wrapper Object
     */
    static buildWrapper(
        cssID='wrapper',
        cssClass='wrapper',
        cssStyles = {
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '',
        }
        ) {
        //Wrapper should flex the Containers into Divs
        let wrapperObj = new HTMLasJS(
            'div',
            {
                id:cssID,
            },
            {
                //Center the Text Inside
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                margin: ''
            },
        );

        //Build the WrapperObj onto the Page
        document.body.appendChild(wrapperObj.build());

        //Return the Wrapper Object
        return wrapperObj;

    } //End of buildWrapper Static Method

    //Inject CSS
    static injectCSS (pathToRoot) {
        //Iterate Through the CSS Files
        for (let cssFile of HJShortcuts.css.files) {
            //Define the Path to the CSS File
            let path = pathToRoot+HJShortcuts.css.folderPath+cssFile;

            //Create a Link to the Stylesheet
            let cssLink = new HTMLasJS(
                "link",
                {
                    type: "text/css",
                    rel: "stylesheet",
                    href: path
                }
            )

            //Build the Link into the Header
            document.head.appendChild(cssLink.build())
        } //End of For Of Loop

    }//End of injectCSS Static Method

}//End of HTMLasJS Shortcut Class, HJShortcut