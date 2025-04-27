import { useState, useEffect, useRef } from "react";
import Landing from "./components/Landing";
import About from "./components/About";
import Services from "./components/Services";
import Book from "./components/Book";
import { brandingSelector, statusSelector } from "./redux/selector/selector";
import { useSelector } from "react-redux";
import MaintainencePage from "./components/MaintainencePage";
import FadeIn from "./helper/FadeIn";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const { brandingData } = useSelector(brandingSelector);
  const { statusData } = useSelector(statusSelector);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [activeSection, setActiveSection] = useState("home");
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    services: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;

          if (
            scrollPosition >= offsetTop - 100 &&
            scrollPosition < offsetTop + offsetHeight - 100
          ) {
            setActiveSection(key);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = sectionRefs[sectionId].current;
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  useEffect(()=>{
    setTimeout(()=>{
      if (!statusData?.isActive) {
        return <MaintainencePage />;
      }
    },[500])
  },[statusData])


  return (
    <main className="min-h-screen bg-tertiary">
      <nav className="sticky top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center py-4 px-2">
            {["Home", "About", "Services", "Contact"].map((item) => (
              <li key={item}>
                <button
                  className={`text-textBase rounded-md transition-colors ${
                    activeSection === item.toLowerCase()
                      ? "bg-tertiary font-semibold"
                      : "hover:bg-tertiary/50"
                  }`}
                  style={{
                    padding: isMobile ? "4px 12px" : "8px 16px",
                  }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <FadeIn ref={sectionRefs.home}>
        <Landing scrollToSection={scrollToSection} />
      </FadeIn>

      <About sectionRefs={sectionRefs} scrollToSection={scrollToSection} />

      <FadeIn ref={sectionRefs.services}>
        <Services />
      </FadeIn>

      <Book sectionRefs={sectionRefs} />
    </main>
  );
}
