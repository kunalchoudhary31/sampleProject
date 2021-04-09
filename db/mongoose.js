const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/employees', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then((c) => {
    console.log('Connection Succesfull');
}).catch((e) => {
    console.log('Error occured' + e);
});