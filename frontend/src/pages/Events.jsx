import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";

export default function Events() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      console.log("Fetched events:", res.data); // Debug: check images
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      alert("Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Navbar />
      <div className="events-container">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              refreshEvents={fetchEvents}
            />
          ))
        ) : (
          <p>No events available</p>
        )}
      </div>
    </>
  );
}
