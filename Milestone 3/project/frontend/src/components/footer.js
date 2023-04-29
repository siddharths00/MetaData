import React from 'react';
// import {Link} from "react-router-dom";
import "./footer.css"



function Footer() {

    return (

            <div className="footer">

                <div className="contain">

                    <div className="col">
                        <h2>Team</h2>
                        <ul>
                            <li>Nitya </li>

                            <li>Tejal Kulkarni</li>

                            <li>Deepshikha</li>
                            <li>Muskan Jaiswal</li>
                        </ul>
                    </div>

                    < div className="col">
                        <h2>Contact Us</h2>
                        <ul>
                            <li>+91 9051 XXXXXX</li>

                            <li>033 2464 XXXX</li>

                            <li>abc@gmail.com</li>
                        </ul>
                    </div>

                    <div className="col address">
                        <h2>Address </h2>
                        <ul>
                            <li>IIT Hyderabad, Kandi</li>
                        </ul>
                    </div>

                </div>

            </div>
                )

}

                export default Footer;