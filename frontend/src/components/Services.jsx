import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { configurationSelector } from "../redux/selector/selector";
// import { Carousel } from "./ui/apple-cards-carousel";

import {
  BookHeart,
  Brain,
  Heart,
  Leaf,
  PersonStanding,
  Sun,
} from "lucide-react";

const Services = ({ sectionRefs }) => {
  const { configurationData } = useSelector(configurationSelector);
  const [services, setServices] = useState([]);

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  const icons = [Leaf, Heart, Sun, Brain, BookHeart, PersonStanding];

  useEffect(() => {
    const serviceData = configurationData?.services?.map((item, index) => ({
      icon: icons[index] || Leaf,
      title: item.title || "hello",
      description: item.description || "hello",
    }));
    setServices(serviceData);
  }, [configurationData]);

  return (
    <section
      ref={sectionRefs?.services}
      className="pt-0 py-16 bg-gradient-to-b from-tertiary to-background"
    >
      <div className="px-12 w-full items-center justify-center flex flex-col">
        <span
          className="text-4xl md:text-4xl font-bold text-center text-primary mb-12"
          marginBottom={isMobile ? "24px" : "48x"}
        >
          Our Services
        </span>
        <div className="flex w-full gap-8 justify-between overflow-auto">
          {services?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-secondary rounded-lg shadow-md flex-1"
              style={{
                width: isMobile() ? "50vw" : "25vw",
                height: isMobile() ? "30vh" : "30vh",
                gap: isMobile() ? "4px" : "12px",
              }}
            >
              <item.icon className="h-12 w-12 text-textBase mb-4" />
              <h3 className="text-xl font-semibold text-textBase mb-2">
                {item.title}
              </h3>
              <p className="text-textSecondary overflow-auto">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
