import React, { useEffect, useState } from "react";
import ListEvents from "./ListEvents";

function Home() {
  const [loading, setLoading] = useState(false);
  const [listEvent, setListEvent] = useState([]);

  //Effecct
  useEffect(() => {
    const fecthFunction = async () => {
      setLoading(true);
      try {
        const fecthEvents = await fetch("/data.json");
        const res = await fecthEvents.json();

        const data = res.events;

        setListEvent(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fecthFunction();
  }, []);
  return (
    <div>
      <h3 id="headLine-event">Event List</h3>
      <ListEvents posts={listEvent} loadingP={loading} />
    </div>
  );
}

export default Home;
