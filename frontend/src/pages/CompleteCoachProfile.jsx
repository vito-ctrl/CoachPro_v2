import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CompleteCoachProfile() {
  const { id } = useParams();
  const [form, setForm] = useState({
    user_id: Number(id),
    bio: "",
    experience: 0,
    phone: "",
    photo: ""
  });

  const Navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "http://localhost/backend/Api/compliteCoach.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({...form})
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }else{
        Navigate('/coach')
      }

      alert("Profile completed successfully!");
      // navigate("/coach/dashboard") later
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Complete Your Coach Profile
        </h2>
        <p className="text-gray-500 mb-6">
          Tell us more about yourself to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name="bio"
            placeholder="Short bio about you"
            value={form.bio}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="experience"
            placeholder="Years of experience"
            value={form.experience}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="photo"
            placeholder="Photo"
            value={form.photo}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CompleteCoachProfile;
