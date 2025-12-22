import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function CoachesList() {
  const [coaches, setCoaches] = useState([]);

  const fetchCoaches = async () => {
    try {
      const res = await fetch("http://localhost/backend/Api/user.php");

      if (!res.ok) {
        throw new Error("Failed to fetch coaches");
      }

      const data = await res.json();
      setCoaches(data);
      console.log("Coaches:", data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">
          Available Coaches 
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coaches.map((coach) => (
            <div
              key={coach.id}
              className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center"
            >
              <img
                src={coach.photo || "/default-avatar.png"}
                alt={coach.name}
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />

              <h2 className="text-xl font-semibold">{coach.name}</h2>
              <p className="text-gray-600">{coach.sport}</p>

              <p className="text-gray-500 mb-4">
                {coach.experience} years of experience
              </p>

              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                View Profile
              </button>
            </div>
          ))}

          {coaches.length === 0 && (
            <p className="text-gray-500">No coaches found.</p>
          )}
        </div>
      </div>
    </>
  );
}
