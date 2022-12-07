import express from "express";
import bcrypt from "bcrypt";

//init server

const app= express();

//middle ware
app.use(express.static('public'));
app.use(express.json());

//routes
//home route
app.get('/', (req,res) =>{
    res.sendFile("index.html", {root: "public"})
})

app.listen(3000, () =>{
    console.log('listening on port 3000');
})

//404route
app.get('/404', (req,res) =>{
    res.sendFile("404.html", {root : "public"})
})

app.use((req,res) =>{
    res.redirect('/404')
})

