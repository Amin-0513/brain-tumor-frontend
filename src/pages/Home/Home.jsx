import React from "react";
import Navbar from "../../Components/Navbar";
import Hero from "../../Components/Hero";
import Features from "../../Components/Features";
import HowItWorks from "../../Components/Section2";
import Footer from "../../Components/Footer";
function Home(){
    return(
        <div>
            <Navbar/>
            <Hero/>
            <Features/>
            <HowItWorks/>
            <Footer/>
          
        </div>

    )
}
export default Home