import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from '../pages/Signup';
import Home from './../pages/Home';
import About from './../pages/About';
// import { useNavigate } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import '../styles/Home.css'
import LoggedUser from '../components/LoggedUser';
import Login from '../pages/Login';
import StyleIcon from '@mui/icons-material/Style';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';


// Make profile a protected page 

// import {AppBar, Toolbar} from "@mui/material";
// import {Avatar} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import GitHubIcon from '@mui/icons-material/GitHub';

// const pages = [{ text: 'Home', path: '/' }, { text: 'About', path: '/about' }, { text: 'Search', path: '/search/questions' }];
const pages = [
  {
  text: 'Tags',
  icon: <StyleIcon />,
  path: '/search/tags'
},
{
  text: 'Users',
  icon: <PersonSearchIcon />,
  path: '/search/users'
},
{
  text: 'Questions',
  icon: <QuestionAnswerIcon />,
  path: '/search/questions'

},
{ 
  text: 'Create Post',
  icon: <AddCircleOutlineOutlined />,
  path: '/search/ask'
  
}];
function NavBar(props) {

  const isAuth = props.isAuth;
  const setIsAuth = props.setisAuth;
  const theme = props.theme;


  const [ imageURL, setImageURL ] = useState(null);
  const [ displayName, setDisplayName ] = useState(null);

  useEffect( () => {

    if (isAuth){

      axios.get('http://localhost:3001/loggeduser')
      .then(function (response) {

          // handle success
          // console.log(response.data);
          // setUser(response.data);
          setImageURL(response.data[0].profile_image_url);
          setDisplayName(response.data[0].display_name);

      })
      .catch(function (error) {
          // handle error
          console.log(error);
      })
    }

  }, [isAuth])

  // useEffect(()=>{}, [isAuth]);

  const navigate = useNavigate();
  const location = useLocation();

  const onClick = async (e) => {

    e.preventDefault();

    await axios.post('http://localhost:3001/logout')

      .then((response) => {

        var result = JSON.stringify(response.data);
        var json = JSON.parse(result);
        console.log(json.message);

        if (json.message == 'Logged out') {
          setIsAuth(false);
          setDisplayName(null);
          setImageURL(null);
          navigate('/Login');
        }
      })
      .catch((err) => {

        console.log(err);

      })
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  return (
    <AppBar position="static" sx={{    position: 'relative',
    zIndex: theme.zIndex.drawer + 1,
}}>

      <Container maxWidth="xl">

        <Toolbar disableGutters>

          {/* <GitHubIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

          <Typography
            variant="h6"
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick={() => { navigate('/') }}
          >
            Asktopia
          </Typography> */}

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          {/* <GitHubIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick={() => { navigate('/') }}
          >
          Asktopia
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.text}
                onClick={() => {

                  handleCloseNavMenu();
                  navigate(page.path)

                }}
                // href={page.path}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.text}
                {page.icon}
              </Button>
            ))}
          </Box>
          { isAuth?
          <Box sx={{ flexGrow: 0 }}>
            < Typography
            variant='h6'
            sx={{display: 'inline-flex'}}
            margin={2}
            >{displayName}</Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                 <Avatar alt="profile pic" src={imageURL} /> 
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={'Profile'} onClick={() => { handleCloseUserMenu(); navigate('/profile/account') }}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem key={'Logout'} onClick={(e) => { handleCloseUserMenu(); onClick(e);  }}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>

            </Menu>
          </Box>: <> <Button  color='inherit' onClick={() =>{  navigate('/login')}}> Login </Button> <Button  color='inherit' onClick={() =>{ navigate('/signup')}}> Sign Up </Button></>}
        </Toolbar>
      </Container>
    </AppBar>




  );
}

export default NavBar;


