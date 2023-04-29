import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

const UpVote = ({ postid, userid, setScore, score, upvoteDisabled, setUpvoteDisabled, setDownvoteDisabled, downvoteDisabled }) => {

    //     2 = UpMod (AKA upvote)


    useEffect(() => {

        disableUpvote()


    }, [])

    const disableUpvote = () => {

        console.log(postid);

        axios.post('http://localhost:3001/upvote', {

            postid: postid,
            userid: userid
        })
            .then(function (response) {
                const count = +response.data[0].count;

                console.log(count);

                if (count > 0)
                    setUpvoteDisabled(true);

            })
            .catch(function (error) {
                console.log(error);
            });

    }


    const upScore = (e) => {


        setScore(score + 1);


        if (!downvoteDisabled) {

            setUpvoteDisabled(true);

            axios.post('http://localhost:3001/updateScore', {
                id: postid,
                update: "+"
            })
                .then(function (response) {
                    console.log(response);

                })
                .catch(function (error) {
                    console.log(error);
                });

            axios.post('http://localhost:3001/addVote', {
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
        else {

            setDownvoteDisabled(false);

            axios.post('http://localhost:3001/updateScore', {
                id: postid,
                update: "+"
            })
                .then(function (response) {
                    console.log(response);

                })
                .catch(function (error) {
                    console.log(error);
                });

            axios.post('http://localhost:3001/removeVote', {
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


    }




    //Update in database



    return (<Button disabled={upvoteDisabled} onClick={upScore} data-id={postid}><KeyboardArrowUpOutlinedIcon /></Button>);
}

export default UpVote;

{/* <button className='btn btn-info' disabled={upvoteDisabled} onClick={upScore} data-id={postid}>Upvote</button> */ }