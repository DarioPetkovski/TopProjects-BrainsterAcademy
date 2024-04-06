import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Filters from './Components/Filters/Filters';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Filters/>
      <Footer/>
    </div>
  );
}

export default App;
