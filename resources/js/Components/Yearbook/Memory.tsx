// resources/js/Components/Yearbook/MemoryCinematic.tsx

import React, { useRef, useEffect, useMemo, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
} from "framer-motion";
import { MemoryImage } from "@/types/yearbook";

// --- TYPES ---
interface MemoryProps {
    memories?: MemoryImage[];
}

// --- STATIC POSITIONS CONFIGURATION ---
const scatterConfig = [
    { top: "5%", left: "5%", width: "w-64", rotate: "-6deg", z: 10 },
    { top: "10%", right: "8%", width: "w-72", rotate: "4deg", z: 20 },
    { bottom: "15%", left: "12%", width: "w-56", rotate: "12deg", z: 15 },
    { bottom: "8%", right: "15%", width: "w-80", rotate: "-8deg", z: 25 },
    { top: "35%", left: "-2%", width: "w-48", rotate: "-15deg", z: 5 },
    { top: "40%", right: "-5%", width: "w-60", rotate: "10deg", z: 5 },
    { bottom: "-5%", left: "40%", width: "w-52", rotate: "2deg", z: 30 },
    { top: "-5%", right: "35%", width: "w-64", rotate: "-3deg", z: 30 },
];

const MemoryCinematic: React.FC<MemoryProps> = ({ memories }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // --- Mouse Parallax (Optimized dengan throttle via spring config) ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring config lebih ringan
    const springX = useSpring(mouseX, { stiffness: 30, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 30, damping: 30 });

    useEffect(() => {
        let rafId: number;
        let lastTime = 0;
        const throttleMs = 16; // ~60fps max

        const handleMouseMove = (e: MouseEvent) => {
            const now = performance.now();
            if (now - lastTime < throttleMs) return;
            lastTime = now;

            if (rafId) cancelAnimationFrame(rafId);
            
            rafId = requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth - 0.5) * 30;
                const y = (e.clientY / window.innerHeight - 0.5) * 30;
                mouseX.set(x);
                mouseY.set(y);
            });
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [mouseX, mouseY]);

    // --- DEFAULT DATA ---
    const defaultMemories: MemoryImage[] = useMemo(() => [
        { id: 1, src: "/images/image1.png", alt: "Genesis", caption: "Genesis" },
        { id: 2, src: "/images/image2.png", alt: "Chaos", caption: "Chaos" },
        { id: 3, src: "/images/image3.png", alt: "Velvet", caption: "Velvet" },
        { id: 4, src: "/images/image4.png", alt: "Noir", caption: "Noir" },
        { id: 5, src: "/images/image5.png", alt: "Eternal", caption: "Eternal" },
        { id: 6, src: "/images/image6.png", alt: "Legacy", caption: "Legacy" },
        { id: 7, src: "/images/image7.png", alt: "Echo", caption: "Echo" },
        { id: 8, src: "/images/image8.png", alt: "Bond", caption: "Bond" },
    ], []);

    const memoryData = defaultMemories;

    // Memoize scroll transform
    const titleY = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section
            ref={containerRef}
            className="relative h-[200vh] w-full bg-[#0f0f0f] text-[#fceeb5] overflow-hidden flex items-center justify-center perspective-1000 p-80"
        >
            {/* TEXTURE */}
            <div
                className="absolute inset-0 z-50 pointer-events-none opacity-10 mix-blend-overlay"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                }}
            />

            {/* VIGNETTE */}
            <div
                className="absolute inset-0 pointer-events-none z-40"
                style={{
                    background:
                        "radial-gradient(circle at center, transparent 0%, #0f0f0f 90%)",
                }}
            />

            {/* CENTER TYPO */}
            <div className="relative z-0 text-center select-none pointer-events-none mix-blend-screen">
                <motion.div style={{ y: titleY }}>
                    <span className="text-[#fceeb5]/60 font-serif tracking-[0.5em] text-xs uppercase mb-4 block">
                        Fragments of Time
                    </span>

                    <h2
                        className="text-[12vw] md:text-[15rem] leading-[0.8] font-serif font-black tracking-tighter italic opacity-90"
                        style={{
                            fontFamily: "Times New Roman, serif",
                            textShadow: "0 0 40px rgba(252, 238, 181, 0.1)",
                            willChange: "transform",
                        }}
                    >
                        MEMO
                        <br />
                        RIA
                    </h2>

                    <div className="mt-8 w-24 h-[1px] bg-[#fceeb5]/50 mx-auto" />
                </motion.div>
            </div>

            {/* IMAGES */}
            <div className="absolute inset-0 w-full h-full max-w-[1400px] mx-auto pointer-events-none">
                {memoryData.map((memory, index) => {
                    const config = scatterConfig[index % scatterConfig.length];
                    const moveFactor =
                        (index % 2 === 0 ? 1 : -1) * (index + 1) * 0.15;

                    return (
                        <MemoryCard
                            key={memory.id}
                            memory={memory}
                            index={index}
                            config={config}
                            moveFactor={moveFactor}
                            springX={springX}
                            springY={springY}
                            containerRef={containerRef}
                        />
                    );
                })}
            </div>
        </section>
    );
};

// --- MEMORY CARD COMPONENT dengan LAZY LOAD FADE-IN ---
const MemoryCard = React.memo(({ 
    memory, 
    index, 
    config, 
    moveFactor, 
    springX, 
    springY, 
    containerRef 
}: any) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    
    const x = useTransform(springX, (v) => v * moveFactor);
    const y = useTransform(springY, (v) => v * moveFactor);

    const handleImageLoad = () => {
        setIsLoaded(true);
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        setHasError(true);
        (e.target as HTMLImageElement).src = "/images/image8.png";
    };

    return (
        <motion.div
            className={`absolute ${config.width} aspect-[3/4] p-2 bg-[#1a1a1a] border border-[#fceeb5]/20 shadow-2xl pointer-events-auto group cursor-grab`}
            style={{
                top: config.top,
                bottom: config.bottom,
                left: config.left,
                right: config.right,
                zIndex: config.z,
                rotate: config.rotate,
                x,
                y,
                willChange: "transform",
            }}
            initial={{ 
                opacity: 0, 
                scale: 0.8,
                y: 30,
                rotateX: -15
            }}
            animate={{ 
                opacity: 1, 
                scale: 1,
                y: 0,
                rotateX: 0
            }}
            transition={{ 
                duration: 0.8, 
                delay: index * 0.25, // Delay lebih lama: 0.25s per card
                ease: [0.22, 1, 0.36, 1], // Custom easing curve (ease-out-expo)
            }}
            whileHover={{
                scale: 1.05,
                rotate: 0,
                zIndex: 100,
                borderColor: "rgba(252,238,181,0.6)",
                transition: { duration: 0.2 },
            }}
            drag
            dragConstraints={containerRef}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        >
            <div className="w-full h-[85%] bg-black overflow-hidden relative">
                {/* Loading Skeleton */}
                {!isLoaded && (
                    <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]"
                        animate={{
                            backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            backgroundSize: '200% 200%'
                        }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div 
                                className="w-8 h-8 border-2 border-[#fceeb5]/20 border-t-[#fceeb5]/60 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        </div>
                    </motion.div>
                )}

                {/* Image with Fade-In */}
                <motion.img
                    src={memory.src}
                    alt={memory.alt}
                    loading="lazy"
                    decoding="async"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ 
                        opacity: isLoaded ? 1 : 0,
                        scale: isLoaded ? 1 : 1.1
                    }}
                    transition={{ 
                        duration: 0.7, 
                        ease: "easeOut",
                        delay: 0.2
                    }}
                    className="w-full h-full object-cover opacity-80 grayscale contrast-125 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                    style={{ willChange: "filter, opacity" }}
                />
            </div>

            <div className="h-[15%] flex items-center justify-between px-2">
                <span className="font-serif text-xs uppercase tracking-widest">
                    {memory.caption}
                </span>
                <span className="text-[10px] text-[#fceeb5]/40 font-mono">
                    0{index + 1}
                </span>
            </div>
        </motion.div>
    );
});

MemoryCard.displayName = "MemoryCard";

export default MemoryCinematic;