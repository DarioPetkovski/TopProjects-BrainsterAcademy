 //importing from data file
import { artistNav } from "../artists/artists.js"
import { intervalId } from "../auction/auction.js"

//variables
export const visitorListingPage = document.getElementById("visitorListing")
export const list = document.querySelector(".list")
const visitorFilterPage = document.getElementById("visitorFilter")
export const nav = document.getElementById("navbar")
export const byArtist = document.getElementById("filterArtists")
export const byType = document.getElementById("filterType")
export const byTitle = document.getElementById("byTitle")
export const minPrice = document.getElementById("min")
export const maxPrice = document.getElementById("max");
// function that exports to main.js
export function visitorListing() {
    clearInterval(intervalId);
    // dom elements inside
    const filterBtn = document.querySelector(".filterBtn")
    // nav element
    nav.style.display = "block"

    // filter btn add event onclick to open the page for filtering cards
    filterBtn.addEventListener("click", () => {
        visitorFilterPage.style.right = "0%"
        visitorListingPage.style.left = "-100%"
        nav.style.left = "-100%"
    })

    // take the form for filtering and on submit filter the cards
    const formFilter = document.getElementById("formFilter")
    formFilter.addEventListener("submit",(e)=>{
        e.preventDefault()
        filterCards(list,byArtist,byType,byTitle,minPrice,maxPrice)  //filtering cards
        visitorFilterPage.style.right = "-100%"
        visitorListingPage.style.left = "0%"
        nav.style.left = "0%"
    })
    artistNav.style.display = "none"
}

// create artists class
class Artist{
    constructor(_artistName){
        this.artistName = _artistName
    }
}

// fetch artists Data from api
export async function dataFetchArtists(select) {
    await fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => renderArtists(select,data)) // render artists
    .catch(err => console.log(err))
  }
  

// render cards function
export const renderCards = (list) =>{
    list.innerHTML = ""
    JSON.parse(localStorage.getItem("itemData")).filter(item => item.isPublished).forEach((item,key) => {
        cardSkelet(item,key,list)
    })
}
// render artists
const renderArtists = (select,data) => {
    data.forEach(el => {
        const artist = new Artist(el.name)
        select.innerHTML += `<option value = "${artist.artistName}">${artist.artistName}</option`
       })
}

// filter cards function
const filterCards = (list,artist,type,title,min,max) => {
    list.innerHTML = "" // clearing the list
    JSON.parse(localStorage.getItem("itemData")).forEach((item,key) => { 
        if(item.isPublished){ // if the isPublished property is true it will get the elements
            const filterByTitle = item.title ? item.title.toLowerCase().includes(title.value.trim().toLowerCase()): true;
            // using ternary method to check if input value is true we check then if its equal to property, if its false then we set it to true
            const filterArtists = artist.value ? item.artist === artist.value : true;
            const filterByMinPrice = +min.value ? item.price >= +min.value : true;
            const filterByMaxPrice = +max.value ? item.price <= +max.value : true;
            const filterByType = type.value ? item.type === type.value : true;

            if (filterByTitle && filterArtists && filterByMinPrice && filterByMaxPrice && filterByType) {
                cardSkelet(item, key, list);
            }
        }
    })
}

// render types function
export const renderTypes = (select,items) => {
    items.forEach(item => {
        select.innerHTML += `<option value = "${item}">${item}</option`
    })
}

// card skelet
const cardSkelet = (item,key,list) => {
        const dark = key % 2 === 0 ? "light-bg":"dark-bg"
        const light = key % 2 === 1 ? "light-bg":"dark-bg"
        const card = document.createElement("div")
        card.classList.add("card",`${dark}`,"mb-5","box-shadow")
        card.innerHTML += `<div class="card-img">
        <img src="${item.image}" alt="" class="w-100">
    </div>
    <div class="content container-fluid">
        <div class="d-flex justify-content-between align-items-center">
            <h1 class ="artistFont">${item.artist}</h1>
            <button class="${light} price">$${item.price}</button>
        </div>
        <h5>${item.title}</h5>
        <p>${item.description}</p>
    </div>`
    list.appendChild(card)
}
