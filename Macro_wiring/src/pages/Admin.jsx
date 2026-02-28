import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { ArrowUp, LayoutDashboard, Inbox, Settings, Trash2, Calendar } from "lucide-react"; 
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
  const [filterDate, setFilterDate] = useState(""); // NEW: Date Filter State
  const [activeTab, setActiveTab] = useState("Dashboard");

  // --- REFS FOR SCROLLING ---
  const dashboardRef = useRef(null);
  const inboxRef = useRef(null);

  // --- GLASSMORPHISM SCROLL TO TOP STATE ---
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  /* ---------------- AUTH ---------------- */
  useEffect(() => {
    const isAuthorized = sessionStorage.getItem("admin_access");
    if (!isAuthorized) navigate("/");
  }, [navigate]);

  /* ---------------- FETCH DATA & SCROLL MONITOR ---------------- */
  useEffect(() => {
    fetchSubmissions();

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const scrolled = window.scrollY;

      if (scrolled + windowHeight > fullHeight - 120) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setSubmissions(data || []);
    setLoading(false);
  };

  // --- SMOOTH SCROLL LOGIC ---
  const scrollToSection = (tab) => {
    setActiveTab(tab);
    if (tab === "Dashboard") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (tab === "Inbox" && inboxRef.current) {
      inboxRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------------- ACTIONS ---------------- */
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this submission?")) return;

    await supabase.from("contact_submissions").delete().eq("id", id);
    setSubmissions((prev) => prev.filter((item) => item.id !== id));
  };

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

  /* ---------------- LOGIC ---------------- */
  // UPDATED: Combined Search and Date Filtering
  const filteredSubmissions = submissions.filter((item) => {
    const matchesSearch = 
      item.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase()) ||
      item.subject?.toLowerCase().includes(search.toLowerCase());
    
    // Normalize date to YYYY-MM-DD for comparison
    const itemDate = new Date(item.created_at).toISOString().split('T')[0];
    const matchesDate = filterDate === "" || itemDate === filterDate;

    return matchesSearch && matchesDate;
  });

  const totalMessages = submissions.length;
  const unreadMessages = submissions.filter((item) => item.status === "unread").length;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayMessages = submissions.filter((item) => {
    const created = new Date(item.created_at);
    created.setHours(0, 0, 0, 0);
    return created.getTime() === today.getTime();
  }).length;

  const monthMessages = submissions.filter(
    (item) => new Date(item.created_at) >= new Date(today.getFullYear(), today.getMonth(), 1)
  ).length;

  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const chartData = {
    labels: last7Days.map((d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" })),
    datasets: [
      {
        label: "Messages",
        data: last7Days.map(day => submissions.filter(item => {
          const created = new Date(item.created_at);
          created.setHours(0, 0, 0, 0);
          return created.getTime() === day.getTime();
        }).length),
        borderColor: "#1e293b",
        backgroundColor: "rgba(30, 41, 59, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative">
      
      {/* SIDE FLOATING NAVIGATION */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4 p-3 bg-white/40 backdrop-blur-md border border-white/40 rounded-3xl shadow-2xl transition-all duration-300 hover:opacity-100 opacity-60 hover:bg-white/80">
        {[
          { name: "Dashboard", icon: <LayoutDashboard size={22} /> },
          { name: "Inbox", icon: <Inbox size={22} /> },
          { name: "Settings", icon: <Settings size={22} /> }
        ].map((tab) => (
          <button
            key={tab.name}
            onClick={() => scrollToSection(tab.name)}
            className={`group relative p-4 rounded-2xl transition-all duration-300 flex items-center justify-center ${
              activeTab === tab.name 
              ? "bg-blue-600 text-white shadow-lg scale-110" 
              : "text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-md"
            }`}
          >
            {tab.icon}
            <span className="absolute right-16 px-3 py-1 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-slate-700">
              {tab.name}
            </span>
          </button>
        ))}
      </nav>

      {/* 2. SUB-HEADER */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Contact Management</h1>
              <p className="text-sm text-slate-500 mt-1 uppercase tracking-wider font-semibold opacity-70">Operational Overview & Portal Analytics</p>
            </div>
            
            <button
              onClick={handleLogout}
              className="px-6 py-2 text-sm font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-all border border-red-100 shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT AREA */}
      <main className="flex-1 max-w-[1600px] mx-auto w-full p-4 md:p-8 space-y-20">
        
        {/* DASHBOARD SECTION */}
        <section ref={dashboardRef} className="space-y-8 scroll-mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <EnterpriseCard title="Total Messages" value={totalMessages} icon="📊" />
            <EnterpriseCard title="Unread Messages" value={unreadMessages} icon="✉️" />
            <EnterpriseCard title="Today's Activity" value={todayMessages} icon="⚡" />
            <EnterpriseCard title="Monthly Total" value={monthMessages} icon="📈" />
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Message Activity (Last 7 Days)
              </h3>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="h-[300px]">
              <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
            </div>
          </div>
        </section>

        {/* INBOX SECTION - Responsive Outlook Style with Date Filter */}
        <section ref={inboxRef} className="space-y-6 pt-10 border-t border-slate-200 scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-2">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Inbox</h2>
              <p className="text-xs text-slate-500 font-semibold tracking-wide opacity-80">Managing portal inquiries and client communications</p>
            </div>
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search in all folders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg pl-4 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-lg">
            {/* OUTLOOK TOOLBAR */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex flex-wrap items-center gap-6 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <div className="flex gap-4">
                <span className="text-blue-600 border-b-2 border-blue-600 pb-1 cursor-pointer">All Email</span>
              </div>
              
              {/* UPDATED: Functional Date Filter in Toolbar */}
              <div className="ml-auto flex items-center gap-3">
                <span className="text-xs font-semibold normal-case text-slate-500 flex items-center gap-1">
                  <Calendar size={14} className="opacity-60" /> Filter by Date:
                </span>
                <input 
                  type="date" 
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="bg-white border border-slate-200 rounded px-2 py-1 text-[11px] font-bold text-slate-700 outline-none focus:border-blue-500 transition-colors cursor-pointer"
                />
                {filterDate && (
                  <button 
                    onClick={() => setFilterDate("")}
                    className="text-[10px] text-red-500 hover:text-red-700 font-black ml-1"
                  >
                    CLEAR
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-[700px] overflow-y-auto no-scrollbar divide-y divide-slate-100">
              <div className="bg-slate-50/90 px-6 py-2.5 text-[10px] font-black text-blue-700 uppercase tracking-widest sticky top-0 z-10 backdrop-blur-md border-b border-slate-200">
                {filterDate ? `Records for ${new Date(filterDate).toLocaleDateString()}` : "Recent Communications"}
              </div>

              {loading ? (
                <div className="p-20 text-center text-slate-400 font-medium italic">Syncing with server...</div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="p-20 text-center text-slate-400 font-medium italic">No results found for this selection.</div>
              ) : (
                filteredSubmissions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleOpenMessage(item)}
                    className={`flex items-start gap-3 md:gap-5 p-4 md:p-5 cursor-pointer transition-all border-l-4 group ${
                      item.status === "unread" 
                      ? "border-blue-600 bg-blue-50/20" 
                      : "border-transparent hover:bg-slate-50"
                    }`}
                  >
                    {/* Profile Avatar */}
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white shadow-md ${
                      item.status === "unread" ? "bg-blue-600" : "bg-slate-400"
                    }`}>
                      {item.full_name?.charAt(0).toUpperCase()}
                    </div>

                    {/* Message Body */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-sm md:text-base truncate ${item.status === "unread" ? "font-black text-slate-900" : "font-bold text-slate-700"}`}>
                          {item.full_name}
                        </h4>
                        
                        {/* --- RESPONSIVE TIME DISPLAY --- */}
                        <div className="text-right flex flex-col items-end min-w-[70px] md:min-w-[100px]">
                          <span className={`tabular-nums tracking-tight font-black 
                            text-xs md:text-lg 
                            ${item.status === "unread" ? "text-blue-600" : "text-slate-600"}`}>
                            {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                          </span>
                          <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                            {new Date(item.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                      
                      <div className={`text-xs md:text-sm mb-1 truncate ${item.status === "unread" ? "text-slate-900 font-extrabold" : "text-blue-600 font-semibold"}`}>
                        {item.subject}
                      </div>
                      
                      <p className="text-xs md:text-sm text-slate-500 truncate leading-relaxed line-clamp-1 opacity-90">
                        {item.message}
                      </p>
                    </div>

                    {/* Action Side-Menu (Hover) */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity self-center pr-2">
                      <button
                        onClick={(e) => handleDelete(item.id, e)}
                        className="p-2 text-slate-300 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

      </main>

      {/* GLASSMORPHISM SCROLL TO TOP BUTTON */}
      <button
        onClick={scrollToTop}
        className={`fixed z-50 p-4 
          bg-white/20 backdrop-blur-md text-gray-800 
          rounded-full shadow-xl border border-white/40
          transition-all duration-500 
          hover:bg-blue-600 hover:text-white hover:border-transparent hover:-translate-y-2 
          active:scale-95 flex items-center justify-center 
          bottom-8 right-24
          ${showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-50 translate-y-10 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* MODAL VIEW */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-slate-900/60 z-[200] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-xl p-8 rounded-[2rem] shadow-2xl space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-2xl text-slate-900">{selectedInquiry.full_name}</h3>
                <p className="text-blue-600 font-medium">{selectedInquiry.email}</p>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-slate-700 italic">
              "{selectedInquiry.message}"
            </div>
            <a href={`mailto:${selectedInquiry.email}`} className="block w-full bg-slate-900 text-white text-center py-4 rounded-2xl font-bold">
              Reply via Email
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function EnterpriseCard({ title, value, icon }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
        </div>
        <span className="text-xl opacity-50">{icon}</span>
      </div>
    </div>
  );
}