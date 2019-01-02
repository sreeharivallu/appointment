var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')

const app = express();
const appointment = require('./routes').appointment;
const user = require('./routes').user;

const port = process.env.PORT || 3000;
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {  
    res.send('Hello World!')
})

//User api's
app.get('/user/register', user.registerUser);
app.get('/user/:first_name/:email', user.getUser);

//Appointment api's
app.post('/book_appointment', appointment.bookAppointment);
app.get('/appointments/:date', appointment.listAppointments);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
