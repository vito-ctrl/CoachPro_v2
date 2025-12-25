import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CompleteCoachProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log("sports : ", sports.id);

  const [form, setForm] = useState({
    user_id: Number(id),
    bio: "",
    experience_years: "",
    phone: "",
    photo: "",
    sports_ids: []
  });

  useEffect(() => {
    fetch("http://localhost/backend/pages/sports.php")
      .then(res => res.json())
      .then(setSports)
      .catch(() => setError("Failed to load sports"));
  }, []);

  useEffect(() => {
    console.log(form);
  }, [form])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const toggleSport = (sportName) => {
  setForm(prev => {
    const exists = prev.sports_ids.includes(sportName);

    return {
      ...prev,
      sports_ids: exists
        ? prev.sports_ids.filter(s => s !== sportName) 
        : [...prev.sports_ids, sportName]
    };
  });
};



  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "http://localhost/backend/pages/compliteCoach.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      navigate("/coaches");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">

      {/* HEADER */}
      <div className="border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-8 flex gap-6 items-center">
          <img
            src={form.photo || "https://via.placeholder.com/120"}
            alt="Coach"
            className="w-28 h-28 rounded-full border border-gray-700 object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">Complete Coach Profile</h1>
            <p className="text-gray-400">
              Choose your main sport and complete your profile
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* ABOUT */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">About you</h2>

          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Describe your coaching experience_years..."
            className="w-full bg-black border border-gray-800 rounded-lg p-3 mb-4 placeholder-gray-500"
          />

          <input
            type="number"
            name="experience_years"
            value={form.experience_years}
            onChange={handleChange}
            placeholder="Years of experience_years"
            className="w-full bg-black border border-gray-800 rounded-lg p-3"
          />
        </div>

        {/* CONTACT */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Contact</h2>

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="w-full bg-black border border-gray-800 rounded-lg p-3 mb-4"
          />

          <input
            type="text"
            name="photo"
            value={form.photo}
            onChange={handleChange}
            placeholder="Photo URL"
            className="w-full bg-black border border-gray-800 rounded-lg p-3"
          />
        </div>

        {/* SPORTS BUTTONS */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Select your main sport
          </h2>

          <div className="flex flex-wrap gap-3">
            {sports.map(sport => {
              const active = form.sports_ids.includes(sport.id);

              return (
                <button
                  key={sport.sport_id}
                  type="button"
                  onClick={() => toggleSport(sport.id)}
                  className={`
                    px-4 py-2 rounded-full border transition
                    ${active
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-black border-gray-700 text-gray-300 hover:border-blue-500"}
                  `}
                >
                  {sport.name}
                </button>
              );
            })}
            
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-400 bg-red-900/30 p-3 rounded">
            {error}
          </p>
        )}

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-100 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Saving..." : "Save profile"}
        </button>
      </div>
    </div>
  );
}

export default CompleteCoachProfile;
