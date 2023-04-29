import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Card, ListGroup } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from "axios";
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditPost from './EditPost';
//import './user.css';


const format = (date) => {

    let month = date.toLocaleString('default', { month: 'short' });
    let dd = date.getDate();
    let yyyy = date.getFullYear();
    let hh = date.getHours();
    let mm = date.getMinutes();
    console.log(date.toString());


    return (month + ' ' + dd + ', ' + yyyy + ' at ' + hh + ':' + mm);
}

const PQuestions = () => {


    function loopPosts(posts) {

        var myArray = [];

        for (var i = 0; i < posts.length; i++) {

            myArray[i] =
                <Link to={`/profile/questions/${posts[i].id}`} >

                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start "
                        action
                    >
                        <div className="ms-2 me-auto text-decoration-none">
                            <div className="fw-bold text-decoration-none">{posts[i].title}</div>
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

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPosts = () => {

        axios.get("http://localhost:3001/own_all_questions"
        )
            .then(
                (res) => {
                    // console.log(res)

                    const postRequest = res.data.data;

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

    useEffect(() => {

        getPosts()


    }, []);

        


    return (
        <div>
        {
        
            loading ?
                "Loading" :
                <Container className='post-container'>
                    <Card className='posts'>
                        <ListGroup as="ol" numbered>
                            {loopPosts(posts)}
                        </ListGroup>
                    </Card>
                </Container>
        
        }
        </div> 

    );
}

export default PQuestions;
