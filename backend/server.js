const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
var sql = require("mssql");
var app=express();
var config = {
    user: 'sa',
    port:1433,
    password: 'Kin123123',
    server: 'localhost\\SQLEXPRESS', 
    database: 'shopping' 
};


sql.connect(config, function (err) {
    
    if (err) console.log(err);

    // create Request object
    else {
        app.use(cors({
            origin: ['http://localhost:3000'],
            credentials: true
        }));
        app.use(bodyParser.json());
        app.use(session({
            secret: 'keyboard cat',
            resave: true,
            saveUninitialized: false,
        }));


        var request = new sql.Request();
       
        // // query to the database and get the records
    
        app.get('/', async (req,res)=>{
           try{ request.query(`select * from Product`, function (err,data) {
            
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    }
                    );
                }
                else {console.log(data);
                    res.status(200).json({
                        success: true,
                        data: {
                            data: data
                        },
                    });}
                // send records as a response
                
                
            });}
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                })
            }
        })
        

        var server = app.listen(5000, function () {
            console.log('Server is running..');
        });
    
    
    }
});


