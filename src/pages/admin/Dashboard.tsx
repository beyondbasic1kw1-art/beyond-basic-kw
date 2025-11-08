import { useState, useEffect } from "react";
import AdminUpload from "./Upload";
import AdminGallery from "./Gallery";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  // ✅ Basic local password protection (replace with Supabase Auth later)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "beyond123"; // 👈 set your own
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_auth", "true");
      setAuthorized(true);
    } else {
      alert("❌ Incorrect password!");
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("admin_auth");
    if (stored === "true") setAuthorized(true);
  }, []);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bbSoftGold text-bbDark">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-md text-center space-y-4"
        >
          <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-bbOlive"
          />
          <button
            type="submit"
            className="w-full bg-bbOlive text-white py-2 rounded-lg hover:bg-bbDark transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bbSoftGold text-bbDark p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("admin_auth");
            setAuthorized(false);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      <nav className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("upload")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "upload"
              ? "bg-bbOlive text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Upload Image
        </button>
        <button
          onClick={() => setActiveTab("gallery")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "gallery"
              ? "bg-bbOlive text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          Manage Gallery
        </button>
      </nav>

      <div className="bg-white rounded-2xl shadow-md p-6">
        {activeTab === "upload" ? <AdminUpload /> : <AdminGallery />}
      </div>
    </div>
  );
};

export default AdminDashboard;
