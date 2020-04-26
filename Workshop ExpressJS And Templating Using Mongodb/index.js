// const env = process.env.NODE_ENV || 'development';
global.__basedir = __dirname;
const dbConnector = require('./config/db');
dbConnector().then(() => {
    const config = require('./config/config')

    // const config = require('./config/config')[env];
    const app = require('express')();

    require('./config/express')(app);
    require('./config/routes')(app);

    app.listen(config.port, console.log(`Listening on port ${config.port}!`));
}).catch(console.error);


// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const dbUrl = 'mongodb://localhost:27017';
// const client = new MongoClient(dbUrl, { useUnifiedTopology: true });

// client.connect(function (err, client) {
//     if (err) { console.log(err); return; }

//     const db = client.db('testdb');
//     const users = db.collection('users');

//     users.insert({ name: 'Pavel' }).then(qs => {
//         console.log(qs)
//         users.deleteMany({ name: 'Pavel' }).then((res) => {
//             console.log(res);
//         })
//     });
// });