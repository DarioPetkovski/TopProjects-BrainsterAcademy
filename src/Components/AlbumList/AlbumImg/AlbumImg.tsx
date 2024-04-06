import { Link } from "react-router-dom"
import { album } from "../../ArtistList/ArtistListInterface"

function AlbumImg(albumItem:album) {
  return (
    <div  className="col-6 px-0">
        <Link to={albumItem.albumId}>
        <img src={`/images/albums/${albumItem.cover}.jpg`} alt="" className='w-100'/></Link>
        </div>
  )
}

export default AlbumImg