import { useParams } from "react-router-dom"
import { Artist } from "../ArtistList/ArtistListInterface"
import Navbar from "../Navbar/Navbar"
import "./AlbumPage.css"
import AlbumItem from "./AlbumItem/AlbumItem"
import ErrorPage from "../ErrorPage/ErrorPage"

interface AlbumProps {
    data: Artist[]
}

function AlbumPage({data}:AlbumProps) {
    const {id} = useParams<{id:string}>()
    const {albumId} = useParams<{albumId:string}>()

    const artist = data.find(item => item.id === Number(id))
    const album = artist?.albums.find(el => el.albumId === albumId)
    
  return (
    <>
    {album ?
        <>
        <Navbar/>
        <AlbumItem {...album}/>
        </>
    : <ErrorPage/>}
    </>
  )
}

export default AlbumPage