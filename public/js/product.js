let ratingStarInput=[...document.querySelectorAll('.rating-star')];

ratingStarInput.map((star,index) =>{
    star.addEventListener('click', () => {
        for(let i=0;i <5;i++){
            if (i<=index) {
                ratingStarInput[i].src='http://localhost:3000/create_img/unfilled-star (2).png';  
            } else {
                ratingStarInput[i].src='http://localhost:3000/create_img/unfilled-star (1).png';
            }
        }
    })
})