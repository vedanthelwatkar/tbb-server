import { useState, useEffect, useRef } from "react";
import Landing from "./components/Landing";
import About from "./components/About";
import Services from "./components/Services";
import Book from "./components/Book";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

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
    book: useRef(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current) {
          const element = ref.current;
          const { offsetTop, offsetHeight } = element;

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
      const offset = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <nav className="sticky top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center py-4 px-2" style={{}}>
            {["Home", "About", "Services", "Book"].map((item) => (
              <li key={item}>
                <button
                  className={`text-textBase rounded-md transition-colors ${
                    activeSection === item.toLowerCase().split(" ")[0]
                      ? "bg-tertiary font-semibold"
                      : "hover:bg-tertiary/50"
                  }`}
                  style={{
                    padding: isMobile
                      ? "4px 12px 4px 12px"
                      : "8px 16px 8px 16px",
                  }}
                  onClick={() =>
                    scrollToSection(item.toLowerCase().split(" ")[0])
                  }
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <Landing sectionRefs={sectionRefs} scrollToSection={scrollToSection} />

      <About sectionRefs={sectionRefs} />

      <Services sectionRefs={sectionRefs} />

      <Book sectionRefs={sectionRefs} />
    </main>
  );
}
