import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Respect prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Initialize Lenis
        const lenis = new Lenis({
            duration: prefersReducedMotion ? 0.1 : 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1.2,
            smoothTouch: true,
            touchMultiplier: 1.5,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Synchronize Lenis with ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // --- GLOBAL SCROLL ANIMATIONS ---

        // 1. Reveal sections on scroll
        const revealElements = document.querySelectorAll('.fade-in-up');
        revealElements.forEach((el) => {
            gsap.fromTo(el,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // 2. Parallax backgrounds
        const parallaxHero = document.querySelector('.parallax-hero');
        if (parallaxHero) {
            gsap.to(parallaxHero, {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: parallaxHero,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }

        // 3. Staggered lists (e.g., service cards)
        const staggers = document.querySelectorAll('.stagger-reveal');
        staggers.forEach((container) => {
            gsap.from(container.children, {
                opacity: 0,
                y: 30,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach(t => t.kill());
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return (
        <div className="smooth-scroll-wrapper">
            {children}
        </div>
    );
};

export default SmoothScroll;
