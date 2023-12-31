import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Footer from "./components/footer/Footer";
import Favcards from "./pages/FavCards";
import AddCardForm from "./components/AddCardForm";
import UpdateCard from "./pages/adminPages/UpdateCard";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";
import { Dashboard } from "./pages/adminPages/dashboard";
import { Route, Routes } from "react-router-dom";
import CardInfo from "./pages/cardInfo/CardInfo";
import MyCards from "./pages/MyCards";
import EditUser from "./pages/EditUser";
import { useEffect, useState } from 'react';
import {AuthRoute} from "./auth/AuthRoute"
import UserInfo from "./pages/userinfo/UserInfo";
import Copyright from "./components/Copyright";


function App() {

  const [theme, setTheme] = useState('light');
  useEffect(() => {

    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };




  return (

    <div
      id='app'
      className={theme}>
      <CssBaseline />
      <Header
        toggleTheme={toggleTheme}
        currentTheme={theme}

      />

      <ToastContainer position="top-right" theme="light" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/favcards" element={<AuthRoute><Favcards /></AuthRoute>}/>
        <Route path="/mycards" element={<AuthRoute><MyCards /></AuthRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/adminarea" element={<AuthRoute><Dashboard /></AuthRoute>} />
        <Route path="/updatecard/:id" element={<AuthRoute><UpdateCard /></AuthRoute>} />
        <Route path="/addCard" element={<AuthRoute><AddCardForm /></AuthRoute>} />
        <Route path="/cardinfo/:id" element={<CardInfo />} />
        <Route path="/userinfo/:id" element={ <AuthRoute><UserInfo /></AuthRoute> } />
        <Route path="/edituser/:id" element={<AuthRoute><EditUser /></AuthRoute> } />
      </Routes>
      <Copyright />
      <Footer />
    </div>

  );
}

export default App;
