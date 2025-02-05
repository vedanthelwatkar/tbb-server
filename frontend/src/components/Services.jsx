import { useEffect, useState, useRef } from "react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Services = () => {
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

    const cardWidth = 320;
    const containerWidth = carousel.clientWidth;

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

  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollAmount = direction === "left" ? -320 : 320;
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="px-7 pt-8 bg-gradient-to-b from-tertiary to-white overflow-hidden">
      <div className="w-full items-center justify-center flex flex-col">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 animate-text-blur">
          Our Services
        </h2>
        <div className="relative w-full px-4 md:px-12">
          <button
            onClick={() => scrollCarousel("left")}
            className="absolute left-0 top-[42.5%] -translate-y-1/2 z-10 bg-secondary hover:bg-primary text-white rounded-full p-2 shadow-lg transition-all duration-300 ease-in-out"
            aria-label="Previous service"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => scrollCarousel("right")}
            className="absolute right-0 top-[42.5%] -translate-y-1/2 z-10 bg-secondary hover:bg-primary text-white rounded-full p-2 shadow-lg transition-all duration-300 ease-in-out"
            aria-label="Next service"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div
            ref={carouselRef}
            className="w-full overflow-x-auto snap-x snap-mandatory flex space-x-4 pb-8 scroll-smooth"
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
                  className="service-item flex-shrink-0 w-80 snap-center transition-all duration-500 ease-out"
                >
                  <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-md h-full bg-secondary hover:shadow-lg transition-shadow duration-300">
                    <Icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold text-primary mb-2 animate-text-blur-1">
                      {item.title}
                    </h3>
                    <p className="text-textSecondary animate-text-blur-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
