import React, { useState, useEffect } from "react";
// import SideBar from './SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Users from "./Users";
import CreatePost from "./CreatePost";
import Questions from "./Questions";
import Post from "./Post";
import Content from "./Tags";
import Login from "../pages/Login";
import NotFound from "./NotFound";



const Search = ({ theme, children, isAuth, id}) => {


  const drawerWidth = 240;

  const classes = {

    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3)
    },

    drawer: {

      width: drawerWidth,
      "& .MuiDrawer-paper": {
        width: drawerWidth
      }

    },

    root: { display: "flex" },
    active: {
      background: '#f4f4f4'
    },

    appbar: {

      width: `calc(100% - ${drawerWidth}px)`
    },

    toolbar: theme.mixins.toolbar,

    left: {
      flexGrow: 1
    },

    avatar: {

      marginLeft: theme.spacing(2)
    }

  }


  return (
    <div style={{ display: 'flex'}}>
      {/* <SideBar theme={theme} />  */}
      <div style={classes.page}>
        <div style={classes.toolbar}></div>
    
        < Routes>
          <Route path="users" element={<Users />} />
          <Route path="tags" element={<Content />} />
          <Route path="questions" element={<Questions />} />
          < Route path="questions/:id" element={ < Post userid={id} isAuth={isAuth}/>} />
          < Route path="ask" element={ isAuth? < CreatePost /> : < Navigate to='/login' />} />
          < Route path="*" element={<Questions />} />
        </Routes>
      </div>
    </div>

  );

}

export default Search;

