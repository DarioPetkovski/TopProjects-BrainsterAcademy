import { Artist } from "../ArtistList/ArtistListInterface"
import AlbumImg from "./AlbumImg/AlbumImg"

function AlbumList(artist:Artist) {
  return (
    <>
    <div className="img-wrapper text-center">
              <img src={`/images/covers/${artist.cover}.jpg`} alt="" className="w-100" />
              <h4>{artist.name}</h4>
            </div>
            <p className='text-secondary text-center'>{artist.bio}</p>
            <div className="row px-3">
                {artist.albums.map((item , index) => {
                  return <AlbumImg key={index} {...item}/>
                })}
            </div>
    </>
  )
}

export default AlbumList