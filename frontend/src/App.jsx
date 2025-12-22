import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CoachesList from "./pages/CoachesList";
import CoachProfile from "./pages/CoachProfile";
import CompleteCoachProfile from "./pages/CompleteCoachProfile.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/coaches" element={<CoachesList />} />
      <Route path="/coach/:id" element={<CoachProfile />} />
      <Route path="/compCoach/:id" element={<CompleteCoachProfile />} />
    </Routes>
  );
}
