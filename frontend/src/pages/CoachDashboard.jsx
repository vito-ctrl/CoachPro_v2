import Navbar from "../components/Navbar";
import { coachStats, nextSession, coachAvailability } from "../data/fakeData";

export default function CoachDashboard() {
  // Filter next 3 available slots
  const availableSlots = coachAvailability
    .filter((slot) => slot.status === "available")
    .slice(0, 3);

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">
          Coach Dashboard 🏋️‍♂️
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Pending Requests</p>
            <p className="text-3xl font-bold text-orange-500">
              {coachStats.pending}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Sessions Today</p>
            <p className="text-3xl font-bold text-blue-600">{coachStats.today}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Sessions Tomorrow</p>
            <p className="text-3xl font-bold text-green-600">
              {coachStats.tomorrow}
            </p>
          </div>
        </div>

        {/* Next Session */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Next Session</h2>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="font-semibold">Athlete: {nextSession.athlete}</p>
              <p className="text-gray-600">Sport: {nextSession.sport}</p>
              <p className="text-gray-600">
                {nextSession.date} | {nextSession.time}
              </p>
            </div>
            <button className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              View Details
            </button>
          </div>
        </div>

        {/* Availability Summary */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Next Available Slots</h2>
          {availableSlots.length === 0 ? (
            <p className="text-gray-500">No available slots</p>
          ) : (
            <ul className="space-y-2">
              {availableSlots.map((slot, index) => (
                <li
                  key={index}
                  className="flex justify-between bg-green-100 p-3 rounded"
                >
                  <span>
                    {slot.day} | {slot.time}
                  </span>
                  <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
