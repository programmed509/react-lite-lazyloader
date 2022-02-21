import { useEffect, useRef, useState } from "react";
const LiteLazyLoad = ({ children, startLoadingfrom, percentVisible }) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const options = {
    root: null,
    rootMargin: startLoadingfrom || "0px",
    threshold: percentVisible || 0,
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(entry.isIntersecting);
        observer.unobserve(elementRef.current);
      }
    }, options);
    if (elementRef.current) observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [elementRef, options]);
  return (
    <div id="lazy-loaded" ref={elementRef}>
      {isVisible && children}
    </div>
  );
};
export default LiteLazyLoad;
