import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from "axios";
// import "../styles/Login.css";
import TextField from '@mui/material/TextField';
import { CardHeader, Grid, Container } from '@mui/material';
import { Paper, Avatar } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material';
import FormControlLabel from '@mui/material/FormControlLabel';
import CssBaseline from '@mui/material/CssBaseline';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GitHub from '@mui/icons-material/GitHub';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';


// The navigate to wont rerender the navbar with display name

const theme = createTheme();

function Login(props) {

  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  const [loginStatus, setLoginStatus] = useState('');
  const [buttonstatus, setButtonStatus] = useState('');

  const navigate = useNavigate();
  const isAuth = props.isAuth;
  const setIsAuth = props.setisAuth;
  const justSignedUp = props.justSignedUp
  const setJustSignedUp = props.setJustSignedUp
  const signedDetails = props.signedDetails
  const setSignedDetails = props.setSignedDetails

  const [username, setUsername] = useState('');


  const onLogin = async (e) => {

    e.preventDefault();
    setLoginStatus('');

    setUsernameError(false);
    setPasswordError(false);

    if (username === '')
      setUsernameError(true);

    if (password === '')
      setPasswordError(true);


    if (username !== '' && password !== '') {


      await axios.post('http://localhost:3001/login', {
        display_name: username,
        password: password,
      }, { withCredentials: true })
        .then((response) => {

          console.log(response);

          console.log(response.data.message);

          var result = JSON.stringify(response.data);

          var json = JSON.parse(result);

          console.log(json.message);

          //setLoginStatus(json.data[0]);

          if (json.message == 'Login Successful') {

           

            setIsAuth(true);
            setSignedDetails(null);
            setJustSignedUp(false);
            // setLoginStatus(json.message);
            setButtonStatus("Login");
            navigate('/');

          }
          else if (json.message == 'Incorrect Password') {

            setLoginStatus(json.message);
            setPasswordError(true);
            setButtonStatus("Try Again");
          }
          else {
            setLoginStatus(json.message);
            setUsernameError(true);
            setButtonStatus("Try Again");
            navigate('/login');

          }
        });

    }



  }

  return (

    <ThemeProvider theme={theme}>




      <Container component="main" maxWidth="xs" sx={{ boxShadow: 2, padding: 2, marginTop: 10, borderRadius: 2 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <GitHub />
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} >
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              onChange={(e) => { setUsername(e.target.value) }}
              error={usernameError}
              helperText={usernameError ? loginStatus : ""}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => { setPassword(e.target.value) }}
              error={passwordError}
              helperText={passwordError ? loginStatus : ''}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onLogin}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>


      {
        justSignedUp ?
          <Container component="main" maxWidth="xs" sx={{ boxShadow: 2, padding: 2, marginTop: 2, borderRadius: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Box component="form" noValidate sx={{ mt: 1 }} >



                < Typography
                  color= 'secondary'
                >

                   Remember your Username   <strong> { signedDetails.display_name + '#' + signedDetails.id} </strong>

                </Typography>
              </Box>
            </Box>
          </Container>
          : null

      }



    </ThemeProvider>


  )
}


{/* <div className='LI'>
<form onSubmit={onLogin}>
  <div className="main">
    <div className="form-group">
      <h3>LOG IN</h3>
      <label className='login' htmlFor='name'>Name:</label>
      <input type="text" className='login1' id="name" placeholder='NAME' required="" onChange={(e) => setDisplayname(e.target.value)} />
    </div>

    <div className='form-group'>
      <label htmlFor='password' className='login'>Password:</label>
      <input type="password" name='password' id="password" placeholder='PASSWORD' className='login1' required="" onChange={(e) => setPassword(e.target.value)} />
    </div>
    <button className='loginbutton'>LOGIN</button>
    <p> {loginStatus} </p>
  </div>
</form>
</div> */}


export default Login;

{/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */ }




{/* <Container>
<Card>
<Typography component="h1" variant="h5">
  Log in
</Typography>
<form  noValidate>
  <TextField
    variant="outlined"
    margin="normal"
    fullWidth
    id="username"
    label="Username"
    name="username"
  />
  <TextField
    variant="outlined"
    margin="normal"
    fullWidth
    name="password"
    label="Password"
    type="password"
    id="password"
    autoComplete="current-password"
  />
  <Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
  >
    Log In
  </Button>
  <Grid container>
    <Grid item>
      <Link to='/signup'>
        {"Don't have an account? Sign Up"}
      </Link>
    </Grid>
  </Grid>
</form>
</Card>
</Container> */}