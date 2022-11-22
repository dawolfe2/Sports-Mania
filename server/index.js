const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const e = require('express')
const saltRounds = 10;

// used for online hosting otherwise may get error connecting
// app.use(cors({
//     //origin: ["http://localhost:3000"],
//     //origin: ["https://starlit-scone-d78c67.netlify.app"],
//     origin: ["http://127.0.0.1:5500/index.html"],
//     methods: ["GET", "POST"],
//     credentials: true
// }));

//required
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// database connection information - must change to connect to database locally
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sports',
})

// details for connecting to database on heroku server
// mysql://b4baa5583f6588:f55feaaf@us-cdbr-east-06.cleardb.net/heroku_6790ad1ab9e7025?reconnect=true
// const db = mysql.createPool({
//     host: 'us-cdbr-east-06.cleardb.net',
//     user: 'b4baa5583f6588',
//     password: '',
//     database: 'heroku_6790ad1ab9e7025'
// })

// Login 
app.post('/api/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const sqlGetUser = "SELECT * FROM users WHERE username = ?";

    db.query(sqlGetUser, [username], (err, result) => {
        // if (err) {
        //     console.log("error")
        //     res.send({err:err})
        // }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {
                    console.log("Logged In");
                    res.send({ loggedIn: true })
                }
                else {
                    console.log("failed to login")
                    res.send({ loggedIn: false })
                }
            })
        }
        else {
            console.log("failed to login")
            res.send({ loggedIn: false })
        }
    });
});

// register new account
app.post('/api/register', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const first = req.body.first;
    const last = req.body.last
    const sqlGetUser = "SELECT * FROM users WHERE username = ?";

    bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(sqlGetUser, [username], (err, result) => {
            // if (err) {
            //     console.log("error")
            //     res.send({err:err})
            // }
            if (result.length == 0) {
                const sqlNewUser = "INSERT INTO users (username, password, email, first, last) VALUES (?, ?, ?, ?, ?)";
                db.query(sqlNewUser, [username, hash, email, first, last], (err, result) => {
                    const sqlNewUserFav = "INSERT INTO favorites (username) VALUES (?)";
                    db.query(sqlNewUserFav, [username], (err, result) => {
                        console.log("account created")
                        res.send({ newaccount: true })
                    });
                });
            }
            else {
                console.log("user already exists")
                res.send({ newaccount: false })
            }
        });
    })
});

//add player favorite to user
app.post('/api/favoriteplayer', (req, res) => {

    const username = req.body.username;
    const favorite = req.body.favorite
    const sqlGetFavorites = "SELECT * FROM favorites WHERE username = ?";

    db.query(sqlGetFavorites, [username], (err, result) => {
        // if (err) {
        //     console.log("error")
        //     res.send({err:err})
        // }
        if (result.length > 0) {
            pfav = [null, null, null, null, null, null, null, null, null, null]
            pfav[0] = result[0].playerfav1
            pfav[1] = result[0].playerfav2
            pfav[2] = result[0].playerfav3
            pfav[3] = result[0].playerfav4
            pfav[4] = result[0].playerfav5
            pfav[5] = result[0].playerfav6
            pfav[6] = result[0].playerfav7
            pfav[7] = result[0].playerfav8
            pfav[8] = result[0].playerfav9
            pfav[9] = result[0].playerfav10

            newfavorite = true
            index = 0
            while (newfavorite && index < 10) {
                if (favorite == pfav[index]) {
                    newfavorite = false
                }
                index = index + 1
            }

            if (newfavorite) {
                if (pfav[0] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET playerfav1 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }
                else if (pfav[1] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET playerfav2 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }

                else if (pfav[2] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET playerfav3 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }
                else if (pfav[3] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET playerfav4 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }
                else if (pfav[4] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET playerfav5 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }
                else if (pfav[5] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET playerfav6 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }
                else if (pfav[6] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET playerfav7 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }
                else if (pfav[7] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET playerfav8 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }
                else if (pfav[8] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET playerfav9 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }
                else if (pfav[9] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET playerfav10 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }
                else {
                    res.send({ status: 1 })
                }
            }
            else {
                res.send({ status: 2 })
            }
        }
        else {
            res.send({ status: 3 })
        }
    });
});

//add team favorite to user
app.post('/api/favoriteteam', (req, res) => {

    const username = req.body.username;
    const favorite = req.body.favorite
    const sqlGetFavorites = "SELECT * FROM favorites WHERE username = ?";

    db.query(sqlGetFavorites, [username], (err, result) => {
        // if (err) {
        //     console.log("error")
        //     res.send({err:err})
        // }
        if (result.length > 0) {
            tfav = [null, null, null, null, null, null, null, null, null, null]
            tfav[0] = result[0].teamfav1
            tfav[1] = result[0].teamfav2
            tfav[2] = result[0].teamfav3
            tfav[3] = result[0].teamfav4
            tfav[4] = result[0].teamfav5
            tfav[5] = result[0].teamfav6
            tfav[6] = result[0].teamfav7
            tfav[7] = result[0].teamfav8
            tfav[8] = result[0].teamfav9
            tfav[9] = result[0].teamfav10

            newfavorite = true
            index = 0
            while (newfavorite && index < 10) {
                if (favorite == tfav[index]) {
                    newfavorite = false
                }
                index = index + 1
            }
            if (newfavorite) {
                if (tfav[0] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET teamfav1 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }
                else if (tfav[1] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET teamfav2 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }

                else if (tfav[2] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET teamfav3 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }
                else if (tfav[3] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET teamfav4 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }
                else if (tfav[4] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET teamfav5 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }
                else if (tfav[5] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET teamfav6 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }
                else if (tfav[6] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET teamfav7 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }
                else if (tfav[7] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET teamfav8 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }
                else if (tfav[8] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET teamfav9 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }
                else if (tfav[9] == null) {
                    const sqlInsertFavorite = "UPDATE favorites SET teamfav10 = ? WHERE username = ?";
                    db.query(sqlInsertFavorite, [favorite, username], (err, result) => {
                        if (err) {
                            console.log(err)
                            res.send({ err: err })
                        }
                        else {
                            res.send({ status: 0 })
                        }
                    });
                }
                else {
                    res.send({ status: 1 })
                    console.log("favorite list is full")
                }
            }
            else {
                res.send({ status: 2 })
                console.log("Favorite Already Exists")
            }
        }
        else {
            res.send({ status: 3 })
            console.log("Not Logged In")
        }
    });
});

app.post('/api/getfavorites', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "SELECT * FROM favorites WHERE username = ?";

    db.query(sqlGetFavorites, [username], (err, result) => {

        if (result.length > 0) {
            res.send(result)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritep1', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET playerfav1 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritep2', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET playerfav2 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritep3', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET playerfav3 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritep4', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET playerfav4 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritep5', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET playerfav5 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritep6', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET playerfav6 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritep7', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET playerfav7 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritep8', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET playerfav8 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritep9', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET playerfav9 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritep10', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET playerfav10 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritet1', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET teamfav1 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritet2', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET teamfav2 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritet3', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET teamfav3 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritet4', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET teamfav4 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritet5', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET teamfav5 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritet6', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET teamfav6 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritet7', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET teamfav7 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritet8', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET teamfav8 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritet9', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET teamfav9 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});

app.post('/api/removefavoritet10', (req, res) => {

    const username = req.body.username;
    const sqlGetFavorites = "UPDATE favorites SET teamfav10 = NULL WHERE username = ?";
    db.query(sqlGetFavorites, [username], (err, result) => {
        if (result.length > 0) {
            res.send(true)
        }
        else {
            res.send({ err: err })
        }
    });
});


// listening to port for online hosting
// app.listen(process.env.PORT || PORT, () => {
//     console.log('running on port ${PORT}');
// })

// listening to local port 3001
app.listen(3001, () => {
    console.log("running on port 3001");
})
