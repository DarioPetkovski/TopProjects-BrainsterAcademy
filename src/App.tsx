import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Feed from './Components/Feed/Feed';
import Header from './Components/Header/Header';
import Create from "./Components/Create/Create";
import { useGlobalContext } from "./Components/GlobalContext/Context";
import { useEffect } from "react";

function App() {
  const {darkMode} = useGlobalContext()

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return <div className={`App ${darkMode === true ? "dark-mode":""}`}>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Feed/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="*" element={<div className="text-center">
          <h1>Error 404</h1>
          <h3>Page not Found</h3>
        </div>}/>
      </Routes>
    </Router>
  </div>;
}

export default App;
