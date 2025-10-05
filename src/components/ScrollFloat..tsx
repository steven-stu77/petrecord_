import React, { useEffect, useMemo, useRef, ReactNode, RefObject, useState } from 'react';
// Removed explicit module imports for GSAP and ScrollTrigger,
// relying on them being loaded globally in the execution environment.

// Type declarations to satisfy TypeScript that global 'gsap' and 'ScrollTrigger' objects exist.
declare const gsap: any;
declare const ScrollTrigger: any;

// Register GSAP plugins globally (assumes the libraries are loaded via CDN or similar global script)
if (typeof window !== 'undefined' && typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- ScrollFloat Component Definitions ---

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  // Split the children text into individual span elements for character-level animation
  const splitText = useMemo(() => {
    // Ensure children is treated as a string for splitting
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, index) => (
      <span className="char" key={index}>
        {/* Replace standard space with non-breaking space for layout consistency */}
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    // Only run on the client side after the component mounts
    // Also check for the global existence of GSAP
    if (typeof window === 'undefined' || !containerRef.current || typeof gsap === 'undefined') return;

    const el = containerRef.current;
    
    // Determine the scroller element: use the provided ref or the window object
    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll('.char');

    // Create a ScrollTrigger instance for the character animation
    gsap.fromTo(
      charElements,
      {
        // Initial state: hidden, moved down, and scaled/squashed
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120, // Start 120% below natural position
        scaleY: 2.3,   // Squashed vertically
        scaleX: 0.7,   // Compressed horizontally
        transformOrigin: '50% 0%'
      },
      {
        // Final state: visible, at natural position, and scale 1
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller: scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true, // Link the animation progress to scroll position
          // Optionally add markers for debugging, but we remove them for production code
          // markers: true 
        }
      }
    );

    // Clean up ScrollTrigger on component unmount
    return () => {
        // Ensure ScrollTrigger exists before trying to access it
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.getTweensOf(charElements).forEach((t: any) => t.kill());
            ScrollTrigger.getTriggers().forEach((trigger: any) => {
                if (trigger.trigger === el) {
                    trigger.kill();
                }
            });
        }
    };

  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    // Use an h2 tag for semantic structure, applying the container styles
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
      {/* The span wraps the split text elements */}
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </h2>
  );
};


// --- App Component for Demonstration ---

const App: React.FC = () => {
  // Ref for the custom scroll container, if desired
  const scrollRef = useRef<HTMLDivElement>(null);
  const [useCustomScroll, setUseCustomScroll] = useState(false);

  // Utility component to generate large spacer blocks
  const Spacer = ({ height }: { height: string }) => (
    <div className={`w-full ${height} bg-gray-100 flex items-center justify-center text-gray-500 text-lg font-mono rounded-xl shadow-inner mb-8`}>
        Placeholder Content
    </div>
  );

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen font-['Inter']">
      
      {/* Custom CSS (formerly ScrollFloat.css) injected here */}
      <style>{`
        /* The component relies on these specific classes */
        .scroll-float {
          overflow: hidden;
          width: 100%; /* Ensure it spans full width */
          text-align: center; /* Center the text container itself */
        }

        .scroll-float-text {
          font-size: clamp(2rem, 10vw, 12rem); /* Larger and more responsive font size */
          font-weight: 900;
          line-height: 1.1; /* Tighter line height for large text */
          color: #1f2937; /* Dark gray text */
          text-align: center;
          /* Important: display: inline-block is required for the text container to size correctly around the split chars */
          display: inline-block; 
        }

        .char {
          display: inline-block; /* Essential for GSAP splitting and animating */
        }

        .custom-scroller {
          height: 80vh; /* Make the container smaller than viewport */
          overflow-y: scroll; /* Enable scrolling */
          border: 4px dashed #9ca3af;
          padding: 1rem;
          margin-bottom: 2rem;
          border-radius: 0.75rem;
          background-color: #ffffff;
        }
      `}</style>
      
      <div className="max-w-4xl mx-auto">
        
        <header className="text-center mb-10 pt-4">
            <h1 className="text-4xl font-bold text-blue-600">GSAP Scroll Float Demo</h1>
            <p className="text-gray-500 mt-2">Scroll down to see the title animate! ScrollTrigger is linked to character-level movement.</p>
        </header>

        {/* Custom Scroller Toggle */}
        <div className="mb-8 p-4 bg-white rounded-xl shadow-lg flex items-center justify-between">
            <label className="text-gray-700 font-medium flex items-center">
                <input
                    type="checkbox"
                    checked={useCustomScroll}
                    onChange={(e) => {
                        setUseCustomScroll(e.target.checked);
                        // Reset scroll positions when changing the scroller
                        if (e.target.checked && scrollRef.current) {
                            scrollRef.current.scrollTop = 0;
                        } else {
                            window.scrollTo(0, 0);
                        }
                    }}
                    className="mr-2 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                Use Inner Scroll Container for Animation
            </label>
            <span className="text-sm text-gray-400">({useCustomScroll ? 'Container' : 'Window'})</span>
        </div>


        {/* Main Content Area */}
        <div 
          ref={useCustomScroll ? scrollRef : null} 
          className={useCustomScroll ? "custom-scroller" : ""}
        >
            
            <Spacer height="h-96" />

            {/* The ScrollFloat Component in Action */}
            <ScrollFloat 
                scrollContainerRef={useCustomScroll ? scrollRef : undefined}
                animationDuration={1.5}
                stagger={0.04}
                ease="power3.out"
                textClassName="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
            >
                Animated Text Header
            </ScrollFloat>
            
            <Spacer height="h-96" />

            <div className="p-8 my-16 bg-blue-50 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-blue-800 mb-4 text-center">Another Animation Example</h3>
                <p className="text-gray-600 text-center mb-8">This one uses different parameters for a faster, tighter effect.</p>
                <ScrollFloat 
                    scrollContainerRef={useCustomScroll ? scrollRef : undefined}
                    animationDuration={0.8}
                    stagger={0.02}
                    ease="power2.inOut"
                    scrollStart="top bottom"
                    scrollEnd="bottom top-=20%"
                    textClassName="text-green-600 border-b-4 border-green-300 pb-2"
                >
                    Fast and Snappy Scroll
                </ScrollFloat>
            </div>
            
            <Spacer height="h-96" />
            <Spacer height="h-72" />

        </div>
      </div>
    </div>
  );
};

export default App;
