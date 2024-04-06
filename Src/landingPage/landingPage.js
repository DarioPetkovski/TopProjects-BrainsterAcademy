import { artistNav } from "../artists/artists.js";
import { filterArtistCards,artistsList } from "../artistsItems/artistsItems.js";
import { intervalId } from "../auction/auction.js";

export const select = document.getElementById("artistSelect")
const artistBtn = document.querySelector(".artistBtn")

export function landingPage() {
    clearInterval(intervalId);
    localStorage.removeItem("user")
    localStorage.removeItem("userType")
    artistNav.style.display = "none"
    document.getElementById("navbar").style.display = "none"
    artistBtn.addEventListener("click", (e) => {
        if (select.value === "") {
            e.preventDefault();
        } 
        else {
            location.hash = "artists";
            localStorage.setItem("user",select.value)
            select.value = "";
            artistsList.innerHTML = ""
            filterArtistCards(JSON.parse(localStorage.getItem("itemData")),artistsList)
        }
    });
}


