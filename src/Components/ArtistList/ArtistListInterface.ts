export interface Artist {
    id: number
    name: string
    cover: string
    bio: string
    albums:album[]
}

export interface album {
    albumId: string
    title: string
    year: number
    cover: string
    price: number
}