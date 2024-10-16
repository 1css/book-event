import React, { useContext, useEffect, useState } from "react";
import { json, Link, useNavigate, useParams } from "react-router-dom";

import Loader from "../Components/Loader";
import "../CSS/Devent.css";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DetailsEvent() {
  //hooks
  const [loading, setLoading] = useState(false);
  const [listEvent, setListEvent] = useState([]);
  const { evetnId } = useParams();
  const [msg, setMsg] = useState("");
  //context
  const { user } = useContext(AuthContext);

  //use
  const navigte = useNavigate();

  //effect
  useEffect(() => {
    const fecthFunction = async () => {
      setLoading(true);
      try {
        const fecthEvents = await fetch("/data.json");
        const res = await fecthEvents.json();

        const data = res.events;
       

        const result = data.filter((x) => x.id === Number(evetnId));
        

        if (result) {
          setListEvent(result);
          setLoading(false);
        } else {
          setMsg("not found");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fecthFunction();
  }, [evetnId]);
  

  const FromlocalStroage = localStorage.getItem("book");
const JSONInfodata = FromlocalStroage ? JSON.parse(FromlocalStroage) : [];

const eventIsBookedOrNot = user && JSONInfodata.filter(
  (x) => x.eventId === Number(evetnId) && x.userId === user.id
).length > 0;

 

  

  //FUNCTION

  const bookSubmitHandler = (event) => {
    event.preventDefault();
    if (!user) {
      navigte("/login");
    } else {
      const bookingData = {
        userId: user.id,
        email: user.email,
        eventId: listEvent[0].id,
        eventTitle: listEvent[0].title,
      };
      let existingBookings;
      const storedBookings = localStorage.getItem("book");

      try {
        existingBookings = storedBookings ? JSON.parse(storedBookings) : [];
        if (!Array.isArray(existingBookings)) {
          console.log(
            "Existing bookings is not an array. Resetting to an empty array."
          );
          existingBookings = [];
        }
      } catch (error) {
        console.error("Error parsing existing bookings:", error);
        existingBookings = [];
      }

      if (Array.isArray(existingBookings)) {
        existingBookings.push(bookingData);

        localStorage.setItem("book", JSON.stringify(existingBookings));
        toast.success(`${listEvent[0].title}, event is booked`);
      } else {
        console.error("Existing bookings is not an array:", existingBookings);
      }
    }
  };

  const noOfseat = (id) => {
    const bookedSeats = JSONInfodata.filter((x) => x.eventId === id);
    return bookedSeats.length;
  };

  return (
    <div>
      <ToastContainer />
      <div className="mt-4">
        <Link to="/">
          <Button>GO Back</Button>
        </Link>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="container" style={{ maxWidth: "600px" }}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              {listEvent.map((data, index) => (
                <tbody key={index}>
                  <tr>
                    <td>Title</td>
                    <td>{data.title}</td>
                  </tr>
                  <tr>
                    <td>category</td>
                    <td>{data.category}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>{data.date}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>{data.price}</td>
                  </tr>
                  <tr>
                    <td>Seats</td>
                    <td>
                      {data.available_sets - noOfseat(data.id) < 0 ? (
                        <>NO seat available</>
                      ) : (
                        <>{data.available_sets - noOfseat(data.id)}</>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>{data.description}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          <div id="Event-btn-book">
            {!eventIsBookedOrNot ? (
              <Button type="su" variant="primary" onClick={bookSubmitHandler}>
                Book
              </Button>
            ) : (
              <>
                <Button type="su" variant="primary">
                  this event is already booked
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsEvent;
