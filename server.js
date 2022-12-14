import express from "express";
import bcrypt from "bcrypt";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbyc3b7ZH2UXc79CKD-1nER3n3lNLW6SE",
  authDomain: "ecommerce-website-ad3da.firebaseapp.com",
  projectId: "ecommerce-website-ad3da",
  storageBucket: "ecommerce-website-ad3da.appspot.com",
  messagingSenderId: "599545731732",
  appId: "1:599545731732:web:08b9ae74d387324c17f281"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();
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

//signup
app.get('/signup', (req,res) =>{
    res.sendFile("signup.html", {root : "public"})
})

app.post('/signup', (req,res) =>{
    const {name, email, password, number,tac} = req.body;

    //form validation
    if(name.length <3){
        res.json({ 'alert':'name must be 3 letters long'});
    } else if( !email.length ){
        res.json({ 'alert':'enter your email'});
    } else if( password.length < 8 ){
        res.json({ 'alert':'password must be 8 letters long'});
    } else if( Number(number) || number.length <10 ){
        res.json({ 'alert':'invalid number, please enter valid one'});
    } else if( !tac.checked ){
        res.json({ 'alert':'you must agree to our terms and conditions'});
    } else {
        //store the data in db
    }
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

