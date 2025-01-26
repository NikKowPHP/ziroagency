// use-testimonials.ts
import { useEffect, useRef, useState } from 'react';
import { debounce } from '@/lib/utils'; // Assuming debounce is in utils

export function useTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const hasHorizontalScroll =
          containerRef.current.scrollWidth > containerRef.current.clientWidth;
        setHasOverflow(hasHorizontalScroll);
      }
    };

    checkOverflow();
    window.addEventListener('resize', debounce(checkOverflow, 200));
    return () => window.removeEventListener('resize', debounce(checkOverflow, 200));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = containerRef.current;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft + clientWidth < scrollWidth - 1); // Subtract 1px for tolerance
      }
    };

    if (containerRef.current && hasOverflow) {
      containerRef.current.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check in case content is already scrolled
      return () => containerRef.current?.removeEventListener('scroll', handleScroll);
    }
  }, [hasOverflow]);

  return {
    containerRef,
    hasOverflow,
    showLeftButton,
    showRightButton,
  };
}