const vm = Vue.createApp({
    data() {
        return {
            fname: '',
            lname: '',
            preference: '',
            prefText: '',
            music: [],

            languages: [
                {
                    id: 'vuejs',
                    name: 'Vue',
                    version: 3.2,
                    creator: 'Evan You',
                    dateRelease: 2014,
                    framework: true
                },
                {
                    id: 'reactjs',
                    name: 'React',
                    version: 18.2,
                    creator: 'Jordan Walke',
                    dateRelease: 2011,
                    framework: true
                },
                {
                    id: 'angularjs',
                    name: 'Angular',
                    version: 1.8,
                    creator: 'Misko Hevery',
                    dateRelease: 2010,
                    framework: true
                },
            ]
        }
    },
    computed: {

        fullName() {
            if (this.fName == "" || this.lname == "") { return ""; }
            else { return `${this.fname} ${this.lname}` }
        },
        nameLength() {
            if (this.fName == "" || this.lname == "") { return ""; }
            else { return this.fname.length + this.lname.length; }
        },
        middleLetter() {
            if (this.fName == "" || this.lname == "") { return ""; }
            else { return this.fullName[Math.floor(this.nameLength / 2)] }
        },
        arraytoString() {
            newString = this.music.toString()
            console.log(newString)
            return newString + " "
        }
    },
    watch: {
        //WATCHERS HAVE TO HAVE THE SAME NAME AS THE PROPERTY THEY ARE WATCHING

        preference(newVal, oldVal) {
            if (oldVal != "") {
                this.prefText = `Your preference changed from ${oldVal} to ${newVal}`
            }
        }


    }

})


vm.mount('#moreVue');