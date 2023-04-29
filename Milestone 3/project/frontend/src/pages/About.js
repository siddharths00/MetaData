import * as React from 'react';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
// import Footer from '../components/footer';

const About = () =>
{
     return(
        <>
        <Typography component= "div"  sx={{padding: 3}}>
       <br></br>
       <Box sx={{ textAlign:'center',fontSize:20, fontWeight: 'medium',fontStyle: 'italic',
    }}>
        PROVIDING YOU THE MOST APPROPRIATE ANSWERS
        </Box>
        <br></br>
        <Box sx={{fontWeight: 'LIGHT',fontStyle: 'italic', fontSize:18}}>
        At our website, we believe that it is efficient, convenient  and easy for our users to use. At our website , we provide them numerous facillities that help people to know the solutions
        of their questions and connect with intelligent people across the world. 
        </Box>

       
       
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          The main facillities that we provide in our website are:-
          </Typography>
       
          
        
      
        <Box sx={{fontWeight: 'LIGHT',fontSize: '24',width:550,height:350}}>

       
        1.You can create your account in our website and then, you can create posts where you  post any question or give answer to  any questions.
        <br></br><br></br>
        2. You can even edit your posts or delete your posts.
        <br>
        </br><br></br>
        3.You can also read other's solution to gain knowledge and also upvote or downvote the solutions.   
        <br></br><br></br>
        4. We also allow autocompletion search.
        <br>
        </br><br></br>
        5.We also facillitate searching of posts by user id, single tags or multiple tags.
        <br></br><br></br>
        6.There is also an option to sort your search by time or upvotes.
        
        </Box>
        <Box sx={{fontSize: '24',height:200}}>
        This is the best place to increase your potential and knowledge. So, what are you waiting for ? Create your account right now!!!!      </Box>
   
     </Typography>
     {/* < Footer /> */}
     </>
     )

}

export default About;