import { landingPage, select } from "./Src/landingPage/landingPage.js"
import { visitor } from "./Src/visitor/visitor.js"
import { onBackArrow, visitorFilter, beforeReload} from "./Src/visitorFiltering/visitorFiltering.js"
import { byArtist, byTitle, byType, minPrice, maxPrice, visitorListing,dataFetchArtists, renderTypes, renderCards, list } from "./Src/visitorListing/visitorListing.js"
import { itemTypes, items } from "./data/data.js"
import { initArtists, hamBtn, clickLink, dropDown, hamBtnShow, myChart } from "./Src/artists/artists.js"
import { artistsItemsInit, artistsList, filterArtistCards, typeEdit } from "./Src/artistsItems/artistsItems.js"
import { typeAdd } from "./Src/artistsItems/artistsItems.js"
import { auctionInit } from "./Src/auction/auction.js"

// function for routing the sections
const handleRouter = () => {
    const hash = location.hash === '' ? '#landingPage' : location.hash
    
    const allPages = document.querySelectorAll('.page')
    allPages.forEach(page => page.style.display = 'none') // all sections that contains page class will display block

    document.querySelector(hash).style.display = "block"

    //reacting on hash and initializing functions that depends on the hash location
    switch(hash){
        case "#landingPage":
            landingPage()
            break;
        case "#visitor":
            visitor()
            break;
        case "#visitorListing":
            visitorListing()
            visitorFilter()
            break;
        case "#artists":
            initArtists()
            break;
        case "#artistsItems":
            artistsItemsInit()
            break;
        case "#auction":
        auctionInit()
            break;
    }
}

// event click on logo 
export const logo = document.querySelectorAll(".logo")
logo.forEach(el => {
    el.addEventListener("click", () => {
        location.hash = "landingPage"
        byArtist.value = "";
        byTitle.value  = "";
        byType.value  = "";
        minPrice.value  = "";
        maxPrice.value = "";
        artistsList.innerHTML = ""
        dropDown.classList.remove("show")
        dropDown.classList.add("hide")
        myChart.data.labels = ""
        myChart.data.datasets[0].data = ""
        myChart.update()
    })
})

// getting all the data and render in dom on document load event
const onLoadFetchData = () => {
    if(!localStorage.getItem("itemData")){
        localStorage.setItem("itemData",JSON.stringify(items))
    }
    renderCards(list)
    dataFetchArtists(select)
    dataFetchArtists(byArtist)
    renderTypes(byType,itemTypes)
    renderTypes(typeAdd,itemTypes)
    renderTypes(typeEdit,itemTypes)
    filterArtistCards(JSON.parse(localStorage.getItem("itemData")),artistsList,)        
}

hamBtnShow(hamBtn,clickLink,dropDown)



window.addEventListener("load",onLoadFetchData)
window.addEventListener("popstate", onBackArrow)
window.addEventListener("load", beforeReload)
window.addEventListener("load",handleRouter)
window.addEventListener("hashchange",handleRouter)








