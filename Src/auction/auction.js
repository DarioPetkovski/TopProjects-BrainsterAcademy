import { artistNav } from "../artists/artists.js"
import { nav } from "../visitorListing/visitorListing.js"
export const auctionList = document.getElementById("auctionList")
export let intervalId
let highestBidVar
let bidPrices
const currentDate = new Date()
const dateSold = currentDate.toISOString()
const noAuctionItemContent = document.getElementById("auctionContent")
const bidInput = document.getElementById("bid")
const bidBtn = document.getElementById("bidBtn")
const priceList = document.getElementById("priceList")
const priceInfo = document.getElementById("auctionPriceInfo")
const finishAuctionContent = document.getElementById("finishAucContent")
export const liveAuction = document.querySelector(".liveAuction")


export const auctionInit = () => {
    auctionList.innerHTML = ""
    artistNav.style.display = "none"
    nav.style.display = "block"
    priceList.innerHTML = ""
    // if there is a user item in local storage than set the userType to artist else to visitor
    if(localStorage.getItem("user")){
        localStorage.setItem("userType","artist")
    }
    else{
        localStorage.setItem("userType","visitor")
    }
    
    if(localStorage.getItem("userType").includes("artist")){
        bidInput.style.display = "none"
        bidBtn.style.display = "none"
        priceInfo.style.display = "none"
    }
    else{
        bidInput.style.display = "block"
        bidBtn.style.display = "block"
        priceInfo.style.display = "block"
    }
    const timerDisplay = document.getElementById("timer")
    const currentItem = JSON.parse(localStorage.getItem("auctingItem"))
    
    if (currentItem) {
        renderAuctioningCard(currentItem);
        bidPrices = JSON.parse(localStorage.getItem("priceList")) || [];
        
        bidBtn.addEventListener("click", async () => {
            const bidValue = +bidInput.value.trim();
            const myBidFormData = new FormData()
            myBidFormData.set('amount', bidValue)
    
            if (bidValue > currentItem.price + 50) {
                bidPrices.push(bidValue);
                priceList.innerHTML += `<li class="dark-bg fit-content mt-2">$${bidValue}</li>`;
                localStorage.setItem("priceList", JSON.stringify(bidPrices));
                bidInput.value = "";
                currentItem.price = bidValue
                localStorage.setItem("auctingItem",JSON.stringify(currentItem))
                auctionList.innerHTML = ""
                renderAuctioningCard(currentItem);
                
                if(localStorage.getItem("priceList")){
                    await fetch('https://projects.brainster.tech/bidding/api',{
                    method: 'POST',
                    body: myBidFormData
                })
                    .then(res => res.json())
                    .then(data => {
                        const isBidding = data.isBidding
                        if (isBidding && data.bidAmount > currentItem.price) {
                            bidPrices.push(data.bidAmount);
                            priceList.innerHTML += `<li class="dark-bg fit-content mt-2" style="margin-left: 70%">$${data.bidAmount}</li>`;
                            localStorage.setItem("priceList", JSON.stringify(bidPrices));
                            if (data.bidAmount > currentItem.price) {
                                currentItem.price = data.bidAmount;
                                localStorage.setItem("auctingItem", JSON.stringify(currentItem));
                                auctionList.innerHTML = "";
                                renderAuctioningCard(currentItem);
                            }
                        }
                        const numericBidPrices = bidPrices.filter(value => value);
                        const highestBid = numericBidPrices.length > 0 ? numericBidPrices.reduce((max, value) => (value > max ? value : max), numericBidPrices[0]) : undefined
                        highestBidVar = highestBid
                        const lastBidValue = bidPrices.length > 0 ? bidPrices[bidPrices.length - 1] : 0;
                        localStorage.setItem("livePrice",lastBidValue)
                    })
                    .catch(err => console.log(err));
                }
            }
        });
        bidPrices.forEach((bidValue, index) => {
            const bidListItem = document.createElement("li");
            bidListItem.innerText = `$${bidValue}`;
            bidListItem.classList.add("dark-bg", "fit-content", "mt-2");
            if (index % 2 === 1) {
                bidListItem.style.marginLeft = "70%";
            }
            priceList.appendChild(bidListItem);
        });
    }

    if(auctionList.innerHTML !== ""){
        startTimer(localStorage.getItem("timeDuration"),timerDisplay,timerEnd,currentItem)
        noAuctionItemContent.style.display = "none"
        finishAuctionContent.style.display = "none"
    }
    else{
        noAuctionItemContent.style.display = "block"
        auctionList.innerHTML = "";
        priceList.innerHTML = ""
        bidInput.style.display = "none"
        bidBtn.style.display = "none"
        priceInfo.style.display = "none"
        finishAuctionContent.style.display = "none"
    }
}
// start timer Fun
const startTimer = (duration, display, timerEnd,currentItem) => {
    const data = JSON.parse(localStorage.getItem("itemData"));
    let timer = duration,
        minutes,
        seconds;
    intervalId = setInterval(function () {
        data.forEach(item => (item.isAuctioning = false));
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.innerText = minutes + ":" + seconds;
        localStorage.setItem("timeDuration", timer);

        if (--timer < 0) {
            clearInterval(intervalId);
            timerEnd(display,currentItem);
        }
    }, 1000);
}
// End timer fun
const timerEnd = (display, currentItem) => {
    display.innerText = "";

    // get original auctioning values from local storage
    const originalAuctioningStates = JSON.parse(localStorage.getItem("originalAuctioningStates"));

    if (originalAuctioningStates) {
        const data = JSON.parse(localStorage.getItem("itemData"));

        // get isAuctioning values back to their original values
        data.forEach((item, index) => {
            item.isAuctioning = originalAuctioningStates[index];

            // Set isAuctioning to false for the specific item and get the values in the item properties date sold and price sold
            if (currentItem.id === item.id) {
                if(highestBidVar === undefined){
                    item.isAuctioning = true;
                    item.priceSold = ""
                    item.dateSold = ""
                }
                else{
                    item.isAuctioning = false;
                    item.priceSold = highestBidVar
                    item.dateSold = dateSold
                }
                
            }
        });

        // Set isAuctioning to true for the items added during the auction
        const addedDuringAuction = data.filter(item => !originalAuctioningStates.includes(item.isAuctioning));
        addedDuringAuction.forEach(item => {
            item.isAuctioning = true;
        });

        localStorage.setItem("itemData", JSON.stringify(data));
        localStorage.setItem("auctingItem", JSON.stringify(currentItem));
    }

    localStorage.removeItem("timeDuration");
    localStorage.removeItem("auctingItem");
    localStorage.removeItem("priceList")
    localStorage.removeItem("originalAuctioningStates");
    localStorage.removeItem("livePrice")
    finishAuctionContent.style.display = "block"
    bidInput.style.display = "none"
    bidInput.value = ""
    bidBtn.style.display = "none"
    priceInfo.style.display = "none"
    liveAuction.style.display = "none"
    bidPrices = []
};
// render the auctioning card
const renderAuctioningCard = (currentItem) =>{
    const auctionCard = document.createElement("div")
                        auctionCard.classList.add("card",`light-bg`,"mb-5","box-shadow")
                        auctionCard.innerHTML = `<div class="card-img">
                        <img src="${currentItem.image}" alt="" class="w-100">
                    </div>
                    <div class="content container-fluid">
                        <div class="d-flex justify-content-between align-items-center">
                            <h1 class ="artistFont">${currentItem.artist}</h1>
                            <button class="dark-bg price">$${currentItem.price}</button>
                        </div>
                        <h5>${currentItem.title}</h5>
                        <p>${currentItem.description}</p>
                    </div>`
                    auctionList.appendChild(auctionCard)
}