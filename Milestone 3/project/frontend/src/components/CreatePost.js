import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import MarkdownIt from 'markdown-it';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  json,
  useNavigate
} from "react-router-dom";

import axios from "axios";

// import Button from 'react-bootstrap/Button';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import './createpost.css';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MDEditor from '@uiw/react-md-editor';

// import { Badge } from 'react-bootstrap';

// import Form from 'react-bootstrap/Form';
import { Card, CardContent, CardHeader, Container, FormLabel, Button, Typography } from '@mui/material';

export default function CreatePost() {

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [tags, setTags] = useState([]);
  const [alltags, setAllTags] = useState([]);
  //const navigate = useNavigate();

  const md = new MarkdownIt();


  useEffect(() => {
    axios.get("http://localhost:3001/tags")
      .then((response) => {
        var result = JSON.stringify(response.data);
        var json = JSON.parse(result);
        console.log(json.data[0].tag_name)
        setAllTags(json.data);
      })

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log(tags);

    await axios.post('http://localhost:3001/createpost', {
      title: title,
      question: md.render(question),
      tags: tags,
    }).then((response) => {
      console.log(response);
      navigate('/search/questions')
    });

  }

  return (
    <>

      <Container sx={{ backgroundColor: '#f4f4f4', width: '100%' }}>
        <Typography
          variant='h3'
          fontSize={30}
          fontWeight={500}
          marginBottom={5}
          paddingTop={5}

        > Ask a public question </Typography>
        <form onValidate onSubmit={handleSubmit} >
          <Card elevation={1} sx={{ marginBottom: 5 }}>
            <CardHeader
              title={'Title'}
              subheader={'Be specifc and imagine you\'re asking a question to another person'}
            >
            </CardHeader>
            <CardContent>
              <TextField fullWidth placeholder='e.g.Cleaner way of dividing a list of tuples into multiple lists' onChange={(e) => { setTitle(e.target.value) }}></TextField>
            </CardContent>
          </Card>
          <Card elevation={1} sx={{ marginBottom: 5 }}  >
            <CardHeader
              title={'What are the details of your problem ?'}
              subheader={'Introduce the problem and expand on what you put in the title. Minimum 20 characters.'}
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
                  value={question}
                  onChange={setQuestion}
                />
                {/* <MDEditor.Markdown source={question} style={{ whiteSpace: 'pre-wrap' }} /> */}
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
          > Post question</Button>

        </form>
      </Container>
    </>


  );
}

/*
<Form className='ask-form p-5' style={{ width: "85%" }}>

<div className='heading'>
  <h2>Ask a public question</h2>
</div>

<Form.Group className="mb-3" id='title' controlId="exampleForm.ControlInput1">
  <Form.Label className='label'>Title</Form.Label>
  <div className='instruction'>Be specific and imagine you are asking a question to another person.</div>
  <Form.Control type="text"  placeholder="e.g.Cleaner way of dividing a list of tuples into multiple lists" onChange={(e) => setTitle(e.target.value)} />
</Form.Group>

<Form.Group className="mb-3" id='question' controlId="exampleForm.ControlTextarea1">

  <Form.Label className='label'>What are the details of your problem?</Form.Label>

  <div className='instruction'>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</div>
  <div className="form-floating m-3 d-flex">

  <textarea className="form-control w-50" placeholder="" id="floatingTextarea2" style={{height: "400px"}} onChange={ (e) => setQuestion(e.target.value) } value={question}></textarea>
  <div className='ms-2 w-50 p-3' style={{ border: "1px solid black", height: "400px", overflowY: "auto" }}>
  {parse(md.render(question))}
  </div>
  </div>
  </Form.Group>

<Form.Group className="mb-3" id='tags' controlId="exampleForm.ControlInput1">
  <Form.Label className='label'>Tags</Form.Label>
  <div className='instruction'>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</div>
  
  
</Form.Group>
<Button variant="primary" type="submit" className='form-button border-0' onClick={handleSubmit} >
  Submit
  </Button>
  </Form>
  
  
  {/* <Form.Control as="textarea" rows={20} onChange={(e) => setQuestion(e.target.value)} className='w-50'/> */