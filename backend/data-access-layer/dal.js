const mongoose = require("mongoose");

function connectAsync() {
    return new Promise((resolve, reject) => {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        };//console warnings
        mongoose.connect(process.env.MONGODB_URI || config.database.connectionString, options, (err, db) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(db);
        });
    });
}

connectAsync()
    .then(db => console.log("Connected to mongoDB"))
    .catch(err => console.log(err));