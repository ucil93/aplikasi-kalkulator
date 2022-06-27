import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
        <main>
          <Routes>
            <Route exact path="/" element={<Landing />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/home" element={<Home />}></Route>
          </Routes>
        </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
