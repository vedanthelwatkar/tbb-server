import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { configurationSelector } from "../redux/selector/selector";
import nature from "../assets/image.png";

const About = ({ sectionRefs, scrollToSection }) => {
  const { configurationData } = useSelector(configurationSelector);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        if (sectionRefs?.about) sectionRefs.about.current = el;
      }}
      className="pt-12 py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-tertiary to-background bg-opacity-60 backdrop-blur-sm"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2
          className={`text-4xl font-bold text-center text-textBase mb-20 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {configurationData?.about?.[0]?.title || "About Me"}
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div
            className={`flex-1 transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <img
                src={nature}
                alt="Portrait"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </div>
          <div
            className={`flex-1 space-y-6 transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            {configurationData?.about?.map((item, index) => (
              <div key={index}>
                <p className="text-lg text-textSecondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
            <div className="mt-12 text-center">
              <a
                onClick={() => scrollToSection("contact")}
                className="inline-block bg-white text-black font-semibold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
