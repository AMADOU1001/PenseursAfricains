import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

const CountUp = ({ 
  from = 0, 
  to, 
  separator = ",", 
  direction = "up", 
  duration = 1, 
  className = "",
  delay = 0 
}) => {
  const count = useMotionValue(direction === "up" ? from : to);
  const rounded = useTransform(count, (latest) => {
    return Math.round(latest);
  });
  const displayValue = useTransform(rounded, (latest) => {
    return latest.toLocaleString('fr-FR', { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    });
  });
  
  const ref = useRef(null);
  const [isInView, setIsInView] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        const controls = animate(count, direction === "up" ? to : from, {
          duration: duration,
          ease: "easeOut"
        });
        
        setHasAnimated(true);
        
        return controls.stop;
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isInView, hasAnimated, count, to, from, direction, duration, delay]);

  return (
    <motion.span 
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      {displayValue}
    </motion.span>
  );
};

export default CountUp;