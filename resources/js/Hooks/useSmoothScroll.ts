// resources/js/Hooks/useSmoothScroll.ts

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollOptions {
    duration?: number;
    easing?: (t: number) => number;
    smoothWheel?: boolean;
    smoothTouch?: boolean;
}

export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis
        lenisRef.current = new Lenis({
            duration: options.duration || 1.2,
            easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
            smoothWheel: options.smoothWheel ?? true,
            smoothTouch: options.smoothTouch ?? false,
            touchMultiplier: 2,
            infinite: false,
        });

        // Animation loop
        function raf(time: number) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenisRef.current?.destroy();
        };
    }, []);

    const scrollTo = (target: string | number, options?: { offset?: number; duration?: number }) => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(target, {
                offset: options?.offset || 0,
                duration: options?.duration,
            });
        }
    };

    const scrollToTop = () => {
        scrollTo(0);
    };

    return { scrollTo, scrollToTop, lenis: lenisRef.current };
};