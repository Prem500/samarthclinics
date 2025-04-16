import About from "./pages/About";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Signup from "./pages/sign-up";
import Signin from "./pages/sign-in";
import Role from "./pages/Role";
import Appointments from "./pages/Appointments";
import DataForm from "./components/DataForm";
import Dashboard from "./pages/Dashboard";
import Prescriptions from "./pages/Prescriptions";
import SharedPrescriptions from "./pages/SharedPrescriptions";
import UserDashboard from "./pages/UserDashboard";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/role" element={<Role />} />
        <Route path="/form" element={<DataForm />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route
          path="/prescription/share/:id"
          element={<SharedPrescriptions />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
