import React, { useEffect, useState } from "react";
import axios from 'axios';
import parse from 'html-react-parser';
import Moment from 'react-moment';
import User from './User';
import Vote from "./Vote";
import { Grid, Container } from "@mui/material";
import Comments from './Comments'

const Question = (props) => {

  const postid = props.id;
  const isAuth = props.isAuth;
  const userid = props.userid;

  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [score, setScore] = useState(0);

  const [upvoteDisabled, setUpvoteDisabled] = useState(false);
  const [downvoteDisabled, setDownvoteDisabled] = useState(false);


  useEffect(() => {

    setLoading(true);
    
    axios.get('http://localhost:3001', {

      params: {

        which: "specific-post",
        str: postid
      }
    })
      .then(function (response) {

        //handle success
        setQuestion(response.data);
        setScore(response.data[0].score)
      })
      .catch(function (error) {

        //handle error
        console.log(error);
      })
      .finally(function () {

        setLoading(false);
        
      });

      // if(loading==false) {
        
      // }

  }, [postid]);

  useEffect(()=>{
    if(loading==false) {
    axios.post('http://localhost:3001/updateView', {
                id: question[0].id,
                update: "-"
            })
                .then(function (response) {
                    console.log(response);

                })
                .catch(function (error) {
                    console.log(error);
                });
              }
  },[loading])


  const parseTags = (str) => {

    str = str.replace(/<|>/g, ' ');
    str = str.trim();
    const arr = str.split(/\s+/);


    return <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}> {arr.map((tag) => (<button className='btn btn-primary border-0 p-1.3 mb-3 rounded-5' disabled={true}> {tag} </button>))}</div>;

  };






  return (

    <div>{loading ? "Loading.." : (question.length === 0 ? "No queston" : (
      <div>
        <div className="h3"> {question[0].title} </div>
        <div> {parseTags(question[0].tags)} </div>
        <div className="d-flex justify-content-between text-muted"><p className="text-muted">{`Viewed ${question[0].view_count+1} times`}</p> <Moment fromNow>{question[0].creation_date}</Moment></div>
        <div className="d-flex justify-content-between text-muted">{`Answer Count ${question[0].answer_count} `} - {`Comment Count ${question[0].answer_count} `}</div>
        {/* <div className="d-flex justify-content-between text-muted"></div> */}
        <hr></hr>
        <div> {parse(question[0].body)} </div>

          < Grid container spacing={2}>
            <Grid item xs={12} md={9} sx={{alignSelf: 'end', marginBottom: 1}}>
              {isAuth ? < Vote postid={postid} userid={userid} setScore={setScore} score={score} upvoteDisabled={upvoteDisabled} setUpvoteDisabled={setUpvoteDisabled} setDownvoteDisabled={setDownvoteDisabled} downvoteDisabled={downvoteDisabled} /> : null}
            </Grid>

            <Grid item xs={12} md={3}>
              < User id={question[0].owner_user_id} creation_date={question[0].creation_date} />

              </Grid>

            <div style={{width: "85%"}}>
              <Comments id={postid} userid={userid} isAuth={isAuth}/>
            </div>
          </Grid>
      </div>
    ))}
    </div>);

}

export default Question;