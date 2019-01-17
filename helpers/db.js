var mysql = require('promise-mysql');

var connection_params = {
    host     : 'db4free.net',
    user     : 'sreehari',
    password : 'Atskgn22',
    database : 'signup',
    timezone: 'utc'
};

var connection;
mysql.createConnection(connection_params)
.then(conn => {
    connection = conn;    
});

async function isUserExist(userDetails){
   
    let isUserExist_query = `SELECT * FROM user`;    
    let filter = '';
    
    Object.entries(userDetails).forEach(([key,value]) => {        
        filter = filter+ key + `='${value}' AND `;
    })

    isUserExist_query = isUserExist_query + ' WHERE ' + filter.slice(0, -4);
    console.log('isUserExist_query is', isUserExist_query);
    return await connection.query(isUserExist_query);
}

async function addNewUser(userDetails){
    let first_name = userDetails.first_name || null;
    let last_name = userDetails.last_name || null;
    let phone = userDetails.phone || null;
    let email = userDetails.email || null;
    let DOB = userDetails.DOB || null;
    let gender = userDetails.gender || null;
    let place = userDetails.place || null;
    let passwd = userDetails.passwd || null;
    let role = userDetails.role || 'user';
    
    let insertUser_query =  `INSERT INTO user (first_name, last_name, email, phone, gender, place, passwd, role) 
        VALUES ('${first_name}', '${last_name}', '${email}', '${phone}','${gender}', '${place}', '${passwd}', '${role}')`;
    
    return await connection.query(insertUser_query)   
}

async function addNewAppointment(id, appointment_datetime, doctor_id = 1){
    let insertAppointment_query = `INSERT INTO appointments (user_id, appointment_date, doctor_id) 
            VALUES ('${id}', '${appointment_datetime}', ${doctor_id})`;
            console.log(insertAppointment_query);
        return await connection.query(insertAppointment_query);

}

async function listAppointments(appointments_date){
    let listAppointments_query = `SELECT u.*,a.appointment_date FROM user u JOIN appointments a ON u.id=a.user_id where a.appointment_date LIKE '${appointments_date}%' ORDER BY a.appointment_date`;
    return await connection.query(listAppointments_query);
}

module.exports = {isUserExist : isUserExist,
                  addNewUser : addNewUser,
                  addNewAppointment : addNewAppointment,
                  listAppointments : listAppointments};

