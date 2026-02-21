import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up',
  duration = 0.6,
  once = true,
  threshold = 0.1,
  distance = 50,
  animation = 'fade',
  ...props 
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once, threshold });

  // Define animations based on direction and type
  const getVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          duration, 
          delay,
          ease: [0.25, 0.1, 0.25, 1] // Cubic bezier for smooth easing
        }
      }
    };

    switch (animation) {
      case 'fade':
        return baseVariants;

      case 'slide':
        return {
          hidden: { 
            ...baseVariants.hidden,
            x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
            y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
          },
          visible: {
            ...baseVariants.visible,
            x: 0,
            y: 0,
          }
        };

      case 'scale':
        return {
          hidden: { 
            ...baseVariants.hidden,
            scale: 0.8,
          },
          visible: {
            ...baseVariants.visible,
            scale: 1,
          }
        };

      case 'rotate':
        return {
          hidden: { 
            ...baseVariants.hidden,
            rotate: -10,
            scale: 0.9,
          },
          visible: {
            ...baseVariants.visible,
            rotate: 0,
            scale: 1,
          }
        };

      case 'flip':
        return {
          hidden: { 
            ...baseVariants.hidden,
            rotateY: 90,
            scale: 0.8,
          },
          visible: {
            ...baseVariants.visible,
            rotateY: 0,
            scale: 1,
          }
        };

      default:
        return baseVariants;
    }
  };

  // Stagger children variants
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      }
    }
  };

  // Check if children should be staggered
  const isStagger = animation === 'stagger';

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={isStagger ? staggerVariants : getVariants()}
      className={className}
      {...props}
    >
      {isStagger ? (
        React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: "easeOut"
                }
              }
            }}
          >
            {child}
          </motion.div>
        ))
      ) : (
        children
      )}
    </motion.div>
  );
};

// Specialized animation components for common use cases
export const FadeIn = (props) => <AnimatedSection animation="fade" {...props} />;
export const SlideIn = (props) => <AnimatedSection animation="slide" {...props} />;
export const ScaleIn = (props) => <AnimatedSection animation="scale" {...props} />;
export const RotateIn = (props) => <AnimatedSection animation="rotate" {...props} />;
export const FlipIn = (props) => <AnimatedSection animation="flip" {...props} />;
export const StaggerChildren = (props) => <AnimatedSection animation="stagger" {...props} />;

// Parallax scroll effect component
export const ParallaxSection = ({ children, speed = 0.5, className = '' }) => {
  const ref = useRef(null);
  const [scrollY, setScrollY] = React.useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const elementTop = rect.top + scrolled;
        const offset = (scrolled - elementTop) * speed;
        setScrollY(offset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        style={{
          y: scrollY,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Count-up animation component
export const CountUp = ({ end, duration = 2, delay = 0, className = '' }) => {
  const [count, setCount] = React.useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.min(Math.floor(end * progress), end));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      setTimeout(() => {
        animationFrame = requestAnimationFrame(animate);
      }, delay * 1000);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [inView, end, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}
    </span>
  );
};

// Typing animation component
export const Typewriter = ({ text, speed = 50, delay = 0, className = '' }) => {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);

        return () => clearTimeout(timeout);
      }
    }
  }, [currentIndex, inView, text, speed]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default AnimatedSection;