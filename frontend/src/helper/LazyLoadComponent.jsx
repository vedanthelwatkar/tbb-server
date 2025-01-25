import React, { useState, useEffect, useRef } from "react";

export const withLazyLoad = (WrappedComponent) => {
  return function LazyLoadedComponent(props) {
    const [isVisible, setIsVisible] = useState(false);
    const componentRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.1,
        }
      );

      if (componentRef.current) {
        observer.observe(componentRef.current);
      }

      return () => {
        if (componentRef.current) {
          observer.unobserve(componentRef.current);
        }
      };
    }, []);

    return (
      <div ref={componentRef}>
        {isVisible ? <WrappedComponent {...props} /> : null}
      </div>
    );
  };
};
