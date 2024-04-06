
// NAVBAR

//menu button

let dropMenu = document.querySelector(".drop-menu");
let openMenuBtn = document.querySelector(".wrap-bars");
let closeMenuBtn = document.querySelector(".fa-x");
let dropMenuList = document.querySelector(".dropdown");


openMenuBtn.addEventListener("click",openMenu);
function openMenu(){
    dropMenu.style.right = "0%";
    dropMenuList.style.opacity = "1";
}

closeMenuBtn.addEventListener("click",closeMenu);
function closeMenu(){
    dropMenu.style.right = "-100%";
    dropMenuList.style.opacity = "0";
}



//link hovers

let linkUnderLineOne = document.querySelector(".one");
let linkUnderLineTwo = document.querySelector(".two");
let linkUnderLineThree = document.querySelector(".three");
let linkUnderLineFour = document.querySelector(".four");
let linkOne = document.querySelector(".link-one");
let linkTwo = document.querySelector(".link-two");
let linkThree = document.querySelector(".link-three");
let linkFour = document.querySelector(".link-four");


linkOne.onmouseover = function(){
    linkUnderLineOne.style.width = "100%";
}
linkOne.onmouseout = function(){
    linkUnderLineOne.style.width = "0%";
}

linkTwo.onmouseover = function(){
    linkUnderLineTwo.style.width = "100%";
}
linkTwo.onmouseout = function(){
    linkUnderLineTwo.style.width = "0%";
}

linkThree.onmouseover = function(){
    linkUnderLineThree.style.width = "100%";
}
linkThree.onmouseout = function(){
    linkUnderLineThree.style.width = "0%";
}

linkFour.onmouseover = function(){
    linkUnderLineFour.style.width = "100%";
}
linkFour.onmouseout = function(){
    linkUnderLineFour.style.width = "0%";
}



//mobile-link hovers

let mobLinkOne = document.querySelector(".mob-one");
let mobLineOne = document.querySelector(".mob-lineone");
let mobLinkTwo = document.querySelector(".mob-two");
let mobLineTwo = document.querySelector(".mob-linetwo");
let mobLinkThree = document.querySelector(".mob-three");
let mobLineThree = document.querySelector(".mob-linethree");
let mobLinkFour = document.querySelector(".mob-four");
let mobLineFour = document.querySelector(".mob-linefour");


mobLinkOne.onmouseover = function(){
    mobLineOne.style.width = "100%";
}
mobLinkOne.onmouseout = function(){
    mobLineOne.style.width = "0%";
}

mobLinkTwo.onmouseover = function(){
    mobLineTwo.style.width = "100%";
}
mobLinkTwo.onmouseout = function(){
    mobLineTwo.style.width = "0%";
}

mobLinkThree.onmouseover = function(){
    mobLineThree.style.width = "100%";
}
mobLinkThree.onmouseout = function(){
    mobLineThree.style.width = "0%";
}

mobLinkFour.onmouseover = function(){
    mobLineFour.style.width = "100%";
}
mobLinkFour.onmouseout = function(){
    mobLineFour.style.width = "0%";
}


//BANNER

//Button Animation

let wrap = document.querySelector(".wrap");
let activeButton = document.querySelector(".active-button");
let nonActiveButton = document.querySelector(".nonactive-button");
let upArrowActive = document.querySelector(".active");
let upArrowNonactive = document.querySelector(".nonactive");

 wrap.addEventListener("mouseover",active);
 function active(){
    nonActiveButton.style.opacity = "0";
    activeButton.style.opacity = "1";
    upArrowActive.style.opacity = "1";
    upArrowActive.style.top = "105px";
    upArrowNonactive.style.opacity = "0";
 }

 wrap.addEventListener("mouseout",nonActive);
 function nonActive(){
    nonActiveButton.style.opacity = "1";
    activeButton.style.opacity = "0";
    upArrowActive.style.opacity = "0";
    upArrowActive.style.top = "150px";
    upArrowNonactive.style.opacity = "1";
 }


 //images animation


let box = document.querySelectorAll('.box');
let img = document.querySelectorAll('.img');
let container = document.querySelector('.bg-img');

container.onmousemove = function(e){
    let x = e.pageX;
    let y = e.pageY;

    img[0].style.transform = 'translate('+ x/100*2 + 'px, '+ y/100*4 + 'px)';
    box[0].style.transform = 'translate('+ x/100*4 + 'px, '+ y/100*6 + 'px)';
    img[1].style.transform = 'translate('+ x/100*-2 + 'px, '+ y/100*4 + 'px)';
    box[1].style.transform = 'translate('+ x/100*4 + 'px, '+ y/100*6 + 'px)';
    img[2].style.transform = 'translate('+ x/100*2 + 'px, '+ y/100*4 + 'px)';
    box[2].style.transform = 'translate('+ x/100*4 + 'px, '+ y/100*6 + 'px)';
    box[3].style.transform = 'translate('+ x/100*4 + 'px, '+ y/100*6 + 'px)';
    box[4].style.transform = 'translate('+ x/100*-4 + 'px, '+ y/100*6 + 'px)';
    box[5].style.transform = 'translate('+ x/100*10 + 'px, '+ y/100*6 + 'px)';
}


//Card-Filter

let cards = document.querySelectorAll(".cards");
let iconPrograming = document.querySelector(".icon-programing");
let iconMarketing = document.querySelector(".icon-marketing");
let iconDesign= document.querySelector(".icon-design");

let programingBtn = document.querySelector("#programing");
let marketingBtn = document.querySelector("#marketing");
let designBtn = document.querySelector("#design");

let colorOne = document.querySelector(".colorOne");
let colorTwo = document.querySelector(".colorTwo");
let colorThree = document.querySelector(".colorThree");

programingBtn.addEventListener("change",showPrograming);

function showPrograming(){
    hideCards()
    colorTwo.style.backgroundColor = "#e91009";
    colorTwo.style.color = "#000000";
    loadBtn.style.display = "none";
    
    if(programingBtn.checked){

        let programingCards = document.querySelectorAll(".programing");

        programingCards.forEach(programingCard =>{
            programingCard.style.display = "block"
        });
        iconPrograming.style.display = "block";
        iconDesign.style.display = "none";
        iconMarketing.style.display = "none";

        marketingBtn.checked = false;
        designBtn.checked = false;

        colorOne.style.backgroundColor = "#302f38";
        colorOne.style.color = "#ffffff";

        colorThree.style.backgroundColor = "#302f38";
        colorThree.style.color = "#ffffff";

    }
    else{
        showCards();
        colorTwo.style.backgroundColor = "#302f38";
        colorTwo.style.color = "#ffffff";
        iconPrograming.style.display = "none";
    }
}

marketingBtn.addEventListener("change",showMarketing);

function showMarketing(){
    hideCards()

    if(marketingBtn.checked){
        colorOne.style.backgroundColor = "#e91009";
        colorOne.style.color = "#000000";
        loadBtn.style.display = "none";

        let marketingCards = document.querySelectorAll(".marketing");

        marketingCards.forEach(marketingCard =>{
            marketingCard.style.display = "block"
        });
        iconMarketing.style.display = "block";
        iconPrograming.style.display = "none";
        iconDesign.style.display = "none";

        programingBtn.checked = false;
        designBtn.checked = false;
        
        colorTwo.style.backgroundColor = "#302f38";
        colorTwo.style.color = "#ffffff";

        colorThree.style.backgroundColor = "#302f38";
        colorThree.style.color = "#ffffff";
        
    }
    else{
        showCards()
        colorOne.style.backgroundColor = "#302f38";
        colorOne.style.color = "#ffffff";
        iconMarketing.style.display = "none";
    }
}

designBtn.addEventListener("change",showDesign);
function showDesign(){
    hideCards();
    colorThree.style.backgroundColor = "#e91009";
    colorThree.style.color = "#000000";
    loadBtn.style.display = "none";
    if(designBtn.checked){
        let designCards = document.querySelectorAll(".design");
        designCards.forEach(designCard =>{
            designCard.style.display = "block"});
            iconDesign.style.display = "block";
            iconPrograming.style.display = "none";
            iconMarketing.style.display = "none";

            marketingBtn.checked = false;
            programingBtn.checked = false;

            colorOne.style.backgroundColor = "#302f38";
            colorOne.style.color = "#ffffff";

            colorTwo.style.backgroundColor = "#302f38";
            colorTwo.style.color = "#ffffff";
    }
    else{
        showCards();
        colorThree.style.backgroundColor = "#302f38";
        colorThree.style.color = "#ffffff";
        iconDesign.style.display = "none";
    }
}

function showCards(){
    cards.forEach(card =>{
        card.style.display = "block"
    });

}

function hideCards(){
    cards.forEach(card =>{
        card.style.display = "none"
    });
}


//PAGINATION

let loadBtn = document.querySelector(".load-btn");
let curentCards = 6;

loadBtn.addEventListener("click",showMore);
function showMore(){
    let box = [...document.querySelectorAll(".cards")];
    for(let i = curentCards; i < curentCards + 6 && i < box.length; i++){
        box[i].style.display = "block";
    }
    curentCards += 6;

    if(curentCards >= box.length){
        loadBtn.style.display = "none";
    }
}




