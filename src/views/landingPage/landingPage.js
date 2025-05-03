import React from "react";
import Header from "../../components/navbar/header";
import Footer from "../../components/footer/footer2";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";
import Page4 from "./page4";
import Page5 from "./page5";

export default function LandingPage() {
  return (
    <div className="overflow-hidden text-white h-full w-full bg-[#172631]  font-poppins">
      <div className="h-full w-screen text-white  from-[#0D3225] via-[#172631] to-[#545767]">
        <Header />
        <Page1 />
      </div>

      <Page2/>
      <Page3/>
      <Page4/>
      <Page5/>
      <Footer />
    </div>
  );
}
