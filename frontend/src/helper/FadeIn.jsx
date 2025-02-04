import clsx from "clsx";
import { useEffect, useState, forwardRef } from "react";

const FadeIn = forwardRef(({ children, duration = 0, className }, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref || !ref.current) return; // Ensure ref exists

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, duration);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        root: null, // Use the viewport
        rootMargin: "0px",
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [duration, ref]);

  return (
    <div
      ref={ref}
      className={clsx(
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      {children}
    </div>
  );
});

export default FadeIn;
