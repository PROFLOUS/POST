const express = require('express');
const connectDB = require('./config/db');
const exphbs = require('express-handlebars');
const RoutePost= require('./routers/index')
const path = require('path');
const bodyParser = require('body-parser');
const method = require('method-override');
const redis = require('./config/redis');


const app = express();

//start handlebars
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'hbs');


app.use(method('_method'));

app.use(express.json());
connectDB();
app.use(express.static(path.join(__dirname,'/public/')))
app.use('/posts',express.static(path.join(__dirname,'/public/')))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/showFormAdd', (req, res) => {
    res.render('./formAdd')
})
app.get('/fun', (req, res) => {
    res.render('fun')
})
app.get('/fun/shell', (req, res) => {
    res.render('shell')
})

app.use("/posts", RoutePost);

const PORT =5000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

