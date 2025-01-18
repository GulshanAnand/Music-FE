import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/register';
import Playlist from './pages/Playlist';
import { Navbar } from './components/navbar';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/playlist" element={<Playlist />}/>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
