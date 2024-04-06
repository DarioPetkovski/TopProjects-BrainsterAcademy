
// NAVBAR

//menu button in form

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


//link hovers in form

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



//mobile-link hovers in form

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


//DROPDOWN LIST

let selectCostum = document.querySelector(".select-costum");
let list = document.querySelector(".list");
let optionMarketing = document.querySelector(".option-select.marketing");
let optionPrograming = document.querySelector(".option-select.programing");
let optionDataScience = document.querySelector(".option-select.dataScience");
let optionDesign = document.querySelector(".option-select.design");
let optionM = document.querySelector(".option.marketing");
let optionP = document.querySelector(".option.programing");
let optionDS = document.querySelector(".option.dataScience");
let optionD = document.querySelector(".option.design");
let text = document.querySelector(".text");
let selectBox = document.querySelector(".select-box");



selectCostum.addEventListener("click", showList);
function showList(){

    list.classList.toggle("hidden");
}
    optionM.onclick = function(){
        if(optionM){
        text.innerHTML = optionM.textContent;
        text.innerHTML = optionMarketing.value;
        selectBox.innerHTML = optionMarketing.value;
        list.classList.toggle("hidden");
        selectCostum.setAttribute("class", baseclassSelect + " green-border");  
        }
        else{
            
        }
    }
        optionP.onclick = function(){
             if(optionP){
                text.innerHTML = optionP.textContent;
                text.innerHTML = optionPrograming.value;
                selectBox.innerHTML = optionPrograming.value;
                list.classList.toggle("hidden");
                selectCostum.setAttribute("class", baseclassSelect + " green-border");  
                }
                else{

                }
        }
        optionDS.onclick = function(){
            if(optionDS){
                text.innerHTML = optionDS.textContent;
                text.innerHTML = optionDataScience.value;
                selectBox.innerHTML = optionDataScience.value;
                list.classList.toggle("hidden");
                selectCostum.setAttribute("class", baseclassSelect + " green-border");  
                }
                else{

                }
        }
        optionD.onclick = function(){
            if(optionD){
                text.innerHTML = optionD.textContent;
                text.innerHTML = optionDesign.value;
                selectBox.innerHTML = optionDesign.value;
                list.classList.toggle("hidden");
                selectCostum.setAttribute("class", baseclassSelect + " green-border");  
                }
                else{

                }
        }


            






//FORM VALIDATION

let nameSurName = document.getElementById("nameSurname");
let companyName = document.getElementById("companyName");
let email = document.getElementById("email");
let contact = document.getElementById("contact");
let submitBtn = document.getElementById("submit");
let select = document.getElementById("select");
let form = document.getElementById("form");
let baseclass = email.getAttribute("class");
let baseclassSelect = selectCostum.getAttribute("class");
let error = document.querySelectorAll(".error");
let pattern = {
    contact: /^\+389([\d]{8,9})$/
}

   form.addEventListener("submit", validation);
   function validation(e){

    if(nameSurName.value === "" || nameSurName.value === NaN || nameSurName.value.length === 1){
        e.preventDefault();
        error[0].classList.remove("hidden");
        error[0].classList.add("show");
        nameSurName.setAttribute("class", baseclass + " red-border");
    }
    else{
        nameSurName.setAttribute("class", baseclass + " green-border");
        error[0].classList.add("hidden");
        error[0].classList.remove("show");
    }
    if(email.value === "" || email.value === NaN){
        error[2].classList.remove("hidden");
        error[2].classList.add("show");
        e.preventDefault();
        email.setAttribute("class", baseclass + " red-border");
    }
    else{
        email.setAttribute("class", baseclass + " green-border");
        error[2].classList.add("hidden");
        error[2].classList.remove("show");
    }

    if(selectBox.textContent === "Изберете тип на студент"){
        e.preventDefault();
        selectCostum.setAttribute("class", baseclassSelect + " red-border");
    }
    else{
        selectCostum.setAttribute("class", baseclassSelect + " green-border");
    }
    if(companyName.value === "" || companyName.value === NaN || companyName.value.length === 1){
        e.preventDefault();
        error[1].classList.remove("hidden");
        error[1].classList.add("show");
        companyName.setAttribute("class", baseclass + " red-border");
    }
    else{
        error[1].classList.add("hidden");
        error[1].classList.remove("show");
        companyName.setAttribute("class", baseclass + " green-border");
    }
    if(contact.value==="" || contact.value==null || pattern["contact"].test(contact.value)==false){
        e.preventDefault();
        error[3].classList.remove("hidden");
        error[3].classList.add("show");
        contact.setAttribute("class", baseclass + " red-border");
    }
    else{
        contact.setAttribute("class", baseclass + " green-border");
        error[3].classList.add("hidden");
        error[3].classList.remove("show");
    }
   }

   select.addEventListener("input", ()=>{
    if(selectBox.textContent === "Изберете тип на студент"){
        selectCostum.setAttribute("class", baseclassSelect + " red-border");
    }
    else{
        selectCostum.setAttribute("class", baseclassSelect + " green-border");
    }
   });

   email.addEventListener("input", ()=>{
    if ( email.value === "" || email.value === NaN || !email.validity.valid) {
        email.setAttribute("class", baseclass + " red-border");
      }
      else{
        email.setAttribute("class", baseclass + " green-border");
      }
   });

   nameSurName.addEventListener("input", ()=>{
    if ( nameSurName.value === "" || nameSurName.value === NaN || nameSurName.value.length === 1 ) {
        nameSurName.setAttribute("class", baseclass + " red-border");
      }
      else{
        nameSurName.setAttribute("class", baseclass + " green-border");
      }
   });

   companyName.addEventListener("input", ()=>{
    if ( companyName.value === "" || companyName.value === NaN || companyName.value.length === 1 ) {
        companyName.setAttribute("class", baseclass + " red-border");
      }
      else{
        companyName.setAttribute("class", baseclass + " green-border");
      }
   });

   contact.addEventListener("input", ()=>{
    if ( contact.value==="" || contact.value==null || pattern["contact"].test(contact.value)==false ) {
        contact.setAttribute("class", baseclass + " red-border");
      }
      else{
        contact.setAttribute("class", baseclass + " green-border");
      }
   });


