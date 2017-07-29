var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

con.connect(function(err) {
    if (err) {
        console.log('connecting error:'+err);
        return;
    }
    console.log('connecting success');
});
