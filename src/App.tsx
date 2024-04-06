import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArtistList from './Components/ArtistList/ArtistList';
import ArtistPage from './Components/ArtistPage/ArtistPage';
import { Artist } from './Components/ArtistList/ArtistListInterface';
import artists from './db';
import AlbumPage from './Components/AlbumPage/AlbumPage';
import ErrorPage from './Components/ErrorPage/ErrorPage';

function App() {
  const [data, setData] = useState<Artist[]>([]);

  useEffect(() => {
    setData(artists);
  }, []);

  return (
    <Router>
      <div className="App d-flex flex-column justify-content-center align-items-center">
        <Routes>
          <Route path="/" element={<ArtistList />} />
          <Route path="artist/:id" element={<ArtistPage data={data} />} />
          <Route path="artist/:id/:albumId" element={<AlbumPage data={data}/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
