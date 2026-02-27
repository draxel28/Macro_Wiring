import React from "react";
import { useState } from "react";
import { supabase } from "../lib/supabse";

export default function Contact() {
  /* <Supabase>*/
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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

  /* function for quotation*/

  const handleQuotationClick = () => {
    setSubject("Request for Quotation");

    setMessage(
      `Good day,

We would like to request a quotation for the following:

Product/Service:
Estimated Quantity:
Target Delivery Date:

Please advise on pricing, lead time, and terms.

Thank you.`,
    );

    const formSection = document.getElementById("contact-form");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white">
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

      {/* MAIN CONTACT SECTION */}
      <div className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-16">
            {/* LEFT SIDE – CORPORATE DETAILS */}

            <div className="space-y-12">
              {/* CONTACT */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">
                  Contact
                </h3>

                <p className="text-gray-800 font-semibold mb-3">Inquiries</p>

                <div className="space-y-3 text-gray-600">
                  {/* Phone 1 */}
                  <a
                    href="tel:+63464377204"
                    className="flex items-center gap-3 hover:text-blue-600 transition"
                  >
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.516 2.065a2 2 0 01-.45 1.916l-1.27 1.27a16 16 0 006.586 6.586l1.27-1.27a2 2 0 011.916-.45l2.065.516A2 2 0 0119 18.72V21a2 2 0 01-2 2h-1C7.716 23 1 16.284 1 8V7a2 2 0 012-2z"
                      />
                    </svg>
                    (+63 46) 437-7204
                  </a>

                  {/* Phone 2 */}
                  <a
                    href="tel:+63464772499"
                    className="flex items-center gap-3 hover:text-blue-600 transition"
                  >
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.516 2.065a2 2 0 01-.45 1.916l-1.27 1.27a16 16 0 006.586 6.586l1.27-1.27a2 2 0 011.916-.45l2.065.516A2 2 0 0119 18.72V21a2 2 0 01-2 2h-1C7.716 23 1 16.284 1 8V7a2 2 0 012-2z"
                      />
                    </svg>
                    (+63 46) 477-2499
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:sales@macrowiring.co"
                    className="flex items-center gap-3 hover:text-blue-600 transition mt-4"
                  >
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 12H8m8 0l-4 4m4-4l-4-4M4 6h16v12H4z"
                      />
                    </svg>
                    sales@macrowiring.co
                  </a>
                </div>

                {/* Request Quotation Button */}
                <div className="mt-6">
                  <button
                    onClick={handleQuotationClick}
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                  >
                    Request a Quotation
                  </button>
                </div>
              </div>

              {/* LOCATION */}
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

                {/* Mini Google Map */}
                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  <iframe
                    title="Macro Wiring Location"
                    src="https://www.google.com/maps?q=Cavite%20Economic%20Zone%20Rosario%20Cavite&output=embed"
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
    </div>
  );
}
