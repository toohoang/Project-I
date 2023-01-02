import { doc } from "firebase/firestore";

//navbar
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () =>{
    if(scrollY >=350){
        navbar.classList.add('bg');
    }
    else{
        navbar.classList.remove('bg');
    }
    console.log(scrollY);
})

const createNavbar = () =>{
    let navbar = document.querySelector('.navbar');

    navbar.innerHTML+=` 
    <ul class="link-container">
        <li class="link-item"> <a href="#" class="link active">home</a> </li>
        <li class="link-item"> <a href="#" class="link">product</a> </li>
        <li class="link-item"> <a href="#" class="link">about</a> </li>
        <li class="link-item"> <a href="#" class="link">contact</a> </li>
    </ul>
    <div class="user-interactions">
        <div class="search-box">
          <input type="text" class="search" placeholder="search item">
          <button class="search-btn"><img src="../public/create_img/—Pngtree—vector search icon_3783210.png"</button>
        </div>
        <div class="cart">
            <img src="../create_img/unnamed.jpg" class="cart-icon" alt="">
            <span class="cart-item-count">00</span>
        </div>
        <div class="user">
          <img src="../create_img/user.png" class="user-icon" alt="">
          <div class="user-icon-popup">
            <p>login to your account</p>
            <a>login</a>
          </div>
        </div>
    </div>
    `
}

createNavbar();

//user icon popup
let userIcon = document.querySelector('.user-icon');
let userPopupIcon =document.querySelector('.user-icon-popup');

userIcon.addEventListener('click', () => userPopupIcon.classList.toggle('active'))

let text = userPopupIcon.querySelector('p');
let actionBtn= userPopupIcon.querySelector('a');
let user=JSON.parse(sessionStorage.user || null);

if(user != null){
    text.innerHTML = `log in as, ${user.name}`;
    actionBtn.innerHTML = 'log out';
    actionBtn.addEventListener('click', () => logout());
} else{
    text.innerHTML = 'login to your account';
    actionBtn.innerHTML='login';
    actionBtn.addEventListener('click', () => location.href = '/login' );
}

const logout = () =>{
    sessionStorage.clear();
    location.reload();
}

//search box

let searchBtn = document.querySelector('.search-btn');
let searchBox = document.querySelector('.search');

searchBtn.addEventListener('click', () =>{
    if(searchBox.ariaValueMax.length){
        location.href = `/search/${searchBox.value}`;
    }
})