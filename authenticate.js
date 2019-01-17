const jwt = require('jsonwebtoken');
var db = require('./helpers/db');


async function authenticate(user= {email, passwd}) {
    
    if(user.email && user.passwd){
        let userDetails = await db.isUserExist(user);
        userObj = userDetails[0];
        if(userObj){
            console.log('authenticated userObj are', userObj);
            const token = jwt.sign({ sub: userObj.id, role: userObj.role }, 'secret');
            const { passwd, ...userWithoutPassword } = userObj;          
            return {...userWithoutPassword, token};
        }
    }else{        
        //throw new Error("email/passwd missing");
        throw "email/passwd missing";
    }
}

module.exports = {
    authenticate : authenticate
}