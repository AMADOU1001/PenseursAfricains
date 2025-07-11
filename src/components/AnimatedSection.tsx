
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-in-left' | 'slide-in-right' | 'slide-in-up' | 'scale-in';
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'fade-in',
  delay = 0
}) => {
  const { ref, isVisible } = useScrollAnimation();

  const animationClass = isVisible ? `animate-${animation}` : 'opacity-0 translate-y-8';
  const delayStyle = delay > 0 ? { animationDelay: `${delay}ms` } : {};

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${animationClass} ${className}`}
      style={delayStyle}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
