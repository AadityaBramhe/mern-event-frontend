import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [image, setImage] = useState(null);

  const create = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("date", date);
      formData.append("capacity", capacity);
      formData.append("image", image);

      await API.post("/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Event created successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to create event");
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <h2>Create Event</h2>

        <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
        <input placeholder="Description" onChange={e => setDescription(e.target.value)} />
        <input placeholder="Location" onChange={e => setLocation(e.target.value)} />
        <input type="date" onChange={e => setDate(e.target.value)} />
        <input type="number" placeholder="Capacity" onChange={e => setCapacity(e.target.value)} />

        {/* IMAGE INPUT (VERY IMPORTANT) */}
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
        />

        <button onClick={create}>Create Event</button>
      </div>
    </>
  );
}
