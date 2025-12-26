import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";

export default function Reservation() {
  const [reservation, setReservation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [form, setForm] = useState({
    coach_id: "",
    sport_id: "",
    session_date: "",
    session_time: "",
    duration: "",
    status: "disponible",
  });

  // Fetch sessions
  useEffect(() => {
    fetch("http://localhost/backend/pages/reservation.php")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setReservation(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data", err);
        setError("Failed to load sessions");
        setLoading(false);
      });
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting session:", form);

    // TODO: Replace with your POST API call
    // fetch("http://localhost/backend/pages/addSession.php", { method: "POST", ... })

    setIsModalOpen(false);
    setForm({
      coach_id: "",
      sport_id: "",
      session_date: "",
      session_time: "",
      duration: "",
      status: "disponible",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-4">
        {/* Top section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Reservations</h1>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Session
          </button>
        </div>

        {/* Loading/Error */}
        {loading && <p>Loading sessions...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Reservation list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {reservation.map((res) => (
            <div
              key={res.id}
              className="bg-white shadow rounded p-4 flex flex-col justify-between"
            >
              <div>
                <p>
                  <span className="font-semibold">Reservation ID:</span>{" "}
                  {res.id}
                </p>
                <p>
                  <span className="font-semibold">Session ID:</span>{" "}
                  {res.session_id}
                </p>
                <p>
                  <span className="font-semibold">User ID:</span> {res.user_id}
                </p>
                <p>
                  <span className="font-semibold">Booked At:</span>{" "}
                  {new Date(res.booked_at).toLocaleString()}
                </p>
              </div>
              <button
                className="mt-4 bg-green-500 hover:bg-green-600 text-white py-1 rounded"
                onClick={() => alert(`Reserve session ${res.session_id}`)}
              >
                Reserve
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Session</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="number"
                name="coach_id"
                placeholder="Coach ID"
                value={form.coach_id}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
              <input
                type="number"
                name="sport_id"
                placeholder="Sport ID"
                value={form.sport_id}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
              <input
                type="date"
                name="session_date"
                value={form.session_date}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
              <input
                type="time"
                name="session_time"
                value={form.session_time}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
              <input
                type="number"
                name="duration"
                placeholder="Duration (minutes)"
                value={form.duration}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
                <option value="disponible">Disponible</option>
                <option value="full">Full</option>
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Add Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
