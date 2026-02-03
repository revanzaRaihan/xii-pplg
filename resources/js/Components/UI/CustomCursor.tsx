import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Konfigurasi Spring yang berbeda untuk Dot (Inti) dan Ring (Lingkaran Luar)
    // Dot: Sangat responsif (stiffness tinggi)
    const dotX = useSpring(0, { stiffness: 1000, damping: 40 });
    const dotY = useSpring(0, { stiffness: 1000, damping: 40 });
    
    // Ring: Agak "malas" mengejar agar ada efek lagging yang estetik
    const ringX = useSpring(0, { stiffness: 350, damping: 35 });
    const ringY = useSpring(0, { stiffness: 350, damping: 35 });

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            
            // Atur posisi agar pas di tengah (Dot 6px, Ring 32px)
            dotX.set(e.clientX - 3);
            dotY.set(e.clientY - 3);
            ringX.set(e.clientX - 16);
            ringY.set(e.clientY - 16);

            const target = e.target as HTMLElement;
            const isClickable = ['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(target.tagName) ||
                              !!target.closest('button') ||
                              !!target.closest('a') ||
                              target.getAttribute('role') === 'button';

            setIsHovered(isClickable);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', moveMouse);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [dotX, dotY, ringX, ringY, isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999] hidden lg:block">
            {/* 1. DOT (Titik Pusat - Fokus Utama) */}
            <motion.div
                className="fixed w-1.5 h-1.5 bg-gold rounded-full"
                style={{ x: dotX, y: dotY }}
            />

            
            {/* 3. GLOW EFFECT (Opsional: Membuat kursor bercahaya tipis) */}
            {isHovered && (
                <motion.div
                    className="fixed w-8 h-8 rounded-full bg-gold/20 blur-md"
                    style={{ x: ringX, y: ringY }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />
            )}
        </div>
    );
};

export default CustomCursor;