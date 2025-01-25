"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { configurationSelector } from "../redux/selector/selector";
import {
  BookHeart,
  Brain,
  Heart,
  Leaf,
  PersonStanding,
  Sun,
  Award,
  Briefcase,
  Clipboard,
  Compass,
  Gift,
  Map,
} from "lucide-react";

const Services = ({ sectionRefs }) => {
  const { configurationData } = useSelector(configurationSelector);
  const [services, setServices] = useState([]);
  const carouselRef = useRef(null);
  const icons = [
    Leaf,
    Heart,
    Sun,
    Brain,
    BookHeart,
    PersonStanding,
    Award,
    Briefcase,
    Clipboard,
    Compass,
    Gift,
    Map,
  ];

  useEffect(() => {
    const serviceData = configurationData?.services?.map((item, index) => ({
      icon: icons[index] || Leaf,
      title: item.title || "Service",
      description: item.description || "Description",
    }));
    setServices(serviceData || []);
  }, [configurationData]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || services.length === 0) return;

    const cardWidth = 320; // w-80 is 320px
    const containerWidth = carousel.clientWidth;
    const totalCarouselWidth = services.length * cardWidth;
    const centerOffset = (totalCarouselWidth - containerWidth) / 2;

    const handleScroll = () => {
      const scrollPos = carousel.scrollLeft;
      const centerScrollPos = scrollPos + containerWidth / 2;
      const centerCardIndex = Math.floor(centerScrollPos / cardWidth);

      carousel.querySelectorAll(".service-item").forEach((card, index) => {
        if (index === centerCardIndex) {
          card.classList.add("in-view");
        } else {
          card.classList.remove("in-view");
        }
      });
    };

    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, [services]);

  return (
    <section
      ref={sectionRefs?.services}
      className="pt-8 bg-gradient-to-b from-tertiary to-background overflow-hidden"
    >
      <div className="px-4 md:px-12 w-full items-center justify-center flex flex-col">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          Our Services
        </h2>
        <div
          ref={carouselRef}
          className="w-full max-w-7xl overflow-x-auto snap-x snap-mandatory flex space-x-4 pb-8 scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="service-item flex-shrink-0 w-80 snap-center 
                  mobile:opacity-50 mobile:scale-95 
                  md:opacity-100 md:scale-100 
                  transition-all duration-500 ease-out"
              >
                <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-md h-full bg-secondary">
                  <Icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-textSecondary">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .service-item.in-view {
          opacity: 1 !important;
          transform: scale(1) !important;
        }
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Services;
