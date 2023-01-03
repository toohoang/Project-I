import { doc, setIndexConfiguration } from "firebase/firestore";

let ratingStarInput=[...document.querySelectorAll('.rating-star')];
let rate=0;

ratingStarInput.map((star,index) =>{
    star.addEventListener('click', () => {
        rate=`${index +1}.0`;
        for(let i=0;i <5;i++){
            if (i<=index) {
                ratingStarInput[i].src='../create_img/unfilled-star (2).png';  
            } else {
                ratingStarInput[i].src='../create_img/unfilled-star (1).png';
            }
        }
    })
})

//add review form 

let reviewHeadline=document.querySelector('.review-headline');
let review = document.querySelector('.review-field');
let loader = document.querySelector('.loader');

let addReviewBtn=document.querySelector('.add-review-btn');

addReviewBtn.addEventListener('click', () =>{
    //form validation
    if(user==null) {//user if not logged in
        location.href=`/login?after_page=${productId}`;
    } else{
        if(!reviewHeadline.value.length || !review.value.length || rate==0){
            showFormError('Fill all the inputs');
        } else if(reviewHeadline.value.length>50){
            showFormError('headline should not be more than 50 letters')
        } else if(review.value.length>150){
            showFormError('review should not be more than 150 letters')
        } else{
            //send the data to backend
            loader.style.display="block";
            sendData('/add-review', {
                headline: reviewHeadline.value,
                review: review.value,
                rate: rate,
                email: user.email,
                product: productId
            })
        }
    }
})

//fetch reviews

const getReviews= () =>{
    if(user == null) {
        user ={
            email: undefined
        }
    }

    sendData('/get-reviews', {
        email: user.email,
        product: productId
    })
    .then(res => res.json())
    .then(data =>{
        if(data.length){
            createReviewSection(data)
        }
    })
}

const createReviewSection=(data) =>{
    let section = document.querySelector('.review-selection');

    section.innerHTML += `
        <h1 class="section-title">Reviews</h1>
        <div class="review-container">
            ${createReviewCard(data)}
            <div class="review-card">
                <div class="user-dp" data-rating="4.9"><img src="../user_prf/photo-1570295999919-56ceb5ecca61.jpg" alt=""></div>
                <h2 class="review-title">best quality more than my expectation</h2>
                <p class="review">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo et velit aspernatur distinctio ipsum voluptatum, dignissimos quaerat quis delectus ab eveniet, eligendi a hic quisquam vel. Voluptates atque assumenda animi. </p>
            </div>
        </div>
    `
}

const createReviewCard = data =>{
    let cards ='';

    for(let i=0;i <4;i++){
        if(data[i]){
            cards += `
            <div class="review-card">
                <div class="user-dp" data-rating="${data[i].rate}"><img src="../user_prf/photo-1570295999919-56ceb5ecca61.jpg" alt=""></div>
                <h2 class="review-title">${data[i].headline}</h2>
                <p class="review">${data[i].review}</p>
            </div>
            `
        }
        return cards;
    }
}

getReviews();