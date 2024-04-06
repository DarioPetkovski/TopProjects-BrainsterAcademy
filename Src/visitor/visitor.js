import { artistNav } from "../artists/artists.js"
import { intervalId } from "../auction/auction.js";
import { list, renderCards } from "../visitorListing/visitorListing.js"

export function visitor () {
    clearInterval(intervalId);
    document.getElementById("navbar").style.display = "block"
    localStorage.setItem("userType","visitor")
    artistNav.style.display = "none"
    renderCards(list)
}