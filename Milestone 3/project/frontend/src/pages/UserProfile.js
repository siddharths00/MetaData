import React, { useState, useEffect } from "react";
import SideBar from '../components/SideBar2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from "../components/Profile";
import PQuestions from "../components/pQuestions";
import PAnswers from "../components/pAnswers";
import PComments from "../components/pComments";
import EditPost from "../components/EditPost";
import EditAnswer from "../components/EditAnswer";
import EditComment from "../components/EditComment";
import NotFound from "../components/NotFound";



const UserProfile = ({ theme, children }) => {


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

    // drawerPaper: {

    //     width: drawerWidth

    // }
  }


  return (
    <div style={{ display: 'flex'}}>
      {/* <SideBar theme={theme} /> */}
      
      <div style={classes.page}>
        <div style={classes.toolbar}></div>

        < Routes>
          <Route path="account" element={<Profile />} />
          <Route path="questions" element={<PQuestions />} />
          <Route path="answers" element={<PAnswers />} />
          <Route path="comments" element={<PComments />} />
          < Route path="questions/:id" element={ < EditPost/>} />
          < Route path="answers/:id" element={ < EditAnswer />} />
          < Route path="comments/:id" element={ < EditComment />} />
          < Route path="*" element={ < NotFound />} />
        </Routes>

      </div>
    </div>

  );

}

export default UserProfile;

