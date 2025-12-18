import API from "../services/api";
import "./EventCard.css";
import placeholderImg from "../assets/placeholder.webp"; // Local fallback image

export default function EventCard({ event, refreshEvents }) {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const join = async () => {
    try {
      await API.post(`/events/${event._id}/rsvp`);
      refreshEvents?.();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to join event");
    }
  };

  const leave = async () => {
    try {
      await API.post(`/events/${event._id}/leave`);
      refreshEvents?.();
    } catch {
      alert("Failed to leave event");
    }
  };

  const deleteEvent = async () => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await API.delete(`/events/${event._id}`);
      refreshEvents?.();
    } catch {
      alert("Failed to delete event");
    }
  };

  const editEvent = () => {
    window.location.href = `/create?edit=${event._id}`;
  };

  const isOwner = event.creator?._id === currentUser.id;
  const isAttending = event.attendees.includes(currentUser.id);

  // Determine image URL
  const imageSrc = event.image
    ? event.image.startsWith("http") // full URL from backend
      ? event.image
      : `${API_URL}/uploads/${event.image}` // filename from backend
    : placeholderImg;

  return (
    <div className="event-card">
      {/* Event Image */}
      <img
        src={imageSrc}
        alt={event.title}
        className="event-image"
        onError={(e) => (e.target.src = placeholderImg)}
      />

      {/* Event Details */}
      <div className="event-details">
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <p>
          <strong>Date:</strong> {new Date(event.date).toLocaleString()}
        </p>
        <p>
          <strong>Capacity:</strong> {event.attendees.length}/{event.capacity}
        </p>
      </div>

      {/* Event Actions */}
      <div className="event-actions">
        {!isOwner && !isAttending && <button onClick={join}>Join</button>}
        {!isOwner && isAttending && <button onClick={leave}>Leave</button>}
        {isOwner && (
          <>
            <button onClick={editEvent}>Edit</button>
            <button onClick={deleteEvent}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}
