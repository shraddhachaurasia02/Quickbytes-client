import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Navbar from "../components/common/Navbar";
import FeaturedSection from "../components/dashboard/FeaturedSection";
import Footer from "../components/common/Footer";

import Admin from "../components/landing/Admin";
// import Hero3D from "../components/landing/Hero3D";

function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4">
        {/* <Hero3D /> */}
        <section className="min-h-screen flex justify-center items-center px-4 py-12">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:items-center">
    
    {/* Content Side */}
    <div className="flex flex-col gap-8 text-center lg:text-left order-2 lg:order-1">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight text-pretty leading-tight backdrop-blur-sm bg-white/5 rounded-3xl px-8 py-6 border border-white/10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] hover:shadow-[0_45px_80px_-15px_rgba(0,0,0,0.5)] transition-all duration-300">
        Fuel your <span style={{ color: "#FFBF00", textShadow: "0 0 20px rgba(255, 191, 0, 0.3)" }}>grind</span>, one <span style={{ color: "#FFBF00", textShadow: "0 0 20px rgba(255, 191, 0, 0.3)" }}>bite</span> at a time
      </h1>
      
      <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
        Skip the queues, order ahead, and fuel your campus life with delicious meals ready when you are.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start max-w-md mx-auto lg:mx-0">
        <Link className="flex-1" to="/signup">
          <Button className="w-full bg-gradient-to-r from-[#477023] to-[#5a8c2a] hover:from-[#3d5f1f] hover:to-[#4a7324] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 py-3 px-6 text-base font-medium rounded-xl" color="primary">
            Get Started
          </Button>
        </Link>
        <Link className="flex-1" to="/dashboard">
          <Button className="w-full !bg-[#477023] border-2 border-[#477023] text-[#477023] hover:!bg-[#E49B0F] hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 py-3 px-6 text-base font-medium rounded-xl" color="primary">
            View Menu
          </Button>
        </Link>
      </div>
    </div>
    
    {/* Image Side */}
    <div className="flex justify-center items-start lg:items-center order-1 lg:order-2 -mt-8 lg:-mt-28">
  <div className="relative group">
    <div className="absolute -inset-5 bg-gradient-to-r from-[#FFBF00]/20 to-[#477023]/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
    <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(0,0,0,0.3),0_8px_16px_-4px_rgba(0,0,0,0.2)] ring-4 ring-white/20 backdrop-blur-sm bg-white/10 group-hover:ring-white/30 group-hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.4),0_12px_24px_-6px_rgba(0,0,0,0.25)] transition-all duration-500">
      <img 
        src="/cook.png" 
        alt="Professional chef preparing fresh campus meals" 
        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
    </div>
  </div>
</div>
    
  </div>
</section>
        <FeaturedSection className="my-16"/>
        <section className="flex justify-center items-center flex-col md:flex-row gap-8 mt-4">
          <div className="flex flex-col gap-4 md:gap-8">
            <h1 className="text-3xl sm:text-5xl lg:text-8xl font-bold tracking-tighter text-pretty">
              Admin Portal<span className="text-primary">.</span>
            </h1>
            <div className="flex gap-4 justify-center">
              <Link className="w-full" to="/admin">
                <Button className="w-full bg-[#E49B0F]" color="primary">
                  Admin Portal
                </Button>
              </Link>
            </div>
          </div>
          <Admin className="h-96 w-full md:w-auto"/>
        </section>
      </main>
      <Footer>
        <a className="text-xs opacity-70" href="https://storyset.com/work">Work illustrations by Storyset</a>
      </Footer>
    </>
  );
}

export default LandingPage;