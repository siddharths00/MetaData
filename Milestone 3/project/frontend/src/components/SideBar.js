import React from 'react';
import { Divider, Drawer, ListItemButton, Toolbar, Typography } from "@mui/material";
import List from "@mui/material/List";
import { useNavigate, useLocation } from 'react-router-dom';
import { ClassNames } from '@emotion/react';
import StyleIcon from '@mui/icons-material/Style';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
 

function SideBar({ theme }) {

    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
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
            
        }
    ];

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

            width: `calc(100% - ${drawerWidth}px)`,
            position: 'relative',
            zIndex: theme.zIndex.drawer + 1,

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
        <>
            < Toolbar />
            < Divider />

            <Drawer
                variant='permanent'
                anchor='left'
                sx={classes.drawer}
                classes={{ paper: classes.drawerPaper }}
            >
                < List sx={{marginTop: 10}}>
                    {
                        menuItems.map(item => (

                            < ListItemButton
                                key={item.text}
                                onClick={() => { navigate(item.path) }}
                                sx={location.pathname === item.path ? classes.active : null}
                            >
                                <ListItemIcon> {item.icon} </ListItemIcon>
                                <ListItemText primary={item.text} />

                            </ListItemButton>

                        ))
                    }
                </List>
            </Drawer>

        </>


    );

}

export default SideBar;

{/* <ul className='nav flex-column mb-auto nav-pills nav-fill' style={ {backgroundColor: "white", width: "15%"}}>
        <li className='nav-item text-center'> <a className='nav-link' style={{color: "black"}} data-toggle="pill" href='/search/tags'> Tags </a> </li>
       <li className='nav-item text-center'> <a className='nav-link' style={{color: "black"}} data-toggle="pill" href='/search/users'> Users </a> </li>
       <li className='nav-item text-center'> <a className='nav-link' style={{color: "black"}} data-toggle="pill" href='/search/questions'> Questions </a> </li>
</ul> */}

