import { addItemFunction } from "../artistItemAdd/artistItemAdd.js"
import { artistNav, artistTitle } from "../artists/artists.js"
import { auctionList, intervalId } from "../auction/auction.js"
import { nav } from "../visitorListing/visitorListing.js"

export const artistsList = document.querySelector(".artistsItems")
export const artistItemsSec = document.getElementById("artistsItems")
export const artistItemAddSec = document.getElementById("artistItemAdd")
const addItem = document.querySelector(".addItem")
const form = document.getElementById("formAddItem")
const cancelBtn = document.getElementById("cancelBtn")
export const publishCheckBox = document.getElementById("publishBtn")
export const titleAdd = document.getElementById("titleAdd")
export const description = document.getElementById("descriptionAdd")
export const typeAdd = document.getElementById("typeAdd")
export const priceAdd = document.getElementById("priceAdd")
export const imgURL = document.getElementById("imgURL")
const cameraSection = document.getElementById("cameraCanvas")
const cameraBtn = document.getElementById("cameraBtn")
const canvasContent = document.getElementById("canvasContent")
const toggleCameraBtn = document.getElementById("toggleCameraBtn")

const formEdit = document.getElementById("formEditItem");
const artistEditItem = document.getElementById("artistItemEdit")
const publishBtnEdit = document.getElementById("publishBtnEdit")
const titleEdit = document.getElementById("titleAddEdit")
const descriptionEdit = document.getElementById("descriptionAddEdit")
export const typeEdit = document.getElementById("typeAddEdit")
const priceEdit = document.getElementById("priceAddEdit")
const imgURLEdit = document.getElementById("imgURLEdit")
const cancelBtnEdit = document.querySelector(".cancelBtnEdit")
const cameraSectionEdit = document.getElementById("cameraCanvasEdit")
const btnCameraEdit = document.getElementById("btnCameraEdit")
const canvasContentEdit = document.getElementById("canvasContentEdit")
const toggleCameraBtnEdit = document.getElementById("toggleCameraBtnEdit")

// for edit item Form
const canvasEdit = document.getElementById("photoCanvasEdit")
const cameraEdit = document.getElementById("cameraFeedEdit")
const snapBtnEdit = document.querySelector(".snapBtnEdit")
const capturedPhotoEdit = document.getElementById("capturedPhotoEdit")

// for add item Form
const canvas = document.getElementById("photoCanvas")
const camera = document.getElementById("cameraFeed")
const snapBtn = document.querySelector(".snapBtn")
const capturedPhoto = document.getElementById("capturedPhoto")
let currentEditItemId; // create a var that will get the current item when click on edit btn
let currentCamera = 'user';

export const artistsItemsInit = () =>{
    nav.style.display = "none"
    artistNav.style.display = "block"
    artistsList.innerHTML = ""
    filterArtistCards(JSON.parse(localStorage.getItem("itemData")),artistsList)
    const artist = localStorage.getItem("user")
    artistTitle.innerText = artist
    clearInterval(intervalId)
    auctionList.innerHTML = ""
    
    addItem.addEventListener("click",()=>{
        publishCheckBox.checked = true
        artistItemsSec.style.display = "none"
        artistItemAddSec.style.display = "block"
    })

    const toggleCamera = (camera) => {
        if (camera.srcObject) {
            const tracks = camera.srcObject.getTracks();
            tracks.forEach(track => track.stop());
        }
    
        currentCamera = currentCamera === 'user' ? 'environment' : 'user';
    
        navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: currentCamera } } })
            .then(stream => {
                camera.srcObject = stream;
            })
            .catch(error => {
                console.error(error);
            });
    }
    toggleCameraBtn.addEventListener("click",()=>{
        toggleCamera(camera)
    })
    toggleCameraBtnEdit.addEventListener("click",()=>{
        toggleCamera(cameraEdit)
    })

    // camera for add item form
    canvas.addEventListener("click",() => {
        cameraSection.style.display = "block"
        artistItemAddSec.style.display = "none"
        camera.style.display = "block";
        navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    camera.srcObject = stream;
                })
                .catch(err => console.log(err))
    })
    
    cameraBtn.addEventListener("click",()=>{
        cameraSection.style.display = "block"
        artistItemAddSec.style.display = "none"
        camera.style.display = "block";
        navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    camera.srcObject = stream;
                })
                .catch(err => console.log(err))
    })
    snapBtn.addEventListener("click",()=>{
        cameraBtn.style.display = "none"
        canvasContent.style.display = "none"
        cameraSection.style.display = "none"
        artistItemAddSec.style.display = "block"
        canvas.width = camera.videoWidth;
        canvas.height = camera.videoHeight;

        canvas.getContext('2d').drawImage(camera, 0, 0, canvas.width, canvas.height);
           const photoDataURL = canvas.toDataURL('image/png');
            imgURL.value = photoDataURL
            capturedPhoto.src = photoDataURL;
            capturedPhoto.style.display = 'block';
            camera.style.display = 'none';
    })

    // camera for edit item form
    btnCameraEdit.addEventListener("click",()=>{
        cameraSectionEdit.style.display = "block"
        artistEditItem.style.display = "none"
        cameraEdit.style.display = "block";
        navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    cameraEdit.srcObject = stream;
                })
                .catch(err => console.log(err))
    })
    canvasEdit.addEventListener("click",() => {
        cameraSectionEdit.style.display = "block"
        artistEditItem.style.display = "none"
        cameraEdit.style.display = "block";
        navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    cameraEdit.srcObject = stream;
                })
                .catch(err => console.log(err))
    })
    snapBtnEdit.addEventListener("click",()=>{
        btnCameraEdit.style.display = "none"
        canvasContentEdit.style.display = "none"
        cameraSectionEdit.style.display = "none"
        artistEditItem.style.display = "block"
        canvasEdit.width = cameraEdit.videoWidth;
        canvasEdit.height = cameraEdit.videoHeight;

        canvasEdit.getContext('2d').drawImage(cameraEdit, 0, 0, canvasEdit.width, canvasEdit.height);
           const photoDataURL = canvasEdit.toDataURL('image/png');
            imgURLEdit.value = photoDataURL
            capturedPhotoEdit.src = photoDataURL;
            capturedPhotoEdit.style.display = 'block';
            cameraEdit.style.display = 'none';
    })

    cancelBtn.addEventListener("click",(e)=>{
        e.preventDefault()
        artistItemsSec.style.display = "block"
        artistItemAddSec.style.display = "none"
        cameraBtn.style.display = "block"
        canvasContent.style.display = "block"
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        clearInputsForm()
    })

    form.addEventListener("submit",(e)=>{
        e.preventDefault()
        artistItemsSec.style.display = "block"
        artistItemAddSec.style.display = "none"
        cameraBtn.style.display = "block"
        canvasContent.style.display = "block"
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        const addNewItem = addItemFunction()
        cardSkelet(addNewItem,artistsList)
        clearInputsForm()
    })
    
    cancelBtnEdit.addEventListener("click",(e)=>{
        e.preventDefault()
        const items = JSON.parse(localStorage.getItem("itemData"));
        items.forEach(item => {
            artistItemsSec.style.display = "block";
            artistEditItem.style.display = "none";
            btnCameraEdit.style.display = "block"
            canvasContentEdit.style.display = "block"
            canvasEdit.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            publishBtnEdit.checked = item.isPublished;
            titleEdit.value = item.title;
            descriptionEdit.value = item.description;
            typeEdit.value = item.type;
            priceEdit.value = item.price;
            imgURLEdit.value = item.image;
        })
    })
    
    formEdit.addEventListener("submit", (e) => {
        e.preventDefault();
        const items = JSON.parse(localStorage.getItem("itemData"));
        artistItemsSec.style.display = "block";
        artistEditItem.style.display = "none";
        btnCameraEdit.style.display = "block"
        canvasContentEdit.style.display = "block"
        canvasEdit.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        const currentItem = items.find(item => item.id === currentEditItemId); // find the current item comparing the id
            
        if (currentItem) {
            if (publishBtnEdit.checked) {
                        currentItem.isPublished = true;
            } 
            else {
                        currentItem.isPublished = false;
            }
            currentItem.title = titleEdit.value;
            currentItem.description = descriptionEdit.value;
            currentItem.type = typeEdit.value;
            currentItem.price = priceEdit.value;
            currentItem.image = imgURLEdit.value;
            
            localStorage.setItem("itemData", JSON.stringify(items));
            // getting the dom elements depends on thier id
            const price = document.getElementById(`price-${currentEditItemId}`);
            const publishBtn = document.getElementById(`btnPublish-${currentEditItemId}`);
            const title = document.getElementById(`title-${currentEditItemId}`)
            const img = document.getElementById(`img-${currentEditItemId}`)
            const desc = document.getElementById(`desc-${currentEditItemId}`)
            if (price && publishBtn && title && img && desc) {
                // updating the elements with the new values
                desc.innerText = currentItem.description
                img.src = currentItem.image
                title.innerText = currentItem.title
                price.innerText = `$${currentItem.price}`;
                if (currentItem.isPublished) {
                    publishBtn.classList.remove("lightGrey");
                    publishBtn.classList.add("green");
                    publishBtn.innerText = "Unpublish";
                } 
                else {
                    publishBtn.classList.remove("green");
                    publishBtn.classList.add("lightGrey");
                    publishBtn.innerText = "Publish";
                }
            }
        }
    });

}

const clearInputsForm = () => {
        titleAdd.value = ""
        description.value = ""
        typeAdd.value = ""
        priceAdd.value = ""
        imgURL.value = ""
}

const createDOMelemet = (element) => {
    const DOMelement = document.createElement(element)
    return DOMelement;
}

export const filterArtistCards = (items,list) => {
    items.filter(item => item.artist.includes(localStorage.getItem("user"))).forEach(item => {
        cardSkelet(item,list)
    })
}



export const cardSkelet = (item,list) => {    
        if(item){
        const dateCreated = item.dateCreated.split("T")[0]
        const card = createDOMelemet("div")           // card
        card.classList.add("artistCard","light-bg","mb-5")
        card.id = item.id

            const cardImg = createDOMelemet("div")    // img container
            cardImg.classList.add("card-img")
                const img = createDOMelemet("img")
                img.classList.add("w-100","img")
                img.id = `img-${item.id}`
                img.src = item.image


            const content = createDOMelemet("div")      //  content container
            content.classList.add("content", "container-fluid")
                const innerContent = createDOMelemet("div")
                innerContent.classList.add("d-flex" ,"justify-content-between","align-items-center", "pb-3" ,"pt-2")

                       const wrapper = createDOMelemet("div")
                             const h5 = createDOMelemet("h5")
                             h5.classList.add("m-0","title")
                             h5.innerText = item.title
                             h5.id = `title-${item.id}`
                             const small = createDOMelemet("small")
                             small.classList.add("dateColor")
                             small.innerText = dateCreated
                        
                        const price = createDOMelemet("button")
                        price.classList.add("dark-bg","price")
                        price.id = `price-${item.id}`
                        price.innerText = `$${item.price}`
                
                const desc = createDOMelemet("p")
                desc.classList.add("desc")
                desc.innerText = item.description
                desc.id =`desc-${item.id}`


            const btnContainer = createDOMelemet("div")      // btn container
            btnContainer.classList.add("container-fluid" ,"btnsCon" ,"justify-content-between" ,"d-flex", "align-items-center" ,"py-3","padX","dark-bg" ,"flex-wrap","box-shadow")

                const inner1 = createDOMelemet("div")
                inner1.classList.add("inner")
                    const btnAuction = createDOMelemet("button")
                    btnAuction.classList.add("controlBtn","blue","auctionBtns")
                    btnAuction.innerText = "Send to Auction"
                    btnAuction.id = `auction-${item.id}`

                    if(!item.isAuctioning){
                        btnAuction.disabled = true
                        btnAuction.style.opacity = "0.6"
                    }

                    btnAuction.addEventListener("click", () => {                    
                        const data = JSON.parse(localStorage.getItem("itemData"));
                        const card = btnAuction.closest(".artistCard");
                    
                        // Check if the card id matches the current item id
                        if (card.id == item.id) {
                            // Save the original isAuctioning values
                            const originalAuctioningStates = data.map(item => item.isAuctioning);
                    
                            // Set isAuctioning to false for all items
                            data.forEach(item => {
                                item.isAuctioning = false;
                            });
                            localStorage.setItem("itemData", JSON.stringify(data));
                    
                            const timerDuration = 120;
                            localStorage.setItem("timeDuration", timerDuration);
                            localStorage.setItem("auctingItem", JSON.stringify(item));
                            const addedItem = JSON.parse(localStorage.getItem("auctingItem"))
                            addedItem.price = addedItem.price / 2
                            localStorage.setItem("auctingItem",JSON.stringify(addedItem))
                            localStorage.setItem("originalAuctioningStates", JSON.stringify(originalAuctioningStates));
                            artistsList.innerHTML = ""
                            filterArtistCards(JSON.parse(localStorage.getItem("itemData")),artistsList)
                        }
                    });

                const inner2 = createDOMelemet("div")
                inner2.classList.add("inner")
                    const btnPublish = createDOMelemet("button")
                    btnPublish.classList.add("controlBtn","lightGrey","publishBtn")
                    btnPublish.id = `btnPublish-${item.id}`
                    btnPublish.innerText = "Publish"

                    if(item.isPublished){
                        btnPublish.classList.remove("lightGrey")
                        btnPublish.classList.add("green")
                        btnPublish.innerText = "Unpublish"
                    }

                    btnPublish.addEventListener("click", (e) => {
                        const items = JSON.parse(localStorage.getItem("itemData"));
                    
                        const currentItem = items.find(storedItem => storedItem.id === item.id);
                    
                        if (currentItem) {
                            if (currentItem.isPublished) {
                                currentItem.isPublished = false;
                                e.target.classList.remove("green");
                                e.target.classList.add("lightGrey");
                                e.target.innerText = "Publish";
                            } else {
                                currentItem.isPublished = true;
                                e.target.classList.remove("lightGrey");
                                e.target.classList.add("green");
                                e.target.innerText = "Unpublish";
                            }
                    
                            localStorage.setItem("itemData", JSON.stringify(items));
                        }
                    });

                const inner3 = createDOMelemet("div")
                inner3.classList.add("inner")
                    const btnRemove = createDOMelemet("button")
                    btnRemove.classList.add("controlBtn","orange","removeBtn")
                    btnRemove.innerText = "Remove"

                    btnRemove.addEventListener("click", (e) => {
                        const data = JSON.parse(localStorage.getItem("itemData"));
                        const card = e.target.closest(".artistCard");
                    
                        if (card.id == item.id) {
                            const cardId = card.id;
                            const indexToRemove = data.findIndex(storedItem => storedItem.id == cardId);
                    
                            if (indexToRemove !== -1) {
                                data.splice(indexToRemove, 1);
                                localStorage.setItem("itemData", JSON.stringify(data));
                                card.remove();
                            }
                        }
                    });

                const inner4 = createDOMelemet("div")
                inner4.classList.add("inner")
                    const btnEdit = createDOMelemet("button")
                    btnEdit.classList.add("controlBtn","light-bg","editBtn")
                    btnEdit.innerText = "Edit"

                    btnEdit.addEventListener("click", (e) => {
                        if (e.target.closest(".artistCard").id == item.id) {
                            currentEditItemId = item.id; // when click on edit btn it gets the event target on the closest card and if id is compering the item id then we set the current var to be the same as item id
                            artistItemsSec.style.display = "none";
                            artistEditItem.style.display = "block";
                            
                            const items = JSON.parse(localStorage.getItem("itemData"));
                            const currentItem = items.find(item => item.id === currentEditItemId); // we find the item compering the id item and the current item value which is the item id 
                            if (currentItem) {
                                publishBtnEdit.checked = currentItem.isPublished;
                                titleEdit.value = currentItem.title;
                                descriptionEdit.value = currentItem.description;
                                typeEdit.value = currentItem.type;
                                priceEdit.value = currentItem.price;
                                imgURLEdit.value = currentItem.image;
                            }
                        }
                    });

        list.appendChild(card)
        card.append(cardImg,content,btnContainer)
        cardImg.appendChild(img)
        content.append(innerContent,desc)
        innerContent.append(wrapper,price)
        wrapper.append(h5,small)
        btnContainer.append(inner1,inner2,inner3,inner4)
        inner1.appendChild(btnAuction)
        inner2.appendChild(btnPublish)
        inner3.appendChild(btnRemove)
        inner4.appendChild(btnEdit)
        }
}











