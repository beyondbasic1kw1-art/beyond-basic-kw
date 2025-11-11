import { useState, useEffect } from "react";
import {
  Upload,
  Image,
  Home,
  Layers,
  ClipboardList,
  FileText,
  Info,
  Phone,
  LogOut,
  LayoutDashboard,
  Database,
  RefreshCcw,
  Moon,
  Sun,
  User,
  Lock,
  MonitorSmartphone,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// 🖼️ Portfolio Management
import AdminUpload from "./Upload";
import AdminGallery from "./Gallery";

// 🏠 Homepage Gallery
import UploadGallery from "./UploadGallery";
import GalleryAutoScroll from "./GalleryAutoScroll";

// 🛠️ Services
import AdminServicesUpload from "./AdminServicesUpload";
import AdminServicesList from "./AdminServicesList";

// 🧱 Service Details
import AdminServiceDetailsUpload from "./AdminServiceDetailsUpload";
import AdminServiceDetailsList from "./AdminServiceDetailsList";

// 📖 About Page
import AdminAboutList from "./AdminAboutList";

// 📞 Contact Page
import AdminContact from "./AdminContact";

// 🦸 Hero Section
import AdminHeroUpload from "./AdminHeroUpload"; // ✅ Added

// 🎨 Theme Colors
const LIGHT_COLORS = ["#8C7C5E", "#B6A677", "#C9BC8F", "#E7DDB7"];
const DARK_COLORS = ["#F3E8C8", "#DCCB91", "#BFAE6C", "#8C7C5E"];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [authorized, setAuthorized] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("—");

  const [stats, setStats] = useState({
    services: 0,
    serviceDetails: 0,
    galleryImages: 0,
    homepageImages: 0,
  });

  // ✅ Secure login using .env credentials
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const ADMIN_USER = import.meta.env.VITE_ADMIN_USERNAME || "admin";
    const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || "beyondbasic";

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem("admin_auth", "true");
      setAuthorized(true);
    } else {
      alert("❌ Invalid username or password");
    }
  };

  // 🌙 Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("admin_dark_mode", JSON.stringify(next));
      return next;
    });
  };

  // Load session + theme
  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    const theme = localStorage.getItem("admin_dark_mode");
    if (auth === "true") setAuthorized(true);
    if (theme === "true") setDarkMode(true);
  }, []);

  // 📊 Fetch Supabase stats
  const fetchStats = async () => {
    try {
      const [
        { count: services },
        { count: details },
        { count: gallery },
        { count: home },
      ] = await Promise.all([
        supabase.from("services").select("*", { count: "exact", head: true }),
        supabase
          .from("service_details")
          .select("*", { count: "exact", head: true }),
        supabase.from("portfolio").select("*", { count: "exact", head: true }),
        supabase
          .from("home_gallery")
          .select("*", { count: "exact", head: true }),
      ]);

      setStats({
        services: services || 0,
        serviceDetails: details || 0,
        galleryImages: gallery || 0,
        homepageImages: home || 0,
      });
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      console.error("❌ Error fetching stats:", err);
    }
  };

  // Auto-refresh stats
  useEffect(() => {
    if (authorized) {
      fetchStats();
      const interval = setInterval(fetchStats, 60000);
      return () => clearInterval(interval);
    }
  }, [authorized]);

  // 🔒 Login Page
  if (!authorized) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors ${
          darkMode ? "bg-bbDark text-bbSoftGold" : "bg-bbSoftGold text-bbDark"
        }`}
      >
        <form
          onSubmit={handleLogin}
          className={`p-8 rounded-2xl shadow-md text-center space-y-4 w-full max-w-sm ${
            darkMode ? "bg-bbOlive/20" : "bg-white"
          }`}
        >
          <h1 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
            <User className="w-6 h-6 text-bbOlive" /> Admin Login
          </h1>

          <div className="space-y-3">
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-10 py-2 focus:ring focus:ring-bbOlive"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-10 py-2 focus:ring focus:ring-bbOlive"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-bbOlive text-white py-2 rounded-lg hover:bg-bbDark transition"
          >
            Login
          </button>

          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex justify-center gap-2 items-center w-full mt-4 text-bbOlive"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />} Toggle{" "}
            {darkMode ? "Light" : "Dark"} Mode
          </button>
        </form>
      </div>
    );
  }

  // 🌈 Chart colors
  const COLORS = darkMode ? DARK_COLORS : LIGHT_COLORS;

  const chartData = [
    { name: "Services", value: stats.services },
    { name: "Service Details", value: stats.serviceDetails },
    { name: "Portfolio", value: stats.galleryImages },
    { name: "Home Gallery", value: stats.homepageImages },
  ];

  // ✅ Main Dashboard
  return (
    <div
      className={`min-h-screen transition-colors p-6 ${
        darkMode ? "bg-bbDark text-bbSoftGold" : "bg-bbSoftGold text-bbDark"
      }`}
    >
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-bbOlive" />
          Admin Dashboard
        </h1>
        <div className="flex gap-3">
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-bbOlive hover:text-white transition"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            {darkMode ? "Light" : "Dark"} Mode
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("admin_auth");
              setAuthorized(false);
            }}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      {/* Navbar */}
      <nav
        className={`flex flex-wrap gap-3 mb-6 sticky top-0 z-40 p-4 rounded-xl border backdrop-blur-sm ${
          darkMode
            ? "bg-bbOlive/20 border-bbSoftGold/20"
            : "bg-white/90 border-gray-200 shadow-sm"
        }`}
      >
        {[
          { id: "overview", label: "Overview", icon: LayoutDashboard },
          { id: "manageHero", label: "Manage Hero", icon: MonitorSmartphone }, // ✅ NEW
          { id: "upload", label: "Upload Portfolio", icon: Upload },
          { id: "gallery", label: "Manage Gallery", icon: Image },
          { id: "homeGallery", label: "Upload Home Gallery", icon: Home },
          { id: "viewHomeGallery", label: "View Home Gallery", icon: Layers },
          { id: "addService", label: "Add Service", icon: ClipboardList },
          { id: "manageServices", label: "Manage Services", icon: ClipboardList },
          { id: "addServiceDetails", label: "Add Service Detail", icon: FileText },
          { id: "manageServiceDetails", label: "Manage Service Details", icon: FileText },
          { id: "manageAbout", label: "Manage About", icon: Info },
          { id: "manageContact", label: "Manage Contact", icon: Phone },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === id
                ? "bg-bbOlive text-white shadow-md"
                : darkMode
                ? "bg-bbOlive/10 hover:bg-bbOlive/20"
                : "bg-gray-100 hover:bg-bbSoftGold hover:text-bbDark"
            }`}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <div
        className={`rounded-2xl shadow-md p-6 ${
          darkMode ? "bg-bbOlive/10" : "bg-white"
        }`}
      >
        {activeTab === "overview" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Database className="w-6 h-6 text-bbOlive" /> Dashboard Overview
              </h2>
              <button
                onClick={fetchStats}
                className="flex items-center gap-2 bg-bbOlive text-white px-4 py-2 rounded-lg hover:bg-bbDark transition"
              >
                <RefreshCcw className="w-4 h-4" /> Refresh
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { label: "Total Services", value: stats.services },
                { label: "Service Details", value: stats.serviceDetails },
                { label: "Portfolio Images", value: stats.galleryImages },
                { label: "Homepage Gallery", value: stats.homepageImages },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-xl text-center transition-all ${
                    darkMode
                      ? "bg-bbOlive/20 hover:bg-bbOlive/30"
                      : "bg-bbSoftGold/40 hover:shadow-md"
                  }`}
                >
                  <p className="text-sm font-medium mb-2">{item.label}</p>
                  <h3 className="text-4xl font-bold">{item.value}</h3>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div
                className={`rounded-xl p-6 shadow-sm ${
                  darkMode ? "bg-bbOlive/20" : "bg-bbSoftGold/20"
                }`}
              >
                <h3 className="text-lg font-semibold mb-4">
                  Content Distribution (Bar)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {chartData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div
                className={`rounded-xl p-6 shadow-sm ${
                  darkMode ? "bg-bbOlive/20" : "bg-bbSoftGold/20"
                }`}
              >
                <h3 className="text-lg font-semibold mb-4">
                  Content Ratio (Pie)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {chartData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <p className="text-sm text-gray-500 text-right mt-6">
              Last updated: <span className="font-medium">{lastUpdated}</span>
            </p>
          </div>
        )}

        {activeTab === "manageHero" && <AdminHeroUpload />} {/* ✅ Hero Tab */}
        {activeTab === "upload" && <AdminUpload />}
        {activeTab === "gallery" && <AdminGallery />}
        {activeTab === "homeGallery" && <UploadGallery />}
        {activeTab === "viewHomeGallery" && <GalleryAutoScroll />}
        {activeTab === "addService" && <AdminServicesUpload />}
        {activeTab === "manageServices" && <AdminServicesList />}
        {activeTab === "addServiceDetails" && <AdminServiceDetailsUpload />}
        {activeTab === "manageServiceDetails" && <AdminServiceDetailsList />}
        {activeTab === "manageAbout" && <AdminAboutList />}
        {activeTab === "manageContact" && <AdminContact />}
      </div>
    </div>
  );
};

export default AdminDashboard;
