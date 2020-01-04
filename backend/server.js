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


        app.post('/addtocart', async (req, res) => {
            try {
                console.log('req session', req.session);
                console.log('body add to cart', req.body);
                request.query(`SELECT cartID FROM dbo.Cart
                WHERE email='${req.session.currentUser.email}' AND isCheckedOut=0
                `, function (err, data) {
                    if (err) {
                        console.log('error ne', err);
                        res.status(500).json({
                            success: false,
                            message: error.message,
                        }
                        );
                    }
                    else {
                        console.log('cart de them vao db', data.recordset[0].cartID);
                        console.log('req body ne', req.body);
                        var cartID = data.recordset[0].cartID;
                        request.query(`SELECT * from dbo.Cart_Product WHERE
                        cartID='${data.recordset[0].cartID}' AND productID='${req.body.item.productID}'
                        `, function (err, data) {
                            if (!data.recordset[0]) {
                                request.query(`INSERT INTO dbo.Cart_Product
                            ( productID, cartID, quantity )
                    VALUES  ( ${req.body.item.productID}, 
                              ${cartID}, 
                              1  
                              )`, function (err, data) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        console.log('add to cart success', data);
                                    }
                                })
                            }
                            else {
                                request.query(`UPDATE dbo.Cart_Product
                                  SET 
                                  quantity=${data.recordset[0].quantity + 1}
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
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                })
            }
        })

        app.get('/getCart', async (req, res) => {
            try {
                console.log(req.session.currentUser);
                request.query(`SELECT dbo.Product.productID , name, price, quantity,imageURL,description  FROM dbo.Cart INNER JOIN dbo.Cart_Product
                ON Cart_Product.cartID = Cart.cartID
                INNER JOIN dbo.Product
                ON Product.productID = Cart_Product.productID
                WHERE cart.email='${req.session.currentUser.email}' AND isCheckedOut=0
            
                `, function (err, data) {

                    console.log('data get cart', data);
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
                request.query(`select * from Product ` , function (err, data) {

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


        app.get('/upload', async (req, res) => {
            try {
                request.query(`SELECT * FROM dbo.Users
                WHERE email='${req.session.currentUser.email}'`,function(err,data){
                    console.log('user de upload',data.recordset[0]);
                    res.status(200).json({
                        success: true,
                        data: {
                            data: data,
                            permission: data.recordset[0].permissionID,
                            currentUser: req.session.currentUser,
                        },
                    });
                })
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
                                console.log('data query sql', data);
                                if (data.recordset.length !== 0) {
                                    res.status(400).json({
                                        success: false,
                                        message: 'Email has been used'
                                    });
                                }
                                else {
                                    const hasPassword = bcryptjs.hashSync(req.body.password, 10);
                                    console.log('pass ne', hasPassword);
                                    request.query(`
                                
                                      INSERT INTO dbo.Users
        ( email ,
          name ,
          password ,
          permissionID ,
          address ,
          phone
        )
VALUES  ( '${req.body.email}' , -- email - varchar(51)
          '${req.body.name}' , -- name - varchar(30)
          '${hasPassword}' , -- password - text
          2 , -- permissionID - int
          '${req.body.address}' , -- address - varchar(200)
          '${req.body.phone}'  -- phone - varchar(20)
        )
                                      `, function (err, data) {
                                        if (err) console.log(err);
                                        else {
                                            console.log('data them vao', data);
                                            request.query(`INSERT INTO dbo.Cart
                                            ( email, isCheckedOut )
                                    VALUES  ( '${req.body.email}', -- email - varchar(51)
                                              0  -- isCheckedOut - bit
                                              )`), function (error, data) {
                                                    if (error) { console.log('error cart register', error); }
                                                    else {
                                                        res.status(201).json({
                                                            success: true,
                                                            message: 'sign up success'
                                                        });
                                                    }
                                                };

                                        }
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
                    if (data.recordset.length == 0) {
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
                            // name: data.recordset[0].name,
                        };
                        //     request.query(`SELECT cartID FROM dbo.Cart
                        // WHERE email='${req.session.currentUser.email}' AND isCheckedOut=0`, function (err, datata) {
                        //     req.session.cartID= datata.recordset[0].cartID;
                        //     console.log('datata',datata);
                        //     console.log('session session',req.session);
                        //     })





                        res.status(200).json({
                            success: true,
                            message: "Login Success",
                            data: {
                                email: data.recordset[0].email,
                                name: data.recordset[0].name,
                                phone: data.recordset[0].phone,
                                address: data.recordset[0].address,
                                permission: data.recordset[0].permissionID,
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



        app.post("/addProduct", async (req, res) => {
            try {
                    console.log(req.body);
                    request.query(`INSERT INTO dbo.Product
                    ( name, price, description, imageURL )
            VALUES  ( '${req.body.name}', -- name - varchar(100)
                      ${req.body.price} , -- price - int
                      '${req.body.des}',
                      '${req.body.image}'
                      )`,function(err,data){
                        if(err){console.log(err);}
                        else{
                            console.log('okay');
                            res.status(200).json({
                                success: true,
                                message: "Add Success",
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


        app.post("/delCartProduct", async (req, res) => {
            try {
                    console.log(req.body);
                    request.query(`SELECT cartID FROM dbo.Cart
                    WHERE email='${req.session.currentUser.email}' AND isCheckedOut=0 `,function(err,data){
                        if(err){console.log(err);}
                        else{
                            console.log('okay');
                            cartID=data.recordset[0].cartID;
                            request.query(`
                            DELETE FROM dbo.Cart_Product
                            WHERE cartID='${cartID}' AND productID='${req.body.item.productID}'`,function(err,data){
                                if(err) console.log(err);
                                else {
                                    console.log('okay');
                                    res.status(200).json({
                                        success: true,
                                        message: "delete Success",
                                    })
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

        app.post("/delProduct", async (req, res) => {
            try {
                    console.log(req.body);
                    request.query(`DELETE FROM dbo.Product 
                    where productID='${req.body.item.productID}'`,function(err,data){
                        if(err){console.log(err);}
                        else{
                            console.log('okay');
                            res.status(200).json({
                                success: true,
                                message: "Add Success",
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


        app.post("/checkout", async (req, res) => {
            try {
                console.log('req body checkout ne', req.body);
                request.query(`SELECT * FROM dbo.Cart
                WHERE email='${req.session.currentUser.email}' AND isCheckedOut=0`, function (error, datata) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        cartID = datata.recordset[0].cartID;
                        request.query(`INSERT INTO dbo.Receipt
                ( cartID, email, address )
        VALUES  ( ${cartID}, -- cartID - int
                  '${req.session.currentUser.email}', -- email - varchar(51)
                  '${req.body.address}'  -- address - varchar(100)
                  )`, function (err, data) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log('oke');
                                request.query(`UPDATE dbo.Cart SET isCheckedOut=1
                        WHERE cartID=${cartID}`, function (loi, dulieu) {
                                    if (loi) { console.log(loi) }
                                    else {
                                        request.query(`INSERT INTO dbo.Cart
                                        ( email, isCheckedOut )
                                VALUES  ( '${req.session.currentUser.email}', -- email - varchar(51)
                                          0  -- isCheckedOut - bit
                                          )`,function(err,data){
                                            if(err){console.log(err);}
                                            else {
                                                console.log('okay');
                                        res.status(200).json({
                                            success: true,
                                            message: 'update success',
                                        })
                                            }
                                        })
                                        
                                    }
                                })
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
                console.log('req body update item ne', req.body);
                request.query(`SELECT cartID FROM dbo.Cart
                WHERE email='${req.session.currentUser.email}' AND isCheckedOut=0`, function (err, data) {

                    request.query(`UPDATE dbo.Cart_Product SET
                    quantity=${req.body.quantity} WHERE 
                    productID=${req.body.item.productID} AND cartID=${data.recordset[0].cartID}
                    `)
                });
                res.status(200).json({
                    success: true,
                    message: 'update success'
                })
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
        })






        app.get('/logout', (req, res) => {
            req.session.destroy((err) => {
                if (err) {
                    res.json({
                        success: false,
                        message: err.message
                    })
                } else {
                    res.json({success: true});
                }
            });
        });

        var server = app.listen(5000, function () {
            console.log('Server is running..');
        });


    }
});


