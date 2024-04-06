import { Link, useParams } from 'react-router-dom';
import { Artist } from '../ArtistList/ArtistListInterface';
import "./ArtistPage.css"
import Navbar from '../Navbar/Navbar';
import AlbumList from '../AlbumList/AlbumList';
import ErrorPage from '../ErrorPage/ErrorPage';

interface ArtistPageProps {
  data: Artist[];
}

function ArtistPage({ data }: ArtistPageProps) {
  const { id } = useParams<{ id: string }>();
  const artist = data.find(item => item.id === Number(id));

  return (
    <>
      {artist ?
      <>
      <Navbar/>
          <div className="AlbumList col-4 d-flex justify-content-center align-items-center flex-column py-5">
            <AlbumList {...artist}/>
          </div>
      </>: <ErrorPage/>}
    </>
  );
}

export default ArtistPage;