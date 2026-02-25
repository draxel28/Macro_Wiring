import React from "react";
// 1. IMAGE IMPORTS
import goldrichLogo from "../assets/components/group/goldrich-logo.jpg";
import megaLogo from "../assets/components/group/mega-packaging.png";
import macroLpgLogo from "../assets/components/group/macro-lpg.png";
import macroIndustrialLogo from "../assets/components/group/macro-industrial-logo.png";
import acreLogo from "../assets/components/group/acre-logo.png";
import founderImage from "../assets/components/founder/sirjerry.jpg";
import sapProcessFlow from "../assets/components/process/sap-flow.jpg"; 

import { 
  Target, Globe, Users, ShieldCheck, Factory, 
  Zap, BarChart3, Star, HeartPulse, 
  ChevronRight, Settings, Leaf 
} from "lucide-react";

import "../App.css"; 

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* --- TECH HEADER --- */}
      <div className="tech-header-container text-white py-16 px-6 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 pointer-events-none">
          <div className="motherboard-traces opacity-20"></div>
          <div className="moving-glow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase"
              style={{ textShadow: '0 0 15px rgba(96, 165, 250, 0.6)' }}>
            About Us
          </h1>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-6 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
          <p className="text-blue-100 max-w-3xl mx-auto text-base md:text-lg font-light leading-relaxed">
            Macro Wiring Technologies Co. Inc. – Providing World-Class Interconnect 
            Solutions and Manufacturing Excellence since 1998.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">

        {/* LEADERSHIP */}
        <section className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-2 bg-blue-600 rounded-2xl blur-sm opacity-20"></div>
                <img src={founderImage} alt="JERENATO B. ALFANTE" className="relative rounded-2xl w-full max-w-[300px] border-4 border-white shadow-lg" />
              </div>
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                <Star size={14} fill="currentColor" /> Executive Leadership
              </div>
              <h2 className="text-4xl font-bold text-gray-900 uppercase">Jerenato B. Alfante</h2>
              <p className="text-xl text-blue-600 font-bold uppercase tracking-tight">President and COO</p>
              <p className="text-gray-600 leading-relaxed italic text-lg">
                "Driving innovation and quality excellence in the wire harness industry through dedicated leadership and operational precision."
              </p>
            </div>
          </div>
        </section>

        {/* COMPANY PROFILE */}
        <section className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Factory className="text-blue-600" /> Company Profile
            </h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-sm md:text-base">
              <p>
                Macro Wiring Technologies Co. Inc. is a reliable manufacturer of high-quality wire harnesses.
                We are committed to delivering superior products that meet customer requirements, stakeholder expectations, 
                and regulatory obligations while promoting sustainability.
              </p>
              <p>
                Presently the company is capable of producing wire harnesses ranging 
                from <strong>AWG #32 to 350 MCM</strong>. Our operations are machine-intensive, 
                designed to meet the precision needs of global technology leaders.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <Users className="text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">450+</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Skilled Workers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <BarChart3 className="text-blue-600" size={20}/> Product Specializations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-gray-600">
              <div className="space-y-1">
                <p className="font-bold text-blue-600 text-sm">Home Appliances</p>
                <p className="text-xs">Refrigerators, Freezers, AC units, Washing Machines</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-blue-600 text-sm">Electronics</p>
                <p className="text-xs">Computers, TV, Karaoke, Monitors, AVRs</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-blue-600 text-sm">Automotive</p>
                <p className="text-xs">Small harnesses & specialized wiring</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-blue-600 text-sm">Power Supplies</p>
                <p className="text-xs">UPS & specialized assemblies</p>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="space-y-12">
          <div className="bg-blue-600 text-white p-12 rounded-3xl shadow-xl text-center relative overflow-hidden">
            <Globe className="absolute -right-20 -top-20 text-white/10" size={300} />
            <h2 className="text-2xl font-black uppercase tracking-[0.2em] mb-6">Our Vision</h2>
            <p className="text-blue-50 italic text-xl leading-relaxed max-w-5xl mx-auto">
              "To see the spawning of the Macro Wiring Technologies Co. Inc. logo on the assembly lines of tech companies 
              and allied businesses in the export processing zones of the country, and catch the nod of approval of our 
              customers as they make our wire harnesses and assemblies their own."
            </p>
            <p className="text-[10px] text-blue-200 mt-6 font-bold uppercase tracking-widest">Effective: July 14, 2015</p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-center gap-4 mb-12">
              <Target className="text-blue-600" size={32} />
              <h2 className="text-3xl font-bold text-gray-900 uppercase">Our Mission</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center items-start">
              {[
                { label: "Customer", text: "Macro Wiring Technologies Co. Inc. exist to fully support and completely satisfy the specified needs of its customers in the wiring harness and assemblies business." },
                { label: "Employees", text: "The company appreciates hard work, dedication to service, and loyalty to the company of its employees; in return, the Company guarantees fair compensation, room to grow, training and a healthy work environment." },
                { label: "Owners", text: "The company will pursue targeted growth to keep pace with the evolution of the industry, if not stay ahead." },
                { label: "World", text: "The company is a proud contributor of wire harness components and assemblies to branded electronic products sold all over the world, and will seek allied sectors where it can extend further service." },
                { label: "Environment", text: "Finally, the company subscribes to the worldwide movement for a green planet as a way of ensuring the health and safety of its employees, of their children, and their children's children" }
              ].map((m, i) => (
                <div key={i} className={`space-y-3 ${i !== 0 ? 'md:border-l border-gray-100 md:pl-4' : ''}`}>
                  <h4 className="font-black text-blue-600 uppercase text-[10px] tracking-widest">{m.label}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] text-gray-400 mt-10 font-bold uppercase tracking-widest">Effective: July 14, 2015</p>
          </div>
        </section>

        {/* SAP OPERATIONAL FLOW SECTION */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 uppercase">Operational Excellence</h2>
            <p className="text-gray-500 mt-2">Powered by SAP ERP for end-to-end manufacturing precision.</p>
          </div>
          <div className="bg-white p-4 md:p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-2 group overflow-hidden rounded-2xl">
                <img src={sapProcessFlow} alt="SAP Process Flow" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-blue-600 border-b pb-2">Digital Workflow</h4>
                <div className="space-y-4">
                  {[
                    { title: "Planning", desc: "MRP and Weekly Delivery Order receiving and alignment." },
                    { title: "Warehouse", desc: "Strict Inventory Transfer (ITR) & Staging for zero-waste." },
                    { title: "Production", desc: "Real-time Backflushing (FGTR) and Quality Endorsement." }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="bg-blue-100 text-blue-600 p-2 rounded-lg h-fit"><Settings size={18} /></div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{step.title}</p>
                        <p className="text-xs text-gray-500 leading-tight">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTEGRATED MANAGEMENT SYSTEM (IMS) */}
        <section className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-blue-600"><ShieldCheck size={250} /></div>
          <div className="relative z-10 max-w-4xl mb-12">
            <div className="flex items-center gap-3 text-blue-600 font-black uppercase text-xs tracking-[0.3em] mb-4">
               <ShieldCheck size={18} /> Integrated Management System
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase">IMS Policy</h2>
            <p className="text-gray-600 leading-relaxed border-l-4 border-blue-600 pl-6 text-lg italic">
              "We adopt an Integrated Management System that fosters quality excellence, 
              environmental stewardship, and continuous improvement throughout our operations."
            </p>
            <div className="flex gap-4 mt-6">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-[10px] font-bold">ISO 9001:2015</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-[10px] font-bold">ISO 14001:2015</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-widest">Effectivity Date: July 18, 2025</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {[
              { t: "Customer Focus and Satisfaction", d: "We are committed to understanding and fulfilling customer-specific requirements, industry standards, and applicable statutory and regulatory requirements to ensure consistent delivery of world-class wire harness products and services." },
              { t: "Environmental Protection and Sustainability", d: "We take proactive steps to minimize environmental impacts by promoting resource conservation, responsible waste management, and pollution prevention. We continuously improve our energy efficiency and strive to reduce our carbon footprint across our manufacturing processes." },
              { t: "Stakeholder Engagement", d: "We recognize the importance of addressing the needs and expectations of all relevant stakeholders, including customers, employees, suppliers, regulatory authorities, stakeholders and communities where we operate." },
              { t: "Compliance with Legal and Other Requirements", d: "We ensure strict compliance with applicable legal requirements, customer specifications, environmental regulations, and other obligations relevant to our operations and products." },
              { t: "Energy Initiatives", d: "We are committed to enhance energy efficiency in our facilities adopting energy-saving technologies, optimizing resource utilization, and promoting awareness among employees" },
              { t: "Continuous Improvement and Innovation", d: "We drive continual improvement in quality, environmental performance and operational efficiency by setting measurable objectives, monitoring key performance indicators, and applying risk-based thinking in all processes." },
              { t: "Employee Involvement and Competency Development", d: "We provide training and development programs to ensure all employees are competent, fully aware of their responsibilities, and actively engaged in achieving our quality, environmental, and sustainability goals." }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-100 group">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2 group-hover:text-blue-600">
                  <ChevronRight size={14} className="text-blue-600" /> {item.t}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. ZERO CARBON PROJECT (TZCP) - RESTORED STYLING */}
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

        {/* OCCUPATIONAL HEALTH AND SAFETY (OH&S) */}
        <section className="bg-slate-900 text-white p-10 md:p-16 rounded-[3rem] relative overflow-hidden shadow-2xl">
          <HeartPulse className="absolute -left-20 -bottom-20 text-white/5" size={400} />
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-red-500/10 text-red-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-6 border border-red-500/20">
                Safety First Culture
              </div>
              <h2 className="text-3xl font-bold mb-6 uppercase tracking-tight">Health & Safety Policy</h2>
              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                Macro Wiring Technologies Co. Inc. is committed to providing a safe and healthy workplace for all employees, contractors, and visitors within our manufacturing facilities.
              </p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Effectivity Date: Feb. 01, 2026</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { t: "Safe Conditions", d: "Establish, implement, and maintain safe systems of work, safe facilities, and appropriate controls to eliminate hazard and reduce OH&S risks." },
                { t: "Legal Fulfillment", d: "Comply with all applicable occupational health and safety laws, regulations, and other subscribed requirements relevant to our operations." },
                { t: "Eliminate Hazards", d: "Apply the hierarchy of controls in identifying hazards, assessing risk, and determining effective preventive and proactive measures" },
                { t: "Participation", d: "Ensure active consultation and participation of workers and their representatives in OH&S decision-making, hazard identification, and improvement initiatives." },
                { t: "Continuous Improvement", d: "Continually improve OH&S performance and the effectiveness of the OH&S Management System through objectives, monitoring, audits and management review" },
                { t: "Resources", d: "Ensures workers are competent through appropriate training, awareness, and access to information, and provide adequate resources to support this policy" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors">
                  <p className="font-bold text-blue-400 text-sm mb-2">{item.t}</p>
                  <p className="text-[11px] text-gray-400 leading-tight">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GROUP OF COMPANIES */}
        <section className="py-12 border-t border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 uppercase">The Macro Group of Companies</h2>
            <div className="h-1 w-12 bg-blue-600 mx-auto mt-4 mb-4"></div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 opacity-60 hover:opacity-100 transition-opacity">
            <img src={goldrichLogo} alt="Goldrich" className="h-14 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src={megaLogo} alt="Mega Packaging" className="h-14 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src={macroLpgLogo} alt="Macro LPG" className="h-14 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src={macroIndustrialLogo} alt="Macro Industrial" className="h-14 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src={acreLogo} alt="Acre" className="h-14 w-auto grayscale hover:grayscale-0 transition-all" />
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUs;