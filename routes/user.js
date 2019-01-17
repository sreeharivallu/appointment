var mysql = require('promise-mysql');
var promise = require('bluebird');
var db = require('../helpers/db');

var registerUser = function(req,res,next){

    db.isUserExist({email: req.body.email})
    .then(userData => {
        console.log(userData);

        if(userData.length){ //If user already exist return existing userData
            return new Promise((resolve, reject) => { 
                return resolve(userData[0]);
            })
        }else{  // Add new user       
            return db.addNewUser(req.body)   
        }         
    })
    .then(userDetails => {
        res.status(200).json({status: 'success'});
    })
    .catch(err => {
        console.log('Error occured while adding a new user', err);
        res.status(500).json({success: false, error : {message:"Failed to add user"}});
    })
}

var getUser = function(req,res,next){
    db.isUserExist(req.params)
    .then(userData => {
        res.status(200).json({status: 'success', data: userData});
    })
    .catch(err => {
        res.status(500).json({success: false, error : {message:"Failed to get user"}});
    })
}

module.exports = {
    registerUser : registerUser,
    getUser : getUser
}