import { useState, useEffect } from "react";
import Navbar from '../components/Navbar.jsx';

export default function Seance() {
  const [seances, setSeances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch sessions
  useEffect(() => {
    fetch("http://localhost/backend/pages/seance.php")
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        setSeances(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch data", err);
        setError("Failed to load sessions");
        setLoading(false);
      });
  }, []);

  // Reservation handler
  const handleReserve = (sessionId) => {
    console.log("Reserve clicked for session ID:", sessionId);
    // TODO: Call backend API to create booking
    alert(`You reserved session ID: ${sessionId}`);
  };

  if (loading) return <p>Loading sessions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <Navbar/>
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Available Sessions</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px"
        }}
      >
        {seances.map(session => (
          <div
            key={session.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>Session #{session.id}</h2>
            <p><strong>Coach ID:</strong> {session.coach_id}</p>
            <p><strong>Sport ID:</strong> {session.sport_id}</p>
            <p><strong>Date:</strong> {session.session_date}</p>
            <p><strong>Time:</strong> {session.session_time}</p>
            <p><strong>Duration:</strong> {session.duration} min</p>
            <p>
              <strong>Status:</strong>{" "}
              <span style={{ color: session.status === "disponible" ? "green" : "red" }}>
                {session.status}
              </span>
            </p>
            {session.status === "disponible" && (
              <button
                onClick={() => handleReserve(session.id)}
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Reserve
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
