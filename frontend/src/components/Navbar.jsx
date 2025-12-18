import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">CoachPro</h1>

      <div className="space-x-4">
        <Link to="/coaches" className="text-gray-600 hover:text-blue-600">
          Coaches
        </Link>
        <Link to="/" className="text-gray-600 hover:text-blue-600">
          Login
        </Link>
      </div>
    </nav>
  );
}
