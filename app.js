var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')

const app = express();
const appointment = require('./routes/appointment');

const port = process.env.PORT || 3000;
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

function mysql_connect(){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
    host     : 'db4free.net',
    user     : 'sreehari',
    password : 'Atskgn22',
    database : 'signup'
    });
    
    connection.connect();
    
    connection.query('SELECT * from user', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    });
    
    connection.end();

}

app.get('/', (req, res) => {
    mysql_connect();
    res.send('Hello World!')
})

app.post('/book_appointment', appointment.bookAppointment);
app.get('/appointments/:date', appointment.listAppointments);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
