// resources/js/Hooks/useScrollAnimation.ts

import { useEffect, useRef, useState, RefObject } from 'react';
import { ScrollAnimationConfig } from '@/types/yearbook';

export const useScrollAnimation = (
    config: ScrollAnimationConfig = {}
): [RefObject<HTMLDivElement>, boolean] => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        if (config.triggerOnce) {
                            observer.unobserve(entry.target);
                        }
                    } else if (!config.triggerOnce) {
                        setIsVisible(false);
                    }
                });
            },
            {
                threshold: config.threshold || 0.1,
                rootMargin: config.rootMargin || '0px 0px -100px 0px',
            }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [config.threshold, config.rootMargin, config.triggerOnce]);

    return [elementRef, isVisible];
};

// Hook untuk multiple elements
export const useScrollAnimations = (
    count: number,
    config: ScrollAnimationConfig = {}
): [RefObject<HTMLDivElement>[], boolean[]] => {
    const elementRefs = useRef<RefObject<HTMLDivElement>[]>(
        Array.from({ length: count }, () => ({ current: null }))
    );
    const [visibilityStates, setVisibilityStates] = useState<boolean[]>(
        Array(count).fill(false)
    );

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        elementRefs.current.forEach((ref, index) => {
            if (!ref.current) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setVisibilityStates((prev) => {
                                const newStates = [...prev];
                                newStates[index] = true;
                                return newStates;
                            });
                            if (config.triggerOnce) {
                                observer.unobserve(entry.target);
                            }
                        } else if (!config.triggerOnce) {
                            setVisibilityStates((prev) => {
                                const newStates = [...prev];
                                newStates[index] = false;
                                return newStates;
                            });
                        }
                    });
                },
                {
                    threshold: config.threshold || 0.1,
                    rootMargin: config.rootMargin || '0px 0px -100px 0px',
                }
            );

            observer.observe(ref.current);
            observers.push(observer);
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, [count, config.threshold, config.rootMargin, config.triggerOnce]);

    return [elementRefs.current, visibilityStates];
};

// Hook untuk stagger animation
export const useStaggerAnimation = (
    count: number,
    staggerDelay: number = 100
): [RefObject<HTMLDivElement>[], boolean[], number[]] => {
    const [refs, visibilityStates] = useScrollAnimations(count, {
        threshold: 0.1,
        triggerOnce: true,
    });
    const [delays, setDelays] = useState<number[]>([]);

    useEffect(() => {
        setDelays(Array.from({ length: count }, (_, i) => i * staggerDelay));
    }, [count, staggerDelay]);

    return [refs, visibilityStates, delays];
};