"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { configurationSelector } from "../redux/selector/selector";
import { Leaf, Target, Compass } from "lucide-react";
import nature from "../assets/nature.jpg";

const About = ({ sectionRefs, scrollToSection }) => {
  const { configurationData } = useSelector(configurationSelector);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  const features = [
    {
      icon: Leaf,
      title: "Growth Mindset",
      description: "Constantly evolving and adapting to new challenges.",
    },
    {
      icon: Target,
      title: "Precision & Vision",
      description: "Focusing on clear goals with strategic approach.",
    },
    {
      icon: Compass,
      title: "Innovation Driven",
      description:
        "Exploring creative solutions beyond conventional boundaries.",
    },
  ];

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
      className="py-6 relative overflow-hidden bg-gradient-to-t from-tertiary to-white"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`relative group transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="aspect-square w-full max-w-md mx-auto relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse group-hover:animate-none"></div>
              <img
                src={nature}
                alt="Profile"
                className="absolut rounded-full object-cover z-10 shadow-2xl group-hover:scale-105 transition-transform"
              />
            </div>
          </div>

          <div
            className={`space-y-6 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <h2 className="text-4xl font-bold text-primary mb-6">
              {configurationData?.about?.[0]?.title || "About My Journey"}
            </h2>

            <div className="text-textSecondary leading-relaxed space-y-4">
              {configurationData?.about?.map((item, index) => (
                <p key={index}>{item.description}</p>
              ))}
            </div>

            <div className="mt-8">
              <div className="flex space-x-4 mb-6">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`p-3 rounded-full transition-all ${
                      activeIndex === index
                        ? "bg-primary text-white scale-110"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                  >
                    <feature.icon size={24} />
                  </button>
                ))}
              </div>
              <div className="bg-secondary/50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {features[activeIndex].title}
                </h3>
                <p className="text-textSecondary">
                  {features[activeIndex].description}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors group"
              >
                <span className="flex items-center justify-center gap-2">
                  Get in Touch
                  <Leaf
                    className="group-hover:rotate-12 transition-transform"
                    size={20}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
