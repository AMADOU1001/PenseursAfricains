import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'characters';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  onAnimationComplete?: () => void;
  className?: string;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 0,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  className = ''
}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const getDirectionOffset = () => {
    switch (direction) {
      case 'top': return { y: -20, x: 0 };
      case 'bottom': return { y: 20, x: 0 };
      case 'left': return { y: 0, x: -20 };
      case 'right': return { y: 0, x: 20 };
      default: return { y: -20, x: 0 };
    }
  };

  const offset = getDirectionOffset();
  
  const splitText = animateBy === 'words' ? text.split(' ') : text.split('');
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: animateBy === 'words' ? 0.12 : 0.03,
        delayChildren: delay / 1000,
        onComplete: onAnimationComplete
      }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      }
    },
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      filter: 'blur(4px)',
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {splitText.map((item, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: 'inline-block' }}
        >
          {item}
          {animateBy === 'words' && index < splitText.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default BlurText;