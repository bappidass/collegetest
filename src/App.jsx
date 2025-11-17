import { useState } from "react";
import "./App.css";

export default function App() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  const data = { name, feedback, rating };

  try {
    const res = await fetch("https://collegeproject-back.onrender.com/feedback/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      alert("Feedback submitted successfully!");
      setName("");
      setFeedback("");
      setRating("");
    } else {
      alert("Failed to submit feedback!");
    }
  } catch (error) {
    alert("Server error: " + error.message);
  }
};


  return (
    <div className="App">
    <div className="container">
      <h1>Feedback Form</h1>

      <form onSubmit={handleSubmit} className="feedback-form">

        <label>Your Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Your Feedback</label>
        <textarea
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        ></textarea>

        <label>Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        >
          <option value="">Select Rating</option>
          <option value="1">⭐ 1 - Poor</option>
          <option value="2">⭐ 2 - Fair</option>
          <option value="3">⭐ 3 - Good</option>
          <option value="4">⭐ 4 - Very Good</option>
          <option value="5">⭐ 5 - Excellent</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}
