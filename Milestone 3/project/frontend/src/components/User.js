import { Card, CardHeader, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Moment from 'react-moment';
import Avatar from '@mui/material/Avatar'

// Assuming every user exists whose posts exists CHECK DELETE USER


const User = (props) => {


    const creation_date = props.creation_date;

    // Loading
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([{

        display_name: "Anonymous",
        profile_image_url: 'https://graph.facebook.com/694282006/picture?type=large',
        id: null

    }]);



    useEffect(() => {

        const id = props.id;


        if (id !== null) {


            axios.get('http://localhost:3001/user', {
                params: {
                    id: id
                }
            })
                .then(function (response) {

                    console.log(response.data);
                    setUser(response.data);

                })
                .catch(function (error) {

                    console.log(error);
                })
                .finally(function () {
                    setLoading(false);
                });

        }
        else {
            setLoading(false);
        }


    }, []);


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
        <div>
            {
                loading ? "Loading ... " : (

                    <Card sx={{ maxWidth: 225, padding: 0.5, margin: 1 }}>
                        <CardHeader
                            avatar={
                                <Avatar src={user[0].profile_image_url} />
                            }
                            title={<Typography fontWeight={700}>{user[0].display_name}</Typography>}
                            subheader = {format(new Date(creation_date))}
                        ></CardHeader>
                    </Card>



                )
            }
        </div>
    )
}

{/* <div className="card border-0 rounded-1 my-2 " style={{ width: "20%" }}>
    <div className="card-body p-1">
        <div className="d-flex justify-content-between">
            {user[0].profile_image_url ? <img alt="profile" src={user[0].profile_image_url} className='w-25 m-1' /> : <img alt="profile" className='w-25 m-1' src='https://graph.facebook.com/694282006/picture?type=large' />}
            <div className="fs-5 fw-bold border-0 p-1" style={{ width: "70%" }}> {user[0].display_name} </div>
        </div>
        <div className='m-0 p-0 d-flex align-items-end'>
            <p className="text-muted fw-light my-0"> {format(new Date(creation_date))} </p>
            <p className='my-0 text-muted fw-light' style={{ marginLeft: "auto" }}>id:{user[0].id}</p>
        </div>
    </div>
</div> */}

export default User