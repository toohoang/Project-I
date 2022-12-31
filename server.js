import express from "express";
import bcrypt, { hash } from "bcrypt";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, setDoc, updateDoc, getDoc } from "firebase/firestore";

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

//aws
import aws, { DataPipeline, RDS } from "aws-sdk";
import "dotenv/config";

//aws setup
const region= "";
const bucketName="ecom-website";
const accessKeyId= process.env.AWS_ACCESS_KEY;
const aecretAccessKey= process.env.AWS_ACCESS_KEY;

aws.config.update({
    region,
    accessKeyId,
    secretAccessKey
})

//init s3
const s3= new aws.S3();

//generate image url
async function generateURL(){
    let date= new Date();

    const imageName = `${date.getTime()}.jpeg`;

    const params= {
        Bucket : bucketName,
        Key: imageName,
        Expires: 300,
        ContentType: "image/jpeg"
    }

    const uploadURL = await s3.getSignedUrlPromise("putObject", params);
    return uploadURL;
}

app.get('/s3url', (req,res)=>{
    generateURL().then(url => res.json(url));
})

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
    } else if( !Number(number) || number.length <10 ){
        res.json({ 'alert':'invalid number, please enter valid one'});
    } else if( !tac ){
        res.json({ 'alert':'you must agree to our terms and conditions'});
    } else {
        //store the data in db
        const users= collection(db,"users");

        getDoc(doc(users, email)).then(user =>{
            if(user.exists()){
                return res.json({ 'alert' : 'email already exists'})
            } else {
                //encrypt password
                bcrypt.genSalt(10, (err,salt) =>{
                    bcrypt.hash(password, salt, (err, hash) =>{
                        req.body.password = hash;
                        req.body.seller = false;

                        //set the doc
                        setDoc(doc(users, email), req.body).then(data =>{
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                                seller: req.body.seller, 
                            })
                        })
                    })
                })
            }
        })
    }
})

app.get('/login', (req,res) =>{
    res.sendFile("login.html", { root : "public"})
})

app.post('/login', (req,res) =>{
    let {email,password}= req.body;

    if(!email.length || ! password.length){
        return res.json({ 'alert' : 'fill all the inputs'})
    }

    const users= collection(db, "users");

    getDoc(doc(users,email)).then( user =>{
        if(!user.exists()){
            return res.json({'alert' : ' email does not exists'})
        } else {
            bcrypt.compare(password, user.data().password, (err,result) => {
                if(result){
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller
                    })
                } else{
                    return res.json({'alert' : 'password is incorrect'})
                }
            })
        }
    })
})

//seller route
app.get('/seller',(req,res) =>{
    res.sendFile('seller.html', {root: "public"})
})


app.post('/seller', (req,res) =>{
    let {name,address, about,number,email} = req.body;

    if(!name.length || !address.length || !about.length || number.length<10 || !Number(number)){
        return res.json({ 'alert':'some information(s) is/are incorrect'});
    } else{
        //update the seller status
        const sellers = collection(db, "sellers");
        setDoc(doc(sellers,email), req.body)
            .then( data =>{
            const users = collection (db,"users");
            updateDoc(doc(users,email),{
                seller: true
            })
            .then(data =>{
                res.json({'seller' :true})
            })

        })
    }
})

//dashboard
app.get('/dashboard', (req,res) =>{
    res.sendFile('dashboard.html', {root : "public"});
})

//app product
app.get('/add-product', (req,res) =>{
    res.sendFile('add-product.html', {root: "public"});
})

app.post('/add-product', (req,res) =>{
    let{ name, shortDes, detail, price, image, tags, email, draft} = req.body;

    if(!name.length){
        res.json({'alert' :'should enter product name'});
    } else if(!shortDes.length){
        res.json({'alert' :'short des must be 80 letters long'});
    } else if(!price.length || !Number(price)){
        res.json({'alert' :'enter valid price'});
    } else if(!detail.length){
        res.json({'alert' :'must enter the detail'});
    } else if(!tags.length){
        res.json({'alert' :'enter tags'});
    }

    //add-product
    let docName = `${name.toLowerCase()}-${Math.floor(Math.random()*50000)}`

    let products = collection(db, "products");
    setDoc(doc(products,docName), req.body)
    .then(data =>{
        res.json({'product' : name})
    })
    .catch(err =>{
        res.json({'alert': 'some error occured.'})
    })
})

//404route
app.get('/404', (req,res) =>{
    res.sendFile("404.html", {root : "public"})
})

app.use((req,res) =>{
    res.redirect('/404')
})

app.listen(3000, () =>{
    console.log('listening on port 3000');
})
