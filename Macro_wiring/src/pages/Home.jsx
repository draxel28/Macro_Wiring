import Hero from "../assets/components/Hero";
import SectionA from "../assets/components/section_a";
import SectionB from "../assets/components/section_b";
import SectionD from "../assets/components/section_d";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Hero />
      <SectionA />
      <SectionB />
      <SectionD />
    </>
  );
};

export default Home;
