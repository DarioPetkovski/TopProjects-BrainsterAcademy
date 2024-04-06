import { album } from "../../ArtistList/ArtistListInterface"


function AlbumItem(album:album) {
  return (
    <div className="AlbumPage d-flex justify-content-center align-items-center flex-column col-4 py-5">
        <div className="col-8">
        <img src={`/images/albums/${album.cover}.jpg`} alt="" className="w-100"/>
        <p className="mt-3 content-size"><span className="bold">Title:</span> {album.title}</p>
        <p className="content-size"><span className="bold">Year:</span> {album.year}</p>
        <p className="content-size"><span className="bold">Price:</span> {album.price} $</p>
        </div>
    </div>
  )
}

export default AlbumItem