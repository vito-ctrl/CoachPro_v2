import Navbar from "../components/Navbar";
import { athleteStats, upcomingSessions } from "../data/fakeData";

export default function AthleteDashboard() {
  return (
    <>
      <Navbar />

      <div className="p-6 bg-white-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">
          Welcome back, Athlete 👋
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Total Sessions</p>
            <p className="text-3xl font-bold">{athleteStats.total}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Upcoming Sessions</p>
            <p className="text-3xl font-bold text-blue-600">
              {athleteStats.upcoming}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Cancelled Sessions</p>
            <p className="text-3xl font-bold text-red-500">
              {athleteStats.cancelled}
            </p>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Upcoming Sessions
          </h2>

          {upcomingSessions.length === 0 ? (
            <p className="text-gray-500">No upcoming sessions</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2">Coach</th>
                  <th>Sport</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {upcomingSessions.map((session) => (
                  <tr key={session.id} className="border-t">
                    <td className="py-2">{session.coach}</td>
                    <td>{session.sport}</td>
                    <td>{session.date}</td>
                    <td>{session.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
