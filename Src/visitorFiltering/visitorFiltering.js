import { myChart } from "../artists/artists.js"
import { nav, visitorListingPage } from "../visitorListing/visitorListing.js"
import {byArtist, byTitle, byType, minPrice, maxPrice} from "../visitorListing/visitorListing.js"

export function visitorFilter(){
    const crossBtn = document.querySelector(".cross")
    crossBtn.addEventListener("click", ()=>{
        document.getElementById("visitorFilter").style.right = "-100%"
        visitorListingPage.style.left = "0%"
        nav.style.left = "0%"
    })
}
export function beforeReload (){
    document.getElementById("visitorFilter").style.right = "-100%"
    nav.style.left = "0%"
    visitorListingPage.style.left = "0%"
}
export const onBackArrow = () =>{
    document.getElementById("visitorFilter").style.right = "-100%"
    nav.style.left = "0%"
    visitorListingPage.style.left = "0%"
    byArtist.value = ""
    byTitle.value = ""
    byType.value = ""
    minPrice.value = ""
    maxPrice.value = ""
    myChart.data.labels = ""
    myChart.data.datasets[0].data = ""
    myChart.update()
}