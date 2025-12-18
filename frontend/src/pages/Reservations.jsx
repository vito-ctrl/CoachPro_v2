import Navbar from "../components/Navbar";
import { coachReservations } from "../data/fakeData";

export default function Reservations() {
  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Reservation Requests 📝</h1>

        {coachReservations.length === 0 ? (
          <p className="text-gray-500">No reservation requests</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coachReservations.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-xl shadow p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="font-semibold">{res.athlete}</p>
                  <p className="text-gray-600">{res.sport}</p>
                  <p className="text-gray-500">
                    {res.date} | {res.time}
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      res.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : res.status === "Accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {res.status}
                  </span>

                  {res.status === "Pending" && (
                    <div className="space-x-2">
                      <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                        Accept
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                        Refuse
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
