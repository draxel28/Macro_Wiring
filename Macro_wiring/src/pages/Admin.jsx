import { useEffect, useState, useRef, useMemo } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { ArrowUp, LayoutDashboard, Inbox, Settings, Trash2, Calendar, X, Mail, Quote, Copy, ChevronDown, CheckSquare, Square, RefreshCcw, AlertTriangle, ShieldCheck } from "lucide-react"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
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
  Filler
);

const HighlightText = ({ text, highlight }) => {
  if (!highlight.trim()) return <span>{text}</span>;
  const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 text-slate-900 rounded-sm px-0.5 font-bold">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

export default function Admin() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState(""); 
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [inboxView, setInboxView] = useState("all"); // "all" or "trash"
  
  const [selectedIds, setSelectedIds] = useState([]);

  const [timeRange, setTimeRange] = useState(7);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chartMode, setChartMode] = useState("month"); 

  const dashboardRef = useRef(null);
  const inboxRef = useRef(null);
  const dateInputRef = useRef(null); 

  useEffect(() => {
    const isAuthorized = sessionStorage.getItem("admin_access");
    if (!isAuthorized) navigate("/");
  }, [navigate]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setSubmissions(data || []);
    // Slight delay to make the transition feel smoother
    setTimeout(() => setLoading(false), 1500);
  };

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const filteredByMonth = useMemo(() => {
    return submissions.filter(item => {
      const date = new Date(item.created_at);
      return date.getMonth() === selectedMonth && date.getFullYear() === selectedYear && item.status !== 'deleted';
    });
  }, [submissions, selectedMonth, selectedYear]);

  const chartConfig = useMemo(() => {
    let labels = [];
    let dataPoints = [];

    if (chartMode === "month") {
      const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        labels.push(`${months[selectedMonth].slice(0, 3)} ${i}`);
        const count = submissions.filter(item => {
          const d = new Date(item.created_at);
          return d.getDate() === i && d.getMonth() === selectedMonth && d.getFullYear() === selectedYear && item.status !== 'deleted';
        }).length;
        dataPoints.push(count);
      }
    } else {
      for (let i = timeRange - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        labels.push(d.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
        const count = submissions.filter(item => {
          const itemDate = new Date(item.created_at);
          return itemDate.toDateString() === d.toDateString() && item.status !== 'deleted';
        }).length;
        dataPoints.push(count);
      }
    }
    return { labels, dataPoints };
  }, [submissions, selectedMonth, selectedYear, timeRange, chartMode]);

  const chartData = {
    labels: chartConfig.labels,
    datasets: [
      {
        label: "Messages",
        data: chartConfig.dataPoints,
        borderColor: "#2563eb",
        borderWidth: 3,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#2563eb",
        pointBorderWidth: 2,
        pointRadius: chartMode === "month" ? 2 : 4,
        tension: 0.4,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(37, 99, 235, 0.2)");
          gradient.addColorStop(1, "rgba(37, 99, 235, 0)");
          return gradient;
        },
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94a3b8", font: { size: 10 }, maxRotation: 45, minRotation: 45, autoSkip: true, maxTicksLimit: 15 }
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(226, 232, 240, 0.5)", drawBorder: false },
        ticks: { color: "#94a3b8", font: { size: 11 }, stepSize: 1, precision: 0 }
      }
    }
  };

  const filteredSubmissions = submissions.filter((item) => {
    if (inboxView === "all" && item.status === "deleted") return false;
    if (inboxView === "trash" && item.status !== "deleted") return false;

    const searchTerm = search.toLowerCase();
    const refId = item.id.slice(0, 8).toLowerCase();
    const matchesSearch = item.full_name?.toLowerCase().includes(searchTerm) || item.email?.toLowerCase().includes(searchTerm) || item.subject?.toLowerCase().includes(searchTerm) || refId.includes(searchTerm);
    const itemDate = new Date(item.created_at).toISOString().split('T')[0];
    const matchesDate = filterDate === "" || itemDate === filterDate;
    return matchesSearch && matchesDate;
  });

  const toggleSelect = (id, e) => {
    e.stopPropagation();
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (inboxView === "all") {
      if (!window.confirm(`Move ${selectedIds.length} selected submissions to Trash?`)) return;
      const { error } = await supabase.from("contact_submissions").update({ status: 'deleted' }).in("id", selectedIds);
      if (!error) {
        setSubmissions(prev => prev.map(item => selectedIds.includes(item.id) ? { ...item, status: 'deleted' } : item));
        setSelectedIds([]);
      }
    } else {
      if (!window.confirm(`Permanently delete ${selectedIds.length} selected items? This cannot be undone.`)) return;
      const { error } = await supabase.from("contact_submissions").delete().in("id", selectedIds);
      if (!error) {
        setSubmissions(prev => prev.filter(item => !selectedIds.includes(item.id)));
        setSelectedIds([]);
      }
    }
  };

  const handleBulkRestore = async () => {
    if (selectedIds.length === 0) return;
    const { error } = await supabase.from("contact_submissions").update({ status: 'read' }).in("id", selectedIds);
    if (!error) {
      setSubmissions(prev => prev.map(item => selectedIds.includes(item.id) ? { ...item, status: 'read' } : item));
      setSelectedIds([]);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (inboxView === "all") {
      if (!window.confirm("Move to Trash?")) return;
      const { error } = await supabase.from("contact_submissions").update({ status: 'deleted' }).eq("id", id);
      if (!error) {
        setSubmissions((prev) => prev.map((item) => item.id === id ? { ...item, status: 'deleted' } : item));
      }
    } else {
      if (!window.confirm("Permanently delete this submission?")) return;
      const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
      if (!error) {
        setSubmissions((prev) => prev.filter((item) => item.id !== id));
      }
    }
  };

  const handleRestore = async (id, e) => {
    e.stopPropagation();
    const { error } = await supabase.from("contact_submissions").update({ status: 'read' }).eq("id", id);
    if (!error) {
      setSubmissions((prev) => prev.map((item) => item.id === id ? { ...item, status: 'read' } : item));
    }
  };

  const scrollToSection = (tab) => {
    setActiveTab(tab);
    if (tab === "Dashboard") window.scrollTo({ top: 0, behavior: "smooth" });
    else if (tab === "Inbox" && inboxRef.current) inboxRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleOpenMessage = async (item) => {
    if (item.status === "deleted") {
        setSelectedInquiry(item);
        return;
    }
    setSelectedInquiry(item);
    if (item.status !== "read") {
      const { error } = await supabase.from("contact_submissions").update({ status: "read" }).eq("id", item.id);
      if (!error) {
        setSubmissions((prev) => prev.map((sub) => sub.id === item.id ? { ...sub, status: "read" } : sub));
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_access");
    navigate("/");
  };

  // --- LOADING SCREEN COMPONENT ---
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes reverse-spin { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
          .animate-reverse-spin { animation: reverse-spin 3s linear infinite; }
        `}} />
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400 rounded-full blur-[120px] animate-pulse delay-700"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 border-4 border-blue-100 rounded-2xl"></div>
            <div className="absolute inset-0 border-4 border-blue-600 rounded-2xl animate-spin [animation-duration:3s] border-t-transparent shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
            <div className="absolute inset-4 border-2 border-slate-200 rounded-xl animate-reverse-spin border-b-transparent"></div>
            <ShieldCheck className="absolute inset-0 m-auto text-blue-600 animate-pulse" size={32} />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-xl font-black text-slate-800 tracking-tighter uppercase flex items-center gap-2">
              Syncing <span className="text-blue-600">Admin Portal</span>
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] animate-pulse">Establishing Secure Connection...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative">
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4 p-3 bg-white/40 backdrop-blur-md border border-white/40 rounded-3xl shadow-2xl transition-all duration-300 hover:opacity-100 opacity-60 hover:bg-white/80">
        {[ { name: "Dashboard", icon: <LayoutDashboard size={22} /> }, { name: "Inbox", icon: <Inbox size={22} /> } ].map((tab) => (
          <button key={tab.name} onClick={() => scrollToSection(tab.name)} className={`group relative p-4 rounded-2xl transition-all duration-300 flex items-center justify-center ${activeTab === tab.name ? "bg-blue-600 text-white shadow-lg scale-110" : "text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-md"}`}>
            {tab.icon}
            <span className="absolute right-16 px-3 py-1 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-slate-700">{tab.name}</span>
          </button>
        ))}
      </nav>

      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Contact Management</h1>
              <p className="text-sm text-slate-500 mt-1 uppercase tracking-wider font-semibold opacity-70">Operational Overview & Portal Analytics</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select 
                  value={selectedMonth} 
                  onChange={(e) => {
                    setSelectedMonth(parseInt(e.target.value));
                    setChartMode("month");
                  }}
                  className="appearance-none bg-slate-100 border border-slate-200 text-sm font-bold text-slate-700 py-2 pl-4 pr-10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                >
                  {months.map((month, index) => <option key={month} value={index}>{month}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
              <button onClick={handleLogout} className="px-6 py-2 text-sm font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-all border border-red-100 shadow-sm">Logout</button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-[1600px] mx-auto w-full p-4 md:p-8 space-y-20">
        <section ref={dashboardRef} className="space-y-8 scroll-mt-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <EnterpriseCard title={`Total (${months[selectedMonth].slice(0,3)})`} value={filteredByMonth.length} icon="📊" />
            <EnterpriseCard title="Unread Messages" value={filteredByMonth.filter(i => i.status === "unread").length} icon="✉️" />
            <EnterpriseCard title="Today's Activity" value={submissions.filter(i => i.status !== 'deleted' && new Date(i.created_at).toDateString() === new Date().toDateString()).length} icon="⚡" />
            <EnterpriseCard title="Monthly Total" value={filteredByMonth.length} icon="📈" />
          </div>

          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest flex items-center gap-3">
                  <span className="w-3 h-3 bg-blue-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.4)]"></span>
                  {chartMode === "month" ? `${months[selectedMonth]} Analytics` : "Rolling Days Analytics"}
                </h3>
                <div className="flex items-center gap-2 ml-6 mt-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Last</p>
                  <input type="number" min="1" max="365" value={timeRange} onChange={(e) => { setTimeRange(Number(e.target.value)); setChartMode("days"); }} className="w-12 bg-slate-100 border-none text-[11px] font-black text-blue-600 text-center py-0.5 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Days Analytics</p>
                </div>
              </div>
              <span className="text-[10px] font-black text-slate-500 bg-slate-50 border border-slate-100 px-4 py-1.5 rounded-full shadow-sm">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="h-[350px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </section>

        <section ref={inboxRef} className="space-y-6 pt-10 border-t border-slate-200 scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-2">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Inbox</h2>
              <p className="text-xs text-slate-500 font-semibold tracking-wide opacity-80">Managing portal inquiries and client communications</p>
            </div>
            <div className="relative w-full md:max-w-md">
              <input type="text" placeholder="Search by Name, Email, or Ref ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white border border-slate-300 rounded-lg pl-4 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm" />
            </div>
          </div>

          <div className="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex flex-wrap items-center gap-6 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <div className="flex gap-6">
                <span 
                    onClick={() => {setInboxView("all"); setSelectedIds([])}}
                    className={`pb-1 cursor-pointer transition-all ${inboxView === "all" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-400 hover:text-slate-600"}`}
                >
                    All Email
                </span>
                <span 
                    onClick={() => {setInboxView("trash"); setSelectedIds([])}}
                    className={`pb-1 cursor-pointer transition-all flex items-center gap-1.5 ${inboxView === "trash" ? "text-red-600 border-b-2 border-red-600" : "text-slate-400 hover:text-slate-600"}`}
                >
                    <Trash2 size={12} /> Trash ({submissions.filter(s => s.status === 'deleted').length})
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                {selectedIds.length > 0 && (
                    <>
                        {inboxView === "trash" && (
                             <button 
                                onClick={handleBulkRestore}
                                className="bg-blue-500 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-all shadow-md animate-in fade-in slide-in-from-left-4 duration-300"
                            >
                                <RefreshCcw size={14} /> Restore ({selectedIds.length})
                            </button>
                        )}
                        <button 
                            onClick={handleBulkDelete}
                            className={`${inboxView === 'trash' ? 'bg-slate-800' : 'bg-red-500'} text-white px-4 py-1.5 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all shadow-md animate-in fade-in slide-in-from-left-4 duration-300`}
                        >
                            <Trash2 size={14} /> {inboxView === 'trash' ? 'Delete Permanently' : 'Move to Trash'} ({selectedIds.length})
                        </button>
                    </>
                )}
              </div>

              <div className="ml-auto flex items-center gap-3">
                <span className="text-xs font-semibold normal-case text-slate-500 flex items-center gap-2">
                  <span className="hidden md:inline">Filter by Date:</span>
                  <span className="inline md:hidden">Filter:</span>
                  
                  <div className="relative flex items-center">
                    <Calendar 
                        size={16} 
                        className={`cursor-pointer transition-colors ${filterDate ? 'text-blue-600' : 'text-slate-400 hover:text-blue-600'}`}
                        onClick={() => dateInputRef.current?.showPicker()} 
                    />
                    <input 
                        ref={dateInputRef}
                        type="date" 
                        value={filterDate} 
                        onChange={(e) => setFilterDate(e.target.value)} 
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full md:relative md:opacity-100 md:block md:w-auto md:ml-2 bg-white border border-slate-200 rounded px-2 py-1 text-[11px] font-bold text-slate-700 outline-none focus:border-blue-500 transition-colors" 
                    />
                  </div>
                </span>
                {filterDate && <button onClick={() => setFilterDate("")} className="text-[10px] text-red-500 hover:text-red-700 font-black ml-1 uppercase">CLEAR</button>}
              </div>
            </div>

            <div className="max-h-[700px] overflow-y-auto no-scrollbar divide-y divide-slate-100">
              <div className="bg-slate-50/90 px-6 py-2.5 text-[10px] font-black text-blue-700 uppercase tracking-widest sticky top-0 z-10 backdrop-blur-md border-b border-slate-200">
                {inboxView === 'trash' ? "Trash Bin - Items here are soft-deleted" : filterDate ? `Records for ${new Date(filterDate).toLocaleDateString()}` : "Recent Communications"}
              </div>
              {filteredSubmissions.length === 0 ? ( <div className="p-20 text-center text-slate-400 font-medium italic">No results found for this selection.</div> ) : (
                filteredSubmissions.map((item) => (
                  <div key={item.id} onClick={() => handleOpenMessage(item)} className={`flex items-start gap-3 md:gap-5 p-4 md:p-5 cursor-pointer transition-all border-l-4 group ${item.status === "unread" ? "border-blue-600 bg-blue-50/20" : "border-transparent hover:bg-slate-50"} ${selectedIds.includes(item.id) ? "bg-blue-50/40" : ""} ${item.status === 'deleted' ? 'opacity-75' : ''}`}>
                    <div className="pt-2">
                       <button 
                         onClick={(e) => toggleSelect(item.id, e)}
                         className={`transition-colors duration-200 ${selectedIds.includes(item.id) ? (inboxView === 'trash' ? 'text-red-600' : 'text-blue-600') : 'text-slate-300 group-hover:text-slate-400'}`}
                       >
                         {selectedIds.includes(item.id) ? <CheckSquare size={20} /> : <Square size={20} />}
                       </button>
                    </div>
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white shadow-md ${item.status === "unread" ? "bg-blue-600" : item.status === 'deleted' ? "bg-slate-600" : "bg-slate-400"}`}>{item.full_name?.charAt(0).toUpperCase()}</div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-3 truncate mr-2">
                          <h4 className={`text-sm md:text-base truncate ${item.status === "unread" ? "font-black text-slate-900" : "font-bold text-slate-700"}`}>
                            <HighlightText text={item.full_name} highlight={search} />
                          </h4>
                          <span className="text-slate-300 text-[10px] md:text-[11px] font-bold tracking-widest uppercase shrink-0 mt-0.5">
                              REF: #<HighlightText text={item.id.slice(0, 8).toUpperCase()} highlight={search} />
                          </span>
                        </div>
                        <div className="text-right flex flex-col items-end min-w-[70px] md:min-w-[100px] shrink-0">
                          <span className={`tabular-nums tracking-tight font-black text-xs md:text-lg ${item.status === "unread" ? "text-blue-600" : "text-slate-600"}`}>{new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                          <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{new Date(item.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                      <div className={`text-xs md:text-sm mb-1 truncate ${item.status === "unread" ? "text-slate-900 font-extrabold" : "text-blue-600 font-semibold"}`}>
                        <HighlightText text={item.subject || "No Subject"} highlight={search} />
                      </div>
                      <p className="text-xs md:text-sm text-slate-500 truncate leading-relaxed line-clamp-1 opacity-90">{item.message}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity self-center pr-2 flex items-center gap-2">
                      {item.status === 'deleted' ? (
                        <>
                            <button onClick={(e) => handleRestore(item.id, e)} className="p-2 text-slate-300 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors" title="Restore"><RefreshCcw size={18} /></button>
                            <button onClick={(e) => handleDelete(item.id, e)} className="p-2 text-slate-300 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors" title="Delete Permanently"><Trash2 size={18} /></button>
                        </>
                      ) : (
                        <button onClick={(e) => handleDelete(item.id, e)} className="p-2 text-slate-300 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors" title="Move to Trash"><Trash2 size={18} /></button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      {selectedInquiry && (
        <div className="fixed inset-0 bg-slate-900/40 z-[200] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-[2.5rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden relative animate-in zoom-in-95 duration-300 border border-white flex flex-col">
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 flex-shrink-0 ${selectedInquiry.status === 'deleted' ? 'bg-red-500' : 'bg-blue-600'}`} />
            <div className="p-8 md:p-10 pb-6 flex justify-between items-start flex-shrink-0">
              <div className="flex gap-4 md:gap-6">
                <div className={`h-16 w-16 md:h-20 md:w-20 rounded-[1.5rem] md:rounded-[1.8rem] bg-gradient-to-br flex items-center justify-center text-white font-black text-2xl md:text-3xl shadow-2xl shrink-0 ${selectedInquiry.status === 'deleted' ? 'from-slate-700 to-slate-900 shadow-slate-200' : 'from-blue-600 to-indigo-700 shadow-blue-200'}`}>
                  {selectedInquiry.full_name?.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex wrap items-center gap-2 mb-2">
                    <span className={`px-3 py-1 text-[10px] md:text-[11px] font-black uppercase tracking-widest rounded-md border ${selectedInquiry.status === 'deleted' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                        {selectedInquiry.status === 'deleted' ? 'Deleted Inquiry' : 'Customer Inquiry'}
                    </span>
                    <span className="text-slate-300 text-[10px] md:text-[11px] font-bold tracking-widest uppercase">REF: #<HighlightText text={selectedInquiry.id.slice(0, 8).toUpperCase()} highlight={search} /></span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-1 truncate">
                    <HighlightText text={selectedInquiry.full_name} highlight={search} />
                  </h3>
                  <p className="text-blue-600 text-xs md:text-sm font-bold flex items-center gap-2 truncate"><Mail size={14} /> <HighlightText text={selectedInquiry.email} highlight={search} /></p>
                </div>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="p-2 text-slate-300 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all flex-shrink-0"><X size={28} /></button>
            </div>
            <div className="px-8 md:px-10 py-4 space-y-6 overflow-y-auto custom-scrollbar flex-1">
                {selectedInquiry.status === 'deleted' && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-700">
                        <AlertTriangle size={20} />
                        <p className="text-xs font-bold uppercase tracking-tight">This message is in the trash. Restore it to reply via email.</p>
                    </div>
                )}
                <div className="p-4 md:p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subject</p>
                  <p className="text-sm font-black text-slate-700 uppercase break-words">
                    <HighlightText text={selectedInquiry.subject || "No Subject"} highlight={search} />
                  </p>
                </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${selectedInquiry.status === 'deleted' ? 'bg-red-500' : 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]'}`} /> Inquiry Message
                  </span>
                  <span className="text-slate-500">
                    {new Date(selectedInquiry.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {new Date(selectedInquiry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </span>
                </p>
                <div className="relative p-6 md:p-8 bg-slate-50/30 border-2 border-slate-50 rounded-[2rem] md:rounded-[2.5rem] shadow-inner">
                  <Quote className="absolute right-4 top-4 w-16 h-16 md:w-24 md:h-24 text-slate-100/50 -rotate-12 pointer-events-none" />
                  <span className="relative z-10 italic whitespace-pre-line font-medium leading-relaxed block text-slate-700 text-sm md:text-base break-words">
                    "{selectedInquiry.message}"
                  </span>
                </div>
              </div>
            </div>
            <div className="p-8 md:p-10 pt-4 flex flex-col sm:flex-row items-center gap-4 flex-shrink-0 bg-white border-t border-slate-50">
              <button onClick={() => setSelectedInquiry(null)} className="w-full sm:flex-1 py-4 text-sm font-black text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all uppercase tracking-widest">Dismiss</button>
              {selectedInquiry.status === 'deleted' ? (
                <button 
                    onClick={(e) => { handleRestore(selectedInquiry.id, e); setSelectedInquiry(null); }}
                    className="w-full sm:flex-[2] py-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl uppercase tracking-widest"
                >
                    <RefreshCcw size={20} /> Restore Message
                </button>
              ) : (
                <a href={`mailto:${selectedInquiry.email}`} className="w-full sm:flex-[2] py-4 bg-slate-900 hover:bg-blue-600 text-white text-sm font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl hover:shadow-blue-200 uppercase tracking-widest group">
                    <Mail size={20} className="group-hover:animate-pulse" /> Reply via Email
                </a>
              )}
            </div>
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
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">{value}</h3>
        </div>
        <span className="text-lg md:text-xl opacity-50">{icon}</span>
      </div>
    </div>
  );
}