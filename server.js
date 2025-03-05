const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mysql = require('mysql');  // Added SQL vulnerability
const fs = require('fs');
const multer = require('multer');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/vulnerableDB', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String,
    bio: String
}));

const sqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',  // Hardcoded credentials
    database: 'vulnerableDB'
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (user) {
        res.send(`Welcome, ${user.username}`);
    } else {
        res.status(401).send("Invalid credentials");
    }
});

app.get('/users', (req, res) => {
    const username = req.query.username;

    const query = `SELECT * FROM users WHERE username = '${username}'`;
    sqlConnection.query(query, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

app.post('/register', async (req, res) => {
    const { username, password, bio } = req.body;

    const newUser = new User({ username, password, bio }); // No escaping of `bio`
    await newUser.save();

    res.send("User registered successfully");
});

app.get('/profile', (req, res) => {
    const name = req.query.name;
    res.send(`<h1>Welcome, ${name}</h1>`); // No escaping → Reflected XSS possible
});

app.post('/ping', (req, res) => {
    const { ip } = req.body;

    exec(`ping -c 3 ${ip}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send("Error executing command");
        }
        res.send(stdout); // No validation → Allows command injection
    });
});

app.post('/admin', (req, res) => {
    const { password } = req.body;

    if (password === "admin123") {  // Hardcoded password
        res.send("Welcome, Admin!");
    } else {
        res.status(401).send("Unauthorized");
    }
});

const upload = multer({ dest: 'uploads/' }); 

app.post('/upload', upload.single('file'), (req, res) => {
    res.send("File uploaded successfully");
});

app.get('/user/:id', async (req, res) => {
    const user = await User.findById(req.params.id); // No authorization checks
    res.send(user);
});

app.get('/redirect', (req, res) => {
    const url = req.query.url;
    res.redirect(url); // Allows redirection to malicious sites
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allows any origin
    next();
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
