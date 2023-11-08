const bcrypt = require('bcrypt')

class database {
    #database = new Array();

    constructor() {}

    /**
     * @param {Object} data_to_be_stored
     */

    set add_to_db(data_to_be_stored) {
        this.#database.push(data_to_be_stored)
    }

    get viewdb() {
        return this.#database
    }

    /**
     * 
     * @param {String} email The email to be checked
     * @param password The password to be compared
     * @returns {int} -1 : means email or user doesn't exist in the database
     *                 0 : email exists but incorrect password
     *                 1 : email exists and password is correct
     */
    async checkIfExists(email, password) {
        let found = false;
        
        for (let i = 0; i < this.#database.length; i++) {
            const each_person = this.#database[i];
            
            if (each_person.user_email === email) {
                const passwordMatched = await bcrypt.compare(password, each_person.user_password)
                
                if (passwordMatched) return 1
                else return 0
            }
        }
        
        return -1
    }
}

module.exports = database