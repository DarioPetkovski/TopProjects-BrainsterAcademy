import { auctionList, intervalId, liveAuction } from "../auction/auction.js"
import { nav } from "../visitorListing/visitorListing.js"

export const artistTitle = document.querySelector(".artistName")
export const artistNav = document.getElementById("artistNav")
export const hamBtn = document.querySelector(".hambtn")
export const dropDown = document.querySelector(".dropDown")
export const clickLink = document.querySelectorAll(".clickLink")
const itemsSold = document.querySelector(".itemsSold")
const allItems = document.querySelector(".allItems")
const totalPrice = document.querySelector(".totalPrice")
const ctx = document.getElementById('myChart');
const sevenD = document.querySelector(".seven")
const fourteenD = document.querySelector(".fourtheen")
const thirtyD = document.querySelector(".thirty")
const livePrice = document.getElementById("livePrice")

export function initArtists(){
  if(localStorage.getItem("auctingItem")){
    liveAuction.style.display = "block"
      if(localStorage.getItem("user").includes(JSON.parse(localStorage.getItem("auctingItem")).artist)){
        if(localStorage.getItem("livePrice") === null){
          livePrice.innerText = `$${0}`
        }
        else{
          livePrice.innerText = `$${localStorage.getItem("livePrice")}`
        }
      }
      else{
        liveAuction.style.display = "none"
      }
  }
  else{
    liveAuction.style.display = "none"
  }
  clearInterval(intervalId);
    artistNav.style.display = "block"
    localStorage.setItem("userType","artist")
    const artist = localStorage.getItem("user")
    artistTitle.innerText = artist
    nav.style.display = "none"

    const totalIncome = totalPriceSoldItems(JSON.parse(localStorage.getItem("itemData")),totalPrice)
    const soldItems = getArtistSoldItems(JSON.parse(localStorage.getItem("itemData")),itemsSold,allItems)

    const { sevenDays, fourteenDays, thirtyDays } = getNextDays();
    

     sevenD.addEventListener("click",()=>{ // sevendays btn click
      const dataSold = getSoldData(sevenDays) // get sold data
      myChart.data.labels = sevenDays  // find the chart labels and put the sevenDays array
      myChart.data.datasets[0].data = dataSold // find the chart data and put the sold items array
      myChart.update()
    })
    fourteenD.addEventListener("click",()=>{
      const dataSold = getSoldData(fourteenDays)
      myChart.data.labels = fourteenDays
      myChart.data.datasets[0].data = dataSold
      myChart.update()
    })
    thirtyD.addEventListener("click",()=>{
      const dataSold = getSoldData(thirtyDays)
      myChart.data.labels = thirtyDays
      myChart.data.datasets[0].data = dataSold
      myChart.update()
    })

    return {
        soldItems,
        totalIncome,
    }
    
}
// getting how much items are sold depends on last days
const getSoldData = (soldDays) => {
  const dataSold = [];

  JSON.parse(localStorage.getItem("itemData")).filter(item => item.artist.includes(localStorage.getItem("user"))).forEach(item => {
    if (item.dateSold) {
      const itemSoldDate = item.dateSold.split("T")[0];

      if (soldDays.includes(itemSoldDate)) {
        const index = soldDays.indexOf(itemSoldDate);
        if (index !== -1) {
          if (dataSold[index] === undefined) {
            dataSold[index] = 1;
          } 
          else {
            dataSold[index]++;
          }
        }
      }
    }
  });

  return dataSold;
};
// chart
export const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: "",
    datasets: [{
    label: 'Sales Amount',
    data: "",
    backgroundColor: [
        "rgb(161, 106, 94)",
        "rgb(161, 106, 94)",
        "rgb(161, 106, 94)",
        "rgb(161, 106, 94)",
        "rgb(161, 106, 94)",
        "rgb(161, 106, 94)",
        "rgb(161, 106, 94)",
    ],
    barPercentage: 5,
    categoryPercentage: 0.1,
  }]},
  options: {
  indexAxis: 'y',
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
 });



export const hamBtnShow = (hamBtn,clickLink,dropDown) => {
    hamBtn.addEventListener("click",()=>{
        dropDown.classList.toggle("hide")
        dropDown.classList.toggle("show")
    })

    clickLink.forEach(link => {
        link.addEventListener("click",()=>{
            dropDown.classList.remove("show")
            dropDown.classList.add("hide")
        })
    })
}

//total items sold logic
const getArtistSoldItems = (items,itemsSold,allItems) => {
    let arrSold = []
    let arrUnsold = []
    items.filter(item => {
      if(item.artist.includes(localStorage.getItem("user"))){
        arrUnsold.push(item)
        for(let i = 0; i < arrUnsold.length; i++){
            let itemsAll = i + 1
            allItems.innerText = itemsAll
        }
        if(item.artist.includes(localStorage.getItem("user")) && item.dateSold){
            arrSold.push(item)
            for(let i = 0; i < arrSold.length; i++){
            let soldItems = i + 1
            itemsSold.innerText = soldItems
         }
        }
      }
    })
    return {
        arrSold,
        arrUnsold
    }
}
// items total price sold logic
const totalPriceSoldItems = (items,totalPrice) => {
    let totalSoldPrice = 0;
    items.filter(item => {
        if(item.artist.includes(localStorage.getItem("user"))){
            if(item.dateSold && item.priceSold){
                totalPrice.innerText = `$${totalSoldPrice += item.priceSold}`
            }
            else if (!item.dateSold && !item.priceSold && NaN){
                totalPrice.innerText = `$${totalSoldPrice -= item.priceSold}`
            }
        }
    })
    return totalSoldPrice
}
// getting the last 7days 14day and 30days 
  const getNextDays = () => {
    const sevenDays = [];
    const fourteenDays = [];
    const thirtyDays = [];
    const currentDate = new Date();
  
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() - i);
      sevenDays.push(nextDate.toISOString().split('T')[0])
    }
    for(let i = 0; i < 14; i++){
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() - i);
      fourteenDays.push(nextDate.toISOString().split('T')[0])
    }
    for(let i = 0; i < 30; i++){
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() - i);
      thirtyDays.push(nextDate.toISOString().split('T')[0])
    }
    return {
      sevenDays,
      fourteenDays,
      thirtyDays
    }
  };


  