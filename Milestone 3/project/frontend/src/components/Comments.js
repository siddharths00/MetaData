import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddAnswer from './AddAnswer';
import Comment from './Comment';
import AddComment from './AddComment';
const Comments = (props) => {

    const q_id = props.id;
    const isAuth = props.isAuth;
    const userid = props.userid;
    const [ loading, setLoading ] = useState(true);
    const [ answers, setAnswers ] = useState([]);
    // const [ posted, setPosted ] = useState(false);
    const [ reload, setReload ] = useState(false);



    // Like component did mount
    // Why is it running 4 times everywhere
    useEffect( () => {

        setLoading(true);

        axios.get('http://localhost:3001', {

            params: {

                which: "comments",
                str: q_id
            }
        })
        .then( function(response) {

            //handle success
            setAnswers(response.data);
            console.log(response.data,"From the get request\n");
            // const temp = answers;
            // setAnswers(temp.sort(function(a, b){return b.score - a.score}))
            // sort by score

            // setAnswers(temp);
        })
        .catch(function (error) {

            //handle error
            console.log(error);
        })
        .finally(function () {
            
            setLoading(false);
        });
        
    }, [ ]);

    // useEffect ( () => {


    //     setLoading(true);
    //     setAnswers(answers);
    //     setLoading(false);

    // }, [ reload ]);
    

    // console.log(answers);


    return ( 

        <div>
            {
                loading? "Loading ... ": (

                    <ul className='list-group' style={{ paddingLeft: 100, marginLeft:"0" }}>
                        {
                            answers.map( (ans) => (

                                <Comment ans={ans} userid={userid} isAuth={isAuth}/>
                                // null
                      )
                            )
                        }

                        <AddComment q_id={q_id} setReload = { setReload } reload = { reload } answers = {answers} setAnswers = {setAnswers} userid={userid} isAuth={isAuth}/>
                        
                    </ul>
                )
            }

        </div>


     );
}
 
export default Comments;