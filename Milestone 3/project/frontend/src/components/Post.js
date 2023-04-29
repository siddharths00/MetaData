import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Question from './Question';
import Answers from './Answers';
import AddAnswer from './AddAnswer';
import NotFound from './NotFound';

// For now loading the question and the answers with get request
// Change the url using router :id, nested routes, add 404 not found in router, net ninja 
// component vs element, how to do child whatever

function Post({userid, isAuth}){

    const { id } = useParams();

    // console.log(Number.isInteger(id));

    // console.log(id);

    return (

        Number.isInteger(+id)? 
        <div style={{width: "85%"}}>
            <Question id={id} isAuth={isAuth} userid={userid}/>
            <Answers id={id} userid={userid} isAuth={isAuth}/>
        </div>
        :
        < NotFound />
    );



}

export default Post;