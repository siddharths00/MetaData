import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tags() {

    const [valueEntered, setValueEntered] = useState("");
    const [tags, setTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    // Loading stuff
    const [loading, setLoading] = useState(false);

    //LIMIT PER PAGE
    const LIMIT = 10; //lesser number of tags

    // Disable the buttons
    // Lower Case => DONE 
    // Loadin UI
    // No results UI
    // Pages UI

    // Assuming Tags cannot have spaces --- like stack overflow
    // Assuming all tags have only lower case -- like stack overflow
    /// Above two assumptions have not been verified

    const getTags = () => {

        const offset = currentPage * LIMIT; //numbering starts from 0

        axios.get('http://localhost:3001', {
            withCredentials: true,
            params: {
                str: valueEntered.toLowerCase(),
                which: "tag",
                offset: offset,
                limit: LIMIT
            }
        })
            .then(function (response) {

                // handle success
                // console.log(response.data);
                setTags(response.data);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {

                setLoading(false);
            });

    }


    useEffect(() => {

        // console.log('useEffect ran');

        setLoading(true);
        setCurrentPage(0);
        getTags();

        // return ummount callback function

    }, [valueEntered]);

    useEffect(() => {

        setLoading(true);
        getTags();

    }, [currentPage]);

    const nextPage = () => {

        if (tags.length !== 0)
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

    return (
        <div >
            <div className='m-4 p-4' style={{ width: "100%" }}>
                <div style={{ width: "40%", float:"left" }}>
                <h1 className='h2 mb-4'>Tags</h1>
                {/* <p className='lead'>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question. Tags can't have spaces.</p> */}
                <input placeholder='Enter tag name' className='p-2 mb-3 fs-5 form-control w-50' type="text" value={valueEntered} onChange={handleChange}></input>
                </div>
                <div style={{ width: "60%", float:"left" }}>
                <div className='container m-0 p-0 d-flex flex-wrap gap-3' style={{  display: "inline-block"}}> {

                    loading ? "Loading" : (tags.length !== 0 ? tags.map((tag) => (<div className='card border-1 border-dark-subtle shadow-sm my-3 rounded-1 w-25' key={tag.id}>

                        <div className="card-body pt-3 pb-0">

                            <button className='btn btn-primary border-0 p-1.3 mb-3 rounded-2' disabled={true}> {tag.tag_name} </button>

                            <div className='m-0 p-0 d-flex align-items-end'>
                                <p className='m-0 p-0 text-muted fw-light'>  {tag.count} questions</p>
                                <p className='my-0 text-muted fw-light' style={{ marginLeft: "auto" }}>id:{tag.id}</p>
                            </div>

                        </div>

                    </div>)) : "No Tags")

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
        </div>


    );
    

}

export default Tags;