"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";
import { configurationSelector } from "../redux/selector/selector";

const Landing = ({ sectionRefs, scrollToSection }) => {
  const { configurationData } = useSelector(configurationSelector);

  return (
    <section
      ref={sectionRefs?.home}
      className="pt-6 min-h-[calc(100vh-68px)] flex items-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-tertiary to-background opacity-50 blur-xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-[2fr_1fr] items-center gap-12">
          <div className="md:pl-12 space-y-8">
            <div className="relative inline-block group">
              <h1 className="text-5xl md:text-6xl font-extrabold text-primary tracking-tight relative animate-text-blur">
                {configurationData?.home && configurationData?.home[0]?.title}
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
              </h1>
            </div>

            <p className="text-xl text-textSecondary leading-relaxed animate-text-blur-1">
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

          <div className="relative flex justify-center items-center">
            <div className="w-full max-w-md relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-2xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-500"></div>
              <img
                src={logo}
                alt="Logo"
                className="relative z-10 w-full h-auto object-contain rounded-2xl transform transition-transform duration-500 group-hover:scale-105 shadow-xl"
              />
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
