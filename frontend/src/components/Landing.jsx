import React from "react";
import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import nature from "../assets/logo.png";
import { configurationSelector } from "../redux/selector/selector";

const Landing = ({ sectionRefs, scrollToSection }) => {
  const { configurationData } = useSelector(configurationSelector);

  return (
    <section
      ref={sectionRefs?.home}
      className="pt-24 py-32 bg-gradient-to-b from-tertiary to-background"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          <div className="flex-1 space-y-6">
            <span className="font-semibold text-4xl md:text-5xl lg:text-6xl text-textBase">
              {configurationData?.home && configurationData?.home[0]?.title}
            </span>
            <p className="text-lg md:text-xl text-textSecondary">
              {configurationData?.home &&
                configurationData?.home[0]?.description}
            </p>
            <button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 p-3 flex rounded"
              onClick={() => scrollToSection("contact")}
            >
              Book Appointment
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
          <div>
            <img
              src={nature}
              alt="Beautiful nature scene"
              width={600}
              height={600}
              className="object-cover w-full md:w-[500px] h-[300px] md:h-[500px] rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
