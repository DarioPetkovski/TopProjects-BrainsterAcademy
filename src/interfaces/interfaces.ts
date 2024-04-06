export interface Restoraunt{
    reviews:number
    parkinglot: boolean
    phone: string
    image:string
    restauranttype:string
    businessname:string
    address:string
    slug:string
    email:string
    id:string
    reviewsList:review[]
}
export interface review{
    id:number | undefined
    author:string
    comment:string
    stars:number
}
export interface ContextData {
    data:Restoraunt[]
    favorites:Restoraunt[]
    setData:React.Dispatch<React.SetStateAction<Restoraunt[]>>
    setFavorites:React.Dispatch<React.SetStateAction<Restoraunt[]>>
    err:string | undefined
}