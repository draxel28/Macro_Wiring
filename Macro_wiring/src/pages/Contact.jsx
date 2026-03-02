import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { ArrowUp, Clock, Phone, Mail } from "lucide-react"; 

export default function Contact() {
  /* <Supabase>*/
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // --- SCROLL TO TOP STATE ---
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Monitor scroll position
  useEffect(() => {
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const { error } = await supabase.from("contact_submissions").insert([
      {
        full_name: fullName,
        email: email,
        subject: subject,
        message: message,
      },
    ]);

    if (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
    } else {
      setSuccess(true);
      setFullName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }

    setLoading(false);
  };

  const handleQuotationClick = () => {
    setSubject("Request for Quotation");
    setMessage(
      `Good day,\n\nWe would like to request a quotation for the following:\n\nProduct/Service:\nEstimated Quantity:\nTarget Delivery Date:\n\nPlease advise on pricing, lead time, and terms.\n\nThank you.`
    );

    const formSection = document.getElementById("contact-form");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white relative">
      <div className="tech-header-container text-white py-16 px-6 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 pointer-events-none">
          <div className="motherboard-traces opacity-20"></div>
          <div className="moving-glow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1
            className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase"
            style={{ textShadow: "0 0 15px rgba(96, 165, 250, 0.6)" }}
          >
            Contact Us
          </h1>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-6 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
          <p className="text-blue-100 max-w-3xl mx-auto text-base md:text-lg font-light leading-relaxed">
            We welcome business inquiries, partnerships, and technical
            collaboration opportunities. Our team will respond promptly to your
            request.
          </p>
        </div>
      </div>

      <div className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* LEFT SIDE – CORPORATE DETAILS */}
            <div className="space-y-12">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">
                  Contact
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Inquiry Section */}
                  <div>
                    <p className="text-gray-800 font-semibold mb-3 uppercase text-xs tracking-wider">Inquiries</p>
                    <div className="space-y-3 text-gray-600 text-sm">
                      <a href="tel:+63464377204" className="flex items-center gap-3 hover:text-blue-600 transition">
                        <Phone size={14} className="text-blue-600" /> (+63 46) 437-7204
                      </a>
                      <a href="tel:+63464772499" className="flex items-center gap-3 hover:text-blue-600 transition">
                        <Phone size={14} className="text-blue-600" /> (+63 46) 477-2499
                      </a>
                      <a href="mailto:sales@macrowiring.co" className="flex items-center gap-3 hover:text-blue-600 transition pt-1">
                        <Mail size={14} className="text-blue-600" /> sales@macrowiring.co
                      </a>
                    </div>
                  </div>

                  {/* Availability Hours Section */}
                  <div>
                    <p className="text-gray-800 font-semibold mb-3 uppercase text-xs tracking-wider flex items-center gap-2">
                       Availability Hours
                    </p>
                    <div className="grid grid-cols-1 gap-2 text-gray-600 text-sm font-medium">
                      <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-md border border-slate-100">
                        <Clock size={12} className="text-blue-500" /> 6:00 AM - 3:00 PM
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-md border border-slate-100">
                        <Clock size={12} className="text-blue-500" /> 7:00 AM - 4:00 PM
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-md border border-slate-100">
                        <Clock size={12} className="text-blue-500" /> 6:00 PM - 3:00 AM
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-md border border-slate-100">
                        <Clock size={12} className="text-blue-500" /> 7:00 PM - 4:00 AM
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={handleQuotationClick}
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-blue-200"
                  >
                    Request a Quotation
                  </button>
                </div>
              </div>

              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">
                  Location
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Lot 3 Block 17 Phase 4 <br />
                  Cavite Economic Zone <br />
                  Rosario, Cavite <br />
                  Philippines 4106
                </p>
                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  <iframe
                    title="Macro Wiring Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3864.6756201314954!2d120.89832747585093!3d14.417244986048166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33962d398935c103%3A0xc664980755a5b565!2sCavite%20Economic%20Zone!5e0!3m2!1sen!2sph!4v1709572000000!5m2!1sen!2sph"
                    width="100%"
                    height="200"
                    loading="lazy"
                    className="w-full"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE – CLEAN FORM CARD */}
            <div
              id="contact-form"
              className="bg-gray-50 border border-gray-200 p-10 rounded-2xl shadow-sm"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Submit an Inquiry
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
                {success && (
                  <p className="text-green-600 mt-4 font-medium">
                    Your message has been submitted successfully.
                  </p>
                )}
                {error && (
                  <p className="text-red-600 mt-4 font-medium">{error}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed z-50 p-4 
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