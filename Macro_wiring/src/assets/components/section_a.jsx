import { useState, useEffect } from 'react';
import { History, ShieldCheck, Globe, Cog, X, CheckCircle2, Search } from "lucide-react";

// --- IMAGE IMPORTS ---

// Certification Images (Updated to folder path)
import bestImg from "./certificates/BEST.png";
import bestEmployerImg from "./certificates/best-employer.png";
import ecovadisImg from "./certificates/eco-vadis.png";
import iso9001Img from "./certificates/iso-9001.png";
import iso14001Img from "./certificates/iso-14001.png";
import rohsImg from "./certificates/rohs-reach.png";
import seipiImg from "./certificates/seipi-logo.png";
import ulImg from "./certificates/ul-logo.png";

// Customer Logos (Inside customers folder)
import schneiderImg from "./customers/Schneider_Electric.png";
import apcImg from "./customers/apc-logo.png";
import arkrayImg from "./customers/ARKRAY.jpg";
import bomaxImg from "./customers/bomax-logo.png";
import edgeImg from "./customers/edge-logo.png";
import emsImg from "./customers/ems.png";
import grandsunImg from "./customers/GRANDSUN.png";
import ibsImg from "./customers/ibs-logo.png";
import imesImg from "./customers/imes.png";
import imiImg from "./customers/imi-logo.png";
import ionicsImg from "./customers/ionics-logo.png";
import juyoungImg from "./customers/ju-young-logo.png";
import rotakonImg from "./customers/rotakan-logo.png";
import schaffnerImg from "./customers/schaffner-logo.png";
import shinkozanImg from "./customers/shinkozan-logo.png";
import veerImg from "./customers/VEER-O-METAL.png";
import wyntronImg from "./customers/wyntroninclogo.png";

function SectionA() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  // Fix for the "Stuck/Stock" scrolling issue:
  // Disables body scroll when a modal is active.
  useEffect(() => {
    if (selectedCard || fullscreenImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedCard, fullscreenImage]);

const cardData = [
    {
      id: 1,
      icon: <History className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mb-4 transition group-hover:text-blue-400" />,
      title: "Company History",
      shortDesc: "Established in 2005, Macro Wiring has grown into a 100% Filipino-owned multi-plant leader.",
      isTimeline: true,
      timeline: [
        { date: "August 2005", text: "Establishment: Authorized by PEZA to operate within the Cavite Economic Zone (Cert: 05-49)." },
        { date: "Oct - Nov 2005", text: "Legal Foundation: Registered with the BIR and SEC (SEC# CS200513165)." },
        { date: "February 2006", text: "UL Recognition: Achieved status as a UL-Recognized manufacturer for Wire Harness Production." },
        { date: "May 2011", text: "Global Standards: Certified in ISO 14001 (Environmental) and ISO 9001 (Quality) systems." },
        { date: "November 2011", text: "Scaling Up: Expanded production area by 100% to accommodate surging global demand." },
        { date: "March 2013", text: "Product Diversification: Gained UL recognition specifically for Power Cord Production." },
        { date: "November 2013", text: "Efficiency: Adopted LEAN Management systems to optimize industrial cycles." },
        { date: "February 2014", text: "Excellence Sustained: Successful re-certification of ISO 9001 and ISO 14001 standards." },
        { date: "July 2015", text: "Multi-Plant Operation: Opened 'Plant 2', a 1,216 sqm facility for increased production and warehousing." },
        { date: "2019", text: "Green Initiative: Launched the Zero Carbon Project with a 5-year sustainability roadmap." },
        { date: "2024", text: "Sustainability Success: Achieved a 58% reduction in emissions intensity, exceeding original targets." },
      ],
      closing: "From 2005 to today, we continue to align with UN Sustainable Development Goals and global manufacturing excellence."
    },
    {
      id: 2,
      icon: <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mb-4 transition group-hover:text-blue-400" />,
      title: "Certified Quality",
      shortDesc: "Our commitment to excellence is backed by global certifications and standards.",
      isGallery: true,
      gallery: [
        { img: iso9001Img, alt: "ISO 9001" },
        { img: iso14001Img, alt: "ISO 14001" },
        { img: ulImg, alt: "UL Logo" },
        { img: rohsImg, alt: "ROHS REACH" },
        { img: ecovadisImg, alt: "ECOVADIS" },
        { img: seipiImg, alt: "SEIPI" },
        { img: bestImg, alt: "BEST" },
        { img: bestEmployerImg, alt: "BEST EMPLOYER" },
      ]
    },
    {
      id: 3,
      icon: <Globe className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mb-4 transition group-hover:text-blue-400" />,
      title: "Global Reach",
      shortDesc: "Trusted partner for world-class brands and multinational corporations.",
      isGallery: true,
      gallery: [
        { img: schneiderImg, alt: "Schneider Electric" },
        { img: apcImg, alt: "APC" },
        { img: arkrayImg, alt: "ARKRAY" },
        { img: bomaxImg, alt: "BOMAX" },
        { img: edgeImg, alt: "Edge" },
        { img: emsImg, alt: "EMS" },
        { img: grandsunImg, alt: "Grandsun" },
        { img: ibsImg, alt: "IBS" },
        { img: imesImg, alt: "IMES" },
        { img: imiImg, alt: "IMI" },
        { img: ionicsImg, alt: "Ionics" },
        { img: juyoungImg, alt: "Ju Young" },
        { img: rotakonImg, alt: "Rotakon" },
        { img: schaffnerImg, alt: "Schaffner" },
        { img: shinkozanImg, alt: "Shinkozan" },
        { img: veerImg, alt: "Veer-O-Metal" },
        { img: wyntronImg, alt: "Wyntron Inc" },
      ]
    },
{
      id: 4,
      icon: <Cog className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mb-4 transition group-hover:text-blue-400" />,
      title: "Operational Excellence",
      shortDesc: "Machine-intensive production with a workforce of 500+ dedicated professionals.",
      longDesc: "Macro Wiring Technologies operates with high-precision systems and Lean Management, specializing in fabrication ranging from AWG #32 to 350 MCM for the automotive and energy sectors.",
      points: [
        "Massive Workforce: 450+ skilled production workers and 50+ specialized admin staff.",
        "Precision Range: Capable of producing harnesses from AWG #32 up to 350 MCM.",
        "Eco-Friendly: 58% reduction in emissions intensity since 2019 through the Zero Carbon Project.",
        "Industrial Reach: Serving Electronics, Automotive, Telecommunications, and Energy industries."
      ]
    }
  ];

  return (
    <section className="bg-white text-gray-900 py-20 px-6 relative">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-400 uppercase tracking-widest mb-3 font-semibold">Why Choose Us?</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-16 leading-tight">The Best Wiring Company <br className="hidden md:block" /> in Cavite</h2>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cardData.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:bg-gray-800 hover:-translate-y-2 cursor-pointer text-left flex flex-col h-full"
            >
              {card.icon}
              <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-white">{card.title}</h3>
              <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed mb-6">{card.shortDesc}</p>
              <div className="mt-auto text-blue-600 font-bold text-xs uppercase group-hover:text-blue-400">View Details →</div>
            </div>
          ))}
        </div>
      </div>

      {/* --- PRIMARY MODAL --- */}
      {selectedCard && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setSelectedCard(null)}></div>
          
          <div className="relative bg-white w-full max-w-4xl max-h-full overflow-y-auto rounded-3xl shadow-2xl animate-in zoom-in duration-200">
            {/* Sticky Header for Modal */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md px-8 py-6 flex justify-between items-center border-b z-20">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{selectedCard.title}</h2>
              <button onClick={() => setSelectedCard(null)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-8 md:p-12">
              {/* GALLERY VIEW (Certs & Global Reach) */}
              {selectedCard.isGallery ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {selectedCard.gallery.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="group/item flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 transition cursor-zoom-in relative"
                      onClick={() => setFullscreenImage(item)}
                    >
                      <img src={item.img} alt={item.alt} className="max-h-20 w-auto object-contain transition group-hover/item:scale-110" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover/item:opacity-100 transition rounded-xl">
                          <Search className="text-blue-600 w-6 h-6" />
                      </div>
                      <span className="mt-3 text-[10px] font-bold text-gray-400 uppercase text-center">{item.alt}</span>
                    </div>
                  ))}
                </div>
              ) : selectedCard.isTimeline ? (
                /* HISTORY TIMELINE VIEW */
                <div className="space-y-6 text-left">
                   
                  <div className="border-l-2 border-blue-500 ml-3 space-y-8 pb-4">
                    {selectedCard.timeline.map((item, idx) => (
                      <div key={idx} className="relative pl-8">
                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm" />
                        <span className="block text-sm font-bold text-blue-600 uppercase tracking-tight">{item.date}</span>
                        <p className="text-gray-700 mt-1 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 p-6 bg-blue-50 rounded-2xl italic text-blue-900 text-sm">
                    {selectedCard.closing}
                  </div>
                </div>
              ) : (
                /* OPERATIONAL EXCELLENCE VIEW */
                <div className="text-left">
                  <p className="text-lg text-gray-600 mb-10 leading-relaxed border-l-4 border-blue-600 pl-6 italic">
                    {selectedCard.longDesc}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedCard.points.map((p, i) => (
                      <div key={i} className="flex items-start gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium leading-snug">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button 
                onClick={() => setSelectedCard(null)} 
                className="mt-12 w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg active:scale-95"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- FULLSCREEN LIGHTBOX --- */}
      {fullscreenImage && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md transition-all" onClick={() => setFullscreenImage(null)}>
          <button onClick={() => setFullscreenImage(null)} className="absolute top-8 right-8 text-white flex items-center gap-2 font-bold hover:text-blue-400 transition scale-90 hover:scale-100">
             CLOSE <X className="w-10 h-10" />
          </button>
          
          <div className="max-w-4xl w-full flex flex-col items-center animate-in zoom-in duration-300">
            <img src={fullscreenImage.img} alt={fullscreenImage.alt} className="max-h-[75vh] w-auto shadow-2xl rounded-lg bg-white p-6" />
            <h3 className="mt-8 text-white text-2xl font-bold tracking-widest uppercase text-center px-4">
              {fullscreenImage.alt}
            </h3>
          </div>
        </div>
      )}
    </section>
  );
}

export default SectionA;