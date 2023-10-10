/**
 * Author: Jay Annadurai
 * Date: 06 Oct 2023
 * File: Media.class.js
 * Project: N320-Base
 * Description: Media Parent Class
 */

/* Class Details
    - id
    - title
    - publication year
    - value
 */
/**
 * Media Objects contains information about a catalog item
 */
export class Media {

    //Static Property with Media IDs
    static ids = [ ];

    //Static Method to Update ID Count
    // static assignID(id='') {
    //
    //     let ids = this.constructor.ids;
    //
    //     try {
    //         //Assign an ID if unassigned
    //         if(id === '') { id = 1 }
    //         //Convert the ID into an Integer
    //         id = parseInt(id);
    //         //Error Handle
    //         if (typeof id !== 'number') throw {msg: 'ID is not a valid number', data: id};
    //
    //
    //         //Check if the IDs array includes the assigned ID and increment it until it's a new value
    //         while(ids.includes(id)) {
    //             id++;
    //         }
    //         //Push the New ID value into the Array of Issued IDs
    //         ids.push(id);
    //
    //
    //     } catch(error) {
    //         console.log(error);
    //     }
    //
    //     //Return the ID
    //     return id;
    // }//End of assignID static Method

    set id(mediaID) {

        let ids = this.constructor.ids;

        try {
            //Assign an ID if unassigned or if the ID is already utilized
            if(mediaID === '' || ids.includes(mediaID)) { mediaID = 1 }

            //Convert the ID into an Integer
            mediaID = parseInt(mediaID);

            //Error Handler
            if (typeof mediaID !== 'number') throw {msg: 'ID is not a valid number', data: mediaID};

            //Check if the IDs array includes the assigned ID, set it 1 and increment it until it's a new value
            while(ids.includes(mediaID)) {
                mediaID++;
            }
            //Push the New ID value into the Array of Issued IDs
            ids.push(mediaID);

        }
        //Log Any Errors
        catch(error) {
            console.log(error);
        }

        //Return the ID
        this._id = mediaID;

    }//End of id setter Method

    get id() {
        return this._id;
    }

    set value(valueUSD) {
        this._value = {usd: parseFloat(valueUSD)};
        return this;
    }

    get value() {
        return this._value.usd;
    }

    set image(path) {
        //If the Image Path is Empty, Set it to the Image not Found Image
        if(path === '') {
            path = 'NoImg.png';
            console.log('Warning: No Image Found!', this);
        }

        //Bind the Image Path
        this.img = path;

        //If the Image Path is not already a URL or has no directories
        if(!(path.split('/').length > 1 || path.split('\\').length > 1)) {
            //Assume the Image is stored in the Path Directory if it's simply a file
            this.img = '/Img/' + this.img;
        }

        //If the Image does not have a file extension, assume the Image is a jpg
        if(path.split('.').length === 1){
            this.img = this.img + '.jpg';
        }

        //Return the Object
        return this;

    }

    get image() {
        //Return the Image Path
        return this.img;
    }

    /**
     * @param title: string - Title of Media
     * @param publicationYear: int - Publication Year
     * @param valueUSD: float - Monetary Value of Item in USD
     * @param image: string - Path to an Image to Display
     * @param id: int - Default: '' - Media Object ID
     */
    constructor(title, publicationYear, valueUSD,image = '', id = '') {

        //Bind the Metadata
        this.title = title;
        this.year = publicationYear;
        this.value = valueUSD;

        //Bind an Image to the Media Item
        this.image = image;

        //Use the Setter Method to Set the ID
        this.id = id;
    }

}

/**
 * Book, subtype of Media
 */
export class Book extends Media {
    //Book: author, genre

    //Book constructor compresses parent constructor arguments via REST
    constructor(authorFirstName,authorLastName,genre,...mediaArgs) {
        //Expand the Media Arguments into the Parent Media Class
        super(...mediaArgs);
        //Bind the Unique Properties
        this.author = {first: authorFirstName, last: authorLastName};
        this.genre = genre;
    }
}

/**
 * DVD, subtype of Media
 */
export class DVD extends Media {
    //DVD: director, runtime

    //DVD constructor compresses parent constructor arguments via REST
    constructor(contentDirectorFirstName,contentDirectorLastName, contentRuntime,...mediaArgs) {
        //Expand the Media Arguments into the Parent Media Class
        super(...mediaArgs);
        //Bind the Unique Properties
        this.director = {first: contentDirectorFirstName, last: contentDirectorLastName};
        this.runtime = contentRuntime
    }
}


/**
 * CD, subtype of Media
 */
export class CD extends Media {
    //CD: artist, number of songs

    //CD constructor compresses parent constructor arguments via REST
    constructor(artistFirstName,artistLastName,quantitySongs,...mediaArgs) {
        //Expand the Media Arguments into the Parent Media Class
        super(...mediaArgs);
        //Bind the Unique Properties
        this.artist = {first: artistFirstName, last: artistLastName};
        this.songs = {length: quantitySongs};
    }
}


