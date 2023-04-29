import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import axios from "axios";
// import Button from 'react-bootstrap/Button';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import './createpost.css';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import { DeleteOutline } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
import { Card, CardContent, CardHeader, Container, FormLabel, Button, Typography } from '@mui/material';

import { useParams } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

import Form from 'react-bootstrap/Form';

import MarkdownIt from 'markdown-it';
import MDEditor from '@uiw/react-md-editor';
import { NodeHtmlMarkdown } from 'node-html-markdown'

function tagParser(tag_string) {
  var j = 0;
  var start = 1, end;
  var myTags = []
  for (var i = 0; i < tag_string.length; i++) {
    if (tag_string[i] == '>') {
      end = i;
      myTags[j] = tag_string.slice(start, end);
      j++;
      start = end + 2;
    }
  }
  return myTags;
}

function findTag(alltags, tags) {
  var display_tags = []
  var j = 0;
  for (var i = 0; i < tags.length; i++) {
    console.log(tags[i])
    for (var k = 0; k < alltags.length; k++) {
      if (alltags[k].tag_name == tags[i]) {
        display_tags[j] = alltags[k];
        j++;
        break;
      }
    }
  }
  return display_tags;
}

export default function EditPost() {

  const navigate = useNavigate();


  const id = useParams();
  // make not Nan crash, string

  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [tags, setTags] = useState([]);
  const [alltags, setAllTags] = useState([]);
  const [value, setValue] = useState('');

  var post_title;
  var body;
  /*let urls = [
    "http://localhost:3001/tags",
    "http://localhost:3001/own_post",
    
  ];
  //const navigate = useNavigate();
  const requests = urls.map((url) => axios.get(url));

  axios.all(requests).then((responses) => {
    responses.forEach((resp) => {
      var result = JSON.stringify(resp.data);
      var json = JSON.parse(result);
      console.log(json.data)
    });
  });*/

  useEffect(() => {
    // axios.post("http://localhost:3001/getid", {
    //   id: id,
    // })
    // .then((response) => {
    //   console.log(response);
    // })

    axios.get("http://localhost:3001/tags")
      .then((response) => {
        var result = JSON.stringify(response.data);
        var json = JSON.parse(result);

        for (var i = 0; i < json.data.length; i++) {
          alltags[i] = json.data[i];
        }

      })

    axios.post("http://localhost:3001/own_post", {
      id: id.id,
    })
      .then((response) => {

        if (response.data.length !== 0) {
          var result = JSON.stringify(response.data);
          var json = JSON.parse(result);
          setTitle(json.data[0].title);
          setValue(NodeHtmlMarkdown.translate(json.data[0].body));
          var temp = findTag(alltags, tagParser(json.data[0].tags));
          setTags(temp);
        }


      })

  }, []);

  const md = new MarkdownIt();

  const handleSubmit = async (e) => {

    e.preventDefault();
    await axios.post('http://localhost:3001/editpost', {
      title: title,
      question: md.render(value),
      tags: tags,
      id: id.id
    }).then((response) => {
      console.log("Hello World!");
      var result = JSON.stringify(response.data);
      console.log(result)
      navigate('/profile/questions')
    });

  }

  const deletePost = (e) => {

    console.log(e.target);


    axios.post('http://localhost:3001/deletepost', {
      id: id.id
    }).then((response) => {
      console.log("Post deleted");
      var result = JSON.stringify(response.data);
      console.log(result)
      navigate('/profile/questions')
    })
      .catch((err) => {

        console.log(err);
      })
      ;

  }


  return (

    <Container sx={{ backgroundColor: '#f4f4f4', width: '100%' }}>
      <Typography
        variant='h3'
        fontSize={30}
        fontWeight={500}
        marginBottom={5}
        paddingTop={5}

      > Edit Question

        <IconButton onClick={deletePost} >
          <DeleteOutline />
        </IconButton></Typography>

      <form onValidate onSubmit={handleSubmit} >
        <Card elevation={1} sx={{ marginBottom: 5 }}>
          <CardHeader
            title={'Title'}
            subheader={'Be specifc and imagine you\'re asking a question to another person'}
          >
          </CardHeader>
          <CardContent>
            <TextField fullWidth placeholder='e.g.Cleaner way of dividing a list of tuples into multiple lists' onChange={(e) => { setTitle(e.target.value) }} value={title}></TextField>
          </CardContent>
        </Card>
        <Card elevation={1} sx={{ marginBottom: 5 }}  >
          <CardHeader
            title={'What are the details of your problem ?'}
            subheader={'Introduce the problem and expand on what you put in the title. Minimum 20 characters.'}
          >
          </CardHeader>
          <CardContent>
            <MDEditor
              value={value}
              onChange={setValue}
            />
          </CardContent>
        </Card>

        <Card elevation={1}>
          <CardHeader
            title={'Tags'}
            subheader={'Add up to 5 tags to describe what you question is about. Start typing to see suggestions'}
          >
          </CardHeader>
          <CardContent>
            <Autocomplete className='tag-list'
              multiple
              sx={{ marginBottom: 2 }}
              id="tags-outlined"
              value={tags}
              onChange={(event, newValue) => {

                setTags(newValue);
              }}
              options={alltags}
              getOptionLabel={(option) => option.tag_name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tags"
                  placeholder="e.g.python"
                />
              )}
            />
          </CardContent>
        </Card>

        < Button
          type='submit'
          variant='contained'
          sx={{ margin: 5 }}
        > Edit question</Button>

      </form>
    </Container >


  );

}

{/* <Form className='ask-form' >
<div className='heading'>
  <h2>Ask a public question</h2>
 
  {/* < Button onClick={deletePost}>  Delete </Button> */}

// </div>
// <Form.Group className="mb-3" id='title' controlId="exampleForm.ControlInput1">
//   <Form.Label className='label'>Title</Form.Label>
//   <div className='instruction'>Be specific and imagine you are asking a question to another person.</div>
//   <Form.Control type="text" placeholder="e.g.Cleaner way of dividing a list of tuples into multiple lists" value={title} onChange={(e) => setTitle(e.target.value)} />
// </Form.Group>

// <Form.Group className="mb-3" id='question' controlId="exampleForm.ControlTextarea1">
//   <Form.Label className='label'>What are the details of your problem?</Form.Label>
//   <div className='instruction'>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</div>
//   <Form.Control as="textarea" rows={7} value={question} onChange={(e) => setQuestion(e.target.value)} />
// </Form.Group>

// <Form.Group className="mb-3" id='tags' controlId="exampleForm.ControlInput1">
//   <Form.Label className='label'>Tags</Form.Label>
//   <div className='instruction'>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</div>

//   <Autocomplete className='tag-list'
//     multiple
//     id="tags-outlined"
//     options={alltags}
//     getOptionLabel={(option) => option.tag_name}
//     value={tags}

//     onChange={(event, newValue) => {


//       setTags(newValue);

//     }}

//     renderInput={(params) => (
//       <TextField
//         {...params}
//         label="Tags"
//         placeholder="e.g.python"
//       />
//     )}
//   />
// </Form.Group>
// <Button variant="primary" type="submit" className='form-button' onClick={handleSubmit}>
//   Submit
// </Button>


// </Form> 

