export interface DataType {
    name: string
    price: number
    gender: string
    brand: string
    image: string
}

export interface FilterType{
    content:string
    data: DataType[]
    onClickHandler:(event:any) => void
}

export interface FilterBlockType{
    options: FilterType[]
    onClickHandler:(event:any) => void
}
