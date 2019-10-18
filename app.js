const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

//Middleware for my static files
app.use('/public', express.static('public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));