const mongoose = require('mongoose');

require('dotenv').config()

const connect = async () => {
    try{
        await mongoose.connect('mongodb://mongo:27017/posts', {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log('MongoDB Connected...');
    }catch(e){
        console.log(e.message);
        process.exit(1);
    }
}

module.exports = connect;