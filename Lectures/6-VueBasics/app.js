/**
 * Author: Jay Annadurai
 * Date: 11 Sep 2023
 * File: app.js
 * Project: N320-Base
 * Description: Vue Basics
 */

//Import Vue Basics to Build HTML via JS

//Define Path to Root
const pathToRoot = '../../'

//Import the Modules
import {HTMLasJS,HJShortcuts, UtilJ,Console} from "../../Library/Modules/HTMLasJS.js";

//Inject CSS into the Head
HJShortcuts.injectCSS(pathToRoot);

//Build a Wrapper onto the Page
let wrapperHTML = HJShortcuts.buildWrapper();

//Build a HTML Console onto the Page
wrapperHTML.get().appendChild(Console.generateConsole().build());


//***** Vue Basics *****//

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greeting() {
        console.log (`Welcome ${this.name}! We have your age as ${this.age} years old.`)
    }
}

class Student extends Person {
    //Utilize Rest to Condense any Remainder of Arguments to an Array
    constructor(major,...personArgs) {
        //Expand the Array back to the original class
        super(...personArgs);
        this.major = major;
    }

    greeting() {
        super.greeting();
        console.log(`${this.name}'s major is listed as ${this.major}`);
    }
}

let jay = new Person  ("Jay",22);
let laura = new Student  ("Linguistics","Laura",19,);
jay.greeting(); laura.greeting();