"use client";

import React from "react";
import { ArrowRight, Leaf, Target } from "lucide-react";
import { useSelector } from "react-redux";
import nature from "../assets/logo.png";
import { configurationSelector } from "../redux/selector/selector";

const Landing = ({ sectionRefs, scrollToSection }) => {
  const { configurationData } = useSelector(configurationSelector);

  return (
    <section
      ref={sectionRefs?.home}
      className="h-[calc(100vh-68px)] flex items-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-tertiary to-background opacity-50 blur-xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-[2fr_1fr] items-center gap-12">
          {/* Left Content with Offset */}
          <div className="md:pl-12 space-y-8">
            <div className="relative inline-block group">
              <h1 className="text-5xl md:text-6xl font-extrabold text-primary tracking-tight relative">
                {configurationData?.home && configurationData?.home[0]?.title}
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
              </h1>
            </div>

            <p className="text-xl text-textSecondary leading-relaxed">
              {configurationData?.home &&
                configurationData?.home[0]?.description}
            </p>

            <button
              onClick={() => scrollToSection("contact")}
              className="group relative px-8 py-4 rounded-full bg-primary text-white overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                Book Appointment
                <ArrowRight
                  className="ml-2 transform transition-transform group-hover:translate-x-1"
                  size={20}
                />
              </span>
              <span className="absolute inset-0 bg-primary/20 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </button>
          </div>

          {/* Right Side: Logo with Decorative Elements */}
          <div className="relative flex justify-center items-center">
            <div className="w-full max-w-md relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-2xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-500"></div>
              <img
                src={nature}
                alt="Logo"
                className="relative z-10 w-full h-auto object-contain rounded-2xl transform transition-transform duration-500 group-hover:scale-105 shadow-xl"
              />

              {/* Floating Decorative Icons */}
              <div className="absolute -top-8 -left-8 bg-white/80 p-3 rounded-full shadow-md animate-float">
                <Leaf className="text-primary" size={24} />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white/80 p-3 rounded-full shadow-md animate-float-delayed">
                <Target className="text-primary" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Background Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-tertiary/20 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Landing;

// Tailwind CSS Custom Animations
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  .animate-float-delayed {
    animation: float 4s ease-in-out infinite;
    animation-delay: 2s;
  }
`;
