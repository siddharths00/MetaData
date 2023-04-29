import React from "react";
import UpVote from "./UpVote";
import DownVote from "./DownVote";
import { Button, ButtonGroup } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const Vote = ({postid, userid,setScore,score,upvoteDisabled , setUpvoteDisabled , setDownvoteDisabled,downvoteDisabled }) => {
    return (
        

            <ButtonGroup size="small" aria-label="small button group" sx={{ margin: 0 }}>
                <UpVote postid={postid} userid={userid} setScore={setScore} score={score} upvoteDisabled = {upvoteDisabled} setUpvoteDisabled = {setUpvoteDisabled} setDownvoteDisabled={setDownvoteDisabled} downvoteDisabled = {downvoteDisabled}/>
                <Button>{score}</Button>
                < DownVote postid={postid} userid={userid} setScore={setScore} score={score} setUpvoteDisabled = {setUpvoteDisabled} setDownvoteDisabled={setDownvoteDisabled} downvoteDisabled = {downvoteDisabled} upvoteDisabled = {upvoteDisabled}/>
            </ButtonGroup>
            

        

    );
}

export default Vote;