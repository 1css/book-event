import React, { useState } from "react";
import Loader from "../Components/Loader";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../CSS/Evetn.css";
import Pagination from "../Components/Pagination";

function ListEvents({ posts, loadingP }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

  // Calculate the index of the first and last posts for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {loadingP ? (
        <Loader />
      ) : (
        <div>
          <div className="container">
            {currentPosts.map((data, index) => (
              <Row key={index} className="justify-content-center mt-4">
                <div className="event-block">
                  <Col xs={12} sm={6} md={6} lg={7}>
                    <Link to={`/devent/${data.id}`} style={{}}>
                      <h5>{data.title}</h5>
                    </Link>
                    <Row className="event-row flex-nowrap">
                      <Col
                        xs={2}
                        sm={2}
                        md={2}
                        lg={2}
                        className="small_font"
                        id="event-category"
                      >
                        {data.category}
                      </Col>
                      <Col
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        className="small_font"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {data.date}{" "}
                      </Col>
                      <Col xs={3} sm={3} md={3} lg={3} className="small_font">
                        Seats:{data.available_sets}
                      </Col>
                      <Col xs={3} sm={3} md={3} lg={3} className="small_font">
                        &#8377;{data.price}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="event-description">
                        description:{data.description}
                      </Col>
                    </Row>
                  </Col>
                </div>
              </Row>
            ))}
          </div>
        </div>
      )}
      <Pagination
        length={posts.length}
        postsPerPage={postsPerPage}
        handlePagination={handlePagination}
        currentPage={currentPage} 
      />
    </div>
  );
}

export default ListEvents;
