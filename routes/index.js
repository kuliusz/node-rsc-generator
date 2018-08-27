const express = require("express")
const app = express()

app.get('/', function (req, res) {
    res.render('index', {
        title: 'RSC Generator for Mikrotik'
    })
})

module.exports = app;