const mongoose = require('mongoose');

class Database {
    constructor() {
        this.init();
    }

    init() {
        const options = {
            dbName: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            pass: process.env.DB_PASSWORD,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        const uri = `mongodb://${process.env.DB_HOST}`;

        mongoose.connect(uri, options);
        mongoose.Promise = global.Promise;
    }
}

module.exports = new Database();