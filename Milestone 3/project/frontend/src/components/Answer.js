import React, { useState } from "react";
import parse from 'html-react-parser';
import User from './User';
import axios from "axios";
import { Grid } from "@mui/material";
import Vote from "./Vote";
import Comments from './Comments';

const Answer = ({ ans, userid, isAuth }) => {



  const [score, setScore] = useState(ans.score);

  const [upvoteDisabled, setUpvoteDisabled] = useState(false);
  const [downvoteDisabled, setDownvoteDisabled] = useState(false);


  return (
    <li key={ans.id} className='list-group-item'>
      <div>{parse(ans.body)}</div>
      < Grid container spacing={2}>

        <Grid item xs={12} md={9} sx={{ alignSelf: 'end', marginBottom: 1 }}>
          {isAuth ? < Vote postid={ans.id} userid={userid} setScore={setScore} score={score} upvoteDisabled={upvoteDisabled} setUpvoteDisabled={setUpvoteDisabled} setDownvoteDisabled={setDownvoteDisabled} downvoteDisabled={downvoteDisabled} /> : null}
        </Grid>
        
        <Grid item xs={12} md={3}>
        {ans.post_type_id==1?null:<div className="d-flex justify-content-between text-muted">{`Comment Count ${ans.comment_count} `}</div>}
          < User id={ans.owner_user_id} creation_date={ans.creation_date} />
        </Grid>
        <div style={{width: "85%"}}>
          <Comments id={ans.id} userid={userid} isAuth={isAuth}/>
        </div>
        
      </Grid>
    </li>);
}

export default Answer;