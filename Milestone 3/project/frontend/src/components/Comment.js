import React, { useState } from "react";
import parse from 'html-react-parser';
import User from './User';
import axios from "axios";
import { Grid } from "@mui/material";
import Vote from "./Vote";
// import Comments from './Comments';

const Comment = ({ ans, userid, isAuth }) => {



  const [score, setScore] = useState(ans.score);

  const [upvoteDisabled, setUpvoteDisabled] = useState(false);
  const [downvoteDisabled, setDownvoteDisabled] = useState(false);

  // console.log(ans, "=====Comment");
  return (
    <li key={ans.id} className='list-group-item'>
      <div>{parse(ans.text)}</div>
      {/* {console.log(ans.id, "$$$$ Inside comment")} */}
      < Grid container spacing={2} xs={12}>

        <Grid item xs={12} md={9} sx={{ alignSelf: 'end', marginBottom: 1 }}>
          {isAuth ? < Vote postid={ans.id} userid={userid} setScore={setScore} score={score} upvoteDisabled={upvoteDisabled} setUpvoteDisabled={setUpvoteDisabled} setDownvoteDisabled={setDownvoteDisabled} downvoteDisabled={downvoteDisabled} /> : null}
        </Grid>

        <Grid item xs={12} md={3}>
          < User id={ans.owner_user_id} creation_date={ans.creation_date} />
        </Grid>
      </Grid>
    </li>);
}

export default Comment;