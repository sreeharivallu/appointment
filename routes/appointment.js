var mysql = require('promise-mysql');
var connection;

var connection_params = {
    host     : 'db4free.net',
    user     : 'sreehari',
    password : 'Atskgn22',
    database : 'signup',
    timezone: 'utc'
};


var bookAppointment = function(req,res,next){

    console.log('In booking appointment');

    let first_name = req.body.first_name || null;
    let last_name = req.body.last_name || null;
    let phone = req.body.phone || null;
    let email = req.body.email || null;
    let DOB = req.body.DOB || null;
    let gender = req.body.gender || null;
    let place = req.body.place || null;
    let date = new Date(req.body.appointment_datetime);
    let appointment_datetime = date.getFullYear() + '-' +
    ('00' + (date.getMonth()+1)).slice(-2) + '-' +
    ('00' + date.getDate()).slice(-2) + ' ' + 
    ('00' + date.getHours()).slice(-2) + ':' + 
    ('00' + date.getMinutes()).slice(-2) + ':' + 
    ('00' + date.getSeconds()).slice(-2);
console.log(appointment_datetime);

    mysql.createConnection(connection_params)
    .then(function(conn){
        connection = conn;        
        var insert_query = `INSERT INTO user (first_name, last_name, email, phone, gender, place) 
            VALUES ('${first_name}', '${last_name}', '${email}', '${phone}','${gender}', '${place}')`;
        console.log('query is', insert_query);
        return connection.query(insert_query)
    })
    .then(result => {
        console.log('insert result is', result);
        let doctor_id = 1;
        var insert_query = `INSERT INTO appointments (user_id, appointment_date, doctor_id) 
            VALUES ('${result.insertId}', '${appointment_datetime}', ${doctor_id})`;
            console.log(insert_query);
        return connection.query(insert_query);
    })
    .then(results => {
        console.log('insert result is', results);
        var select_query = `SELECT * FROM user where phone='${phone}'`;
        return connection.query(select_query);
    })    
    .then(results => {
        console.log('select result is', results);
        connection.end();
        return res.send(results);
    })
    .catch(err => {
        console.log('error is', err);
        connection.end();
        return res.send(err)
    });
}


var listAppointments = function(req,res,next){
    console.log('params is', req.params);
    let appointments_date = req.params.date;
    mysql.createConnection(connection_params)
    .then(function(conn){
        connection = conn;        
        var select_query = `SELECT u.*,a.appointment_date FROM user u JOIN appointments a ON u.id=a.user_id where a.appointment_date LIKE '${appointments_date}%' `;
            console.log(select_query);
        return connection.query(select_query);
    })
    .then(result => {
        console.log('select results', result);
        return res.send(result);
    })
    .catch(err => {
        console.log('error is', err);
        connection.end();
        return res.send(err)
    });
}

module.exports = {
    bookAppointment,
    listAppointments
}
