import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Link, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css'; 
import NavBar from "./components/tempNavBar";
import Home from './pages/Home';
import About from './pages/About';
import { createTheme, ThemeProvider } from '@mui/material';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './components/Search';
// import Footer from "./components/footer";
import UserProfile from './pages/UserProfile';
import axios from "axios";
import NotFound from './components/NotFound';


const theme = createTheme();

const App = () => {

  const [isAuth, setisAuth] = useState(true);
  const [id, setId] = useState(null);


  axios.defaults.withCredentials = true;

  useEffect(
    () => {
      onEnter();
    }
  );

  const onEnter = async (e) => {
    await axios.get('http://localhost:3001/home')
      .then((response) => {

        // console.log(response);
        // console.log(response.data.message);

        var result = response.data;
        // console.log(result.message);

        if (result.message == 'Not active') {
          setisAuth(false);
        }
        else {
          setId(result.userid);
        }
      })
  }

  const [justSignedUp, setJustSignedUp] = useState(false);
  const [signedDetails, setSignedDetails] = useState(null);

  return (

    < ThemeProvider theme={theme}>

      < BrowserRouter >

        < NavBar isAuth={isAuth} id={id} setisAuth={setisAuth} theme={theme} />

        < Routes>

          < Route path="/" element={<Search theme={theme} isAuth={isAuth} id={id}/>} />
          {/* < Route path="/about" element={< About />} /> */}
          {/* < Route path="/" element={<Search theme={theme} isAuth={isAuth} id={id}/>} /> */}
          < Route path="/login" element={< Login isAuth={isAuth} id={id} setisAuth={setisAuth} justSignedUp={justSignedUp} setJustSignedUp={setJustSignedUp} signedDetails={signedDetails} setSignedDetails={setSignedDetails} />} />
          < Route path="/signup" element={< Signup justSignedUp={justSignedUp} setJustSignedUp={setJustSignedUp} signedDetails={signedDetails} setSignedDetails={setSignedDetails} />} />

          < Route path="/search/*" element={<Search theme={theme} isAuth={isAuth} id={id}/>} />

          < Route path="/profile/*" element={isAuth ? < UserProfile theme={theme} /> : < Navigate to='/login' />} />

          {/* < Route path="/footer" element={<Footer />} /> */}

          < Route path="/*" element={<NotFound />} />


        </Routes>

      </BrowserRouter>

    </ThemeProvider>

  );


}

export default App;

