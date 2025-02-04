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
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Services = () => {
  const { configurationData } = useSelector(configurationSelector);
  const [services, setServices] = useState([]);
  const [isGridView, setIsGridView] = useState(false);
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
  }, [configurationData]); // Removed icons from dependency array

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || services.length === 0 || isGridView) return;

    const cardWidth = 320;
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
  }, [services, isGridView]);

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollAmount = direction === "left" ? -320 : 320;
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="pt-8 bg-gradient-to-b from-tertiary to-background overflow-hidden">
      <div className="px-4 md:px-12 w-full items-center justify-center flex flex-col">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12 animate-text-blur">
          Our Services
        </h2>
        {!isGridView && (
          <>
            <button
              onClick={() => scrollCarousel("left")}
              className="ml-3 absolute left-0 top-1/2 -translate-y-1/2 z-10"
              variant="ghost"
              size="icon"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="mr-3 absolute right-0 top-1/2 -translate-y-1/2 z-10"
              variant="ghost"
              size="icon"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
        <div
          ref={carouselRef}
          className={`w-full ${
            isGridView
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              : "overflow-x-auto snap-x snap-mandatory flex space-x-4 pb-8 scroll-smooth"
          }`}
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
                className={`service-item ${
                  isGridView
                    ? "w-full"
                    : "flex-shrink-0 w-80 snap-center mobile:opacity-50 mobile:scale-95 md:opacity-100 md:scale-100"
                } transition-all duration-500 ease-out`}
              >
                <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-md h-full bg-secondary">
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
        <button
          onClick={toggleView}
          className="text-textSecondary mt-8 flex items-center gap-2"
          variant="outline"
        >
          {isGridView ? (
            <List className="h-4 w-4" />
          ) : (
            <Grid className="h-4 w-4" />
          )}
          {isGridView ? "Switch to Carousel View" : "Switch to Grid View"}
        </button>
      </div>
    </section>
  );
};

export default Services;
