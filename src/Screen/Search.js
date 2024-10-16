import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Loader from "../Components/Loader";
import "../CSS/Evetn.css";
function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q", false) || "";
  const [loading, setLoading] = useState(false);
  const [evetsGet, setEvetsGet] = useState([]);
  const [notFound, setNotFound] = useState(true);

  useEffect(() => {
    const searchValue = async () => {
      setLoading(true);
      try {
        const fetchPost = await fetch("/data.json");

        const res = await fetchPost.json();

        const data = res.events;

        const result = data.filter((x) => {
          return (
            x.title.toLowerCase().includes(query.toLowerCase()) ||
            x.category.toLowerCase().includes(query.toLowerCase())
          );
        });

        if (result.length > 0) {
          setEvetsGet(result);
          setNotFound(false)
        } else {
          setEvetsGet([]); // No results found
          setNotFound(true)
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    query && searchValue();
  }, [query]);
  console.log(evetsGet, "evetsGet");
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div id="search-box">
          <div className="container">
            {!notFound ? (
              <>
                {evetsGet.map((data, index) => (
                  <Row key={index} className="justify-content-center">
                    <Col xs={12} sm={6} md={4} lg={3}>
                      <Link to={`/devent/${data.id}`} style={{}}>
                        <h5>{data.title}</h5>
                      </Link>
                      <Row>
                        <Col
                          xs={3}
                          sm={3}
                          md={3}
                          lg={3}
                          className="small_font"
                          id="event-category"
                        >
                          {data.category}
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4} className="small_font">
                          {data.date}
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2} className="small_font">
                          {data.available_sets}
                        </Col>
                        <Col xs={3} sm={3} md={3} lg={3} className="small_font">
                          {data.price}
                        </Col>
                      </Row>
                      <Row>
                        <Col className="event-description">
                          description:{data.description}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
              </>
            ) : (
              <>
                <div id="notFoundEvent"><h5>not the Found the Event</h5></div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
