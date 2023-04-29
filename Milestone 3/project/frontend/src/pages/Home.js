import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link'; import { createTheme } from '@mui/material/styles';
import { pink, purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { ThemeProvider } from "@mui/material/styles";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Divider } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { display, maxWidth } from '@mui/system';
// import Footer from '../components/footer';

// import { createTheme} from "@mui/material/styles";


// const navItems = ['Home', 'About', 'Contact'];
const navItems = [];


const theme1 = createTheme();

theme1.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.4rem',
  },
  [theme1.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },

};




export default function Home() {
  return (
    <>
      <div >



        <Box sx={{
          textAlign: 'center', flexGrow: 2, display: { xs: 'none', sm: 'block' },
          flexWrap: 'rows', flexDirection: 'row'
        }}>

          <Divider />
          <List sx={{ flexDirection: 'row' }}>
            {navItems.map((item) => (
              <ListItem key={item} disablePadding >
                <ListItemButton sx={{ textAlign: 'center', maxWidth: 100, color: '#2962ff' }}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' }, flexDirection: 'row' }}>
          {navItems.map((item) => (
            <Button key={item} sx={{ color: '#fff' }}>
              {item}
            </Button>
          ))}
        </Box>


        <ThemeProvider theme={theme1}>
          <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', minHeight: 1000, backgroundColor: '#f5f5f5' }}>
            <Box sx=
              {{
                maxWidth: 350,
                color: '',
                height: 100
              }}
            >

              <Typography mt={25} ml={20} variant="h3" gutterBottom>
                WITHOUT A GOOD QUESTION, A GOOD ANSWER HAS NO PLACE TO GO.
              </Typography>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
              {/* <Button variant="contained"  > Click Me</Button> */}
            </Box>
            <Card sx={{
              height: 500,
              marginTop: 25
            }} >
              <CardMedia
                sx={{
                  height: 400,
                  width: 400
                }}
                image="https://media.istockphoto.com/id/1223487232/photo/beautiful-businesswoman-standing-at-home-and-holding-laptop-computer-oh-hands.jpg?s=612x612&w=0&k=20&c=EkrXQxqkIrtkWO6D530JjdJPJgaPauGHgKFXWOWnCNM="

              />
              <CardContent>
                < Typography variant="body" color="text.primary" sx={{
                  paddingLeft: 10
                }}>
                  LEARN MORE, GROW MORE
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </ThemeProvider>

      </div>

      {/* < Footer /> */}
    </>
  )
}