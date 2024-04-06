import { description, imgURL, priceAdd, titleAdd, typeAdd, publishCheckBox } from "../artistsItems/artistsItems.js"
// create item class
class Item {
    constructor(_id,_title,_description,_type,_image,_price,_artist,_dateCreated,_isPublished,_isAuctioning,_dateSold,_priceSold){
        this.id = _id
        this.title = _title
        this.description = _description
        this.type = _type
        this.image = _image
        this.price = _price
        this.artist = _artist
        this.dateCreated = _dateCreated
        this.isPublished = _isPublished
        this.isAuctioning = _isAuctioning
        this.dateSold = _dateSold
        this.priceSold = _priceSold
    }
}

export const addItemFunction = () => {
    let addNewItemVar // get a empty var on the top of the function scope
    if(
        titleAdd.value !== "" &&
        description.value !== "" &&
        typeAdd.value !== "" &&
        priceAdd.value !== "" &&
        imgURL.value !== "" 
        ){
    const isAuctioning = !JSON.parse(localStorage.getItem("auctingItem"));
    const existingItemData = JSON.parse(localStorage.getItem("itemData"));
    const Currentdate = new Date()
    const dateCreated = Currentdate.toISOString()
    const id = existingItemData.length + 1
    const artist = localStorage.getItem("user")
    const addNewItem = new Item(id,titleAdd.value,description.value,typeAdd.value,imgURL.value,+priceAdd.value,artist,dateCreated,publishCheckBox.checked,isAuctioning,"","")

    existingItemData.push(addNewItem);
    localStorage.setItem("itemData", JSON.stringify(existingItemData));
    addNewItemVar = addNewItem //we put the new item in the empty var on the top so we can return out of the if condition scope
    }

    return addNewItemVar // return the new item
}