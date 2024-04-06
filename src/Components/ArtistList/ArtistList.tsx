import { useEffect, useState } from "react"
import { Artist } from "./ArtistListInterface"
import artists from "../../db"
import "./ArtistList.css"
import ArtistItem from "./ArtistItem/ArtistItem"
import Navbar from "../Navbar/Navbar"

function ArtistList() {
    const [data,setData] = useState<Artist[]>([])

    useEffect(()=>{
        setData(artists)
    },[])

  return (
    <>
    <Navbar/>
    <div className="ArtistList col-4 text-center px-0">
        <h3 className="my-0 browse py-3 px-1">Browse the Artist</h3>
        {data.map((item ,index)=> {
            return <ArtistItem key={index} {...item}/>
        })}
    </div>
    </>
  )
}

export default ArtistList