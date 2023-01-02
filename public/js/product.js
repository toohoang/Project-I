import { doc } from "firebase/firestore";

let ratingStarInput=[...document.querySelectorAll('.rating-star')];

ratingStarInput.map((star,index) =>{
    star.addEventListener('click', () => {
        for(let i=0;i <5;i++){
            if (i<=index) {
                ratingStarInput[i].src='../create_img/unfilled-star (2).png';  
            } else {
                ratingStarInput[i].src='../create_img/unfilled-star (1).png';
            }
        }
    })
})

//product page setting
let productName= document.querySelector('.product-title');
let shortDes=document.querySelector('.product-des');
let price = document.querySelector('.price');
let detail = document.querySelector('.des');
let productImage= document.querySelector('.product-image');
let title = document.querySelector('.title');

const setData=() =>{
    productName.innerHTML=title.innerHTML=data.name;
    productImage.src=data.image;
    shortDes.innerHTML=data.shortDes;
    detail.innerHTML=data.detail;
    price.innerHTML=  `$${data.price}`;

}


const fetchProductData = () =>{
    fetch('/get-products',{
        method:'post',
        headers:new Headers({'Content-type' : 'application/json'}),
        body: JSON.stringify({id: productId})
    }).then(res =>res.json())
    .then(data =>{
        setData(data)
        getProducts(data.tags[0]).then(res => createProductCards(res, 'similar products', '.best-selling-product-section'))
    })
    .catch(err => {
        console.log(err)
        alert('no product found');
        location.replace('/404');
    })
}
let productId = null;
if(location.pathname != '/add-product'){
    productId=decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}