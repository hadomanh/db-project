const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const bcryptjs = require(`bcryptjs`);
const expressSession = require(`express-session`);
var sql = require("mssql");
var app = express();
const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var config = {
    user: 'sa',
    port: 1433,
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


        app.post('/addtocart',async (req,res)=>{
            try{
                console.log('req session',req.session);
                console.log('body add to cart',req.body);
                request.query(`SELECT cartID FROM dbo.Cart
                WHERE email='${req.session.currentUser.email}' AND isCheckedOut=0
                `, function (err, data) {
                    if (err) {
                        console.log('error ne',err);
                        res.status(500).json({
                            success: false,
                            message: error.message,
                        }
                        );
                    }
                    else {
                        console.log('cart de them vao db',data.recordset[0].cartID);
                        console.log('req body ne',req.body);
                        var cartID=data.recordset[0].cartID;
                        request.query(`SELECT * from dbo.Cart_Product WHERE
                        cartID='${data.recordset[0].cartID}' AND productID='${req.body.item.productID}'
                        `,function(err,data){
                            if (!data.recordset[0]){  request.query(`INSERT INTO dbo.Cart_Product
                            ( productID, cartID, quantity )
                    VALUES  ( ${req.body.item.productID}, 
                              ${cartID}, 
                              1  
                              )`,function(err,data){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log('add to cart success',data);
                                }
                              })}
                              else {
                                  request.query(`UPDATE dbo.Cart_Product
                                  SET 
                                  quantity=${data.recordset[0].quantity+1}
                                  WHERE
                                  cartID='${cartID}' AND productID='${req.body.item.productID}'
                                  `)
                              }
                        })

                      
                        res.status(200).json({
                            success: true,
                            data: {
                                data: data
                            },
                        });
                    }
                });
            }
            catch(error)
            {
                res.status(500).json({
                    success: false,
                    message: error.message,
                })
            }
        })

        app.get('/getCart', async (req, res) => {
            try {
                console.log(req.session.currentUser);
                request.query(`SELECT dbo.Product.productID , name, price, quantity  FROM dbo.Cart INNER JOIN dbo.Cart_Product
                ON Cart_Product.cartID = Cart.cartID
                INNER JOIN dbo.Product
                ON Product.productID = Cart_Product.productID
                WHERE cart.email='${req.session.currentUser.email}'
            
                `, function (err, data) {
                    
                    console.log('data get cart',data);
                    if (err) {
                        res.status(500).json({
                            success: false,
                            message: error.message,
                        }
                        );
                    }
                    else {
                        console.log(data);
                        res.status(200).json({
                            success: true,
                            data: {
                                data: data,
                                currentUser: req.session.currentUser
                            },
                        });
                    }
                    // send records as a response


                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                })
            }
        })

        app.get('/', async (req, res) => {
            try {
                console.log(req.session);
                request.query(`select * from Product`, function (err, data) {

                    if (err) {
                        res.status(500).json({
                            success: false,
                            message: error.message,
                        }
                        );
                    }
                    else {
                        console.log(data);
                        res.status(200).json({
                            success: true,
                            data: {
                                data: data,
                                currentUser: req.session.currentUser,
                            },
                        });
                    }
                    // send records as a response


                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                })
            }
        })



        app.post('/users/register', async (req, res) => {
            // validate email
            try {
                if (!emailRegex.test(req.body.email)) {
                    res.statusMessage(400).json({
                        success: false,
                        message: 'Invalid email adress',
                    });
                }
                // validate password
                else
                    if (req.body.repeatPass !== req.body.password) {
                        res.status(400).json({
                            success: false,
                            message: `Password and Repeat Password don't match`,
                        });
                    }
                    else
                        if (req.body.password.length < 6) {
                            res.status(400).json({
                                success: false,
                                message: 'Password must be more than 6 characters',
                            });
                        }
                        // email exist? 
                        else {
                            // const data = await UsersModel.findOne({ email: req.body.email }).lean();

                            request.query(`select * from Users where email='${req.body.email}' `, function (err, data) {
                                console.log('data query sql',data);
                                if (data.recordset.length!==0) {
                                    res.status(400).json({
                                        success: false,
                                        message: 'Email has been used'
                                    });
                                }
                                else {
                                    const hasPassword = bcryptjs.hashSync(req.body.password, 10);
                                    console.log('pass ne',hasPassword);
                                    request.query(`INSERT INTO dbo.Users
                                    ( email, name, password, permissionID )
                            VALUES  ( '${req.body.email}', -- email - varchar(51)
                                      '${req.body.name}', -- name - varchar(30)
                                      '${hasPassword}', -- password - text
                                      1  -- permissionID - int
                                      )`, function (err, data) {
                                if(err) console.log(err);
                                else{console.log('data them vao',data);
                                res.status(201).json({
                                    success: true,
                                    message:'sign up success'
                                });}
                                    })
                                }
                            })
                        }
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                })
            }
        });
        app.post("/user/login", async (req, res) => {
            try {
                console.log(req.body.email);
                request.query(`select * from Users where email='${req.body.email}' `, function (err, data) {
                    console.log('data login', data);
                    if (data.recordset.length==0) {
                        res.status(400).json({
                            success: false,
                            message: "Email doesn't exist"
                        })
                    }
                    else if (!bcryptjs.compareSync(req.body.password, data.recordset[0].password)
                        ) {
                        console.log('pass ne', data.recordset[0].password);
                        res.status(400).json({
                            success: false,
                            message: "Wrong Password"
                        })
                    }
                    else {
                        req.session.currentUser = {
                            email: data.recordset[0].email,
                        }
                        res.status(200).json({
                            success: true,
                            message: "Login Success",
                            data: {
                                email: data.recordset[0].email,
                            }
                        })
                    }
                })
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
        })





        app.post("/updateitem", async (req, res) => {
            try {
                console.log('req body update item ne',req.body);
                request.query(`SELECT cartID FROM dbo.Cart
                WHERE email='${req.session.currentUser.email}' AND isCheckedOut=0`,function(err,data){

                    request.query(`UPDATE dbo.Cart_Product SET
                    quantity=${req.body.quantity} WHERE 
                    productID=${req.body.item.productID} AND cartID=${data.recordset[0].cartID}
                    `)
                });
                res.status(200).json({
                    success:true,
                    message: 'update success'
                })
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
        })






        app.get('/logout',(req,res)=>{
            req.session.destroy();
            res.status(200).json({
                success: true,
                message: 'Log out success',
            });
            window.location.href='/login'
        });

        var server = app.listen(5000, function () {
            console.log('Server is running..');
        });


    }
});


