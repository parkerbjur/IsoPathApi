const { User } = require('../model/userModel');

User = require('../model/userModel');

/**
 * 
 * @param {{username: string, password: string, email: string}}} user holds information for user to be created
 */
function insertUser (user) {
    if(user.name == undefined) {
        throw Error("name is a required parameter")
    }

    let newUser = new User(user);
    newUser.insertOne().catch((error)=>{
        console.error(error);
    })
};