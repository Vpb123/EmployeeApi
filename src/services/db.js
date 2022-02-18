const mysql = require('mysql');

const config = require("./db.config");
const conn=mysql.createConnection({
    host:config.HOST,
    user:config.USER,
    password:config.PASSWORD,
    database:config.DB
});

//connecting to database
conn.connect((err)=>{
    if(err){
      throw err;
    }
    console.log("MySQL database connected successfully");
});

module.exports= conn;