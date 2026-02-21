import "./App.css";
import Navbar from "./assets/components/Header";
import Hero from "./assets/components/Hero";
import SectionA from "./assets/components/section_a.jsx";
import SectionB from "./assets/components/section_b.jsx";
import SectionD from "./assets/components/section_d.jsx";
import Footer from "./assets/components/footer.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <SectionA />
      <SectionB />
      <SectionD />
      <Footer />
    </>
  );
}

export default App;
