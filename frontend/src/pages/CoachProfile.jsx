import Navbar from "../components/Navbar";
import { coachProfiles } from "../data/fakeData";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


export default function CoachProfile() {
  const { id } = useParams();
  const coach = coachProfiles.find((c) => c.id === parseInt(id));
  const [coachdone, setCoachdone] = useState([]);

  const alreadycomplite = async() => {
    const res = await fetch("http://localhost/backend/Api/compliteCoach.php", {
      method: "GET",
      headers: {"Content-type":"Aplication/json"}
    })

    const data = await res.json();
    console.log(data);

    setCoachdone(data);
  } 

  useEffect(() => {
    alreadycomplite()
  }, []);

  if (!coach) {
    return (
      <>
        <Navbar />
        <div className="p-6">
          <p className="text-red-500 font-bold">Coach not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl w-full">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
            <img
              src={coach.photo}
              alt={coach.name}
              className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
            />
            <div>
              <h1 className="text-2xl font-bold">{coach.name}</h1>
              <p className="text-gray-600">{coach.sport}</p>
              <p className="text-gray-500">{coach.experience} years experience</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Biography</h2>
            <p className="text-gray-700">{coach.bio}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Certifications</h2>
            <ul className="list-disc list-inside text-gray-700">
              {coach.certifications.map((cert, idx) => (
                <li key={idx}>{cert}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <p className="text-gray-700">Email: {coach.email}</p>
            <p className="text-gray-700">Phone: {coach.phone}</p>
          </div>

          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            Book a Session
          </button>
        </div>
      </div>
    </>
  );
}
