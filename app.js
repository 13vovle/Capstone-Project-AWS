let express = require('express')
let app = express();
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require("body-parser");

//Database URL Details 
let url = "mongodb://localhost:27017/StoreDB";

//middleware enable data from post method
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());            // enable cors policy for cross domin communication

//Database connection without warning 
const mongooseDbOption = {       // to avoid warning 
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(url, mongooseDbOption).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);   //ready to connect

//Connect the data 
mongoose.connection

//link to router module like a import concept. 
var User = require("./router/user.router.js");
var EmpAdmin = require("./router/employee-admin.router");
var Ticket = require("./router/ticket.router");
var Product = require("./router/product.router");

app.use("/user", User);
app.use("/emp", EmpAdmin);
app.use("/ticket", Ticket);
app.use("/product", Product)

app.use(express.static(process.cwd()));
app.get('/', (req, res) => { res.sendFile(__dirname + "index.html") });

app.listen(9090, () => console.log("Listening on port 9090..."));