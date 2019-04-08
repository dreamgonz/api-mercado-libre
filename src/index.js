const express = require('express');
const app = express();
const morgan = require('morgan');

//settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

//routes
app.use(require('./routes/route'));

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());



// starting the serve

app.listen(3000, () => {
    console.log(`Server on port ${app.get('port')}`);
});
