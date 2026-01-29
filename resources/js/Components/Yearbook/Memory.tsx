// resources/js/Components/Yearbook/Memory.tsx

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useStaggerAnimation } from '@/Hooks/useScrollAnimation';
import { MemoryImage } from '@/types/yearbook';

interface MemoryProps {
    memories?: MemoryImage[];
}

const Memory: React.FC<MemoryProps> = ({ memories }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    
    // Default memories jika tidak ada data dari backend
    const defaultMemories: MemoryImage[] = [
        { id: 1, src: '/images/memory-1.jpg', alt: 'Memory 1', gridColumn: 'span 4', gridRow: 'span 2' },
        { id: 2, src: '/images/memory-2.jpg', alt: 'Memory 2', gridColumn: 'span 3', gridRow: 'span 3' },
        { id: 3, src: '/images/memory-3.jpg', alt: 'Memory 3', gridColumn: 'span 5', gridRow: 'span 2' },
        { id: 4, src: '/images/memory-4.jpg', alt: 'Memory 4', gridColumn: 'span 4', gridRow: 'span 3' },
        { id: 5, src: '/images/memory-5.jpg', alt: 'Memory 5', gridColumn: 'span 4', gridRow: 'span 2' },
        { id: 6, src: '/images/memory-6.jpg', alt: 'Memory 6', gridColumn: 'span 4', gridRow: 'span 2' },
        { id: 7, src: '/images/memory-7.jpg', alt: 'Memory 7', gridColumn: 'span 6', gridRow: 'span 3' },
        { id: 8, src: '/images/memory-8.jpg', alt: 'Memory 8', gridColumn: 'span 6', gridRow: 'span 2' },
    ];

    const memoryData = memories || defaultMemories;
    const [refs, visibilityStates, delays] = useStaggerAnimation(memoryData.length, 150);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const titleY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section
            id="memory"
            ref={sectionRef}
            className="relative min-h-screen py-32 overflow-hidden"
            style={{ backgroundColor: 'var(--charcoal)' }}
        >
            {/* Section Title */}
            <motion.div
                style={{ y: titleY, opacity: titleOpacity }}
                className="max-w-7xl mx-auto px-6 lg:px-12 mb-20"
            >
                <h2
                    className="text-display"
                    style={{
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        lineHeight: '1',
                        color: 'var(--cream)',
                    }}
                >
                    Our
                    <br />
                    <span style={{ color: 'var(--gold)' }}>Memories</span>
                </h2>
                <p
                    className="text-body mt-6"
                    style={{
                        fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                        color: 'var(--warm-gray)',
                        maxWidth: '32rem',
                    }}
                >
                    Koleksi momen-momen berharga yang telah kami lalui bersama.
                    Setiap foto menceritakan cerita, setiap cerita menciptakan kenangan.
                </p>
            </motion.div>

            {/* Memory Grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="memory-grid" style={{ gridAutoRows: '200px' }}>
                    {memoryData.map((memory, index) => {
                        const ref = refs[index];
                        const isVisible = visibilityStates[index];
                        const delay = delays[index];

                        return (
                            <motion.div
                                key={memory.id}
                                ref={ref as any}
                                className="memory-grid-item relative group cursor-pointer"
                                style={{
                                    gridColumn: memory.gridColumn || 'span 4',
                                    gridRow: memory.gridRow || 'span 2',
                                }}
                                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                                animate={
                                    isVisible
                                        ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
                                        : { opacity: 0, scale: 0.8, filter: 'blur(10px)' }
                                }
                                transition={{
                                    duration: 0.8,
                                    delay: delay / 1000,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                {/* Image */}
                                <img
                                    src={memory.src}
                                    alt={memory.alt}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay on Hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6"
                                    style={{
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                                    }}
                                >
                                    {memory.caption && (
                                        <p
                                            className="text-body"
                                            style={{
                                                fontSize: '0.875rem',
                                                color: 'var(--cream)',
                                            }}
                                        >
                                            {memory.caption}
                                        </p>
                                    )}
                                </div>

                                {/* Border Glow Effect */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        boxShadow: `inset 0 0 0 2px var(--gold)`,
                                    }}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Decorative Blur */}
            <div
                className="absolute top-1/4 left-0 w-96 h-96 rounded-full opacity-5"
                style={{
                    background: `radial-gradient(circle, var(--gold) 0%, transparent 70%)`,
                    filter: 'blur(120px)',
                }}
            />
        </section>
    );
};

export default Memory;