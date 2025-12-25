import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fake validation
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    setError("");

    const res = await fetch('http://localhost/backend/pages/login.php', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password})
    })
    console.log(res);
    const data = await res.json()
    console.log("data:", data);

    const id = data.user.id;
    // Fake login logic (redirect based on role)
    if (data.user.role === "athlete") {
      navigate("/athlete");
    } else if (data.user.role === "coach") {
      console.log("done");
      navigate(`/compCoach/${id}`);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-500">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
