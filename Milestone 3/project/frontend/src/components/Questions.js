import { List, ListItemText, ListItem, Divider, Grid, IconButton, Typography, TextField, Avatar, ListItemAvatar, ListItemButton, Button } from '@mui/material';
import axios from 'axios';
import Moment from 'react-moment';

import React, { useState, useEffect } from 'react';
import { Container, FormControl, FormLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import ListItemContent from '@mui/joy/ListItemContent';
import parse from 'html-react-parser';

import RadioGroup from '@mui/material/RadioGroup';
import { padding } from '@mui/system';

const Questions = () => {

    const [valueEntered, setValueEntered] = useState("");
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [filterForm, setFilterForm] = useState(false);

    const [searchCategory, setSearchCategory] = useState('Title');
    const [sortCategory, setSortCategory] = useState('newest');

    //Loading
    const [loading, setLoading] = useState(false);


    //Each Time you click the views need to increment

    const LIMIT = 10;

    const nextPage = () => {

        if (posts.length !== 0)
            setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {

        if (currentPage !== 0)
            setCurrentPage(currentPage - 1);
    };

    const handleChange = (e) => {

        const v = e.target.value;

        setValueEntered(v);
    };

    const getPosts = (str) => {

        const offset = currentPage * LIMIT; //numbering starts from 0
        console.log(str);

        axios.get(`http://localhost:3001/posts`, {

            params: {

                str: valueEntered,
                offset: offset,
                limit: LIMIT,
                sort: sortCategory,
                option: str
            }
        })
            .then(function (response) {

                //handle success
                setPosts(response.data);
            })
            .catch(function (error) {

                //handle error
                console.log(error);
            })
            .finally(function () {

                setLoading(false);
            });
    };


    useEffect(() => {

        setLoading(true);
        getPosts('title');

    }, [currentPage]);

    const handleSubmit = (e) => {

        e.preventDefault();
        setLoading(true);
        setCurrentPage(0);

        switch (searchCategory) {

            case 'Title':
                getPosts('title');
                break;

            case 'User ID':
                getPosts('userpost');
                break;

            case 'Tags':
                getPosts('tags');
                break;

            default:
                console.log('ERROR: Should not print this')
                break;
        }

    };

    const navigate = useNavigate();

    const parseTags = (str) => {

        str = str.replace(/<|>/g, ' ');
        str = str.trim();
        const arr = str.split(/\s+/);


        return <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}> {arr.map((tag) => (<button className='btn btn-primary border-0 p-1.3 mb-3 rounded-5' disabled={true}> {tag} </button>))}</div>;

    };


    const format = (date) => {

        let month = date.toLocaleString('default', { month: 'short' });
        let dd = date.getDate();
        let yyyy = date.getFullYear();
        let hh = date.getHours();
        let mm = date.getMinutes();
        console.log(date.toString());


        return (month + ' ' + dd + ', ' + yyyy + ' at ' + hh + ':' + mm);
    }

    return (

        <div className='m-4 p-4' style={{ width: "100%" }}>
            <div style={{ width: "30%", float:"left" }}>
            <Typography
                variant='h3'
                fontWeight={400}
                marginBottom={5}
            >
                Questions
            </Typography>

            <form onSubmit={handleSubmit} noValidate autoComplete='off'>
                <TextField
                    onChange={(e) => { setValueEntered(e.target.value) }}
                    variant='outlined'
                    // sx={{ width: '75%' }}
                    label={searchCategory}
                    placeholder={searchCategory === 'Tags' ? '<react><node>' : `Enter ${searchCategory}`}
                    sx={{ marginBottom: 3, width: '80%'  }}
                ></TextField>

                < Button
                    type='submit'
                    color='primary'
                    variant='contained'
                > Search </Button>

                < Button
                    variant='outline'

                    sx={{ marginLeft: 2 }}
                    onClick={() => { setFilterForm(!filterForm) }}
                >



                    < FilterListOutlinedIcon color='primary' />
                </Button>

                {filterForm

                    ?
                    < Container sx={{ paddingTop: 5, paddingLeft: 0 }}>

                        < Grid container spacing={1} >
                            <Grid item xs={12} md={3} >
                                < FormControl>
                                    < FormLabel> Search By </FormLabel>
                                    < RadioGroup value={searchCategory} onChange={(e) => { setSearchCategory(e.target.value) }}>
                                        < FormControlLabel control={< Radio />} label='Title' value='Title' />
                                        < FormControlLabel control={< Radio />} label='User ID' value='User ID' />
                                        < FormControlLabel control={< Radio />} label='Tags' value='Tags' />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>

                                < FormControl>
                                    < FormLabel> Sort By </FormLabel>
                                    < RadioGroup value={sortCategory} onChange={(e) => { setSortCategory(e.target.value) }}>
                                        < FormControlLabel control={< Radio />} label='Highest Upvotes' value='upvotes' />
                                        < FormControlLabel control={< Radio />} label='Newest' value='newest' />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>

                        < Button
                            sx={{ marginTop: 2 }}
                            variant='contained'
                            onClick={handleSubmit}
                            color='primary'
                        > Apply </Button>

                    </Container>

                    : null}

            </form>

            <Container >
                < Grid container spacing={2}>

                    <Grid item xs={12} md={6}>



                    </Grid>
                    <Grid item xs={12} md={6}>



                    </Grid>
                    < Grid item>


                    </Grid>

                </Grid>
            </Container>
            </div>
            <div style={{ width: "70%", float:"left" }}>
            <div className='container m p-0'> {

                loading ? "Loading" : (posts.length !== 0 ? <List sx={{ bgcolor: 'background.paper' }}>
                    {posts.map((post) => (
                        <>
                            <ListItemButton alignItems="flex-start" href={`/search/questions/${post.id}`}>
                                <ListItemAvatar>

                                    <div>{post.score}</div>

                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Typography fontWeight={500} fontSize={25}> {post.title}</Typography>}
                                    sx={{ display: 'block' }}
                                />

                            </ListItemButton>
                            {  post.tags.length>0?
                            <>
                            <div className='d-flex justyfy-content-between' >
                                <div className='d-flex'> {parseTags(post.tags)} </div>
                                <div style={{ marginLeft: 'auto' }} className='text-secondary mt-3'>{format(new Date(post.creation_date))}</div>
                            </div>
                                <Divider variant='li' component="li" />
                                </>
                                :
                                <div className='d-flex justyfy-content-between' >
                                <div style={{ marginLeft: 'auto' }} className='text-secondary mt-3'>{format(new Date(post.creation_date))}</div>
                            </div>
                            }
                        </>

                    ))}  </List> : "No Posts")

            }

            </div>

                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" onClick={prevPage} href="#">Previous</a></li>
                        <li className="page-item"><a className="page-link" onClick={nextPage} href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        </div>


    );

};

/*


<a key={post.id} href={`/search/questions/${post.id}`} style={{ color: "black", textDecoration: "none" }}>

                        <div key={post.id} className='card border-1 border-dark-subtle shadow-sm my-3 rounded-0'>

                            <div className="card-body pt-3 pb-0">

                                <div className='display-6'> {post.title} </div>

                                <div className='m-0 p-0 d-flex align-items-end'>
                                    <p className='my-0 text-muted fw-light' style={{ marginLeft: "auto" }}>id:{post.id}</p>
                                </div>

                            </div>

                        </div> 
                        
                    </a>)


 <List>

                <ListItem>

                    <ListItemText primary="hello" secondary="looooo" />
                </ListItem>
                <Divider color='primary' />
                <ListItem>
                    <ListItemText primary="hello" secondary="looooo" />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="hello" secondary="looooo" />
                </ListItem>
            </List>


            <div className='m-4 p-4' style={{ width: "100%" }}>

                <h1 className='h2 mb-4'> Questions </h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Search by title' className='p-2 mb-3 fs-5 form-control w-25' value={valueEntered} onChange={handleChange} />
                    <input type="submit" className='btn btn-primary border-0'></input>
                </form>

                <div className='container m-0 p-0'> {

                    loading ? "Loading" : (posts.length !== 0 ? posts.map((post) => (<a key={post.id} href={`/search/questions/${post.id}`} style={{ color: "black", textDecoration: "none" }}><div key={post.id} className='card border-1 border-dark-subtle shadow-sm my-3 rounded-0'>

                        <div className="card-body pt-3 pb-0">

                            <div className='display-6'> {post.title} </div>

                            <div className='m-0 p-0 d-flex align-items-end'>
                                <p className='my-0 text-muted fw-light' style={{ marginLeft: "auto" }}>id:{post.id}</p>
                            </div>

                        </div>

                    </div> </a>)) : "No Posts")

                }

                </div>

                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" onClick={prevPage} href="#">Previous</a></li>
                        <li className="page-item"><a className="page-link" onClick={nextPage} href="#">Next</a></li>
                    </ul>
                </nav>
            </div>*/

export default Questions;