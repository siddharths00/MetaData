import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteIcon from '@mui/icons-material/Delete';

const PAnswers = () => {

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
            myArray[i] =
            < Link to={`/profile/answers/${posts[i].id}`}>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        action
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{posts[i].title}</div>
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

        axios.get("http://localhost:3001/own_all_answers"
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


    return (<div>{

        loading ?
            "Loading" :

            <Container className='post-container'>
                <Card className='posts'>
                    <ListGroup as="ol" numbered>
                        {loopPosts(posts)}
                    </ListGroup>
                </Card>
            </Container>

    }</div>
    );
}

export default PAnswers;