import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import parse from 'html-react-parser';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Card from '@mui/material/Card'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// import './user.css';
// import ProfilePic from './download.jpeg';

// import 'bootstrap/dist/css/bootstrap.min.css';
import CakeIcon from '@mui/icons-material/Cake';
import { ListGroup } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import Container from '@mui/material/Container';
import { Box, Grid, Typography } from '@mui/material';
import Moment from 'react-moment';

export default function Profile() {

    const navigate = useNavigate();


    const format = (date) => {

        let month = date.toLocaleString('default', { month: 'short' });
        let dd = date.getDate();
        let yyyy = date.getFullYear();
        let hh = date.getHours();
        let mm = date.getMinutes();
        console.log(date.toString());


        return (month + ' ' + dd + ', ' + yyyy + ' at ' + hh + ':' + mm);
    }


    function loopPosts(posts) {
        var myArray = [];
        for (var i = 0; i < posts.length; i++) {

                // console.log(posts[i].id)
                if((posts[i].title)){
                myArray[i] = <Link to={`/profile/questions`} > <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    action
                // onClick={ () => { navigate(`../questions/${posts[i].id}`, { replace: true })}}
                >
                    <div className="ms-2 me-auto" style={{}}>
                        <div className="fw-bold">{posts[i].title}</div>
                        {format(new Date(posts[i].creation_date))}
                    </div>
                    <Badge bg="primary" pill>
                        {posts[i].score}
                    </Badge>
                </ListGroup.Item>
            </Link>
        }
    }
        return myArray;
    }

    function loopAnswers(posts) {
        var myArray = [];
        for (var i = 0; i < posts.length; i++) {
                if(!(posts[i].title)){
                // console.log(posts[i].id)
                myArray[i] = <Link to={`/profile/questions`} > <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    action
                // onClick={ () => { navigate(`../questions/${posts[i].id}`, { replace: true })}}
                >
                    <div className="ms-2 me-auto" style={{}}>
                        <div className="fw-bold">{posts[i].body}</div>
                        {format(new Date(posts[i].creation_date))}
                    </div>
                    <Badge bg="primary" pill>
                        {posts[i].score}
                    </Badge>
                </ListGroup.Item>
            </Link>
        }
    }
        return myArray;
    }

    function loopComments(posts) {
        var myArray = [];
        for (var i = 0; i < posts.length; i++) {

                // console.log(posts[i].id)
                myArray[i] = <Link to={`/profile/comments`} > <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    action
                // onClick={ () => { navigate(`../questions/${posts[i].id}`, { replace: true })}}
                >
                    <div className="ms-2 me-auto" style={{}}>
                        <div className="fw-bold">{parse(posts[i].text)}</div>
                        {format(new Date(posts[i].creation_date))}
                    </div>
                    <Badge bg="primary" pill>
                        {posts[i].score}
                    </Badge>
                </ListGroup.Item>
            </Link>
        }
        return myArray;
    }


    const [details, setDetails] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayName, setDisplayName] = useState('');
    const [id, setId] = useState('');
    let profile = 'https://graph.facebook.com/694282006/picture?type=large'; // default 
    //const display_name = "Thomas Owens";

    const getDetails = () => {
        axios.post("http://localhost:3001/own_profile", {
            withCredentials: true,
        })
            .then(
                (res) => {
                    const detailsRequest = res.data.data;
                    console.log(detailsRequest);
                    setDetails(detailsRequest)
                }
            )
            .then(
                () => {
                    getPosts();
                    getComments();
                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    const getPosts = () => {

        axios.post("http://localhost:3001/own_profile_posts", {
            withCredentials: true,
        })
            .then(
                (res) => {
                    // console.log(res)

                    const postRequest = res.data.data;
                    console.log(res.data,"9999999999999999999999999");
                    console.log(postRequest);
                    setPosts(postRequest);
                    setLoading(false)

                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )

    }

    const getComments = () => {

        axios.post("http://localhost:3001/own_profile_comments", {
            withCredentials: true,
        })
            .then(
                (res) => {
                    // console.log(res)

                    const postRequest = res.data.data;

                    console.log(postRequest);
                    setComments(postRequest);
                    setLoading(false)

                }
            )
            .catch(
                (err) => {
                    console.log(err)
                }
            )

    }


    useEffect(() => {

        getDetails()






        // setLoading(false);

        //return;


        // }

        // fetchData();





    }, []);




    return (

        <div>{
            loading ? "Loading" :

                < Container >

                    < Grid container spacing={1}>

                        < Grid
                            item
                            xs={12}
                            md={2}
                        >
                            <img src={details[0].profile_image_url ? details[0].profile_image_url : profile} alt='profile pic' width="150px" height="150px" />

                        </Grid>
                        < Grid
                            item
                            xs={12}
                            md={4}
                        >
                            <Typography
                                variant='h3'
                                marginTop={4}
                            > {details[0].display_name}</Typography>

                            <Typography
                                color='textSecondary'
                            >
                                <Grid container direction="row" alignItems="center">
                                    <Grid item>
                                        <CakeIcon />
                                    </Grid>
                                    <Grid item marginTop={1} marginLeft={1}>
                                        {'Account created '}
                                        <Moment fromNow>{details[0].creation_date}</Moment>
                                    </Grid>
                                </Grid>


                            </Typography>
                            <Typography
                                color='textSecondary'
                            >
                                {/* <Grid container direction="row" alignItems="center">
                                    <Grid item>
                                        <LocationOnOutlinedIcon />
                                    </Grid>
                                    <Grid item marginTop={1} marginLeft={1}>
                                        {details[0].location}
                                    </Grid>
                                </Grid> */}


                            </Typography>



                        </Grid>

                    </Grid>
                    {/* < Grid container spacing={1} marginTop={10}> */}
                    <div style={{ width: "100%" }}>
                        <div style={{ width: "40%", float:"left" }}>
                        <h1 className='h2 mb-4 pt-4'>Stats</h1>


                                    <Typography variant='secondary' color='textSecondary'> {details[0].up_votes + ' Upvotes'}</Typography>
                                    {/* <br /> */}
                                    {/* <Typography variant='secondary' color='textSecondary' margin={1}> {details[0].views + ' Views'}</Typography> */}
                            </div>
                            {/* <Grid item xs={12}
                                md={6}>
                                <Typography
                                    variant='h6'
                                > About </Typography>
                                < Box sx={{ border: '1px solid lightgrey' }} padding={4}>

                                    <div>
                                        {details[0].about_me ? parse(details[0].about_me) : ''}
                                    </div>
                                </Box>
                            </Grid> */}
                        {/* </Grid> */}
                        <div style={{ width: "60%", float:"left"  }}>

                            <Typography
                                variant='h5'
                                marginBottom={3}
                            >Top Posts</Typography>
                            <Card className='posts'marginBottom={3}>
                                <ListGroup as="ol" numbered>
                                    {loopPosts(posts)}
                                </ListGroup>
                            </Card>

                            {/* <Typography
                                variant='h5'
                                marginBottom={3}
                            >Top Answers</Typography>
                            <Card className='posts'marginBottom={3}>
                                <ListGroup as="ol" numbered>
                                    {loopAnswers(posts)}
                                </ListGroup>
                            </Card> */}

                            <Typography
                                variant='h5'
                                marginBottom={3}
                            >Top Comments</Typography>
                            <Card className='posts'>
                                <ListGroup as="ol" numbered>
                                    {loopComments(comments)}
                                </ListGroup>
                            </Card>
                        </div>
                    </div>

                </Container>




        }</div >)

}

/*  

<Container className='page' >  
            <Container className='profile-stat'>
            <Container className='profile'>
                <Col className='image'>
                    <img src={details[0].profile_image_url? details[0].profile_image_url: profile} alt='profile pic' width="150px" height="150px"></img>
                </Col>
               
                <Col className='name'>
                    <Row>
                         <h2 className='display-name'>{details[0].display_name}</h2>
                    </Row>
                    <Row>
                        <div className='active-time'>10 days</div>
                    </Row>
                </Col>
            </Container>
            <div className='stat-box'>
            <div className='stats-label'>Stats</div>
            <Container className='stat-info'>
                <Row>
                    <Col className='text'>
                        <Row>{details[0].reputation}</Row>
                        <Row>reputation</Row>
                    </Col>
                    <Col className='text'>
                        <Row>111</Row>
                        <Row>answers</Row>
                    </Col>
                </Row>
                <Row>
                    <Col className='text'>
                        <Row>{details[0].views}</Row>
                        <Row>reached</Row>
                    </Col>
                    <Col className='text'>
                        <Row>1111</Row>
                        <Row>questions</Row>
                    </Col>
                </Row>
            </Container>
                
            </div>
        </Container>
        <Container className='about-container'>
            <Row className='intro'>
                <Row>
                    <div className='about-label'>About me</div>
                </Row>
                <Row>
                {details[0].about_me ? parse(details[0].about_me): details[0].about_me}
                </Row>
            </Row>
        </Container>
       
        






















<ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">{posts[0].title}</div>
                                Cras justo odio
                                </div>
                                <Badge bg="primary" pill>
                                {posts[0].score}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">{posts[1].title}</div>
                                Cras justo odio
                                </div>
                                <Badge bg="primary" pill>
                                {posts[1].score}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">{posts[2].title}</div>
                                Cras justo odio
                                </div>
                                <Badge bg="primary" pill>
                                {posts[2].score}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">{posts[3].title}</div>
                                Cras justo odio
                                </div>
                                <Badge bg="primary" pill>
                                {posts[3].score}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">{posts[4].title}</div>
                                Cras justo odio
                                </div>
                                <Badge bg="primary" pill>
                                {posts[4].score}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">{posts[5].title}</div>
                                Cras justo odio
                                </div>
                                <Badge bg="primary" pill>
                                {posts[5].score}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">{posts[6].title}</div>
                                Cras justo odio
                                </div>
                                <Badge bg="primary" pill>
                                {posts[6].score}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">{posts[7].title}</div>
                                Cras justo odio
                                </div>
                                <Badge bg="primary" pill>
                                {posts[7].score}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">{posts[8].title}</div>
                                Cras justo odio
                                </div>
                                <Badge bg="primary" pill>
                                {posts[8].score}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                <div className="fw-bold">{posts[9].title}</div>
                                Cras justo odio
                                </div>
                                <Badge bg="primary" pill>
                                {posts[9].score}
                                </Badge>
                            </ListGroup.Item> 


*/