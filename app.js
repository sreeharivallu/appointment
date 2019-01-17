var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors');
var loginService = require('./authenticate');
var authorize = require('./authorize');

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

//Authenticate
app.post('/login', authenticate);

//User api's
app.post('/user/register', user.registerUser);
app.get('/user/:first_name/:email', authorize.authorize('user'), user.getUser);

//Appointment api's
app.post('/book_appointment', appointment.bookAppointment);
app.get('/appointments/:date', appointment.listAppointments);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


function authenticate(req, res, next){
    loginService.authenticate(req.body)
    .then(user =>{
        user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect'}) 
    })
    .catch(err => {
        console.log('err is', err);
        res.status(401).json({message: err});
    });
}

// function authorize(roles = []){
//     authorize.verify(token)
//     .then(user =>{

//     })
//     .catch(err =>{

//     })
// }
