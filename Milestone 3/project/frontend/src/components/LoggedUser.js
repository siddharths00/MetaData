import axios from "axios";
import { useEffect, useState } from "react";
import Moment from 'react-moment';

const User = (props) => {


    // Loading
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([{

        display_name: "Anonymous",
        profile_image_url: 'https://graph.facebook.com/694282006/picture?type=large',
        id: null

    }]);



    useEffect(() => {

            axios.get('http://localhost:3001/loggeduser')
                .then(function (response) {

                    // handle success
                    console.log(response.data);
                    setUser(response.data);

                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    setLoading(false);
                });

        



    }, []);



    // Assuming every user exits whose posts exists CHECK DELETE USER

    return (
        <div>
            {
                loading ? "Loading ... " : (

                    <div className="m-0 p-0" >
                            <div className="d-flex justify-content-between align-items-center">
                                {user[0].profile_image_url ? <img alt="profile" style={{width: "50px", height: "50px"}} src={user[0].profile_image_url} className='m-1 rounded-5' /> : <img style={{width: "50px", height: "50px"}} alt="profile" className='m-1 rounded-5' src='https://graph.facebook.com/694282006/picture?type=large' />}
                                <div className="fs-5 fw-bold border-0 p-1" style={{ width: "70%" }}> {user[0].display_name} </div>
                            </div>
                    </div>

                )
            }
        </div>
    )
}

export default User