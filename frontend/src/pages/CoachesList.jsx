import Navbar from "../components/Navbar";
import { coachesList } from "../data/fakeData";

export default function CoachesList() {
  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">
          Available Coaches 🏋️‍♂️
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coachesList.map((coach) => (
            <div
              key={coach.id}
              className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center"
            >
              <img
                src={coach.photo}
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
        </div>
      </div>
    </>
  );
}
