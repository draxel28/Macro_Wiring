import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { 
  Trash2, Mail, Search, X, LogOut, 
  ChevronLeft, ChevronRight, Calendar, 
  Filter, RotateCcw, ArrowUp 
} from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  
  // 📅 DATE FILTER STATE
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // 📄 PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ⬆️ SCROLL TO TOP STATE
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const isAuthorized = sessionStorage.getItem("admin_access");
    if (!isAuthorized) navigate("/");
  }, [navigate]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Monitor scroll position for the button
  useEffect(() => {
    const handleScroll = () => {
      // Show/Hide logic
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Overlap prevention (adjusts position when hitting bottom)
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error("Supabase error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation(); 
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (!confirmDelete) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (!error) {
      setSubmissions((prev) => prev.filter((item) => item.id !== id));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_access");
    navigate("/");
  };

  // 🔍 FILTER LOGIC
  const filteredSubmissions = submissions.filter((item) => {
    const query = search.toLowerCase();
    const itemDate = new Date(item.created_at).setHours(0, 0, 0, 0);
    
    const matchesSearch = 
      item.full_name?.toLowerCase().includes(query) ||
      item.email?.toLowerCase().includes(query) ||
      item.subject?.toLowerCase().includes(query) ||
      item.message?.toLowerCase().includes(query);

    let matchesDate = true;
    if (startDate) {
      const start = new Date(startDate).setHours(0, 0, 0, 0);
      matchesDate = matchesDate && itemDate >= start;
    }
    if (endDate) {
      const end = new Date(endDate).setHours(0, 0, 0, 0);
      matchesDate = matchesDate && itemDate <= end;
    }

    return matchesSearch && matchesDate;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setSearch("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 font-sans flex flex-col overflow-x-hidden relative">
      
      <main className="flex-1 p-4 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">
            Contact Submissions
          </h2>
          
          <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white px-3 md:px-4 py-2 md:py-2.5 rounded-xl border border-gray-100 shadow-sm">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 text-red-400 px-3 md:px-4 py-2 rounded-xl hover:bg-red-500/20 transition-all font-bold text-xs md:text-sm"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Search & Date Filter Bar */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              <input
                type="text"
                placeholder="Search keywords..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border border-gray-200 pl-14 pr-6 py-4 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none text-sm shadow-sm"
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-all border ${showFilters ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200'}`}
            >
              <Filter size={18} />
              <span>{showFilters ? 'Hide Dates' : 'Filter Dates'}</span>
            </button>

            {(startDate || endDate || search) && (
              <button 
                onClick={clearFilters}
                className="flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
              >
                <RotateCcw size={18} />
                <span>Reset</span>
              </button>
            )}
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm animate-in slide-in-from-top-2 duration-200">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2">From Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => { setStartDate(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-gray-50 border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2">To Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => { setEndDate(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-gray-50 border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table Content */}
        <div className="pb-10">
          {loading ? (
            <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div></div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="p-6 text-[10px] font-black text-gray-400 uppercase">Date</th>
                        <th className="p-6 text-[10px] font-black text-gray-400 uppercase">Sender</th>
                        <th className="p-6 text-[10px] font-black text-gray-400 uppercase">Subject</th>
                        <th className="p-6 text-[10px] font-black text-gray-400 uppercase text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {currentItems.length > 0 ? currentItems.map((item) => (
                        <tr 
                          key={item.id} 
                          onClick={() => setSelectedInquiry(item)}
                          className="hover:bg-blue-50/30 transition-all cursor-pointer group"
                        >
                          <td className="p-6 text-sm font-bold text-gray-400">{new Date(item.created_at).toLocaleDateString()}</td>
                          <td className="p-6">
                            <div className="font-black text-gray-900 text-xs uppercase">{item.full_name}</div>
                            <div className="text-xs text-blue-500">{item.email}</div>
                          </td>
                          <td className="p-6 text-sm font-medium text-gray-600 truncate max-w-[200px]">{item.subject}</td>
                          <td className="p-6 text-right">
                            <button onClick={(e) => handleDelete(item.id, e)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all">
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="4" className="p-20 text-center text-gray-400 font-bold">No results found for your filters.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-2">
                  <p className="text-xs font-bold text-gray-400">
                    Showing <span className="text-gray-900">{indexOfFirstItem + 1}</span> to <span className="text-gray-900">{Math.min(indexOfLastItem, filteredSubmissions.length)}</span> of {filteredSubmissions.length}
                  </p>
                  <div className="flex gap-2">
                    <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 shadow-sm">
                      <ChevronLeft size={18} />
                    </button>
                    <div className="flex items-center px-4 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-900 shadow-sm">
                      {currentPage} / {totalPages}
                    </div>
                    <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 shadow-sm">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Modal View */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedInquiry(null)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="p-8 lg:p-10 space-y-6">
              <div className="flex justify-between items-start border-b border-gray-100 pb-6">
                <div>
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Message Detail</p>
                  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{selectedInquiry.full_name}</h3>
                </div>
                <button onClick={() => setSelectedInquiry(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"><X size={24} /></button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Email</p><p className="font-bold">{selectedInquiry.email}</p></div>
                <div><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Date</p><p className="font-bold">{new Date(selectedInquiry.created_at).toLocaleString()}</p></div>
              </div>
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-700 font-bold">{selectedInquiry.subject}</div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 min-h-[150px]">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedInquiry.message}</p>
              </div>
              <div className="flex gap-3">
                <a href={`mailto:${selectedInquiry.email}`} className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase text-xs flex items-center justify-center gap-2 hover:bg-blue-700 transition-all">
                  <Mail size={16} /> Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- GLASSMORPHISM SCROLL TO TOP BUTTON --- */}
      <button
        onClick={scrollToTop}
        className={`fixed z-[90] p-4 
          bg-white/20 backdrop-blur-md text-gray-800 
          rounded-full shadow-xl border border-white/40
          transition-all duration-500 
          hover:bg-blue-600 hover:text-white hover:border-transparent hover:-translate-y-2 
          active:scale-95 flex items-center justify-center 
          ${isAtBottom ? 'bottom-24 right-8' : 'bottom-8 right-8'}
          ${showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-50 translate-y-10 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
      
    </div>
  );
}