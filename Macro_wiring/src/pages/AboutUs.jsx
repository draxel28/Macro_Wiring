import React from "react";
import { 
  Target, Globe, Users, ShieldCheck, Leaf, Factory, 
  Zap, Award, Briefcase, BarChart3, UserCheck, Star 
} from "lucide-react";

// Image import based on your directory structure
import founderImage from "../assets/components/founder/sirjerry.jpg";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. HERO HEADER */}
      <div className="bg-gray-900 text-white py-24 px-6 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">About Us</h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            Macro Wiring Technologies Co. Inc. – Providing World-Class Interconnect 
            Solutions and Manufacturing Excellence since 1998.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">
        
        {/* 2. COMPANY PROFILE SECTION */}
        <section className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Factory className="text-blue-600" /> Company Profile
            </h2>
            <div className="text-gray-600 space-y-4 leading-relaxed">
              <p>
                Macro Wiring Technologies Co. Inc.'s initial production concentration are wire harnesses 
                and assemblies for power supply and electrical components. We also produce wire harnesses 
                for the electrical appliances, electronic equipments, and automotives.
              </p>
              <p>
                Presently the company is capable of producing wire harnesses of wire sizes ranging 
                from <strong>AWG #32 to 350 MCM</strong>. Our operation is machine-intensive, 
                geared in the subcontracting of electronic product assemblies and sub-assemblies 
                for companies located inside Export Processing Zones.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <Users className="text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">450+</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Skilled Workers</p>
                </div>
              </div>
              <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <Briefcase className="text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">50+</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Admin Staff</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Lines Card */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <BarChart3 className="text-blue-600" size={20}/> Product Specializations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-gray-600">
              <div className="space-y-1">
                <p className="font-bold text-blue-600 text-sm">Home Appliances</p>
                <p className="text-xs">Ref, Freezers, AC, Washing Machines, Gas Ranges</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-blue-600 text-sm">Electronics</p>
                <p className="text-xs">Computers, TV, Karaoke, Monitors, AVRs</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-blue-600 text-sm">Telecommunications</p>
                <p className="text-xs">Telephone, PCBS, Semiconductors</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-blue-600 text-sm">Automotive</p>
                <p className="text-xs">Small harnesses & specialized wiring</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-blue-600 text-sm">Power Supplies</p>
                <p className="text-xs">UPS & specialized assemblies</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-blue-600 text-sm">Wire Trading</p>
                <p className="text-xs">Bulk supply and distribution</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. LEADERSHIP SECTION */}
        <section className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-2 bg-blue-600 rounded-2xl blur-sm opacity-20"></div>
                <img 
                  src={founderImage} 
                  alt="JERENATO B. ALFANTE" 
                  className="relative rounded-2xl w-full max-w-[300px] h-auto object-cover border-4 border-white shadow-lg"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                <Star size={14} fill="currentColor" /> Executive Leadership
              </div>
              <h2 className="text-4xl font-bold text-gray-900">JERENATO B. ALFANTE</h2>
              <p className="text-xl text-blue-600 font-bold uppercase tracking-tight">President and CEO</p>
              <div className="h-1 w-20 bg-blue-600 mx-auto md:mx-0 rounded-full my-4"></div>
              <p className="text-gray-600 leading-relaxed italic text-lg">
                Driving innovation and quality in the wire harness industry, ensuring 
                Macro Wiring Technologies Co. Inc. remains a trusted name for stakeholders 
                globally.
              </p>
            </div>
          </div>
        </section>

        {/* 4. VISION & MISSION */}
        <section className="space-y-12">
          <div className="bg-gray-900 text-white p-12 rounded-3xl shadow-xl text-center relative overflow-hidden">
            <Globe className="absolute -right-20 -top-20 text-white/5" size={300} />
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-gray-300 italic text-xl leading-relaxed max-w-5xl mx-auto">
              "To see the spawning of the Macro Wiring Technologies Co. Inc. logo on the assembly lines 
              of technology companies and allied businesses in the export processing zones of the country, 
              and catch the nod of approval of our customers as they make our wire harnesses and assemblies their own."
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-center gap-4 mb-12">
              <Target className="text-blue-600" size={40} />
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center items-start">
              {[
                { label: "Customers", text: "To fully support and completely satisfy the specified needs of its customers in the business." },
                { label: "Employees", text: "Appreciates dedication and guarantees fair compensation, training, and a healthy work environment." },
                { label: "Owners", text: "Pursue targeted growth to keep pace with the evolution of the industry and stay ahead." },
                { label: "World", text: "Proud contributor to branded electronic products sold all over the world via allied sectors." },
                { label: "Environment", text: "Subscribing to the green planet movement for the safety of future generations." }
              ].map((m, i) => (
                <div key={i} className={`space-y-3 ${i !== 0 ? 'md:border-l border-gray-100 md:pl-4' : ''}`}>
                  <h4 className="font-black text-blue-600 uppercase text-[10px] tracking-widest">{m.label}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CSR & IMS POLICY */}
        <section className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">CSR & Sustainability Statement</h2>
            <p className="text-gray-600 italic leading-relaxed text-lg border-l-4 border-blue-600 pl-6 text-left">
              “At Macro Wiring Technologies Co. Inc., we are committed to ethical manufacturing, 
              environmental responsibility, and sustainable growth. We align our operations 
              with the United Nations Global Compact and support the UN Sustainable Development Goals.”
            </p>
          </div>

          <div className="space-y-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <ShieldCheck className="text-green-600" /> Integrated Management System (IMS)
              </h3>
              <div className="flex gap-2">
                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">ISO 9001:2015</span>
                <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">ISO 14001:2015</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { t: "Customer Satisfaction", d: "Understanding requirements to ensure consistent delivery of world-class products." },
                { t: "Environmental Stewardship", d: "Proactive steps to minimize impact through resource conservation and waste management." },
                { t: "Stakeholder Engagement", d: "Addressing needs of customers, employees, suppliers, and the local community." },
                { t: "Legal Compliance", d: "Strict adherence to statutory requirements, regulations, and customer specifications." },
                { t: "Energy Efficiency", d: "Adopting energy-saving technologies and optimizing resource utilization." },
                { t: "Continuous Improvement", d: "Setting measurable objectives and applying risk-based thinking in all processes." }
              ].map((item, idx) => (
                <div key={idx} className="group p-6 bg-gray-50 rounded-2xl hover:bg-blue-600 transition-colors duration-300">
                  <p className="font-bold text-gray-900 group-hover:text-white mb-2">{item.t}</p>
                  <p className="text-xs text-gray-500 group-hover:text-blue-100 leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. ZERO CARBON PROJECT (TZCP) */}
        <section className="bg-green-50 p-10 md:p-16 rounded-[3rem] border border-green-100 relative overflow-hidden">
          <Leaf className="absolute -right-16 -bottom-16 text-green-200 opacity-20" size={350} />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-bold text-green-900 flex items-center gap-3">
                  <Zap className="text-green-600" /> The Zero Carbon Project
                </h2>
                <p className="text-green-800 text-sm mt-2 font-medium">Goal: 50% Intensity Reduction Ambition by 2024</p>
              </div>
              <div className="bg-green-600 text-white px-10 py-4 rounded-2xl font-black text-2xl shadow-xl shadow-green-200 animate-pulse">
                58% REDUCED
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Base Year Card */}
              <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-white">
                <h4 className="font-black text-gray-400 uppercase text-xs mb-6 tracking-[0.2em]">Base Year (2019)</h4>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm"><span>Scope 1 (tCO2e)</span><span className="font-mono">71.97</span></div>
                  <div className="flex justify-between text-sm"><span>Scope 2 (tCO2e)</span><span className="font-mono">268.74</span></div>
                  <div className="flex justify-between border-t border-gray-100 pt-6 font-bold text-2xl text-gray-900">
                    <span>Total Carbon</span><span>340.71</span>
                  </div>
                </div>
              </div>

              {/* Reporting Year Card */}
              <div className="bg-white p-8 rounded-3xl border-2 border-green-500 shadow-2xl shadow-green-100">
                <h4 className="font-black text-green-600 uppercase text-xs mb-6 tracking-[0.2em]">Reporting Year (2024)</h4>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm"><span>Scope 1 (tCO2e)</span><span className="font-mono font-bold text-green-600">59.35</span></div>
                  <div className="flex justify-between text-sm"><span>Scope 2 (tCO2e)</span><span className="font-mono font-bold text-green-600">88.00</span></div>
                  <div className="flex justify-between border-t border-green-100 pt-6 font-bold text-3xl text-green-600">
                    <span>Total Carbon</span><span>147.35</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-center text-green-800 text-sm mt-12 font-bold italic max-w-2xl mx-auto">
              "We managed to achieve an intensity reduction of 58% (per unit of revenue) against our 2019 base year."
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUs;