import React, { useEffect, useState } from "react";
import axios from "axios";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Button } from "@mui/material";


const DownVote = ({ postid, userid, setScore, score, downvoteDisabled, setDownvoteDisabled, setUpvoteDisabled , upvoteDisabled}) => {

    //     3 = DownMod (AKA upvote)


    useEffect(() => {

        disableDownvote()


    }, [])

    const disableDownvote = () => {

        axios.post('http://localhost:3001/downvote', {

            postid: postid,
            userid: userid
        })
            .then(function (response) {
                const count = +response.data[0].count;


                if (count > 0)
                    setDownvoteDisabled(true);

            })
            .catch(function (error) {
                console.log(error);

            });

    }


    const downScore = (e) => {


        setScore(score - 1);


        if (!upvoteDisabled) {

            setDownvoteDisabled(true);

            axios.post('http://localhost:3001/updateScore', {
                id: postid,
                update: "-"
            })
                .then(function (response) {
                    console.log(response);

                })
                .catch(function (error) {
                    console.log(error);
                });

            axios.post('http://localhost:3001/addVote', {
                postid: postid,
                update: "-",
                userid: userid
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
        else {

            setUpvoteDisabled(false);

            axios.post('http://localhost:3001/updateScore', {
                id: postid,
                update: "-"
            })
                .then(function (response) {
                    console.log(response);

                })
                .catch(function (error) {
                    console.log(error);
                });

            axios.post('http://localhost:3001/removeVote', {
                postid: postid,
                update: "+",
                userid: userid
            })
            .then(function (response) {
                    console.log(response);
                    
             })
            .catch(function (error) {
                    console.log(error);
            });

        }
    };


    return ( <Button onClick={downScore} disabled={downvoteDisabled} data-id={postid}><KeyboardArrowDownOutlinedIcon /></Button>);
}

export default DownVote;

{/* <button className='btn btn-info' onClick={downScore} disabled={downvoteDisabled} data-id={postid}>Downvote</button> */}