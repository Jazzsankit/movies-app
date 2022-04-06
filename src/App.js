import './App.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Movies from './components/Movies';
import Favourite from './components/Favourite';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Banner />
            <Movies />
          </>
        } />
        <Route path='/favourites' element={<Favourite />} />
      </Routes>
      {/* <Banner/>
      <Movies/> */}
      {/* <Favourite/> */}

    </Router>
  );
}

export default App;
