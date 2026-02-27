import { useEffect, useState } from "react";
import { supabase } from "../lib/supabse";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // 🔐 Protect Admin Route
  useEffect(() => {
    const isAuthorized = sessionStorage.getItem("admin_access");
    if (!isAuthorized) {
      navigate("/");
    }
  }, [navigate]);

  // 📥 Fetch Submissions
  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
    } else {
      setSubmissions(data);
    }

    setLoading(false);
  };

  // 🗑 Delete Submission
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this submission?",
    );
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      alert("Failed to delete.");
    } else {
      setSubmissions((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    sessionStorage.removeItem("admin_access");
    navigate("/");
  };

  // 🔍 Filtered Submissions
  const filteredSubmissions = submissions.filter(
    (item) =>
      item.full_name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-4 text-sm">
          <p className="font-semibold text-gray-700">Dashboard</p>
          <p className="text-gray-500">Contact Submissions</p>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Contact Submissions</h1>

          <button
            onClick={handleLogout}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black transition"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500">Total Submissions</p>
            <h3 className="text-2xl font-bold">{submissions.length}</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500">Today</p>
            <h3 className="text-2xl font-bold">
              {
                submissions.filter(
                  (s) =>
                    new Date(s.created_at).toDateString() ===
                    new Date().toDateString(),
                ).length
              }
            </h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-sm text-gray-500">Filtered Results</p>
            <h3 className="text-2xl font-bold">{filteredSubmissions.length}</h3>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          {loading ? (
            <p className="p-6">Loading...</p>
          ) : filteredSubmissions.length === 0 ? (
            <p className="p-6">No submissions found.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 text-left text-sm uppercase tracking-wider text-gray-600">
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Subject</th>
                  <th className="p-3 border">Message</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredSubmissions.map((item) => (
                  <tr key={item.id} className="text-sm hover:bg-gray-50">
                    <td className="p-3 border">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                    <td className="p-3 border">{item.full_name}</td>
                    <td className="p-3 border">{item.email}</td>
                    <td className="p-3 border">{item.subject}</td>
                    <td className="p-3 border whitespace-pre-wrap">
                      {item.message}
                    </td>
                    <td className="p-3 border">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>

                        <a
                          href={`mailto:${item.email}?subject=Re: ${item.subject}`}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                        >
                          Reply
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
