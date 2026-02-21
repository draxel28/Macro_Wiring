import "./App.css";
import Navbar from "./assets/components/Header";
import Hero from "./assets/components/Hero";
import SectionA from "./assets/components/section_a.jsx";
import SectionB from "./assets/components/section_b.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <SectionA />
      <SectionB />
    </>
  );
}

export default App;
