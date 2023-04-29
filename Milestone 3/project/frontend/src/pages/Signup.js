import React from 'react';
// import '../styles/Signup.css';
import { useState } from 'react';
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

const theme = createTheme();



export default function Signup(props) {

    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [location, setLocation] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [aboutMe, setAboutMe] = useState(''); // parse


    const [displayNameError, setDisplayNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const [status, setStatus] = useState('');

    const justSignedUp = props.justSignedUp
    const setJustSignedUp = props.setJustSignedUp
    const signedDetails = props.signedDetails
    const setSignedDetails = props.setSignedDetails



    const handleSubmit = async (event) => {


        event.preventDefault();

        setStatus('');
        setDisplayNameError(false);
        setPasswordError(false);
        setConfirmPasswordError(false);

        if (displayName === '')
            setDisplayNameError(true);

        if (password === '')
            setPasswordError(true);

        if (confirmPassword === '')
            setConfirmPasswordError(true);

        if (password !== confirmPassword) {
            setPasswordError(true);
            setConfirmPasswordError(true);
            setStatus('Passwords don\'t match')
        }

        if (displayName !== '' && password === confirmPassword && password !== '') {

            await axios.post('http://localhost:3001/register', {
                display_name: displayName,
                password: password,
                location: location,
                image_url: imageURL,
                about_me: aboutMe,
            })
            .then((res) => {

                    console.log(res.data);
                    setSignedDetails(res.data);
                    setJustSignedUp(true);
                    navigate("/login");

            })
            .catch((err) => {

                    console.log(err);
            });

        }






    }

    /*if (validateForm(this.state.errors)) {

        console.info('Valid Form')

    } else {

        console.error('Invalid Form')

    }*/




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
                            Sign Up
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }} >
                            <TextField
                                margin="normal"
                                fullWidth
                                id="displayname"
                                label="Display Name"
                                name="displayName"
                                error = {displayNameError}
                                onChange={(e) => { setDisplayName(e.target.value) }}
                                // error = { usernameError }
                                // helperText = { usernameError ? loginStatus : ""}
                                required

                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={(e) => { setPassword(e.target.value) }}
                                // error={ passwordError }
                                // helperText = {passwordError? loginStatus : ''}
                                required
                                error = {passwordError}

                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                                // error={ passwordError }
                                // helperText = {passwordError? loginStatus : ''}
                                error = { confirmPasswordError }
                                helperText = { status }
                                required
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="location"
                                label="Location"
                                // type="password"
                                id="location"
                                onChange={(e) => { setLocation(e.target.value) }}
                            // error={ passwordError }
                            // helperText = {passwordError? loginStatus : ''}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="imageURL"
                                label="Profile Image URL"
                                id="imageURL"
                                onChange={(e) => { setImageURL(e.target.value) }}
                            // error={ passwordError }
                            // helperText = {passwordError? loginStatus : ''}
                            />
                            <TextField
                                // onChange={(e) => { setDetails(e.target.value) }}
                                label='About me'
                                placeholder='Tell us about yourselves !'
                                name="aboutMe"
                                id="aboutMe"
                                margin="normal"
                                fullWidth
                                multiline
                                rows={4}
                                onChange={(e) => { setAboutMe(e.target.value) }}
                            ></TextField>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to="/login" >
                                        {"Already have an account? Log in"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>


         






    );



}






// <body>
// <div className='SU'>
//     <div className=' wrapper'>


//         <div className='form-wrapper'>
//             <div className='main1'>

//                 <h2 className=' tc'>CREATE  ACCOUNT</h2>

//                 <form onSubmit={handleSubmit} noValidate>

//                     <div className='fullName'>

//                         <label htmlFor="display_name" className='signlabel'>DISPLAY NAME</label>

//                         <input type='text' name='displayName' placeholder="Display Name" required="" className='signinput' noValidate />

//                     </div>


//                     <div className='password'>

//                         <label htmlFor=" password" className='signlabel'>Password</label>

//                         <input type='password' name='password' placeholder="Password" required="" className='signinput' noValidate />

//                     </div>

//                     <div className='Location'>

//                         <label htmlFor="location" className='signlabel'>Location</label>

//                         <input type='location' name='location' placeholder="location" required="" className='signinput' noValidate />

//                     </div>


//                     <>
//                         <label htmlFor="url">Profile img url:</label>
//                         <input type="url" id="url" name="imageURL" className='signinput' required="" />

//                     </>
//                     <>
//                         <label htmlFor="message" className='signinput'>About Me </label>
//                         <br></br>
//                         <textarea name="aboutMe" rows="10" cols="30" >
//                             Tell us about yourself!
//                         </textarea>

//                     </>

//                     <div className='submit flex-grow-0'>

//                         <button> SUBMIT</button>

//                     </div>


//                 </form>

//             </div>
//         </div>

//     </div>
// </div>
// </body>

