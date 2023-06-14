/* Import mysql function */
const mysql = require('mysql');

// Declare confidential details to database
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'synoptic',
    user: 'root',
    password: '',
    multipleStatements: true,
});

// Establish connection
connection.connect(function (error) {
    if (error) {    // Throw error if anything happens
        throw error;
    } else {        // Print successful message
        console.log('MySQL Database is connected Successfully');
    }
});

module.exports = connection;