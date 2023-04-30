import React, { useState, useEffect } from 'react';
import Textarea from '@mui/joy/Textarea';
import ReactMarkdown from 'react-markdown'
import Pagedown from 'pagedown';
import parse from 'html-react-parser';
import MarkdownIt from 'markdown-it';
import axios from 'axios';
import { Button, Card, CardHeader, CardContent, Typography } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';



// Same user can Have multiple Answers
// How to scroll to the place the user posted after reloading postes

const AddComment = (props) => {

  const q_id = props.q_id;
  const isAuth = props.isAuth;
  const md = new MarkdownIt();
  const reload = props.reload;
  const setReload = props.setReload;
  const answers = props.answers;
  const setAnswers = props.setAnswers;


  const [userid, setUserid] = useState(null);
  const [displayName, setDisplayName] = useState(null);

  const [valueEntered, setValueEntered] = useState("");



  useEffect(() => {

    if (isAuth) {

      axios.get('http://localhost:3001/loggeduser')
        .then(function (response) {

          // handle success
          console.log(response.data);
          // setUser(response.data);
          setDisplayName(response.data[0].display_name);
          setUserid(response.data[0].id);

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }

  }, [isAuth])



  // const parent_id = q_id;
  const content_license = 'randomstring'; //cannot be null


  const handleClick = (e) => {

    const body = md.render(valueEntered);


    let ans = {
      owner_user_id: userid,
      q_id: q_id,
      owner_display_name: displayName,
      content_license: content_license,
      body: body,
      creation_date: new Date(),
      score: 0
    };


    axios.post('http://localhost:3001/addComment', {
      owner: userid,
      q_id: q_id,
      owner_display_name: displayName,
      content_license: content_license,
      body: body
    })
      .then(function (response) {
        ans.id = response.data.id;
        console.log('newid', ans.id);
        setAnswers(answers.concat(ans));
        console.log("ADDED COMMENT")
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(
        () => {
          setValueEntered('');
        }
      );


  };

  // https://commonmark.org/help/ 
  // Markdown cheat sheet link
  // Doesn't allow html, safety check **

  return (
    <div> {isAuth ?
      <>
      <Card elevation={1} sx={{ marginBottom: 5 }}  >
        <CardHeader
          title={'Add a Comment?'}
        >
        </CardHeader>
        <CardContent>
          {/* <TextField
                fullWidth
                multiline
                rows={10}
                onChange={(e) => setQuestion(e.target.value)}
              ></TextField> */}
          <MDEditor
            value={valueEntered}
            onChange={setValueEntered}
          />
          {/* <MDEditor.Markdown source={question} style={{ whiteSpace: 'pre-wrap' }} /> */}
        </CardContent>
      </Card>
      <Button variant='contained' color='primary' onClick={handleClick}> Comment </Button>
      </>:
        <Link to='/login' ><Typography padding={2} fontSize={20}>to comment Login </Typography></Link>
      }
    </div>
  );
}

export default AddComment;