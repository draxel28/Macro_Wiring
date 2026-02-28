import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

/* Chart.js Register */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

export default function Admin() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [search, setSearch] = useState("");

  /* ---------------- AUTH ---------------- */
  useEffect(() => {
    const isAuthorized = sessionStorage.getItem("admin_access");
    if (!isAuthorized) navigate("/");
  }, [navigate]);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setSubmissions(data || []);
    setLoading(false);
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this submission?")) return;

    await supabase.from("contact_submissions").delete().eq("id", id);
    setSubmissions((prev) => prev.filter((item) => item.id !== id));
  };

  /* ---------------- OPEN MESSAGE ---------------- */
  const handleOpenMessage = async (item) => {
    setSelectedInquiry(item);

    if (item.status !== "read") {
      await supabase
        .from("contact_submissions")
        .update({ status: "read" })
        .eq("id", item.id);

      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.id === item.id ? { ...sub, status: "read" } : sub,
        ),
      );
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_access");
    navigate("/");
  };

  /* ---------------- FILTER ---------------- */
  const filteredSubmissions = submissions.filter(
    (item) =>
      item.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase()) ||
      item.subject?.toLowerCase().includes(search.toLowerCase()),
  );

  /* ---------------- STATS ---------------- */
  const totalMessages = submissions.length;
  const unreadMessages = submissions.filter(
    (item) => item.status === "unread",
  ).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayMessages = submissions.filter((item) => {
    const created = new Date(item.created_at);
    created.setHours(0, 0, 0, 0);
    return created.getTime() === today.getTime();
  }).length;

  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const monthMessages = submissions.filter(
    (item) => new Date(item.created_at) >= firstDayOfMonth,
  ).length;

  /* ---------------- CHART DATA ---------------- */
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const messagesPerDay = last7Days.map(
    (day) =>
      submissions.filter((item) => {
        const created = new Date(item.created_at);
        created.setHours(0, 0, 0, 0);
        return created.getTime() === day.getTime();
      }).length,
  );

  const chartData = {
    labels: last7Days.map((d) =>
      d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    ),
    datasets: [
      {
        label: "Messages",
        data: messagesPerDay,
        borderColor: "#1e293b",
        backgroundColor: "rgba(30, 41, 59, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="px-6 py-6 border-b border-slate-700">
          <h2 className="text-lg font-semibold">Admin Portal</h2>
          <p className="text-xs text-slate-400 mt-1">Enterprise Dashboard</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
          <div className="px-4 py-3 rounded bg-slate-800 font-semibold">
            Dashboard
          </div>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">
              Contact Management
            </h1>
            <p className="text-xs text-slate-500">Operational Overview</p>
          </div>
          <div className="text-sm text-slate-500">
            {new Date().toLocaleDateString()}
          </div>
        </header>

        {/* KPI CARDS */}
        <div className="grid grid-cols-4 gap-6 px-8 py-6">
          <EnterpriseCard title="Total Messages" value={totalMessages} />
          <EnterpriseCard title="Unread Messages" value={unreadMessages} />
          <EnterpriseCard title="Today" value={todayMessages} />
          <EnterpriseCard title="Monthly Total" value={monthMessages} />
        </div>

        {/* CHART */}
        <div className="px-8">
          <div className="bg-white border border-slate-200 rounded-md p-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">
              Message Activity (Last 7 Days)
            </h3>
            <div className="h-[300px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="px-8 py-6">
          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border border-slate-300 rounded px-4 py-2 text-sm"
          />
        </div>

        {/* TABLE */}
        <div className="px-8 pb-10">
          <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-600 uppercase text-xs">
                <tr>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Sender</th>
                  <th className="p-4 text-left">Subject</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="p-4">Loading...</td>
                  </tr>
                ) : (
                  filteredSubmissions.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => handleOpenMessage(item)}
                      className="hover:bg-slate-50 cursor-pointer border-t"
                    >
                      <td className="p-4">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {item.status === "unread" && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full" />
                          )}
                          <span className="font-medium">{item.full_name}</span>
                        </div>
                        <div className="text-xs text-slate-500">
                          {item.email}
                        </div>
                      </td>
                      <td className="p-4">{item.subject}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={(e) => handleDelete(item.id, e)}
                          className="text-red-600 text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL */}
        {selectedInquiry && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white w-full max-w-xl p-8 rounded shadow-lg space-y-4">
              <div className="flex justify-between">
                <h3 className="font-semibold text-lg">
                  {selectedInquiry.full_name}
                </h3>
                <button onClick={() => setSelectedInquiry(null)}>✕</button>
              </div>
              <p className="text-sm text-slate-500">{selectedInquiry.email}</p>
              <div className="bg-slate-100 p-4 rounded">
                {selectedInquiry.message}
              </div>
              <a
                href={`mailto:${selectedInquiry.email}`}
                className="bg-slate-900 text-white px-4 py-2 rounded text-sm inline-block"
              >
                Reply
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Enterprise Card */
function EnterpriseCard({ title, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-5">
      <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
        {title}
      </p>
      <h3 className="text-3xl font-semibold text-slate-800">{value}</h3>
    </div>
  );
}
